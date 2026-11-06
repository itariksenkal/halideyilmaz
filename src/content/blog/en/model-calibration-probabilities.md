---
title: "Model Calibration: What Does It Mean When Your Model Says \"90 % Confident\"?"
description: "An uncalibrated score makes threshold selection meaningless and silently invalidates every downstream cost-benefit decision. Reliability diagrams, expected calibration error, Platt scaling, isotonic and temperature scaling explained."
publishDate: "2026-08-13T23:15:00+03:00"
lang: en
category: "Metrics"
tags: ["Metrics", "AI"]
translation: "model-kalibrasyonu"
heroImage:
  src: "../../../assets/blog/bimg-15.jpg"
  alt: "Model Calibration: What Does It Mean When Your Model Says \"90 % Confident\"?"
---

Your model outputs 0.9 for a case. What does that mean? Most teams read the number as a probability, when in fact many models emit nothing more than a ranking score. The difference is not a detail: a threshold chosen on an uncalibrated score silently invalidates the entire cost-benefit calculation that threshold was supposed to encode. This post covers what calibration is, how it is measured, how it is repaired, and why accuracy and AUC have nothing to say about it.

## What confident actually means

Picture a weather forecaster. Collect every day of the year on which they said there was a 30 percent chance of rain. If it rained on roughly a third of those days, the forecaster is calibrated. If it never rained, or rained almost every time, the forecaster may still be ranking days correctly, but the number they said is not a probability.

**Model calibration** asks exactly that question. Take the 100 cases your model scored 0.9: if about 90 of them are genuinely positive, the model is calibrated. If 60 are, it is overconfident. If 99 are, it is underconfident.

Notice that the definition says nothing about how good the model is. A model that outputs the dataset base rate for every case is perfectly calibrated and completely useless. Calibration does not replace discrimination; it sits beside it. A good model needs both: the right ranking _and_ the right scale.

In practice the distinction bites the moment you use the score as a probability - picking a threshold, computing an expected cost, averaging two models, or writing a rule that escalates to a human. At that point calibration stops being a nicety and becomes a prerequisite.

> Calibration does not measure whether the model is right. It measures whether the model knows how right it is.

## Reliability diagrams and expected calibration error

The most direct way to see calibration is a **reliability diagram**. Bin the predictions by score. For each bin, put the mean predicted score on the horizontal axis and the observed positive rate on the vertical axis. A perfectly calibrated model sits on the diagonal.

Points below the diagonal mean overconfidence, points above mean underconfidence. The most common pattern in deep networks is a curve that sags well below the diagonal at high scores: the model says 0.99, the true rate is considerably lower.

The **expected calibration error (ECE)** collapses that chart into a single number: take the absolute gap between prediction and observation in each bin, weight it by the number of cases in the bin, and sum.

Here is the trap: ECE is not a measurement, it is a binning choice. Change the number of bins and the number changes. Swap equal-width bins for equal-count bins and it changes again. Few bins hide gaps inside averages; many bins turn sampling noise into apparent miscalibration. Two ECE values computed with different binning settings are not comparable.

<div class="callout"><strong>Tip:</strong> Never report ECE on its own. State the binning rule, the number of bins and the number of cases per bin, and include the raw diagram where you can. If a bin holds only a handful of cases, what you are looking at is noise, not miscalibration.</div>

## Why accuracy and AUC stay silent

A small thought experiment. Square every score your model produces: 0.9 becomes 0.81, 0.5 becomes 0.25. The relative ordering of cases has not moved at all, because squaring is a monotone transform.

AUC looks only at ordering, so it does not budge. Accuracy, precision, recall and F1 look at a single threshold; transform the threshold the same way and you get exactly the same decisions and therefore exactly the same numbers. Yet the model's probability scale is now thoroughly broken.

The conclusion is blunt: the whole family of [classification metrics](/en/posts/classification-metrics/) is invariant to monotone rescaling, and therefore tells you nothing about calibration. Excellent AUC and a badly distorted probability scale coexist comfortably in the same model.

The measures that actually penalise miscalibration belong to a different family: _proper scoring rules_, namely the Brier score and log loss. These carry both a discrimination component and a calibration component. They are useful, but a single Brier score will not tell you whether an improvement came from better ranking or a better scale. Read them alongside the diagram, never instead of it.

## Thresholds, and the cost calculation that quietly dies

The bill for miscalibration is not paid on the chart. It is paid at the decision table. Every time you pick a threshold you are, whether you say it out loud or not, declaring a cost ratio.

The classical result from decision theory is simple: if you know the cost of acting on a case and the cost of missing it, the threshold that minimises expected cost is the ratio of those two costs. If a miss is nine times more expensive than an intervention, you act the moment the probability exceeds 0.1. The argument is elegant and it rests entirely on one assumption - that the number the model gives you is a real probability.

If the model says 0.1 while the true rate is 0.4, you believe you are applying a 1:9 cost ratio while in fact applying something else entirely. It no longer matters how carefully you tuned the threshold, because the arithmetic underneath it was already void. The same distortion spreads to every spreadsheet that multiplies a score by an expected revenue, every rules engine, and every escalate-to-a-human policy.

The bad news is that this failure is silent. Your accuracy report keeps looking fine, the dashboards stay green, and the loss accumulates only in real costs.

