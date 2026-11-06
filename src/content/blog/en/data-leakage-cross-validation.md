---
title: "Data Leakage and Cross-Validation: Why Your Test Score Is Lying"
description: "A validation score that looks too good is usually a sign of leakage. Temporal leakage, group leakage, scaling mistakes, and how to choose the right cross-validation scheme."
publishDate: "2026-08-09T23:56:00+03:00"
lang: en
category: "Evaluation"
tags: ["Evaluation", "AI"]
translation: "veri-sizintisi-capraz-dogrulama"
heroImage:
  src: "../../../assets/blog/bimg-04.jpg"
  alt: "Data Leakage and Cross-Validation: Why Your Test Score Is Lying"
---

When a validation score comes back far higher than expected, suspicion should arrive before celebration. The most frequent and most expensive mistake in machine learning is a model reaching information it should never have seen during training: **data leakage**. The bill for leakage is not paid in the lab; it is paid in production.

## What leakage is

Leakage is information entering the training data that will not actually be available at prediction time. The model finds it, uses it, and scores brilliantly on the exam — because it has seen the questions in advance. In production, without that information, performance collapses.

<div class="callout"><strong>Early warning:</strong> if removing one feature causes a dramatic drop, examine closely how that feature relates to the target. Features that are too good are usually leakage.</div>

## Temporal leakage

In any problem involving time, the most common error is splitting at random. A random split lets future examples fall into the training set, so the model uses the future to predict the past.

The correct approach is to split by time: everything before a cut-off trains, everything after tests. Where cross-validation is needed, use walk-forward validation — each fold trains only on data that precedes it.

## Group leakage

Multiple measurements from the same patient, several sessions from the same user, or different paragraphs extracted from the same document are not independent. If they scatter across train and test, the model learns to recognise the person or the document rather than the pattern.

The fix is to split by group: every record from a group goes either to training or to testing, never both.

## Preprocessing leakage

This is the most insidious form. If scaling, missing-value imputation or feature selection happens across the whole dataset _before_ the split, statistics from the test set bleed into training. Even a mean and standard deviation are a leakage channel.

The correct method is to put every step in a pipeline and fit that pipeline on the training fold only. Preprocessing is then recomputed per fold, from training data alone.

## Choosing the right scheme

| Data structure | Appropriate scheme |
| --- | --- |
| Independent samples, balanced | K-fold |
| Independent samples, imbalanced | Stratified K-fold |
| Repeated units (patient, user) | Grouped K-fold |
| Time series | Walk-forward |
| Very small data | Repeated K-fold |

## Frequently asked questions

<div class="faq"><details><summary>How do I spot leakage?</summary><p>An unexpectedly high score, a single overwhelmingly dominant feature, and a sudden drop in production are the strongest signals. Always inspect feature importances.</p></details><details><summary>Does hyperparameter selection cause leakage too?</summary><p>Yes. If you both select the model and report performance on the same set, that score is optimistic. You need a locked-away test set or nested cross-validation.</p></details><details><summary>How many times can I look at the test set?</summary><p>Ideally once. Every look fits your decisions to that set and erodes the impartiality of the score.</p></details></div>

---

Leakage is a silent error that makes bad models look good, and only a disciplined splitting strategy prevents it. For related reading, see [feature engineering](/en/posts/feature-engineering/) and [classification metrics](/en/posts/classification-metrics/).
