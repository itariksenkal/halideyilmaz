---
title: "Open Data Sources: Where to Find Datasets and How to Use Them"
description: "TÜİK, city portals, Eurostat, the World Bank, OECD, UCI, Kaggle and Hugging Face: a guide to finding open data, reading its licence and checking its quality."
publishDate: "2026-11-29T09:17:00+03:00"
lang: en
category: "Data"
tags: ["Open Data", "Data Science", "Data Quality"]
translation: "acik-veri-kaynaklari"
heroImage:
  src: "../../../assets/blog/covers/open-data-sources.jpg"
  alt: "A desk view of tables and charts drawn from several open data portals"
---

When you want to answer a question with data, the first obstacle is rarely the analysis. It is finding the right data. There are millions of tables online, but telling which ones are reliable, which ones you are actually allowed to use, and which ones quietly carry errors is a skill of its own. Because I work on data quality, this is a topic I care about a lot: a good model or a good report is only as solid as the data underneath it. In this post I have gathered open data sources from Türkiye and from international bodies, along with a short guide to licences, citation and the simple checks worth running before you trust a dataset.

## What "open data" actually means

"I can download it" is not the same as "it is open data". Open data is data that anyone can access, use, modify and share again under clear conditions, often nothing more than giving credit. The licence is what sets those conditions. Seeing a table on a website does not mean you may put it in a product or republish it.

I find it useful to sort open data into three rough groups:

- **Official statistics:** indicators published by statistical offices and central banks, with documented methods (inflation, population, trade and so on).
- **Operational data from public bodies:** records produced by city services such as transport, water or the environment.
- **Research and machine learning datasets:** collections assembled to study a particular problem, often shared by the community.

Each group has different strengths. Official statistics are usually well documented but aggregated; machine learning datasets are row-level but sometimes have unclear origins.

## Starting with Türkiye

If your question is about Türkiye, the usual first stop is the Turkish Statistical Institute (TÜİK). Its **Data Portal** (veriportali.tuik.gov.tr) organises statistical tables and bulletins by theme, and the older data.tuik.gov.tr address now redirects there. Before using an indicator, it is worth reading the methodology notes in the relevant bulletin to see whether definitions have changed over time.

For economic and financial time series, the Central Bank of the Republic of Türkiye's Electronic Data Delivery System (EVDS) is widely used. As of November 2026, the evds2 address redirects to the newer evds3.tcmb.gov.tr.

At the local level, many metropolitan municipalities run open data portals. Istanbul Metropolitan Municipality's portal (data.ibb.gov.tr) groups datasets into categories with download and API options. Its own open data licence states that it is compatible with CC BY 4.0 and explicitly excludes personal data. İzmir Metropolitan Municipality's portal (acikveri.bizizmir.com) publishes a few hundred datasets on transport, environment, energy and more. Other cities and some district municipalities have similar portals, though how often they are updated varies a great deal.

<div class="callout"><strong>Tip:</strong> On a city portal, check the "last updated" date before you use a dataset. A set that was abandoned a few years ago shows a snapshot of that year, not the present.</div>

## International statistical sources

When you want to compare countries, the databases of international organisations help a lot, because they try to harmonise indicators under shared definitions.

| Source | Good for | Terms of use (summary) |
|---|---|---|
| Eurostat | Economic, population and environmental statistics for EU and candidate countries | Commercial or non-commercial reuse allowed with acknowledgement; third-party content excluded |
| World Bank Open Data | Development indicators, long time series, API access | Default licence CC BY 4.0; some datasets carry other licences |
| OECD Data Explorer | Comparisons of economy, education and health across member countries | OECD terms apply; some datasets have their own conditions |
| data.europa.eu | Open data catalogues from EU institutions and member states | Each dataset listed with its own licence |

Eurostat also suggests a citation format for datasets that includes the DOI and the date of access, and asks you to state clearly when you have modified or translated the data. The World Bank, for its part, asks you to credit the institution, name the dataset and, where known, the original data provider.

## Repositories for machine learning

If you want to train a model or try out a method, you need a different kind of source.

