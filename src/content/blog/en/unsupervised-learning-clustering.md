---
title: "Unsupervised Learning and Clustering: Finding Patterns in Unlabeled Data"
description: "An intuitive guide to unsupervised learning through k-means, hierarchical clustering and PCA: how to extract hidden patterns from unlabeled data and choose the number of clusters."
publishDate: "2026-08-09T23:44:00+03:00"
lang: en
category: "Learning"
tags: ["Learning", "AI"]
translation: "denetimsiz-ogrenme-kumeleme"
heroImage:
  src: "../../../assets/blog/covers/unsupervised-learning-clustering.jpg"
  alt: "Unsupervised Learning and Clustering: Finding Patterns in Unlabeled Data"
---

Imagine moving to a new city where nobody hands you a map. Within a few weeks you still start saying things like "that neighborhood is full of students," "this one is a quiet family area," "over there is the nightlife hub." No one gave you those labels; you grouped similar places together all on your own. That is exactly what **unsupervised learning** is: a way of learning where the right answer is never provided, and the machine discovers patterns in unlabeled data by itself.

## What does unlabeled data mean?

In supervised learning every example comes with a "right answer": this email is spam, this photo is a cat, this house is worth two million. The model learns the link between the input and these ready-made answers. In unsupervised learning those answers simply _do not exist_. All we have is the data; no labels, no categories, no targets. Our job is to find the hidden structure inside the data itself.

Think of a box of buttons dumped onto a table. Nobody tells you "sort these by color," yet the moment you look, you start grouping the similar ones on your own: the small white ones, the big black ones, the round red ones. A machine does the very same thing with unlabeled data; it just expresses "similarity" through math.

> Supervised learning learns to imitate the answer; unsupervised learning discovers the question itself.

## Clustering: grouping like with like

The most common unsupervised task is **clustering**: splitting data into groups whose points resemble one another. A good clustering follows two rules: points within the same cluster should be as _close_ as possible, and points in different clusters as _far apart_ as possible.

But what does "close" mean? We usually picture points as coordinates in a multi-dimensional space and measure the _distance_ between them; the best-known one is Euclidean distance, the straight-line gap between two points. If we describe a customer with numbers such as "age, monthly spend, visit frequency," similar customers land near each other in this space and natural clumps emerge.

<div class="callout"><strong>Tip:</strong> <em>Scale</em> your data before clustering. If "income" is measured in thousands and "age" in tens, then without scaling income alone will dominate the distance and age becomes nearly invisible.</div>

## K-means: the most loved and simplest method

**K-means** is the most widely used clustering method, because it is both intuitive and fast. It asks one important decision of you: how many clusters (_k_) do you want? It handles the rest. Its logic rests on this loop:

1.  **Initialize:** Pick _k_ random "centers" (centroids). Think of them as the starting representatives of the clusters.
2.  **Assign:** Assign each data point to its nearest center. This forms _k_ temporary groups.
3.  **Update:** Compute the actual mean of each group and move the center there.
4.  **Repeat:** Loop the assign and update steps until the centers stop moving.

Picture children in a schoolyard. We plant _k_ flags at random; every child runs to the nearest flag. Then each flag is dragged to the exact middle of the children gathered around it. The children run to the nearest flag again... This takes a few rounds, and eventually everyone settles naturally into their closest cluster.

K-means is fast but has some limits: it assumes clusters are roughly spherical and similar in size, and it struggles with long, intertwined, or unevenly dense shapes. It can also get stuck on a poor result if the initial centers are badly chosen; in practice it is run several times with different starts and the best one is kept (a common way to automate this is the _k-means++_ initialization).

## How many clusters? Elbow and silhouette

The most critical question in k-means is: what should _k_ be? We usually don't know the natural number of groups in the data in advance. Two practical tools help with this decision.

-   **Elbow method:** Increasing _k_ from 1, we measure the total within-cluster scatter each time. As _k_ grows, scatter always shrinks, but past a certain point the decline slows down. On the chart, that "elbow" bend is often a reasonable value for _k_.
-   **Silhouette score:** For each point it measures "how close is it to its own cluster versus the nearest neighboring cluster?" The closer the score is to +1, the cleaner the clustering; near 0 means points sit on the border. The _k_ giving the highest average silhouette is a strong candidate.

Even so, these tools don't hand you an absolute truth. Often the "right" number of clusters depends less on the data than on your _goal_: three customer segments may be enough for marketing, while eight may be more useful for the product team.

## Hierarchical clustering: like a family tree

K-means asks up front how many clusters you want; **hierarchical clustering** leaves that decision to the end. Its most common form is the _agglomerative_ approach, which works from the bottom up:

1.  At the start, each point is a cluster on its own.
2.  The two closest clusters are merged.
3.  This repeats until a single large cluster remains.

The result is a tree called a **dendrogram**. It looks much like a genealogy: individuals at the bottom, then siblings, cousins, and whole lineages as you climb. You obtain any number of clusters by "cutting" this tree at a chosen height. In other words you don't have to fix _k_ beforehand; you see the data's own structure first and decide afterward.

