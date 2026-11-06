---
title: "Classification Metrics: When to Use Accuracy, Precision, Recall, F1, and ROC-AUC"
description: "Starting from the confusion matrix, we explain accuracy, precision, recall, F1, and ROC-AUC through everyday examples and clarify which metric is the right choice and when."
publishDate: "2026-08-09T23:45:00+03:00"
lang: en
category: "Metrics"
tags: ["Metrics", "AI"]
translation: "degerlendirme-metrikleri"
heroImage:
  src: "../../../assets/blog/covers/classification-metrics.jpg"
  alt: "Classification Metrics: When to Use Accuracy, Precision, Recall, F1, and ROC-AUC"
---

Being reassured because a model says it is "95% accurate" is usually premature. In a test where only 1% of patients are actually sick, even a dumb model that says "everyone is healthy" reaches 99% accuracy — yet it catches not a single patient. That is exactly why evaluating classification models requires going beyond accuracy. In this article we explain **accuracy, precision, recall, F1, and ROC-AUC** through everyday examples, unpack the confusion matrix, and clarify which metric is the right choice and when.

## 1\. The confusion matrix: four basic boxes

Every classification metric is born from a single table: the **confusion matrix**. In a binary problem the model says "positive" or "negative" for each example, and the truth is also positive or negative. When these two axes cross, four boxes appear:

-   **True Positive (TP):** The model said "positive," and it really was positive. We said there was a fire, and there was.
-   **True Negative (TN):** The model said "negative," and it really was negative. We said no fire, and there was none.
-   **False Positive (FP):** The model said "positive," but it was actually negative. A false alarm.
-   **False Negative (FN):** The model said "negative," but it was actually positive. We missed a real fire.

Every metric is a different combination of these four numbers. Once you understand them, the rest falls into place intuitively.

```text
              Predicted: Positive    Predicted: Negative
Actual: Pos.        TP                    FN
Actual: Neg.        FP                    TN
```

> A false positive is "needless panic"; a false negative is "a missed danger." Which one is more expensive depends entirely on your problem.

## 2\. Accuracy and its deceptive face

**Accuracy** is the most intuitive metric: the ratio of correct predictions to all predictions.

_Accuracy = (TP + TN) / (TP + TN + FP + FN)_

When the classes are balanced (say 50% positive, 50% negative), accuracy is a perfectly reasonable summary. But with imbalanced classes it misleads dangerously. Recall the opening example: if the disease is rare, a "everyone is healthy" model that learns nothing still scores high accuracy. The number looks great, but the model is useless.

<div class="callout"><strong>Tip:</strong> Don't trust accuracy without checking the class ratios. If the positive class is 5%, a 95% accuracy may mean the model learned nothing. Ask about the data distribution first.</div>

## 3\. Precision: how much can we trust the alarm?

**Precision** answers the question: _When the model says "positive," how often is it right?_

_Precision = TP / (TP + FP)_

That is, the share of truly correct cases among all the model's positive predictions. Think of an email spam filter. When the filter throws a message into the spam folder, is it really spam? If precision is low, an important business email lands in spam and goes unseen. Here, **a false positive is expensive**: treating a clean email as spam annoys the user. That is why spam filters aim for high precision.

In short, precision answers "if the alarm goes off, can I trust it?" If you want to avoid false alarms, look at precision.

## 4\. Recall: accounting for what we miss

**Recall**, also called sensitivity, looks from the opposite angle: _Of all the truly positive cases, how many did the model catch?_

_Recall = TP / (TP + FN)_

This time think of cancer screening. Of the people who are actually sick, how many does the test flag as "sick"? Here, **a false negative is a catastrophe**: telling a genuinely sick person they are "healthy" and sending them home means delayed treatment. In such cases we accept a few false alarms (lower precision) to make sure we miss no real case (high recall).

> Precision asks "of what I flagged, how much is right?"; recall asks "of the real cases, how many did I catch?" The two are often in tension.

Why the tension? If you lower the model's threshold so it becomes more generous (calling every suspicion "positive"), it catches more real cases (recall rises) but the false alarms also multiply (precision falls). Raising the threshold does the reverse. This trade-off sits at the heart of metric selection.

## 5\. F1: the common ground of precision and recall

But what if you want a single number? The **F1 score** is the _harmonic mean_ of precision and recall.

_F1 = 2 × (Precision × Recall) / (Precision + Recall)_

Why the harmonic, not the ordinary (arithmetic) mean? Because the harmonic mean drags the result down sharply if one of the two values is very low. A model with 100% precision but 1% recall gets a flattering 50.5% under the arithmetic mean; yet it is useless because it catches almost no cases. F1 brings this down to about 2% and tells the truth. F1 demands that both be reasonably good; if one collapses, F1 collapses too.

