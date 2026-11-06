---
title: "Common Statistical Fallacies: Six Traps, Six Short Examples"
description: "Simpson's paradox, the base-rate fallacy, survivorship bias, regression to the mean, p-hacking and small samples, each explained with a short, clear example."
publishDate: "2026-11-13T09:17:00+03:00"
lang: en
category: "Statistics"
tags: ["Statistics", "Data Literacy", "Critical Thinking"]
translation: "yaygin-istatistik-yanilgilari"
heroImage:
  src: "../../../assets/blog/covers/common-statistical-fallacies.jpg"
  alt: "Misleading charts and numbers examined under a magnifying glass"
---

Numbers tend to look neutral and precise. Yet the same data, viewed from the wrong angle, can tell exactly the opposite story. These fallacies are not just exam traps for students; they show up everywhere, from how doctors read test results to company investment decisions, news headlines and public policy. Working on data quality and model evaluation, I run into almost all of them in one form or another. In this post I walk through six of the most common statistical fallacies, each with a short example.

## 1. Simpson's paradox: the whole can contradict its parts

Simpson's paradox is when a trend that appears within each group reverses once the groups are combined.

A study published in 1986 comparing kidney stone treatments has become the textbook example:

| Stone size | Treatment A | Treatment B |
|---|---|---|
| Small stones | 93% (81/87) | 87% (234/270) |
| Large stones | 73% (192/263) | 69% (55/80) |
| Overall | 78% (273/350) | 83% (289/350) |

Treatment A does better for both small and large stones, yet B looks better overall. How? A was used far more often on large stones, the harder cases. Stone size is a hidden variable that affects both which treatment was chosen and how likely it was to succeed.

A similar pattern appeared in graduate admissions at the University of California, Berkeley in 1973. Overall, men were admitted at a noticeably higher rate (44%) than women (35%). Department by department, however, there was no systematic bias against women; women had applied more often to competitive departments with low admission rates.

**Lesson:** before trusting an aggregate result, ask which subgroups make up the data and how they are distributed.

## 2. The base-rate fallacy: rare things are rare

A test being "very accurate" does not mean that a positive result is probably right. What decides it is how common the condition is in the first place: the base rate.

Take purely illustrative numbers. A disease affects 10 people in 1,000. The test catches 90% of people who have it, and wrongly flags 9% of healthy people.

- Of the 10 people with the disease, 9 test positive.
- Of the 990 healthy people, about 89 also test positive.
- Of roughly 98 positive results, only 9 belong to people who are actually ill.

So someone with a positive result has only about a 9% chance of having the disease. Intuition suggests a much higher number. Research shows that presenting information as natural frequencies, "how many out of 1,000", rather than percentages helps both experts and lay people avoid this kind of error.

**Lesson:** whenever you ask "how accurate is the test?", also ask "how common is the condition?"

## 3. Survivorship bias: seeing only the winners

When we draw conclusions only from the cases that made it through some selection process, we fall into survivorship bias.

The best-known example comes from the Second World War. The statistician Abraham Wald, working with the Statistical Research Group at Columbia University, analysed damage on aircraft returning from missions to estimate which parts of a plane were most vulnerable. The key insight: the data came only from the planes that made it back. Areas with few hits on returning planes might be exactly the areas where a hit meant the plane never returned. (It is worth noting that popular retellings of this story have been embellished over time.)

Everyday versions: talking about "dropouts who became billionaires" while ignoring the much larger group who dropped out and did not; judging investment funds only by the ones still operating and forgetting those that closed.

**Lesson:** ask, "Which cases might never have made it into this data?"

<div class="callout"><strong>Tip:</strong> When a success story says "people who used this method succeeded", ask how many people used the same method and did not. That number is rarely given.</div>

## 4. Regression to the mean: extremes soften on their own

When a measurement produces an extreme result, very good or very bad, the next one is likely to be closer to average. That is because extreme results usually involve some luck.

