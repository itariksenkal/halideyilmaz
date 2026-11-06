---
title: "What Is A/B Testing? The Basics of Experiments for Product Decisions"
description: "How to run a trustworthy A/B test: hypotheses, randomisation, sample size, significance versus practical effect, peeking, multiple testing and when not to test."
publishDate: "2026-11-17T09:17:00+03:00"
lang: en
category: "Statistics"
tags: ["A/B Testing", "Statistics", "Product Management"]
translation: "ab-testi-nedir"
heroImage:
  src: "../../../assets/blog/covers/what-is-ab-testing.jpg"
  alt: "Two versions of a screen design, labelled A and B, side by side"
---

A product team designs a new checkout page and everyone has an opinion. Some are sure the new design will lift sales; others think the old page works better. One of the most reliable ways to settle that debate with evidence rather than opinions is an A/B test: randomly split users into two groups, show one the current version and the other the new one, and compare the outcomes. The idea is simple. Done carelessly, though, an A/B test can "prove" effects that do not exist or miss ones that do. I run into the same statistical traps when evaluating machine learning models, so in this post I want to explain, in non-technical terms, what makes an A/B test trustworthy.

## What is an A/B test?

An A/B test is a randomised controlled experiment run online. Some users see the existing experience (the control, "A"), others see the changed experience (the treatment, "B"). Because the groups are formed at random, the most plausible explanation for a difference between them is the change itself; outside factors such as seasonality, marketing campaigns or the news cycle hit both groups equally.

That is the key difference from a before-and-after comparison. If you ship the new design and compare this week with last week, you cannot tell whether the difference came from the design or from a discount that happened to start the same week.

## Start with a hypothesis and a metric

A good experiment starts with a hypothesis written down before anyone looks at data: "Reducing checkout from three steps to two will increase the purchase rate among users who reach the checkout page." That sentence pins down what you change, who you measure and which metric you look at.

Before launching, decide on:

- **A primary metric:** one measure that defines success (for example, purchase rate).
- **Guardrail metrics:** measures that must not get worse (page load time, refund rate, complaints).
- **A minimum meaningful effect:** the smallest change worth caring about from a business point of view.
- **Duration and sample size:** how long the test will run and how many users it needs.

## Randomisation

Randomisation exists to make the two groups alike in every respect before the experiment starts. In practice assignment is usually done per user: the same person should see the same version on every visit. Assigning per page view can expose one person to both versions and blur the results.

It is also worth checking that assignment actually worked. If you planned a 50/50 split and one group ended up with noticeably fewer users, that usually points to a technical bug. Find the cause before trusting any results.

## Building intuition for sample size

"How many users do we need?" is one of the most common questions. The answer depends on three things: the current conversion rate, the smallest difference you want to detect, and how much certainty you want. The short function below estimates users per group for a test comparing two proportions, at a 5% significance level and 80% power:

```python
from math import ceil
from statistics import NormalDist

def sample_size_per_group(p_baseline, min_lift, alpha=0.05, power=0.80):
    """Approximate users per group for a two-sided test of two proportions."""
    p1 = p_baseline
    p2 = p_baseline + min_lift
    z_alpha = NormalDist().inv_cdf(1 - alpha / 2)
    z_power = NormalDist().inv_cdf(power)
    variance = p1 * (1 - p1) + p2 * (1 - p2)
    return ceil((z_alpha + z_power) ** 2 * variance / min_lift ** 2)

print(sample_size_per_group(0.05, 0.01))    # 8155
print(sample_size_per_group(0.05, 0.005))   # 31231
print(sample_size_per_group(0.05, 0.0025))  # 122121
```

The output shows an important intuition. With a 5% purchase rate, detecting a 1-point lift needs roughly 8,000 users per group. A half-point lift needs about 31,000, and a quarter-point lift about 122,000. Halve the effect you want to detect and the required sample roughly quadruples. Small effects are expensive to measure.

