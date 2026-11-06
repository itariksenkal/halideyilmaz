---
title: "Is That 1 % Real? Confidence Intervals and Bootstrap for Comparing Models"
description: "One model beating another by a point is usually noise. How test set sampling error, bootstrap confidence intervals, paired tests and multiple comparison correction tell you whether the gap between two models is real."
publishDate: "2026-08-13T23:16:00+03:00"
lang: en
category: "Evaluation"
tags: ["Evaluation", "AI"]
translation: "model-karsilastirma-istatistik"
heroImage:
  src: "../../../assets/blog/bimg-14.jpg"
  alt: "Is That 1 % Real? Confidence Intervals and Bootstrap for Comparing Models"
---

You trained two models. One scored 91.2 on the test set, the other 92.1. The meeting picked the second, it shipped, and three weeks later nobody could see a difference. This story repeats in every team, because the number in the report had no error bar. A test score is not a constant, it is an estimate — and the uncertainty around that estimate is usually larger than the gap you are celebrating. This post is about measuring whether the gap is real: sampling error, bootstrap confidence intervals, paired tests, seed variance, and the false-positive inflation that arrives the moment you compare many candidates.

## A gap smaller than seed variance

Picture a scale. Weigh the same sack three times and it reads 50.2 kg, 50.4 kg, 50.1 kg. The scale is not broken; every instrument has a repeatability margin. Now imagine weighing two different sacks, getting 50.2 and 50.4, and writing a report that says the second one is heavier. That is exactly the mistake we make when comparing models.

A single training run carries noise from several independent sources: random weight initialisation, data shuffling order, dropout masks, non-deterministic parallel reductions, and — always — the fact that the test set itself is a sample. Run the same code twice changing nothing but the random seed, and in most projects the resulting gap is the same size as the improvements people report.

So the first question is not “which model is better?” The first question is: _what is the repeatability margin of this instrument?_ Every comparison made without that answer is a comparison made on a scale that is not broken but whose precision nobody knows.

> A score without an error bar is not a measurement, it is a claim. And you cannot select a model by comparing claims.

## Your test set is a sample

Your test set is not the population; it is a sample drawn from it. Which means the accuracy, F1 or error rate you compute on it is an _estimate_, and every estimate has a standard error.

The intuition is easy: had you measured the same model on a different test set drawn from the same distribution, you would have gotten a different number. That wobble shrinks as the sample grows, but it shrinks with the square root — doubling the test set does not halve the uncertainty. And what governs the uncertainty is not the total item count but the count in the cells your decision rests on: if a rare class has only forty examples, its recall is volatile even inside a test set of ten thousand. That is why each of your [classification metrics](/en/posts/classification-metrics/) needs its own interval rather than one global error bar.

There is one question to ask before computing any interval: can this metric carry the sentence you want to write? Ehud Reiter's [structured review of the validity of BLEU](https://aclanthology.org/J18-3002/) — 284 correlations across 34 papers — concludes that the evidence does not support using BLEU outside of MT, for evaluation of individual texts, or for scientific hypothesis testing. A confidence interval drawn around an invalid metric does nothing except make the wrong answer more persuasive.

## Bootstrap: building an interval by resampling

Instead of memorising standard-error formulas, there is a safer and far more general route: the bootstrap. The idea is almost crude. You have exactly one test set, and you behave as though you had many.

You draw a new sample from your test set, of the same size, with replacement — some items appear twice, some not at all. You recompute the metric on that resample. Repeat many times, then trim the tails of the resulting distribution: the 2.5th and 97.5th percentiles give you a 95% interval.

```python
# Bootstrap interval for a metric (pseudocode)
scores = []
for i in range(B):                       # B large, thousands is fine
    idx = sample_with_replacement(test_set, n=len(test_set))
    scores.append(metric(predictions[idx], labels[idx]))

low, high = percentile(scores, 2.5), percentile(scores, 97.5)
# With rare classes, stratify the resample so class shares are preserved.
# If rows are not independent (same user, same document), resample whole
# groups rather than single rows, or the interval comes out too narrow.
```

The bootstrap has two traps. The first is dependent items: if rows belonging to the same user, document or conversation are drawn individually, your interval comes out narrower than reality and sells you a precision you do not have. The second is leakage: an interval computed on a test set that overlaps training is a perfect circle drawn around the wrong number. [A clean split](/en/posts/data-leakage-cross-validation/) is the precondition of all the statistics that follow.

## The real question: an interval on the difference

Now the most common mistake in the field. You plot the two models' confidence intervals side by side, notice they overlap a little, and conclude that the difference is not significant. That inference is usually wrong.

The quantity you care about is not two separate scores but the _difference_ between them, and the difference has an interval of its own. Because both models were measured on the same test set, their errors are not independent: both stumble on the same hard items. Once that shared difficulty is accounted for, the uncertainty on the difference is markedly smaller than the uncertainty on either score. Judging by overlapping intervals throws away the strongest piece of information you have, which is the pairing.

