---
title: "Facial Recognition and Privacy: Technology, Error Rates and Rights"
description: "How facial recognition works, why error rates differ across groups, how KVKK and the GDPR protect biometric data, and what the EU AI Act restricts."
publishDate: "2026-11-26T09:17:00+03:00"
lang: en
category: "Privacy"
tags: ["Facial Recognition", "Privacy", "Biometric Data", "GDPR"]
translation: "yuz-tanima-ve-mahremiyet"
heroImage:
  src: "../../../assets/blog/covers/facial-recognition-and-privacy.jpg"
  alt: "A biometric map of dots and lines traced over facial features"
---

You can change a password and cancel a credit card, but you cannot change your face. That is what sets facial recognition apart from most other AI applications: the data it uses is permanently tied to us and can often be collected without our knowledge. There is a big difference between uses we choose, such as unlocking our own phone, and cameras scanning everyone in a busy square. In this post I want to explain how facial recognition works, why it is not equally accurate for everyone, how biometric data is protected in law in Türkiye and Europe, and what we can do as individuals.

<div class="callout"><strong>Note:</strong> This post is general information, not legal advice. For a specific situation, please consult a lawyer.</div>

## How does facial recognition work?

Facial recognition systems usually work in four steps. First, **detection**: find the regions of an image that contain faces. Then **alignment**: rotate and scale the face into a standard position based on the eyes and mouth. Next, **feature extraction**: a neural network turns the face into a long string of numbers, often called a template. Finally, **comparison**: the template is compared with stored templates, and if the similarity is above a set threshold, the system declares a match.

It is important to distinguish two different uses:

| Use | The question | Example |
|---|---|---|
| Verification (1:1) | "Is this person who they claim to be?" | Unlocking a phone, an airport passport gate |
| Identification (1:N) | "Which person in the database is this?" | Searching a large database for someone seen on camera |

The threshold creates a trade-off. Set it low and the system matches more people, but false matches (false positives) rise; set it high and false matches fall, but failures to recognise the right person (false negatives) rise. Failing to unlock your phone is an inconvenience; being wrongly matched in a criminal investigation can have far more serious consequences.

## Is accuracy the same for everyone? What NIST found

The US National Institute of Standards and Technology (NIST) has tested facial recognition algorithms independently for years; the programme now runs as the Face Recognition Technology Evaluation (FRTE). Its NISTIR 8280 report, published on 19 December 2019, examined 189 algorithms from 99 developers for demographic effects. In summary:

- Most of the algorithms tested showed accuracy differences across demographic groups.
- In one-to-one matching, false positive rates for Asian and African American faces were often 10 to 100 times higher than for white faces, depending on the algorithm.
- Some algorithms developed in Asian countries showed no such gap between Asian and white faces; NIST suggested training data might play a role but did not test this.
- In one-to-many searches against a database of about 1.6 million mugshots, false positives were higher for African American women.
- Importantly, algorithms differed widely, and the most equitable ones were also among the most accurate.

The lesson is that a statement like "facial recognition is X% accurate" means very little. Without knowing which algorithm, which use (1:1 or 1:N), which threshold and which population, you cannot say whether a system is fair. As someone who works on data quality and model evaluation, I see this as one of the clearest arguments for always reporting results broken down by group.

## Why biometric data gets special protection

In both Türkiye and the European Union, biometric data is protected more strictly than ordinary personal data.

**KVKK:** Article 6 of Türkiye's Personal Data Protection Law No. 6698 lists biometric and genetic data, alongside data on health, religion, political opinion and similar categories, as "special categories of personal data". The article was amended by Law No. 7499, with the new version in force since 1 June 2024; the amendment redrew the conditions for processing special category data along lines closer to the EU's approach. The scope did not change: biometric data remains a special category.

**GDPR:** Article 9 of the EU's General Data Protection Regulation lists "biometric data for the purpose of uniquely identifying a natural person" among the special categories and prohibits processing it except under the exceptions the article sets out.

In practice, this means that a workplace, gym or building installing facial recognition at its entrance is not making an ordinary technical choice. The legal basis, proportionality, the availability of alternatives and the security of the data all need separate consideration.

