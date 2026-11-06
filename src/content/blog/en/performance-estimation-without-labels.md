---
title: "Knowing Your Model Broke Before the Labels Arrive: Performance Estimation Without Ground Truth"
description: "If the labels arrive in ninety days, is your model broken now? How confidence-based performance estimation works, the assumptions it rests on, and why it goes quiet in exactly the scenario people reach for it."
publishDate: "2026-08-13T23:11:00+03:00"
lang: en
category: "Production"
tags: ["Production", "AI"]
translation: "etiketsiz-performans-tahmini"
heroImage:
  src: "../../../assets/blog/covers/performance-estimation-without-labels.jpg"
  alt: "Knowing Your Model Broke Before the Labels Arrive: Performance Estimation Without Ground Truth"
---

Measuring a production model's accuracy means waiting for the outcome. The trouble is that the outcome usually arrives months later: whether the loan was repaid, whether the subscription was cancelled, whether a chargeback was filed. Meanwhile the model keeps running, keeps deciding, and keeps causing the outcomes you are waiting on. This post is about estimating model health before the labels arrive, but with the order deliberately reversed. We start with the assumptions these methods rest on, because label-free estimators fail quietly in exactly the scenario people reach for them.

## Label latency is a design constraint, not an inconvenience

Most teams treat label delay as an annoyance to be worked around: we will look when the labels arrive. But the delay is a permanent property of the system and belongs in the design. In a credit model the outcome settles months later. In churn you wait out a ninety-day window by definition. In healthcare the outcome is not known until treatment concludes.

Sometimes the label never arrives at all. You will never learn whether the application you rejected would have been repaid; the model's own decision blocked the observation. So “real performance” in most production systems is measurable only on a subset, and a non-random one.

What do you do in the gap? The common reflex is to monitor the input distribution. As covered in [model monitoring and data drift in production](/en/posts/model-monitoring-drift/), that is a valuable early warning but a limited one: it tells you the inputs changed, not that the model got worse. Those are different questions, and most teams ask the second while accepting an answer to the first.

> A monitoring plan is worth what it detects early. If labels arrive in ninety days, a plan that only reads labels is telling you nothing for ninety days.

## Assumptions first, method second

Label-free performance estimation is a real and useful family of methods. But most write-ups leave the assumptions to the end, in small print. Let us invert that, because knowing where this fails is more valuable than knowing how it works.

There are four assumptions, and all four are load-bearing.

-   **No concept drift.** The relationship between input and output, _P(Y|X)_, must be unchanged. The only thing allowed to move is the distribution of the inputs — covariate shift.
-   **Calibrated probabilities.** If the model says 0.8, roughly 80 percent of that group must genuinely be positive. [Model calibration](/en/posts/model-calibration-probabilities/) is not a refinement here; it is the load-bearing column.
-   **A fixed model and threshold.** Estimated metrics are valid for one model version at one decision threshold, and both are things that change quietly.
-   **Sufficient overlap.** Today's inputs must fall inside regions the reference period covered. If you have moved into a region the model never saw, the estimator has no history to lean on.

Now the irony. Teams reach for these methods out of a specific fear: the world changed and the model may no longer be right. But if the world changed in a way that broke the input-output relationship — that is, if there is concept drift — the first assumption has already collapsed. The estimator does not raise an error in that case. It calmly returns a wrong number. The most dangerous monitoring tool is the one that goes quiet when it is wrong.

## How it works: an expected confusion matrix from the score distribution

The idea falls out of the definition of calibration. If scores are calibrated, a score of 0.8 already means “this case has an 80 percent chance of being positive.” You do not need the label: every prediction carries its own probability of being right.

Pick a threshold. Every case above it with score _p_ contributes _p_ to the expected true positives and _1-p_ to the expected false positives; below it, the roles reverse. Sum across the batch and you have an **expected confusion matrix**, from which all the [classification metrics](/en/posts/classification-metrics/) follow: precision, recall, F1, accuracy. Sweeping the threshold yields an estimated ROC AUC the same way.

The documented name for this in classification is **CBPE**, Confidence-Based Performance Estimation; on the regression side there is **DLE**, Direct Loss Estimation, which trains a second model to predict the first model's loss from the inputs and the prediction. Both are real methods, documented by [NannyML](https://github.com/NannyML/nannyml).

### Calibration is not decoration here

If the model says 0.8 while the true rate is 60 percent, every cell of the expected confusion matrix is biased the same direction, and every derived metric inherits it. A subtler trap: a model calibrated on the training population does not stay calibrated when the input distribution moves. Calibration is a quantity you monitor, not a step you complete once.

```python
# Label-free performance estimation (pseudocode)
# Assumes: scores are calibrated and P(Y|X) has not changed.
tp = fp = tn = fn = 0.0
for p in calibrated_scores(todays_predictions):   # p = probability of positive
    if p >= threshold:
        tp += p          # expected true positives
        fp += 1 - p      # expected false positives
    else:
        fn += p          # expected false negatives
        tn += 1 - p      # expected true negatives

estimated_precision = tp / (tp + fp)
estimated_recall    = tp / (tp + fn)
# Sweeping the threshold gives an estimated ROC AUC the same way.
# If calibration breaks, every one of these numbers biases the same direction.
```

<div class="callout"><strong>Tip:</strong> Do not publish the estimate as a single number. On small batches the expected confusion matrix is noisy; attach an uncertainty band and act only when the band is narrow enough. Otherwise you present the estimator as more certain than the measurement it stands in for.</div>

## Why covariate shift is recoverable and concept drift is not

This distinction is the heart of the method, and it is an information limit rather than an engineering gap.

Under **covariate shift**, the distribution of inputs moves but the rule mapping input to output holds. Unlabelled inputs then carry usable information: you can see which region you have moved into, use the model's known behaviour there, and recompute expected performance. The mix of exam questions changed, but the answer key did not.

