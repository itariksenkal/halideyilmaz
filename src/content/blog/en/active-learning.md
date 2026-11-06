---
title: "Active Learning: Spending a Labelling Budget on the Examples That Matter"
description: "Labelling everything is expensive. Active learning picks the examples a model is least sure about, buying more accuracy from the same budget. Uncertainty sampling, diversity, and the cold-start problem."
publishDate: "2026-08-09T23:57:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "aktif-ogrenme"
heroImage:
  src: "../../../assets/blog/covers/active-learning.jpg"
  alt: "Active Learning: Spending a Labelling Budget on the Examples That Matter"
---

Labelling is the slowest and most expensive step in machine learning. Annotating all hundred thousand examples is out of reach for most teams. **Active learning** inverts the constraint: the model decides which examples get labelled, and asks for the ones it can learn most from. The result can be a markedly better model on the same budget.

## The core idea

In the classical approach you label the data first and train afterwards. Active learning sets up a loop instead: train on a small seed set, let the model scan the unlabelled pool, pick the examples it finds most informative, label those, and retrain.

Think of a student. Re-solving questions they already know is wasted time; the real gain sits exactly where they hesitate. Active learning makes the model ask those questions.

<div class="callout"><strong>Why it works:</strong> most datasets are highly redundant. A thousand near-identical examples teach the model almost nothing after the first one.</div>

## Uncertainty sampling

The most common selection criterion is uncertainty. If the model assigns an example fifty percent probability, that example sits right on the decision boundary and its label is highly informative. Three measures are used in practice:

-   **Least confidence:** examples where the top probability is smallest.
-   **Margin:** examples where the gap between the top two classes is smallest.
-   **Entropy:** examples whose probability distribution is most spread out.

## Why diversity is required

Looking only at uncertainty holds a trap: the model may pick a hundred nearly identical examples from the same difficult region. The budget is spent, but what gets learned is one narrow case.

Selection therefore usually combines uncertainty with diversity: find the uncertain examples, cluster them in embedding space, and take a representative from each cluster. That way the labelled batch is both hard and varied.

## The cold-start problem

Active learning needs a model to work, and at the start there is none. That circularity is broken by making the first round random or diversity-based. Once a good enough seed set exists, you switch to uncertainty.

## When it does not help

| Situation | Active learning |
| --- | --- |
| Labelling is cheap and automatic | Needless complexity |
| Labelling is costly, needs experts | Large payoff |
| Data is very noisy | Uncertainty selects the noise |
| Classes are heavily imbalanced | Helps surface the rare class |

Noise deserves particular care: an uncertainty measure cannot tell a hard example from a corrupted one. If unlabellable junk pollutes the pool, active learning will spend the budget on it.

## Frequently asked questions

<div class="faq"><details><summary>How often should I retrain?</summary><p>Every round if training is cheap; in larger batches if it is not. The bigger the batch, the higher the risk that selections repeat one another, which makes diversity even more important.</p></details><details><summary>How do I build the evaluation set?</summary><p>The evaluation set must be sampled <em>randomly</em>. Building a test set out of actively selected examples does not represent the real distribution and will distort your results.</p></details><details><summary>Can it be combined with LLM labelling?</summary><p>Yes, and this is becoming common. The model auto-labels the easy cases and routes only the ones it is unsure about to a human. Human time is the most expensive resource, and this spends it exactly where it counts.</p></details></div>

---

Active learning is a strategy that says "better data" rather than "more data". Wherever labelling is expensive, it pays for itself directly. For more, see [data quality and labelling](/en/posts/data-quality-labeling/) and [data-centric AI](/en/posts/data-centric-ai/).
