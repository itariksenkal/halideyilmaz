---
title: "Annotator Agreement and Evaluator Reliability: Kappa, Alpha, and Validating an LLM Judge"
description: "Raw percentage agreement is not reliability. How Cohen kappa, Fleiss kappa and Krippendorff alpha correct for chance, how to read the thresholds, and how to validate an LLM judge the way you validate a human annotator."
publishDate: "2026-08-13T23:18:00+03:00"
lang: en
category: "Metrics"
tags: ["Metrics", "AI"]
translation: "etiketleyici-uyumu-kappa"
heroImage:
  src: "../../../assets/blog/covers/annotator-agreement-evaluator-reliability.jpg"
  alt: "Annotator Agreement and Evaluator Reliability: Kappa, Alpha, and Validating an LLM Judge"
---

You hand two annotators the same hundred examples, they assign the same label on eighty-five of them, and the report says _85% agreement_. On its own that number tells you almost nothing: two people who never look at the examples and always tick the most common class can clear 80% by luck alone. Measuring inter-annotator agreement starts exactly here — by subtracting the agreement that chance hands you for free. This post covers the kappa and alpha coefficients, how to read their thresholds, and the newer problem all of us now have: validating the reliability of a language model used as a judge, exactly the way you would validate a human annotator.

## Percentage agreement is not agreement

Picture two radiologists given a thousand images, ninety-five percent of which are normal. If both of them label every image _normal_ without looking, their raw agreement is ninety-five percent. Zero information produced, a near-perfect score.

That is the single fatal flaw of raw percentage agreement: it leaves the agreement that chance produced inside the measurement. Every chance-corrected coefficient is built on the same simple idea. Take the observed agreement, subtract the agreement you would expect by chance given the class distribution, then divide what is left by the largest improvement that was available.

`kappa = (observed agreement − expected agreement) / (1 − expected agreement)`

The correction has three readings. Zero: your annotators are no better than a coin flip. Negative: they disagree systematically, which usually means one clause in the guideline is being read in two opposite ways. One: perfect agreement.

The consequence that matters most is this. The more imbalanced the class distribution, the higher the expected agreement climbs, so the same raw percentage means less and less. It is precisely why we never trust bare accuracy in [classification metrics](/en/posts/classification-metrics/) either — a number only means something next to its baseline.

## The kappa family: which coefficient, when

Three coefficients cover almost everything you will meet in practice. The difference between them is not philosophical but structural: each fits a different labeling design.

-   **Cohen's kappa:** exactly two annotators, both labeling the same complete set of items, nominal categories. This is the coefficient of the classic two-person pilot.
-   **Fleiss' kappa:** every item labeled by a fixed number of annotators, but the annotators may differ from item to item. This is the right choice when you work with a large labeling pool.
-   **Krippendorff's alpha:** any number of annotators, missing cells are fine, and the scale may be nominal, ordinal or interval. Because it computes disagreement through a distance function, a one-versus-two disagreement on a five-point quality scale counts for less than a one-versus-five disagreement.

The rule of thumb is short: if your scale is ordinal, or your annotation matrix is full of holes — which it always is in a real project, because nobody labels everything — use alpha. With a nominal, two-annotator, fully populated matrix, Cohen's kappa and alpha land close to each other anyway.

Choosing the coefficient is the easy part. The hard part is diagnosing a low score correctly. The problem is rarely careless annotators; it is a guideline that never described the edge cases. Enriching your [labeling guideline](/en/posts/data-quality-labeling/) with the actual examples people disagreed on and then re-measuring is the single fastest way to raise agreement on the same budget. Treat the coefficient not as a grade for your annotators but as a diagnostic for your guideline.

## Reading the thresholds: is 0.61 good?

You measured, and kappa came out at 0.61. Good? The answer comes from the cost of the decision, not from a table — but the table first.

