---
title: "AI in Finance: From Credit Scores to Fraud Detection"
description: "How banks use AI for credit scoring, fraud detection, trading and customer service, and why explainability, fairness and model risk management matter so much."
publishDate: "2026-11-23T09:17:00+03:00"
lang: en
category: "Applications"
tags: ["Finance", "Artificial Intelligence", "Model Risk", "Regulation"]
translation: "finansta-yapay-zeka"
heroImage:
  src: "../../../assets/blog/covers/ai-in-finance.jpg"
  alt: "Finance illustration with a credit card, charts and data flows"
---

Finance was one of the earliest and heaviest adopters of AI. When a card payment is approved in a fraction of a second, or your bank texts you about a suspicious transaction, a model has very likely made that call. In this post I want to walk through four main uses of AI in finance, explain why they come with strict rules, and introduce the idea of "model risk" for a general reader. Because my own work is in model evaluation and AI governance, I will lean towards the explainability and fairness side of the story.

<div class="callout"><strong>Note:</strong> This post is for general information only and is not investment, financial or legal advice.</div>

## Credit scoring: "Should we lend to this person?"

Behind every credit application is one basic question: will this person repay on time? Traditional credit scoring relied on statistical models with a fairly small number of variables, such as payment history, current debt, income and length of credit history. Machine learning arrived with the promise of better predictions by taking more variables, and more complex relationships between them, into account.

There is a trade-off. A more complex model may be slightly more accurate, but it becomes harder to answer "why was I turned down?" And even when gender or ethnicity is never used directly, variables such as postcode or shopping patterns can act as proxies and lead to indirect discrimination. That is why credit models need to be checked not only for accuracy but for how outcomes are distributed across groups.

## Fraud detection: finding the needle in the haystack

Fraud detection is probably the least controversial and most clearly useful application of AI in finance. Every time you use your card, a model weighs the amount, location, time, type of merchant and your own habits, and produces a risk score. If your card is used in your home city and on another continent a few minutes apart, the system notices immediately.

The technical difficulty is that fraud is rare. The overwhelming majority of transactions are legitimate, so a model that simply says "everything is fine" will look extremely accurate on paper and be completely useless. Evaluation should focus instead on how much real fraud is caught and how many innocent customers have their cards blocked unnecessarily. The balance between those two determines both the bank's losses and its customers' patience.

## Algorithmic trading: speed and fragility

A large share of orders on stock exchanges are placed automatically according to predefined rules or models. These systems react far faster than people and can split large orders into small pieces to reduce their market impact. But speed brings fragility. During the US "flash crash" of 6 May 2010, markets fell sharply and recovered within a very short time, and the Securities and Exchange Commission (SEC) and the Commodity Futures Trading Commission (CFTC) examined the events in a joint staff report. Episodes like this are a reminder that automated systems interacting with each other can produce outcomes nobody intended.

A warning for individual investors, too: apps and social media ads that promise "AI-powered, guaranteed returns" are a common form of fraud. No model can guarantee the future.

## Customer service and chatbots

Chat assistants in banking apps are increasingly used for balance checks, blocking a card or simple transactions. Large language models make them sound more natural, but in a field with little room for error two risks stand out: the model giving wrong or invented information, and the confidentiality of customer data. Well-designed systems limit what the bot is allowed to do, require extra verification for sensitive actions and always give the customer a way to reach a human.

## Explainability and fairness: why the rules are strict

Because financial decisions shape people's lives directly, AI in this area is subject to special rules.

The **EU AI Act** (Regulation (EU) 2024/1689) lists in its Annex III, as high-risk, AI systems used to evaluate the creditworthiness of natural persons or establish their credit score, with an exception for systems used to detect financial fraud. Risk assessment and pricing for life and health insurance appear on the same list. High-risk systems carry obligations covering risk management, data governance, record keeping, human oversight and transparency. The application date for these obligations was pushed back to 2 December 2027 by the amending regulation known as the "Digital Omnibus", which entered into force on 27 July 2026.

**Article 22 of the EU's General Data Protection Regulation** protects people, under certain conditions, from decisions based solely on automated processing that significantly affect them, and guarantees the right to obtain human intervention, express a point of view and contest the decision. In its SCHUFA judgment of 7 December 2023 (C-634/21), the Court of Justice of the EU held that a credit score produced by a credit reference agency can fall within this article when a lender draws strongly on it in making its decision.

A real-world case shows the nuances well. In 2019, claims that Apple Card gave women lower credit limits than men spread widely on social media. The New York Department of Financial Services announced the results of its investigation, which included data on about 400,000 applicants, in March 2021: it found no unlawful discrimination under fair lending law. It did, however, say that customer service shortcomings and a perceived lack of transparency had undermined trust that credit decisions were fair. The lesson: even a model that is statistically fair can lose trust if its decisions cannot be explained.

## Model risk management: auditing the model itself

The financial sector institutionalised the idea that "the model itself is a source of risk" early on. The US Federal Reserve's SR 11-7 guidance, published in 2011, describes development, independent validation and governance processes for managing model risk. A central idea is "effective challenge": critical review of a model's assumptions and limits by people who are independent of its developers, competent, and influential enough to make changes happen.

The approach remains just as relevant in the age of machine learning. In practice, model risk management means asking regularly: What data was the model trained on, and does it still represent the present? Is performance drifting over time? How does the model behave under unusual market conditions? Are decisions documented and explainable when needed? Without answers to these questions, even the most advanced model can become a hidden liability.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>AI in finance is used mainly for credit scoring, fraud detection, algorithmic trading and customer service.</li><li>Because fraud is rare, accuracy is misleading; caught cases and false alarms must be weighed together.</li><li>The EU AI Act treats creditworthiness assessment as high-risk, with obligations applying from 2 December 2027.</li><li>Statistical fairness alone is not enough; decisions also need to be explainable to earn trust.</li><li>Model risk management means continually challenging the model through independent eyes.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>What can I do if an automated system rejected my loan application?</summary><p>You can ask your bank for the reasons behind the decision and what information was used. Requesting information about how your personal data was processed is usually possible under the data protection law where you live.</p></details><details><summary>Why did the fraud model block my card?</summary><p>Most likely the transaction looked clearly different from your usual pattern, such as a new country, an unusual amount or an odd time. These systems are deliberately cautious; once you confirm with your bank, things usually return to normal.</p></details><details><summary>Can I trust AI-powered investment apps?</summary><p>No model can guarantee returns. Be wary of platforms that promise guarantees, pressure you to act quickly or whose licence you cannot verify, and check licensing with the relevant regulator.</p></details><details><summary>Is explainable AI less accurate?</summary><p>Not always. In some cases simpler, interpretable models perform close to complex ones. For complex models, explanation methods can also highlight the main factors behind a decision.</p></details></div>

---

**Sources**

- [EUR-Lex – Regulation (EU) 2024/1689 (AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [EU AI Act – Digital Omnibus on AI overview](https://www.euaiact.com/digital-omnibus-ai)
- [GDPR Article 22 – Automated individual decision-making](https://gdpr-info.eu/art-22-gdpr/)
- [NYDFS – Apple Card investigation press release (23 March 2021)](https://www.dfs.ny.gov/reports_and_publications/press_releases/pr202103231)
- [SEC – Joint report on the market events of May 6, 2010](https://www.sec.gov/news/press/2010/2010-179.htm)
