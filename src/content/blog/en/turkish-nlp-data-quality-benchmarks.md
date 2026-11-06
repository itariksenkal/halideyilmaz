---
title: "Turkish AI Data Quality and Benchmarks: What Actually Exists"
description: "The Turkish resource landscape exists mostly as scattered GitHub lists and arXiv papers. What actually exists, what each benchmark measures, what the Cetvel finding says about data quality, and how to build your own evaluation set."
publishDate: "2026-08-13T23:06:00+03:00"
lang: en
category: "Turkish NLP"
tags: ["Turkish NLP", "AI"]
translation: "turkce-veri-kalitesi-kiyaslama"
heroImage:
  src: "../../../assets/blog/covers/turkish-nlp-data-quality-benchmarks.jpg"
  alt: "Turkish AI Data Quality and Benchmarks: What Actually Exists"
---

Which datasets exist for Turkish, what does each benchmark actually measure, and what does it mean to say a model is good at Turkish? The answers do not live in one place today; they are scattered across a few GitHub lists, a few arXiv papers and a good deal of hearsay. This post pulls that landscape together: what exists, what it measures, where it is thin, and what a team should do about it. Every number here is tied to the work that reports it, because in this area the most repeated errors are unsourced figures.

## Is Turkish really low-resource? Let us put numbers on it

