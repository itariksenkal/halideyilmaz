---
title: "Embedding Drift: Monitoring for Drift in the Foundation-Model Era"
description: "Why a per-dimension KS test fails on a 768-dimensional embedding, what to measure instead, how an embedding model version bump silently invalidates your reference window, and why drift is not degradation."
publishDate: "2026-08-13T23:12:00+03:00"
lang: en
category: "Production"
tags: ["Production", "AI"]
translation: "gomme-kaymasi-izleme"
heroImage:
  src: "../../../assets/blog/covers/embedding-drift-monitoring.jpg"
  alt: "Embedding Drift: Monitoring for Drift in the Foundation-Model Era"
---

The classical drift-monitoring recipe is simple: for every feature, compare the training distribution against today's, run a test, alarm on a threshold. That works on tabular data. On text, images or audio you hold no named columns at all, only an array of 768 or 1,536 numbers, and the same recipe produces false alarms with close to mathematical certainty. This post covers how to measure drift in high-dimensional representations, why an embedding model version bump is the quietest source of drift there is, and the point most monitoring pages skip: drift is not degradation.

## From named features to an unnamed geometry

Recall the classical setup. As described in [model monitoring and data drift in production](/en/posts/model-monitoring-drift/), you compare each monitored feature's training distribution against today's, apply a test, and alarm on a threshold. It assumes quietly that every column has a name, a unit and a meaning, so drift fits into one sentence.

On unstructured data that assumption is gone. The input passes through an embedding model and becomes a vector of several hundred dimensions, and that vector is what the model sees. As covered in [embedding models and semantic similarity](/en/posts/embedding-models-semantic-similarity/), individual dimensions carry no standalone meaning; meaning lives in distances and neighbourhoods.

Tabular data is an address list. An embedding space is a map. On a map, “the mean of axis 412 rose by 0.03” has no referent: the axes are arbitrary, and rotating the map changes every axis value while the map stays the same. The only meaningful question is whether the shape of the cloud changed.

> In tabular data, a feature drifting is an event: the mean age of applicants dropped. In an embedding space, a single dimension drifting is not an event; it is a number on an arbitrary axis.

## Why per-dimension testing collapses

Many teams reach for the recipe anyway: a Kolmogorov-Smirnov (KS) test on each of 768 dimensions, then read the p-values. That is broken for three reasons, none fixable by tuning.

