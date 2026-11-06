---
title: "Feature Stores and Training-Serving Skew: Why Your Model Behaves Differently in Production"
description: "Offline the model scores well, in production it behaves differently. The four concrete sources of training-serving skew, why point-in-time correctness is really leakage prevention, and when a feature store earns its operational cost."
publishDate: "2026-08-13T23:10:00+03:00"
lang: en
category: "Production"
tags: ["Production", "AI"]
translation: "ozellik-deposu-egitim-servis-farki"
heroImage:
  src: "../../../assets/blog/bimg-20.jpg"
  alt: "Feature Stores and Training-Serving Skew: Why Your Model Behaves Differently in Production"
---

Your offline evaluation looked good, you shipped the model, and its behaviour in production did not match. The first reflex is to blame data drift. But in most cases the world has not changed at all: the feature you computed in training and the feature computed at serving time are not the same number. That is training-serving skew, and it is the most common and quietest cause of production surprises. This post covers where the divergence comes from, why point-in-time correctness is really leakage prevention, and the commercially inconvenient question: do you actually need a feature store?

## The same model, two different worlds

The symptom is always the same. Offline metrics are good, the validation set is clean, the pipelines are green, and nothing anywhere logs an error. Yet the model's behaviour in production does not match the offline expectation. Nobody broke anything; the same feature was simply computed two different ways.

It helps to separate two ideas sharply. [Data drift](/en/posts/model-monitoring-drift/) is the world changing: the distribution of inputs moves over time. Training-serving skew is not about the world at all — it is the difference between your two code paths. Drift is a process; skew is a state.

That distinction is also the cheapest diagnostic you have. If the model behaved differently from the _first day_ it was deployed, it cannot be drift, because drift needs time to accumulate. Skew is there at day zero, and no alarm fires, because your monitoring watches distributions over time rather than the consistency of two computations.

> Drift arrives over time; skew is there on day one. If your model behaved unexpectedly the day it shipped, inspect your two code paths rather than the world.

## Four concrete ways the two diverge

Divergence between training and serving is not an abstract hazard. In practice it comes from the same four places.

1.  **Two separate implementations of the same transform.** An aggregation written in SQL or pandas for training, and a service written in another language for serving. Both are correct, but they part ways on edge cases: rounding, whitespace trimming, case handling, ordering, what happens when a denominator is zero. Nobody wrote a bug; someone wrote the same thing twice.
2.  **Different aggregation windows.** “Last 30 days” can mean calendar days offline and a rolling 720 hours online. Is the endpoint inclusive? Which timezone? Does today's partial day count? These details shift the value silently.
3.  **Different null and default handling.** In training, missing values are imputed with the training-set median; at serving, a failed lookup sends 0 or -1. In production a lookup miss becomes a plausible-looking number and raises nothing.
4.  **Label-time versus serve-time data availability.** In a training row every column is populated because the event has long since settled. At serving time that column does not exist yet. This fourth item is also a leakage source, and it is the subject of the next section.

Treat those four as a checklist on the [feature engineering](/en/posts/feature-engineering/) side. What matters is that each feature's definition lives in exactly one place: if the window length, the timezone, the missing-value policy and the type casting are written once, there is nothing left for the two paths to disagree about.

<div class="callout"><strong>Tip:</strong> Do not start the hunt with every feature. Take the five the model weights most heavily and reconcile those first. Most production surprises come from a small definitional gap in a handful of high-impact features.</div>

## Point-in-time correctness is leakage prevention

Point-in-time correctness sounds technical, but the definition is plain: for every training row with label time _t_, each feature must be computed only from data that genuinely existed at _t_. That is, the value the online system would have returned then, not the value sitting in the table today.

The classic bug is joining a mutable dimension table — customer status, risk segment, lifetime value — in its current state. If that column reads “high risk” today, the reason is most likely that the very event you are trying to predict has already happened. You have put the future inside the feature.

### The same bug through a different window

Here is the point worth stating outright: viewed from production, point-in-time correctness _is_ [data leakage](/en/posts/data-leakage-cross-validation/) prevention. In cross-validation you stop leakage across rows and folds; here you stop it across time. The mechanism is identical — you gave the model information it will not have at prediction time.

So is the consequence, and it maps exactly onto the symptom in the first section: the offline score looks excellent and production disappoints. Behind most complaints of “worse in production” sits not drift but a join that reached into the future.

Three rules cover it in practice. Store feature values with a validity timestamp, not only in their latest state. Build training sets with a backward, as-of join on event time. And append to feature tables rather than updating in place; every overwritten row rewrites history.

> If your offline score looks too good to be true, it probably is not true. An unusually strong score is most often the signature of a time violation.

## Parity testing: evidence, not belief

Most teams believe the two sides use the same logic. That is a belief, not evidence. Producing the evidence is simple and cheap.

First, log the feature vector that actually entered the model at serving time, _as it was_. Not the raw input — the computed vector, with a request id, a timestamp and the model version. Then take those records, replay them through the training transform, and diff feature by feature.

Your report should say three things: the mismatch rate per feature, the distribution of the deltas, and the worst few offenders. A small, stable mismatch rate is normal; late-arriving data produces it. The signal is not the rate itself but a _change_ in the rate.

