---
title: "What Is Machine Learning? Computers That Learn From Examples"
description: "A plain-language guide to machine learning: learning from examples, supervised and unsupervised learning, training versus prediction, and what ML is not."
publishDate: "2026-11-06T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Machine Learning", "Artificial Intelligence", "Fundamentals"]
translation: "makine-ogrenmesi-nedir"
heroImage:
  src: "../../../assets/blog/covers/what-is-machine-learning.jpg"
  alt: "Abstract illustration of a computer finding a pattern in scattered data points"
---

"Machine learning" now turns up in news stories, job adverts and even the marketing copy of shopping apps. Yet when someone asks what it actually means, most of us reach for either jargon or a vague hand-wave. In this post I want to explain the idea without formulas, using everyday examples. My goal is simple: by the end, when you hear that a product "uses machine learning", you should be able to say in your own words what that claim means, and just as importantly, what it does not mean.

## Showing examples instead of writing rules

In traditional software, a programmer writes the rules one by one: "If the amount is above this threshold, raise an alert", "If the email contains this phrase, move it to spam." That works well when the rules are clear. But try to describe in rules whether a photo contains a cat, or whether a product review is positive or negative, and the task quickly becomes unmanageable.

Machine learning takes a different route. We do not write the rules; we give the system many examples and it works out the patterns itself. MIT Sloan's explainer quotes a definition attributed to AI pioneer Arthur Samuel in the 1950s: the field of study that gives computers the ability to learn without being explicitly programmed. Whether Samuel used those exact words is debated, but the sentence captures the idea well.

Think about how children learn words. We do not hand them a definition of "dog" to memorise. We show them lots of different dogs, and before long they can recognise one they have never seen. Machine learning is, roughly, the same move: generalising from examples.

## Three basic ways of learning

Machine learning methods are usually grouped into three families. Google's introductory material now adds generative AI as a fourth heading, but the classic three are still the best starting point.

| Type | What the data looks like | What it does | Everyday example |
|---|---|---|---|
| Supervised learning | Examples with known answers (labels) | Predicts the answer for new examples | Spam filters, house price estimates |
| Unsupervised learning | Unlabelled data | Groups similar items, finds structure | Segmenting customers by shopping habits |
| Reinforcement learning | Reward and penalty signals | Develops a strategy by trial and error | Game-playing programs, robot control |

**Supervised learning** is the most widely used today. You label thousands of emails as "spam" or "not spam", and the system learns to predict which group a new email belongs to. When the answer is a category this is called classification; when it is a number, such as the price of a flat, it is called regression.

**Unsupervised learning** has no correct answers to learn from. The system looks for natural groupings in the data. One point is easy to miss: deciding what those groups actually mean is still a human job.

**Reinforcement learning** places a system in an environment where each action earns a reward or a penalty, and over time the system develops a way of acting that increases its total reward.

## Training and prediction are separate steps

The most practical way to understand machine learning is to separate two phases:

1. **Training:** the model is tuned on past examples. This phase is usually slow and needs a lot of data and computing power.
2. **Prediction, or inference:** the trained model produces an answer for an input it has never seen. This is what happens when your phone recognises a face in a photo.

The distinction matters because a model's "learning" mostly happens during training. It is not safe to assume that a system automatically learns something from every interaction while you use it; that depends entirely on how it was designed.

Then there is evaluation. Testing a model on the same data it was trained on is like giving students an exam made of the exact practice questions they studied. So data is normally split: one part for training, a held-out part for testing. When a model memorises its training data and then stumbles on new examples, we call it overfitting. Measuring honestly whether a model really generalises is one of the parts of this field I spend the most time thinking about.

<div class="callout"><strong>Tip:</strong> When a product claims "99% accuracy", ask straight away: <em>on which data, measured by whom, and how?</em> A figure that was not measured on data held out from training, and similar to real-world use, tells you very little.</div>

## Where you already meet it

Machine learning usually works out of sight. A few familiar examples:

- **Recommendations:** the "you might also like" rows on streaming services and the playlists in music apps.
- **Fraud detection:** your bank flagging an unusual card payment.
- **Language tools:** machine translation, speech-to-text and the word suggestions on your phone keyboard.
- **Images:** photo apps grouping pictures by face; assistive software that highlights suspicious areas in medical scans.
- **Chatbots:** large language models are, at their core, trained with machine learning on very large collections of text.

What these have in common: writing rules is very hard, but collecting examples is possible.

## What machine learning is not

I think this section matters as much as the first, because wrong expectations lead to disappointment or, worse, to bad decisions.

- **It is not all of AI.** As IBM puts it, all machine learning is AI, but not all AI is machine learning. A thermostat following if-then rules is a very simple form of AI with no learning at all.
- **It is not understanding or thinking.** A model captures statistical patterns. Those patterns can be powerful, but they are not human-style comprehension.
- **It is not independent of its data.** A model is only as good as the examples it saw. Incomplete, wrong or unrepresentative data passes its problems straight to the model.
- **It is not set-and-forget.** The world changes: customer habits, language and fraud tactics all shift. A model that worked yesterday can quietly degrade, which is why models need monitoring.
- **It does not find causes.** A model says "these two things tend to appear together", not "one causes the other". I will come back to that distinction in a separate post.

<div class="callout"><strong>Note:</strong> You do not need advanced mathematics to start learning ML. Getting the concepts straight, then trying supervised learning on a small dataset, is a good first step. Introductory material such as Google's Machine Learning Crash Course follows roughly that order.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Machine learning is the umbrella term for methods that learn patterns from examples instead of following hand-written rules.</li><li>There are three classic types: supervised (labelled data), unsupervised (unlabelled data) and reinforcement learning (rewards and penalties).</li><li>Training and prediction are separate phases, and performance should be measured on data the model did not train on.</li><li>A model is only as good as its data, and it needs monitoring as the world changes.</li><li>Machine learning finds associations; on its own it does not establish cause and effect.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Are machine learning and AI the same thing?</summary><p>No. Machine learning is a subfield of artificial intelligence. AI is a broader umbrella that also includes rule-based systems.</p></details><details><summary>Where does deep learning fit?</summary><p>Deep learning is a machine learning approach that uses neural networks with many layers. It works very well for images and language, but usually needs large amounts of data and computing power.</p></details><details><summary>Do models keep learning as I use them?</summary><p>Not necessarily. Many models stay fixed after training and only change when they are retrained. Whether your data feeds into future training depends on the product's design and its privacy settings.</p></details><details><summary>Where should I start if I want to learn?</summary><p>Basic statistics and a little Python, followed by a free introductory course and a small project of your own, is a solid path.</p></details></div>

---

**Sources**

- [MIT Sloan – Machine learning, explained](https://mitsloan.mit.edu/ideas-made-to-matter/machine-learning-explained)
- [Google for Developers – What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google for Developers – Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [IBM – What is machine learning?](https://www.ibm.com/think/topics/machine-learning)
