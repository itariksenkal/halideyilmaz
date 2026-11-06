---
title: "Conformal Prediction: Measuring Uncertainty With Distribution-Free Guarantees"
description: "Conformal prediction turns any model into prediction sets with a distribution-free, finite-sample coverage guarantee. Split conformal step by step, the nonconformity score, and why marginal coverage is not conditional coverage."
publishDate: "2026-08-13T23:14:00+03:00"
lang: en
category: "Methods"
tags: ["Methods", "AI"]
translation: "konformal-tahmin"
heroImage:
  src: "../../../assets/blog/bimg-16.jpg"
  alt: "Conformal Prediction: Measuring Uncertainty With Distribution-Free Guarantees"
---

Your model gives an answer, and you want to know how much to trust it. Conformal prediction answers that with unusual clarity: without changing your model at all, it turns a single prediction into a set or an interval that contains the true answer at the rate you specify, while assuming nothing about how the data is distributed. This post builds the method step by step, states what the guarantee promises, and covers where practitioners misread it.

## From a single answer to a set of answers

An experienced physician never hands you a one-word diagnosis. On easy cases they name one thing; on hard cases they give you a short list: it is one of these three. The length of that list is the most honest signal available of how hard the case is.

Classification models almost always name one thing, with a confidence score whose meaning is usually unclear. [Classification metrics](/en/posts/classification-metrics/) tell you how good the model is on average; they promise nothing about the single case in front of you.

**Conformal prediction** fills that gap. It does not change your model, retrain it, or touch its architecture. It wraps a thin layer around it and converts the output from a single prediction into a _set_ (for classification) or an _interval_ (for regression). In return it makes a numerical promise: these sets contain the true answer at the rate you asked for.

That is a different promise from [model calibration](/en/posts/model-calibration-probabilities/). Calibration repairs the scale of the score so probabilities are right on average; conformal prediction targets a coverage rate directly, without assuming a distribution. They are complements, not rivals: calibrated scores let the conformal layer produce smaller sets.

> Conformal prediction does not make the model better. It makes the model admit honestly how good it is.

## Split conformal prediction, step by step

The most common and most intuitive form is **split (inductive) conformal prediction**. It has three steps, and all three are easy to picture.

**Step one: the nonconformity score.** Define a number that measures how surprised the model is by a case. In classification the simplest version is one minus the probability the model assigned to the true label: the less probability the model gave the right answer, the higher the score. In regression it is simply the absolute error.

**Step two: a quantile on the calibration set.** Compute that score for every case in a calibration split the model never saw during training. You now hold a distribution of scores; if you target 90 percent coverage, take roughly its 90th percentile. That single number is the threshold of normal surprise for your model.

**Step three: build the set.** When a new case arrives, try every candidate label in turn and keep every label whose nonconformity score falls below the threshold. That is the whole method.

```python
# Split conformal prediction (pseudocode)
train, calib, test = split(data)           # calib is NEVER used for fitting
alpha = 0.10                               # target coverage = 90%

model = fit(train)

# 1) nonconformity scores on the calibration split
scores = []
for x, y in calib:
    scores.append(1 - model.proba(x)[y])   # probability given to the true label

# 2) the quantile: (n+1)(1-alpha) rounded up -> finite-sample correction
n = len(scores)
k = ceil((n + 1) * (1 - alpha))
q = sorted(scores)[k - 1]

# 3) for a new case, keep every label that stays under the threshold
def prediction_set(x):
    return [y for y in labels if 1 - model.proba(x)[y] <= q]

# An empty or very wide set means the model is struggling on this case.
```

Why (n+1) rather than n? That small correction makes the guarantee hold for the finite calibration set you actually have, rather than in the limit of infinite data. The whole trick hides in that detail.

## What the guarantee actually promises

The promise in one sentence: your sets contain the true label at least as often as the rate you specified. Every word carries a limit, and nobody should use this tool without reading the small print.

-   **Distribution-free:** it assumes nothing about normality, symmetric errors, or a correctly specified model. The underlying model can be a gradient boosted tree, a deep network, or a hand-written rule set.
-   **Finite-sample:** the guarantee is not asymptotic. It holds with a few hundred calibration cases too; it is simply noisier.
-   **Marginal:** the guarantee is an average over the whole test distribution. It says nothing about a particular case, class or subgroup.
-   **Requires exchangeability:** the order of your calibration and test cases must not matter. Weaker than independent and identically distributed, but not an empty assumption.

And what it does _not_ promise: that your model is any good. A weak model still hits the target, just with enormous sets. In a five-class problem, a set containing four classes for every case is perfectly valid and perfectly useless. This is why conformal results are reported with two numbers: **coverage** and **average set size**. The first measures correctness, the second measures efficiency.

## Sets, intervals, and what set size tells you

### Sets in classification

In classification the output is a list of labels: one element on easy cases, several on hard ones. An empty set is a special signal - no label made it under the threshold, so the model reacted in a way that resembles nothing it saw in calibration. Wire that straight into [anomaly detection](/en/posts/anomaly-detection/).

### Intervals in regression

In regression the output is a lower and an upper bound. In the simplest form you take a quantile of the absolute errors and add it as a plus-or-minus, giving every case an interval of the same width. More advanced variants adapt the width to local difficulty; methods built on quantile regression widen the interval where the data is noisy.

