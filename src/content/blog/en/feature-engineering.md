---
title: "Feature Engineering: Meaningful Signals from Raw Data and the Leakage Traps"
description: "An intuitive guide to feature engineering: deriving meaningful features from raw data, scaling, encoding, and the data-leakage traps that make models collapse in production."
publishDate: "2026-08-09T23:43:00+03:00"
lang: en
category: "Data"
tags: ["Data", "AI"]
translation: "ozellik-muhendisligi"
heroImage:
  src: "../../../assets/blog/bimg-07.jpg"
  alt: "Feature Engineering: Meaningful Signals from Raw Data and the Leakage Traps"
---

A great dish depends as much on how you prepare the ingredients as on their quality. There is a world of difference between dropping a raw onion on the plate and slicing it thin and caramelizing it. Machine learning works the same way: a model’s success often comes not from the algorithm but from presenting the raw data to it in a _meaningful_ form. This craft is called **feature engineering**. In this post we explain how to derive useful features from raw data, why scaling and encoding matter, and how to avoid the sneakiest trap of all, **data leakage**, using everyday examples.

## 1\. What is feature engineering?

A model sees the world only through the numbers you hand it. You might have a customer’s birth date, their purchase history, or a house’s address; but the model does not understand this raw information as is. A **feature** is a measurable signal extracted from raw data that the model uses to make predictions. Feature engineering is the art of deliberately _designing_ those signals.

Consider a birth date: “1990-04-12” by itself tells a model very little. But if you derive features such as “age,” “month of birth,” or “born on a weekend,” the model can now see patterns. The same raw data, with the right questions, turns into distinct and valuable signals.

> Models learn from data, but they learn _faster and better_ from good features. Very often the biggest gain comes not from a fancier algorithm but from a smarter feature.

## 2\. Deriving meaningful features from raw data

A good feature translates domain knowledge into numbers. A few typical transformations:

-   **Date/time parsing:** Extracting parts such as “hour,” “day of week,” or “is it a public holiday” from a timestamp. When forecasting a café’s sales, “Saturday afternoon” is far more powerful than the raw date.
-   **Ratios and composite features:** Combining two raw columns. Instead of “total spend” and “number of visits,” “average spend per visit” is often more meaningful.
-   **Aggregation:** Summaries like a customer’s transaction count over the last 30 days or their average basket size. A single row becomes a compressed story of the past.
-   **From text to number:** Extracting “city” or “postal-code region” from an address string; taking the word count from a product title.

An intuitive analogy: when a doctor examines a patient, they don’t use the raw figures (height, weight) directly; they derive a _meaningful indicator_ such as body mass index from them. Feature engineering is producing such “indicators” from your data.

<div class="callout"><strong>Tip:</strong> Before adding a new feature, ask yourself: “Is this signal genuinely related to what I’m trying to predict?” Hundreds of features produced without domain knowledge can drown the model in noise rather than strengthen it.</div>

## 3\. Scaling: weighing everything on the same scale

Many algorithms are sensitive to the magnitude of features. If one feature is “age” (in the 0–100 range) and another is “annual income” (in the 0–1,000,000 range), in the model’s eyes income overwhelms age simply because its numbers are larger. Yet this does not mean income is more _important_; its scale is just different.

**Scaling** brings features into a comparable range. Two common methods:

-   **Standardization:** Transforms each feature to have a mean of 0 and a standard deviation of 1. It turns the value into an answer to “how many standard deviations is this from the mean?”
-   **Normalization (min-max):** Squeezes values into a fixed range, usually between 0 and 1. The smallest value becomes 0, the largest becomes 1.

Analogy: when comparing a marathon runner with a chess master, you can’t simply add their seconds and their ELO rating; you have to convert both into a “how good in their own field” scale. Scaling does exactly that. Distance-based methods (k-nearest neighbors) and models trained with gradient descent benefit from it the most.

## 4\. Encoding: turning categories into numbers

Models work with numbers, but real data is full of textual categories like “city,” “color,” or “product category.” Turning these into numbers is called **encoding**.

-   **One-hot encoding:** Opens a separate column for each category; writes 1 if the row belongs to that category and 0 otherwise. “Red / Green / Blue” becomes three separate columns. It is the right choice for categories with no inherent order.
-   **Ordinal encoding:** If categories have a natural order (for example “low < medium < high”), it converts them to numbers like 1, 2, 3.

Why do we need one-hot? If you had said “Red=1, Green=2, Blue=3,” you would have accidentally imposed a meaningless ordering on the model, as if “Blue is three times Red.” Colors have no such hierarchy; one-hot removes this false assumption.

<div class="callout"><strong>Tip:</strong> If a categorical column has very many unique values (for example thousands of postal codes), one-hot encoding can produce hundreds of columns and bloat the data. In that case, consider alternatives such as grouping or target-based encoding.</div>

## 5\. Data leakage: the sneakiest trap