Regulators are looking at the same spot: [Article 15 of the EU AI Act](https://artificialintelligenceact.eu/article/15/) requires providers to declare the levels of accuracy and the relevant accuracy metrics. Declared numbers have to mean something to whoever reads them, and an uncalibrated confidence score cannot carry that meaning.

The problem contaminates explanations too. [Interpretability](/en/posts/model-interpretability-xai/) tools tell you how an output was produced; if the scale of that output is broken, what you end up with is a very persuasive explanation of a distorted number.

## Fixing it: Platt, isotonic and temperature scaling

The good news is that calibration can usually be repaired without retraining the model. What you learn is a small mapping from raw score to probability. That mapping does not disturb the ranking; it only corrects the scale.

### Platt scaling and isotonic regression

**Platt scaling** fits a two-parameter logistic curve on top of the score. It works with little data and is stable, but it assumes the distortion is sigmoid-shaped; if the distortion has another shape, it cannot fully undo it.

**Isotonic regression** assumes no parametric form at all: it learns a step-shaped mapping subject only to being non-decreasing. That flexibility is the point, and also the risk - on a small calibration set it overfits, and it can collapse outputs onto a handful of discrete values.

### Temperature scaling

**Temperature scaling** is the default for multi-class neural networks: divide all logits by a single number before the softmax. With one parameter the overfitting risk is minimal, and because it never changes which class scores highest, your accuracy is untouched. Only the spread of confidence tightens or loosens.

Whichever you choose, one rule is not negotiable: the calibration mapping is learned on a **held-out split**. Calibrate on the training set and you are fitting a correction on cases the model has already memorised, producing a flawless diagram for a model that is still, in reality, uncalibrated.

```text
# Learning the calibration map on a held-out split (pseudocode)
train, calib, test = split(data)            # test is never touched until the end

model  = fit(train)                         # 1) fit the model on train only
s_cal  = model.score(calib)                 # 2) raw scores on the calibration split
mapping = fit_calibrator(s_cal,             #    Platt / isotonic / temperature
                         labels(calib))

# 3) in production every prediction goes through two steps
probability = mapping(model.score(new_case))

# 4) evaluate only on the untouched test split
reliability_diagram(mapping(model.score(test)), labels(test))
# Rule: fitting the calibrator on training data is grading your own homework.
```

## Where calibration breaks

Calibration is not a task you finish, because most of the things that break it are standard parts of your pipeline.

The most common breaking point is imbalance handling. Oversampling the minority class, undersampling the majority class or applying class weights deliberately changes the base rate the model sees. The result is a systematically inflated probability scale: the model met the minority class far more often than the world produces it, and it speaks accordingly. When you work on [class imbalance](/en/posts/class-imbalance/), accept this and calibrate on a split that carries the natural prevalence; calibrating on the resampled set only freezes the error in place.

The second breaking point is time. When the prevalence of an event shifts, a model's discrimination can hold up for a while, but its probability scale has already moved. Calibration therefore belongs on the monitoring dashboard next to accuracy, and the calibrator itself deserves versioning exactly like the model.

The third is that calibration alone is not enough. A probability scale that is right on average still does not tell you how reliable you are on one specific case. Teams that need a guarantee move on to [conformal prediction](/en/posts/conformal-prediction-uncertainty/) at this point: calibrated scores make a good starting point, and the conformal layer adds a coverage guarantee on top. Methods that estimate performance on unlabelled data rest on the same prerequisite - feed them uncalibrated scores and their estimates are not trustworthy.

On the tooling side this ecosystem is moving fast. [MAPIE](https://mapie.readthedocs.io/en/stable/), for instance, is a scikit-learn-contrib library whose v1 launched in 2025; it is maintained with Capgemini Invent, Quantmetry, Michelin and ENS Paris-Saclay, and its 2026 updates add risk control for large language models and image segmentation plus adaptive conformal methods.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Calibration means this: of 100 cases you score 0.9, about 90 should turn out positive.</li><li>Accuracy and AUC are invariant to monotone rescaling, so they say nothing about calibration.</li><li>An uncalibrated score voids the cost arithmetic sitting underneath your threshold, silently.</li><li>Platt, isotonic and temperature scaling fix the scale without touching the ranking - all on a held-out split.</li><li>Resampling, class weights and shifting prevalence break calibration on a regular schedule.</li></ul></div>

<div class="faq"><details><summary>Will calibration improve my model's accuracy?</summary><p>Usually not. Temperature scaling never changes which class scores highest, so accuracy is unchanged, and Platt and isotonic preserve the ranking too. Calibration improves the quality of your decisions through thresholds and cost arithmetic, not through raw accuracy.</p></details><details><summary>My ECE is low - am I done?</summary><p>No. ECE is sensitive to binning settings and it is an average. A model that looks fine on average can be badly distorted within a particular subgroup or score band. Plot the diagram per subgroup as well as overall.</p></details><details><summary>How often should I recalibrate?</summary><p>Every time you retrain, every time you change the sampling strategy, and whenever the prevalence of the event shifts. Treat the calibrator like a model: learned on its own split, versioned and monitored.</p></details></div>

---

Calibration is the cheapest step in measurement discipline and the one most often skipped. Improving a model's ranking can take months; fixing its probability scale is usually a matter of one extra split and a few lines of code. If you want people to believe the number your model reports, first check what that number actually means.