The real prize is that set size is _actionable_. A large set says this case is hard, and that turns straight into a business rule: single-element sets pass automatically, multi-element sets go to a human. Uncertainty quantification stops being a chart and becomes part of the workflow.

The same signal is valuable for labelling budgets. In [active learning](/en/posts/active-learning/), using set size instead of a raw confidence score to pick what to label gives you a difficulty measure that is meaningful by construction.

<div class="callout"><strong>Tip:</strong> Never report coverage on its own. Put average set size and the rate of empty sets next to it. A system that hits its target with bloated sets is technically correct and practically useless.</div>

## Marginal coverage is not conditional coverage

If you remember one section of this post, make it this one. The most frequent misreading of conformal prediction is treating a marginal guarantee as a conditional one.

Marginal coverage is coverage averaged over the whole test distribution. Your system can hit its target exactly while falling systematically short on a particular class, region or demographic subgroup. The average trades over-coverage on the majority class against under-coverage on the minority class, and the report looks flawless.

This is not a theoretical worry. Systematic under-coverage of the minority class under marginal conformal prediction is a [documented failure mode](https://arxiv.org/abs/2607.06605). If you are already dealing with [class imbalance](/en/posts/class-imbalance/), your calibration set holds few minority-class cases, and their score distribution simply disappears inside the shared quantile.

> Ninety percent coverage does not mean everyone is covered ninety percent of the time. No guarantee should be read without asking who the average is working for.

The remedy is conceptually simple: instead of one shared quantile, compute a separate quantile per group. Known as class-conditional or Mondrian conformal prediction, it gives each group its own threshold and lifts the guarantee to group level. The cost is equally clear: every group needs its own calibration cases, so thresholds get noisy for small groups. The right question is who you want the guarantee for. If the answer is not an average user, you need the conditional version.

## In practice: shift, assumptions and tooling

The exchangeability assumption is the one genuine fragility here. When the data distribution shifts, your calibration set no longer represents the future and the guarantee quietly dissolves. In seasonal time series and in products whose user base is changing, this is the rule rather than the exception. Adaptive and online variants target the problem, but none excuse you from refreshing the calibration set.

On tooling, the ecosystem moves fast and much of the advice online is stale. [MAPIE](https://pypi.org/project/MAPIE/), the most visible Python library, released 1.5.0 on 5 August 2026; its v1.0.0 release of 22 May 2025 broke the API, so 0.x-era tutorial code will not run unchanged. [MAPIE](https://mapie.readthedocs.io/en/stable/) is a scikit-learn-contrib project maintained with Capgemini Invent, Quantmetry, Michelin and ENS Paris-Saclay, and its 2026 updates add risk control for large language models and image segmentation plus adaptive conformal methods. Among alternatives, crepes 0.9.1 (June 2026) adds conformal predictive systems and exchangeability test martingales, and TorchCP is at 1.2.1.

<div class="callout"><strong>Tip:</strong> If you land on a page still recommending AWS Fortuna or <code>nonconformist</code>, that page is out of date. The Fortuna repository was <a href="https://github.com/awslabs/fortuna" target="_blank" rel="noopener">archived on 23 April 2025</a>, and <code>nonconformist</code> last shipped a release in 2017. Treat it as a warning sign for the rest of the advice on that page too.</div>

For a conceptual entry point, Angelopoulos and Bates, [A Gentle Introduction to Conformal Prediction](https://arxiv.org/abs/2107.07511), is still the best start. Deeper: [Theoretical Foundations of Conformal Prediction](https://arxiv.org/abs/2411.11824) by Angelopoulos, Barber and Bates, a Cambridge University Press draft revised on 6 March 2026 - a book frequently miscited, since Candès is not among its authors.

Finally, the regulatory angle: [Article 15 of the EU AI Act](https://artificialintelligenceact.eu/article/15/) requires providers to declare levels of accuracy and the relevant accuracy metrics. Declaring a targeted and verified coverage rate is both more defensible and easier to audit than declaring a bare accuracy percentage.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Conformal prediction leaves the model alone and converts its output into sets or intervals with a coverage guarantee.</li><li>Three steps: a nonconformity score, a quantile on the calibration set, and every label that stays under the threshold.</li><li>The guarantee is distribution-free, finite-sample and marginal, and it rests on exchangeability.</li><li>Marginal coverage is not conditional coverage: a system can hit its target while under-covering a minority class.</li><li>Never report coverage alone - average set size is the measure of efficiency.</li></ul></div>

<div class="faq"><details><summary>Do I have to retrain my model to use conformal prediction?</summary><p>No. Split conformal uses the model as it is; all you need is a calibration split that was not used for fitting. It works on an already trained model, even one you cannot look inside.</p></details><details><summary>How large should the calibration set be?</summary><p>Rather than a fixed number, work from the intuition: you are estimating a quantile, so you need enough cases in the tail of your target coverage. With small sets the threshold is noisy and realised coverage fluctuates. For group-level guarantees, that requirement applies to each group separately.</p></details><details><summary>Should I use calibration or conformal prediction?</summary><p>They do different jobs. Calibration repairs the probability scale of the score; conformal prediction guarantees a coverage rate. Because calibrated scores produce smaller conformal sets, using both together works best in practice.</p></details></div>

---

Conformal prediction has a property rare among uncertainty methods: what it promises, and what it does not, is written down. Read it as a contract rather than as magic. As long as you preserve the conditions under which that contract holds, your model will give you its first genuinely honest statement of uncertainty.
