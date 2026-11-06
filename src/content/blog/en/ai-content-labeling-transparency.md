---
title: "Labelling AI-Generated Content: Article 50, Machine-Readable Watermarks and C2PA"
description: "Article 50 transparency obligations took effect on 2 August 2026 and were not deferred. What machine-readable marking actually means, hard binding versus soft binding, C2PA content credentials, and why a watermark usually dies at the first re-encode."
publishDate: "2026-08-13T23:27:00+03:00"
lang: en
category: "Governance"
tags: ["Governance", "AI"]
translation: "yapay-zeka-icerik-etiketleme"
heroImage:
  src: "../../../assets/blog/covers/ai-content-labeling-transparency.jpg"
  alt: "Labelling AI-Generated Content: Article 50, Machine-Readable Watermarks and C2PA"
---

Labelling AI-generated content is no longer a matter of good intentions; it is an obligation that is already in force. Article 50 of the EU AI Act started applying on 2 August 2026 and was **not** deferred by the July 2026 amendment. Yet the technical half of the duty — what “machine-readable marking” actually means, how it is implemented, and why it so often fails — is explained almost nowhere. This post covers that half.

## What Article 50 actually requires

Article 50 is not one rule but a bundle of four duties, and they fall on different parties: some on the _provider_ who builds the system, some on the _deployer_ who uses it.

-   **Interaction notice (provider):** systems intended to interact directly with natural persons must be designed so that the person is informed they are interacting with an AI system — unless this is obvious from the circumstances and context of use.
-   **Marking of synthetic content (provider):** systems generating synthetic audio, image, video or text must mark the outputs in a _machine-readable_ format and make them detectable as artificially generated or manipulated.
-   **Emotion recognition and biometric categorisation (deployer):** the people exposed to the system must be informed of its operation.
-   **Deepfakes and text on matters of public interest (deployer):** deepfake content must be disclosed as artificially generated or manipulated. A comparable disclosure applies to text published to inform the public on matters of public interest, except where the content has undergone human review or editorial control and a natural or legal person holds editorial responsibility. For artistic, satirical, fictional and analogous works, the disclosure is made in an appropriate manner that does not hamper the display or enjoyment of the work.

<div class="callout"><strong>Tip:</strong> Settle early whether a duty falls on the provider or the deployer. A team consuming a generative model over an API assumes the provider marks the output; the provider assumes the publisher will disclose. If both assume, nobody does it.</div>

