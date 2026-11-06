---
title: "Anomaly Detection: Finding the Outlier Without Labels"
description: "Anomaly detection usually has no labels and very few positives. Statistical methods, Isolation Forest, autoencoders, and how to manage the false-alarm rate through threshold choice."
publishDate: "2026-08-09T23:54:00+03:00"
lang: en
category: "Methods"
tags: ["Methods", "AI"]
translation: "anomali-tespiti"
heroImage:
  src: "../../../assets/blog/covers/anomaly-detection.jpg"
  alt: "Anomaly Detection: Finding the Outlier Without Labels"
---

Anomaly detection resembles classification but differs in one decisive way: there are almost no examples of the thing you are looking for. Failures in a factory are rare, attacks on a network are sparse, fraud on an account is the exception. So the problem is usually not "separate two classes" but **learn what normal looks like and flag what leaves it**.

## Three kinds of problem

-   **Point anomaly:** a single record is odd — a transaction of unusual size.
-   **Contextual anomaly:** the value is normal on its own but not in context — a routine transaction at three in the morning.
-   **Collective anomaly:** individual records look fine but the sequence does not — hundreds of small, consistent transfers.

You cannot choose a method without knowing which type you are hunting; most failures start by skipping this step.

## The statistical baseline

The simplest approach relies on the distribution: flag values more than three standard deviations from the mean. On univariate, roughly normal data this works surprisingly well. For skewed distributions the interquartile range is more reliable, because it is less influenced by the outliers themselves.

<div class="callout"><strong>A starting rule:</strong> build a simple statistical baseline before reaching for a complex model. In most production systems that baseline catches the bulk of what sophisticated models find.</div>

## Isolation Forest

The idea is elegant: partition the data with random splits. An outlier, sitting away from the crowd, becomes isolated after only a few splits; normal points need many. The average number of splits required to isolate a point converts directly into an anomaly score.

It is fast in high dimensions, needs no scaling and requires no labels. It can struggle on multimodal data, where several distinct patterns are all legitimately normal.

## Autoencoders

An autoencoder learns to compress an input and rebuild it. Trained on normal data alone, it reconstructs normal examples well; when an abnormal one arrives, reconstruction error rises. That error is the anomaly score.

This is powerful on images, signals and high-dimensional telemetry. The cost is that training needs a clean "normal" set — if anomalies contaminate it, the model learns to treat them as normal too.

## Thresholds and false alarms

| Method | Labels | Strongest for |
| --- | --- | --- |
| Statistical | Not needed | Univariate, explainable |
| Isolation Forest | Not needed | High dimensions, speed |
| Autoencoder | Clean normal set | Complex patterns |
| Supervised | Labels required | Known failure modes |

Every method ultimately produces a score; the real decision is the threshold. That choice is operational rather than technical: it depends on how many alerts your team can genuinely investigate in a day. An alert nobody reviews is not an alert.

## Frequently asked questions

<div class="faq"><details><summary>If I have labels, should I still use anomaly detection?</summary><p>With enough positive examples, supervised classification is usually better. Anomaly detection wins on unknown, previously unseen failure modes.</p></details><details><summary>Does seasonality break the alerts?</summary><p>Yes. Traffic dropping at the weekend is not an anomaly. You need to remove seasonality or supply the context as a feature.</p></details><details><summary>How do I evaluate the system?</summary><p>Track what share of investigated alerts turn out to be real, and what share of known incidents were caught. Accuracy is meaningless here.</p></details></div>

---

Anomaly detection is a working answer to the question "what counts as normal?" — and that definition drifts over time, which makes monitoring and recalibration essential. For more, see [model monitoring and drift](/en/posts/model-monitoring-drift/) and [class imbalance](/en/posts/class-imbalance/).
