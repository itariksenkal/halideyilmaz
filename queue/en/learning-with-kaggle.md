---
title: "Learning with Kaggle: More Than Competitions"
description: "Using Kaggle as a learning tool: notebooks, datasets, competitions, reading top solutions, avoiding leaderboard overfitting and building a real portfolio."
publishDate: "2026-11-30T09:17:00+03:00"
lang: en
category: "Career"
tags: ["Kaggle", "Machine Learning", "Career"]
translation: "kaggle-ile-ogrenmek"
heroImage:
  src: "../../../assets/blog/covers/learning-with-kaggle.jpg"
  alt: "A laptop screen showing an open data science notebook next to a leaderboard"
---

Almost everyone who gets curious about data science or machine learning runs into Kaggle at some point. Some see it as an arena for prize competitions; others see it as a free laboratory. I think both views are right, but its real value is that, used well, it is an excellent place to learn. In this post I want to look at how to use Kaggle to actually learn rather than chase rankings, what to watch out for along the way, and how to turn the work you do there into a portfolio that says something about you.

## What Kaggle is and what it offers

Kaggle is a data science platform founded in 2010 and acquired by Google in March 2017. Today it has a few main parts:

| Part | What it is for |
|---|---|
| Learn | Short, free, hands-on courses on Python, pandas, intro to machine learning and more |
| Notebooks (Code) | A browser-based coding environment with no setup, including GPU and TPU access under limited quotas |
| Datasets | Datasets shared by users and organisations |
| Competitions | Events where participants compete on a problem defined by a host |
| Discussions | Forums for each competition and topic |

The biggest advantage for a beginner is that you can start without installing anything. Open a dataset, click "New Notebook", and you are writing code in an environment with the data already attached.

## First steps: Learn courses and learning by reading

If you have never written code, or you are new to Python, the short Kaggle Learn courses are a good entry point. Courses such as Python, Pandas and Intro to Machine Learning consist of a few hours of lessons with exercises, and they are free. They will not give you a deep education on their own, but they quickly get you to the point where you can open a dataset and build a first model.

After that, the most productive habit is reading other people's notebooks. Each dataset page lists public notebooks built on that data. I suggest looking for:

- **Exploratory data analysis (EDA) notebooks:** they show which questions experienced people ask when they first meet a dataset.
- **Plain baseline solutions:** before any complex model, seeing how well a simple approach works gives you an important reference point.
- **Well-commented work:** notebooks that explain why the code is written the way it is teach far more than ones that only show a result.

<div class="callout"><strong>Tip:</strong> Copy a notebook with "Copy & Edit", run every cell one by one, and deliberately change something. Breaking and fixing code builds understanding much faster than reading alone.</div>

## Competitions: to win or to learn?

You can use competitions for two quite different purposes, and it helps to know which one you are choosing.

**Learning-oriented participation:** "Getting Started" and "Playground" competitions are designed for practice without pressure. In classics such as the Titanic competition, the point is not a prize but experiencing an end-to-end process for the first time: reading data, cleaning it, building a model and submitting predictions.

**Competitive participation:** prize competitions teach a lot, but they take serious time, and in the final weeks the work often turns into small gains and model ensembling. Those skills are useful, yet in most real-world projects the biggest wins come from framing the problem correctly and improving the data.

My suggestion is that for your first few competitions you track what you learned from each one rather than your rank.

## Reading the winners' write-ups

One of Kaggle's most valuable and least used resources is the solution write-ups shared after a competition ends. In many competitions, top teams explain in the discussion forum what they did, what worked and what did not.

When reading them, it helps to ask:

1. How did they set up validation? How did they account for time or group structure in the data?
2. Which feature engineering step made the biggest difference?
3. What did they try that did not work?

That last question matters most: failed attempts tell you which ideas do not suit that kind of data, and they can save you a lot of time.

## The trap of overfitting the leaderboard

