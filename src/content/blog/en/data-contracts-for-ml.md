---
title: "Data Contracts for ML: Stopping the Schema Change That Silently Breaks Your Pipeline"
description: "A silent upstream change degrades a model without tripping a single data alert. What a data contract is, which sections ODCS defines, how to enforce one in CI, and why the tooling comparison every ranking page repeats is now out of date on ownership and licensing."
publishDate: "2026-08-13T23:20:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "veri-sozlesmeleri"
heroImage:
  src: "../../../assets/blog/covers/data-contracts-for-ml.jpg"
  alt: "Data Contracts for ML: Stopping the Schema Change That Silently Breaks Your Pipeline"
---

The most common reason a model degrades in production is not concept drift; it is an upstream team making an innocuous-looking change without telling you. A unit changes, a category is renamed, a null rate quietly climbs. No data alert fires, because technically nothing broke. The model breaks. A data contract exists precisely to turn that silent failure into a loud one.

## How silent breakage happens

The classic pipeline failure is loud: a column disappears, the job crashes, someone gets woken up. The dangerous one is the other kind — the pipeline keeps running, numbers keep appearing, dashboards stay green, and the model quietly degrades for weeks.

Typical scenarios:

-   **Unit change:** an amount field switches from cents to whole currency units. The schema is the same, the type is the same, the value range moves by two orders of magnitude.
-   **Category rename:** `"tr"` starts arriving as `"TR"`. The encoder treats it as an unseen category and silently falls back to a default.
-   **Null rate jump:** an upstream service starts timing out and the field arrives mostly empty. Imputation kicks in, and the model is now seeing the mean rather than a real signal.
-   **Backfill:** upstream corrects historical records. The training data now contains information that did not exist at prediction time — that is [leakage](/en/posts/data-leakage-cross-validation/).
-   **Semantic drift:** the field name stays the same and its definition changes. “Active user” goes from 30 days to 7. No technical check catches this; only a written definition does.

> The most expensive bug in a data pipeline is the one that does not raise an error. A crashed job gets fixed; a job that quietly computes the wrong thing gets noticed months later.

## What a data contract actually is

A data contract is a _machine-checkable_ agreement between the producer and the consumer of a data product. It is the data-side counterpart of an API contract: not just schema, but meaning, quality expectations, freshness and change management.

