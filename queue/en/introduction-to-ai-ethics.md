---
title: "An Introduction to AI Ethics: Six Principles, Real Examples"
description: "What fairness, transparency, accountability, privacy, safety and human oversight mean in practice, with the OECD and UNESCO frameworks and ethics vs law."
publishDate: "2026-11-22T09:17:00+03:00"
lang: en
category: "Governance"
tags: ["Artificial Intelligence", "Ethics", "Governance"]
translation: "yapay-zeka-etigine-giris"
heroImage:
  src: "../../../assets/blog/covers/introduction-to-ai-ethics.jpg"
  alt: "Illustration of an AI chip balanced on a pair of scales"
---

"AI ethics" can sound like either an abstract philosophy debate or a set of nice sentences on a company's website. In practice it is very concrete. Systems that reject a loan application, screen out a CV or flag a family as possible fraudsters reach straight into people's lives. Since I work on AI governance, I want to use this post to unpack the six principles you hear about most often with everyday examples, touch briefly on the main international frameworks, and make the difference between ethics and law a little clearer.

## Why AI ethics became its own topic

Every technology has an ethical side, but three features of AI push the question forward. The first is scale: one person's bad decision affects a few people, while a flawed model can repeat the same mistake millions of times. The second is opacity: many models do not explain how they reached a result in a way people can easily follow. The third is dependence on data: a model can quietly learn the biases in historical data and reproduce them.

Put those together and a system built by people with no bad intentions can still cause serious harm. Ethical principles are best thought of as a list of questions to ask early, while there is still time to change the design.

## Six core principles in plain terms

Different organisations use different names, but most frameworks converge on roughly the same headings.

| Principle | The question to ask | A concrete example |
|---|---|---|
| Fairness | Does the system systematically give worse results to some groups? | A hiring model that quietly screens out candidates from a particular school or gender |
| Transparency | Do people know they are dealing with AI, and how the decision was made? | A customer service chat that never says it is a bot |
| Accountability | When something goes wrong, who is responsible and where do you appeal? | An organisation that says "the system decided" and refuses to review the case |
| Privacy | Which data is used, for what purpose, and for how long? | Photos collected for one purpose reused to train a model without permission |
| Safety and robustness | How does the system behave in unexpected situations or under misuse? | An image model that a tiny change to the input can fool |
| Human oversight | Is there meaningful human involvement in critical decisions? | A process where a person only clicks "approve" and never really reviews anything |

The last row deserves attention. Saying "there is a human in the loop" is not enough. That person needs the information to understand the decision, the time to question it and the authority to change it. Otherwise oversight exists only on paper.

## A cautionary tale: the Dutch childcare benefits scandal

One of the clearest illustrations comes from the Netherlands. According to Amnesty International's 2021 report "Xenophobic Machines", the Dutch tax authorities began using an algorithmic system in 2013 to detect incorrect and potentially fraudulent childcare benefit applications. The system treated not having Dutch nationality as a risk factor. Amnesty reports that tens of thousands of parents and caregivers, mostly from low-income families, were wrongly accused of fraud, with ethnic minorities disproportionately affected and some families facing debt, unemployment and eviction. The scandal brought down the Dutch government in January 2021.

Almost every principle in the table failed at once: fairness (discrimination based on nationality), transparency (people did not know why they were flagged), accountability (appeal routes did not work) and human oversight (according to Amnesty, the officials reviewing flagged cases were not told why the system had scored them as high risk). This is why ethical principles should be seen not as a "nice to have" list but as a checklist that prevents real harm.

<div class="callout"><strong>Tip:</strong> When judging any AI system, ask yourself: "When this system gets a decision wrong, how does the affected person find out, and who do they appeal to?" If there is no clear answer, something is missing, however accurate the system is.</div>

## International frameworks: OECD and UNESCO

Two international texts have done a lot to create a shared vocabulary.