[McHugh's 2012 review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3900052/) gives the commonly used bands: 0.61-0.80 is _substantial_ and 0.81-1.00 is _almost perfect_. The same paper adds a warning that gets quoted far less often: any kappa below 0.60 indicates inadequate agreement. The comfortable-sounding middle band does not mean you have a usable dataset.

For Krippendorff's alpha the criterion is sharper still: [alpha of 0.800 or above counts as reliable](http://faculty.washington.edu/jwilker/559/Krippendorf.pdf), values between 0.667 and 0.800 support only tentative conclusions, and data below 0.667 should be discarded.

> A threshold is read against the cost of the decision it supports. For a content recommendation label, 0.70 is fine. For a triage label, 0.70 means two experts disagree on one out of every three borderline cases.

There is also a trap: the kappa paradox. When one class dominates, expected agreement pins itself near the ceiling and kappa comes out low even though your annotators are genuinely doing well. In that situation, refuse to collapse everything into one number — report the raw percentage, the class-specific agreement rates and the kappa side by side. The confusion matrix tells you where agreement broke; the coefficient never does.

## An LLM judge is just another annotator

Now the point of all this. When you use a language model to score outputs, you have not created a new category of thing. You have hired an annotator: cheap, fast, tireless, and so far unmeasured. Everything you would demand of a human annotator you must demand of it — a written guideline, a pilot, an agreement measurement, and periodic re-measurement.

The founding paper of this practice, [MT-Bench](https://arxiv.org/abs/2306.05685), reported that judge models reach “over 80% agreement, the same level of agreement between humans”, and in the same paper named position, verbosity and self-enhancement bias. The field memorised the first half of that sentence and filed the second half as a footnote. Worse, the 80% is raw percentage agreement.

A large 2026 [reliability study](https://arxiv.org/abs/2606.19544) — 21 judges, 118 runs, roughly 541,000 judgments — measured how much of that raw percentage survives the chance correction. On MT-Bench, the gap between exact-match agreement and Cohen's kappa is 33 to 41 percentage points. The deflation is not an exception but the rule. The same study reports that judge rankings shift by up to 14 positions across benchmarks, and that a judge can hold test-retest reliability above 0.95 while simultaneously carrying position bias above 0.10.

<div class="callout"><strong>Tip:</strong> Stability and validity are not the same property. A judge that answers the same question three times identically is consistent; that says nothing about whether the answer is right. A broken scale also reports the same wrong weight every time.</div>

## Which bias actually dominates?

Lists of judge biases are everywhere; studies that measure how large each one is are rare. The ones that measure tend to contradict the intuition.

-   In a [comparison across five judges and three benchmarks](https://arxiv.org/abs/2604.23178), style and markdown bias measured between 0.10 and 0.76, while position bias in the same setup never exceeded 0.04. The bias everyone talks about was the smallest one measured.
-   The [broadest study of position bias](https://arxiv.org/abs/2406.07791) (15 judges, 2 benchmarks, 22 tasks, around 40 solution models, more than 150,000 evaluation instances) shows the effect is not due to random chance and varies significantly across judges and tasks. The three metrics it uses — repetition stability, position consistency and preference fairness — drop straight into your own judge validation protocol.
-   The intuition that pairwise comparison fixes everything was tested too: in [work presented at COLM 2025](https://arxiv.org/abs/2504.14716), injected distractors flipped pairwise preferences about 35% of the time, against only 9% for absolute scores.

So does a panel of judges rescue you? The [study that measured judge ensembles](https://arxiv.org/abs/2604.07650) finds that shared pretraining induces synchronised failures, with correlation around 0.51. That finding is a reminder of the most basic assumption behind every agreement statistic: kappa assumes annotators are independent. Three annotators copied from the same source are not three annotators; they are one annotator speaking three times.

And on hard tasks, absolute judge performance is its own warning: [JudgeBench (ICLR 2025)](https://arxiv.org/abs/2410.12784) reports that strong models such as GPT-4o perform “just slightly better than random guessing”. Remember that these standings move quickly; the figures here are what those papers measured when they measured it, not today's live leaderboard.

## Building the human validation sample

Validating a judge comes down to one sentence: you measure it against the agreement humans achieve with each other. The target is not “high kappa” but “not meaningfully worse than the human baseline”. On a task where humans reach 0.55 among themselves, expecting 0.85 from a judge is a sign that you have defined the task wrong, not that you found a great judge.

### How to draw the sample

Draw a stratified sample from real traffic, with enough items in every class and every hard subset, because rare classes govern your uncertainty. Start with a small pilot and grow the sample if the confidence interval around the agreement estimate is still too wide to decide on. You can add hard cases selected through [active learning](/en/posts/active-learning/), but keep them as a separate stratum: a sample made only of borderline cases makes true agreement look worse than it is.

### Baseline, gold set, revalidation

```text
# Judge validation protocol (pseudocode)
items = stratified_sample(production_traffic, enough_per_class)
human_labels = three_independent_annotators(items, guideline)

human_baseline = krippendorff_alpha(human_labels)  # your ceiling
gold_set       = adjudicate(human_labels)          # an expert breaks ties

judge_labels = llm_judge(items, same_guideline)    # same guideline, same classes
judge_agreement = cohen_kappa(judge_labels, gold_set)

if judge_agreement < human_baseline - tolerance:
    fix_the_guideline_or_replace_the_judge()
# Rerun the whole protocol whenever the model, prompt or guideline changes.
```

If your judge emits a probability or a score rather than a label, the trustworthiness of that number is a separate measurement problem, and [model calibration](/en/posts/model-calibration-probabilities/) exists for exactly that.

There is a regulatory edge to this as well. [Article 15 of the EU AI Act](https://artificialintelligenceact.eu/article/15/) obliges providers to declare the levels of accuracy and the relevant accuracy metrics in the instructions for use. If the metric you declare rests on a score produced by a judge, never having measured that judge's reliability hollows out the declaration. You cannot put a number on a reliability you never measured.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Raw percentage agreement contains the agreement chance gave you for free; it is not a number to report alone.</li><li>Pick the coefficient by design: Cohen for two annotators, Fleiss for a shifting pool, Krippendorff's alpha for missing data and ordinal scales.</li><li>McHugh treats any kappa below 0.60 as inadequate; for alpha, 0.800 is reliable and 0.667 is the discard line.</li><li>An LLM judge is not a new category of evaluator, only an annotator whose reliability has not been measured yet.</li><li>Validate the judge against the human-human agreement baseline, and re-measure whenever the model, prompt or guideline changes.</li></ul></div>

<div class="faq"><details><summary>How many items do I need for an agreement measurement?</summary><p>There is no fixed number; what decides it is the confidence interval around your estimate. Every class and every hard subset needs enough items, because rare classes govern the uncertainty. Start with a small pilot and grow the sample until the interval is narrow enough to act on.</p></details><details><summary>My judge agrees with humans 85% of the time. Is that enough?</summary><p>On its own it says nothing. We know that percentage deflates sharply once you correct for chance; the 2026 reliability study measured a 33 to 41 percentage point gap on MT-Bench. The comparison that matters is the agreement humans reach with each other on the same task.</p></details><details><summary>Agreement came out low. What do I fix first?</summary><p>Almost always the guideline. Use the confusion matrix to find which class pair breaks down, write those edge cases into the guideline with real examples, hold an adjudication session, and re-measure. If the label schema is finer-grained than the decision needs, consider merging classes too.</p></details></div>

---

In short: any score built on a reliability you never measured is a decorated guess. Whether your annotator is a person or a model, apply the same discipline — a written guideline, a chance-corrected coefficient, a human baseline, and re-measurement whenever something changes. Those four steps are what turn an evaluation result from an opinion into a measurement.
