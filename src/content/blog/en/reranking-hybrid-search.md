---
title: "Reranking and Hybrid Search: Combining BM25 with Semantic Search"
description: "An intuitive guide to hybrid search blending BM25 and semantic search, score fusion with RRF, and reranking with a cross-encoder, with short code examples."
publishDate: "2026-08-09T23:35:00+03:00"
lang: en
category: "Retrieval"
tags: ["Retrieval", "AI"]
translation: "reranking-hibrit-arama"
heroImage:
  src: "../../../assets/blog/covers/reranking-hybrid-search.jpg"
  alt: "Reranking and Hybrid Search: Combining BM25 with Semantic Search"
---

Imagine walking into a library and asking, "ways to find cheap flights." One clerk scans the shelves word by word and hands you books with "flight" in the title; another understands what you actually mean and offers a book on "travel budgeting." You get the best result by combining both, then carefully reviewing the pile they bring back. That, in essence, is hybrid search and reranking. In this article we'll build an intuitive picture of blending keyword and semantic search, and of lifting retrieval quality with a cross-encoder.

## Two searches, two strengths

Classic search splits into two big schools. **Keyword search** (the best known being BM25) looks at whether the exact words appear. It's fast, explainable, and nearly flawless for rare terms, product codes, names, or statute numbers. But it has one weakness: type "car" and it won't find a document that says "automobile." It knows the word, not the meaning.

**Semantic search**, on the other hand, turns text into a vector with an embedding model and retrieves documents that are close in meaning. It captures synonyms, alternative phrasings, even cross-language matches. In return, when you look for a rare code or an exact term, it can produce "roughly similar" but wrong results, because it may confuse that term with a neighbor in the meaning space.

> BM25 knows the word but not the meaning. Semantic search knows the meaning but can miss the word. Hybrid search is the art of letting each one cover the other's blind spots.

The conclusion is simple: these two methods aren't rivals, they're complements. Where one is weak, the other is strong. Combining them wisely is what we call **hybrid search**.

## Hybrid search: fusing the scores

The core of hybrid search is this: you send the same query to both BM25 and the semantic index, get two separate result lists, and merge those lists into a single ranking. There are two common ways to merge.

**Score fusion (weighted sum):** You add each document's BM25 score to its semantic score with some weight. But there's a trap here: the two scores live on different scales. A BM25 score can grow without bound, while cosine similarity typically sits between 0 and 1. So before adding, you must _normalize_ the scores into the same range.

**Rank fusion (RRF):** Reciprocal Rank Fusion never adds the scores at all; it looks at _what position_ a document holds in each list. If a document ranks high in both lists, its combined score rises. Because it sidesteps the scale problem entirely, it's a favorite in practice.

```python
# Reciprocal Rank Fusion (RRF)
def rrf(lists, k=60):
    scores = {}
    for lst in lists:                    # results from each search method
        for rank, doc_id in enumerate(lst):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)

bm25_hits     = bm25_search(query, top=50)    # keyword based
semantic_hits = vector_search(query, top=50)  # embedding based

hybrid = rrf([bm25_hits, semantic_hits])      # single, merged ranking
```

The `k` constant here (60 is a common default) softens the effect of documents that sit very high in a single list dominating the whole ranking. The beauty of RRF is that it merges more than two sources with the same logic: you can add new lists such as title search or tag search whenever you like.

<div class="callout"><strong>Tip:</strong> If you choose the score-sum method, always normalize BM25 and semantic scores into the same range (min-max, for instance). Add them without normalizing and the larger-scale score drowns out the smaller one, turning your "hybrid" back into a single method.</div>

## Reranking: fine-sifting with a cross-encoder

Hybrid search gives you a broad but still rough candidate list. This is where **reranking** comes in. Picture a hiring process: first you filter hundreds of CVs down to 50 with a quick screen (retrieval), then you run a careful interview with each of those 50 (reranking). Interviewing everyone would be too expensive, so you apply it only to the most promising candidates.

That "careful interview" is a **cross-encoder** model. The distinction is critical:

-   **Bi-encoder (embedding):** Turns the query and the document into vectors _separately_, then measures their similarity. Because document vectors can be precomputed and stored, it's very fast and suited to searching among millions of documents.
-   **Cross-encoder:** Feeds the query and the document into the model _together, at the same time_, and produces a relevance score directly. Reading them side by side makes it far more accurate, but it's slow because the model must run from scratch for every pair.

Applying a cross-encoder to the entire collection is impossible; but applying it to the 50 candidates hybrid search brought back is both cheap and visibly improves the ranking. The typical architecture is: scan broadly with fast methods, then re-rank a small number of candidates with the slow but accurate method.

