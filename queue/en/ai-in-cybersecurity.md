---
title: "AI in Cybersecurity: The Same Technology Is Both Shield and Sword"
description: "AI helps catch phishing and malware, but it also makes attackers more convincing. A plain guide to both sides and what organisations and individuals can do."
publishDate: "2026-11-21T09:17:00+03:00"
lang: en
category: "Security"
tags: ["Cybersecurity", "Artificial Intelligence", "Phishing", "Deepfakes"]
translation: "siber-guvenlikte-yapay-zeka"
heroImage:
  src: "../../../assets/blog/covers/ai-in-cybersecurity.jpg"
  alt: "A security dashboard monitoring network traffic with a padlock icon"
---

When people hear "AI in cybersecurity", they tend to picture one of two things: a smart shield that stops attacks on its own, or an invisible hacker that can break into anything. The reality sits somewhere in between. It is a little less cinematic and a lot more important, because the same techniques are available to defenders and attackers alike. I work on data quality and model evaluation, and in this post I want to set out, in plain terms, what AI actually does on each side, where it is oversold, and what both organisations and ordinary users can do about it.

## Why this is a two-sided story

AI's strength in security comes from finding patterns in very large volumes of data. A security team may face millions of emails, login records and network connections a day; no group of people can inspect them one by one. A model learns what "normal" looks like and flags what does not fit.

But generating patterns has become as easy as recognising them. Language models write fluent, personalised text with no spelling mistakes, and voice and video models can imitate a person from a short recording. The same progress that strengthens defence also lowers the cost of attack.

| On the defence side | On the attack side |
|---|---|
| Classifying phishing emails | Writing more convincing, error-free phishing |
| Recognising malware by its behaviour | Speeding up code writing and testing |
| Spotting anomalies in networks | Automating reconnaissance on targets |
| Prioritising alerts for analysts | Impersonation with fake voice and video |

## AI on defence: phishing and malware

A large share of the fake messages that never reach your inbox are filtered out by classifiers running in the background. These models do not look at the text alone. They combine the sender domain's history, where the links point, the attachment type, the time the message was sent and thousands of other signals. A single rule ("block anything that says urgent") is easy to dodge; a combination of many weak signals is far harder.

Malware detection has gone through a similar shift. The old approach was to keep a list of "signatures" of known malicious files, which a brand-new variant could slip past. Machine learning systems instead look at what a program does: which files it touches, which addresses it contacts, whether it tries to hide itself. This behavioural view improves the odds of catching threats nobody has seen before.

One caution from the evaluation side of my work: a security model that is "99% accurate" tells you very little on its own. In an environment processing a million events a day, a 1% false alarm rate means ten thousand unnecessary alerts. That is why security teams judge models not only by how often they are right but by the alert load they create.

## Anomaly detection in networks

Anomaly detection is built on learning what normal looks like rather than memorising what bad looks like. If an accountant's account connects to the same few servers during office hours every day, a login from abroad at 3 a.m. followed by gigabytes of downloads is a notable deviation. The model does not know it is an attack; it only knows it is unusual.

The strength of this approach is that it can catch attacks that do not have a name yet. The weakness is that it cannot tell "unusual" from "dangerous". Rolling out new software or a busy end-of-quarter week also looks abnormal to the system. So anomaly detection does not replace a good team; it works more like a torch that shows the team where to look.

<div class="callout"><strong>Tip:</strong> When a vendor makes AI claims about a security product, asking "How many false alarms does it produce, and who reviews them, how quickly?" is usually more revealing than asking for an accuracy percentage.</div>

## AI in the hands of attackers

The European Union Agency for Cybersecurity (ENISA) based its Threat Landscape 2025 report on 4,875 incidents between 1 July 2024 and 30 June 2025. It places phishing among the leading ways attackers first get in, and notes that large language models are being used to improve phishing and automate social engineering. The broken grammar, odd greetings and translated-sounding sentences that used to give fake emails away are no longer a reliable signal.

Voice and video impersonation is even more striking. In a public service announcement on 3 December 2024, the FBI's Internet Crime Complaint Center described criminals using generative AI for text, images, voice cloning and fake live video calls. One of the best-known cases happened in Hong Kong in early 2024: an employee of the engineering firm Arup transferred about HK$200 million after a video meeting with people who appeared to be the company's finance chief and colleagues. They turned out to be deepfakes, and the company confirmed the incident in May 2024.

The lesson is that the attack did not exploit a technical flaw. It exploited the very human sense that "I saw them and heard them, so it must be real". The AI did not break into a system; it persuaded a person.

## What organisations should do

The most effective steps are often not about AI directly, but they matter even more now:

- **Phishing-resistant multi-factor authentication:** The US Cybersecurity and Infrastructure Security Agency (CISA) points out that SMS and app codes can also be stolen, and recommends methods such as FIDO/WebAuthn security keys and passkeys. However convincing the fake page, these methods will not hand credentials to the wrong site.
- **A second channel for money and access requests:** Payments, supplier bank detail changes and privilege escalations should be confirmed through a known, independent route, not the channel the request came in on. A video call is no longer proof of identity by itself.
- **Clear rules for AI tools:** Staff should know which tools they may paste confidential data into, and which they may not.
- **Anchoring in a framework:** Structures such as the NIST Cybersecurity Framework help treat AI as part of overall risk management rather than a separate magic layer.

## What individuals can do

For individual users, a few simple habits make a big difference. The FBI's announcement offers practical advice: agree a secret word or phrase with your family; if someone calls asking for money urgently, hang up and call back on a number you already know; limit public posts that contain your voice and face; and never send money, gift cards or crypto to people you have only met online or over the phone.

On top of that, turning on multi-factor authentication wherever possible, using a password manager and pausing whenever a message pushes you to hurry remain the best defences. AI can polish an attacker's text, but the pressure tactic stays the same.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>AI is a tool for both defenders and attackers; the technology is neutral, its use is not.</li><li>Its biggest defensive contribution is surfacing the suspicious among huge volumes of data, but false alarm load must always be counted.</li><li>Spelling mistakes are no longer a reliable sign of a fake email, and voices and faces can be imitated.</li><li>Phishing-resistant authentication and a second channel for money requests are among the most effective organisational measures.</li><li>For individuals, a family code word and the habit of calling back are simple but strong protections.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Will an AI-powered antivirus protect me from everything?</summary><p>No. These tools improve detection, but none is perfect. Updates, multi-factor authentication, backups and stopping to think before acting on unusual requests are still necessary.</p></details><details><summary>How can I tell if a video call is a deepfake?</summary><p>Visual glitches such as lag, odd facial movement or lips out of sync with speech can help, but these signs fade as the technology improves. The more reliable approach, especially when money or sensitive information is involved, is to verify the person through another channel you already trust.</p></details><details><summary>Where should a small business start?</summary><p>Multi-factor authentication on every account, a call-back rule for payments and bank detail changes, regular backups and short awareness sessions for staff are a good start. These come before any expensive AI product.</p></details><details><summary>Can I stop my voice from being cloned?</summary><p>Stopping it completely is hard, since short recordings can be enough. Limiting public audio and video reduces the risk, and a code word agreed with people close to you makes impersonation much less likely to work.</p></details></div>

---

**Sources**

- [ENISA Threat Landscape 2025](https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025)
- [FBI IC3 – Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud (3 December 2024)](https://www.ic3.gov/PSA/2024/PSA241203)
- [CISA – Implementing Phishing-Resistant MFA (fact sheet)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf)
- [NIST – Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CNN – Arup deepfake scam report (16 May 2024)](https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk)
