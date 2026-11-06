---
title: "The Context Window and Long Documents: Token Limits, Lost in the Middle, Long Context vs RAG"
description: "What is a context window? Token limits, the \"lost in the middle\" problem, long context vs RAG, and summarization chains (map-reduce, refine) explained with intuitive analogies."
publishDate: "2026-08-09T23:34:00+03:00"
lang: en
category: "Limits"
tags: ["Limits", "AI"]
translation: "baglam-penceresi"
heroImage:
  src: "../../../assets/blog/covers/context-window-long-documents.jpg"
  alt: "The Context Window and Long Documents: Token Limits, Lost in the Middle, Long Context vs RAG"
---

There's a limit to how much text you can feed a language model — and even when you stay under it, the model tends to overlook information stranded in the middle of the context far more easily than information at the edges. In this article we explore the context window with everyday analogies, examining the token limit, the "lost in the middle" problem, the choice between long context and RAG, and summarization chains.

## What is a context window?

When you talk to a language model, the model only "sees" the text handed to it at that moment: your system instructions, the prior messages, and the question you asked. The entire set of text the model can read and reason over in a single pass is called the **context window**. Its size is fixed and is measured in **tokens**.

Think of it like a person's desk. Only so many sheets of paper fit on it at once. To add a new document when the desk is full, you have to remove an old one. The context window works exactly this way: the model can hold as much text as its "short-term memory" allows at once; anything outside that limit becomes invisible.

> The model "knows" nothing outside its context window; it reasons only with whatever is inside that window.

An important distinction: the context window is not the general knowledge the model learned during training. Training knowledge is baked into the model's weights and is permanent. The context window, by contrast, is specific to the current conversation, temporary, and refilled from scratch on every request.

## The token limit and why it exists

A token is the smallest unit the model uses when processing text; it's roughly a fragment of a word. In English, an average word takes about 1.3 tokens; in languages with rich suffixes (like Turkish) that ratio is usually higher. The context window is measured in this token count, and both the input (prompt) and the output the model generates share this budget.

So why is there a limit? Because the attention mechanism in the Transformer architecture compares every token with every other token. If the number of tokens is _n_, the number of these comparisons grows roughly with _n²_. In other words, doubling the context makes the compute and memory cost roughly quadruple.

```text
Context = 1,000 tokens   -> ~1,000,000 pairwise relations
Context = 2,000 tokens   -> ~4,000,000 pairwise relations  (4x)
Context = 10,000 tokens  -> ~100,000,000 pairwise relations (100x)

# cost ~ n^2  =>  the bigger the context, the faster cost climbs
```

<div class="callout"><strong>Tip:</strong> Think of the token limit as a "budget." A very long system instruction shrinks the room the model has for the actual question and the documents. Keeping instructions short and clear is often more effective than enlarging the window.</div>

## The "lost in the middle" problem

Even when the window is large, the model is not guaranteed to pay equal attention to every token. Research has shown that models use information at the **beginning and the end** of a long context far more reliably than information in the **middle**. This tendency is known in the literature as the **"lost in the middle"** problem.

A familiar analogy: picture a long meeting. People usually remember what was said first and what was said last; the discussion in the middle slips onto the dusty shelves of memory. Watching a series, the first and last episodes stick more than the ones in between. Language models experience a similar "edge effect."

The practical consequence is clear: a critical sentence buried in the exact middle of a document can slip past the model even if it fits in the window. That's why placement matters when working with long contexts.

-   Put the most important instructions and information at the **beginning or the end** of the context.
-   Repeat the question right after the relevant documents — that is, **near the end**.
-   Avoid padding the window with irrelevant text; noise drowns the real signal.

> A large window does not mean the model will read everything you put in it with equal seriousness.

## Long context or RAG?

Say you're working with a collection of documents running into hundreds of pages. There are two basic paths. The first is to fit as much text as possible directly into a **long context** window. The second is to find only the pieces most relevant to the question and hand those to the model; this is called **RAG** (Retrieval-Augmented Generation).

The analogy: to answer a question, you either read the entire book cover to cover (long context), or you go to the index, jump to the relevant pages, and read only those (RAG). The second is almost always faster and cheaper; it also reduces the "lost in the middle" risk, because you give the model only focused, relevant pieces.

A rough comparison:

