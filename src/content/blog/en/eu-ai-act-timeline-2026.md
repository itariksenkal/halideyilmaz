---
title: "The EU AI Act's New Timeline: What the 2026 Omnibus Changed and What Is Actually in Force Today"
description: "The EU AI Act was not delayed; part of it was. What Regulation (EU) 2026/1744 actually changed, why Article 50 transparency has applied since 2 August 2026, and how the 2 December 2027 and 2 August 2028 deadlines now work, traced to primary sources."
publishDate: "2026-08-13T23:29:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "yapay-zeka-yasasi-yeni-takvim"
heroImage:
  src: "../../../assets/blog/covers/eu-ai-act-timeline-2026.jpg"
  alt: "The EU AI Act's New Timeline: What the 2026 Omnibus Changed and What Is Actually in Force Today"
---

In July 2026 the EU AI Act's timeline changed, and two wrong stories are now circulating: “the Act was delayed” and “nothing changed”. Both are false. The obligations for high-risk systems really did move to later dates. The transparency obligations, on the other hand, were **not** deferred and have applied since 2 August 2026. This post sets out which date moved where, which article binds you today, and how to verify a date yourself, from an engineer's point of view.

## “The Act was delayed” is wrong: part of it was

Think of a flight schedule. Not one flight, but six departures from the same airport at different times. If two of them are pushed back, you do not say the airport closed. The EU AI Act is not a single text that switches on at a single moment; it is a staged regulation whose parts start applying on different dates. In July 2026 two of those departure times changed. The others did not.

Most published coverage still prints the old schedule. At the time of writing, the Turkish-language pages ranking highest for this topic still give 2 August 2026 or 2 August 2027 as the high-risk deadline. Those dates are superseded. Equally, the headlines announcing that Europe pushed its AI rules back by two years leave out the decisive half: **the transparency obligations were never deferred.**

> A regulatory timeline becomes wrong the moment you compress it into one date. The useful question is not “when does the Act apply?” but “which article does _my_ system fall under, and when does that article start applying?”

In practice the difference is stark. If you operate a chat interface, your obligation started already. If you are building a CV-screening model, you have close to sixteen months of build window ahead of you. Summarising both as “delayed” sends your team in the wrong direction.

## What Regulation (EU) 2026/1744 actually did

The instrument that changed the timeline is **Regulation (EU) 2026/1744**, known publicly as the Digital Omnibus on AI. Dated 8 July 2026, it was published in the Official Journal on **24 July 2026** and entered into force three days after publication, on **27 July 2026**. It amends the AI Act itself — Regulation (EU) 2024/1689 — and also touches the civil aviation and machinery regulations.

-   **Annex III high-risk systems:** the application date moved from 2 August 2026 to **2 December 2027**.
-   **Annex I high-risk systems** (AI embedded as a safety component in regulated products): moved from 2 August 2027 to **2 August 2028**.
-   **The fundamental rights impact assessment (Article 27, FRIA):** moved along with the Annex III obligations to 2 December 2027.
-   **Article 50 transparency obligations:** _unchanged_. They started applying on 2 August 2026.

<div class="callout"><strong>Tip:</strong> Verify a date against two primary sources rather than a secondary blog: the Commission's <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" target="_blank" rel="noopener">AI Act Service Desk timeline</a> and the <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">Commission's regulatory framework page</a>. The text of the amending regulation itself is on <a href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj" target="_blank" rel="noopener">EUR-Lex</a>.</div>

The reasoning behind the deferral is technical and quite instructive: the harmonised standards were not ready. To run a conformity assessment on a high-risk system, a provider needs a common standard to measure against; without one, an obligation that is formally in force does not define a reachable target. Seen from engineering, this is a familiar situation — a delivery date cannot precede the acceptance criteria.

## The corrected timeline, date by date

The list below follows the Commission's own current timeline. I have deliberately kept the past dates in, because knowing which obligations are already live matters at least as much as knowing the future ones.

-   **1 August 2024** — the Regulation entered into force.
-   **2 February 2025** — prohibited practices and the AI literacy obligation started to apply.
-   **2 August 2025** — general-purpose AI (GPAI) model rules, the governance structure and the penalty provisions started to apply.
-   **2 August 2026** — the majority of the Regulation, including the **Article 50 transparency obligations**, started to apply.
-   **2 December 2026** — new prohibited practices take effect; this is also when the grace period expires for machine-readable marking of systems already placed on the market before 2 August 2026.
-   **2 August 2027** — AI regulatory sandboxes become operational.
-   **2 December 2027** — obligations for **Annex III high-risk AI systems** start to apply.
-   **2 August 2028** — obligations for **Annex I** high-risk systems embedded in regulated products start to apply.

If you take one thing from this list, make it this: the 2 August 2026 line was not deleted. What moved was the high-risk package that was due that day; the transparency package that arrived on the same day stayed put. Every write-up that summarises the change as “2026 is gone, 2027 is the new date” loses exactly that distinction.

## In force right now: the Article 50 transparency obligations

Article 50 sets the rules for telling a person that AI is involved, and it contains four separate duties. Every one of them requires engineering work; none of them ends with a legal notice.

### Who has to disclose what?