Hierarchical clustering is sensitive to how you define the distance between clusters (such as nearest, farthest, or average linkage) and can be slow on large datasets compared to k-means. In return, it is invaluable for intuitively discovering the number of clusters and seeing nested structures.

## Dimensionality reduction and PCA

Real data usually describes each example with dozens, hundreds, or even thousands of features (dimensions). The human eye comfortably perceives at most three; on top of that, many dimensions both slow down computation and cause problems known as the "curse of dimensionality": in high dimensions everything looks far from everything else, and similarity loses meaning. **Dimensionality reduction** is the art of cutting the number of dimensions while preserving as much information as possible.

The most classic method is **PCA** (Principal Component Analysis). PCA finds the directions in which the data varies the most (where most of the _information_ lives) and projects the data onto these new "principal axes." The first few axes usually carry the bulk of the information; by dropping the rest you shrink the dimensionality dramatically.

An intuitive analogy: shine light on a 3D object from the right angle and cast its _shadow_ on the wall. The shadow is two-dimensional, so it loses information; but if you pick the right angle you can still recognize the object's shape. PCA finds exactly that "angle that preserves the most information." This makes it possible to compress high-dimensional data to 2D for _visualization_, or to reduce noise before clustering.

<div class="callout"><strong>Tip:</strong> PCA is not a clustering method; it is a <em>preprocessing</em> tool. Simplifying high-dimensional data with PCA first and then running k-means often improves both speed and the quality of the result.</div>

## K-means in a few lines

Let's see the whole idea in pseudocode. At its heart are just two steps: `assign to nearest center` and `move center to the mean`.

```text
# Input: data points, k (number of clusters)
centers = pick_k_random_points(data, k)

loop (until convergence):
    # 1) ASSIGN: link each point to its nearest center
    for each point in data:
        point.cluster = nearest_center(point, centers)

    # 2) UPDATE: move each center to the mean of its cluster
    old_centers = centers
    for each j in 0..k-1:
        centers[j] = mean(points_in_cluster(j))

    # stop if the centers no longer move
    if centers ~= old_centers:
        break

return centers, cluster_labels
```

In real libraries (such as scikit-learn) you don't write this by hand; a single call handles the whole loop, the k-means++ initialization, and the convergence check for you. But the essence is exactly this: _assign, average, repeat._

## Where it helps, what to watch for

Unsupervised learning shines wherever collecting labels is expensive or impossible:

-   **Customer segmentation:** Finding natural customer groups by behavior and treating each group differently.
-   **Anomaly detection:** Points that fit no cluster and stand apart from the crowd are often a signal of fraud or failure.
-   **Document and image organization:** Automatically sorting similar content into clumps.
-   **Compression and visualization:** Simplifying data with dimensionality reduction and making it eye-readable.

One thing to keep in mind: unsupervised results are not "the right answer," they are an _interpretation_. The algorithm gives you clusters, but a human decides what those clusters _mean_. Different methods, different scales, or different values of _k_ can produce entirely different groups. That is why you should always test the findings against your domain knowledge.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Unsupervised learning extracts patterns from unlabeled data; no "right answer" is given, structure is discovered.</li><li>Clustering gathers similar points into the same group; a good cluster is dense inside and separate outside.</li><li>K-means is fast and intuitive, but you choose <em>k</em> and it assumes spherical clusters.</li><li>Elbow and silhouette help pick a reasonable number of clusters, but the final call depends on your goal.</li><li>Hierarchical clustering produces a dendrogram; you choose the number of clusters by cutting it afterward.</li><li>PCA is a dimensionality-reduction tool; it shrinks dimensions while preserving information, ideal for visualization and preprocessing.</li></ul></div>

---

In short, unsupervised learning is like getting to know a new city with no map at all: nobody gives you labels, but by grouping the similar with the similar you reveal the data's hidden order. K-means is your fast first move, hierarchical clustering shows structure layer by layer, and PCA simplifies the crowd to make everything visible. If you're curious how these ideas come to life in real products, you can browse the content at [HatsonTech](/en/posts/how-hatsontech-started/).

<div class="faq"><details><summary>How do I choose between k-means and hierarchical clustering?</summary><p>If you roughly know the number of clusters and the data is large, k-means is fast and practical. If you're unsure of the count or want to see nested structures, hierarchical clustering with its dendrogram is more explanatory; but it can be slow on big data.</p></details><details><summary>Why is PCA used before clustering?</summary><p>In very high dimensions distances lose meaning and noise grows. PCA shrinks dimensionality while keeping most of the information; this both speeds up clustering and can yield cleaner, more separated groups. PCA doesn't cluster on its own, it prepares the ground for it.</p></details><details><summary>How do I know a clustering result is "correct"?</summary><p>There is no absolute truth. Metrics like silhouette numerically assess how separated the clusters are, but the final quality depends on your goal. Whether the groups are meaningful and interpretable for the business often matters more than any single score.</p></details></div>
