---
title: "Benchmark Contamination: Why Leaderboard Scores Are Inflated"
description: "Test set leakage is no longer one team's cross-validation mistake but a defect in the whole field's evaluation infrastructure. How contamination and saturation inflate scores, and how to build your own private held-out set."
publishDate: "2026-08-13T23:17:00+03:00"
lang: en
category: "Evaluation"
tags: ["Evaluation", "AI"]
translation: "kiyaslama-kirlenmesi"
heroImage:
  src: "../../../assets/blog/bimg-13.jpg"
  alt: "Benchmark Contamination: Why Leaderboard Scores Are Inflated"
---

You know what data leakage looks like: test examples slip into the training set, the validation score jumps, and the model falls over in production. That is one team's mistake on one weekend, and it is fixable. Benchmark contamination is the same mistake scaled to an entire field: this time what leaked is not your test set but everybody's shared exam paper. This post covers how much contamination inflates scores, why benchmarks have a shelf life, and the one practical answer — a private, expert-curated held-out set of your own.

## Leakage, scaled to a whole field

Picture a teacher who draws exam questions from the same public question bank every year, and that bank circulates online. Grades climb year after year even if nobody learned the subject better, and the teacher reports the climb as improved teaching. That is what is happening on leaderboards.

The mechanism is not mysterious. Benchmark sets live in public repositories, forums, blog posts and paper appendices; pretraining corpora scraped from the web pass through exactly those places. How much of that text a model can hold has been measured too: [one study estimates models memorize approximately 3.6 bits per parameter](https://arxiv.org/abs/2505.24832). For a large enough model that is more than enough capacity to carry millions of question-answer pairs.

The result is the same failure we know from [leakage in cross-validation](/en/posts/data-leakage-cross-validation/), except that the culprit is anonymous. You did not contaminate your test set; somebody did it before you, and you are now selecting models with it.

“We filtered the contamination out” is not reassuring either, because it is unverifiable. You do not see the training data, you do not know the threshold or the matching rule the filter used, and you certainly do not know whether texts that pose the same question in different words survived the filter. From the outside, it is a verbal assurance that the exam paper was never lost.

> On a contaminated benchmark, a high score does not show that the model is good. It shows that the exam leaked. If you cannot tell those two apart, you do not have a measurement — you have an impression.

## What contamination does to the numbers

The damage arrives in two forms, and they cost you differently.

The first is inflation of the absolute score. [Work quantifying contamination](https://arxiv.org/abs/2607.23514) measured inflation of up to 11.34 Macro-F1 together with distorted rankings. The second and more insidious form is exactly that distortion: contamination does not reward every model equally, so the ordering stops reflecting capability and starts reflecting which model met that dataset more often.

The cleanest test that the inflation really comes from memorization is to evaluate on cases created after the model's training cutoff. [In one evaluation, 84% of models degrade on post-cutoff cases.](https://arxiv.org/abs/2602.10367) Same task, same format, only the date is different — and the score falls.

Note that the problem here is not [the metric itself](/en/posts/classification-metrics/); Macro-F1 and accuracy alike are exactly as honest as the data they are computed on. Note too that every figure above belongs to the moment its paper measured it. Leaderboards move within weeks, and repeating a paper's ranking as if it were today's live standing is a second mistake stacked on the first.

<div class="callout"><strong>Tip:</strong> Before you pick a model, run a cheap contamination probe: rewrite the benchmark questions, change the numbers and names, shuffle the answer options. If the score drops noticeably, what you were measuring was familiarity, not capability.</div>

## Saturation: benchmarks have a shelf life

Contamination has a sibling called saturation. A benchmark discriminates on the day it is published; a few years later everyone crowds near the ceiling, and the table stops ranking ability and starts ranking noise.

An [ICML 2026 study of 60 benchmarks across 14 properties](https://arxiv.org/abs/2602.16763) makes this concrete: nearly half of the benchmarks exhibit saturation, with rates increasing with age. Its finding about resilience is the practical spine of this post — resilience comes from expert-curation, not by public test data.

The infrastructure itself wears out as well. HELM, one of the field's most comprehensive academic evaluation frameworks, [entered maintenance mode on 1 June 2026](https://crfm-helm.readthedocs.io/en/latest/maintenance_mode/): no new features will be added, and no new evaluations will be added to its leaderboards. Keeping a benchmark alive costs more than building one, which is why waiting for permanent measurement infrastructure is not a realistic plan.

The insidious part of saturation is that comparison itself loses meaning near the ceiling. Once every model clusters around ninety-eight percent, the gaps between them sit below measurement noise and a handful of mislabeled items; the ranking no longer reflects capability but which model happened to guess those few broken questions right. So treat a benchmark as a consumable rather than a constitution. It has an expiry date, and that date arrives the moment everyone starts aiming at it.

## The contamination detectors will not save you

The natural reflex is to reach for automatic detection: n-gram overlap, perplexity comparisons, membership inference tests. These tools help, but they are less reliable than people assume.

A [systematic assessment of contamination detectors](https://arxiv.org/abs/2606.03305) reports that only 201 out of 335 evaluations were correct. In other words, diagnosing contamination is itself a measurement problem with its own error rate. Do not treat a detector output that says “clean” as a certificate.

There is a deeper issue underneath. Even an uncontaminated benchmark may not measure what it claims to measure. The NeurIPS 2025 paper [Measuring what Matters: Construct Validity in LLM Benchmarks](https://arxiv.org/abs/2511.04703) — 29 expert reviewers, a systematic review of 445 benchmarks — ends in eight recommendations and asks the field's most uncomfortable question: which capability, exactly, does this test measure?

That question should feel familiar. A benchmark is ultimately a labeled dataset, and every rule of [labeling quality](/en/posts/data-quality-labeling/) applies to it: vague guidelines, inconsistent labels, unrepresentative samples. Contamination is only the most visible defect.

## Leaderboard asymmetry, and a Turkish mix-up

Contamination is not always accidental; sometimes it is simply unequal access. A [study of Chatbot Arena practices](https://arxiv.org/abs/2504.20879) reports that Meta tested 27 private variants ahead of the Llama 4 release, that Google reached about 19.2% and OpenAI about 20.4% of all arena data, while 83 open-weight models together shared about 29.7%.

The technical name for this is the repeated-measurement advantage. Whoever gets more attempts at the same exam scores higher at identical ability. The result is a world in which nobody broke a rule and the table is still misleading.

On the Turkish side there is a simpler but far more common trap: two different benchmarks that get routinely confused. [TurkishMMLU](https://arxiv.org/abs/2407.12402) (EMNLP 2024 Findings) is drawn from Turkish high-school curricula and contains more than 10,000 questions across 9 subjects. [TR-MMLU](https://arxiv.org/abs/2501.00593) (Bayram et al., January 2025) contains 6,200 multiple-choice questions across 62 sections covering 67 disciplines, selected from a pool of 280,000 questions. Similar names, different scope, different size.

Which means the sentence “this model scored X on Turkish MMLU” is not comparable to anything unless it says which dataset it refers to. When you work with [Turkish benchmarks](/en/posts/turkish-nlp-data-quality-benchmarks/), always write the dataset name, its version and the subset together.

## Building your own private held-out set

Everything above converges on one practical conclusion: make your decisions with an exam nobody else can see. An expert-curated, privately held evaluation set is the most durable measurement instrument available today, against contamination and saturation alike.

### What to collect, and from where

Draw items from real traffic in your own domain rather than copying from a public set, because the moment you copy you import the same risk. Where you can, include cases created after the model's training cutoff, which gives you a natural control group separating memorization from capability. Have the labels produced by domain experts and adjudicate disagreements; the value of the set comes from label quality far more than from size.

### How to keep it private and keep it alive

```python
# Private held-out set hygiene (pseudocode)
heldout = expert_curate(your_domain, include_post_cutoff_cases)
heldout = version(heldout, "v1")        # fixed version, comparable over time
publish(aggregate_scores_only)          # the items themselves never leave

for model in candidates:
    score = evaluate(model, heldout)
    if provider_retains_your_data:
        burn(that_slice)                # once seen, it is no longer blind

every_cycle:
    heldout = refresh(heldout, fresh_cases)   # retire the aging slice
    contamination_check(heldout, public_sources)
```

Three rules decide how long the set survives. Never publish the items, only aggregate scores. Version it so you can compare across time. And if a slice ever left your boundary — sent to a provider that retains your data, for example — stop counting that slice as a blind exam.

The cost question usually arrives here, because expert hours are expensive. Make the right comparison though. The cost of choosing the wrong model is larger than the cost of labeling a few hundred items properly, and it gets paid quietly, spread over months. Besides, once the set exists you never rebuild it from scratch: each cycle retires only the ageing slice and replaces it with fresh cases. It is a small standing maintenance job rather than a project.

<div class="callout"><strong>Tip:</strong> Plant a few unique canary strings inside your set. If those strings ever surface in a model's output, you have direct evidence that your set leaked somewhere.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Benchmark contamination is one team's data leakage grown into a defect in the whole field's evaluation infrastructure.</li><li>Contamination both inflates absolute scores and distorts rankings; post-cutoff cases are the cleanest control test.</li><li>Benchmarks have a shelf life: nearly half of the studied sets are saturated, and resilience comes from expert curation.</li><li>Contamination detectors carry a large error rate of their own; a detector output is not a certificate of cleanliness.</li><li>Decide with a private, versioned, expert-curated held-out set that nobody else can see.</li></ul></div>

<div class="faq"><details><summary>Should I stop using contaminated benchmarks entirely?</summary><p>No, but do not let one carry a decision on its own. Common benchmarks still work for rough screening; make the final model choice on your private set. And attribute every score to the paper and date that measured it, because standings change quickly.</p></details><details><summary>How large should my own evaluation set be?</summary><p>Quality comes before size. Large enough to give a confidence interval narrow enough to separate your candidates is enough; past that point, invest in label quality and coverage of hard cases rather than in more items. A small expert-curated set beats a large loosely labeled one.</p></details><details><summary>How do I test for contamination myself?</summary><p>The cheapest probe is rewriting: ask the same question with different wording, different numbers and shuffled options. The second is evaluating on cases created after the training cutoff. A large gap between the two conditions means your score was measuring memorization.</p></details></div>

---

In short: the moment a leaderboard becomes a marketing surface it stops being a measuring instrument. The answer is not to boycott the tables but to stop letting them make the decision. A small set curated from your own domain, labeled by experts, kept private and properly versioned tells you more than the huge benchmark everyone is looking at — precisely because only you can see it.