-   **Systems that interact with people:** a person must be able to know they are talking to an AI system, unless that is obvious from the circumstances. This is an interface decision — when, where and how visibly the disclosure appears is part of the design.
-   **Providers of synthetic content:** generated audio, image, video or text must be marked in a _machine-readable_ way. A badge visible to a human eye is not enough; the content must carry a technically detectable trace.
-   **Emotion recognition and biometric categorisation:** exposed individuals must be informed.
-   **Deepfakes:** content must be disclosed as artificially generated or manipulated. A comparable disclosure applies to text published to inform the public on matters of public interest, with an exception where the content underwent human editorial review. There is also a narrowed exemption for artistic, satirical and fictional work.

<div class="callout"><strong>Tip:</strong> Do not file machine-readable marking under “we will add it later”. A watermark or a content credential belongs inside the generation step, not bolted onto the pipeline's exit; a trace added afterwards dies at the first re-encode. We go through this in detail in <a href="/en/posts/ai-content-labeling-transparency/">labelling AI-generated content</a>.</div>

The only concession is this: for systems placed on the market before 2 August 2026, the machine-readable marking duty does not bite until 2 December 2026. That is a four-month technical grace period, not a deferral of the transparency obligation itself.

## What to build before 2 December 2027

Reading the deferral as relief is the most expensive interpretation available. If you are building a system that falls under Annex III — recruitment, creditworthiness, education, critical infrastructure, law enforcement and similar areas — you are facing a stack of documentation that cannot be written in one sitting, and much of it _cannot be produced retroactively_. You cannot write down how a dataset was collected by remembering it two years later; you have to keep that record while collecting.

Translated into engineering deliverables, the obligations come out roughly like this:

-   **Risk management system:** a versioned risk register maintained across the lifecycle — not a one-off PDF.
-   **Data governance (Article 10):** training, validation and test sets that are sufficiently representative for the intended purpose and, to the best extent possible, free of errors and complete; documented collection processes, preparation operations and bias examination.
-   **Technical documentation:** the sections Annex IV requires. A simplified form is provided for small and micro enterprises, and the Omnibus extended that simplification to medium-sized enterprises.
-   **Record-keeping:** automatic event logging over the system's lifetime. This is the infrastructure that incident reporting depends on.
-   **Accuracy, robustness and cybersecurity (Article 15):** providers must _declare the levels of accuracy and the relevant accuracy metrics_ in the instructions for use. A single point estimate is now a compliance artefact.
-   **Human oversight:** designed intervention points. “The operator can switch it off” is not a design.

Half of that list is simply good engineering. The documentation discipline described in [model cards and governance](/en/posts/model-cards-governance/), the subgroup analysis in [bias and fairness](/en/posts/bias-and-fairness/), and the error-analysis habit behind [data-centric AI](/en/posts/data-centric-ai/) produce these artefacts almost as a by-product. Compliance is not a separate department's job; it is disciplined engineering, written down.

> Sixteen months is a reasonable amount of time to build a documentation culture. It is a short amount of time to fake one.

## How to verify a date yourself

The most durable part of this post is probably not the dates but the habit of checking them. What happened in the summer of 2026 was this: the law changed, and secondary sources kept republishing the superseded text for days and in some cases weeks. That is not an accident peculiar to AI regulation; it will happen with any fast-moving rulebook.

### A three-step check

-   **Go to the institution's own page.** For the AI Act that means the Commission's Service Desk timeline and its digital strategy pages — not a law firm's summary of them.
-   **Name the instrument that made the change.** A “delay” is not an event, it is a document: here, Regulation (EU) 2026/1744. If there is no document number, there is no claim.
-   **Translate the date into your team's language.** “2 December 2027” is not a calendar entry; it is the question “which documents, which logs and which measurements will exist on that date?”

One last caveat. This post was written on 13 August 2026, and the dates above were verified against Commission sources that day. If the rules change again, the authority will still not be this page — it will be the institution's own. For the engineering counterpart of this timeline, see [what a high-risk AI system actually has to have](/en/posts/high-risk-ai-system-requirements/).

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The Act was not delayed; two high-risk packages were, while the transparency package stayed exactly where it was.</li><li>The instrument that moved the dates is Regulation (EU) 2026/1744: published 24 July 2026, in force 27 July 2026.</li><li>Annex III high-risk moved to 2 December 2027 and Annex I to 2 August 2028; the Article 27 FRIA moved to 2 December 2027 as well.</li><li>Article 50 transparency has applied since 2 August 2026; only marking of pre-existing systems has until 2 December 2026.</li><li>Documentation cannot be produced retroactively — spend the sixteen-month window building the record-keeping, not waiting.</li></ul></div>

<div class="faq"><details><summary>Was the whole EU AI Act postponed?</summary><p>No. Regulation (EU) 2026/1744 changed only the application dates for high-risk systems: Annex III moved to 2 December 2027 and Annex I to 2 August 2028. Prohibited practices, GPAI rules and the Article 50 transparency obligations remain on their own schedules and are already in force.</p></details><details><summary>Which obligations bind me right now?</summary><p>Prohibited practices and AI literacy since 2 February 2025; general-purpose AI model rules, governance and penalties since 2 August 2025; Article 50 transparency since 2 August 2026. If you are building a high-risk system your obligations have not started yet, but your preparation should have.</p></details><details><summary>Does the Act apply outside the EU?</summary><p>It can. Providers who place systems on the EU market, and in defined cases those whose system output is used in the Union, fall within scope regardless of where they are established. Territorial scope is the first thing to check, before any date.</p></details></div>

---

In short: any write-up that squeezes this timeline into one sentence gets it wrong. The correct reading is two sentences. Transparency is in force today; high-risk arrives on 2 December 2027. A team that holds both sentences at once neither misses the obligation it already has, nor wastes the build window it has been given.