The open specification here is the **Open Data Contract Standard (ODCS)**, developed under the Bitol project within the Linux Foundation AI & Data. It defines eleven sections: Fundamentals, Schema, References, Data Quality, Support and Communication Channels, Pricing, Team, Roles, Service-Level Agreement, Infrastructures and Servers, and Custom and Other Properties ([documentation](https://bitol-io.github.io/open-data-contract-standard/latest/)).

An honest note is due here: the standard's latest release is **v3.1.0, dated 8 December 2024**; no release followed in 2025 or 2026 ([releases](https://github.com/bitol-io/open-data-contract-standard/releases)). So this is not a rapidly moving standard — it is a settled and currently quiet one. The movement is on the tooling side: **datacontract-cli 1.1.0 (4 August 2026) supports ODCS natively** ([package](https://pypi.org/project/datacontract-cli/)), which means contracts can now be enforced in continuous integration.

<div class="callout"><strong>Tip:</strong> It is tempting for the consumer to write the contract, but it does not work. The <em>producer</em> has to own it, because the producer is the one who makes the change. A contract written by the consumer is a wish list.</div>

## What to put in a contract for ML

General data engineering contracts stop at schema and freshness. An ML consumer needs a little more; the four headings below are missing from most templates.

### 1\. Distribution expectations, not just types

It is not enough that a field is a `float`; you need its expected range, a ceiling on its null rate, and for categorical fields the permitted value set. A model learns the distribution, not the type.

### 2\. Semantic definitions and change notification

One sentence of definition per field. And critically: a change to that definition must count as a break of the same severity as a schema change.

### 3\. Time semantics

Which moment does a record belong to — when the event happened, or when it landed? Are historical corrections applied, and how far back? Those two questions are the foundation of point-in-time correctness, covered in [training-serving skew](/en/posts/feature-stores-training-serving-skew/).

### 4\. The label itself

The target variable is a data product too, and it is almost never put under contract. How is the label produced, with what delay does it arrive, and has its definition changed? The [data quality and labelling](/en/posts/data-quality-labeling/) discipline should become a contract here.

```python
# Contract checks run at the ENTRANCE of the pipeline (pseudocode)
contract = load("contracts/customer_features.yaml")

for field in contract.fields:
    check(dtype(field))                        # type
    check(null_rate(field) <= field.max_null)  # completeness
    if field.categorical:
        check(set(values(field)) <= field.allowed_values)
    else:
        check(field.min <= values(field) <= field.max)
check(freshness(data) <= contract.sla.latency)

# Violation behaviour must DIFFER by violation type:
#   schema violation       -> stop the pipeline
#   distribution violation -> warn, block training, do not block serving
#   freshness violation    -> warn and continue on the last valid snapshot
# A team that stops on everything ends up muting the alerts.
```

## The tooling landscape was redrawn in 2026

Almost every page ranking for this topic runs the same comparison: “Great Expectations vs Soda vs dbt tests”. That comparison is now out of date on ownership and licensing.

-   **The Fivetran and dbt Labs merger completed on 1 June 2026** ([announcement](https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents)). The merged company commits to keeping dbt Core open and building on open standards such as SQL and Iceberg.
-   **The Great Expectations open-source repository now lives under Fivetran's GitHub organisation** (GX 1.20.0, 7 August 2026 — [package](https://pypi.org/project/great-expectations/)).
-   **soda-core 4.20.0 carries a proprietary licence** ([package](https://pypi.org/project/soda-core/)). Every page still recommending it as the open-source alternative is wrong on that point.
-   In the dbt ecosystem, dbt-core is at 1.12.2 (12 August 2026), with Elementary 0.25.1 as a dbt-native option.

<div class="callout"><strong>Tip:</strong> Verify licence and ownership yourself before choosing a tool — from the package page, not from a blog post. What changed in this space over a year was not capability but who owns what, and for a three-year dependency decision that matters more than capability.</div>

The tool choice itself is secondary. A contract's value comes not from which library checks it but from _where_ the check runs: at the entrance of the pipeline and in continuous integration. Not in a report that runs overnight.

## The regulatory link: a contract is documentation that tests itself

It is easy to treat a data contract as an engineering convenience. But Article 10 of the EU AI Act makes documentation of preparation operations — annotation, labelling, cleaning, updating, enrichment, aggregation — a governance duty for high-risk systems ([Article 10](https://artificialintelligenceact.eu/article/10/)).

A data contract encodes exactly that. And it does something better than a document: it verifies itself. A data definition in a text file drifts away from reality over time; a contract running in CI cannot drift, because the moment it does, it turns red.

> Documentation that does not test itself is correct on the day it is written and steadily less correct afterwards. That is the real advantage of a data contract.

The same logic connects directly to dataset documentation: a contract describes _flowing_ data, a datasheet describes a _frozen_ version. Together they produce almost automatically the data portion of the Annex IV documentation described in [datasheets for datasets](/en/posts/datasheets-for-datasets/).

## Where to start: one table

Teams that try to put an entire data platform under contract usually give up before producing a single one. The sequence that works is much narrower:

-   **1\. Pick the table that hurts most.** The one that caused an incident last year. A contract culture starts from a scar, not from theory.
-   **2\. Write what is true today, not what should be true.** Record today's null rate. A contract that starts from ideal values goes red on day one and gets switched off.
-   **3\. Make the producer the owner.** The contract should live in the producer's repository and run in the producer's CI.
-   **4\. Differentiate violation behaviour.** Schema violations stop; distribution violations warn. That distinction is the only thing preventing alert fatigue.
-   **5\. Put the label under contract too.** Most teams contract their features and not their target — yet the most expensive silent breakages happen on the label side.
-   **6\. Then expand.** Once one contract works, the second is much easier, because now there is an example.

One closing connection: a contract also fixes the input assumptions of the transformations in [feature engineering](/en/posts/feature-engineering/). If the raw fields your features rest on are uncontracted, even the most careful feature code is written on sand.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The most expensive data bug is the one that raises no error: the pipeline runs, dashboards stay green, the model quietly degrades.</li><li>ODCS defines eleven sections; its latest release is v3.1.0 from 8 December 2024, so the standard is settled rather than fast-moving.</li><li>The movement is in tooling: datacontract-cli 1.1.0 supports ODCS natively, so contracts can be enforced in CI.</li><li>Ownership and licensing were redrawn in 2026: dbt Labs merged with Fivetran, the GX repo moved under Fivetran's org, and soda-core is proprietary-licensed.</li><li>Differentiate violation behaviour by type — schema stops, distribution warns; a team that stops on everything mutes its alerts.</li></ul></div>

<div class="faq"><details><summary>Is a data contract the same as schema validation?</summary><p>No. Schema validation checks types and field presence. A data contract adds distribution expectations, semantic definitions, freshness commitments, ownership and change management on top. For ML, the breakages that matter happen in the distribution and the meaning, not the type.</p></details><details><summary>Who should write the contract — the data producer or the ML team?</summary><p>The producer should own it, because the producer makes the changes and the contract must run in their CI. The ML team defines and reviews the expectations. A contract written only by the consumer is a wish list that binds nobody.</p></details><details><summary>Should a contract violation always stop the pipeline?</summary><p>No — that is the fastest route to alert fatigue. Stopping on a schema violation is reasonable; on a distribution violation it is usually better to warn and block new training runs without cutting serving. On a freshness violation, continuing from the last valid snapshot is the least harmful behaviour in most products.</p></details></div>

---

In short: a data contract turns a verbal understanding between the data team and the ML team into something a machine can check. A team that starts with a single table converts most of its silent breakages into loud ones within a few months. A loud breakage is good news; a silent one misleads you for months.