The phrase “low-resource language” gets used constantly and quantified rarely. One reference point: [according to the Wikipedia listing](https://meta.wikimedia.org/wiki/List_of_Wikipedias), Turkish Wikipedia holds 694,568 articles and ranks 26th largest, while English holds 7,223,792. On the same platform and the same measure, that is a gap of more than tenfold. Turkish is neither genuinely scarce nor in the same league as English; it sits in a crowded middle.

A second indicator is whether you appear in international evaluation suites at all. Here there is a verified negative: OpenAI's multilingual evaluation set [MMMLU](https://huggingface.co/datasets/openai/MMMLU) covers 14 locales, and Turkish is not among them. A language missing from an international benchmark means there is no shared ground to stand on when people compare model performance in it.

The inventory is far from empty, though. The most visible item is [BERTurk](https://huggingface.co/dbmdz/bert-base-turkish-cased): trained on 35 GB, roughly 44 billion tokens, drawing around 150k downloads a month with 188 derivative models built on top of it. A great many Turkish NLP pipelines still sit on that foundation today.

On the corpus side, [TS Corpus](https://tscorpus.com/) offers 25+ corpora and more than 1.8 billion tokens, while on the academic side the [BOUN TABI](https://github.com/boun-tabi) releases are among the first places to look for task datasets and tooling. The picture, then, is this: serious resources exist, but they are not collected in a single catalogue, version and licence information is scattered, and documentation is largely left to the user's initiative.

## Benchmark confusion: similar names, different measures

The most concrete practical problem in Turkish evaluation is a set of similarly named benchmarks used interchangeably. It is worth separating three of them, because they measure different things and their scores are not comparable.

-   **[TurkishMMLU](https://arxiv.org/abs/2407.12402)** (Yüksel, Köksal, Şenel, Korhonen, Schütze; EMNLP 2024 Findings): more than 10,000 questions across 9 subjects, drawn from Turkish high-school curricula. What it measures is curricular knowledge.
-   **[TR-MMLU](https://arxiv.org/abs/2501.00593)** (Bayram et al., January 2025): a _different_ benchmark. 6,200 multiple-choice questions spread over 62 sections, selected from a pool of 280,000 questions covering 67 disciplines.
-   **[Cetvel](https://arxiv.org/abs/2508.16431)** (KUIS AI, Koç University; arXiv 22 August 2025, EACL 2026): evaluates 33 open-weight LLMs up to 70B across 23 tasks in 7 categories. It is the harness with the widest task coverage, reaching beyond the multiple-choice exam format.

<div class="callout"><strong>Tip:</strong> When someone tells you a model scored X on the Turkish MMLU, ask one question: <em>which one?</em> TurkishMMLU and TR-MMLU are two separate benchmarks with different construction, different question counts and different sources. Putting their scores side by side is comparing marks from two different exams. When you report a result, name the benchmark, its version and its paper together.</div>

All three share one limit as well: they measure general language and knowledge competence. Your production task — classifying a petition, summarising a support call, locating a contract clause — appears in none of them. A benchmark score is good for shortlisting candidates, not for making the decision.

## The uncomfortable finding in Cetvel

The most striking result in the Cetvel study contradicts the prevailing assumption in the field: Turkish-centric instruction-tuned models generally underperform multilingual general-purpose models. Which is to say that “a model trained specifically for Turkish will be better at Turkish” is not automatically true.

That changes a lot in practice. The reflex of a team building a Turkish application is usually to go looking for a Turkish model. On the picture Cetvel measured, that reflex can cost you the best option. At minimum, carrying a Turkish label should not put a model at the top of the list on its own.

The reason cannot be reduced to one sentence, and what the paper measures is the outcome rather than the cause. Plausible candidates exist — read these as hypotheses to be tested, not as measured explanations: much of the Turkish data used in instruction tuning is machine-translated and carries translation artefacts; fine-tuning can erode general capability inherited from broad multilingual pretraining; and Turkish datasets may be narrow in diversity.

> Training a model for a language begins not with collecting data in that language, but with collecting _good_ data in it. In Turkish the binding constraint has for some time been quality, not quantity.

This is the Turkish-specific form of the argument we make in [data quality and labeling](/en/posts/data-quality-labeling/). Collecting raw text is easy today; building a dataset that is clean, deduplicated, clearly licensed, balanced across domains and consistently labelled is still hard. Turkish's real deficit is not in gigabytes, it is in that second list.

## The legal domain: one concrete case examined closely

On the domain-model side, the most concrete progress for Turkish is visible in law. It is an area we work in daily, so we follow it closely. Two studies, with their numbers as reported.

-   **[HukukBERT](https://arxiv.org/abs/2604.04790)** (arXiv, 6 April 2026): a Turkish legal language model trained on 19 GB of cleaned legal text. It uses a 48K WordPiece vocabulary and reports 84.40% Top-1 on a legal cloze task and a 92.8% structural segmentation pass rate.
-   **[Mecellem](https://arxiv.org/abs/2601.16018)** (arXiv, 22 January 2026): reports a 36.2% perplexity reduction on Turkish legal text through continual pretraining on a 112.7 billion-token corpus.

Two cautions when reading those figures. First, perplexity reduction and cloze accuracy are _intrinsic_ metrics: they show the model adapted to the domain's language, not that it will do well on your task. What domain adaptation usually buys you is a head start, not a guarantee.

Second, expanding the domain vocabulary — the 48K WordPiece vocabulary in HukukBERT — is a design choice rather than a result in itself. Splitting domain terms into fewer pieces makes context use more efficient, but you only see the size of that effect by measuring it on your own task.

Even so, the direction is encouraging. A few years ago there were almost no publications producing comparable numbers for Turkish legal text. Today there are at least results you can point at and argue with. That is exactly what a field maturing looks like.

## Where it is thin — and how this differs from tokenization

First, a boundary. The [tokenization in Turkish](/en/posts/tokenization-turkish-challenges/) post is about mechanics: how the language's morphological structure affects subword splitting. This post is about datasets and benchmarks. The two get conflated often: tokenization drives the _cost_ and context efficiency of Turkish models, while data quality determines what they learn. Different problems, different fixes.

Looking across the inventory, these are the gaps that stand out. Treat them as observations about what the available resources cover, not as measured claims:

-   **Task diversity:** public evaluation is heavily weighted towards the multiple-choice exam format. The tasks you actually need in production — summarisation, inference, structured extraction — rarely have a standard Turkish counterpart.
-   **Generation evaluation:** how free-text generation should be assessed in Turkish, against what reference and by what criterion, has no settled consensus.
-   **Domain coverage:** law now has concrete work behind it; comparable public resources in health, finance and public administration are considerably scarcer.
-   **Labelling documentation:** datasets that publish their annotation guideline, an inter-annotator agreement measurement and a version history are the minority.
-   **Licence and provenance clarity:** where a dataset was assembled from and on what terms it may be used tends to be a separate investigation each time, before use.

Put together, the picture is this: finding raw Turkish text is no longer the bottleneck. The bottleneck is data you can **measure and document**. The good news is that this is largely a matter of discipline — and therefore something your own team can fix without waiting for anyone else.

## Building your own Turkish evaluation set

If the public benchmarks do not cover your domain — and usually they do not — the job is clear: you build your own evaluation set. This is not a research project; two weeks of disciplined work will produce a meaningful first version.

### The order of work

-   **Define the task from real traffic.** Do not invent examples; sample from the inputs your system actually receives. An evaluation set derives its value from reflecting the usage distribution.
-   **Sample in strata.** Do not let easy examples dominate; deliberately include rare but important cases, and tag those strata so you can read subgroup scores separately.
-   **Write the guideline around edge cases.** A guideline without examples of where the decision gets hard does not function. Leave a “not sure” option.
-   **Double-label a subset** and measure inter-annotator agreement. Low agreement is the first sign that the guideline, not the model, is the problem.
-   **Freeze and version.** The core set must stay fixed; when you want to extend coverage, publish a new version instead of editing the old one.
-   **Check for contamination.** The model you are evaluating may have seen a public dataset during pretraining — the [benchmark contamination](/en/posts/benchmark-contamination/) problem, and the risk is higher here precisely because the number of public Turkish resources is limited.

### Turkish-specific traps

A handful of technical details recur when building Turkish evaluation data, and when missed they quietly corrupt your score: case conversion for dotted and dotless i (I/ı and İ/i), text arriving mixed with ASCII-folded Turkish characters, inconsistent use of the apostrophe before suffixes on proper nouns, OCR errors from scanned documents, and domain terms used in a Turkish-English mix. Write these into your normalisation rules — and _version the rules too_.

```python
# Building a Turkish evaluation set (pseudocode)
raw = sample_from_real_traffic(n=1200, strata=["easy","borderline","rare"])
raw = normalise(raw)         # I/i casing, ASCII folding, OCR cleanup
raw = deduplicate(raw)       # near-duplicates removed as well
subset = sample(raw, 200)
for item in subset:
    label_a = annotate(item, annotator=1)
    label_b = annotate(item, annotator=2)
    if label_a != label_b:
        queue_for_guideline(item)   # fix the guideline first, then the label
agreement = inter_annotator_agreement(subset)
if agreement < threshold:
    stop()                   # if the guideline is not ready, the set is not
freeze_and_version(raw, version="v1", doc=datasheet())
```

> Scoring well on a public benchmark does not show that your product works. An honest evaluation set built in your own domain shows exactly that — which is why it is worth far more.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Turkish Wikipedia holds 694,568 articles and ranks 26th; English holds 7,223,792 — Turkish is not scarce, but not in the same league either.</li><li>TurkishMMLU and TR-MMLU are different benchmarks; putting their scores side by side compares marks from two different exams.</li><li>The Cetvel study reports that Turkish-centric instruction-tuned models generally underperform multilingual general-purpose models.</li><li>Turkish legal work now produces citable results such as HukukBERT and Mecellem, but intrinsic metrics do not guarantee task performance.</li><li>The binding constraint for Turkish is not the volume of raw text; it is data you can measure, document and version.</li></ul></div>

<div class="faq"><details><summary>Should I always pick a Turkish-trained model for a Turkish application?</summary><p>Not automatically. The Cetvel study reports that Turkish-centric instruction-tuned models generally underperform multilingual general-purpose models. The right approach is to treat a Turkish label as one attribute rather than a shortlisting criterion, and to measure both Turkish and multilingual candidates under identical conditions on your own evaluation set.</p></details><details><summary>Which Turkish benchmark should I use?</summary><p>It depends on what you are asking. TurkishMMLU is built on high-school curricular knowledge, TR-MMLU on broad disciplinary coverage, and Cetvel offers the widest task diversity beyond the multiple-choice format. None of them measures your production task, so use public benchmarks to shortlist and your own set to decide.</p></details><details><summary>Is building my own evaluation set expensive?</summary><p>Less than people assume. A few hundred well-chosen examples labelled by two people are more useful to most teams than thousands of careless ones. The real cost is not in the number of examples but in writing a guideline that covers edge cases and measuring agreement; once that is done, labelling moves quickly.</p></details></div>

---

In short: Turkish has more resources than people assume and less common ground. Benchmarks get conflated, numbers circulate without sources, and the label “Turkish model” carries more trust than it has earned. In that landscape, the highest-return move available to a team is not hunting for a new model; it is building an honest, documented, versioned evaluation set in its own domain.
