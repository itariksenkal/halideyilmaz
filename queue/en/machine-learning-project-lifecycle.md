---
title: "The Life Cycle of a Machine Learning Project"
description: "From framing the problem to monitoring: CRISP-DM phases, success metrics, data, a simple baseline, iteration, deployment and knowing when to stop."
publishDate: "2026-12-01T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Machine Learning", "CRISP-DM", "Project Management"]
translation: "makine-ogrenmesi-projesinin-yasam-dongusu"
heroImage:
  src: "../../../assets/blog/covers/machine-learning-project-lifecycle.jpg"
  alt: "A circular diagram of a machine learning process running from problem framing to monitoring"
---

When people hear "machine learning", most of us think of the model first: which algorithm, how many layers, what accuracy. In real projects, though, the model is only one piece. Whether a project succeeds is usually decided by the questions asked before any model is built and by the follow-up after it goes live. Working on model evaluation, I have come to believe that most problems come not from "the wrong model" but from a badly framed problem or data that nobody is watching. In this post I walk through the full life cycle of a machine learning project, using a simple, made-up example.

## The framework: CRISP-DM

One of the best-known frameworks for this process is **CRISP-DM** (Cross-Industry Standard Process for Data Mining). Its first version was published in 2000 by a consortium that included experts from NCR, SPSS and DaimlerChrysler. It is still widely used because it offers a plain, technology-neutral way of thinking. It has six phases:

| Phase | Core question |
|---|---|
| Business understanding | What problem are we solving, for whom, and why? |
| Data understanding | What data do we have, and how reliable is it? |
| Data preparation | How do we get the data into a form a model can use? |
| Modeling | Which approaches will we try? |
| Evaluation | Does the result actually meet the business need? |
| Deployment | How will the model be put into real use? |

An important point: these phases are not a straight line but a cycle. In practice you go back often; a problem found during evaluation can send you back to the data, or even to the definition of the problem. I will also add one step that is not explicit in the original CRISP-DM but is considered essential today: **monitoring**.

Throughout the post, let's use this imaginary example: a mid-sized online shop wants to route customer support emails automatically to the right team (shipping, returns, payments, technical issues).

## 1. Defining the problem and what success means

The first question should not be "which model should we use?" but "what do we want to improve?" In our example, the real goal might be to shorten the time until a customer gets a first reply. Automatic routing is just one way of getting there.

At this stage you need two kinds of metrics:

- **A business metric:** for example, average time to first reply, or the share of emails sent to the wrong team.
- **A model metric:** for example, classification accuracy, or precision and recall for each team separately.

Make sure the two are linked. If the model metric goes up while the business metric stays flat, you may be optimising the wrong thing. Google's "Rules of Machine Learning" guide also puts designing metrics among its very first rules, before building a model. Its first rule is worth remembering too: don't be afraid to launch a product without machine learning. Sometimes a few simple rules solve most of the problem.

<div class="callout"><strong>Tip:</strong> Before starting, write a one-sentence answer to "Which decision will this model change, and who makes that decision?" If you cannot write it, the problem is not clear enough yet.</div>

## 2. Understanding and preparing the data

In our example, the data is past emails plus the team that eventually resolved each one. At first glance it looks like ready-made labelled data, but questions appear quickly:

- If an email went to the wrong team and was then forwarded, which label counts as "correct"?
- Do some categories have very few examples? (If technical issues are a small share of the total, the model may neglect that class.)
- Does the data contain personal information, and is there a proper basis for processing it?
- Does last year's data represent today? If a new payment method was added, complaints about it will not appear in older data at all.

Data preparation is usually the most time-consuming part of a project, and that time is not wasted. Checking label consistency, removing duplicate records and splitting training and test data correctly determine how trustworthy every later step will be.

## 3. A simple baseline

Before moving to a complex model, always build a **baseline**. In our example that might be a few rules looking for keywords such as "delivery", "refund" or "invoice", or a simple text classifier. Even simpler: send every email to the most common category.