## Significance versus practical effect

When a test ends, people usually look at a p-value, and p-values are often misread. The American Statistical Association's 2016 statement is explicit: a p-value does not measure the probability that the hypothesis is true, and it does not measure the size or importance of an effect. Decisions should not rest only on whether a p-value crosses a threshold.

So alongside "is it significant?", ask "how big is it?" With a very large sample, a difference too small to matter for the business can still be statistically significant. With a small sample, an important effect can look "not significant". Reporting the estimated effect and its confidence interval tells decision-makers far more than a single p-value.

<div class="callout"><strong>Tip:</strong> Instead of writing "version B was significant" in your report, write something like "version B increased the purchase rate by an estimated 0.6 points, with a confidence interval from 0.1 to 1.1 points." It is far more useful to whoever has to decide.</div>

## Peeking and multiple testing

One of the most common mistakes is checking results constantly while the test runs and stopping as soon as something looks significant. In Evan Miller's well-known article on the topic, a change with no real effect, tested after every observation and stopped at the first significant result, produces a false positive rate of 26.1% instead of the nominal 5%. The simplest fix is to fix the sample size in advance and not decide until the experiment is complete. If you genuinely need to stop early, use sequential testing methods designed for that purpose.

A similar problem appears with multiple testing. If you check twenty metrics or twenty user segments separately, each can come out "significant" with 5% probability even when nothing real is happening; across twenty independent tests, the chance that at least one is significant by luck is about 64%. Choosing the primary metric up front and applying corrections when making many comparisons reduces that risk.

## When not to A/B test

A/B testing is powerful, but it is not the right tool for every question:

- **Not enough traffic:** if you cannot reach enough users, the test either runs for months or ends inconclusively. User interviews and qualitative research may be a better use of time.
- **Ethical or legal limits:** changes that could harm or mislead users, or breach legal obligations, should not be tested.
- **Users influence each other:** in messaging apps or marketplaces, one group's behaviour can affect the other, and simple per-user randomisation can mislead.
- **Long-term effects:** brand perception or year-long loyalty may not show up in a few weeks. Curiosity about a new design can also inflate early results temporarily.
- **The right answer is already clear:** a bug fix or a security update does not need an experiment.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Randomisation lets an A/B test separate the effect of a change from outside factors.</li><li>Fix the hypothesis, primary metric and sample size before the test starts.</li><li>Halving the effect you want to detect roughly quadruples the sample you need.</li><li>A p-value says nothing about effect size; report the estimate and its confidence interval.</li><li>Peeking and many metrics sharply increase the risk of false positives.</li></ul></div>

<div class="faq"><details><summary>How long should an A/B test run?</summary><p>Duration follows from the required sample size and daily traffic. Because weekday and weekend behaviour can differ, it is common practice to cover at least one or two full weeks even if the sample fills up sooner.</p></details><details><summary>Can I test more than two versions at once?</summary><p>Yes, this is often called an A/B/n test. Each extra version splits the traffic further and adds comparisons, so you need a larger sample and a correction for multiple testing.</p></details><details><summary>What does a non-significant result mean?</summary><p>It does not mean the change had no effect. It means this experiment could not distinguish an effect of the size you planned for. The confidence interval shows the range of effects that remain plausible.</p></details><details><summary>Do Bayesian methods solve the peeking problem?</summary><p>Bayesian approaches express results differently, but the claim that continuous monitoring has no effect on error rates is disputed. Whatever method you use, defining the stopping rule in advance is good practice.</p></details></div>

---

**Sources**

- [Kohavi, Tang and Xu – Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing (Cambridge University Press, 2020)](https://doi.org/10.1017/9781108653985)
- [American Statistical Association – Statement on Statistical Significance and P-Values (2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
- [Wasserstein and Lazar – The ASA's Statement on p-Values: Context, Process, and Purpose](https://doi.org/10.1080/00031305.2016.1154108)
- [Evan Miller – How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
