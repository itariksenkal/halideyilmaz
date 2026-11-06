---
title: "The NIST AI Risk Management Framework in Practice: Turning Govern-Map-Measure-Manage into Engineering Work"
description: "Instead of restating the four functions of the NIST AI RMF, this post turns them into engineering work. Why the MEASURE function is the one most teams leave empty, what the Generative AI Profile added, and why the framework is currently under revision."
publishDate: "2026-08-13T23:25:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "nist-yapay-zeka-risk-cercevesi"
heroImage:
  src: "../../../assets/blog/covers/nist-ai-rmf-in-practice.jpg"
  alt: "The NIST AI Risk Management Framework in Practice: Turning Govern-Map-Measure-Manage into Engineering Work"
---

Almost everything written about the NIST AI Risk Management Framework does the same thing: it names the four functions and stops. But the framework's real difficulty is not in the names — it is in **MEASURE**. NIST asks for measurements most teams cannot produce, and that gap is the actual subject of this post. The framework itself is also under revision right now, which is worth knowing before you build policy on it.

## What the framework is and what it looks like

NIST AI RMF 1.0 was released on 26 January 2023 (NIST.AI.100-1). It is voluntary, not binding. That does not make it unimportant: it is referenced everywhere from US federal procurement to corporate risk policy, and it overlaps conceptually with most of what the EU AI Act asks organisations to document.

The framework is organised around four functions:

-   **GOVERN** — organisation-wide risk culture, roles, policies and accountability. This is the function that surrounds the other three.
-   **MAP** — establishing context: what the system is for, who is affected, under which assumptions it operates.
-   **MEASURE** — analysing, assessing, benchmarking and monitoring the risks.
-   **MANAGE** — prioritising and mitigating risks, accepting residual risk, and responding to incidents.

The structure overlaps substantially with ISO/IEC 42001 but rests on a different philosophy. 42001 establishes a _management system_ and can be certified; the AI RMF offers a _way of thinking_ and cannot. They are not competitors but different layers, as we detail in [the ISO/IEC 42001 post](/en/posts/iso-42001-ai-management-system/).

## GOVERN and MAP: the parts that look easy and get skipped

These two functions look easy on paper because they require no code. That is exactly why they get skipped.

### GOVERN: who can stop it?

A governance structure has one honest test: when the system starts behaving badly, who can stop it, within what time, and on whose authority? If the answer to that question does not contain a name and a duration, governance has not been established yet.

### MAP: writing down the assumptions

MAP establishes context: intended use, affected parties, benefits and potential harms, and — critically — _assumptions_. A model's assumptions are almost never written down, yet most production failures come straight out of them.

-   Do the training data and the production data come from the same distribution?
-   How long do labels take to arrive? Do they arrive at all?
-   Does the model advise a human, or decide directly?
-   Is the input user-generated? Then should you expect adversarial input?

<div class="callout"><strong>Tip:</strong> Do not make the MAP output a separate document. Write it into the “intended use”, “out-of-scope use” and “limitations” sections of the <a href="/en/posts/model-cards-governance/">model card</a>. A team that keeps two documents ends up updating neither.</div>

## MEASURE: the genuinely hard part

Now to the substance. The MEASURE function asks you to _measure_ the risks: not just accuracy, but reliability, robustness, fairness, transparency, privacy, and how each of those moves over time. In practice most teams write one accuracy number under this function and move on.

> The distance between naming a risk and measuring it is the distance between governance documents and engineering. Most organisations have done the first and not the second.

The headings that need to become measurable, and what they correspond to:

-   **Accuracy:** not one score, but a score with an interval and broken down by subgroup. How do you know a difference is real? [Confidence intervals and bootstrap](/en/posts/statistical-significance-model-comparison/).
-   **Reliability:** whether the model is right where it says it is confident — that is [calibration](/en/posts/model-calibration-probabilities/). Choosing a threshold on an uncalibrated score is guessing, not measuring.
-   **Uncertainty:** an interval with a coverage guarantee rather than a point estimate. [Conformal prediction](/en/posts/conformal-prediction-uncertainty/) is the most practical route.
-   **Fairness:** subgroups must be large enough for the estimate to exceed the noise, or what you are measuring is variance. [Fairness auditing](/en/posts/fairness-auditing-in-practice/).
-   **Change over time:** [drift and monitoring](/en/posts/model-monitoring-drift/), and for the question of what to do before labels arrive, [performance estimation without labels](/en/posts/performance-estimation-without-labels/).
-   **The validity of the evaluation itself:** is your measuring instrument reliable? See [annotator agreement](/en/posts/annotator-agreement-evaluator-reliability/) and [benchmark contamination](/en/posts/benchmark-contamination/).

