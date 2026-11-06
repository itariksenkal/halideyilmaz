---
title: "A 6–12 Month Roadmap for Learning AI on Your Own"
description: "Math refreshers, Python, machine learning, deep learning and large language models: a self-study plan with free resources and a project for every stage."
publishDate: "2026-12-02T09:17:00+03:00"
lang: en
category: "Career"
tags: ["Artificial Intelligence", "Learning", "Career"]
translation: "yapay-zeka-ogrenme-yol-haritasi"
heroImage:
  src: "../../../assets/blog/covers/ai-learning-roadmap.jpg"
  alt: "A learning roadmap with stages running from mathematics to large language models"
---

"I want to learn AI. Where should I start?" It is a very common question, and I think the honest answer is this: there is no single right path, but some orders work much better than others. There is no shortage of material online. The real difficulty is knowing what to study in which order, and keeping your motivation along the way. In this post I suggest a self-study plan that can take six to twelve months for someone who can set aside a few hours every week. All the resources I mention are freely available, and each stage ends with a small project. Feel free to stretch or compress the timeline to suit your own pace.

## Setting realistic expectations

This roadmap will not make you an "AI expert" in a few months. Let's define a more realistic goal: by the end, you should understand the core concepts, be able to build and evaluate simple models on your own, have a solid intuition for how large language models (LLMs) work, and have a few projects that show it.

The overall flow looks like this:

| Stage | Rough duration | Focus |
|---|---|---|
| 1. Foundations | 1–2 months | Python and a math refresher |
| 2. Machine learning | 2–3 months | Classic methods, evaluation |
| 3. Deep learning | 2–3 months | Neural networks, images and text |
| 4. Large language models | 1–2 months | Transformers, fine-tuning, applications |
| 5. Capstone project | 1–2 months | An end-to-end piece of work |

If you already program, you can shorten the first stage; if your math is strong, you will move faster through the second.

## Stage 1: Python and a math refresher

**Python.** The Python Tutorial in the official documentation is still an excellent way to learn the language systematically. If you want something more hands-on, the short Python and Pandas courses on Kaggle Learn get you working with data quickly.

**Math.** It can look intimidating, but the math you need to start is limited: linear algebra (vectors, matrices), the basic idea of a derivative, and probability and statistics. A few good resources:

- **Khan Academy:** free, step-by-step lessons on linear algebra and statistics.
- **3Blue1Brown – Essence of Linear Algebra:** a short video series that builds visual intuition for linear algebra.
- **MIT OpenCourseWare 18.06:** Gilbert Strang's linear algebra course, with free lecture videos and materials.
- **Mathematics for Machine Learning:** the book by Deisenroth, Faisal and Ong, whose authors keep the PDF freely available. Rather than reading it cover to cover, I suggest treating it as a reference you return to when needed.

**Project:** take an open dataset (from a national statistics office or a city open data portal, for example), load and clean it with pandas, and write a short analysis that answers a few simple questions with charts.

<div class="callout"><strong>Tip:</strong> Don't wait to "finish math first". Learn the core ideas, move on, and come back to go deeper when you need to. That makes the knowledge stick much better.</div>

## Stage 2: Machine learning fundamentals

The goal here is to learn classic methods such as regression, classification and decision trees, and above all how to **evaluate a model properly**.

- **Google Machine Learning Crash Course:** Google's free course was refreshed in November 2024. Its modules run from linear and logistic regression to neural networks, large language models and responsible AI.
- **An Introduction to Statistical Learning (ISL):** a Python edition appeared in 2023, and the PDFs can be downloaded from the authors' website. It is one of the best resources for building statistical intuition.
- **scikit-learn documentation:** the library's user guide explains each method with examples.

**Project:** pick a real classification problem. Build a very simple baseline first, then compare it with a more advanced method. Report results not only as accuracy but also by type of error.

## Stage 3: Deep learning

When you move to neural networks, you can choose between two learning styles: practice first and theory later, or the other way round.

