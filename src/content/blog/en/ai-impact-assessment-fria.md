---
title: "AI Impact Assessment: How FRIA, ISO 42005 and a DPIA Differ — and How to Run One"
description: "A fundamental rights impact assessment, an ISO/IEC 42005 impact assessment and a data protection impact assessment are three different documents. Who each one binds, when it is required, when it applies, and how to run them together without doing the work three times."
publishDate: "2026-08-13T23:24:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "yapay-zeka-etki-degerlendirmesi"
heroImage:
  src: "../../../assets/blog/bimg-06.jpg"
  alt: "AI Impact Assessment: How FRIA, ISO 42005 and a DPIA Differ — and How to Run One"
---

When someone on an AI project says “we need to do an impact assessment”, the three people at the table usually mean three different documents: the lawyer means a data protection impact assessment, the compliance lead means ISO/IEC 42005, and whoever is tracking the AI Act means a fundamental rights impact assessment. These are not the same document — different scope, different addressee, different dates. This post separates them, and shows how one piece of work can feed all three.

## Three documents, three different questions

The cleanest distinction is the question each one answers:

-   **Data protection impact assessment (DPIA):** “What risks does this processing create for _personal data_?” Addressed to the controller; grounded in data protection law.
-   **Fundamental rights impact assessment (FRIA):** “What effect does this high-risk system have on the _fundamental rights of the people affected_?” Addressed to specific deployers; grounded in Article 27 of the EU AI Act.
-   **ISO/IEC 42005 impact assessment:** “By _what process_ do we assess this AI system's effects on individuals, groups and society?” Addressed to the organisation itself; grounded in a voluntary standard.

All three assess risk, but through different lenses. The DPIA centres on the data, the FRIA on the affected person, and 42005 on the organisation's process. It is entirely possible for all three to be required on one project, and that is not duplication.

> Writing the same risk three times is waste. Melting three different risks into one document is negligence. The whole discipline lies in knowing which is which.

There is a fourth thing frequently confused with these in Turkey: **VERBİS**, the data controllers' registry. That is a _registration_ duty, not an impact assessment. Having registered does not substitute for a risk analysis — and the equivalent trap exists in every jurisdiction with a filing obligation.

## FRIA: who it binds, and when

Article 27 of the EU AI Act places the fundamental rights impact assessment on the _deployer_, not the provider — on the party that uses the system, not the one that builds it. And not on every deployer:

-   Bodies governed by public law, and private entities providing public services, when they use Annex III high-risk systems;
-   Deployers of systems used to evaluate the creditworthiness of natural persons or establish their credit score;
-   Deployers of systems used for risk assessment and pricing in life and health insurance.

The content is defined: the processes in which the system will be used, the period and frequency of use, the categories of persons likely to be affected, the specific risks of harm to them, the human oversight arrangements, and the measures to be taken if those risks materialise — including internal governance and complaint mechanisms.

<div class="callout"><strong>Tip:</strong> The FRIA date changed in July 2026. When Regulation (EU) 2026/1744 moved the Annex III obligations to 2 December 2027, Article 27 moved with them. Teams planning from a 2025 article believe this obligation has already started. Current timeline: <a href="/en/posts/eu-ai-act-timeline-2026/">the new timeline post</a>.</div>

One more point: the FRIA does not replace the DPIA. Article 27 provides that where elements of the required assessment are already covered by a data protection impact assessment, the fundamental rights assessment complements it. Order matters, then — a team that does the DPIA first writes a shorter FRIA.

## The DPIA: the data lens

The data protection impact assessment is a much older instrument than AI, and for that reason it has some blind spots in an ML context. A classic DPIA describes a _processing operation_: what data, for what purpose, on what legal basis, for how long, shared with whom.

Model training does not fit that template cleanly, because:

-   Even when the training data is deleted, a _trace_ may remain in the model. Whether the model can be treated as anonymous is a separate and hard question, covered in [is your model anonymous](/en/posts/is-your-model-anonymous-memorization/).
-   The purpose shifts between training and inference: one dataset trains a model, and the model is then used for something else.
-   A retention period is definable for data but awkward to define for model weights.
-   When an erasure request arrives, deleting the data does not fix the model. [Machine unlearning](/en/posts/machine-unlearning-right-to-be-forgotten/) takes up that gap.

So rather than filling in the standard template and moving on, it is far more useful to add these four as explicit headings. How privacy-preserving methods reduce some of these risks is covered in [privacy-preserving learning](/en/posts/privacy-preserving-learning/).

## ISO/IEC 42005: the standard that defines the process