In Kaggle competitions the test data is usually split in two. The **public leaderboard** you see during the competition is computed on only part of the test data. The **private leaderboard**, which decides the final ranking, is computed on the remaining part, kept hidden until the competition closes.

Here is the trap. If you make many submissions and keep whichever scores best on the public board, your model gradually adapts to that small slice of test data without you noticing. In a 2015 blog post, Moritz Hardt showed that it is possible to climb a public leaderboard substantially using only the scores of submissions, without looking at the data at all; his paper with Avrim Blum, "The Ladder", addresses the same problem. The large rank changes between public and private boards at the end of a competition, known as a "shake-up", often come from this.

Protecting yourself is simple, but it takes discipline:

- Build your own **local validation** (for example, cross-validation) and base your decisions on it first.
- Check whether your local score and public score move in the same direction.
- When choosing final submissions, trust the solution that is consistent locally, not just the one with the highest public score.

This lesson applies far beyond Kaggle. Reusing one test set again and again and reporting the best result is one of the most common mistakes I see in model evaluation.

## Turning Kaggle work into a portfolio

Your activity on Kaggle shows up on your profile. The platform's progression system runs separately across four areas, competitions, datasets, notebooks and discussions, with five tiers from Novice to Grandmaster. These titles can signal effort, but for most employers what really persuades is work that shows how you think.

A few ideas that work well for a portfolio:

- **Fewer, well-explained notebooks:** two or three pieces that clearly describe the problem, the data, the approaches you tried and their limits are worth more than dozens of half-finished ones.
- **Prepare your own dataset:** collecting data from an open source, cleaning it, and sharing it with a good description and licence demonstrates one of the skills most needed in real work.
- **Take it beyond Kaggle:** turning the same work into a short blog post or a tidy code repository reaches a wider audience.
- **Be honest:** rather than presenting a lightly modified copy as your own, credit the notebook that inspired you. It is ethical, and it builds trust.

<div class="callout"><strong>Tip:</strong> Start every notebook with a two- or three-sentence summary: what question you asked, what you found and how confident you are in the result. A reader should grasp the value of the work within ten seconds.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>With courses, a coding environment, datasets and competitions, Kaggle lets you start learning without any setup.</li><li>Copying, breaking and fixing other people's notebooks is one of the most effective ways to learn.</li><li>Winning write-ups are especially instructive on validation strategy and on ideas that did not work.</li><li>Making decisions based on the public leaderboard leads to overfitting; trust your local validation.</li><li>For a portfolio, well-explained and honestly credited work matters more than rank.</li></ul></div>

<div class="faq"><details><summary>Does Kaggle cost anything?</summary><p>Creating an account, taking Learn courses, running notebooks and entering competitions are free. Accelerators such as GPUs and TPUs are limited by weekly quotas; check the platform's own pages for the current limits.</p></details><details><summary>Can I start on Kaggle without knowing how to code?</summary><p>Yes. The Python course in the Learn section starts from the basics. But Kaggle is not a programming school, so expect to practise regularly and to supplement it with other resources when needed.</p></details><details><summary>Do Kaggle titles help with getting a job?</summary><p>For some employers they can be a positive signal, but they are rarely enough on their own. Work that shows how you framed a problem, explored the data and evaluated your results usually carries more weight.</p></details><details><summary>Why does the difference between public and private leaderboards matter?</summary><p>Because the score you see during a competition is based on only part of the test data. If you tune too much to that part, your performance may drop on the hidden part that decides the final ranking.</p></details></div>

---

**Sources**

- [Kaggle Learn](https://www.kaggle.com/learn)
- [Kaggle – Competitions Documentation](https://www.kaggle.com/docs/competitions)
- [Kaggle – Progression System](https://www.kaggle.com/progression)
- [Moritz Hardt (2015), Competing in a data science contest without reading the data](https://blog.mrtz.org/2015/03/09/competition.html)
- [Blum and Hardt (2015), The Ladder: A Reliable Leaderboard for Machine Learning Competitions – arXiv](https://arxiv.org/abs/1502.04585)
