---
title: "Model Cards and AI Governance: Documenting a Model"
description: "A model card records what a model does, where it fails, and what data trained it. A practical look at governance, auditability and risk classification."
publishDate: "2026-08-09T23:50:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "model-kartlari-yonetisim"
heroImage:
  src: "../../../assets/blog/bimg-10.jpg"
  alt: "Model Cards and AI Governance: Documenting a Model"
---

Once a model reaches production it is no longer just a software component but a system that makes decisions. Who owns it, what data trained it, where does it fail, and when will it be reassessed? A **model card** keeps the answers to those questions in one document.

## What a model card is

A model card is a short, standardised identity sheet for a model. Its purpose is to let someone using or auditing the model answer the basic questions without reading the source. It resembles a medicine leaflet: what for, for whom, under which conditions and with what side effects.

## What belongs in a good one

-   **Purpose:** what the model predicts and which decision it feeds.
-   **Out-of-scope use:** what it must not be used for.
-   **Training data:** source, period, size, known gaps.
-   **Performance:** headline metrics _and_ a breakdown by subgroup.
-   **Limitations:** known weaknesses and example failures.
-   **Ownership:** who owns it and how often it is reviewed.

<div class="callout"><strong>The most valuable section</strong> is usually "out-of-scope use". Writing down where a model should not be used prevents more misuse than writing down where it can.</div>

## Writing the limitations

This is where you learn whether the card is useful. "The model may make mistakes in some situations" says nothing. A useful sentence is concrete: in which slice, by how much, and why. A performance section without a subgroup breakdown is the card's weakest link.

## A risk-based approach

| Risk level | Example | Documentation expected |
| --- | --- | --- |
| Low | Content tagging | Short card, basic metrics |
| Medium | Recommendation, ranking | Subgroup analysis, monitoring plan |
| High | Credit, health, law | Full card, human oversight, appeal route |

The depth of documentation should be proportional to the effect the decision has on a person. Applying one template at identical intensity to every model produces either needless overhead or insufficient oversight.

## The document is alive

A model card written at launch and then forgotten loses its value quickly. Drift, retraining and threshold changes all invalidate it. The card's version should move forward with the model's.

## Frequently asked questions

<div class="faq"><details><summary>Is this too heavy for a small team?</summary><p>No. Even a one-page card pays off. The heavy part is not writing it; it is the archaeology required later when none exists.</p></details><details><summary>Who should write it?</summary><p>The team that built the model writes it, but the team that uses it should review it. A card nobody understands counts as unwritten.</p></details><details><summary>Is one needed for third-party models?</summary><p>Yes, and more so. If you do not know the limits of a model you bought, you still carry the responsibility for it.</p></details></div>

---

Governance is not bureaucracy that slows innovation; it is the minimum discipline that makes a model defensible in production. For more, see [model monitoring](/en/posts/model-monitoring-drift/) and [bias and fairness](/en/posts/bias-and-fairness/).
