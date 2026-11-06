---
title: "Bias and Fairness in AI: Why Models Discriminate"
description: "Bias usually comes from the data and the problem definition rather than the model. Historical bias, representation gaps, fairness metrics, and why those metrics contradict each other."
publishDate: "2026-08-09T23:55:00+03:00"
lang: en
category: "Ethics"
tags: ["Ethics", "AI"]
translation: "onyargi-ve-adalet"
heroImage:
  src: "../../../assets/blog/covers/bias-and-fairness.jpg"
  alt: "Bias and Fairness in AI: Why Models Discriminate"
---

A model has no malice; it simply learns the world you show it. If that world is skewed, the model learns the skew — and then scales it. **Bias** is therefore as much a definitional problem as a technical one: it depends on what you chose to predict and which data you taught it with.

## Where bias comes from

-   **Historical bias:** the data reflects past decisions. If those decisions were skewed, so is the data.
-   **Representation bias:** some groups appear rarely in the dataset, and the model performs worse for them.
-   **Measurement bias:** the target is not what you actually want to measure. If you record "arrests" rather than "crime", the model learns patrol density.
-   **Aggregation bias:** distinct groups are compressed into one model that fits none of them well.

<div class="callout"><strong>A crucial distinction:</strong> dropping the sensitive attribute does not remove bias. The model can reconstruct it from postcode, name or purchase history.</div>

## The proxy-variable trap

Deleting a gender or ethnicity column is not enough, because other variables carry that information indirectly. These are proxies. The real answer is to _measure and monitor_ the sensitive attribute rather than delete it. You cannot correct an inequity you refuse to measure.

## Fairness metrics

| Metric | What it demands |
| --- | --- |
| Demographic parity | Equal rate of positive predictions across groups |
| Equal opportunity | Equal true-positive rate across groups |
| Equalised odds | Equal true- and false-positive rates |
| Calibration | The same score means the same real probability in every group |

## Why the metrics conflict

These criteria cannot all hold at once. When base rates differ between groups, calibration and equalised odds are mathematically incompatible. This is not an engineering shortcoming but a proven impossibility.

The consequence is that there is no single definition of a "fair model". Which definition you adopt is a _value judgement_ tied to your domain and to who is harmed by which error — and it should be written down explicitly.

## What to do in practice

1.  Identify the sensitive groups and measure performance separately for each.
2.  Judge by the worst-performing group, not the aggregate metric.
3.  Close representation gaps with targeted data collection.
4.  Document the fairness definition you chose and why.
5.  Keep monitoring by group in production; when the distribution shifts, fairness shifts with it.

## Frequently asked questions

<div class="faq"><details><summary>Is the model biased, or the data?</summary><p>Almost always the data and the problem definition. The model merely amplifies the relationships it is shown.</p></details><details><summary>Is collecting sensitive data a privacy problem?</summary><p>Fairness auditing is a legitimate purpose, but it requires separate legal assessment, strict purpose limitation and access control. Data gathered for auditing should not be used as a model input.</p></details><details><summary>How do I measure this for small groups?</summary><p>With confidence intervals. In small samples, group differences are indistinguishable from noise; do not draw conclusions without reporting uncertainty.</p></details></div>

---

Fairness is not a filter bolted on afterwards but a design decision that starts with the problem definition. For related reading, see [model interpretability](/en/posts/model-interpretability-xai/) and [data quality](/en/posts/data-quality-labeling/).