## What does the EU AI Act restrict?

Article 5 of the EU AI Act (Regulation (EU) 2024/1689) bans certain AI practices outright, with the bans applying since 2 February 2025. Those related to faces include:

- Creating or expanding facial recognition databases through **untargeted scraping** of facial images from the internet or CCTV footage.
- **Emotion recognition in workplaces and educational institutions** (except for medical or safety reasons).
- **Biometric categorisation** that sorts people by sensitive characteristics such as race, political opinions, religious beliefs or sexual orientation.
- **Real-time remote biometric identification** in publicly accessible spaces for law enforcement purposes. This ban has three narrow exceptions: the targeted search for specific victims of abduction, trafficking or sexual exploitation and for missing persons; the prevention of a specific, substantial and imminent threat to life or a genuine terrorist threat; and locating suspects of certain serious crimes. Even then, prior authorisation by a judicial or independent administrative authority is generally required.

Remote biometric identification that is not real-time, meaning searches run afterwards on recorded footage, is not banned but is classified as high-risk and subject to strict obligations.

<div class="callout"><strong>Tip:</strong> If you notice facial recognition being used somewhere, ask three questions: For what purpose and on what legal basis is my data processed? How long is it kept? Is there an alternative to facial recognition, such as a card or a code?</div>

## What can individuals do?

Becoming invisible to facial recognition is not realistic, but a few steps increase your control:

- **Use your rights.** Under the GDPR, and under Article 11 of KVKK in Türkiye, you can ask whether your personal data is being processed, request information about it, and ask for correction or erasure. If an employer or organisation processes your facial data, you can contact the data controller.
- **Ask for an alternative.** Find out whether access control offers an option such as a card or code instead of facial recognition.
- **Review what you share.** Public, high-resolution photos can be raw material for untargeted scraping. Checking the visibility settings on your social media accounts reduces the risk.
- **Know your device settings.** Check whether your phone's face unlock data stays on the device, and whether your photo app's face grouping feature is switched on.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Facial recognition involves detection, alignment, template extraction and comparison; verification (1:1) and identification (1:N) carry very different risks.</li><li>NIST's 2019 report found clear demographic differences in error rates in most algorithms, but also large differences between algorithms.</li><li>Biometric data is protected as a special category under both KVKK and the GDPR.</li><li>The EU AI Act bans untargeted facial scraping and, with narrow exceptions, real-time remote biometric identification by police in public spaces.</li><li>Individuals can request information and erasure and ask for alternatives to facial recognition.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Do these rules apply to face unlock on my phone?</summary><p>Verification on your own device, at your own choice, with data kept on the device, is very different from mass identification in public spaces. Still, it is worth knowing where and how the manufacturer stores your face data.</p></details><details><summary>Can my employer use facial recognition for time tracking?</summary><p>That depends on the legal basis, proportionality and whether alternatives exist. Because biometric data is a special category, an employer is expected to show a strong justification and robust safeguards; for a specific case, a lawyer is the right person to ask.</p></details><details><summary>Aren't facial recognition systems equally accurate now?</summary><p>Algorithms vary a great deal, and some produce much more balanced results across groups. But to call a particular system fair, it has to be tested by group for that specific use and threshold.</p></details><details><summary>Does the EU AI Act apply outside the EU?</summary><p>It applies in the EU, but it can also cover providers outside the EU who place systems on the EU market or whose system output is used in the EU. In Türkiye, KVKK is the main law governing biometric data.</p></details></div>

---

**Sources**

- [NIST – NISTIR 8280: Face Recognition Vendor Test Part 3, Demographic Effects (2019)](https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf)
- [NIST – Face Recognition Technology Evaluation: Demographic Effects](https://pages.nist.gov/frvt/html/frvt_demographics.html)
- [Law No. 6698 on the Protection of Personal Data (Turkish legislation portal)](https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6698.pdf)
- [GDPR Article 9 – Processing of special categories of personal data](https://gdpr-info.eu/art-9-gdpr/)
- [EUR-Lex – Regulation (EU) 2024/1689 (AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
