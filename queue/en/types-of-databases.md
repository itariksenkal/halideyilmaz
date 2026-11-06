---
title: "Types of Databases: From Relational to Vector, and When to Use Each"
description: "Relational, document, key-value, columnar, graph, time-series and vector databases: what each is for, a comparison table and practical questions for choosing."
publishDate: "2026-11-19T09:17:00+03:00"
lang: en
category: "Data"
tags: ["Databases", "Data Architecture", "SQL"]
translation: "veritabani-turleri"
heroImage:
  src: "../../../assets/blog/covers/types-of-databases.jpg"
  alt: "Schematic of different data models shown as tables, documents, graphs and vectors"
---

One of the first technical questions on a new project is usually "which database should we use?" Not long ago the answer was almost always the same: a relational database. Today there are many options, including document, key-value, graph and time-series databases, plus the vector databases that have become prominent with AI applications. Each has a use case where it shines and a cost when it is used in the wrong place. In this post I want to introduce these types in plain language, gather them into a comparison table and share the questions I find useful when choosing.

## Why isn't there just one kind of database?

Databases are designed around different assumptions about how data is stored and queried. A bank transfer requires every step to be complete and consistent. A website's session data must be read in milliseconds, but losing it is not a disaster. "Friends of my friends" on a social network is a question about relationships rather than tables. And a monthly sales report over millions of rows calls for yet another way of reading data.

In short, choosing a database is not about "which is best?" but "what does my data look like, and which questions will I ask it most often?"

## Relational databases: the default starting point

Relational databases store data in tables. As the PostgreSQL documentation puts it, each table is a named collection of rows, every row has the same set of named columns, and each column has a specific data type. Relationships between tables are expressed through keys, and data is queried with SQL. PostgreSQL, MySQL, SQL Server and Oracle are well-known examples.

Their biggest strength is reliable transactions: an operation either completes in full or not at all. The schema also protects data quality from the start; the database itself can enforce that a column may not be empty, or that every order must belong to an existing customer.

A lightweight member of this family is SQLite, which runs not as a server but as a single file embedded in the application. As its own documentation notes, it is a strong fit when the data lives on the same device as the application and there are not many simultaneous writers.

## Document and key-value databases

These are the two most common kinds of systems grouped under the "NoSQL" label.

**Document databases** store data as JSON-like documents. In MongoDB's documentation, a document is a structure made of field and value pairs, and values can include other documents, arrays and arrays of documents. A customer's address and interests can sit nested inside the same record. That flexibility is useful for data whose structure changes often or differs from record to record. The cost is that schema control shifts to the application, and complex queries that combine many collections become harder.

**Key-value stores** are the simplest model: each value is accessed through a unique key. In-memory systems such as Redis are often used for caches, session data, counters and queues, where reads and writes must be very fast. In return, flexible queries such as "all products priced above 100" are not this model's natural strength.

## Columnar stores and data warehouses for analytics

Transactional databases typically store data row by row, which is ideal for reading and updating a single record quickly. Analytical queries, by contrast, often read only a few columns across millions of rows: "total revenue by city over the past year". Columnar storage keeps each column separately and compressed, so such queries read only the columns they need and run far more efficiently.

Cloud data warehouses and analytical databases such as ClickHouse use this approach. A useful rule of thumb: a transactional database for the application's day-to-day operations, and a columnar system for reporting and analysis. Forcing both onto one system usually means compromising on both.

<div class="callout"><strong>Tip:</strong> Running heavy analytical queries on your application's live database can slow things down for users. Once the analytical load grows, copying data to a separate system for analysis is a common and healthy practice.</div>

## Special-purpose databases: graph, time-series and vector

**Graph databases** store data as nodes, relationships and properties. In Neo4j's description, relationships are named, directed connections between two nodes and can carry their own properties. They are strong for uncovering fraud rings, recommendation systems and multi-hop questions such as "how many steps separate these two people?" Asking the same questions of a relational database requires many joins and quickly gets complicated.

**Time-series databases** are optimised for timestamped measurements: server metrics, sensor readings, energy consumption or prices. They usually offer time-based partitioning, automatic deletion or downsampling of old data, and fast aggregation over time windows.

**Vector databases** store numerical representations (embeddings) of text, images or audio produced by machine learning models, and run similarity searches of the "find the items most like this one" kind. They are common in AI applications that answer questions over documents. This capability is not limited to separate products; existing databases can offer it too. The open-source pgvector extension for PostgreSQL, for example, lets you store vectors alongside the rest of your data and search them with approximate nearest neighbour indexes such as HNSW and IVFFlat.

## Comparison and choosing

| Type | Data model | Typical use | Watch out for |
|---|---|---|---|
| Relational | Tables, rows, columns | Transactions, orders, accounting, general applications | Schema changes need planning |
| Document | Nested JSON-like documents | Records with varying structure, content management | Complex cross-collection queries get harder |
| Key-value | Key → value | Caching, sessions, counters | Limited flexible querying |
| Columnar / warehouse | Tables stored column by column | Reporting, large-scale analytics | Poor fit for frequent small updates |
| Graph | Nodes and relationships | Network analysis, recommendations, fraud detection | Unnecessary complexity for plain tabular data |
| Time-series | Timestamped measurements | Metrics, IoT, monitoring | Limited for general-purpose queries |
| Vector | Numerical embeddings | Semantic search, recommendations, document-based AI | Results are approximate; quality depends on the embedding model |

The questions I ask when choosing: How structured is the data? How critical is consistency? Which queries will run most often? How fast will the data grow? Which systems can the team realistically operate?

For many projects, a well-known relational database is a sensible starting point; specialised systems for caching, analytics or search can be added as needs become clear. Every additional database type carries an operational cost in backups, security, monitoring and team knowledge.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The right database depends on the shape of your data and the questions you ask it most often.</li><li>Relational databases offer reliable transactions and schema enforcement and are a good default.</li><li>Document and key-value stores trade query power for flexibility and speed.</li><li>Columnar systems suit analytics, graph databases suit relationships and time-series databases suit measurements.</li><li>Vector search is available both in dedicated products and as extensions like pgvector.</li></ul></div>

<div class="faq"><details><summary>Has NoSQL replaced SQL?</summary><p>No. NoSQL systems became popular for particular use cases, but relational databases remain extremely common, and many systems today use both approaches together.</p></details><details><summary>Is it fine to use more than one database in a project?</summary><p>When needed, yes. A relational database for core data plus a key-value store for caching is a common pattern. Each extra system adds operational and consistency overhead, so it should answer a real need.</p></details><details><summary>Does an AI application always need a vector database?</summary><p>If you need similarity search, you need vector support, but that does not always mean a separate product. For moderate data volumes, a vector extension to your existing database may be enough.</p></details><details><summary>Is a spreadsheet a database?</summary><p>A spreadsheet can hold data, but it does not provide database features such as concurrent access, transactional safety and integrity constraints.</p></details></div>

---

**Sources**

- [PostgreSQL Documentation – Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [SQLite – Appropriate Uses For SQLite](https://www.sqlite.org/whentouse.html)
- [MongoDB Manual – Introduction](https://www.mongodb.com/docs/manual/introduction/)
- [Neo4j – What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/)
- [pgvector – Open-source vector similarity search for Postgres](https://github.com/pgvector/pgvector)