```text
# Pseudocode: metrics from four numbers
precision = TP / (TP + FP)
recall    = TP / (TP + FN)
f1        = 2 * precision * recall / (precision + recall)

# Example: TP=8, FP=2, FN=4
# precision = 8/10 = 0.80
# recall    = 8/12 ≈ 0.67
# f1 = 2*0.80*0.67 / (0.80+0.67) ≈ 0.73
```

F1 is a good single-number summary that replaces accuracy when classes are imbalanced. Still, if you care about which error is more expensive, seeing precision and recall separately is more informative than F1 alone.

## 6\. ROC-AUC: a threshold-free view

Every metric so far depended on a particular **decision threshold** (e.g. "positive if probability exceeds 0.5"). But as you change the threshold, precision and recall change too. Is there a way to evaluate a model holistically, independent of any single threshold? This is where the **ROC curve** comes in.

The ROC curve compares two rates across all possible thresholds: on the vertical axis the **true positive rate** (i.e. recall), on the horizontal axis the **false positive rate** (FP / (FP + TN)). As you loosen the threshold, both rise; the curve traces this trajectory.

**AUC (the area under the curve)** is the area beneath this curve, a number between 0 and 1. Its intuitive meaning is elegant: AUC is _the probability that a randomly chosen positive example is scored higher than a randomly chosen negative example_. AUC = 0.5 is as bad as a coin toss (the model can't rank); AUC = 1.0 is perfect separation. The beauty of AUC is that it measures how well the model _ranks_ positives above negatives, independent of any threshold choice.

<div class="callout"><strong>Tip:</strong> When classes are heavily imbalanced, ROC-AUC can look optimistic. In such cases the precision-recall curve and the area under it (PR-AUC) usually give a more honest picture.</div>

## 7\. Which metric, and when?

There is no single "best" metric; the right one depends on your problem's cost structure. A practical compass:

-   **Balanced classes and equally costly errors:** Accuracy is sufficient and easy to grasp.
-   **False positives are expensive:** Focus on precision. (Spam filters, fraud alarms shown to the user, content/legal moderation.)
-   **False negatives are expensive:** Focus on recall. (Cancer screening, security threat detection, fraud catching.)
-   **You want to balance both and classes are imbalanced:** F1 is a good single-number summary.
-   **Threshold-independent ranking quality:** ROC-AUC; for very imbalanced data, PR-AUC.

The healthiest approach is usually not to lean on a single number. Report the confusion matrix, precision, recall, and F1 together, then highlight one according to your problem's "which error is more expensive?" question. Choosing a metric is not really a technical decision — it is a business decision.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Every metric is born from the four boxes of the confusion matrix (TP, TN, FP, FN).</li><li>Accuracy is intuitive but misleading with imbalanced classes; check the data distribution first.</li><li>Precision asks "how trustworthy is the alarm?"; recall asks "how many real cases did I catch?"</li><li>Precision and recall usually trade off; moving the threshold favors one at the other's expense.</li><li>F1 is their harmonic mean; if one is very low, F1 is low too, which makes it an honest single-number summary.</li><li>ROC-AUC measures threshold-independent ranking quality; for very imbalanced data, PR-AUC is more honest.</li><li>The right metric is chosen by which error (false positive or false negative) is more expensive.</li></ul></div>

<div class="faq"><details><summary>Why is high accuracy not always a good sign?</summary><p>Because with imbalanced classes, accuracy can rise simply by ignoring the minority class. On data where positives are only 1%, a model that says "everything is negative" reaches 99% accuracy yet catches not a single positive. So always evaluate accuracy alongside precision and recall.</p></details><details><summary>How do I choose between precision and recall?</summary><p>Look at which error is more expensive. If false alarms are costly (e.g. marking a clean email as spam), prioritize precision. If missing a real case is catastrophic (e.g. overlooking a disease), prioritize recall. If you want to balance both, the F1 score is a practical middle ground.</p></details><details><summary>What is the difference between ROC-AUC and PR-AUC?</summary><p>ROC-AUC compares the true positive rate with the false positive rate and measures overall ranking quality. But with heavily imbalanced classes it can look optimistic, because the large number of true negatives inflates the denominator. The precision-recall (PR) curve focuses only on the positive class, so it gives a more honest picture in such cases.</p></details></div>

---

In short: judging a model by a single number is often deceptive. Once you learn to read the confusion matrix and use precision, recall, F1, and ROC-AUC together, you see clearly what your model is actually doing. Choosing the right metric is ultimately not a technical preference but a business decision answering "which error is more expensive for us?" If you are curious how Turkish-focused AI models are rigorously evaluated in the real world, take a look at the work of [HatsonTech](/en/posts/how-hatsontech-started/).
