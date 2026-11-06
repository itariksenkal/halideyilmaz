---
title: "Fairness Auditing in Practice: How to Actually Audit a Model — and Why Most Audits Are Theatre"
description: "The operational version of a fairness audit: what to do when you may not hold the protected attribute, how to choose a metric knowing the impossibility results, how large a subgroup must be before the estimate means anything, and how to write the report."
publishDate: "2026-08-13T23:23:00+03:00"
lang: en
category: "Ethics"
tags: ["Ethics", "AI"]
translation: "adalet-denetimi-pratikte"
heroImage:
  src: "../../../assets/blog/bimg-07.jpg"
  alt: "Fairness Auditing in Practice: How to Actually Audit a Model — and Why Most Audits Are Theatre"
---

Most writing about fairness auditing is either conceptual (“why do models discriminate?”) or a tool advertisement. The real gap is operational: what do you measure when you may not lawfully hold the protected attribute, which of the mutually contradictory metrics do you pick, how many examples does a subgroup need before the number means anything, and who is going to read the report? This post fills that gap — and explains why audits so often turn into theatre.

## Do mandated audits work? The best evidence we have

Mandating audits sounds sensible. What happens in practice? The most concrete answer available comes from New York City, whose rule on automated employment decision tools became enforceable on 5 July 2023, requiring employers to commission an annual independent bias audit and publish the results.

