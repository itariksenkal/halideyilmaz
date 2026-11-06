---
title: "Machine Unlearning: Can You Really Make a Model Forget Someone?"
description: "Making a model forget a person is nothing like deleting a row from a database. Exact versus approximate unlearning, relearning attacks that bring forgotten behaviour back, the proof problem, and the data architecture that actually works."
publishDate: "2026-08-13T23:08:00+03:00"
lang: en
category: "Privacy"
tags: ["Privacy", "AI"]
translation: "makine-unutma"
heroImage:
  src: "../../../assets/blog/bimg-02.jpg"
  alt: "Machine Unlearning: Can You Really Make a Model Forget Someone?"
---

A user writes in and asks you to delete their data. The database part is easy: you drop the row, flag the backups, done. But if a model trained on that person's data is in production, that model is still running and something of that person is inside its weights. Machine unlearning is the field trying to close exactly this gap. The honest answer up front: today's approximate methods are fragile, behaviour that was supposedly forgotten can be recovered, and the real fix lives in the data architecture rather than in the model.

## Getting the eggs back out of the cake

The old analogy is still the best one. Training is like mixing ingredients and baking a cake. When you are asked to delete a record, what you are actually being asked for is to take the eggs back out of the finished cake. The eggs are nowhere visible and everywhere present: in the texture, the rise, the colour.

The model is the same. When an example enters training it is not filed in a cell; it leaves a small influence spread through millions of parameters via gradients. The model-side translation of “delete that row” is undoing that distributed influence — and there is no easy way to do it.

Much of the confusion in this field comes from two distinct jobs being run together under one word. They are worth separating:

-   **Deleting a training record:** removing the influence of one person's data on the model. This is a privacy and legal problem, and its yardstick is reaching a model indistinguishable from one that never saw the record.
-   **Removing a model capability:** destroying the model's knowledge or behaviour in a given area. This is a safety problem and it is not tied to a single record; the same knowledge may have arrived through hundreds of sources.

The two problems have different success criteria, want different methods and fail in different ways. Because both get called “unlearning”, a solution built for one gets sold for the other.

> Deleting is an event; forgetting is a claim. The difference between them is the burden of proof.

## Exact unlearning: retraining, and how to make it cheaper

Exact unlearning has a simple definition: end up with a model as if the data in question had never been used. The only method that guarantees it is also the most expensive one known — **remove the data and retrain from scratch.** Reasonable for a small model, impossible to repeat per deletion request on a large one.

There is an architectural way to bound that cost: split the data into shards up front, train a separate submodel per shard, and aggregate the outputs. In the approach known as SISA, deleting a record means retraining only the shard that contained it; every other shard stands. If each shard is further sliced with intermediate checkpoints, retraining restarts from the slice containing the deleted record and the cost falls again.

It is not free. Each submodel sees less data, so you give up some accuracy relative to a single large model, and the ensemble raises inference cost. But the binding constraint is not technical, it is temporal: **this structure is built before training.** If your model is already in production you cannot retrofit sharding; you would have to retrain — which is the thing you were trying to avoid.

That is why machine unlearning is better treated as an architectural decision than as an emergency procedure. The answer you can give when a deletion request arrives was written months before it did.

## Approximate unlearning, and why it is fragile

Because retraining is expensive, the field moved towards cheaper alternatives. Approximate unlearning broadly means editing the model's weights in a targeted way.

### The common approaches

-   **Gradient-based edits:** apply an update in the reverse direction on the data to be forgotten — roughly, do the opposite of learning these examples.
-   **Influence-function approximations:** analytically estimate an example's contribution to the weights and subtract that estimate. The estimate is itself an approximation, and the error grows with model size.
-   **Fine-tuning on the retain set:** retrain on the data you are keeping so that the unwanted behaviour is painted over.