The **OECD AI Principles** were first adopted in May 2019 and updated in May 2024 to reflect new technological and policy developments. They contain five values-based principles: inclusive growth, sustainable development and well-being; human rights and democratic values, including fairness and privacy; transparency and explainability; robustness, security and safety; and accountability. Alongside these sit five recommendations for policymakers. The OECD's site lists 47 adherents.

The **UNESCO Recommendation on the Ethics of Artificial Intelligence** was adopted in November 2021 by UNESCO's 193 Member States. It sets out four core values (human rights and dignity; just, peaceful and interconnected societies; diversity and inclusiveness; and flourishing environments and ecosystems) and ten principles, including proportionality and do no harm, privacy, transparency and explainability, human oversight, sustainability, and awareness and literacy.

Neither text is legally binding; both are guidance that shapes national and organisational policy. Because they created a common vocabulary, though, much of the legislation that followed is built on the same concepts.

## Are ethics and law the same thing?

In short, no. Law sets the minimum that society insists on; ethics asks "what is the right thing to do?" and is usually broader. Something can be legal and still ethically troubling. A company may use customer data within legal limits by relying on a long clause in terms of service that nobody reads, yet still go against what users would reasonably expect.

Some ethical principles do become law over time. The European Union's AI Act (Regulation (EU) 2024/1689) bans certain uses outright and places obligations such as transparency, human oversight and record keeping on high-risk systems. Article 22 of the EU's General Data Protection Regulation gives people, under certain conditions, the right not to be subject to decisions based solely on automated processing that significantly affect them, along with the right to obtain human intervention and contest the decision. In Türkiye, the Personal Data Protection Law No. 6698 applies whenever personal data is involved.

The gap between ethics and law matters most with fast-moving technology, because law usually trails behind. In the meantime, deciding what is acceptable falls to the people who design and deploy these systems.

## Where to start in practice

Putting AI ethics into practice does not require a large committee. A few concrete habits change a lot: breaking down results by group before a model goes live; documenting where training data came from and under what permissions it was collected; telling users clearly when they are dealing with AI; defining a real route for appeal and correction; and monitoring the system after launch, not only before. As individuals, using our right to question a decision, ask for an explanation and ask how our data is used also helps turn these principles into reality.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>AI ethics is not abstract: because of scale, opacity and data dependence, it works as a checklist for preventing real harm.</li><li>Fairness, transparency, accountability, privacy, safety and human oversight appear in most frameworks.</li><li>The OECD principles were adopted in 2019 and updated in 2024; the UNESCO Recommendation was adopted by 193 Member States in 2021.</li><li>Law sets the floor and ethics is broader, but laws such as the EU AI Act are turning some principles into obligations.</li><li>Meaningful human oversight requires information, time and authority, not just a person in the loop.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Are AI ethics principles binding?</summary><p>Texts like the OECD principles and the UNESCO Recommendation are guidance, not binding law. Regulations such as the EU AI Act and data protection laws, however, turn some of these principles into enforceable obligations.</p></details><details><summary>Is a completely unbiased AI possible?</summary><p>Perfect neutrality is hard in practice, because data and design choices always carry assumptions. The realistic goal is to keep measuring bias, make it visible and reduce it over time.</p></details><details><summary>Is explainability always necessary?</summary><p>The level of explanation needed depends on the stakes. Knowing why a film was recommended may not matter much; understanding the main reasons behind a credit, hiring or welfare decision matters a great deal.</p></details><details><summary>What can I do as an individual?</summary><p>You can ask whether a decision was automated, request an explanation and a human review, and ask how your data is processed. These requests protect your own rights and encourage organisations to be more careful.</p></details></div>

---

**Sources**

- [OECD – AI Principles](https://oecd.ai/en/ai-principles)
- [UNESCO – Recommendation on the Ethics of Artificial Intelligence](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)
- [Amnesty International – Xenophobic machines: Dutch child benefit scandal (2021)](https://www.amnesty.org/en/latest/news/2021/10/xenophobic-machines-dutch-child-benefit-scandal/)
- [EUR-Lex – Regulation (EU) 2024/1689 (AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [GDPR Article 22 – Automated individual decision-making](https://gdpr-info.eu/art-22-gdpr/)