```python
# Training-serving parity: prove the claim (pseudocode)
# 1) Log the vector the serving path actually used
log(request_id, timestamp, feature_vector, model_version)

# 2) Replay the same inputs through the training transform and compare
for record in serving_logs(day):
    replayed = training_transform(record.raw_input, as_of=record.timestamp)
    for name in feature_names:
        delta = abs(replayed[name] - record.vector[name])
        if delta > tolerance[name]:
            mismatch[name] += 1

# 3) Report the per-feature rate; alarm when it leaves the baseline
report(sort(mismatch, descending=True))
# A small steady mismatch is normal; the signal is the rate moving.
```

There is a second benefit here that usually goes unnoticed. The vectors you logged at serving time, paired with labels once they arrive, form a training set that is point-in-time correct by construction, because those vectors were built only from data available at that moment. Log-and-wait is slow, but it removes an entire class of bug.

<div class="callout"><strong>Tip:</strong> Run parity as a daily job, not a one-off validation. Most skew enters with a new release, and a mismatch caught on day one is cheap, while the same mismatch noticed six months later is six months of wrong decisions.</div>

## Do you actually need a feature store?

Now the question vendors enjoy less. A feature store really sells four separate capabilities, and they are independent of each other.

-   **One transformation definition** called by both the training and the serving path.
-   **Point-in-time-correct historical retrieval** so that building a training set does not violate time.
-   **A low-latency online store** for reading features in milliseconds at request time.
-   **Discovery, reuse and governance:** who produces a feature, who consumes it, who gets called when it breaks.

What most teams actually need is the first two. And the first two are not a product; they are two engineering decisions: a shared transformation library and an as-of join pattern on event time. Neither requires standing up a new system.

### A simple decision rule

The third capability earns its cost when your features are computed from streaming events and your latency budget is measured in milliseconds. The fourth earns it when many teams and many models share features, so that who produces what no longer fits in anyone's head.

The cost side is real too: another stateful system, another failure mode, another on-call rotation, another migration later. If you have one model, features computed in a nightly batch and a single team, a shared library plus an as-of join plus a daily parity test will very likely get you the same outcome with less risk.

## The category did not die, it got absorbed

So what happened to this market? The short answer is that the feature store category did not disappear; it was pulled inside the data platform.

Databricks announced its acquisition of Tecton on [22 August 2025](https://www.databricks.com/blog/tecton-joining-databricks-power-real-time-data-personalized-ai-agents). On the same side, the legacy Workspace Feature Store is deprecated; the current path is [Feature Views as Unity Catalog objects](https://docs.databricks.com/aws/en/machine-learning/feature-store/), with online serving via Lakebase. The feature store stopped being a separate product and became part of the catalog and lakehouse layer.

On the independent side Feast survives: [version 0.65.0 was released on 20 July 2026](https://pypi.org/project/feast/), the [repository](https://github.com/feast-dev/feast) carries about 7.2k stars and 4,681 commits, and vector search is on the roadmap in alpha. Its README now describes the project only as a community project, which is a sentence worth reading on its own. Hopsworks still ships the full stack (SDK 5.0.4, 5 August 2026). Google now foregrounds an Agent Platform Feature Store surface in its Vertex AI documentation.

The research side is similarly quiet: an arXiv search surfaces no feature-store papers from 2025 or 2026, and the most recent relevant work argues for [queryable metadata views](https://arxiv.org/abs/2408.02498) instead of requiring traditional bespoke feature stores.

### What to take from it

The problem is real and permanent; the product category became a feature of the data platform. The practical conclusion: take the capability where your data already lives, or build the two things that genuinely matter. Either way, the interface between the team producing a feature and the team consuming it is a contract, and the discipline described in [data contracts for ML](/en/posts/data-contracts-for-ml/) applies to feature definitions exactly as it does to tables.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Training-serving skew is a difference between your two code paths, not the world; drift arrives over time, skew is there on day one.</li><li>Divergence comes from four places: two implementations, different windows, different null handling, and data not available at serve time.</li><li>Point-in-time correctness is leakage prevention seen from production; an unusually good offline score is often a time violation.</li><li>Build a parity test: log the serving vector, replay it through the training transform, and report per-feature mismatch rates.</li><li>Most teams need a shared transformation library and a point-in-time-correct join; a feature store is cost beyond that.</li></ul></div>

<div class="faq"><details><summary>How do I tell whether a production problem is drift or training-serving skew?</summary><p>Timing is the fastest test. If the model behaved unexpectedly from the first day it shipped, it is skew, because drift needs time to accumulate. For proof, run a parity test: log the feature vector used at serving time and replay the same inputs through the training transform. A mismatch ends the debate.</p></details><details><summary>Can I get point-in-time correctness without a feature store?</summary><p>Yes. What you need is a pattern, not a product: store feature values with a validity timestamp, build training sets with a backward as-of join on event time, and never update feature tables in place. All of that is achievable in an ordinary warehouse; a feature store makes the pattern easier, not possible.</p></details><details><summary>Is the feature store category dead?</summary><p>No, it was absorbed. Databricks acquired Tecton and moved the capability into the catalog layer, Feast continues as an independent community project, and Hopsworks still ships the full stack. The problem it solves is permanent; what changed is whether you buy it as a separate product or get it as a feature of your data platform.</p></details></div>

---

When a model behaves differently in production, the cause is usually not a mysterious change in the world but the same calculation written twice. So the first step toward production quality is not standing up a new system; it is collapsing the definition and measuring the claim. One shared transformation definition, a join that respects event time, and a parity test that runs every day will give most teams the bulk of what they hoped to buy from a feature store, at a fraction of the operational cost.
