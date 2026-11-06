---
title: "Data-Centric AI: Improving the Data Instead of the Model"
description: "Data-centric AI holds the model fixed and improves the dataset instead. How label consistency, coverage gaps and error analysis pull more accuracy out of the same architecture, explained with practical examples."
publishDate: "2026-08-09T23:59:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "veri-merkezli-yapay-zeka"
heroImage:
  src: "../../../assets/blog/bimg-01.jpg"
  alt: "Data-Centric AI: Improving the Data Instead of the Model"
---

When a model underperforms, the first instinct is usually the same: try a bigger architecture, add layers, sweep hyperparameters. Yet the experience of teams running systems in production tends to point elsewhere — most of the gain comes not from the model but from the **data**. Data-centric AI says exactly that: hold the architecture fixed and spend your effort improving the dataset systematically.

## Model-centric versus data-centric

In model-centric work the dataset is fixed and you change the architecture. In data-centric work the opposite holds: the architecture is fixed and you work on the dataset. The two are not rivals, but the order matters. Architectural changes tend to show diminishing returns, while improvements in data quality often produce a direct, measurable jump.

Think of a telescope. A bigger lens helps up to a point; but if the glass is smudged, a bigger lens magnifies the smudge too. Label noise is exactly that smudge.

<div class="callout"><strong>A practical rule:</strong> inspect 100 examples your model gets wrong, by hand. If a meaningful share of them are mislabelled, your problem is in the dataset, not the architecture.</div>

## Label consistency: the silent ceiling

If the same example is labelled differently by two annotators, the model cannot learn that contradiction — it merely averages it and becomes uncertain. This places an invisible ceiling on accuracy. Measuring inter-annotator agreement shows you where that ceiling sits.

When agreement is low, the answer is not more data; it is _a clearer labelling guideline_. Writing explicit rules for edge cases usually pays more than collecting thousands of fresh examples.

## Coverage gaps

Which parts of real usage does your dataset fail to represent? That question surfaces what an aggregate accuracy score hides. Overall accuracy can read ninety percent while the slice users actually care about sits at fifty.

Slice-based evaluation is critical here: split the data by length, domain, source, language or user type, and look at each slice separately. A healthy headline metric hiding one collapsed slice is extremely common.

## Error analysis is a loop

Data-centric work is not a one-off cleanup but a repeating loop:

1.  Train the model and collect its errors.
2.  Sort those errors by hand into categories — wrong label, missing coverage, genuine difficulty.
3.  Add or fix data targeted at the largest category.
4.  Retrain and compare on the same slices.

The strength of this loop is that it directs effort where it pays most. Adding a hundred examples where errors cluster usually beats adding a thousand at random.

## Small and clean, or large and noisy?

| Dimension | Small and clean | Large and noisy |
| --- | --- | --- |
| Training cost | Low | High |
| Debuggability | Easy to trace | Hard |
| Rare cases | May be missing | Covered naturally |
| Accuracy ceiling | Bounded by label quality | Bounded by noise |

The right answer sits between the two: collect a broad base, but clean the _evaluation set_ meticulously. If you cannot trust what you measure, you cannot tell whether any improvement is real.

<div class="callout"><strong>A common mistake:</strong> cleaning the training set and leaving the evaluation set untouched. A dirty test set can make a good model look bad and a bad model look good.</div>

## Frequently asked questions

<div class="faq"><details><summary>Does a data-centric approach make large models unnecessary?</summary><p>No. The two complement each other. But on a fixed budget, the first hours spent on data quality usually return more than the first hours spent on architecture.</p></details><details><summary>How do I measure label quality?</summary><p>Have a subset labelled by more than one person and look at the agreement rate. Also inspect the examples where the model is most confident and still wrong — those are frequently mislabelled.</p></details><details><summary>How much data is enough?</summary><p>There is no fixed number. Look at the learning curve: if doubling the data no longer moves the error meaningfully, the problem is quality or coverage, not quantity.</p></details></div>

---

Data-centric AI shifts attention from glamorous architectures to the dull but decisive details: who labelled it, which rule was applied, which case was never represented at all. Those details matter even more when working with Turkish data; for related reading see [data quality and labelling](/en/posts/data-quality-labeling/) and [classification metrics](/en/posts/classification-metrics/).