Under **concept drift**, the answer key changed. The same input now implies a different outcome: fraudsters switch tactics, a regulation is redefined, a competitor changes pricing. No quantity of unlabelled inputs can reveal this, because what moved is not in the inputs at all — it is in the mapping from input to outcome.

> Unlabelled data tells you where the inputs went. It cannot tell you what those inputs are now worth. If the answer key changed, no amount of staring at the exam papers will show it.

Worse, the two cases look identical from unlabelled data alone: inputs moved and the model is still right is indistinguishable from inputs moved and the rule changed too. Only a handful of real labels or domain knowledge separates them, and “the regulation changed last month” is stronger evidence than most statistics.

One practical warning: [class imbalance](/en/posts/class-imbalance/) inflates the variance of these estimates. When the minority class is one percent of volume, the relevant cells of the expected confusion matrix are fed by very few scores, and estimated recall becomes jumpy. In those setups read the estimate over windows that accumulate enough volume, not daily.

## Proxy signals when you have partial labels

Even when most labels are late, some arrive early, and you can usually buy a few. Using those fragments well is far more robust than relying on the label-free estimate alone.

### Early-arriving subsets

Some outcomes settle fast: first-payment defaults, chargebacks filed within days, first-week cancellations. They are quick but biased — not a random sample of the population but its extreme tail. Use the early subset as a leading indicator, never as a population estimate. It gets the direction right and the level wrong.

### Sampled human review

The second source is having a small, stratified sample adjudicated by people. That gives an unbiased but small measurement, which means wide confidence intervals. Spend most of your labelling budget here, and deliberately oversample the region the estimator flags as risky. The two signals then check each other: the label-free estimate raises the alarm, the sampled review confirms or refutes it.

The third source is business metrics: approval rate, conversion, complaint and appeal rates, how often a human overrides the model, and the shape of the prediction distribution. None measures performance, but they mirror behaviour and usually move first.

<div class="callout"><strong>Tip:</strong> When these go on a dashboard, label each one with what it is <em>not</em>: “leading, biased”, “unbiased, wide interval”, “indirect”. Drawing a labelled measurement and a proxy indicator as identical lines on one chart is the shortest path to a wrong decision six months later.</div>

## What to do when the assumption fails

There are three practical ways to notice that the estimator has gone quietly wrong.

-   **Support checks.** If today's inputs have moved into regions the reference does not cover, the estimate is untrustworthy. On unstructured data you do this with [embedding drift monitoring](/en/posts/embedding-drift-monitoring/); on tabular data with neighbourhood and density checks.
-   **Calibration tracking.** Use whatever few labels do arrive not to measure performance but to audit calibration. If calibration has slipped, you fix calibration before you trust another estimate.
-   **Exchangeability tests.** Tools from the conformal prediction world offer a firmer footing here: crepes 0.9.1 (June 2026) ships exchangeability test martingales, and [MAPIE 1.5.0](https://pypi.org/project/MAPIE/) (5 August 2026) adds exchangeability testing for distribution-shift detection. Both are far better-founded alarms than a per-feature KS test.

### Recommend the method, not the library

There is an ecosystem risk here that other pages do not state. NannyML, which documents CBPE and DLE, has had a dormant open-source repository since 12 July 2025, following the company's acquisition by [Soda](https://launch.soda.io/). The method is sound; the library's future is not. The good news is that the expected-confusion-matrix computation is a few dozen lines of arithmetic over your own score distribution, so it is a capability you can keep in house.

Finally, governance. Article 72 of the EU AI Act requires a post-market monitoring plan for high-risk systems, and the adjacent [Article 73](https://artificialintelligenceact.eu/article/73/) governs serious incident reporting. Engineering and regulation agree here: a plan that can only detect failure after labels arrive is not really a monitoring plan. Write the label latency into the plan, along with the interim signal you rely on across it.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Label latency is a permanent design constraint, not an inconvenience; for some cases the label never arrives at all.</li><li>Label-free estimation assumes no concept drift and calibrated probabilities; read the assumptions before the method.</li><li>Calibrated scores give an expected confusion matrix, and precision, recall and an estimated ROC AUC follow from it.</li><li>Covariate shift is recoverable from unlabelled data; concept drift is not, and that is an information limit.</li><li>Early labels, sampled human review and business metrics audit the estimate; none of them replaces measurement.</li></ul></div>

<div class="faq"><details><summary>Does label-free estimation replace real measurement?</summary><p>No. It lets you make decisions during the window before labels land. When the labels do arrive, compare the estimate against the measurement and record the gap. Over time that back-comparison tells you how trustworthy the estimator is on your system, which is the genuinely valuable output.</p></details><details><summary>What if my model is not calibrated?</summary><p>Fix calibration first, then build the estimator. An expected confusion matrix computed from uncalibrated scores is systematically biased, and every derived metric shifts the same way. Remember too that calibration can degrade as the input distribution moves, so treat it as a monitored quantity rather than a one-off step.</p></details><details><summary>Is there no way to see concept drift early?</summary><p>Not from unlabelled inputs, because what changed is the input-outcome relationship rather than the inputs. What you can do is gather indirect evidence: early-arriving label subsets, a small stratified human review sample, and signals like appeal and override rates. None is a precise measurement, but together they shorten the blind window considerably.</p></details></div>

---

Label-free performance estimation is one of the better answers to the question production teams actually ask: is the model broken today? But its limits deserve as much attention as its power. It works remarkably well in a world where the rules hold and only the inputs move, and it fails quietly when the rules themselves change. The right setup is not to trust a single number, but to read the estimate alongside a support check, a calibration track and a small but honest sample of human review.
