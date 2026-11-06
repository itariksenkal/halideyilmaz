---
title: "Is Your Model Anonymous? Memorization, Membership Inference and the EDPB's New Anonymisation Guidelines"
description: "Does your model still hold personal data? A protocol that maps the EDPB three-criteria test onto measurable attack surfaces: membership inference, training-data extraction and memorization capacity, with what to report."
publishDate: "2026-08-13T23:13:00+03:00"
lang: en
category: "Privacy"
tags: ["Privacy", "AI"]
translation: "model-anonim-mi-ezberleme"
heroImage:
  src: "../../../assets/blog/bimg-17.jpg"
  alt: "Is Your Model Anonymous? Memorization, Membership Inference and the EDPB's New Anonymisation Guidelines"
---

Is a model trained on personal data anonymous once the training data is deleted? The question gets argued in two communities that never quite hear each other: privacy lawyers know the anonymisation test but not how memorization is measured, while researchers write extraction attacks without touching the legal test. This post connects them: it maps the three criteria of the legal test onto measurable attack surfaces, and sets out what an engineer should measure before claiming anything is anonymous.

## One question, two vocabularies

This question gets debated in two separate rooms, in two separate languages, and the rooms rarely talk to each other.

In the first room are the privacy lawyers. They know the steps of the test but have no concrete picture of how data actually persists inside a model. In the second room are the machine learning researchers. They measure memorization and write extraction attacks, but never say which limb of the legal test their finding maps onto.

The result is familiar: the legal text looks like it was written in a language nobody can measure, and the technical paper reads like curiosity without consequence. Yet both are asking the same thing: _can this model lead back to a person?_

This post merges the two rooms: first what the legal test asks, then how each question maps onto a measurable attack surface, then a protocol for what an engineer should measure before claiming anything is anonymous.

This is about how to _assess_ a claim, not how the protective techniques work; for those see the post on [privacy-preserving learning](/en/posts/privacy-preserving-learning/).

## The legal test: singling out, linkability, inference

The European Data Protection Board adopted its [Guidelines 02/2026 on Anonymisation](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en) on 7 July 2026, with public consultation open until 30 October 2026. The guidelines update the WP29 Opinion 05/2014 and retain the three-criteria test:

-   **Singling out:** can you isolate an individual within the dataset?
-   **Linkability:** can you connect two records belonging to the same person?
-   **Inference:** can you deduce, with significant probability, something about a person that is not written down?

The most consequential feature is that they adopt a _relative_ approach to identifiability, endorsed by the Court of Justice in Case C-413/23 P, EDPS v SRB (4 September 2025). The consequence is sharp: the same dataset can be personal data for one party and anonymous for another. Anonymity is not a permanent property of a file; it depends on who holds which auxiliary information and which means are reasonably available to them.

For models specifically there is [EDPB Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en) of 18 December 2024. It is unambiguous: an AI model trained on personal data cannot be _presumed_ anonymous. The assessment is case by case and requires both risks to be negligible - extracting personal data from the model, and obtaining it through queries.

> Anonymity is not a badge, it is a claim. Like any claim it has to be proven, and the proof lies not in the file itself but in who can reach it and how.

## Memorization is a measurable thing

Now to the second room. The good news from the engineering side is that memorization is not mystical. It is a finite, measurable capacity.