- **fast.ai – Practical Deep Learning for Coders:** Jeremy Howard's free course follows a "build something that works, then open it up" approach. It recommends about a year of coding experience and does not require university-level math.
- **Dive into Deep Learning (d2l.ai):** an open-source, interactive book that explains each concept with runnable code, with versions for PyTorch, JAX, TensorFlow and more.
- **Deep Learning (Goodfellow, Bengio, Courville):** a more theoretical resource; the full book can be read free on the authors' website.

**Project:** train a small image or text classifier. Adapt a pre-trained model to your own small dataset (transfer learning), and show with examples where the model goes wrong.

## Stage 4: Large language models

By this stage you start to see LLMs not as magic boxes but as a large-scale application of concepts you already know.

- **Andrej Karpathy – Neural Networks: Zero to Hero:** in this free YouTube series you start from backpropagation and build, step by step, a small GPT model and a tokenizer. Python skills and introductory math such as derivatives are enough.
- **Hugging Face LLM Course:** completely free and ad-free. It covers using transformer models, fine-tuning, and working with datasets and tokenizers. The course recommends taking an introductory deep learning course first.

**Project:** build a small application that answers questions over a document collection of your choice. The most important part, though, is this: prepare a small test set to measure how often it answers correctly, and log the answers where the model makes things up (hallucinates).

## Stage 5: A capstone project and responsible AI

In the final stage, pick a problem you genuinely find interesting and bring everything together. This project will be the best way to show what you have learned.

A good capstone should include:

- a clear question and a short explanation of why it matters,
- the source of the data, its licence and its limitations,
- a baseline and a comparison against it,
- an honest evaluation: where does the model do well, where does it do badly, and for whom might it give wrong results?

That last point is the heart of responsible AI. Asking whether a model performs differently for different groups is now simply part of good engineering.

<div class="callout"><strong>Tip:</strong> Share what you learn in short posts or notes. Trying to explain a topic to someone else is the most honest test of how well you understand it.</div>

## Staying motivated

In a long learning journey, the hardest part is not the technical material but consistency. A few suggestions:

- **Set a schedule:** reserve specific days and hours each week.
- **Don't hoard resources:** finish one course instead of starting five at once.
- **Join a community:** a study partner or an online group makes the hard weeks easier.
- **Don't get stuck:** not understanding something the first time is normal. Mark it, move on, and come back later.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>There is no single right path, but foundations, classic machine learning, deep learning and then LLMs is an efficient order.</li><li>All the suggested resources are freely available: Khan Academy, MIT OCW, fast.ai, d2l.ai, Google's crash course, Hugging Face and others.</li><li>Don't wait to finish math before moving on; return to it when you need it.</li><li>Close each stage with a small project, and make honest model evaluation a habit.</li><li>Consistency matters more than intensity.</li></ul></div>

<div class="faq"><details><summary>Do I need a strong math background to learn AI?</summary><p>Not to get started. High-school math plus basic linear algebra and probability is enough to begin. As you move to more advanced topics, you will need to deepen your math.</p></details><details><summary>How much time per week does this plan assume?</summary><p>It is designed for someone who can study regularly for a few hours each week. With more time you can move faster; with less, simply stretch the stages. Steady progress matters more than the exact number of hours.</p></details><details><summary>Can I skip straight to large language models?</summary><p>You can start using LLMs through ready-made tools right away. But to understand how they work, why they make mistakes and how to evaluate them, you need the basics of machine learning and deep learning.</p></details><details><summary>Will I be able to get a job at the end of this plan?</summary><p>The plan aims to give you a solid foundation and projects you can show. Getting a job also depends on experience, location, sector and the quality of your projects, so it is more realistic to see this as a starting point.</p></details></div>

---

**Sources**

- [Mathematics for Machine Learning (Deisenroth, Faisal, Ong)](https://mml-book.github.io/)
- [MIT OpenCourseWare – 18.06 Linear Algebra (Gilbert Strang)](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [fast.ai – Practical Deep Learning for Coders](https://course.fast.ai/)
- [Andrej Karpathy – Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
- [Hugging Face – LLM Course](https://huggingface.co/learn/llm-course)
