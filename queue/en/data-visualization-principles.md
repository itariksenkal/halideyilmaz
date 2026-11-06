---
title: "Data Visualization Principles: Right Chart, Honest Axes, One Message"
description: "How to choose the right chart, keep axes honest, use accessible colour and cut clutter: core principles for charts that are clear and hard to misread."
publishDate: "2026-11-14T09:17:00+03:00"
lang: en
category: "Data"
tags: ["Data Visualization", "Accessibility", "Data Literacy"]
translation: "veri-gorsellestirme-ilkeleri"
heroImage:
  src: "../../../assets/blog/covers/data-visualization-principles.jpg"
  alt: "A clean bar chart and line chart sketched as a data visualization draft"
---

When a chart appears on screen in a meeting, it is usually more persuasive than the table behind it. People look at the shape, not the individual numbers, and reach a conclusion within seconds. That speed is what makes charts powerful, and also what makes them risky: the wrong chart type, a truncated axis or a palette that colour-blind readers cannot separate can leave a false impression even when the data itself is correct. In my work on data quality and model evaluation, how results are shown matters almost as much as how they are computed. This post collects a few principles that anyone can apply, whether you build dashboards or just paste a chart into slides.

## Start with the message, not the chart

A good chart does not start with "what is in the data?" but with "what should the reader remember?" Before you open any tool, try writing the message as a single sentence: "Returns doubled in November" or "The Ankara branch is ahead of the others." If you cannot write that sentence, the chart will probably be unfocused too.

Loading several messages onto one chart is one of the most common mistakes. A chart that squeezes six products, four regions and two years into one frame shows everything and says nothing. If you have several findings, several charts are usually more honest and easier to read. Putting the message in the title helps as well: "Sales have fallen since September" tells the reader where to look; "Monthly sales" does not.

## Choosing the right chart type

A practical way to pick a chart is to look at the kind of relationship in your data. The Financial Times' Visual Vocabulary, created by its visual journalism team, groups chart types by relationship: deviation, correlation, ranking, distribution, change over time, part-to-whole, magnitude, spatial and flow. The table below is a good starting point for the questions people ask most often:

| The question you are asking | A chart that usually works |
|---|---|
| How did it change over time? | Line chart |
| Which category is bigger? | Sorted bar chart (horizontal or vertical) |
| How are the values spread out? | Histogram, box plot |
| Do two variables move together? | Scatter plot |
| How is the whole divided? | Stacked bar; a pie only for a few parts |
| How far are we from a target? | Deviation bars around a zero line |

A short word on pie charts. Our eyes compare angles and areas far less accurately than lengths. A pie with two or three slices is fine; a pie with seven similar slices hides the ranking. In that case a sorted bar chart is almost always clearer.

## Axes that don't lie

Most misleading charts are misleading because of their axes. The best-known example is a bar chart whose y-axis does not start at zero. Readers judge a bar by its length, so if the axis starts at 95, the gap between 96 and 98 looks three times bigger than it is. For bar and area charts, starting at zero is close to a rule.

Line charts are different. With a line, the eye focuses on slope and change rather than absolute height, so zooming the axis to the range of the data is acceptable. You should still label that range clearly and avoid making a small wobble look like a crisis.

Other axis problems worth watching for:

- **Dual y-axes:** Overlaying two scales lets whoever picks the scales manufacture whatever "relationship" they like. Two separate charts are usually better.
- **Uneven intervals:** Plotting 2020, 2022, 2023 and 2026 at equal spacing distorts the slope.
- **Cumulative totals:** A running total always goes up and can hide the fact that growth has slowed. Show the per-period values too.
- **3D effects:** 3D bars and pies exaggerate some values through perspective and add no information.

<div class="callout"><strong>Tip:</strong> Before sharing a chart, ask yourself: "Would someone reading the same numbers from a table reach the same conclusion?" If not, revisit the axes and the scale.</div>

## Colour and accessibility

