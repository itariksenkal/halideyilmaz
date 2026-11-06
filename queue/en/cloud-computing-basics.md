---
title: "Cloud Computing Basics: Service Models, Costs and Data Residency"
description: "IaaS, PaaS and SaaS, regions, pay-as-you-go cost traps, the shared responsibility model and an overview of cross-border data transfers under Türkiye's KVKK."
publishDate: "2026-11-20T09:17:00+03:00"
lang: en
category: "Infrastructure"
tags: ["Cloud Computing", "Data Protection", "Information Security"]
translation: "bulut-bilisim-temelleri"
heroImage:
  src: "../../../assets/blog/covers/cloud-computing-basics.jpg"
  alt: "Schematic of cloud infrastructure connecting to data centres in different regions"
---

Putting an application online no longer means buying servers and finding a room for them. Within minutes, with a credit card, you can rent resources in data centres around the world. That convenience has made the cloud the default choice for most organisations. But the cloud is more than "someone else's computer": it comes with its own cost logic, a split of security responsibilities and, seen from Türkiye, legal questions about transferring personal data abroad. In this post I want to cover the core concepts and the points worth weighing before you decide.

## What is cloud computing?

One of the most cited definitions comes from SP 800-145, published by the US National Institute of Standards and Technology (NIST) in September 2011. It describes cloud computing as a model for enabling convenient, on-demand network access to a shared pool of configurable computing resources (networks, servers, storage, applications and services) that can be rapidly provisioned and released with minimal management effort.

NIST describes the model through five essential characteristics: on-demand self-service, broad network access, resource pooling across many customers, rapid elasticity (growing and shrinking with demand) and measured service (paying for what you use). The same document defines four deployment models: public, private, community and hybrid cloud.

## IaaS, PaaS and SaaS

Cloud services fall into three main models, depending on how much the provider manages:

| Model | What you get | Who manages what | Typical use |
|---|---|---|---|
| IaaS (Infrastructure as a Service) | Virtual machines, storage, networking | Provider runs the physical infrastructure; you run the OS, software and data | Running applications on servers you configure |
| PaaS (Platform as a Service) | Application runtime, managed databases | Provider runs the OS and runtime; you bring code and data | Deploying code without managing servers |
| SaaS (Software as a Service) | A ready-to-use application | Provider runs almost everything; you manage users, settings and data | Email, office suites, customer management |

Moving down the table, your management burden shrinks, but so do your control and room for customisation. The right model depends on what your team wants to manage and what it realistically can.

## Regions and availability zones

Large cloud providers organise their infrastructure into regions. AWS, for example, defines a region as a geographic location where it clusters data centres, with each region made up of multiple physically separate availability zones. According to AWS documentation, resources and data you create in one region do not exist in any other region unless you explicitly copy or replicate them.

Region choice matters in three ways: proximity to users (latency), resilience to failures (spreading across zones or regions) and where the data physically sits. The last one is especially important for the legal obligations discussed below.

## Pay-as-you-go: common cost traps

One of the cloud's most attractive features is paying only for what you use. The same flexibility means spending can easily get out of hand. Frequent traps:

- **Forgotten resources:** virtual machines started for a test and never stopped, unattached disks and old snapshots quietly add to the bill.
- **Data egress charges:** many providers charge separately for data transferred out of the cloud or between regions, and architecture decisions largely determine this cost.
- **Unbounded autoscaling:** a system that grows with traffic also grows its bill when faced with unexpected load or a buggy loop.
- **Logs and monitoring data:** logging everything feels safe, but log storage and querying are billed too.
- **Pricing structures of managed services:** some services charge per request, some per hour of runtime, some per amount of data scanned; the same job can cost very different amounts on different services.

<div class="callout"><strong>Tip:</strong> On the day you open a cloud account, set up a budget and spending alerts, and tag resources by project or team. Hearing about spending when it starts is far less stressful than hearing about it when the invoice arrives.</div>

## The shared responsibility model

