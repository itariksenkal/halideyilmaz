---
title: "Your Data and AI Training: Your Rights and Practical Steps"
description: "How personal data can end up in AI training through web scraping and product use, your rights under KVKK and the GDPR, and practical steps you can take."
publishDate: "2026-11-11T09:17:00+03:00"
lang: en
category: "Privacy"
tags: ["Privacy", "GDPR", "KVKK", "Artificial Intelligence"]
translation: "verilerimiz-yapay-zeka-egitiminde"
heroImage:
  src: "../../../assets/blog/covers/your-data-and-ai-training.jpg"
  alt: "Abstract illustration of personal data icons flowing into an AI model"
---

A social media post, a comment on a forum, a question typed into a chatbot, a document uploaded to an app: do we know whether any of these have been used to train AI models? Most of us either never think about it or shrug it off as something we cannot change. In this post I outline the main ways personal data can end up in AI training, the rights people have under Turkey's KVKK and the EU's GDPR, and what you can realistically do about it.

*This post is for general information only and is not legal advice. For a specific situation, please consult a legal professional.*

## How does data end up in training?

There are two main routes.

**1. Web scraping.** Large language models are trained on huge collections of text and images gathered automatically from publicly accessible web pages. In guidelines on web scraping for generative AI, adopted for public consultation on 7 July 2026, the European Data Protection Board (EDPB) describes this as a large-scale processing activity that often happens without the people concerned being aware of it. Information being "public" does not stop it from being personal data.

**2. Product and service data.** The apps we use can also be a source: what we type into chatbots, files we upload, feedback we give, posts on a platform. Whether and under what conditions this data is used for model development differs between services, and sometimes between the personal and business versions of the same service.

| Source | Example | How much control you have |
|---|---|---|
| Public web | Blog posts, forum comments, public profiles | Limited: removing content, platform privacy settings, requests to the controller |
| In-product data | Chat history, uploaded files, feedback | Usually training preferences and chat history options in settings |
| Third-party datasets | Data bought from or shared by data brokers | Access requests and other rights requests |

## The European picture: the GDPR and the EDPB

In the EU, the framework is set largely by the General Data Protection Regulation (GDPR) and by the EDPB, which interprets it. In December 2024 the EDPB published Opinion 28/2024 on AI models. Its main points can be summarised as follows:

- Whether a model trained on personal data counts as "anonymous" must be assessed case by case. It should be very unlikely both that the model identifies people whose data was used in training and that such data can be extracted through queries.
- Companies can rely on "legitimate interest" as a legal basis, but only if they pass a three-step test. Relevant factors include whether the data was public and whether people could reasonably expect such use.
- A model developed with unlawfully processed data may face problems when it is later deployed, unless it has been properly anonymised.

For individuals, the key consequence is this: where processing relies on legitimate interest, the GDPR gives you a **right to object** on grounds relating to your particular situation. You also have rights of access, rectification and erasure.

## The Turkish picture: KVKK

In Turkey the main law is the Personal Data Protection Law No. 6698 (KVKK). Under Article 11, anyone can apply to a data controller to:

- Find out whether their personal data is processed and, if so, request information about it,
- Learn the purpose of processing and whether data is used in line with that purpose,
- Know the third parties, in Turkey or abroad, to whom data has been transferred,
- Request correction of incomplete or inaccurate data,
- Request erasure or destruction of data, and ask that third parties who received it be notified,
- Object to an outcome against them that results from analysis carried out exclusively by automated systems,
- Claim compensation for damage caused by unlawful processing.

One difference is worth noting: the objection right in KVKK is narrower than the GDPR's general right to object, being limited to analysis by automated systems.

According to the Authority's guidance, the controller must conclude an application within thirty days at the latest, free of charge as a rule. If the application is rejected, the answer is unsatisfactory or no answer arrives in time, a complaint can be made to the Personal Data Protection Board within thirty days of learning of the answer, and in any case within sixty days of the application.

On 24 November 2025 the Authority also published its guide "Generative AI and the Protection of Personal Data (in 15 Questions)", which assesses data processing by generative AI systems under Law No. 6698 and includes advice for individuals.

<div class="callout"><strong>Tip:</strong> Before exercising your rights, read the company's privacy policy or privacy notice. Contact channels, how to apply and whether data is used for training are usually described there.</div>

## How opt-out settings generally work

I will not walk through specific companies' settings here, because they change often and need to be checked for each product at the time. The general logic, though, is usually this:

- **In-product preference:** many chatbots and AI services offer a setting to stop your conversations being used to improve models. It may be switched on or off by default.
- **Forward-looking effect:** switching a setting off generally affects future data. "Removing" data from a model that has already been trained is technically hard and handled differently by different services.
- **Forms and requests:** some companies offer separate forms for objection or deletion requests beyond the settings menu. These can be a way to exercise your legal rights.
- **For site owners:** if you run your own website, there are technical ways to block certain crawlers. The EDPB's web scraping guidelines also suggest, as a safeguard, that data collectors exclude websites that clearly object to scraping.

## Practical steps

1. **Think before you share.** Do not type ID numbers, health information, customer data or confidential work documents into chatbots.
2. **Review your settings.** Check the training, chat history and retention settings in the AI tools you use.
3. **Separate work and personal accounts.** Use work data only in tools your organisation has approved.
4. **Review your public content.** Old profiles and posts can be scraped too.
5. **Apply if needed.** Make a written request to the controller to find out how your data is processed, and use the complaint route if the answer is unsatisfactory.

<div class="callout"><strong>Tip:</strong> When you make a request, state clearly which service, which account and which time period you mean, and keep a copy. Specific, documented requests tend to get faster results.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Personal data can enter AI training through web scraping and through in-product usage data.</li><li>Public information is still personal data.</li><li>The GDPR gives a general right to object to processing based on legitimate interest; the KVKK objection right is narrower.</li><li>Opt-out settings usually work going forward and differ between services.</li><li>The most effective protection is thinking before you share and checking settings regularly.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Can my public posts be used without permission?</summary><p>Being public does not mean data can be used freely for any purpose. Processing still needs a legal basis and must respect data protection principles; the details depend on national law.</p></details><details><summary>Can I make a trained model "forget" my data?</summary><p>Technically this is difficult. You can exercise your erasure and objection rights, but how that affects a model that has already been trained depends on the service and the situation.</p></details><details><summary>What is the main difference between KVKK and the GDPR?</summary><p>Both rest on similar principles, but scope and some rights differ. For example, the GDPR's general right to object does not appear in KVKK with the same breadth.</p></details><details><summary>What if a company ignores my request?</summary><p>Under KVKK, you can complain to the Personal Data Protection Board within thirty days of learning of the answer, and in any case within sixty days of your application. In the EU, you can complain to your national data protection authority.</p></details></div>

---

**Sources**

- [KVKK – Kanun Kapsamındaki Hak ve Yükümlülükler (rights and obligations under the law)](https://www.kvkk.gov.tr/Icerik/4192/Kanun-Kapsamindaki-Hak-ve-Yukumlulukler)
- [KVKK – Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi (15 Soruda)](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda)
- [EDPB – EDPB opinion on AI models: GDPR principles support responsible AI (December 2024)](https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en)
- [EDPB – Guidelines 03/2026 on web scraping in the context of generative AI (public consultation version)](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_2020603_webscraping_v1_en_0.pdf)
- [EDPB – SME Data Protection Guide: Respect individuals' rights](https://www.edpb.europa.eu/sme-data-protection-guide/respect-individuals-rights_en)
