---
title: "Data Provenance and Training-Data Licensing: Can You Prove Where Your Dataset Came From?"
description: "How do you record training-data provenance through a preprocessing pipeline? The sharp rise in robots.txt restrictions, the GPAI training-data summary template, where the IETF work stands, and what the 2025-2026 copyright rulings mean for engineering practice."
publishDate: "2026-08-13T23:21:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "veri-kokeni-ve-lisanslama"
heroImage:
  src: "../../../assets/blog/covers/data-provenance-training-data-licensing.jpg"
  alt: "Data Provenance and Training-Data Licensing: Can You Prove Where Your Dataset Came From?"
---

Can you prove today where every part of your training set came from, under what permission it was obtained, and which operations it passed through? For most teams the honest answer is no. Yet the question has stopped being academic: regulators, courts and data owners are all now asking it. This post is not legal news; it is an engineering piece about how to carry provenance _through a pipeline_ without losing it.

## Why provenance suddenly got hard

Five years ago “we scraped it from the web” was an adequate answer in most contexts. It is not any more, because two things changed at once: data owners started closing the door, and the people using the data started being asked to account for it.

The first is now measurable. The Data Provenance Initiative's _Consent in Crisis_ study found that between April 2023 and April 2024, **more than 25 % of tokens from the most critical training domains became restricted by robots.txt**, and that restriction among head domains rose **from under 3 % to roughly 28 %** ([report](https://www.dataprovenance.org/Consent_in_Crisis.pdf)). That is a one-year jump, and its direction is not ambiguous.

> The era in which the web was open by default has not ended, but it is narrowing. If you are not recording provenance today, in two years you will not be able to reconstruct which piece you took under which permission.

