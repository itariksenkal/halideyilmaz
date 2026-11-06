---
title: "Knowledge Graph + RAG (GraphRAG): Retrieval That Captures Relationships"
description: "GraphRAG: retrieval that combines a knowledge graph with RAG. Connections between entities, multi-hop and global questions, and closing classic RAG's gaps, explained intuitively."
publishDate: "2026-08-09T23:32:00+03:00"
lang: en
category: "Advanced RAG"
tags: ["Advanced RAG", "AI"]
translation: "bilgi-grafigi-rag"
heroImage:
  src: "../../../assets/blog/covers/knowledge-graph-rag.jpg"
  alt: "Knowledge Graph + RAG (GraphRAG): Retrieval That Captures Relationships"
---

Classic RAG is good at finding the right paragraph — but it stumbles on relationship questions like "how are these two people connected?" GraphRAG, which combines a knowledge graph with RAG, closes exactly that gap: it retrieves not just similar text, but the connections between entities. In this article we explore GraphRAG intuitively, with everyday analogies.

## Where does classic RAG get stuck?

When answering a question, classic RAG splits documents into chunks, turns each chunk into a meaning vector, and retrieves the chunks most similar to the question. This approach works very well for questions that concentrate in one place, like "what does document X say about topic Y?"

But consider this question: "Which project did Ahmet and Zeynep work on together, and who funded it?" That answer may not sit in any single paragraph. Ahmet appears in one document, Zeynep in another, and the funding detail in a third. Vector similarity finds these pieces separately, but it cannot establish the **connection** between them.

> Classic RAG finds the most relevant pages in a library, but it can't hand you the map of how those pages connect to one another.

This produces two typical weaknesses. The first is **multi-hop questions**: the answer requires chaining a link across several facts. The second is **global questions**: queries like "what are the main themes of this collection of reports?" that demand looking at the whole corpus rather than a single chunk. Pure similarity search falls short in both cases.

## What is a knowledge graph?

A knowledge graph is a data structure that represents the world as **nodes** (entities: people, organizations, concepts, places) and **edges** (relationships: "worked on," "funded," "is part of"). Unlike plain text, it stores knowledge directly as _connections_.

Think of the difference between a family photo album and a family tree. In the album, each photo is a separate frame; to figure out who is whose cousin, you look at each one and infer. In the family tree, the relationships are already drawn as lines; you answer "the grandchild of the great-aunt" in a second by following the lines. A knowledge graph is the family tree of text.

A relationship is classically written as a three-part statement (a triple): (subject, predicate, object).

```text
(Ahmet)     --[worked_on]-->  (Atlas Project)
(Zeynep)    --[worked_on]-->  (Atlas Project)
(Vega Fund) --[funded]-->     (Atlas Project)

# Question: Who funded Ahmet and Zeynep's shared project?
# Path:     Ahmet -> Atlas Project <- Zeynep ; Atlas Project <- Vega Fund
# Answer:   Vega Fund
```

Notice: the answer is written in no single sentence. The graph _derives_ it by joining separate facts. That is exactly what classic RAG lacks.

## GraphRAG: combining the graph with retrieval

GraphRAG is a retrieval approach that pairs a language model with a knowledge graph. The term reached a wide audience through the open-source work Microsoft Research published in 2024, but the underlying idea — graph-based retrieval — is older. The core logic has three steps.

1.  **Build:** Entities and relationships are extracted from documents, and a graph is constructed.
2.  **Retrieve:** Nodes relevant to the question are found; then neighboring entities and relationships are gathered by traversing edges.
3.  **Generate:** Both the retrieved text chunks and the relationship information from the graph are given to the model as context; the model writes the answer grounded in them.

An important contribution of Microsoft's GraphRAG is the idea of **community summaries**. After the graph is built, tightly connected clusters of nodes (communities) are detected, and a summary is generated for each. When a global question arrives, such as "what are the main themes of this corpus?", the system can give a top-down answer by looking at these ready-made community summaries rather than individual chunks. This is precisely the kind of global question that classic RAG struggles with most.

<div class="callout"><strong>Tip:</strong> Think of GraphRAG not as a rival that replaces classic RAG, but as a layer that complements it. Many production systems use both together: vector search for relevance, and graph traversal for relationship and global questions.</div>