Colour is one of the strongest tools in a chart and one of the easiest to misuse. According to the US National Eye Institute, about 1 in 12 men have some form of colour vision deficiency, and the most common type is difficulty telling red from green. A chart built on "red is bad, green is good" may look like two similar shades of grey to a meaningful share of your readers.

The WCAG guidelines, widely used for web accessibility, give two concrete principles here. First, do not convey information with colour alone; add a text label, a pattern or a different marker shape. Second, the meaningful graphical parts of a chart (lines, bars, markers) should have a contrast ratio of at least 3:1 against adjacent colours. A pale yellow line on a light grey background often fails that test.

Habits that help in practice:

- **Match the palette to the data.** Sequential data (low to high) suits a single hue going from light to dark; data that diverges from a midpoint suits a two-ended diverging palette; categories need a qualitative palette with clearly distinct colours. Tools such as ColorBrewer offer these three types separately and let you filter for colour-blind-safe options.
- **Label directly.** Instead of making readers bounce between a legend and the lines, write the series name at the end of each line.
- **Use grey to highlight.** To make one series stand out, colour it and make the rest grey. It is the colour version of "one message per chart".

## Cutting the clutter

Every element on a chart takes a share of the reader's attention, so it is worth asking "does this tell the reader anything?" before adding it. Heavy gridlines, thick borders, shadows, unnecessary decimal places and a value printed on top of every bar can drown the message.

My usual clean-up checklist looks like this: lighten or remove gridlines; limit decimals to what the data justifies; sort bars by value rather than alphabetically; always state the unit on the axis; add the source and date in small type below the chart. Simplicity does not mean less information. It means less noise.

## Common misleading charts

Patterns I see often in news, presentations and social media:

- **Bar charts with a truncated axis:** small differences look dramatic.
- **Cherry-picked time windows:** showing only the convenient part of a trend. A longer window usually tells a fuller story.
- **Counts where rates are needed:** a large city topping every chart is often just a population effect. Per-capita figures or rates may be more appropriate.
- **Pictograms that scale in two dimensions:** if an icon doubles in both width and height to show a doubling, its area quadruples and the difference is exaggerated.
- **Hidden uncertainty:** survey or model results shown without a margin of error create a false sense of precision.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Write the message as one sentence before you draw; give each chart one message.</li><li>Choose the chart by the relationship in the data: lines for time, sorted bars for comparison, scatter plots for correlation.</li><li>Bar charts need a zero baseline; avoid dual axes and 3D effects.</li><li>Never rely on colour alone; add labels or patterns and keep enough contrast.</li><li>Reduce noise: light gridlines, direct labels, sorted bars, clear units and a source line.</li></ul></div>

<div class="faq"><details><summary>Are pie charts always a bad idea?</summary><p>No. For simple part-to-whole cases with two or three slices, a pie is easy to read. Once there are many slices or the values are close, a sorted bar chart is usually clearer.</p></details><details><summary>Does a line chart have to start at zero?</summary><p>Not necessarily. Because readers focus on slope, it is acceptable to fit the axis to the range of the data. Label the axis clearly and avoid exaggerating small changes.</p></details><details><summary>How do I pick a colour-blind-friendly palette?</summary><p>Avoid relying on red–green contrast, choose palettes with clear differences in lightness, and add labels or patterns as a second cue. Tools such as ColorBrewer let you filter for colour-blind-safe palettes.</p></details><details><summary>How many colours should a chart have?</summary><p>There is no fixed number, but colours become hard to tell apart as categories grow. With many categories, colour the few that matter and leave the rest grey, or split the chart.</p></details></div>

---

**Sources**

- [Financial Times – Visual Vocabulary (chart-doctor repository)](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
- [data.europa.eu – Data Visualisation Guide: Choosing charts by message](https://data.europa.eu/apps/data-visualisation-guide/choosing-charts-the-message)
- [W3C – Understanding SC 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [W3C – Understanding SC 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [National Eye Institute – Color Blindness](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness)
- [ColorBrewer](https://colorbrewer2.org/)