These methods usually look good on the metrics reported: ask the model about the content it was told to forget and it no longer answers. The question is how deep that goes. [The study “Unlearning Isn't Deletion”](https://arxiv.org/html/2505.16831v3) examines exactly this and finds unlearning to be largely _reversible_. The behaviour was not removed; it was suppressed.

What makes it more uncomfortable is how easy recovery can be: [relearning-attack work](https://arxiv.org/pdf/2502.05374) reports that fine-tuning on a small amount of _benign_ data can bring forgotten behaviour back. The attacker does not need access to the deleted data; ordinary text from the same domain can be enough.

The right mental model is painting over a stain. From a distance it is gone. To anyone who sands the surface a little, it is still there.

## The hard part: how do you prove a model forgot?

This is the most underrated question in the field. How do you show that a model has _forgotten_ something? “We asked and it refused” is not evidence; refusing to answer and not carrying the information are different states. The real criterion is stricter: the unlearned model should be indistinguishable from one never trained on that data.

Applying that criterion is hard in practice, because the reference model you would compare against usually does not exist — producing it means the retraining you were avoiding. So the field works with indirect tests: membership-inference probes, targeted query sets, behavioural probes.

There is good evidence for how fundamental the difficulty is: the report from the [NeurIPS machine unlearning competition](https://arxiv.org/abs/2406.09073), covering roughly 1,200 teams, concluded that _benchmarking unlearning is itself an open problem_. It is not only “how do we make a model forget” that is unresolved, but “how do we measure that it did”.

The benchmarks currently in use are TOFU, MUSE and WMDP. When adopting them, hold one thing in mind: each measures a particular definition of forgetting, not all of them at once. Scoring well on a benchmark does not mean your legal obligation has been met.

<div class="callout"><strong>Tip:</strong> Report unlearning on three separate axes: <em>forgetting success</em> (is the target behaviour gone), <em>utility loss</em> (how much did the model degrade on everything else) and <em>durability</em> (does a small fine-tune bring the behaviour back). A report that skips the third axis is blind to the most important failure mode.</div>

There is also a physical limit worth knowing. Measurements put memorization capacity at roughly [3.6 bits per parameter](https://arxiv.org/abs/2505.24832). Training data really is written into the weights, which is precisely why deletion is not free. We cover memorization separately in [is your model anonymous](/en/posts/is-your-model-anonymous-memorization/).

## The legal pressure: erasure rights and the anonymity presumption

None of this is academic curiosity; there is concrete legal pressure behind it. Article 17 of the GDPR sets out the right to erasure, requiring a controller to delete personal data on request. The question is whether a trained model counts as a copy of that personal data.

The European Data Protection Board's [Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en) of 18 December 2024 gave a clear direction: an AI model trained on personal data _cannot be presumed_ anonymous. Anonymity is something to be demonstrated rather than asserted, and the burden of demonstrating it sits with the model owner.

The Board continued that line into 2026: [Guidelines 02/2026 on Anonymisation](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en) were adopted on 7 July 2026 and opened for public consultation, which runs until 30 October 2026. How anonymisation should be assessed is still taking shape; the one settled point is that the presumption does not work.

In Turkey the equivalent route runs through the KVKK regime of _silme, yok etme ve anonim hâle getirme_ — deletion, destruction and anonymisation — so the personal-data obligation comes from the existing framework. There is no enacted AI statute to point at.

Translated into engineering, this is plain enough: you have to be able to evidence the answer you gave to a deletion request. Without a trace showing which record entered which training run, and when and how it was removed, your compliance claim is a sentence rather than a fact. The documentation discipline in [model cards and governance](/en/posts/model-cards-governance/) pays for itself here.

## What actually works: a deletion-capable data architecture

The practical conclusion from all of this is that solving forgetting at the model layer is, for most teams, fighting on the wrong front. The right front is the data pipeline. What you can do when a deletion request arrives was decided on the day you first collected the data.

### Four building blocks

-   **Shard by data subject:** keep training data in separable shards per person or tenant. Deletion then becomes the job of one shard rather than the whole corpus.
-   **A deletion-capable training-data index:** record which record went into which version, which shard and which training run. Without that index, the honest answer to a deletion request is “I do not know”.
-   **Dataset versioning:** every training run must bind to a dataset version whose contents are exactly determined. “Trained on roughly this data” is not a record.
-   **A retraining budget:** collect deletion requests in a queue and batch a retrain on a planned cadence. This turns the most expensive but only certain remedy into a predictable line item.

```text
# Deletion request flow (pseudocode)
request = receive_deletion_request(subject_id)
records = training_index.lookup(subject_id)   # without the index, stop here
delete_from_sources(records)                  # lake, backups, feature store first
enqueue(affected_shards(records))             # which shards need retraining
if queue_threshold_hit() or scheduled_window():  # batch, not per request
    retrain(queue)                            # then retire the old model version
write_evidence_record(request, records, model_version)
# Note: deletion is not complete until the affected model version is retired
```

### And the cheapest strategy: learn less in the first place

Never learning the data you will have to delete is always cheaper than deleting it. Filtering personal data before training, applying [privacy-preserving learning](/en/posts/privacy-preserving-learning/) techniques, or working with [synthetic data](/en/posts/synthetic-data-generation/) instead of real records in sensitive areas all shrink the amount of forgetting you will ever need. None of these is magic and each costs you something on the utility-privacy trade-off, but every one of them resolves part of the problem before it exists.

> A deletion-capable architecture does not make you fast at answering a deletion request. It makes you able to _know_ the answer. That is the actual win.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Deleting a training record and removing a model capability are different problems with different yardsticks and different failure modes.</li><li>The only guarantee of exact unlearning is retraining; SISA-style sharding bounds the cost but has to be designed in before training.</li><li>Approximate unlearning is largely reversible: fine-tuning on a small amount of benign data can bring the forgotten behaviour back.</li><li>Measuring forgetting is unsolved too; the NeurIPS competition report covering roughly 1,200 teams calls benchmarking itself an open problem.</li><li>The real fix is architectural: shard by data subject, keep a deletion-capable training index, version datasets, and budget for periodic retrains.</li></ul></div>

<div class="faq"><details><summary>Is approximate unlearning enough for legal compliance?</summary><p>On current evidence, be cautious. Approximate methods do suppress the target behaviour, but relearning attacks show it can return after fine-tuning on a small amount of benign data. EDPB Opinion 28/2024 also holds that a model trained on personal data cannot be presumed anonymous. Build your compliance claim on an evidenced deletion record and a retraining plan you can execute, rather than on the unlearning method alone.</p></details><details><summary>Do I have to retrain the model for every deletion request?</summary><p>Usually no, but you should not treat deletion as complete without a plan behind it. The common pattern is to queue requests, batch a retrain on a planned cadence, and retire the affected model version. If the data is held in shards, retraining only the affected shard may be sufficient.</p></details><details><summary>How do I measure that forgetting worked?</summary><p>Not with a single metric. Report three axes together: whether the target behaviour is gone, how much utility you lost on everything else, and whether a small fine-tune brings the behaviour back. TOFU, MUSE and WMDP give you a starting point, but each measures a particular definition of forgetting and none of them substitutes for yours.</p></details></div>

---

In short: machine unlearning is a real research field, but it is not the button it is currently sold as. Today's approximate methods suppress behaviour, the proof side is genuinely open, and the legal side will not let you presume a model is anonymous. In that picture the strongest engineering move is also the least exciting one: build a data pipeline that is sharded, versioned, and knows exactly what went where.