Francis Galton first described the idea in the 19th century while studying height: children of very tall parents were tall on average, but not as tall as their parents. The psychologist Daniel Kahneman described a more everyday case. A flight instructor noticed that cadets he praised after a good manoeuvre usually did worse next time, while those he criticised usually improved, and concluded that criticism works better than praise. In fact, much of this is regression to the mean. Some legends, such as the "Sports Illustrated cover jinx", are often explained the same way: athletes reach the cover after an exceptional run, and the more ordinary spell that follows gets blamed on the cover.

**Lesson:** before crediting an intervention for an improvement or decline after an extreme result, ask whether there was a control group.

## 5. P-hacking: try enough and something will be "significant"

The common p < 0.05 threshold means that, when there is no real effect, roughly one test in 20 will still come out "significant" by chance. Test 20 independent outcomes where nothing real is going on, and the chance that at least one looks significant is about 64%.

P-hacking means trying different analyses, subgroups or variables until something crosses the threshold, then reporting only that result. In a statement published in 2016, the American Statistical Association (ASA) addressed this problem and set out six principles. Among them: p-values do not measure the probability that the studied hypothesis is true; scientific conclusions should not rest only on whether a p-value passes a threshold; and proper inference requires full reporting and transparency.

**Lesson:** ask how many tests were run, whether the analysis plan was set in advance and how large the effect is.

## 6. Small samples: little data, big swings

In small samples, chance easily pushes results to the extremes. Toss a fair coin 10 times and the probability of getting 7 or more heads is about 17%, which is not surprising at all. Getting 700 heads in 1,000 tosses, on the other hand, is practically impossible. That is why "7 out of 10 people who tried this new method were happy" says much less than it seems.

John Ioannidis's widely discussed 2005 essay in PLOS Medicine argues that the smaller the studies in a field, the less likely its findings are to be true, and that small effect sizes and flexibility in analysis increase that risk.

**Lesson:** when you see an impressive result, the first question should be "with how many people?"

<div class="callout"><strong>Tip:</strong> A quick way to keep all six fallacies in mind is to ask three questions of any statistical claim: <em>Who got into the data and who did not? How many people and how many attempts? Compared with what?</em></div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Simpson's paradox: aggregate results can show the opposite of the trend within subgroups.</li><li>Base-rate fallacy: for rare conditions, even a positive result from an accurate-looking test is often a false alarm.</li><li>Survivorship bias and regression to the mean remind us of the data we do not see and the role of luck.</li><li>P-hacking and small samples let chance findings pass as real ones.</li><li>For any statistical claim, question the sample, the comparison and the size of the effect.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>If p is below 0.05, is the result true?</summary><p>No. As the ASA stresses, a p-value does not measure the probability that a hypothesis is true, nor does it tell you the size or importance of an effect. It should be weighed together with study design, full reporting and other evidence.</p></details><details><summary>With Simpson's paradox, which result should I trust?</summary><p>It depends on the question and on how the data came about. If the subgroups reflect genuinely different conditions, the subgroup comparison is usually more informative, but context decides which variable is really the confounder.</p></details><details><summary>How large should a sample be?</summary><p>There is no magic number. The required size depends on the size of the effect you are looking for and the variability in the data; a calculation called power analysis is used for this.</p></details><details><summary>Do these fallacies affect AI models too?</summary><p>Yes. Data collected only from certain users can carry survivorship bias, and an overall accuracy figure can hide poor performance in subgroups. That is why subgroup analysis matters in model evaluation.</p></details></div>

---

**Sources**

- [American Statistical Association – Statement on Statistical Significance and P-Values (7 March 2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
- [Ioannidis, J. P. A. (2005) – Why Most Published Research Findings Are False, PLOS Medicine](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124)
- [Wikipedia – Simpson's paradox (with the Bickel et al. 1975 and Charig et al. 1986 examples)](https://en.wikipedia.org/wiki/Simpson%27s_paradox)
- [Wikipedia – Regression toward the mean](https://en.wikipedia.org/wiki/Regression_toward_the_mean)
- [Wikipedia – Survivorship bias](https://en.wikipedia.org/wiki/Survivorship_bias)
