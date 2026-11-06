---
title: "What Is Big Data? Volume, Velocity, Variety and Real Needs"
description: "What big data means today: volume, velocity and variety; distributed processing with Hadoop and Spark; lakes and lakehouses; and when you don't have big data."
publishDate: "2026-11-18T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Big Data", "Data Engineering", "Distributed Systems"]
translation: "buyuk-veri-nedir"
heroImage:
  src: "../../../assets/blog/covers/what-is-big-data.jpg"
  alt: "Schematic view of a cluster of connected servers in a data centre"
---

"Big data" has been one of the most used technology terms of the past two decades. It gets applied to a company's customer records, to billions of sensor readings, and sometimes simply to "a spreadsheet with too many rows". That vagueness can lead to poor investment decisions: some teams build complex infrastructure they never needed, while others miss the point at which their data really did outgrow their tools. In this post I want to look at what big data means today, the basic ideas behind distributed storage and processing, and a question that matters just as much: what if you don't actually have big data?

## Where the term comes from

The most common framework for describing big data is the "three Vs": volume, velocity and variety. It traces back to a February 2001 research note by Doug Laney, then an analyst at META Group, which argued that e-commerce was stretching data management along those three dimensions. Over the years others added more Vs, such as veracity and value, but the original three remain the most useful starting point.

One detail is important: big data is not a fixed size threshold. A dataset considered large in 2001 can be processed comfortably on a laptop today. What defines big data is the point at which data starts to exceed the capacity of your existing tools and of a single machine.

## Volume, velocity and variety today

- **Volume:** how much data there is. The problem is not only disk space; reading, moving and processing the data in reasonable time also gets harder.
- **Velocity:** how fast data arrives and must be handled. Fraud detection on payments or traffic sensors need data evaluated within seconds, which gave rise to a separate field called stream processing.
- **Variety:** the shape of the data. Tables, JSON records, free text, images, audio and log files each need different tools and different quality checks.

In practice, struggling along just one of these dimensions can be reason enough to consider big data tools. If your data is small but thousands of events arrive every second, your problem is velocity, not volume, and the solution looks different.

## The idea behind distributed storage and processing

When one machine is no longer enough, the core idea is to split data across many machines and send the computation to where the data lives. The MapReduce paper by Google engineers Jeffrey Dean and Sanjay Ghemawat, presented at the OSDI conference in 2004, was one of the works that brought this idea to a wide audience. The model has two steps: a "map" step processes each chunk independently and emits intermediate results, and a "reduce" step combines the results that share a key. If a machine fails, the system reruns its work elsewhere.

Apache Hadoop, an open-source project inspired by these ideas, was for years almost a synonym for big data. Its core components are HDFS, a distributed file system that stores data across the cluster; YARN, which manages resources and job scheduling; and MapReduce for parallel processing.

Apache Spark, which became widespread later, describes itself as a multi-language engine that can run on single machines or clusters, usable from Python, SQL, Scala, Java and R. Because it offers a more flexible programming model than MapReduce, it is widely used for data engineering, analytics and machine learning workloads.

<div class="callout"><strong>Note:</strong> The price of distributed systems is complexity. Network latency, data shuffling between machines, partial failures and cluster management create problems you never meet on a single machine. A distributed setup only adds value when you genuinely need it.</div>

## Data warehouses, data lakes and lakehouses

Three terms come up constantly in big data discussions, so it helps to separate them:

| Concept | Core idea | Strength | Challenge |
|---|---|---|---|
| Data warehouse | Store cleaned, structured data in a form optimised for analysis | Fast, consistent SQL reporting | Less flexible for raw and unstructured data |
| Data lake | Keep all kinds of data in raw form on cheap storage (usually object storage) | Flexibility, low storage cost | Can become a "data swamp" without governance |
| Lakehouse | Add warehouse-style management and performance on top of a data lake, using open file formats | Analytics and machine learning on one platform | Relatively new; tools and practices are still maturing |

The lakehouse approach gained wide attention through a 2021 CIDR conference paper by Michael Armbrust and colleagues. It argues that keeping a lake and a warehouse as two separate tiers causes problems such as stale data, reliability issues and extra cost, and proposes a single layer built on open formats.

## You may not have big data

My most practical advice on this topic: before adopting big data tools, measure whether your data is actually big. Much of the data that organisations analyse fits in the memory or on the disk of a single capable machine. In those cases a distributed cluster adds cost, maintenance and failure points without necessarily making anything faster.

Several approaches let you do far more on one machine:

- **Columnar file formats:** formats such as Apache Parquet store data column by column and compressed, so only the columns you need are read.
- **Single-machine analytical engines:** embedded analytical databases such as DuckDB, or libraries like pandas, can be very efficient on medium-sized data.
- **Summarise first:** keep raw event data, but build daily or hourly summary tables for analysis to shrink the amount of data each query touches.
- **Sample:** for exploratory work, a representative sample is often enough.

A few questions help decide whether you need a distributed solution. Does the data fit on one machine's disk? Do queries take unacceptably long? Does data arrive faster than one machine can process it? If the answers are no, a simpler architecture is probably the better start.

## Size does not guarantee quality

Finally, as someone who works on data quality, I want to stress one point: more data does not automatically mean better results. A dataset that is systematically wrong, incomplete or unrepresentative of some group only produces more confident-looking mistakes as it grows. In big data projects, quality checks, data lineage and obligations around personal data deserve as much planning as storage and processing.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Big data is not a fixed size; it is the point where data outgrows your tools and a single machine.</li><li>Which of volume, velocity and variety you struggle with determines the solution you need.</li><li>Distributed systems split data across machines and move computation to the data, at the cost of complexity.</li><li>Lakes offer flexibility, warehouses offer consistency, and lakehouses try to combine the two.</li><li>Many workloads run comfortably on one machine with columnar formats and efficient tools.</li></ul></div>

<div class="faq"><details><summary>How many gigabytes or terabytes count as big data?</summary><p>There is no fixed threshold, and it keeps moving as hardware improves. A practical test is whether the data can be processed in reasonable time with the tools you have on a single machine.</p></details><details><summary>Is Hadoop still used?</summary><p>The Hadoop ecosystem still runs in many organisations. In new projects, engines such as Spark are often chosen for processing and cloud object storage for storage.</p></details><details><summary>Do you need big data for AI?</summary><p>Training large models does require enormous datasets. Many practical applications, however, adapt existing models using smaller, well-chosen data, where quality matters as much as quantity.</p></details><details><summary>How do I choose between a data lake and a data warehouse?</summary><p>If you mostly do standard reporting on structured data, a warehouse is usually enough. If you need to store raw, varied data for different analyses and machine learning, a lake or lakehouse may fit better.</p></details></div>

---

**Sources**

- [Doug Laney – Deja VVVu: Gartner's Original "Volume-Velocity-Variety" Definition of Big Data](https://community.aiim.org/blogs/doug-laney/2012/08/25/deja-vvvu-gartners-original-volume-velocity-variety-definition-of-big-data)
- [Dean and Ghemawat – MapReduce: Simplified Data Processing on Large Clusters (OSDI 2004)](https://research.google/pubs/pub62/)
- [Apache Hadoop](https://hadoop.apache.org/)
- [Apache Spark](https://spark.apache.org/)
- [Armbrust et al. – Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics (CIDR 2021)](https://vldb.org/cidrdb/2021/lakehouse-a-new-generation-of-open-platforms-that-unify-data-warehousing-and-advanced-analytics.html)