An analysis by Cornell researchers found, across roughly 400 employers, only **18 bias audits and 11 transparency notices** ([source](https://news.cornell.edu/media-relations/tip-sheets/new-analysis-finds-few-companies-following-nyc-ai-hiring-law)). The obligation exists; the compliance barely does.

> An audit obligation that does not identify who must be audited, and attaches no cost to not auditing, degrades into a voluntary reporting regime. And in voluntary regimes only the already-good report.

The regulatory direction is not one-way either. Colorado repealed its state AI act and replaced it: the successor statute, signed 14 May 2026 and effective 1 January 2027, drops the impact assessment requirement and leaves enforcement solely with the attorney general ([SB 26-189](https://leg.colorado.gov/bills/SB26-189)). The conclusion is simple: regulation will not make you audit. You audit because there is no other way to learn where your model breaks.

## The first obstacle: you may not hold the protected attribute

The most common well-founded refusal in this area is: “we do not hold ethnicity, religion or health data, so we cannot do subgroup analysis.” That sentence is made in good faith and is often legally correct — but it is not a complete answer.

Article 10 of the EU AI Act opens a narrow, tightly conditioned door to processing special categories of personal data _specifically for the purpose of bias detection and correction_. The conditions are strict and cumulative: that it cannot effectively be done otherwise, strict technical limitations and access controls, no transmission to third parties, deletion once the purpose is served, and documentation ([Article 10](https://artificialintelligenceact.eu/article/10/)).

### What you can do without the attribute

-   **Do not use a proxy variable — but do measure proxy _reliance_.** Inferring ethnicity from postcode is both legally and statistically a bad idea. Measuring how heavily the model leans on postcode is legitimate and informative.
-   **Voluntary, segregated collection.** Some organisations collect voluntary demographic data held apart from the product database and accessed only for audit.
-   **Aggregated external comparison.** Without individual labels you can compare regional outcome rates against aggregated official statistics; this infers nothing about an individual but makes systematic skew visible.
-   **Coverage gaps instead of performance gaps.** On which kinds of input does the model more often abstain or score near the threshold? That traces inequity without requiring a protected attribute at all.

<div class="callout"><strong>Tip:</strong> Keep audit data physically separate from the product database and log access to it. The justification “we collected this for fairness auditing” collapses the moment the field sits in the same table the marketing team queries.</div>

## Choosing a metric: you cannot satisfy them all

Fairness metrics contradict each other, and that is a mathematical result rather than an implementation failure. When base rates differ across groups and the model is not perfect, the common criteria cannot all hold simultaneously. The conceptual background is in [bias and fairness](/en/posts/bias-and-fairness/); here we focus on the selection rule.

-   **Demographic parity:** the rate of positive decisions should be equal across groups. Reasonable in allocation problems (scholarships, ad delivery); nonsensical in diagnosis.
-   **Equalised odds / equality of opportunity:** true positive rates (and where relevant false positive rates) should be equal. The right choice when error costs are asymmetric: in CV screening, a false negative means the candidate is never seen at all.
-   **Calibration parity:** the same score should mean the same true probability in every group. Indispensable when a human will interpret the score; details in [model calibration](/en/posts/model-calibration-probabilities/).

The selection rule fits in one sentence: **look at which error harms whom, and how much.** Choose the metric by the harm mechanism rather than by mathematical elegance, and write the choice down with its justification. An unwritten metric choice gets quietly revised when the result is unwelcome — which is precisely what turns an audit into theatre.

> The honesty of an audit is measured by when the metric was chosen. A metric chosen before you look at the results is a commitment; one chosen afterwards is a defence.

## Subgroup size: what you measured may be noise

The most common technical error in audit reports is treating differences in small subgroups as real. When accuracy comes out at 72 % in a subgroup of 40, the uncertainty around that number is wide enough that the gap to the overall average could easily be chance.

The practical discipline:

-   **Give a confidence interval for every subgroup.** An interval, not a point. For the method, see [confidence intervals and bootstrap](/en/posts/statistical-significance-model-comparison/).
-   **Account for multiple comparisons.** Examine twelve subgroups and you should expect at least one to look “significant” even when no real difference exists.
-   **Say so when the sample is too small.** “We do not have enough data to draw a conclusion for this subgroup” is a legitimate and honest finding, and it beats a fabricated number.
-   **Watch the rare class.** As a subgroup shrinks, its positive count shrinks faster and metrics become unstable; the mechanics are in [class imbalance](/en/posts/class-imbalance/).

```text
# Skeleton of an audit loop (pseudocode)
for group in protected_groups:
    n = len(test_set[group])
    if n < MIN_SAMPLES or positive_count(group) < MIN_POSITIVES:
        report(group, status="insufficient data")   # say it, do not invent
        continue
    metric   = chosen_criterion(model, test_set[group])
    interval = bootstrap_confidence_interval(metric, n_iter=2000)
    report(group, metric, interval, n)
# Compare on the DIFFERENCE between groups;
# eyeballing whether two separate intervals overlap is misleading.
```

## Why audits become theatre

No bad faith is required; the structure drifts there on its own. Four typical mechanisms:

-   **Scope narrowing.** The audit covers where the data is cleanest rather than where the model is used most dangerously. The scope decision must be made before the audit and independently of the audited party.
-   **Metric shopping.** The criterion is chosen after seeing the results. The antidote is to write and version the metric and threshold in advance.
-   **A snapshot.** The audit happens once while the model keeps changing. Degradation in production is caught by the [monitoring and drift](/en/posts/model-monitoring-drift/) discipline — and fairness metrics belong among the monitored metrics.
-   **A report nobody reads.** With no action attached to a finding, an audit is a document-production exercise. Give every finding an owner and a date.

<div class="callout"><strong>Tip:</strong> Attach the audit report to the <a href="/en/posts/model-cards-governance/">model card</a> and version it together. An audit report that lives separately becomes invalid at the next model release, and nobody notices.</div>

## An audit protocol

An ordered, repeatable and defensible protocol:

-   **1\. Write the scope.** Which model version, which decision, which population, which time window.
-   **2\. Name the harm mechanism.** Is it the false positive that harms, or the false negative? And whom?
-   **3\. Choose the metric and threshold in advance**, with a justification, before you look at results.
-   **4\. Define the groups and the minimum sample threshold.** List intersectional groups (age × gender, say) up front too; a group added afterwards is indistinguishable from searching.
-   **5\. Measure and report intervals.** Report the difference and the interval around the difference.
-   **6\. Look for the cause.** Does the gap come from under-representation, label noise, or feature choice? The [data-centric approach](/en/posts/data-centric-ai/) is the most productive tool here.
-   **7\. Assign action and owner.** Every finding needs a responsible person and a date.
-   **8\. Set the repeat date.** An audit is a rhythm, not an event.

One closing caution: improving a fairness metric and making a model fairer are not the same thing. You can fix a metric by tuning a per-group threshold; whether that is legally and ethically acceptable is a separate question, and one engineering cannot answer alone. Which is why the first item in the protocol is scope, the last is repetition, and everything in between is written justification.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>A mandated audit degrades into a voluntary regime when compliance is not tracked: New York's rule yielded 18 audits across roughly 400 employers.</li><li>AI Act Article 10 opens a narrow, tightly conditioned route to processing special-category data specifically for bias detection.</li><li>Fairness metrics are mathematically in conflict; choose by harm mechanism and write the choice down before seeing results.</li><li>In small subgroups you are usually measuring variance; give every group an interval and report insufficient samples honestly.</li><li>An audit is a rhythm, not an event: attach the report to the model card, version it, and give every finding an owner and a date.</li></ul></div>

<div class="faq"><details><summary>We do not hold protected attribute data. Can we still audit?</summary><p>Yes, but it will be a weaker audit. AI Act Article 10 permits processing special-category data strictly for bias detection under cumulative conditions. If you do not take that route, the second-best options remain: voluntary and segregated collection, comparison against aggregated external statistics, and coverage-gap analysis.</p></details><details><summary>Which fairness metric should I choose?</summary><p>Look at the harm mechanism. If you are allocating a resource, demographic parity is often right; if you are screening people out, equality of opportunity; if a human will interpret the score, calibration parity. You cannot have all of them. What matters is writing the choice and its justification before you see the results.</p></details><details><summary>Does the audit have to be done by an independent party?</summary><p>Not unless the law requires it — but the scope decision almost has to be independent of the audited team. The most common reason audits become theatre is not bad measurement; it is a scope drawn around the cleanest available data.</p></details></div>

---

In short: done properly, a fairness audit is not a compliance artefact but a bug-finding tool. It tells you where, for whom, and by how much the model breaks. A team that wants that information does not fear the audit; for a team that does not, the audit was theatre from the start.