- **UCI Machine Learning Repository:** run by the University of California, Irvine, and one of the oldest dataset archives in machine learning. Its home page says it maintains more than 600 datasets. Under its donation policy, newly added datasets are released under CC BY 4.0. Its small, well-known classic datasets make it handy for comparing methods.
- **Kaggle Datasets:** hosts a huge number of user-uploaded datasets. The variety is enormous, and so is the variation in quality. Always read the licence field and the description on each dataset page; popularity is not proof of a sound source.
- **Hugging Face Datasets:** a major hub, especially for text, audio and image data. Every dataset has a dataset card, and details such as licence, language and size live in the metadata block at the top of that card. How complete the card is gives you a good hint about how carefully the dataset was prepared.

## Licences and citation: the lines to read before downloading

Licences can feel tedious, but reading them is the cheapest way to avoid problems later. The questions I usually ask myself are:

1. **Is commercial use allowed?** Licences such as CC BY 4.0 allow it; licences marked "non-commercial" (NC) do not.
2. **Can I share a derived work?** Some licences require you to share modified data under the same licence (ShareAlike).
3. **How should I give credit?** Many institutions provide a ready-made citation. Using it is both easy and correct.
4. **Does the dataset contain someone else's content?** Bodies such as Eurostat and the World Bank state plainly that third-party material may come with different terms.

Datasets that contain personal information need extra care. An open licence does not mean personal data can be processed however you like; rules such as KVKK in Türkiye and the GDPR in Europe still apply. This post is general information, not legal advice; for a serious product, it is best to consult a lawyer.

## Before you trust the data: quality checks

In 2018, Gebru and colleagues proposed "Datasheets for Datasets": the idea that every dataset should come with a document describing its purpose, how it was collected and which uses it suits. You will not find such a datasheet for every dataset, but you can ask the same questions yourself:

- **Who collected it, why and how?** A survey, sensors, administrative records? The collection method shapes the gaps and biases in the data.
- **What is the coverage?** Which years, regions and groups are included, and which are missing?
- **Have definitions changed?** In official statistics, methodology changes can create sudden breaks in a time series.
- **Missing and inconsistent values:** empty cells, "0" mixed up with "unknown", mixed units (thousands of people or people?).
- **Duplicates and leakage:** in machine learning datasets, the same record appearing in both training and test splits can make results look better than they are.

<div class="callout"><strong>Tip:</strong> Keep a short note for every dataset you download: source address, download date, licence and any changes you made. Six months later you will thank yourself.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Open data is not just accessible; its licence explicitly allows reuse.</li><li>For Türkiye, the TÜİK Data Portal, the central bank's EVDS and city portals are good starting points.</li><li>Eurostat, the World Bank and the OECD offer indicators with shared definitions for cross-country comparison.</li><li>UCI, Kaggle and Hugging Face are rich sources for model experiments, but read each dataset's licence and card individually.</li><li>Do not fully trust any dataset until you have checked its source, coverage, definition changes and missing values.</li></ul></div>

<div class="faq"><details><summary>Can I use a Kaggle dataset in a commercial project?</summary><p>That depends entirely on the dataset's licence, which is shown on each dataset page. If no licence is given, or the data appears to have been copied from elsewhere, it is safer to go to the original source and check its terms there.</p></details><details><summary>How should I cite TÜİK data?</summary><p>As a general rule, name the institution, the title of the table or bulletin, the publication date and the address you accessed. If the institution gives specific citation instructions on its own pages, follow those.</p></details><details><summary>What if an openly licensed dataset contains personal data?</summary><p>An open licence does not remove legal duties around personal data. Some licences, such as Istanbul's, explicitly exclude personal data from their scope. If you work with such data, regulations like KVKK or the GDPR still apply.</p></details><details><summary>How can I tell whether a dataset is up to date?</summary><p>Look at the last-updated date, the final year the data covers and any version notes. For official statistics, the institution's release calendar tells you when the next update is due.</p></details></div>

---

**Sources**

- [TÜİK Data Portal](https://veriportali.tuik.gov.tr/tr)
- [Istanbul Metropolitan Municipality Open Data Portal – Licence](https://data.ibb.gov.tr/license)
- [Eurostat – Copyright notice](https://ec.europa.eu/eurostat/help/copyright-notice)
- [World Bank – Terms of Use for Datasets](https://www.worldbank.org/ext/en/legal/terms-conditions/datasets)
- [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/)
- [Gebru et al. (2018), Datasheets for Datasets – arXiv](https://arxiv.org/abs/1803.09010)
