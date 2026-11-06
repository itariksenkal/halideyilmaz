---
title: "AI Incident Reporting and Post-Market Monitoring: The 15-Day, 10-Day and 2-Day Clocks"
description: "Serious incident reporting runs on a 15-day clock, 10 days in the event of death and 2 days for a widespread infringement. What logging infrastructure, severity taxonomy and on-call path an ML team needs in order to meet those clocks at all."
publishDate: "2026-08-13T23:22:00+03:00"
lang: en
category: "Production"
tags: ["Production", "AI"]
translation: "yapay-zeka-olay-bildirimi"
heroImage:
  src: "../../../assets/blog/bimg-08.jpg"
  alt: "AI Incident Reporting and Post-Market Monitoring: The 15-Day, 10-Day and 2-Day Clocks"
---

When you notice a model has broken in production, do you know how many days you have left? The EU AI Act sets explicit clocks for serious incidents: 15 days as a rule, 10 days where a person has died, and 2 days for a widespread infringement. The argument of this post is simple: **those clocks are an engineering problem, not a legal one.** For a team without logs, 15 days is not a reporting window — it is an archaeology window.

## What counts as a serious incident, and when does the clock start?

The Regulation defines “serious incident”, and these are not ordinary bugs: the death of a person or serious harm to health; a serious and irreversible disruption of the management or operation of critical infrastructure; infringement of obligations under Union law intended to protect fundamental rights; and serious harm to property or the environment.

