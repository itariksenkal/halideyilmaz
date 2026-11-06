---
title: "Datasheets for Datasets: The Missing Half of the Model Card"
description: "A model card documents the model, not the dataset. Which questions a datasheet answers, how it maps onto Annex IV technical documentation, and why this is the one document that cannot be produced retroactively."
publishDate: "2026-08-13T23:19:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "veri-seti-belgelendirme"
heroImage:
  src: "../../../assets/blog/bimg-11.jpg"
  alt: "Datasheets for Datasets: The Missing Half of the Model Card"
---

Model cards have caught on; plenty of teams now write down what their model does, where it fails and what it scored on which metric. But on that same card, the “training data” line usually contains a single phrase: “internal dataset”. That is the missing half of documentation. A datasheet tells the story of the data rather than the model — and on the regulatory side it has stopped being optional.

## Where the idea comes from, and why from electronics

The proposal comes from Gebru and colleagues in 2018, and the analogy is well chosen: in electronics every component ships with a _datasheet_ — operating voltage, temperature range, tolerance, test conditions. An engineer consults it before putting the part in a circuit, and will not use an undocumented component in a critical one ([Datasheets for Datasets](https://arxiv.org/abs/1803.09010)).

That culture never formed for datasets. We download one, merge it, train a model and attach that model to a decision — without knowing under what conditions the data was collected, who labelled it, or which population it represents.

The model card proposal dates from the same period ([Model Cards](https://arxiv.org/abs/1810.03993)), and the two are complementary by design. We covered the first in [model cards and governance](/en/posts/model-cards-governance/); this post completes the pair.

> Documenting a model's limitations while leaving the data's limitations blank is like listing a drug's side effects and hiding its active ingredient.

<div class="callout"><strong>Tip:</strong> Keep the datasheet in the same repository and under the same version tag as the dataset it describes. A datasheet that lives on a shared drive is never updated when the second version ships.</div>

## Which questions does a datasheet answer?

The original proposal walks through the dataset's lifecycle. The version that works in practice collapses into seven headings.

-   **Motivation:** Why was this dataset created? Who funded it? Which gap was it meant to fill?
-   **Composition:** What do the instances represent? How many are there? Is it a sample or the whole population? Does it contain personal data, sensitive content, or identifiable subgroups?
-   **Collection:** How was the data acquired — direct observation, user submission, third-party purchase? Over what period? What was the sampling strategy?
-   **Preprocessing and labelling:** What cleaning was applied? Is the raw data retained? Who labelled it, under which guidelines, and was agreement measured?
-   **Uses:** What tasks has this dataset been used for? Which uses is it _not_ suitable for?
-   **Distribution:** Who has it been shared with, under what licence, with what restrictions?
-   **Maintenance:** Who owns it? How often is it updated? Are older versions preserved? Where are errors reported?

The two most-skipped items are the fourth and the fifth. Who the annotators were and which guideline version they worked from is the single most determinative property of a dataset; without a measured inter-annotator agreement figure it is hard to say anything about its quality. The method is covered in [annotator agreement and kappa](/en/posts/annotator-agreement-evaluator-reliability/).

## Regulation: documentation is no longer voluntary

In 2018 this was a best-practice proposal. Today, for high-risk systems, it is a direct obligation.

-   **Article 10** lists eight data governance practices that read almost exactly like a datasheet questionnaire: design choices, collection processes and the origin of the data, preparation operations, formulation of assumptions, assessment of the availability and suitability of data, examination for possible biases, measures taken, and identification of data gaps ([Article 10](https://artificialintelligenceact.eu/article/10/)).
-   **Annex IV** defines the sections of the technical documentation, including a detailed description of the datasets used. For Annex III systems these obligations start applying on **2 December 2027**.
-   **Article 11(3)** provides a simplified documentation form for small and micro enterprises, and the Omnibus extended that to medium-sized enterprises ([Article 11](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-11)).

So a datasheet is no longer a research-ethics suggestion; it is the draft of the data section of your technical documentation. Framing it that way has a practical benefit too: you do not collect the same information twice.

<div class="callout"><strong>Tip:</strong> Write the datasheet around the reality of your dataset rather than around the Annex IV headings, then add a mapping table to Annex IV. Documents written directly in regulatory headings are documents engineers do not read, and unread documents do not get updated.</div>

## Why it cannot be produced retroactively

The most important sentence in this post lives in this section. Most technical documentation can be written later: you remember the architecture, you recompute the metrics, you sit down and reconstruct the risk register. You cannot reconstruct the datasheet.

-   **Collection conditions disappear.** Which date, which interface, which population the data came from cannot be recovered a year later.
-   **Annotators disperse.** Which guideline version they worked from, and how specific edge cases were decided, is lost unless it was written down.
-   **Preprocessing code moves on.** Today's cleaning code is not the code that produced two-year-old data; repository history tells you what changed, not _why_.
-   **Nobody remembers what was excluded.** Which records were dropped and why is the most valuable and fastest-disappearing information in a datasheet.

> Most technical documentation can be deferred. A datasheet cannot, because by the time you defer it, the information you would have written no longer exists.

Which is why the datasheet must be written _while_ the dataset is being built, and must live in a repository under the same version tag as the dataset.

## Datasheet versus data contract

These two documents are often confused, but the distinction is simple and important:

-   A **data contract** describes _flowing_ data. It runs in CI, turns red when violated, and prevents a future change. Details in [data contracts for ML](/en/posts/data-contracts-for-ml/).
-   A **datasheet** describes a _frozen_ version. It is the story of the specific snapshot a training run consumed, and it does not change.

Used together they are a strong pair: the contract ensures the data is as expected today; the datasheet records how it was in the past. When a model degrades, the first place to look is the datasheet of the version that trained it.

```text
# Binding the datasheet to a training run (pseudocode)
run = {
  "model_version":   "2026.08.13-a",
  "dataset_version": "customer-v7",
  "datasheet":       "datasheets/customer-v7.md",   # same repository
  "datasheet_hash":  hash(read("datasheets/customer-v7.md"))
}
# Rule: if the datasheet hash changes, the dataset version must change too.
# A datasheet quietly edited under the same version name is the most
# insidious documentation bug there is.
```

## A lightweight template and a first step

A twenty-page datasheet template is a template nobody fills in. The lightweight version that works fits on one page and answers these questions:

-   **What:** what does this dataset represent, how many instances, over what period?
-   **From where:** which sources, under what permission? For the record-keeping side, see [data provenance and licensing](/en/posts/data-provenance-training-data-licensing/).
-   **Who labelled it:** how many people, under which guideline version, and what was the measured agreement?
-   **What was removed:** which filters ran, and roughly how much did each drop?
-   **Who is not represented:** known coverage gaps. If this line is blank, it has probably not been looked for yet.
-   **What it is not suitable for:** situations in which a model trained on this data should not be used.
-   **Owner and version:** who to ask, which version, frozen when?

A recommendation for the first step: do not wait for a new dataset. Answer those seven questions for the training data of the model that is in production right now. Every question you cannot answer is itself a finding — and those findings are the most productive input to the [data-centric](/en/posts/data-centric-ai/) improvement loop. On the label-quality side, the steps in [data quality and labelling](/en/posts/data-quality-labeling/) fill in the third and fourth lines directly.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>A model card documents the model; a datasheet documents the data, and the two were designed to complement each other.</li><li>The eight data governance practices in AI Act Article 10 read almost exactly like a datasheet questionnaire.</li><li>Annex IV technical documentation becomes binding for Annex III systems on 2 December 2027, with the Article 11(3) simplification extended to medium-sized enterprises.</li><li>The datasheet is the one part of technical documentation that cannot be produced retroactively — collection conditions and excluded data vanish.</li><li>A contract describes flowing data and a datasheet a frozen version; when a model degrades, the datasheet is the first place to look.</li></ul></div>

<div class="faq"><details><summary>We already have a model card. Do we really need a datasheet as well?</summary><p>Yes, because they answer different questions. The model card documents the model's behaviour; the datasheet documents where that behaviour came from. In practice the weakest line on almost every model card is the training-data line, and the datasheet is exactly what fills it.</p></details><details><summary>Our dataset grows continuously. Do we update the datasheet every time?</summary><p>A datasheet belongs to a dataset version, not to the dataset. Each training run should consume a frozen version, and that version's datasheet should never change. When new data arrives, produce a new version and a new datasheet; do not delete the old one.</p></details><details><summary>Who writes the datasheet for a dataset we bought from a third party?</summary><p>Ask the supplier for one. If there is none, write what you do know and state plainly what you do not. A datasheet with honestly blank fields is both more useful and more defensible than one filled in with invented information.</p></details></div>

---

In short: documenting a model stays half-finished until you document the data that produced it. A team that writes the datasheet alongside the dataset, while building it, is both prepared on the regulatory side and holds the first place it will want to look a year later when the model starts to slip.
