---
title: "High-Risk AI Systems: What an ML Team Actually Has to Build Before December 2027"
description: "The Article 9-15 obligations for high-risk AI systems, translated from legal language into engineering deliverables: a risk register, data governance, Annex IV technical documentation, event logging, an accuracy declaration and a human oversight design."
publishDate: "2026-08-13T23:28:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "yuksek-riskli-yapay-zeka-gereklilikleri"
heroImage:
  src: "../../../assets/blog/covers/high-risk-ai-system-requirements.jpg"
  alt: "High-Risk AI Systems: What an ML Team Actually Has to Build Before December 2027"
---

Obligations for high-risk AI systems moved to 2 December 2027 under Regulation (EU) 2026/1744. That is not a missed deadline; it is an open build window. Yet almost all the coverage still explains risk _categories_ and stops there — nobody says which file, which table or which log line each obligation corresponds to. This post does exactly that: it translates Articles 9 to 15 into deliverables an ML team can actually produce.

## Scope first: is your system really high-risk?

Getting this answer wrong is expensive in both directions. Classify yourself high-risk unnecessarily and you spend a year producing documentation you never needed. Classify yourself out of scope wrongly and you are pulling a product off the market on 2 December 2027.

The Regulation defines two routes. The first is **Annex I**: your system is a safety component of an already-regulated product, or is itself such a product — a medical device, a lift, machinery, a toy, aviation equipment. That route's date is **2 August 2028**. The second is **Annex III**: your system is used in one of the listed areas — biometrics, critical infrastructure, education and vocational training, employment and worker management, access to essential private and public services, law enforcement, migration and border control, and administration of justice and democratic processes. That route's date is **2 December 2027**.

<div class="callout"><strong>Tip:</strong> Keep the scope decision in a versioned document, not in a meeting note. “Why did we conclude this is not high-risk?” is not something to be recalled in two years' time; it is a reasoned statement to be written today. And it is already the first page of your technical documentation.</div>

The full timeline and what changed in July 2026 is covered in [the new timeline post](/en/posts/eu-ai-act-timeline-2026/); here we go straight into the obligations.

## Article 9: risk management is a register, not a PDF

Article 9 requires a risk management system that is planned, iterative and maintained across the entire lifecycle of the system. The load-bearing word is **maintained**. A one-off assessment does not, by definition, satisfy it.

The engineering equivalent is not far from an issue tracker: each risk has an owner, an estimate of likelihood and impact, the mitigation applied, the residual risk after mitigation, and a record of which model version, which data and which measurement that judgement rested on. The register should advance with the model version — when a new model ships, every entry should automatically fall into a “needs review” state.

-   **Foreseeable misuse:** you must record not only the intended purpose but reasonably foreseeable misuse. Most teams skip this line.
-   **Residual risk:** risks that cannot be eliminated must be communicated in the instructions for use.
-   **Testing:** risk management must be supported by testing against defined metrics — measurement is the evidence behind the register.

> The risk register is the only document in which a team writes down, in its own words, where the model does not work. That is exactly why it is the valuable one.

## Article 10: data governance is what the law calls data quality

Article 10 is the article closest to an ML team's daily work. It requires training, validation and test sets to be _sufficiently representative in view of the intended purpose_ and, _to the best extent possible, free of errors and complete_. That wording matters: it does not demand perfection, it demands a purpose-relative and demonstrable effort.

The article then lists eight governance practices: design choices; data collection processes and the origin of the data; preparation operations such as annotation, labelling, cleaning, updating, enrichment and aggregation; the formulation of assumptions; assessment of the availability, quantity and suitability of data; examination for possible biases; measures taken against those biases; and identification of data gaps.

### What does that translate into?

-   **A dataset record:** for every dataset, where it came from, under what permission it was collected, and which version trained which model. [Datasheets for datasets](/en/posts/datasheets-for-datasets/) gives you the template.
-   **A log of preparation operations:** cleaning rules may live in code, but the code does not tell you when a rule was introduced. That needs a version note.
-   **A bias examination:** performance broken down by subgroup. How to do that is covered in [bias and fairness](/en/posts/bias-and-fairness/).
-   **A gap analysis:** which situations, languages, devices or geographies are not represented in your data?

<div class="callout"><strong>Tip:</strong> Article 10 opens a narrow, tightly conditioned door to processing special-category personal data specifically for bias detection. The familiar defence — “we cannot audit for ethnicity because we do not collect it” — weakens once teams know that door exists. Do not walk through it without meeting every condition; see <a href="/en/posts/fairness-auditing-in-practice/">fairness auditing in practice</a>.</div>

## Articles 11-12: technical documentation and automatic logging

Article 11 and Annex IV set out what the technical documentation must contain: a general description of the system; a detailed description of its elements and its development process; information on monitoring, functioning and control; the risk management system; changes made across the lifecycle; a list of applied standards; a copy of the declaration of conformity; and the post-market monitoring plan. A simplified form is available for small and micro enterprises, and the Omnibus extended that simplification to medium-sized enterprises.

Article 12 requires automatic logging: the system must be capable of recording events over its lifetime. Do not wave this away with “we already have logs”. What is required is a record that lets you reconstruct a decision afterwards: which model version, which input digest, which output, which threshold, which human intervention.