A team that takes MEASURE seriously ends up implementing essentially every measurement post on this site. That is not a coincidence: what NIST is asking for is measurement science applied to machine learning.

## MANAGE: accepting risk and responding to incidents

MANAGE is where you decide what to do about the risk you measured. It contains three separate decisions, and all three should be written down.

-   **Prioritisation:** which risk gets addressed first? That is a business decision, not an engineering one — but it cannot be made without engineering input.
-   **Mitigation:** a threshold change, a human review layer, a narrowing of scope, more data collection. Every mitigation has a cost and usually a side effect — a meaningful gain in precision almost always costs recall.
-   **Accepting residual risk:** risk that cannot be driven to zero has to be explicitly accepted by someone with authority. An unsigned acceptance is not an acceptance.

Then there is incident response, which is where this framework meets the EU AI Act most directly. If you have a reporting obligation measured in days, your MANAGE function has to include an on-call rota and a rollback procedure. See [incident reporting and post-market monitoring](/en/posts/ai-incident-reporting-post-market/).

## The Generative AI Profile, and where the framework stands today

NIST publishes _profiles_ that adapt the framework to particular technologies and sectors. The best known is the **Generative AI Profile, NIST AI 600-1**, published on 26 July 2024, which enumerates risks specific to generative systems and ties RMF actions to each. On 7 April 2026 NIST released a concept note for a profile on trustworthy AI in critical infrastructure.

And to be candid: **NIST's own page states that AI RMF 1.0 is being revised**, with no published target date ([source](https://www.nist.gov/itl/ai-risk-management-framework)). That is not a flaw but a natural maturation — it is simply something to know when planning. If you are writing internal policy that leans on a voluntary framework, write the version number into the policy.

<div class="callout"><strong>Tip:</strong> Even when the framework changes, the artefacts you produce do not. A subgroup performance table, an accuracy declaration with intervals, and a versioned risk register are useful regardless of which framework you filed them under. Anchor your documents to measurements, not to function names.</div>

## The legal ground underneath is shifting too

A voluntary framework in flux would be manageable on its own, but the state law beneath it also turned in 2026. The most striking case is Colorado: the state's AI act was **repealed and replaced by SB 26-189**, signed on 14 May 2026 and effective 1 January 2027. The replacement _drops_ the impact assessment requirement and leaves enforcement solely with the attorney general ([SB 26-189](https://leg.colorado.gov/bills/SB26-189)).

That is movement in the opposite direction: while Europe deepened its documentation duties, this US state moved from ex-ante assessment towards after-the-fact disclosure. For a product team subject to both regimes, the practical consequence is simple: **build to the strictest regime and the rest follows.** Colorado not requiring an impact assessment does not mean the EU does not.

> A team that builds its compliance strategy around the loosest regime starts over when the strictest one arrives. The reverse is not true.

For the current EU timeline see [the new timeline post](/en/posts/eu-ai-act-timeline-2026/), and for a comparison of the impact assessment regimes, [the impact assessment post](/en/posts/ai-impact-assessment-fria/).

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The AI RMF is voluntary, but most of the artefacts it asks for overlap with what the EU AI Act requires.</li><li>GOVERN has one honest test: when the system misbehaves, who can stop it and within what time?</li><li>MEASURE is the hard function, and in practice it amounts to applying measurement science to machine learning.</li><li>NIST's own page says AI RMF 1.0 is being revised — put a version number in any policy that cites it.</li><li>Colorado shows state law can loosen; always build compliance to the strictest regime you are subject to.</li></ul></div>

<div class="faq"><details><summary>Should I choose the NIST AI RMF or ISO/IEC 42001?</summary><p>They are not competitors but different layers. ISO/IEC 42001 establishes a certifiable management system; the AI RMF gives you a way to think about and measure risk, and cannot be certified. Many organisations use 42001 as the skeleton and the AI RMF as the measurement guide.</p></details><details><summary>I operate in the EU. What does a US framework give me?</summary><p>No direct legal effect, but the MEASURE function builds exactly the measurement discipline that the AI Act's Article 15 accuracy declaration and Article 9 risk management require. Its value is preparatory rather than legal.</p></details><details><summary>Can a small team apply the whole framework?</summary><p>Do not try. Start with one sentence from GOVERN (who can stop it), an assumptions list from MAP, and a subgroup performance table from MEASURE. Those three deliver most of the framework's benefit and take days rather than weeks.</p></details></div>

---

In short: the value of the NIST framework is not in naming four functions but in actually filling in MEASURE. Naming risks is easy; measuring them with intervals is hard. A team that does the hard part is ready whichever framework happens to be in force.
