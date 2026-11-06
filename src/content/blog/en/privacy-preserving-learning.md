---
title: "Privacy-Preserving Learning: Federated Learning and Differential Privacy"
description: "You can train a model without centralising the data. Federated learning, differential privacy, the privacy budget, and what these methods actually guarantee."
publishDate: "2026-08-09T23:51:00+03:00"
lang: en
category: "Privacy"
tags: ["Privacy", "AI"]
translation: "gizlilik-korumali-ogrenme"
heroImage:
  src: "../../../assets/blog/bimg-09.jpg"
  alt: "Privacy-Preserving Learning: Federated Learning and Differential Privacy"
---

The classical assumption in machine learning is that you can gather all the data in one place. In healthcare, finance and law that assumption often fails. **Privacy-preserving learning** offers ways to learn without moving the data or exposing the individual.

## Federated learning

The idea is an inversion: instead of bringing the data to the model, bring the model to the data. A central server distributes the model to devices or institutions; each party trains locally on its own data and sends back only model updates. The server aggregates those updates and publishes a new version.

Raw data never leaves. That is a considerable relief both practically and from a regulatory standpoint.

## Gradients leak too

A common misconception is that "if the raw data stays put, privacy is solved". In fact model updates can carry a surprising amount of information about the training data; under certain conditions examples can be reconstructed. Federated learning alone is therefore not a privacy guarantee.

<div class="callout"><strong>The right reading:</strong> federated learning <em>keeps data in place</em>; differential privacy <em>hides an individual's contribution</em>. They solve different problems and are usually combined.</div>

## Differential privacy

Differential privacy is a mathematical definition: adding or removing one person's data from the dataset must not noticeably change the distribution of the output. In practice this is achieved by adding carefully calibrated noise to the computation.

Its strength is a guarantee that holds regardless of what an attacker already knows. Its cost is accuracy: more noise means more privacy and less utility.

## The privacy budget

That trade-off is governed by a parameter called epsilon. A small epsilon means strong privacy and lower accuracy; a large one means the reverse. The critical point is that the budget _accumulates_: every query against the same data spends from it. Unlimited queries reduce privacy to nothing.

## Which method, when

| Method | What it solves | What it costs |
| --- | --- | --- |
| Federated learning | Data is never centralised | Communication and coordination |
| Differential privacy | The individual is not exposed | Loss of accuracy |
| Anonymisation | Direct identifiers removed | Re-identification risk |
| Synthetic data | A shareable copy | Memorisation and leakage risk |

## Frequently asked questions

<div class="faq"><details><summary>Is anonymisation not enough?</summary><p>Usually not. A combination of a few apparently harmless fields can re-identify a person. This weakness has been demonstrated repeatedly.</p></details><details><summary>Is federated learning always slower?</summary><p>Generally yes; communication cost and uneven data across devices make convergence harder. In exchange it removes the legal cost of moving the data.</p></details><details><summary>Do these methods deliver regulatory compliance?</summary><p>No technical method delivers compliance on its own. A lawful basis, purpose limitation and transparency are still required; these methods support those obligations rather than replacing them.</p></details></div>

---

Privacy is not a feature bolted on later but an architectural constraint. Considered early it is cheap; retrofitted it is very expensive. For more, see [synthetic data generation](/en/posts/synthetic-data-generation/).
