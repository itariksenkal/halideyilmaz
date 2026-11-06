---
title: "Correlation vs Causation: Why Moving Together Is Not Enough"
description: "Correlation versus causation with memorable examples: confounders, reverse causation, spurious correlations, randomised trials and reading headlines critically."
publishDate: "2026-11-12T09:17:00+03:00"
lang: en
category: "Statistics"
tags: ["Statistics", "Data Literacy", "Critical Thinking"]
translation: "korelasyon-ve-nedensellik"
heroImage:
  src: "../../../assets/blog/covers/correlation-vs-causation.jpg"
  alt: "Two rising line charts with a question mark between them"
---

"Coffee drinkers live longer." "Children who read more do better at school." "Companies that use this tool grow faster." We read sentences like these every day, and the same question sits underneath all of them: does the fact that two things appear together mean one causes the other? In statistics this is the distinction between correlation and causation, and I think it is the most basic and most useful lesson in data literacy. In this post I explain the difference with memorable examples and suggest a few simple questions to ask the next time you read a headline.

## What is correlation, and what is causation?

**Correlation** is the tendency of two variables to change together. If one rises as the other rises, the correlation is positive; if one rises as the other falls, it is negative. It is purely a measurement and says nothing about why.

**Causation** means that changing one thing changes the other. It is being able to say: "If I change X, Y will change too."

The difference looks innocent, but it has big consequences in daily life, health, business and policy. A wrong assumption of causation can turn into a treatment that does not work, a wasted investment or a misguided public policy.

## Confounders: the hidden cause behind the scenes

The classic example: in summer, ice cream sales go up and so do drownings. You will find a clear correlation between the two. But ice cream does not drown people. A third factor drives both: hot weather. When it is hot, people eat more ice cream and more people go swimming.

That third factor is called a **confounder**. A less obvious example: a study published in 1999 reported that children who slept with a night light were more often short-sighted. Later research pointed to parental short-sightedness as a common factor: short-sighted parents were more likely to have short-sighted children and may also have been more likely to leave a light on at night.

| Relationship | What we see | Possible explanation |
|---|---|---|
| Ice cream sales and drownings | Rise together | Confounder: hot weather |
| Night lights and childhood short-sightedness | Appear together | Confounder: parents' short-sightedness |
| Windmill speed and wind | Rise together | Reverse direction: wind turns windmills, not the other way round |
| Two unrelated yearly data series | Almost identical curves | Chance: inevitable when you compare enough data |

## Reverse causation: which way does the arrow point?

Sometimes two things really are causally linked, but the arrow points the opposite way from what we assume. When windmills spin fast, the wind is strong; but windmills do not make wind. A more serious example: some studies have linked low cholesterol to higher mortality. Because some diseases can lower cholesterol, low cholesterol may be a symptom of an underlying illness rather than a cause of death.

## Spurious correlations: look hard enough and you will find them

Tyler Vigen's "Spurious Correlations" website collects the most entertaining examples of this. It compares thousands of variables against each other and finds curves that match by pure coincidence. One shows a striking match, over many years, between the distance from Saturn to the Sun and Google searches for "how to make baby".

The message is simple: compare enough variables and some will move together purely by chance. This is especially easy with time series that have only a handful of yearly data points. In the age of big data, this risk grows rather than shrinks.

<div class="callout"><strong>Tip:</strong> When two curves overlap neatly on one chart, look at the axes. Two vertical axes on different scales and a truncated starting point can make a weak relationship look very strong.</div>

## Why randomised experiments matter so much

The most powerful way to get rid of confounders is a **randomised controlled trial**. Participants are randomly split into two groups: one receives the intervention, such as a drug, and the other does not or receives standard care. Because assignment is random, factors such as age, health and lifestyle, including ones nobody thought to measure, balance out between the groups on average. That makes it far more reliable to attribute any difference to the intervention. When it explains clinical trials, the UK's NHS also stresses that comparable groups and blinding, where people do not know who receives which treatment, help reduce bias.

History offers an instructive example. For a long time, hormone therapy after menopause was thought to protect against heart disease. Randomised trials within the large US Women's Health Initiative found that it did not prevent heart disease in post-menopausal women "as was once thought", and that combined therapy raised some risks. The association seen in observational data probably reflected the fact that women who took hormone therapy differed in other ways too.

Of course, not every question can be answered with an experiment. You cannot randomly assign people to smoke to measure its harm. In such cases researchers draw stronger conclusions about causation by looking at whether many different kinds of evidence point the same way, at the strength of the association, at the order in time and at whether there is a plausible biological mechanism.

## Reading headlines critically

Next time you see "X reduces the risk of Y", ask:

1. **Is this an experiment or an observation?** In observational studies, "associated with" often becomes "causes" by the time it reaches the headline.
2. **What could the confounder be?** Might coffee drinkers also differ in smoking, income or general health?
3. **Which way does the arrow point?** Perhaps Y leads to X.
4. **How many people, and who?** Mice, a hundred people or a hundred thousand?
5. **How big is the effect?** "Raises the risk by 50%" means something different if the risk goes from 2 in 1,000 to 3 in 1,000.
6. **What do other studies say?** A single study is rarely the last word.

<div class="callout"><strong>Note:</strong> Phrases such as "linked to", "associated with" or "tied to" usually signal an observational study. A headline that says "causes" or "prevents" often claims more than the study did.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Correlation measures moving together; causation means changing one thing changes the other.</li><li>Confounders can make us see a cause-and-effect link that is not there.</li><li>Reverse causation and chance (spurious) correlations are common traps too.</li><li>Randomised controlled trials are the strongest way to test causation.</li><li>With headlines, question the study type, the sample and the size of the effect.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>So is correlation no evidence of causation at all?</summary><p>On its own it is not enough, but it can be a clue. Correlation is a starting point; it needs to be followed by studies that deal with confounders and, where possible, use experimental designs.</p></details><details><summary>Can machine learning models find causes?</summary><p>Standard predictive models exploit correlations and do not establish causation on their own. Causal inference needs dedicated methods and careful study design.</p></details><details><summary>What about questions that cannot be tested with experiments?</summary><p>Then researchers weigh several things together: consistent evidence from many different kinds of studies, the strength of the association, the order in time and a plausible biological or logical mechanism.</p></details></div>

---

**Sources**

- [Tyler Vigen – Spurious Correlations](https://www.tylervigen.com/spurious-correlations)
- [NHLBI – Women's Health Initiative (WHI)](https://www.nhlbi.nih.gov/science/womens-health-initiative-whi)
- [NHS – Clinical trials](https://www.nhs.uk/conditions/clinical-trials/)
- [American Statistical Association – Statement on Statistical Significance and P-Values (2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