The full text is at [Article 50](https://artificialintelligenceact.eu/article/50/); the complete timeline and what was deferred is in [the new timeline post](/en/posts/eu-ai-act-timeline-2026/).

## The article that was not deferred: live since 2 August 2026

In July 2026, Regulation (EU) 2026/1744 pushed the high-risk deadlines back. The impression this created in public discussion — “the AI Act has been delayed” — is simply false as far as Article 50 is concerned. Article 50 was not amended and started applying on **2 August 2026**.

The only concession is narrow: for systems placed on the market _before_ 2 August 2026, the machine-readable marking duty applies from **2 December 2026**. That is a four-month technical window for existing products to add marking to their generation pipeline — not a deferral of transparency itself.

Alongside the hard obligation, a voluntary framework also took shape: the **Code of Practice on Transparency of AI-generated Content** was finalised on 10 June 2026, and roughly 190 organisations had signed by the end of July 2026. A code of practice creates no obligation of its own; it offers a shared reading of how the obligation can be met. Details on the [Commission's page](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content).

> A regulation the public was calling “delayed” had a chapter switching on that very week. There is no better argument against reading law from headlines.

## What &ldquo;machine-readable&rdquo; means: hard binding and soft binding

The whole obligation turns on one phrase: _machine-readable_. A caption reading “Generated with AI” does not satisfy it, because it disappears the moment someone screenshots, crops or re-encodes the file. There are two basic technical approaches, and neither is sufficient alone.

### Hard binding

The mark is embedded _inside_ the content itself: in pixel values, in the audio waveform, or in the token-selection distribution of generated text. Its advantage is that it survives a format change to some degree. Its disadvantage is an unavoidable trade-off between robustness and imperceptibility: the more durable you make the watermark, the more it degrades the content; the more invisible you make it, the more easily it is erased.

### Soft binding

The mark travels _alongside_ the content, as a signed metadata package attached to the file. Its advantage is far richer information — which model, what date, what edits were applied. Its disadvantage is fragility: most platforms strip metadata on upload, and a screenshot never carries it at all. Soft binding is therefore usually backed by a _fingerprint_: a perceptual digest of the content is stored in a registry so that a match can be looked up even after the metadata is gone.

<div class="callout"><strong>Tip:</strong> Do not rest on a single method. The design that works in practice is threefold: an embedded watermark (hard binding), a signed manifest (soft binding), and a fingerprint registry. When one is stripped, the others keep producing evidence.</div>

## C2PA: how content credentials work

On the soft-binding side the most mature technical framework is C2PA. It is a specification, currently at version 2.4 and [published openly](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html). The core idea is simple: carry the content's history inside a cryptographically signed manifest.

-   **Assertion:** a single statement about the content — “this image was produced by a generative model”, “this region was cropped”, “this audio segment was added”.
-   **Claim:** the assertions gathered and summarised together.
-   **Signature:** applied with the certificate of the party issuing the claim. Validation checks both signature validity and the trustworthiness of the chain.
-   **Manifest store:** as content is edited, new manifests are appended, producing a chain of edit history.

Two common misreadings are worth correcting. First: a C2PA manifest does not prove that content is _authentic_. It proves who asserted what, and when. A manifest is worth exactly as much as the party that signed it. Second: the absence of a manifest does not mean content is synthetic — the metadata may simply have been stripped. A verification interface must distinguish these two states; “no signature” and “invalid signature” must never render the same way.

```text
# The correct order in a labelling pipeline (pseudocode)
output = model.generate(prompt)
output = embed_watermark(output)           # 1) hard binding, at generation time
manifest = {
    "generator":  MODEL_NAME_VERSION,
    "timestamp":  utc_now(),
    "assertions": ["ai_generated", "no_edits"],
}
output = attach_manifest(output, sign(manifest))     # 2) soft binding
register_fingerprint(perceptual_hash(output), manifest)  # 3) fallback record
# The wrong order: publish first, mark later.
# A published copy can never be recalled.
```

## Why watermarks die: an honest list of limits

Most products sold in this space report laboratory detection rates as if they were real-world rates. In the real world, content passes through the following operations, and each of them erases part of the mark:

-   **Re-encoding:** social platforms recompress every image and video on upload. Lossy compression targets exactly the low-amplitude signal a watermark lives in.
-   **Cropping and rescaling:** a spatially localised mark is partly or wholly lost to a crop.
-   **Screenshots:** all metadata is gone; only the pixel-embedded signal remains, and resampling weakens that too.
-   **The special case of text:** text watermarks are placed in the token-selection distribution. A short passage has no statistical room to carry one, and paraphrasing the text with another model reliably removes it. Text is the most fragile of the four content types.
-   **Deliberate attack:** a party who knows the mark is there will try to remove it. Robustness claims must be tested under an adversarial assumption, not an average one.

> A watermark is a seal, not a lock. It will not stop a determined attacker; it makes provenance visible in ordinary circulation. That, in fact, is what the obligation is for.

This creates an asymmetry on the detection side: false negatives (marked content appearing unmarked) are very common, while false positives are rare but far more damaging — labelling a human's work as synthetic is a serious harm. Why threshold choice is a cost-benefit decision rather than a technical default is covered in [classification metrics](/en/posts/classification-metrics/), and the same logic applies here.

## An implementation checklist

For a team turning the obligation into a product plan, in order:

-   **Take an inventory.** Which product surfaces generate or publish synthetic content? Most teams realise late that a summarisation feature counts too.
-   **Establish your role.** For each surface, are you the provider or the deployer? The duty differs.
-   **Put marking inside the generation step**, not the publishing step. A published copy cannot be recalled.
-   **Design the notice.** An interaction disclosure is not a checkbox in the terms of service; it is an interface element visible when the conversation starts.
-   **Build the verification side too.** Test your own output through your own validator, and preserve the distinction between “no signature” and “invalid signature” in the interface.
-   **Document it.** Which method, in which scope, with which known limitations. That is a natural section of the [model card](/en/posts/model-cards-governance/).

One closing connection: generating synthetic training data and publishing synthetic content are different things, but they rest on the same discipline — knowing what you produced, with what, and how you marked it. The record-keeping habit in [synthetic data](/en/posts/synthetic-data-generation/) transfers directly here, and for the measurement side, the subgroup discipline in [bias and fairness](/en/posts/bias-and-fairness/) applies to detector performance as well.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Article 50 was not deferred: it has applied since 2 August 2026, with only pre-existing systems getting until 2 December 2026 to add marking.</li><li>Machine-readable marking cannot be satisfied by a caption a human can read; it must survive re-encoding.</li><li>Hard binding (embedded watermark) and soft binding (signed manifest) are not substitutes — use both, plus a fingerprint registry.</li><li>A C2PA manifest proves who asserted what, not that the content is authentic; an absent signature is not evidence of synthesis.</li><li>Text is the most fragile content type: short passages cannot carry a watermark, and paraphrasing reliably strips it.</li></ul></div>

<div class="faq"><details><summary>Is a visible “Made with AI” caption enough?</summary><p>No. A visible label supports the disclosure duty towards people, but it does not satisfy the machine-readable marking requirement — it disappears with a screenshot or a crop. Use a visible label and an embedded, machine-readable mark together.</p></details><details><summary>I use a model through a provider's API. Whose job is marking?</summary><p>Machine-readable marking of synthetic output is the provider's obligation; disclosing a deepfake at publication is the deployer's. In practice you may hold both. Write into the contract which party produces which mark, and verify it yourself on the output.</p></details><details><summary>If watermarks can be removed, why bother?</summary><p>Because the obligation aims to make provenance visible in ordinary circulation, not to defeat a determined attacker. The overwhelming majority of content passes through a routine share, not a deliberate removal attack. And having implemented marking is itself a documentable compliance effort.</p></details></div>

---

In short: content labelling is the most technical obligation in the whole text. It cannot be discharged with a warning line under an image; it is a design decision that reaches inside the generation pipeline. A team that does this now both meets a live obligation and becomes one of the few publishers who can prove where their content came from.