## How is the graph built?

The most common way to build the graph is to use the language model as an **extraction tool**. Each text chunk is handed to the model with the instruction: "extract the entities in this text and the relationships between them as triples."

```python
# Extract with an LLM for each document chunk
for chunk in document_chunks:
    result = llm.extract(chunk, schema="entity + relation")
    for (subject, relation, obj) in result.triples:
        graph.add_node(subject)
        graph.add_node(obj)
        graph.add_edge(subject, obj, label=relation)

# Merge different spellings of the same entity (entity resolution)
graph.merge("Vega Fund", "Vega Capital")   # -> single node
```

Two points are vital. First, **entity resolution**: if "Vega Fund," "Vega Capital," and "Vega" are the same organization, you must merge them into a single node; otherwise the graph fragments. Second, **schema discipline**: keep relationship labels ("funded," "worked\_on") consistent. If the same relationship has five different names, traversal becomes unreliable.

## How does retrieval work on a graph?

In the retrieval stage, the question is first connected to relevant entry nodes (usually via vector similarity). The system then starts from these nodes and walks **a few steps** along the edges, gathering neighboring entities and relationships. It gives this "local neighborhood" to the model as context.

Think of it like asking for directions in a city. Classic RAG tells you the three nearest shops. GraphRAG, by contrast, says "go down that street, turn right at the corner, cross the bridge" — that is, it gives you the _route_, not just the points. This is what works for multi-hop questions: the answer is hidden in the path itself that links the nodes.

-   **Local retrieval:** Traverses the neighborhood around specific entities; for pointed questions like "how are X and Y connected?"
-   **Global retrieval:** Looks at community summaries; for broad questions like "what are the main themes?"

## When to use it, and when not to

GraphRAG isn't free. Building the graph requires a language-model call for each chunk, making it markedly more expensive and slower than classic RAG. Keeping the graph current (as documents change) adds a separate maintenance burden. So make the choice based on need.

GraphRAG shines in domains where relationships between entities are dense and what's asked is mostly "who is connected to what, and how": research corpora, investigation files, enterprise knowledge bases, legal and medical texts. By contrast, where questions can be answered from a single document and relationships are sparse, classic RAG is both sufficient and cheaper.

<div class="callout"><strong>Tip:</strong> Start with classic RAG and set up an evaluation set. When you measure accuracy dropping on multi-hop or global questions, add the GraphRAG layer. Taking on complexity only when you see a measured gain is the most robust path.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Classic RAG finds similar text but cannot establish connections between entities; it stumbles on multi-hop and global questions.</li><li>A knowledge graph stores the world as nodes (entities) and edges (relationships); the answer is derived by joining separate facts.</li><li>GraphRAG has three steps: building the graph, graph-based retrieval, and context-grounded generation.</li><li>Community summaries give top-down answers to global questions like "what are the main themes?"</li><li>Entity resolution and a consistent relationship schema determine the graph's reliability.</li><li>Building a graph is expensive and slow; if relationship density is low, classic RAG is enough.</li></ul></div>

<div class="faq"><details><summary>Does GraphRAG replace classic RAG?</summary><p>Usually no. The two are good at different questions: vector search excels at relevance-based retrieval, while the graph is strong on relationship and global questions. Most mature systems use both together; GraphRAG is a complementary layer, not a rival.</p></details><details><summary>Do I have to build the graph by hand?</summary><p>No. In practice the graph is built automatically by using the language model as an extraction tool: entities and relationships are pulled from each text chunk as triples. The hand-done part is defining the schema and reviewing the entity-resolution rules.</p></details><details><summary>Is GraphRAG worth it for a small project?</summary><p>Mostly no. Building a graph adds cost and a maintenance burden. If your questions can be answered from a single document and there are few relationships between entities, classic RAG is both cheaper and sufficient. Move to GraphRAG when you measure a loss on multi-hop or global questions.</p></details></div>

---

In short, GraphRAG gives RAG the ability to "see connections": it doesn't just find similar text, it also retrieves the relationships between entities and closes the classic approach's gaps on multi-hop and global questions.