The second is a gap on the standards side. There is an IETF working group on expressing AI usage preferences to crawlers, but it has **published no RFC**; the work is progressing through drafts ([documents](https://datatracker.ietf.org/wg/aipref/documents/)). So there is no settled machine-readable vocabulary for permission yet, and everyone is mixing robots.txt, terms of use and private agreements.

## The regulatory side: the training-data summary

In the EU, providers of general-purpose AI (GPAI) models carry a concrete duty: to make publicly available a sufficiently detailed summary of the content used for training. The format was not left open — **the AI Office published a template on 24 July 2025**, and the Commission describes it as a minimal baseline for public disclosure.

On the high-risk side the duty runs deeper. Article 10 devotes one of its eight data-governance practices to documenting data collection processes and the origin of the data ([Article 10](https://artificialintelligenceact.eu/article/10/)). Provenance has therefore stopped being a good habit and become a deliverable.

<div class="callout"><strong>Tip:</strong> Do not attempt to write the training-data summary at publication time. The summary should be a <em>generated</em> output of a dataset manifest. Without a manifest it becomes an essay of recollections — and an essay of recollections published as a public document is a serious exposure.</div>

For teams looking for a template of what to document, the direct route is dataset documentation discipline, covered in [datasheets for datasets](/en/posts/datasheets-for-datasets/).

## The courts moved in opposite directions

Across 2025 and 2026, two major matters resolved in opposite directions — and that contrast is exactly why waiting for a single “AI and copyright rule” is the wrong posture.

-   **Bartz v. Anthropic:** a **$1.5 billion settlement covering roughly 482,460 works received final approval on 20 July 2026**, corresponding to about $3,000-3,100 per work ([report](https://apnews.com/article/ai-anthropic-copyright-settlement-claude-books-bartz-74b140444023898aeba8579b6e9f0d63)).
-   **Getty Images v. Stability AI:** in the English High Court, a judgment of 4 November 2025 saw the claims largely dismissed, with no finding of secondary copyright infringement ([judgment](https://www.judiciary.uk/judgments/getty-images-v-stability-ai/)).

There is only one sound engineering reading of those two outcomes together: **the legal result turns on how the data was obtained and on how much of it was stored where.** Managing that uncertainty is therefore not something that can be handed to the legal department, because the party holding the record is engineering.

> Different outcomes in different jurisdictions do not mean the rule is vague. They mean the facts are decisive — and you are the party who records the facts.

## Carrying provenance through the pipeline

The real engineering question is how provenance survives the journey from raw source to training set. Because the place where it is lost is almost always the same: the merge and clean steps.

### Three layers of record

-   **Source record:** for each source, the domain or provider, date of access, method of access, applicable licence or terms, and the state of robots.txt _at the time of access_. Robots.txt changes over time; what matters is what it said when you fetched.
-   **Document record:** for each document, its source identifier, a content digest, the date collected and, where available, the publication date. The digest also catches the same document arriving a second time from a different source.
-   **Transformation record:** which filter, at which version, removed which documents. This is the most skipped and most useful layer: a year later, the answer to “why is this document not in the dataset?” lives here.

```text
# Provenance chain from source to training set (pseudocode)
for doc in raw_pool:
    record = {
      "doc_id":    hash(doc.content),
      "source_id": doc.source,
      "fetched":   doc.fetch_date,
      "licence":   source_registry[doc.source]["licence"],
      "robots":    source_registry[doc.source]["robots_at_fetch"],
      "filters":   []                       # filled below
    }
    for f in FILTERS:                         # every filter is versioned
        if not f.passes(doc):
            record["filters"].append((f.name, f.version, "dropped"))
            write_provenance(record); break
        record["filters"].append((f.name, f.version, "passed"))
    else:
        add_to_training_set(doc, record)
        write_provenance(record)
# Rule: write provenance SEPARATELY from the document, not inside it.
# Keep the record for dropped documents too, or "why is it missing?"
# has no answer.
```

<div class="callout"><strong>Tip:</strong> Do not embed the provenance record inside the dataset; keep it beside it. Embedded metadata is lost when a dataset is resampled, shuffled or sharded; a separate record keyed on the document digest is not.</div>

## Licence compatibility: the arithmetic of a mixed pool

When you merge sources with different licences into one pool, the licence status of the result is governed by its most restrictive component. This is the same problem as licence compatibility in software dependencies, and it yields to the same discipline.

-   **Partition the pool by licence.** Commercially permitted, research-only, attribution-required, share-alike, and unknown. The fifth category is the most dangerous and usually the largest.
-   **Keep unknown separate.** Make the difference between “we do not know the licence” and “the licence is permissive” technically visible in the dataset.
-   **Label derived data too.** Synthetic data generated from a source can inherit that source's restrictions. Add a provenance field to the generation loop described in [synthetic data](/en/posts/synthetic-data-generation/).
-   **Build the removal path up front.** When a source has to be withdrawn, you must be able to query which training runs it touched. For why that does not end with deleting the data, see [machine unlearning](/en/posts/machine-unlearning-right-to-be-forgotten/).

The side benefit of this partitioning is that licence partitions are also a natural axis for data quality analysis. If data from one source carries higher label noise, you can only see it when you can look source by source. The [data quality and labelling](/en/posts/data-quality-labeling/) discipline pays off directly here.

## Provenance in a narrow domain: fewer sources, deeper duty

For teams not operating at web scale the picture is different but no easier. In enterprise and domain-specific datasets the number of sources is small, but each source's contractual restrictions are far more explicit, and the counterparty to any breach is identifiable.

Working with Turkish legal texts, we see this on the product side: a source being publicly reachable does not mean it is free for every form of use, and a processed version of a text can carry different obligations from the raw one. In domains like this, provenance is not only a legal requirement but a quality instrument — you cannot find which source produces which error without a source label.

-   **Bind the agreement to the dataset.** Each source record should state which contract or permission it was obtained under.
-   **Record the scope of use.** Restrictions such as “permitted for training, not for redistribution” belong in a field in the record, not in an email thread.
-   **Freeze versions.** A training run must use a specific, immutable dataset version. Without that you also cannot measure what actually helped in the [data-centric](/en/posts/data-centric-ai/) improvement loop.

The least appreciated benefit of provenance shows up right here: it starts life as a legal defence and stays as a debugging tool.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Consent in Crisis measured more than a quarter of tokens from the most critical training domains becoming robots.txt-restricted within a single year.</li><li>There is still no settled machine-readable vocabulary for AI usage preferences; the IETF work remains in draft with no published RFC.</li><li>The AI Office's training-data summary template of 24 July 2025 sets a minimal baseline for public disclosure.</li><li>The opposite outcomes in Bartz and Getty show that the legal result turns on how the data was obtained and stored.</li><li>Record provenance in three layers — source, document and transformation — and keep the record for dropped documents too.</li></ul></div>

<div class="faq"><details><summary>Is robots.txt legally binding?</summary><p>Robots.txt is a technical expression of preference, not in itself a licence or a contract, and its legal weight varies by jurisdiction and by the facts. The right engineering posture is to treat it as a record-keeping problem rather than a legal one: capture its state at the moment of access, so you can later show what you knew when you decided.</p></details><details><summary>How do we reconstruct provenance for a dataset we already collected?</summary><p>You cannot recover all of it, and admitting that plainly is the best move. What you can do is attempt source matching on document digests, record what is recoverable, and mark the remainder explicitly as unknown. Keeping the unknown partition separate is a far more defensible position than treating the whole thing as permissive.</p></details><details><summary>Does synthetic data solve the provenance problem?</summary><p>Partly, and only when handled carefully. Data generated from a model can inherit the restrictions of the data that model was trained on, and synthetic data brings its own quality and diversity risks. It does not eliminate provenance; it adds another layer that also has to be recorded.</p></details></div>

---

In short: data provenance is the data team's job, not the legal team's. A team without records cannot answer when the question finally comes; a team with records answers the question and also finds its own error sources much faster. Both benefits come out of the same investment.
