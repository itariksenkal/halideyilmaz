---
title: "AI in Healthcare: What It Can Do and Where It Falls Short"
description: "AI in medical imaging, triage, clinical documentation and drug discovery: the evidence, the limits, medical device regulation and patient data privacy."
publishDate: "2026-11-09T09:17:00+03:00"
lang: en
category: "Applications"
tags: ["Healthcare", "Artificial Intelligence", "Regulation"]
translation: "saglikta-yapay-zeka"
heroImage:
  src: "../../../assets/blog/covers/ai-in-healthcare.jpg"
  alt: "A clinician reviewing highlighted regions on a medical scan"
---

Talk about AI in healthcare tends to swing between two extremes: either "it will replace doctors" or "it is a dangerous toy". The real picture sits somewhere else, and it is more interesting than either. In some areas there are concrete gains backed by well-designed studies; in others, the promises run far ahead of the evidence. In this post I outline where AI is used in healthcare, where the evidence is strong and where it is thin, how these systems are regulated, and why patient data needs particular care.

*This post is for general information only and is not medical advice. Please talk to a healthcare professional about decisions concerning your health.*

## Medical imaging: the most mature area

Medical imaging is where AI is most established in healthcare. X-rays, CT, MRI and mammograms are exactly the kind of data machine learning handles well: plentiful, digital and labelled by experts.

The U.S. Food and Drug Administration (FDA) publishes and periodically updates a list of AI-enabled medical devices that have been authorised for marketing. Most of the devices on it relate to radiology. The FDA is explicit that the list is not comprehensive; devices were identified largely by AI-related terms in their authorisation documents.

A notable piece of evidence comes from the MASAI trial in Sweden. Roughly 106,000 women were randomly assigned so that their mammograms were read either by standard double reading or with AI support. Results published in The Lancet Digital Health in February 2025 showed 29% more cancers detected in the AI-supported group and a 44% lower reading workload for radiologists, with only a small increase in false-positive recalls. At that stage the researchers stressed that "interval cancers", those found between screening rounds, had not yet been analysed and that longer follow-up was needed.

To me this example shows two things at once. A well-designed system can deliver real benefit. But that benefit was measured for a specific piece of software, a specific workflow and a specific population. It does not automatically carry over to another product or another country.

## Triage and clinical decision support

Triage means sorting patients by urgency. AI can, for example, move a scan up a radiologist's worklist when an urgent finding looks likely. The aim is not to make the decision, but to direct human attention to the right place sooner.

The central risk here is one the World Health Organization (WHO) also highlights: **automation bias**, where people trust a machine's suggestion too much and miss errors they would otherwise have caught. A good decision-support system should not make clinical reasoning lazy; it should make clear why it suggests what it suggests.

## Documentation and administrative work

A large share of clinicians' time goes on record keeping. Tools that transcribe and summarise a consultation and draft notes are spreading quickly with the promise of lightening that load. The WHO's January 2024 guidance on large multi-modal models (LMMs) lists clerical and administrative tasks, such as documenting and summarising patient visits, among its five application areas.

The caution is obvious: language models can produce fluent but wrong statements. A small error in a drug dose or an allergy can have serious consequences, so every draft such a tool produces must be checked by a healthcare professional.

<div class="callout"><strong>Tip:</strong> If a clinic uses an AI tool to record or transcribe your consultation, it is entirely reasonable to ask about it and to ask how your data will be handled.</div>

## Drug discovery and research

Developing a drug is long, expensive and prone to failure. AI is used at stages such as predicting protein structures, screening candidate molecules and identifying suitable patients for clinical trials. The WHO guidance also names scientific research and drug development among the main areas of use.

One distinction is worth keeping in mind. Between a molecule looking promising in the lab and a drug being approved as safe and effective there are still years of clinical trials. AI can speed up some steps; it does not remove the need for clinical evidence.

## Regulation: software can be a medical device

Something that surprises many people: software used for diagnostic or therapeutic purposes can be regulated as a medical device.

- **United States:** the FDA assesses AI-enabled software within its medical device framework, and the list mentioned above shows products that went through those processes. The FDA says it will explore ways to flag devices that use large language models in the future.
- **European Union:** medical devices fall under the Medical Device Regulation (EU) 2017/745 (MDR). The AI Act, which entered into force on 1 August 2024, generally treats AI used in medical devices that need third-party conformity assessment as "high-risk". According to the European Commission, obligations for high-risk systems embedded in regulated products will apply from 2 August 2028, following amendments that entered into force in 2026.
- **Turkey:** medical devices have their own legislation, and processing health data falls under the Personal Data Protection Law No. 6698 (KVKK).

Because these timelines can change, any detailed compliance work should always be checked against the current official texts.

## Patient data and privacy

Health data receives extra protection both under KVKK, as "special category" data, and under the EU's GDPR. The reason is clear: if it leaks or is misused, the result can be discrimination, stigma and harm that is hard to undo.

AI projects can amplify these risks in several ways. Models need large datasets; data thought to be anonymised can sometimes be re-identified when combined with other sources; and sending data to external providers or abroad raises new questions. The WHO guidance also points to cybersecurity risks and to problems caused by low-quality or biased data.

<div class="callout"><strong>Note:</strong> Think twice before typing your symptoms into a general-purpose chatbot. The answers may be wrong, and it is not always clear how what you share will be stored or used.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Medical imaging is the most mature area of healthcare AI and the one with the most evidence.</li><li>Randomised trials like MASAI can show real benefit, but results are tied to a specific system and setting.</li><li>Automation bias and fluent-but-wrong outputs are among the main risks in clinical use.</li><li>Software can be regulated as a medical device: the FDA in the US, the MDR and the AI Act in the EU.</li><li>Health data is special-category data and needs extra care in AI projects.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Will AI replace doctors?</summary><p>Current evidence shows AI supporting clinicians in specific tasks. Keeping clinical judgement and responsibility with healthcare professionals is a core principle, both ethically and in regulation.</p></details><details><summary>Is it safe to ask a chatbot health questions?</summary><p>It can help with general information, but answers may be wrong or incomplete. For diagnosis and treatment, always see a healthcare professional.</p></details><details><summary>How can I tell whether an AI product is authorised?</summary><p>In the US you can check the FDA's list and databases. In the EU, the CE mark and the manufacturer's declaration of conformity are key signals. If in doubt, ask the healthcare provider using the product.</p></details><details><summary>Can my health data be used to train AI?</summary><p>That depends on the law in your country, the purpose of processing and its legal basis. Under KVKK and the GDPR, health data has special protection, and you can exercise your rights by contacting the data controller.</p></details></div>

---

**Sources**

- [FDA – List of Artificial Intelligence-Enabled Medical Devices](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices)
- [WHO – WHO releases AI ethics and governance guidance for large multi-modal models (18 January 2024)](https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models)
- [WHO – Ethics and governance of artificial intelligence for health: Guidance on large multi-modal models](https://www.who.int/publications-detail-redirect/9789240084759)
- [EurekAlert! – MASAI trial results in The Lancet Digital Health (February 2025)](https://www.eurekalert.org/news-releases/1072522)
- [European Commission – AI Act: Regulatory framework for AI](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
