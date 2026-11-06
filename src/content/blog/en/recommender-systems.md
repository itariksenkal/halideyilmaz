---
title: "Recommender Systems: Collaborative Filtering, Content-Based Methods and Cold Start"
description: "Recommenders rest on two ideas: similar users and similar items. Collaborative filtering, content-based methods, hybrids, the cold-start problem and the diversity trade-off."
publishDate: "2026-08-09T23:52:00+03:00"
lang: en
category: "Methods"
tags: ["Methods", "AI"]
translation: "oneri-sistemleri"
heroImage:
  src: "../../../assets/blog/bimg-08.jpg"
  alt: "Recommender Systems: Collaborative Filtering, Content-Based Methods and Cold Start"
---

A recommender answers one simple question at scale: _what will this person be interested in next?_ The answer has two classical sources — other users who behave similarly, and other items that share features. Modern systems combine both.

## Collaborative filtering

The intuition: things liked by people who liked what you liked, and which you have not seen yet, probably suit you too. To do this you build a user-item interaction matrix and factorise that sparse matrix into two low-dimensional ones. Every user and every item becomes a vector; the prediction is their dot product.

Its strength is working without knowing anything about the content. Its weakness is having nothing to say about new users and new items.

## Content-based methods

Here the items' own attributes are used: text, category, tags, imagery. You build a feature profile from what the user engaged with and recommend items with similar profiles. [Embedding models](/en/posts/embedding-models-semantic-similarity/) are today's standard way to measure that similarity.

This works well for new items but tends to trap users inside their own history — the filter bubble originates precisely here.

<div class="callout"><strong>In practice:</strong> large systems are two-stage. Millions of candidates are cut quickly to a few hundred (candidate generation), then an expensive model ranks that small set (reranking). This split is the key to holding a latency budget.</div>

## Hybrids and the two-stage architecture

| Approach | New user | New item | Serendipity |
| --- | --- | --- | --- |
| Collaborative | Weak | Weak | High |
| Content-based | Weak | Strong | Low |
| Hybrid | Good | Good | Balanced |

## Cold start

What should the system recommend to a user it knows nothing about? The practical answers are simple and effective: start with popular content, ask for a few preferences at sign-up, use contextual signals such as device and locale, and weight the first session towards exploration so the system learns quickly.

## Accuracy is not enough: diversity

A system that maximises click probability alone looks good briefly and then narrows: it shows the same kind of content repeatedly, the user tires, and discovery stops. Production systems therefore track three further criteria alongside accuracy — diversity, novelty and coverage.

There is also a _feedback loop_ risk: whatever the system shows generates the data, and that data pushes the system further in the same direction. Breaking the loop requires deliberate exploration.

## Frequently asked questions

<div class="faq"><details><summary>Are offline metrics enough?</summary><p>No. Offline ranking metrics give direction, but the real decision comes from an A/B test. Plenty of changes that look good offline lose in production.</p></details><details><summary>Implicit feedback or explicit ratings?</summary><p>Implicit signals such as clicks and dwell time are far more plentiful and more useful in practice. But "clicked" is not "liked", and the model should reflect that.</p></details><details><summary>What are the privacy considerations?</summary><p>Behavioural data is personal. Purpose limitation, retention limits and user visibility are essential; explainable recommendations build trust here.</p></details></div>

---

A good recommender is not the one with the highest accuracy but the one that broadens the user over time. For more, see [reranking and hybrid search](/en/posts/reranking-hybrid-search/) and [embedding models](/en/posts/embedding-models-semantic-similarity/).