> Retrieval is a fishing net: cast wide, catch a lot. Reranking is sorting by hand: slow, but it brings the right ones to the front. Using both together is how you capture speed and accuracy at once.

## An end-to-end flow

Putting the pieces together, a production-grade retrieval pipeline usually has three layers:

1.  **Broad retrieval:** Send the query to both BM25 and the semantic index, take the top 50 from each.
2.  **Fusion:** Merge the two lists into one with RRF or a normalized score sum. You now have a solid candidate pool.
3.  **Reranking:** Pass the top candidates from this pool (say the first 20-30) to the cross-encoder, and serve the best 5-10 results to the user or to an LLM (in a RAG scenario).

```text
# Three-layer retrieval pipeline
candidates = rrf([
    bm25_search(query, top=50),
    vector_search(query, top=50),
])[:30]                                   # merge, keep the top 30

pairs  = [(query, doc.text) for doc in candidates]
scores = cross_encoder.predict(pairs)     # relevance score per pair

ranked = [d for _, d in sorted(
    zip(scores, candidates), reverse=True)]
result = ranked[:5]                        # the 5 most accurate documents
```

This pipeline is the heart of a modern RAG system. The quality of the context sent to the LLM depends directly on the quality of these final 5 documents; garbage in, garbage out. Reranking is the layer that solves the "the right documents were in the list but buried near the bottom" problem.

## Practical tuning and measurement

Measuring the system matters as much as building it. A few practical notes:

-   **Candidate count (top-k):** Casting too wide a net in retrieval (say 100+) slows down reranking; casting too narrow (say 5) raises the risk of missing the right document from the start. Around 30-50 is a good starting point in most cases.
-   **Weights:** In term-heavy domains like legal text, code, or product catalogs it makes sense to raise BM25's weight; for chat and natural-language queries, favor the semantic side.
-   **Evaluation metrics:** Track ranking quality with numbers, not by gut feel. Common metrics: **MRR**, which rewards how high the correct document ranks, and **nDCG**, which measures the overall quality of the ordering. A small but real test set is worth more than opinion debates.

<div class="callout"><strong>Tip:</strong> Measure nDCG on the same test set before and after adding reranking. A cross-encoder adds latency; if the quality gain doesn't make a difference for the user, that latency may not be worth it. Make the decision with data.</div>

## Common mistakes

-   **Summing scores without normalizing:** Add BM25 and cosine scores from different scales directly and one will drown out the other.
-   **Trying to apply the cross-encoder to the whole collection:** It's impractical; the cross-encoder should only be applied to the small candidate list coming out of retrieval.
-   **Keeping retrieval too narrow:** If the right document never makes the top 50, reranking can't rescue it. Reranking can't create a result that isn't there; it only reorders what already exists.
-   **Moving without measurement:** "Intuitively better" isn't enough. Do a before-after comparison with metrics like MRR/nDCG.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>BM25 captures the word, semantic search captures the meaning; hybrid search lets each cover the other's weaknesses.</li><li>To merge two result lists, RRF (rank-based) is practical because it avoids the scale problem; when summing scores, normalization is a must.</li><li>A cross-encoder evaluates the query and document together; it's accurate but slow, so it's applied only to a small candidate list.</li><li>Typical pipeline: broad retrieval → fusion → reranking with a cross-encoder.</li><li>Measure quality with metrics like MRR and nDCG on a real test set.</li></ul></div>

<div class="faq"><details><summary>Isn't semantic search alone enough, why build hybrid?</summary><p>Semantic search captures synonyms but can stumble on rare terms, product codes, and proper names. BM25 is strong exactly at those exact matches. Hybrid search combines the two to give solid results across both query types.</p></details><details><summary>Is reranking always necessary?</summary><p>No. For small collections, or when retrieval is already very accurate, the latency a cross-encoder adds may not be worth the quality gain. Measure nDCG before and after, then decide; if the quality gain is clear, it's worth adding.</p></details><details><summary>Should I choose RRF or score summation?</summary><p>RRF is safer for merging scores on different scales and is easy to set up; most teams start here. If you can normalize your scores reliably and want to fine-tune weights, a weighted sum offers more control.</p></details></div>

---

Hybrid search and reranking are today's most robust answer to the problem of "putting the right document in the right place," and they directly determine the retrieval quality of modern RAG systems. For teams that want to get these layers right on their own data, [HatsonTech](/en/posts/how-hatsontech-started/), which builds AI solutions, focuses on search and knowledge systems that weigh meaning and the literal word together.