```text
# Minimum contents of a decision record (pseudocode)
record = {
  "decision_id":     uuid(),
  "timestamp":       utc_now(),
  "model_version":   MODEL_VERSION,      # traceable back to a training run
  "dataset_version": DATASET_VERSION,
  "input_digest":    hash(input),        # a digest, not raw personal data
  "output":          score,
  "threshold":       ACTIVE_THRESHOLD,   # a threshold change is an event too
  "human_action":    operator_decision,  # none / confirm / override
  "explanation":     feature_attributions  # where available
}
# Rule: if you cannot walk back from a model version to its training data,
#       your log will not support an incident report.
```

Why that record matters so much is the subject of [incident reporting and post-market monitoring](/en/posts/ai-incident-reporting-post-market/): a 15-day reporting clock becomes a 15-day archaeology project if the log is not there.

## Articles 13-15: transparency, human oversight and declared accuracy

**Article 13** requires the information a deployer needs to interpret the system correctly: intended purpose, levels of accuracy, known limitations, required maintenance. That is an instructions-for-use document, and in practice it is the institutional version of a model card.

**Article 14** requires human oversight to be _designed_. The subtlety is that “a human makes the final call” is not oversight on its own. Automation bias is real: a score displayed confidently on screen pushes a human reviewer towards agreement. An oversight design has to create the conditions in which a person could genuinely decide differently — they must be able to see the basis of the decision, tell low-confidence cases apart, and override easily and on the record.

**Article 15** is the most overlooked provision here: providers must _declare the levels of accuracy and the relevant accuracy metrics_ in the instructions for use. The same article requires robustness, cybersecurity, and safeguards against feedback loops, and it names the threats explicitly — data poisoning, model poisoning, adversarial examples and confidentiality attacks.

> A single declared accuracy number with no interval is no longer just weak science. It is a compliance artefact, and being wrong now has a different consequence.

Which is why measurement discipline stopped being optional. Which metric is right when is covered in [classification metrics](/en/posts/classification-metrics/); whether a difference is real at all in [confidence intervals and bootstrap](/en/posts/statistical-significance-model-comparison/); and what a probability actually means in [model calibration](/en/posts/model-calibration-probabilities/).

## Conformity assessment and the standards that are not ready

Once the documents exist, conformity assessment follows: the provider assesses that the system meets the requirements, draws up a declaration of conformity, affixes the CE marking and registers the system in the EU database. For most Annex III areas that assessment can be carried out by the provider itself; in defined cases a notified body is involved.

Here we should be candid: the **harmonised standards that assessment is meant to rest on are not ready**. Of the roughly nine deliverables from CEN-CENELEC's JTC 21 committee, none had been cited in the Official Journal at the time of writing, and the Commission formally recorded significant delays in the standardisation work during 2025. That is part of the real reason the deadline moved.

<div class="callout"><strong>Tip:</strong> The absence of a standard is not a reason to wait. A harmonised standard grants a <em>presumption</em> of conformity; without one, you have to demonstrate that you met the requirements by other means. That is more documentation, not less.</div>

For teams who believe an ISO/IEC 42001 certificate fills that gap, an important warning: it is not a harmonised standard and it confers no presumption of conformity under the AI Act. We explain why in [the ISO/IEC 42001 post](/en/posts/iso-42001-ai-management-system/).

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Annex III systems are due on 2 December 2027 and Annex I on 2 August 2028 — an open build window, not a missed deadline.</li><li>Article 9 wants a maintained risk register; a single point-in-time assessment cannot satisfy it by definition.</li><li>Article 10 turns data quality from an engineering virtue into a documentable obligation with eight named practices.</li><li>The Article 12 log is the infrastructure behind incident reporting: you must be able to walk back from a model version to its training data.</li><li>Article 15 requires a declared accuracy figure — which makes a point estimate with no interval a weak compliance artefact.</li></ul></div>

<div class="faq"><details><summary>My system is in an Annex III area but performs only a narrow supporting function. Is it still high-risk?</summary><p>The Regulation provides an exemption for systems that do not materially influence the outcome of decision-making — for instance where the system performs a narrow procedural task or merely prepares a human assessment. But a provider relying on that exemption is expected to document the assessment and still register the system. Quietly treating yourself as out of scope is not one of the options.</p></details><details><summary>If I certify to ISO/IEC 42001, am I compliant?</summary><p>No. ISO/IEC 42001 is a management-system standard and it builds a sound governance skeleton, but it has not been cited in the Official Journal as a harmonised standard, so it confers no presumption of conformity under the AI Act. The two complement each other; neither substitutes for the other.</p></details><details><summary>Could we not just produce all the documentation in 2027?</summary><p>Some of it, yes. The most important part, no. Records of how data was collected, which preparation operations ran, and which dataset trained which model cannot be produced retroactively. Writing in 2027 a record you did not keep in 2026 is not documentation; it is recollection.</p></details></div>

---

In short: most of what the high-risk regime asks for is what a good ML team should already be doing, written down. The change is that the writing is now a deliverable. The team that spends the next sixteen months building a system that keeps records — rather than stacking documents — is the team that will not be scrambling on 2 December 2027.