-   **Long context — Pros:** Simple to set up; can catch subtle links across documents; needs no extra infrastructure.
-   **Long context — Cons:** High cost and latency; lost-in-the-middle risk; the window limit can still be exceeded.
-   **RAG — Pros:** Scalable (millions of documents); cheap and fast; grounds the answer in sources; easy to work with fresh data.
-   **RAG — Cons:** Depends on retrieval quality; requires chunking and indexing infrastructure; if the wrong piece is fetched, the answer degrades too.

<div class="callout"><strong>Tip:</strong> The two approaches are not rivals but complements. A common pattern is to narrow down candidate pieces with RAG, then fit the remaining most relevant content into the long context. First concentrate the signal with RAG, then hand the context to the model.</div>

## Summarization chains

What if the document doesn't fit in the window at all? When you need to summarize a text too long to process in a single request, **summarization chains** come into play. The core idea is to split the text into pieces and merge the summaries step by step.

There are two classic patterns. The first is **map-reduce**: you summarize each piece separately (map), then combine those intermediate summaries into a single whole to produce the final summary (reduce). The second is **refine** (iterative refinement): you start with the summary of the first piece and, as you read each subsequent piece, update the summary as you go.

```python
# Map-Reduce summarization (pseudocode)
pieces = split_text(document, size=3000)

partial_summaries = []
for p in pieces:                       # MAP
    partial_summaries.append(summarize(p))

final_summary = summarize("\n".join(partial_summaries))   # REDUCE
return final_summary
```

Think of it like splitting a thick report among a team: each person summarizes their own section (map), then an editor gathers those summaries into a single executive summary (reduce). The refine pattern, instead, is like a single reader who revises and updates their notes with each new section.

-   **Map-reduce:** Fast because pieces can be processed in parallel; but links across pieces may weaken.
-   **Refine:** Preserves sequential flow and context better; but it's slow because it is sequential.

In both methods some information loss is inevitable; a summary is, by nature, a lossy compression. So when critical details must be preserved, combining summarization with RAG (pulling a detail absent from the summary straight from the source when needed) is a more robust approach.

## A practical decision guide

Which approach to choose depends on data size and the task. A simple intuition:

1.  **A few pages, single document:** Put it directly in the context window. The simplest and usually most accurate path.
2.  **Large but static collection, targeted questions:** Use RAG. It scales, it's cheap, and it grounds the answer in sources.
3.  **Grasping the whole of one long document (e.g., "summarize this report"):** Use a summarization chain.
4.  **Tasks that must be both broad and accurate:** Use RAG + long context together.

<div class="callout"><strong>Tip:</strong> Enlarging the window isn't the answer to every problem. First concentrate the signal: drop irrelevant text, place key information at the edges, repeat the question near the end. A smaller but cleaner context often outperforms a larger, noisier one.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The context window is the text the model can see at once; it's measured in tokens and has a fixed limit.</li><li>The limit exists because attention cost grows with the square of the token count (~n²); cost climbs faster as context grows.</li><li>"Lost in the middle": models use information at the start and end of a context better than information in the middle.</li><li>Place important information at the edges, repeat the question near the end, and strip out the noise.</li><li>For large collections, RAG is usually cheaper, faster, and more scalable than long context.</li><li>For text that won't fit the window, use summarization chains such as map-reduce or refine.</li></ul></div>

<div class="faq"><details><summary>As context windows grow, does RAG become unnecessary?</summary><p>No. Even with a larger window, two problems remain: cost/latency climb quickly with token count, and accuracy can drop on long context due to "lost in the middle." On top of that, no window can take in millions of documents at once. By selecting the relevant pieces, RAG delivers both cheapness and accuracy; so big windows don't make RAG obsolete — they complement it.</p></details><details><summary>Do input and output share the same token budget?</summary><p>In practice, essentially yes. The model has a total context limit, and the prompt plus the answer to be generated must fit within that limit together. If you give a very long input, less room is left for the model to produce a long answer. So when you expect long output, you need to keep the input tight.</p></details><details><summary>In a summarization chain, should I prefer map-reduce or refine?</summary><p>It depends on speed and contextual integrity. Map-reduce is fast because it processes pieces in parallel and scales well on large documents, but it can weaken the links between pieces. Refine preserves narrative flow and context better because it proceeds sequentially, but it's slow. For documents made of independent sections, map-reduce is usually better; for continuous flowing text, refine.</p></details></div>

---

In short, the context window is the most underestimated constraint when working with language models. The right strategy isn't to buy a bigger window; it's to concentrate the signal, place information wisely, and apply RAG and summarization where they fit. If you're curious how we put these approaches into practice in production systems, take a look at the AI architecture behind [HatsonTech](/en/posts/how-hatsontech-started/).
