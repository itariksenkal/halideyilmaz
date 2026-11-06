---
title: "ISO/IEC 42001 for Engineers: What an AI Management System Actually Requires — and Why It Is Not AI Act Compliance"
description: "What ISO/IEC 42001 actually requires, how its Annex A controls map onto real ML artefacts, what ISO/IEC 42005 and 42006 added, and why the standard is not harmonised and therefore grants no presumption of conformity under the EU AI Act."
publishDate: "2026-08-13T23:26:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "iso-42001-yapay-zeka-yonetim-sistemi"
heroImage:
  src: "../../../assets/blog/bimg-04.jpg"
  alt: "ISO/IEC 42001 for Engineers: What an AI Management System Actually Requires — and Why It Is Not AI Act Compliance"
---

Search for “what is ISO 42001” and almost every page you find belongs to a certification body, and every one of them ends in the same place: selling an audit. Yet the engineering side of this standard is genuinely instructive — and there is a critical fact almost no page states: **ISO/IEC 42001 confers no presumption of conformity under the EU AI Act.** This post translates the standard into an ML team's language and makes that distinction plain.

## What an AI Management System is, and what it is not

ISO/IEC 42001, published on 18 December 2023, is a _management system_ standard. You may have met the type before: what ISO 9001 does for quality and ISO/IEC 27001 does for information security, 42001 does for artificial intelligence. It uses the same high-level structure: context of the organisation, leadership, planning, support, operation, performance evaluation and improvement.

The most common misunderstanding is this: a management system standard **does not say your product is good**. It says you have a process for deciding about your product, and that the process is defined, applied and auditable. Put plainly: a 42001 certificate does not say “this model is fair”; it says “this organisation has a working mechanism for assessing whether the model is fair”.

> A management system standard certifies the process, not the outcome. A team that confuses the two treats the certificate as a shield, when it is a skeleton.

That distinction is not a technicality. In most organisations the real problem is not a bad model but an unclear locus of decision: who approved this model, who chose the threshold, who stops it if it goes wrong? 42001 was written to fill exactly that gap.

## The Annex A controls, translated into engineering

The body of the standard describes the process; the concrete part is the control list in its annex. Rather than enumerate the controls, let us cluster them by the artefacts an ML team actually produces — which is precisely what the certification pages never do.

-   **Policy and roles:** an AI policy, with defined roles and responsibilities. Engineering equivalent: a document saying whose sign-off a model release requires.
-   **Lifecycle management:** objectives, design, verification, deployment, operation and retirement. Equivalent: a model registry, versioning, and a decommissioning procedure.
-   **Data management:** provenance, quality, preparation. Equivalent: [dataset documentation](/en/posts/datasheets-for-datasets/) and pipeline tests.
-   **Impact assessment:** assessing effects on individuals and groups. Equivalent: subgroup performance reporting and written harm scenarios.
-   **Information and transparency:** what is provided to users and affected parties. Equivalent: the [model card](/en/posts/model-cards-governance/) and the instructions for use.
-   **Third parties and supply chain:** models, data and services obtained externally. Equivalent: a record of which foundation model you use under which licence.

<div class="callout"><strong>Tip:</strong> Not all Annex A controls are mandatory; you produce a <em>statement of applicability</em> setting out which you apply and why you excluded the rest. That document sits at the centre of the audit, and when written honestly it is also the most useful artefact the organisation gets out of the exercise.</div>

## 42005 and 42006: the other two family members

2025 was the year this family turned into a real ecosystem. Two publications matter:

-   **ISO/IEC 42005:2025** — guidance on AI system impact assessment, published 28 May 2025 ([source](https://webstore.iec.ch/en/publication/107659)). This answers the “how” where 42001 only says “carry out an impact assessment”.
-   **ISO/IEC 42006:2025** — requirements for bodies providing audit and certification of AI management systems, published 7 July 2025 ([source](https://webstore.iec.ch/en/publication/108460)). In other words, the standard that governs the auditor.

42006 matters particularly, because it is the maturity signal for the certification market. The first problem that appears the moment a standard is published is who audits it and with what competence. On the accreditation side, the first step came with Schellman on 24 September 2024; BSI gained accreditation on 10 March 2026.

The main standard itself is available through the [IEC Webstore](https://webstore.iec.ch/en/publication/90574). Because these standards are paid documents, teams looking for a free summary tend to land on second-hand and often sales-driven content — which is part of why this post exists.

## The critical correction: this is not AI Act compliance

Now to the real reason for writing. A sentence circulates widely in this market: “get ISO 42001 and you are ready for the EU AI Act”. That sentence is wrong, and its wrongness rests not on a technical detail but on how the legislation works.

The AI Act grants a _presumption_ of conformity only to **harmonised standards**. A harmonised standard is one produced under a Commission request and **cited in the Official Journal of the European Union**. What makes a standard harmonised is not the quality of its content but that official citation.

ISO/IEC 42001 has not received it. Therefore:

-   A 42001 certificate **does not** confer a presumption of conformity for a high-risk system.
-   You still have to demonstrate that each requirement is met; the certificate can lighten that work but cannot replace it.
-   On the harmonised side, none of the roughly nine deliverables from CEN-CENELEC's JTC 21 had been cited in the Official Journal at the time of writing ([standardisation status](https://artificialintelligenceact.eu/standard-setting-overview/)).

<div class="callout"><strong>Tip:</strong> If a supplier tells you “we hold ISO 42001, so we are AI Act compliant”, ask one question: has that standard been cited in the Official Journal? If the answer is no, the certificate is a good governance signal but not a declaration of conformity. For the source of this distinction, see the <a href="https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/" target="_blank" rel="noopener">CSA research note</a>.</div>

> A certificate shows that you asked the right question. It does not show that your answer was right. The legislation asks for the second one.

## So why is it still worth doing?

A team that has read this far may reasonably ask: if it is not compliance, why bother? There are three good reasons, and none of them is the certificate itself.

### 1\. It puts decision rights in writing

In most teams, model approval is a consensus process in which no name appears. 42001 forces you to write down where the decision sits. On its own, that means knowing who can stop the system during an incident — and it is a precondition for the [incident reporting](/en/posts/ai-incident-reporting-post-market/) duty.

### 2\. It puts monitoring on a calendar

The performance-evaluation clause gives measurement a regular rhythm. Instead of checking whether the model has degraded only when a complaint arrives, it turns the [monitoring and drift](/en/posts/model-monitoring-drift/) discipline into an organisational obligation.

### 3\. It makes the supply chain visible

You have to record which foundation model you use, under which licence, trained on what. That makes both your [data provenance](/en/posts/data-provenance-training-data-licensing/) and your [privacy-preserving learning](/en/posts/privacy-preserving-learning/) decisions auditable.

In short, the value of 42001 is that it gives an organisation the _habit_ of producing the artefacts the AI Act will ask for. The habit is what is valuable; the certificate matters only insofar as it evidences it.

## Where to start

Without selling certification consultancy, a sensible engineering order:

-   **Inventory.** How many AI systems does the organisation have? Very few organisations get this right first time; shadow usage always turns up.
-   **Classification.** For each system: which decision does it affect, who is affected, and what happens when it fails? This is the shared input to both the 42001 impact assessment and AI Act risk classification.
-   **Gap analysis.** Compare the Annex A controls against current practice. Most teams already do half of them — they just do not write them down.
-   **Statement of applicability.** Record what you apply and why. The justification for an excluded control matters as much as the one you implement.
-   **Measurement.** Fill the performance-evaluation clause with real metrics; which metric is right when is covered in [classification metrics](/en/posts/classification-metrics/).
-   **Certification last.** Going into an audit without the first five steps is like sitting an exam without learning the subject: you may get the certificate, you will not get the benefit.

One closing note: there are three different impact-assessment regimes and teams confuse them constantly — ISO/IEC 42005, the AI Act's fundamental rights impact assessment, and the data protection impact assessment. We separate them in [the impact assessment post](/en/posts/ai-impact-assessment-fria/).

<div class="takeaways"><h4>Key takeaways</h4><ul><li>ISO/IEC 42001 is a management system standard: it certifies that your decision process is defined, not that your product is good.</li><li>Read properly, the Annex A controls amount to a model registry, dataset documentation, a model card and subgroup reporting.</li><li>ISO/IEC 42005:2025 standardised impact assessment and ISO/IEC 42006:2025 standardised the auditor.</li><li>The standard is not harmonised and is not cited in the Official Journal, so it grants no presumption of conformity under the AI Act.</li><li>Its value is not the certificate but the habit of producing the artefacts the AI Act will demand.</li></ul></div>

<div class="faq"><details><summary>Does an ISO/IEC 42001 certificate make me AI Act compliant?</summary><p>No. A presumption of conformity attaches only to harmonised standards cited in the Official Journal of the European Union, and ISO/IEC 42001 has not been cited. The certificate is a good governance signal and makes preparation easier, but you must still demonstrate that each requirement is met.</p></details><details><summary>We already hold ISO/IEC 27001. How much extra work is 42001?</summary><p>Because the high-level structure is shared, most of the management-system skeleton is reusable. The real additional work concentrates in the AI-specific controls: data provenance and quality, impact assessment, model lifecycle, and use of third-party models. Those have no counterpart in the information security standard.</p></details><details><summary>We are a small team. Can we benefit without certifying?</summary><p>Yes, and for most teams that is the right call. The inventory, classification, gap analysis and statement of applicability can all be done without an audit, and they deliver most of the benefit. Certification mainly becomes worthwhile once you need external evidence.</p></details></div>

---

In short: ISO/IEC 42001 is a good skeleton and a poor shield. For an organisation that fills it with real measurements and real records, it makes both governance and regulatory readiness easier. For one that mistakes the certificate for compliance itself, it produces an expensive false sense of safety.
