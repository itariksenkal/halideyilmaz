---
title: "Data Literacy: How to Read the Numbers in the News"
description: "A plain guide to reading charts and percentages, telling relative from absolute risk, asking 'compared to what?', questioning samples, plus a checklist."
publishDate: "2026-11-28T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Data Literacy", "Statistics", "Media Literacy"]
translation: "veri-okuryazarligi"
heroImage:
  src: "../../../assets/blog/covers/data-literacy.jpg"
  alt: "A bar chart and percentage signs examined under a magnifying glass"
---

"New study: eating X raises your risk by 50%." How do you react to a headline like that? For most of us the first reaction is worry, and the second might be to share it. Yet on its own that sentence says almost nothing: which risk, for whom, compared to what, and by how much? Data literacy is precisely the ability to ask those questions. Because I work on data quality, I see every day how easily numbers can be misread. In this post I want to share a few basic tools, with no statistics background needed, for reading the figures we meet in the news and on social media more carefully.

## What is data literacy?

Data literacy can be described as the ability to read, understand, question and, when needed, accurately pass on claims based on data. It is not about memorising formulas. It is more of a habit: when you meet a number, pausing to ask "Where does this come from, what does it measure, and what does it leave out?"

This is no longer a skill for analysts alone. Health stories, economic indicators, election polls, product ads and claims that an AI system is "95% accurate" all ask us to interpret a number. Misreading them can lead to poor health decisions, needless panic or misplaced confidence.

## Reading charts: look at the axes first

Charts convey information quickly, and they can mislead just as quickly. A few things are worth checking whenever you look at one:

- **Does the vertical axis start at zero?** In bar charts, a truncated axis makes small differences look huge. The gap between 50% and 52% can make one bar look three times taller than the other if the axis starts at 49.
- **How was the time window chosen?** The start and end dates picked to show a trend can change the whole story. Something falling over the long run can appear to be rising over a carefully chosen short window.
- **Are there two different axes?** Charts with differently scaled axes on the left and right can make two unrelated lines look as though they move together.
- **What is the unit?** Totals, per person, or percentages? A big city having more total cases than a small town is not surprising; comparisons usually need rates.

<div class="callout"><strong>Tip:</strong> Before interpreting a chart, read its title, axis labels, units and source. It takes ten seconds and prevents a large share of misreadings.</div>

## Percentages: "percent" and "percentage points" are not the same

Percentages are part of everyday language, but one distinction is often confused. Imagine a loan's interest rate rising from 10% to 12%. That is an increase of **2 percentage points**, but relative to the starting value it is **a 20% increase**. You can describe the same change as "rates rose by just 2 points" or "rates rose by 20%", and both are technically correct. Which one is chosen often reflects the impression the speaker wants to leave.

Another trap is the denominator. When you read that "80% of participants were satisfied", it is worth asking how many participants there were. Four out of five people is 80%, and so is four thousand out of five thousand. Generalising from the first is far riskier.

## Relative risk and absolute risk

The most common misleading pattern in headlines is reporting relative risk alone. A simple, hypothetical example:

| | People who don't do something | People who do |
|---|---|---|
| Fall ill, per 10,000 people | 2 people | 3 people |
| Relative risk increase | | 50% |
| Absolute risk increase | | 1 in 10,000 people |

"Raises the risk by 50%" is true, but in absolute terms the difference is one person in ten thousand. Which figure we are given directly shapes our decisions. That is why organisations such as the Harding Center for Risk Literacy, part of the Max Planck Institute for Human Development in Berlin, argue for communicating risks with absolute numbers and baseline rates.

A well-known example of how much this can matter comes from the UK. In October 1995, UK health authorities warned that certain "third-generation" contraceptive pills roughly doubled the risk of serious blood clots compared with older pills. Although the absolute risk was low, the "double" message caused widespread alarm. According to an analysis published in the BMJ in 2000, the share of prescriptions for these pills fell from 53% to 14% after the warning. Increases in unplanned pregnancies and abortions were also reported in the following period, linked to women stopping the pill. A figure that was accurate but stripped of context had consequences nobody intended.

## "Compared to what?" and "Who was asked?"

These may be the two most powerful questions to ask about any statistic.

**"Compared to what?"** A number only gains meaning through comparison. "There were 500 road accidents this year" says little without last year's figure, a similar-sized city for reference, or the number of vehicles on the road. Is it a rise, a fall, expected or unusual? A number without a point of comparison invites guessing rather than interpretation.

**"Who was asked?"** Surveys and studies look at a sample, not the whole population. If the sample does not represent the population of interest, the result can be misleading however large it is. An online poll on a website reaches only people who follow that site and care about the topic. Concluding "dropping out of school leads to success" from interviews with successful entrepreneurs means never seeing those who did not succeed; this is known as survivorship bias.

And one more common confusion: **correlation is not causation.** Two things rising together does not show that one causes the other. Ice cream sales and drownings both rise in summer, but ice cream does not cause drowning; hot weather drives both.

## A checklist for a statistic in the news

When you come across a striking figure in a news story or post, you can work through these questions:

1. **Who is the source?** Who produced the figure, and do they have an interest in a particular result?
2. **What was measured?** Exactly what, and under which definition?
3. **How many people, and who?** How large is the sample, and does it represent the population of interest?
4. **Compared to what?** What is the reference point: last year, another group?
5. **Relative or absolute?** What are the actual numbers behind "an X% increase"?
6. **Correlation or cause?** Was the study designed in a way that could show causation?
7. **Is the chart honest?** Are the axes, time window and units misleading?
8. **What do other sources say?** Is this a single study, or is the finding supported by others?

You do not need an answer to every question, but simply asking them creates a pause before believing or sharing automatically.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Data literacy is not about formulas; it is the habit of asking the right questions when you meet a number.</li><li>Checking axes, time windows and units prevents most chart misreadings.</li><li>Percent and percentage points differ, and the size of the denominator matters as much as the result.</li><li>Relative risk alone can mislead; always look for absolute numbers and the baseline rate.</li><li>"Compared to what?" and "Who was asked?" are the most powerful tools for judging a statistic.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Do I need to know statistics to be data literate?</summary><p>No. Understanding basic ideas such as percentages, rates, samples and comparisons, and asking the right questions, is enough in most cases. Knowing when to turn to experts and reliable sources is also part of data literacy.</p></details><details><summary>How big does a sample need to be?</summary><p>There is no single magic number; the size needed depends on what is measured and how precise the answer must be. Representativeness matters as much as size: a huge but biased sample can mislead more than a small, well-chosen one.</p></details><details><summary>Is relative risk always misleading?</summary><p>No, relative risk is a useful measure; the problem arises when it is given alone. The healthiest approach is to present it together with the baseline rate and the absolute difference.</p></details><details><summary>Where can I check whether a statistic is accurate?</summary><p>Where possible, look at the original study behind the story, publications from official statistics agencies or analyses by independent fact-checkers. If a story names no source at all, that is a warning sign in itself.</p></details></div>

---

**Sources**

- [Harding Center for Risk Literacy](https://hardingcenter.de/en)
- [Sense About Science and Straight Statistics – Making Sense of Statistics](https://fullfact.org/files/making_sense_of_statistics.pdf)
- [Centre for Investigative Journalism – Statistics for Journalists](https://journalistsresource.org/wp-content/uploads/2015/03/CIJ_Statistics_for_Journalists_26_05_11.pdf)
- [BMJ (2000) – Effect of 1995 pill scare on rates of venous thromboembolism](https://pmc.ncbi.nlm.nih.gov/articles/PMC27461)