Now we reach the most dangerous part. **Data leakage** is when the model gains access during training to information it would _never_ have at prediction time in the real world. The result is insidious: the model looks brilliant in testing but collapses once deployed.

A classic example: you are trying to predict a disease and the data has an “applied treatment” column. The model makes wonderful predictions from this column, because treatment is applied only _after_ a diagnosis is made. In other words, the model knows the future by “cheating.” In real life, at the moment of diagnosis, this information does not yet exist.

> Data leakage is like handing the exam questions to a student before the exam. The grades are wonderful, but nothing was learned; in real life the student is helpless.

A subtler form is **preprocessing leakage**. Say you computed the mean for scaling from _all_ the data (training + test). At that moment, information from the test set has quietly seeped into the training process. The model has picked up a hint about the test distribution it was never supposed to see.

## 6\. Guarding against leakage: the right order

The golden rule for guarding against leakage is simple: **learn all transformation parameters from the training data only, then apply the same ones to the test data.** The mean and standard deviation you use for scaling must be computed from the training set alone; the test set must never take part in that computation.

The pseudocode below shows the right and wrong order side by side:

```text
# WRONG: scaling learned from all data -> leakage
mean, std = compute_stats(all_data)        # test is inside too!
all_data  = scale(all_data, mean, std)
train, test = split(all_data)

# RIGHT: split first, then learn from TRAIN only
train, test = split(all_data)
mean, std = compute_stats(train)           # train only
train = scale(train, mean, std)
test  = scale(test,  mean, std)            # same parameters
```

The same logic applies to every preprocessing step: imputing missing values, encoding, feature selection. In all of them, split into train/test first, then learn the parameters from the training set only. The **pipeline** constructs in modern libraries exist precisely to enforce this discipline automatically; during cross-validation they re-learn the preprocessing from the training portion at each fold.

<div class="callout"><strong>Tip:</strong> If a model gives “too good” a result, suspect leakage before you celebrate. If accuracy is too high to be true, it usually isn’t true.</div>

## 7\. Balance in practice and final notes

Feature engineering is a powerful tool, but it can be overdone. Producing hundreds of features does not enrich the model; more often it adds noise and inflates the risk of overfitting. A good feature set consists of _few but meaningful_ signals. Fewer, cleaner features generally beat more, irrelevant ones.

One more thing to remember: deep learning models are very good at learning features from raw data themselves (especially in images and text). Even so, in tabular data, in limited-data settings, and in domains where interpretability matters, well-designed features remain invaluable. In the end the goal is single: to describe the world to the model in the clearest, most honest language possible.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Feature engineering is the art of turning raw data into meaningful signals the model can understand; success often comes from good features, not the algorithm.</li><li>Transformations like date parsing, ratios, and aggregation translate domain knowledge into numbers.</li><li>Scaling brings features of different magnitudes onto the same scale; it is critical for distance-based and gradient-trained models.</li><li>Encoding turns categories into numbers; use one-hot for unordered categories and ordinal encoding for naturally ordered ones.</li><li>Data leakage is when the model sees information during training that it couldn’t access at prediction time; it produces models that shine in testing and fail in the field.</li><li>The rule for prevention: split into train/test first, then learn all transformation parameters from the training set only and apply them to the test set. Pipelines automate this.</li><li>Few but meaningful features beat many but irrelevant ones; excess feeds overfitting.</li></ul></div>

<div class="faq"><details><summary>Is scaling necessary for every model?</summary><p>No. Distance-based methods (k-nearest neighbors, SVM) and models trained with gradient descent (linear/logistic regression, neural networks) benefit greatly from scaling. By contrast, decision trees and tree-based methods (random forests, gradient boosting) are insensitive to the absolute magnitude of features; for these models scaling is often unnecessary.</p></details><details><summary>Should I use one-hot or ordinal encoding?</summary><p>Ask whether the categories have a natural order. For ordered categories like “low / medium / high,” ordinal encoding preserves that order. For unordered categories like “red / green / blue,” one-hot is the right choice; otherwise you impose a hierarchy that doesn’t exist. If there are very many unique values, consider alternative encodings.</p></details><details><summary>How can I be sure there is no data leakage?</summary><p>Stick to two disciplines. First: question whether each feature will genuinely be available at prediction time; remove columns that “copy” the future (for example, fields filled in after the outcome). Second: learn all preprocessing parameters from the training data only, and keep these steps inside a pipeline so they are re-learned at each fold during cross-validation.</p></details></div>

---

In short: feature engineering is the quiet hero of machine learning. What makes a model smart is often not the complexity of the algorithm but how clearly and honestly you present the data to it. Getting scaling and encoding right, and meticulously preventing leakage, makes even a simple model robust and trustworthy. If you are curious how Turkish-focused AI models are built with this kind of rigor in practice, take a look at [HatsonTech](/en/posts/how-hatsontech-started/).