ISO/IEC 42005:2025 was published on 28 May 2025 ([source](https://webstore.iec.ch/en/publication/107659)) and provides guidance for AI system impact assessment. Its difference from the other two is that it is a _method_ rather than an _obligation_: when an assessment is triggered, who participates, how the output is documented, and how often it is revisited.

Its most useful property in practice is that it binds the assessment to the lifecycle. An impact assessment is not a one-time gate; it is a step that must repeat when the system changes materially, enters a new use context, or when monitoring produces a new harm signal.

<div class="callout"><strong>Tip:</strong> Do not run the three as separate processes. Keep one <em>harm register</em>: each row records who can be harmed, by what mechanism, with what likelihood, and what mitigation is in place. Then generate all three documents from that register. Collecting the same information three times is the main reason teams come to hate assessments.</div>

## One piece of work that feeds all three

The shared backbone is these six questions. Answer them once, properly, and the body of all three documents is written.

-   **What does the system do, and which decision does it affect?** Write the decision sentence: “this model is used at stage Z of decision Y about X.”
-   **Who is affected?** Not only the user: the subject of the decision, those excluded by it, and people affected who never see the system at all.
-   **By what mechanism does harm arise?** A false positive, a false negative, a systematic subgroup gap, a feedback loop?
-   **How large and how reversible is the harm?** A rejected loan application and a misfiled email do not carry the same weight.
-   **Where is the human?** And does that human actually have the information and the time to decide differently?
-   **How would we know?** Which measurement, at what frequency, against what threshold, would show that this harm occurred?

That last question is the most skipped item in this post. A harm scenario written without defining the measurement that would detect it is an aspiration. How to measure by subgroup is covered in [fairness auditing](/en/posts/fairness-auditing-in-practice/), and when a measurement is meaningful at all in [confidence intervals and bootstrap](/en/posts/statistical-significance-model-comparison/).

> A risk with no defined measurement is a recorded worry. Recording worries is good, but it is not protection.

## A practical order of work

For a team building for the EU market, the sequence that wastes least effort:

-   **Scope first.** Is the system high-risk under the AI Act, and are you the provider or the deployer? Those two answers decide whether the FRIA falls on you at all.
-   **Then data.** If personal data is processed, do the data protection assessment. It shortens the FRIA later.
-   **Then the harm register.** Answer the six questions above in a single table.
-   **Documents last.** Generate the documents from the register, never the register from the documents.

Teams outside the EU should not skip the exercise on the grounds that no local statute demands it. Turkey, for instance, has no enacted AI law; personal data is governed by the KVKK framework, and the authority has published AI-specific guidance — the September 2021 [recommendations on personal data in the field of AI](https://www.kvkk.gov.tr/Icerik/7048/Yapay-Zeka-Alaninda-Kisisel-Verilerin-Korunmasina-Dair-Tavsiyeler) and the November 2025 [guide on generative AI and personal data protection](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda). A team serving EU customers still falls within the AI Act's reach.

The output of this work also fills the “limitations” and “ethical considerations” sections of your [model card](/en/posts/model-cards-governance/); and the conceptual framing in [bias and fairness](/en/posts/bias-and-fairness/) is the reference you will lean on most when naming harm mechanisms.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The DPIA looks at data, the FRIA at affected people, and ISO/IEC 42005 at the organisation's process — three lenses, not one document.</li><li>The FRIA falls on specific deployers rather than providers, and Regulation (EU) 2026/1744 moved it to 2 December 2027.</li><li>A registration duty such as VERBİS is a filing, not an assessment; having filed does not substitute for a risk analysis.</li><li>The classic DPIA template leaves four ML blind spots: traces in the model, purpose shift, weight retention and erasure requests.</li><li>Keep one harm register and generate all three documents from it; every harm row needs its own measurement.</li></ul></div>

<div class="faq"><details><summary>If I have done a DPIA, do I still need a FRIA?</summary><p>If it applies to you, yes — but not from scratch. Article 27 provides that where elements of the required assessment are already covered by the data protection impact assessment, the fundamental rights assessment complements it. In practice a team that does the DPIA first does less total work.</p></details><details><summary>I am a provider, not a deployer. Does the FRIA fall on me?</summary><p>Article 27 places the obligation on deployers. As a provider, however, you are expected to supply the information that lets a deployer carry it out: intended purpose, known limitations, accuracy levels and subgroup performance. A provider who withholds that leaves its customer non-compliant.</p></details><details><summary>Is ISO/IEC 42005 mandatory?</summary><p>No. It is a voluntary standard and satisfies no legal obligation on its own. Its value is that it turns impact assessment into a repeatable process and defines when it has to be redone across the lifecycle.</p></details></div>

---

In short: the existence of three documents is not a bureaucracy problem but a question of three lenses. Fed from one harm register, they do not triple the workload — each catches what the others miss. The confusion comes not from having several documents, but from never writing down which one looks at what.