A baseline does two jobs. First, it lets you measure whether a more advanced model really makes a difference. Second, it forces you to set up the data flow, evaluation and infrastructure early. The same Google guide recommends keeping the first model simple and getting the infrastructure right.

## 4. Iteration and evaluation

After the baseline, stronger approaches are tried. A common mistake here is to look at the test set again and again and pick the best result. That makes the model quietly adapt to the test set. A healthier approach is to use a separate validation set or cross-validation and save the test set for the very end.

Evaluation is also more than one number. In our example, these questions matter:

- In which categories does the model make the most mistakes?
- Do all errors cost the same? Is a payment issue going to the technical team worse than a shipping question going to returns?
- What happens when the model is unsure? Sending uncertain emails to a person is often the wisest option.

## 5. Deployment

When the model performs well, the work is not over; a new phase begins. The 2015 paper "Hidden Technical Debt in Machine Learning Systems" stressed that in real systems the model code is a small part, while components such as data collection, verification, configuration, serving and monitoring create a much larger burden.

A few practical points for going live:

- **Gradual rollout:** let the model only suggest at first, with a person making the decision. If results are good, move to automatic routing.
- **A rollback plan:** if something goes wrong, you need to be able to switch back to the old rules quickly.
- **A feedback loop:** making it easy for teams to flag misrouted emails both catches errors and improves future training data.

## 6. Monitoring, and knowing when to stop

A model in production can degrade over time because the world changes. The shop opens a new product category, a sales season starts, customers change how they write. This is broadly called **data drift**. Things worth monitoring include:

- Does the incoming data still look like the training data?
- Is the share of emails the model is unsure about rising?
- Is the business metric (time to first reply) still improving?

So when should you stop? I would say in three situations: when further model improvements no longer make a meaningful difference to the business metric; when maintenance costs outweigh the benefit; or when the problem itself has changed. Deliberately ending a project is not a failure; it is a sound engineering decision.

<div class="callout"><strong>Note:</strong> In some sectors, such as healthcare, finance and hiring, model decisions directly affect people's lives. There, evaluation and monitoring need to be much stricter and must cover legal and ethical obligations as well.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>A machine learning project starts not with a model but with a clear problem definition and linked business and model metrics.</li><li>The six CRISP-DM phases form a cycle, not a line; going back is a natural part of the process.</li><li>A simple baseline provides a point of comparison and gets the infrastructure built early.</li><li>Deployment should be gradual, with a rollback plan and a feedback loop.</li><li>Without monitoring, models degrade silently; stopping a project when its value fades is a valid decision.</li></ul></div>

<div class="faq"><details><summary>Is CRISP-DM still relevant?</summary><p>The technical details have changed, but its core phases still hold. Many teams use it extended with steps such as monitoring and continuous retraining.</p></details><details><summary>Why does a baseline matter so much?</summary><p>Because you can only tell whether a more complex model is actually useful by comparing it with a simple reference. Sometimes the simple solution is good enough and the complex model is not worth its maintenance cost.</p></details><details><summary>How often should a model be retrained?</summary><p>There is no single right answer. The faster the data changes, the more often it is needed. The healthiest approach is to decide based on monitoring signals rather than a fixed calendar.</p></details><details><summary>How do I know a project has failed?</summary><p>If the business metric is not improving even though model metrics look good, or if users do not trust and use the model's output, the project is not reaching its goal. That is the moment to revisit how the problem was defined.</p></details></div>

---

**Sources**

- [IBM SPSS Modeler documentation – CRISP-DM overview](https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview)
- [Google for Developers – Rules of Machine Learning (Martin Zinkevich)](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Sculley et al. (2015), Hidden Technical Debt in Machine Learning Systems – NeurIPS](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html)
- [Google Machine Learning Crash Course – Production ML Systems](https://developers.google.com/machine-learning/crash-course/production-ml-systems)