The information a model can store in its weights is bounded and quantifiable. In work by Morris and colleagues dated 30 May 2025, that capacity was [measured at approximately 3.6 bits per parameter](https://arxiv.org/abs/2505.24832). The number moves the debate onto firmer ground: a model stops being an unknowable box and becomes a storage medium of known capacity.

The second finding is more uncomfortable. In work by Nasr, Carlini and colleagues dated 28 November 2023, a [divergence attack raised the rate at which ChatGPT emitted training data by a factor of 150](https://arxiv.org/abs/2311.17035). The lesson is not the specific attack but its scalability: a model that appears to leak nothing under normal use is not a model that leaks nothing. It means nobody has tried the right prompt yet.

Put the two together and the legal test becomes engineering work. Memorization is a finite capacity; extraction is a surface waiting to be probed. Both are measurable, and neither can be eyeballed from the model's size.

## Turning three criteria into attack surfaces

Here is where the bridge gets built: every limb of the legal test has a technical counterpart that can be measured in the lab.

### Singling out maps to training-data extraction

**Training-data extraction** tries to recover a specific record from the training set out of the model. A successful extraction is a direct violation of the singling-out criterion: you are holding an isolated record belonging to one person. The controlled version of this test is to plant unique synthetic records - canaries - before training, then check whether the model gives them back.

### Inference maps to membership inference

A **membership inference attack** asks a more modest question that is no less serious legally: was this record in the training set? You need not recover its contents - learning that a person was in a particular dataset is already a sensitive inference if that dataset is, say, a disease cohort.

### Linkability maps to matching with auxiliary data

Linkability corresponds not to one attack but to a context: combined with another public source, do the model's outputs let someone pull together records belonging to the same person? This is where the relative approach lands - the assessment depends on the auxiliary information an attacker could reasonably obtain.

One point deserves emphasis: all three surfaces apply to **synthetic data** too. [Synthetic data](/en/posts/synthetic-data-generation/) produced by a generator trained on personal data is not automatically anonymous; whatever the generator memorised can leak into its samples. Put synthetic data through the same three tests.

## The engineer's protocol: what you measure before you claim

The work required before you call a model or dataset anonymous is well defined. The flow below is a minimum protocol translating the legal test into measurement steps.

```python
# Minimum audit protocol before an anonymity claim (pseudocode)
inventory = scan_personal_data(training_set)   # what went in, in which categories
duplicate_analysis(training_set)               # duplicates feed memorization

canaries = unique_synthetic_records(n)         # planted BEFORE training
model = train(training_set + canaries)

# 1) singling out: can I recover the record?
extraction = extraction_attack(model, canaries, budget=high)

# 2) inference: was this record in training?
membership = membership_inference(model, members, non_members)
#    the number is not the point: does the attack beat chance, and FOR WHOM
for group in subgroups:
    membership_inference(model, group)         # minority groups carry more risk

# 3) query surface: test the PUBLISHED interface, not just the weights
query_risk = probe_interface(model.api, attack_prompts)

# 4) if a formal guarantee is needed: train with DP, report epsilon and delta
# 5) write all of it down: settings, budget, negative results.
#    A claim without a protocol is not an assessment.
```

Three details matter here. First, do not read the membership inference result as one average number: an attack that does no better than chance overall can be markedly successful within a small subgroup. Privacy risk, like fairness, hides in the subgroups.

Second, Opinion 28/2024 counts query risk separately for a reason: a service that keeps its weights closed still fails the test if its interface hands over personal data. Audit the interface you actually publish.

Third, if you need a formal guarantee, the road runs through differential privacy, which means reporting ε and δ. For a reference point, Google's [VaultGemma-1B](https://huggingface.co/google/vaultgemma-1b) is a Gemma variant pre-trained from scratch with DP-SGD at ε ≤ 2.0 and δ ≤ 1.1e-10. For contrast, the production [privacy-loss budget](https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/process/disclosure-avoidance/2020-das-development.html) of the 2020 US Census was ε = 12.2 globally (10.3 for persons, 1.9 for housing units). In practice ε need not be as small as textbooks suggest; what matters is the value and how it was chosen.

## Documentation, context and reasonable limits

Say you have run the audit. What remains is the step most often skipped: writing it down. An assessment is worth as much for its method as for its result, and if nobody recorded which attacks were tried, with what budget and under which assumptions, what you have is an opinion. The natural home for those records is your [model cards and governance documentation](/en/posts/model-cards-governance/).

The relative approach has a practical consequence here too: an assessment holds for a specific context. The assessment you made while running the model internally is void once you publish the weights or open up the interface. Change the mode of distribution and you redo the assessment.

Deletion requests are a separate matter, often conflated with this one. [Machine unlearning](/en/posts/machine-unlearning-right-to-be-forgotten/) methods that remove a record's influence can be valuable, but a successful unlearning operation is not proof that the model is anonymous; it is a claim about one specific record.

For readers working in Turkey: there is no enacted AI-specific statute, so the frame is set by personal data protection legislation and by KVKK guidance. On 24 November 2025 KVKK published its [guide on generative AI and personal data protection, in 15 questions](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda), following its earlier recommendations on personal data protection in the field of AI from 15 September 2021. Watching the European debate pays off locally, because the questions are the same.

Where the training data came from sits at the same table. At the same plenary as the anonymisation guidelines, the EDPB also [adopted Guidelines 03/2026 on web scraping in the context of generative AI](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en). Read them together: how you collected the data and how anonymous the model ends up being are links in the same chain.

<div class="callout"><strong>Tip:</strong> Do not treat anonymity as a certificate you obtain once and file away. A new deployment mode, a new interface, a new data source or a newly published attack reopens the assessment. Keep your audit protocol re-runnable, exactly like your test suite.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The EDPB three-criteria test still governs: singling out, linkability and inference.</li><li>A model trained on personal data cannot be presumed anonymous; the assessment is case by case.</li><li>Anonymity is relative: the same data can be personal for one party and anonymous for another.</li><li>Each legal criterion has a measurable counterpart: extraction, membership inference and auxiliary-data matching.</li><li>Write down the protocol, not just the result - an undocumented anonymity claim is not an assessment.</li></ul></div>

<div class="faq"><details><summary>I deleted the training data - is the model anonymous now?</summary><p>Not by itself. EDPB Opinion 28/2024 says a model trained on personal data cannot be presumed anonymous; you must show that both the risk of extracting personal data and the risk of obtaining it through queries are negligible. Deleting the source data removes neither.</p></details><details><summary>If I train with differential privacy, is the problem solved?</summary><p>Not solved, but made measurable. Differential privacy gives you a defensible, numerical guarantee; in return you have to declare its strength through ε and δ and justify the budget you chose. The guarantee is only as strong as that budget.</p></details><details><summary>My model is small, so there is no memorization risk, right?</summary><p>Model size alone is not a defence. Capacity scales with parameters, but the decisive factor is on the data side: duplicated records and rare, distinctive examples are vulnerable to memorization at any scale. Measure it instead of guessing.</p></details></div>

---

The answer to the anonymity question is neither pure law nor pure engineering. The legal test tells you what you have to prove; the measurement tools tell you how to prove it. Teams that get both rooms around the same table build more defensible systems, and they actually know their own risk.