In the cloud, security is shared between provider and customer. AWS describes this as security "of" the cloud versus security "in" the cloud: the provider is responsible for the physical infrastructure and underlying layers the services run on, while the customer is responsible for its own data, choices about encrypting it, classifying its assets and setting the right access permissions. The customer's share depends on the type of service: with IaaS, operating system patching is often the customer's job, whereas with SaaS most of that responsibility sits with the provider.

In practice, many cloud security incidents stem not from a flaw in the provider's infrastructure but from customer misconfiguration: a storage bucket left public, permissions far broader than needed, or an access key forgotten in a code repository.

## A view from Türkiye: KVKK and cross-border transfers

If your cloud service runs on servers outside Türkiye and you process personal data in it, Article 9 of Law No. 6698 on the Protection of Personal Data (KVKK), which governs transfers abroad, comes into play. The article was substantially rewritten in 2024 by Law No. 7499. The new version took effect on 1 June 2024, while the old consent-based first paragraph continued to apply alongside it as a transition until 1 September 2024. Detailed procedures were set out in a regulation published in 2024.

At a high level, the new rules create a tiered structure:

1. **Adequacy decision:** if the Personal Data Protection Board has issued an adequacy decision for a country, sectors within a country or an international organisation, transfers may proceed provided one of the law's processing conditions is also met.
2. **Appropriate safeguards:** without an adequacy decision, transfers are possible under safeguards such as standard contracts announced by the Board, binding corporate rules approved by the Board, or a written undertaking with the Board's permission. A standard contract must be notified to the Authority within five business days of signing, and failing to do so carries an administrative fine. The Authority opened an online notification module for this purpose on 25 October 2024.
3. **Incidental transfers:** where there is neither an adequacy decision nor an appropriate safeguard, transfers are allowed only on an incidental (non-recurring) basis in listed cases, for example with the explicit consent of a data subject informed of the risks, or where necessary to perform a contract.

On top of this, certain sectors such as banking may have separate rules on keeping data in the country, and the law expressly preserves cross-border transfer provisions in other laws. Choosing a cloud provider and region is therefore not only a technical decision; it should be made together with legal and compliance teams.

*This section is general information, not legal advice; rely on the current legislation and qualified advice for specific situations.*

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Cloud computing is on-demand, measured network access to a shared pool of computing resources.</li><li>Moving from IaaS towards SaaS reduces management effort but also reduces control and customisation.</li><li>Forgotten resources, egress charges and unbounded autoscaling are the most common pay-as-you-go cost traps.</li><li>Security is shared: the provider secures the infrastructure, the customer secures its data, configuration and access.</li><li>Processing personal data on servers abroad must be assessed under KVKK Article 9 as amended in 2024.</li></ul></div>

<div class="faq"><details><summary>Is the cloud always cheaper than running our own servers?</summary><p>No. For variable or unpredictable workloads it is often cheaper. For steady, constant workloads, compare the long-term total cost with your own infrastructure, including staff, maintenance and security.</p></details><details><summary>Is data safe in the cloud?</summary><p>Major providers invest heavily in physical and infrastructure security, but under the shared responsibility model the security of your data, permissions and configuration is largely up to you.</p></details><details><summary>Is using a cloud service hosted abroad a breach of KVKK?</summary><p>Not in itself, but if personal data is processed, the cross-border transfer rules apply: an adequacy decision, appropriate safeguards or limited incidental exceptions. Which route fits depends on the specific situation.</p></details><details><summary>Which service model should I choose?</summary><p>IaaS if you have a team to manage infrastructure and specific needs, PaaS if you want to focus on the application, and SaaS if an off-the-shelf solution is enough.</p></details></div>

---

**Sources**

- [NIST SP 800-145 – The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final)
- [AWS – Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [AWS Whitepaper – AWS Fault Isolation Boundaries: Regions](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html)
- [Mevzuat Bilgi Sistemi – Law No. 6698 on the Protection of Personal Data (Turkish)](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5)
- [KVKK – Announcement on the Standard Contract Notification Module (Turkish)](https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu)