The reporting clocks run as follows ([Article 73](https://artificialintelligenceact.eu/article/73/)):

-   **The rule: 15 days.** The provider reports immediately after establishing a causal link — or the reasonable likelihood of one — between the AI system and the incident, and in any event no later than 15 days.
-   **Widespread infringement or critical infrastructure: 2 days.** Where there is a widespread infringement, or a serious and irreversible disruption of critical infrastructure, the deadline drops to two days.
-   **Death: 10 days.** In the event of the death of a person, 10 days from the date the provider becomes aware of it.
-   Completeness is not required first: where a complete report is not possible, an initial incomplete report is made and completed afterwards. The market surveillance authority is expected to act within 7 days.

<div class="callout"><strong>Tip:</strong> The clock does not start when the incident <em>happened</em>; it starts when the causal link, or its reasonable likelihood, was <em>established</em>. That converts your detection capability directly into legal exposure: noticing late does not delay the clock, it only shortens your preparation and invites the question “why did it take you so long to notice?”</div>

One timing note: for Annex III high-risk systems this obligation starts applying on 2 December 2027 along with the rest. There is a genuine window to prepare — see [the new timeline post](/en/posts/eu-ai-act-timeline-2026/).

## Article 72: the monitoring plan is a system, not a document

Behind the reporting duty sits another one: the post-market monitoring plan. A provider must systematically collect, document and analyse the system's performance throughout its lifetime.

The subtlety is this: a monitoring plan is only a plan if it can show degradation _in time_. On a model whose labels arrive 90 days later, a monitoring design that rests solely on labels is by definition 90 days late. The plan therefore has to include label-independent signals:

-   **Input side:** data quality violations, schema changes, jumps in null rates, [data drift](/en/posts/model-monitoring-drift/), and for text and vector data, [embedding drift](/en/posts/embedding-drift-monitoring/).
-   **Output side:** shifts in the score distribution, the rate of above-threshold decisions, flattening of the confidence distribution.
-   **Label-free performance estimation:** estimating where performance is heading before labels arrive — with its assumptions spelled out, in [performance estimation without labels](/en/posts/performance-estimation-without-labels/).
-   **Human feedback:** the operator override rate. This is the cheapest and most neglected signal: if people have started correcting the model, the model has degraded.
-   **Outlying behaviour:** catching unexpected input and output patterns with [anomaly detection](/en/posts/anomaly-detection/).

> A monitoring plan that can only see degradation once the labels arrive is a fire alarm that goes off when the fire brigade turns up.

## Severity classification: can you borrow it from SRE?

Most software teams already have an incident severity taxonomy: SEV1, SEV2, SEV3. You cannot lift it straight into AI incidents, because the classic taxonomy is built around _availability_. A model does not crash; it starts giving wrong answers while every health check stays green.

For ML it is more workable to build the taxonomy on two axes:

-   **Axis 1 — nature of harm:** health and safety, fundamental rights, financial loss, reputation, service quality.
-   **Axis 2 — reversibility:** can the decision be undone? Can you re-evaluate a rejected application, or has the person already gone elsewhere?

These two axes map directly onto the Regulation's timing categories. An incident that sits on the health-and-safety axis and on the irreversible side also determines whose phone rings.

<div class="callout"><strong>Tip:</strong> Do not write the severity definition during the incident. For each level, decide in advance: who is notified, within how many minutes, who holds rollback authority, and which records are automatically frozen. A definition written during an incident always selects the lowest level.</div>

## Logging: the real infrastructure behind reporting

An incident report has to explain not _what_ happened but _how_ it happened: which system version, which class of input, how many people were affected, when it started, when it stopped. None of that can be manufactured during the incident; it is either in the log or it is not.

Which is why the automatic logging required by Article 12 is really a precondition for Article 73. A minimum record set looks like this:

```text
# The log that makes incident reporting possible (pseudocode)
decision_record = {
  "timestamp":       utc_now(),
  "model_version":   MODEL_VERSION,     # traceable to a training run
  "dataset_version": DATASET_VERSION,
  "threshold":       ACTIVE_THRESHOLD,  # a threshold change is an event too
  "input_class":     category(input),   # a class, not the personal data
  "output":          score,
  "human_action":    operator,          # none / confirm / override
}
# Questions asked during an incident, and what the log must answer:
#   "when did it start?"      -> version deployment timestamp
#   "how many were affected?" -> decision count in the date range
#   "on which inputs?"        -> error rate by input class
#   "can we roll back?"       -> time to restore the previous version
```

There is a balance to strike: the log must be detailed enough to reconstruct the incident, and restrained enough not to accumulate unnecessary personal data. Storing an input class and a digest rather than the raw input is usually both sufficient and safer. For the privacy side of that trade-off, see [privacy-preserving learning](/en/posts/privacy-preserving-learning/).

## The incident path: from model output to a human

An ML incident response flow differs from a classic SRE flow in three places, and those three are where unprepared teams struggle most.

### Difference 1: detection is delayed

When a server crashes the alarm fires in seconds. When a model becomes wrong, the alarm fires weeks later — sometimes as a customer complaint. So an ML on-call rota does not page; it triggers a _threshold-breach review_. The signal does not wake someone up, it opens an investigation.

### Difference 2: rollback does not always fix it

Reverting to the previous model version is often the right first move, but if the problem originates upstream in the data, the old model will see the same broken data. A rollback plan has to cover the data pipeline version as well as the model version.

### Difference 3: identifying affected people is retrospective

In a software fault the affected requests are known. In a model fault, “affected” depends on the decision threshold and has to be recomputed after the fact. Being able to do that computation depends on having logged decisions and thresholds — which brings us back to the log again.

> In a software incident you say “the system was down”. In a model incident you have to say “the system was up, and it was wrong”. Proving the second requires a record.

## A preparation checklist

What to have in place before December 2027, in order of importance:

-   **The decision log.** Including model version, dataset version, threshold and human intervention. This single item is the precondition for everything below it.
-   **Version traceability.** You must be able to walk back from a production model to its training data. That is the [model card](/en/posts/model-cards-governance/) and dataset documentation discipline.
-   **Label-independent monitoring.** At least one input signal, one output signal and one human-feedback signal.
-   **A severity taxonomy.** Built on nature of harm and reversibility, mapped onto the regulatory timing categories.
-   **On-call and authority.** Who can stop the system, at which severity, without whose approval — written down.
-   **A report template.** Rather than writing into a blank page within 15 days, define the fields to be filled in advance.
-   **A drill.** Run the flow once a year against a fictional incident. A plan with no drill is not a plan but an intention.

All of this is really the operational side of the Article 12 and Article 15 deliverables described in [high-risk system requirements](/en/posts/high-risk-ai-system-requirements/). Producing the documents is not the end of it; the system behind the documents has to actually run.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Serious incident reporting runs on 15 days as a rule, 10 days where a person has died, and 2 days for a widespread infringement or critical infrastructure disruption.</li><li>The clock starts when the causal link or its reasonable likelihood is established, not when the incident occurred — detection capability is legal exposure.</li><li>A monitoring plan resting only on labels is by definition late whenever labels are delayed.</li><li>The classic SRE severity taxonomy does not transfer: a model does not crash, it becomes wrong while health checks stay green.</li><li>The real infrastructure behind reporting is the decision log; if you cannot walk back from a model version to its training data, you cannot write the report.</li></ul></div>

<div class="faq"><details><summary>Our model is not high-risk. Does this bind us?</summary><p>Serious incident reporting under Article 73 is directed at high-risk systems. But every engineering practice here — a decision log, version traceability, label-independent monitoring — is useful regardless of risk class. Being out of scope is not a reason to skip the record.</p></details><details><summary>We are not sure the incident was caused by the model. Should we still report?</summary><p>The duty covers establishing a causal link or the reasonable likelihood of one. And completeness is not required first: where a full report is impossible, an initial incomplete report can be filed and completed later. Waiting for certainty is the most common way to miss the deadline.</p></details><details><summary>How much should we keep in the log?</summary><p>Enough to reconstruct the incident, little enough not to accumulate unnecessary personal data. In practice, storing an input class and a digest rather than the raw input — alongside model version, dataset version, threshold and human intervention — is enough to reconstruct most incidents.</p></details></div>

---

In short: the hard part of this obligation is not writing the report but being in a position to write it. For a team with logging, version traceability and label-independent monitoring, 15 days is generous. For a team without them, 15 days will never be enough.
