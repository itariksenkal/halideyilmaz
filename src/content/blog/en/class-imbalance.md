---
title: "Class Imbalance: Building Models That Do Not Miss the Rare Event"
description: "In fraud, failure or rare-disease problems the positive class is tiny. How resampling, class weights, threshold tuning and the precision-recall curve let you build a model that actually works on imbalanced data."
publishDate: "2026-08-09T23:58:00+03:00"
lang: en
category: "Evaluation"
tags: ["Evaluation", "AI"]
translation: "sinif-dengesizligi"
heroImage:
  src: "../../../assets/blog/covers/class-imbalance.jpg"
  alt: "Class Imbalance: Building Models That Do Not Miss the Rare Event"
---

If only three transactions in a thousand are fraudulent, a model that catches nothing and always says "clean" scores 99.7% accuracy. The number is impressive; the model is useless. **Class imbalance** is where metrics mislead most easily in machine learning — and it shows up precisely in the problems we care about most.

## Why accuracy misleads

Accuracy is the share of predictions that are correct. It is meaningful when classes are balanced. When the positive class is three in a thousand, a model that always predicts the majority looks nearly perfect. That is why accuracy is not worth reporting on imbalanced problems.

Think of a fire alarm: for a device that should sound once a year, the strategy of never sounding is also 99.7% correct.

<div class="callout"><strong>The first question:</strong> which error costs more — a missed fraud, or a customer wrongly blocked? You cannot choose a metric without answering it.</div>

## Data-level remedies

The most direct approach is to change the distribution:

-   **Oversampling:** multiplying the minority class. The simplest form is duplication; methods such as SMOTE instead synthesise new points between neighbours.
-   **Undersampling:** discarding majority examples. Fast when data is plentiful, but it risks throwing away information.
-   **Hybrid:** a measured dose of both.

One critical detail: _resampling applies to the training set only_. Validation and test sets must keep the real-world distribution, or the number you measure will not reflect reality.

## Algorithm-level remedies

Without touching the data, you can intervene in the loss function. Class weights make errors on the minority class more expensive, so the model naturally pays more attention to it. In most libraries this is a single parameter, and it usually has fewer side effects than resampling.

## The real lever: the decision threshold

Most classifiers actually produce a probability; the 0.5 threshold is merely a default, and on imbalanced problems it is rarely the right one. Lowering it raises recall and lowers precision; raising it does the reverse.

This is the cheapest and most effective adjustment available without retraining. The right threshold is not a technical decision but a _business_ one: it depends on how many false alarms you can absorb.

## Which metric should you use?

| Metric | What it tells you | On imbalanced data |
| --- | --- | --- |
| Accuracy | Overall hit rate | Misleading |
| Precision | When it alarms, is it right | Meaningful |
| Recall | How many real cases it caught | Meaningful |
| ROC-AUC | Ranking quality | Can look optimistic |
| PR-AUC | Ranking focused on the minority | Preferred |

On imbalanced problems the ROC curve is usually too flattering, because a large number of true negatives makes the false-positive rate look small. The precision-recall curve does not fall into that trap.

## Frequently asked questions

<div class="faq"><details><summary>Is SMOTE always a good idea?</summary><p>No. In high-dimensional or very noisy data, synthetic points can blur the boundary between classes. Try class weights and threshold tuning first.</p></details><details><summary>How do I choose the threshold?</summary><p>Plot the precision-recall curve on a validation set and pick the false-alarm rate the business can accept. The decision is operational, not technical.</p></details><details><summary>When does imbalance stop being a problem?</summary><p>When the absolute count of the minority class is large enough, the ratio matters less. If one percent means ten thousand examples, you will usually be fine.</p></details></div>

---

Class imbalance is not a defect in your data; it is the natural shape of most valuable problems. With the right metric, the right threshold and an honest evaluation set, it is entirely workable. For more, see [classification metrics](/en/posts/classification-metrics/) and [anomaly detection](/en/posts/anomaly-detection/).