The right approach is a paired measurement. In bootstrap terms that means drawing the _same_ indices for both models in every iteration and computing the difference; you end up with a distribution of the difference and simply check whether its interval contains zero. For classification there is also a classical test that does the same job: McNemar's test, which looks only at where the two models disagree — the items one got right and the other got wrong. Both share one intuition: items that both models classify identically say nothing about which is better. The information lives in the disagreements.

> The interval on the scores does not answer your question. The interval on the difference does — and if it contains zero, you do not have a winner.

## Many candidates, many comparisons

Testing one difference is easy. Testing twenty differences almost guarantees that at least one comes out “significant” by pure chance. Anyone running a hyperparameter sweep, trying three architectures across five seeds, or climbing a leaderboard over several weeks walks into this without noticing.

### Correcting for it

The simplest remedy is the Bonferroni correction: divide your significance threshold by the number of comparisons you made. It is conservative, so it will also miss some real differences. Holm's method buys the same guarantee with less lost power by ranking the p-values and relaxing the threshold in steps. Whichever you pick, the real discipline is counting the comparisons honestly — reporting only the winner and quietly forgetting the forty variants you tried makes any correction meaningless.

### Reporting seed variance

A seed is not a hyperparameter. Picking the best seed and reporting its score is presenting noise as achievement. The correct practice is to run the same configuration across several seeds and report the spread alongside the mean. If the seed spreads of two models overlap broadly, the gap between their means is not a finding, however much you like it.

Looking at the same test set again and again carries a second cost: over time you adapt to it. It is not the weights that overfit, it is your decisions. This is the human-in-the-loop version of [overfitting to training data](/en/posts/overfitting-regularization/), and it corrupts the measurement the same way. At field scale, the same problem has a name — [benchmark contamination](/en/posts/benchmark-contamination/).

## Reporting discipline: error bars are now a compliance artefact

Reporting uncertainty used to be good scientific manners. It is becoming an obligation. [Article 15 of the EU AI Act](https://artificialintelligenceact.eu/article/15/) requires providers to declare the levels of accuracy and the relevant accuracy metrics in the instructions for use. The voluntary side asks for the same thing: the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) devotes one of its four functions — Govern, Map, Measure, Manage — to measuring the system and documenting the measurement.

Put the two together and one sentence falls out: a point estimate with no interval is no longer merely sloppy science, it is an incomplete declaration. If you declare a number, you are also declaring the dataset it was measured on, the date it was measured, and the uncertainty it carries.

Keep the field's pace in mind as well. The [Stanford HAI AI Index 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report) reports that SWE-bench Verified rose from 60% to near 100% in a single year and that OSWorld agents went from 12% to about 66%, while the top model reads analog clocks correctly just 50.1% of the time. Those figures belong to the moment the report measured them and leaderboards move fast, but the lesson is durable: headline scores can leap by tens of points while the same systems sit at coin-flip level on an elementary task. A single aggregate number hides that structure completely.

<div class="callout"><strong>Tip:</strong> Add four lines to every model comparison report: the name and version of the test set, the confidence interval on the difference, how many comparisons were made, and how many seeds were run. Those four lines end most arguments before they start.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>A test score is an estimate rather than a constant; a number without an error bar does not count as a measurement.</li><li>The bootstrap is the most general way to build an interval from a single test set; resample dependent rows as whole groups.</li><li>Never judge by overlapping intervals; compute the interval on the difference directly with a paired bootstrap or McNemar's test.</li><li>When comparing many candidates, correct with Bonferroni or Holm and report the seed spread; a seed is not a hyperparameter.</li><li>Declared accuracy is now a regulatory artefact: state the dataset, the date and the uncertainty alongside the number.</li></ul></div>

<div class="faq"><details><summary>The two models' confidence intervals overlap. Does that mean there is no difference?</summary><p>No. Both models were measured on the same test set, so their errors are correlated and the uncertainty on the difference is smaller than the uncertainty on either score. Compute the interval on the difference directly, with a paired bootstrap or McNemar's test.</p></details><details><summary>How many bootstrap iterations are enough?</summary><p>Enough when the ends of the interval stop moving meaningfully as you add iterations. Thousands of resamples are usually cheap; the real cost sits in computing the metric. Running too few iterations simply adds noise to the interval you are reporting.</p></details><details><summary>I only trained with one seed. What should I do?</summary><p>At minimum, repeat the final configuration across a few seeds and report the spread. If that is impossible, state plainly that seed variance was not measured. Declaring the limitation gives the decision-maker real information; ignoring an unmeasured uncertainty does not.</p></details></div>

---

In short: comparing models is a measurement task, not a scoreboard-reading task. Compute the interval on the difference, count how many comparisons you ran, show the seed spread, and never report a number separated from its uncertainty. Teams that do this announce fewer wins, and the wins they announce turn out to be real.