**First, multiple testing.** At a 5 percent significance level, 768 tests yield roughly thirty-eight “significant” results when nothing has changed. Run it daily and the dashboard is permanently red. Recent work on drift detection names the pattern: even small false positive rates accumulate into [alarm fatigue](https://arxiv.org/abs/2607.17336), which ends with nobody looking.

**Second, a p-value is not an effect size.** It is a function of sample size as much as of the change itself. Evidently is blunt about it: the KS test [raises flags even for a minor change of 0.5 percent once you pass 100,000 objects](https://www.evidentlyai.com/blog/data-drift-detection-large-datasets), and its p-value is not a measurement of drift size. They wrote that into product logic, switching detection methods once observations cross a [threshold of 1,000](https://docs.evidentlyai.com/metrics/explainer_drift).

**Third, PSI does not rescue you.** It is strongly sensitive to batch size and produces frequent false alarms at small sample sizes, so the fixed cut-offs repeated everywhere are an industry convention, not a statistical law; calibrate against your own quiet periods instead.

Then the curse of dimensionality. Distances concentrate, and two distributions can have near-identical marginals on _every axis_ while their joint distribution changed completely. Rotate the cloud, swap two clusters, break the correlation structure: per-dimension tests see nothing.

<div class="callout"><strong>Tip:</strong> Patching multiple testing with a Bonferroni-style correction is tempting, but a correction that cuts false alarms also cuts your power to catch real drift. Replace the 768 tests with one multivariate measure.</div>

## What you monitor instead

Mature alternatives exist, and they share one property: they collapse hundreds of tests into a single interpretable number. The most direct is a **distance between distributions**, summarising the gap between the reference cloud and the current one in one value, looking at the cloud as a whole rather than at axes.

### A two-sample test by classification

This is the one that earns its keep, and the idea is almost cheeky. Label reference vectors 0 and current vectors 1, train a simple classifier to tell them apart, and read the ROC AUC on a held-out split. Near 0.5 the two are indistinguishable; the closer to 1, the more separable they have become.

Its real value is giving you more than a number. Rank the examples the classifier is most confident belong to today and read the top twenty. You learn _what_ the drift is from the documents themselves: a new product category, a broken encoding, a campaign's templated language.

### Cluster occupancy and neighbour distances

Cluster the reference data once and freeze the centroids, then assign each new batch to them and compare occupancy shares. A 768-dimensional problem becomes a fifteen-category distribution where classical tests are meaningful again, and the result is auditable: you can read samples out of each cluster.

Third is the **nearest-neighbour distance distribution**: for each new point, the distance to its k-th nearest reference neighbour. A thickening right tail means you are entering regions where you have never had examples — fundamentally an [anomaly detection](/en/posts/anomaly-detection/) problem, pointing straight at the inputs the model handles worst.

Fourth is a low-dimensional summary: track the first few components of a projection fitted on the reference. That projection must be learned once and frozen; refitted every batch, it hides the drift you were measuring.

```text
# Embedding drift: one measure instead of hundreds of tests (pseudocode)
# 1) Discriminability: is this vector from the reference or from today?
X = concat(reference_embeddings, current_embeddings)
y = concat(zeros(n_ref), ones(n_cur))
model = simple_classifier().fit(X_train, y_train)
auc   = roc_auc(model, X_test, y_test)      # 0.5 = indistinguishable

# 2) Make the alarm readable: show the most confident examples to a human
if auc > calibrated_threshold:              # derive it from your own history
    inspect(top_scoring(model, current_embeddings, k=20))

# 3) Localise it: compare cluster occupancy against frozen centroids
share_ref = cluster_shares(frozen_centroids, reference_embeddings)
share_cur = cluster_shares(frozen_centroids, current_embeddings)
report(per_cluster_delta(share_ref, share_cur))
# An alarm is not a decision on its own; read it next to a performance estimate.
```

## The quietest source of drift: your embedding model version

Now the event most often misread on dashboards. Your reference window is not made of data; it is made of vectors from one version of one embedding model. Upgrade that model, or let a provider silently update it behind the same name, and the geometry changes: different axes, different scale, different neighbourhoods.

Every distance measure you own spikes the next morning. But you measured the difference between two models, not a change in the world; the two clouds no longer speak the same language, so the reference window is invalid. Comparing re-embedded documents against old vectors fails for the same reason: cosine similarity across model versions is not interpretable.

Subtler forms exist. Changing truncation length, updating normalisation or reworking chunking also moves the geometry. The model version may be identical; the preprocessing version changed, and the effect is the same.

> Not every jump on the dashboard belongs to the world. Some are written in your own release notes, and mistaking those for the world means months chasing a problem that does not exist.

<div class="callout"><strong>Tip:</strong> Store the model name, model version and preprocessing version alongside every vector you persist. When a version changes, re-embed the reference window, recompute the baseline, and mark a discontinuity on the dashboard. A month later you need to be able to say “that jump was us.”</div>

## Drift is not degradation

The most important sentence in this post sits under this heading: a drift alarm does not tell you the model got worse, only that the input distribution changed. Those are different claims, and the distance between them wastes a great deal of engineering time.

Performance depends not on the input distribution itself but on how much it overlaps the regions where the model is _wrong_. If inputs shift into a region where the model was already solid, drift can be large while the error rate never moves.

This is not abstract. In a case study published by the NannyML team, the model's _two most important features_ drifted substantially while mean absolute error stayed flat, and in their own words [all the data drift alerts were false alarms](https://www.nannyml.com/blog/when-data-drift-does-not-affect-performance-machine-learning-models). That it comes from a team building drift monitoring makes it more credible, not less.

The reverse is more dangerous: performance can collapse with no measurable change in the inputs. That is concept drift, where the relationship between input and output changed, and a system watching only inputs is blind to it by construction. Expecting a covariate-shift detector to catch it is a category error, not a tooling gap.

The consequence is a hierarchy. The alarm comes from measured performance where you have it, and from [performance estimation without ground truth](/en/posts/performance-estimation-without-labels/) where labels are delayed. The drift signal is the _explanation_, not the alarm. Invert that order and you get a team debating retraining every week without knowing what broke.

## A practical setup, and the state of the tooling

An embedding drift setup comes down to five decisions.

-   **Choose the reference window, do not inherit it.** “All of training” is a poor reference; pick a period when production was demonstrably healthy, then fix and version it.
-   **Fix the batch size.** The statistic is sample-size sensitive, so a daily batch of 2,000 and a weekly batch of 14,000 cannot share a threshold.
-   **Derive the threshold from history.** Backtest over past quiet periods and set it above the observed noise.
-   **Run one multivariate alarm.** Keep drill-down on demand; the default dashboard shows a single number.
-   **Attach twenty readable examples to every alarm.** An alarm you cannot show to a human gets muted.

### Where the tooling stands today

This market has been reshaped. WhyLabs has announced it is [closing this chapter of its story](https://whylabs.ai/) and open-sourced its platform, and whylogs has been dormant since January 2025. NannyML's open-source repository went dormant after the company's acquisition by [Soda](https://launch.soda.io/). Evidently repositioned itself from ML monitoring to [ML and LLM observability, from tabular data to Gen AI](https://github.com/evidentlyai/evidently) — the clearest artefact anywhere of where monitoring went. Alibi Detect is source-available rather than OSI open source, which matters if legal review is in your path. deepchecks has had no release since December 2024. `river` is healthy.

The lesson is architectural: the method outlives the library. Keep the statistic, the reference window and the threshold calibration next to your own data, and let the library be the replaceable part.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Per-dimension testing on high-dimensional embeddings is broken: multiple testing, sample-size-driven p-values and the curse of dimensionality compound.</li><li>Use one multivariate measure instead: a two-sample test by classification, cluster occupancy shift, or nearest-neighbour distances.</li><li>When the embedding model or preprocessing version changes, the reference window is invalid; re-baseline and mark the discontinuity.</li><li>Drift is not degradation: features can drift while error stays flat, and concept drift can wreck performance with no input drift.</li><li>The alarm comes from performance; the drift signal is the explanation. Calibrate thresholds against your own historical noise.</li></ul></div>

<div class="faq"><details><summary>Can I just run a KS test per dimension and apply a multiple-testing correction?</summary><p>A correction only partly addresses the first problem: the p-value remains a function of sample size, and a correction that cuts false alarms also cuts your power. More importantly, per-dimension tests are blind to changes where the marginals stay put but the joint distribution moves — exactly the drift you meet in embedding space.</p></details><details><summary>I need to upgrade my embedding model. Do I lose my monitoring history?</summary><p>You lose comparability at the raw vector level, because vectors from two models do not live in the same space. But you can keep the time series of your drift scores and recompute the baseline: re-embed the reference window, run the old and new baselines side by side for a period, and annotate the dashboard with a discontinuity there.</p></details><details><summary>I got a drift alarm but the real labels arrive in three months. What do I do?</summary><p>Do not treat drift on its own as a reason to retrain. Read the examples the discriminating classifier is most confident about and name what the drift actually is, then ask whether that region overlaps with where the model is weak. The decision hangs on the estimated performance impact, not on the drift statistic.</p></details></div>

---

Embedding drift is the missing chapter of the drift literature, even as more production systems run on unstructured data. Getting it right is not a matter of harder statistics but of two disciplines: knowing exactly what your number measures, and tying the alarm back to performance. Drift is a warning, not a diagnosis. The diagnosis is still yours.
