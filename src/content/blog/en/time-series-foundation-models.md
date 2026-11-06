---
title: "Time-Series Foundation Models: Zero-Shot Forecasting Now Beats the Classics — But Does It Beat Yours?"
description: "The answer flipped and most published content has not caught up. What fev-bench and GIFT-Eval actually report, why LLM-adapted forecasters are a separate story, and how to run the comparison honestly on your own series."
publishDate: "2026-08-13T23:07:00+03:00"
lang: en
category: "Methods"
tags: ["Methods", "AI"]
translation: "zaman-serisi-temel-modelleri"
heroImage:
  src: "../../../assets/blog/bimg-03.jpg"
  alt: "Time-Series Foundation Models: Zero-Shot Forecasting Now Beats the Classics — But Does It Beat Yours?"
---

In time-series forecasting, the sentence that was true two years ago is false today. The 2024-era verdict that foundation models still lose to ARIMA no longer holds; but the launch-copy claim that forecasting is now solved is not right either. The honest headline sits between them: **purpose-built time-series foundation models won, and bolting a language model onto forecasting did not.** This post covers what the numbers say, what they do not say, and how to set the comparison up on your own data.

## The answer flipped; most content still prints the old one

Search this topic and you get two kinds of article. The first is the launch content that forms around model announcements: zero-shot forecasting beats everything. The second is the critique written around 2024, entirely justified by the evidence available then: foundation models fall behind simple statistical methods. Both are now misleading.

The difference between them is a date. The field moved quickly and benchmarks published towards the end of 2025 reversed the conclusion of earlier evaluations. But a benchmark result flipping does not mean the flipped version is permanent; it only tells you what the most recent measurement we have says.

So in this post every number is tied to the dated paper that reports it. Presenting a benchmark table as the current state of the world is the most common way an article becomes wrong six months after publication.

> A benchmark table tells you something about the models and the datasets in the table. Your series is not in the table.

And that is the real point. A win rate measured over a hundred tasks says nothing about what will happen on your weekly demand series. The second half of this post is devoted precisely to that question: how do you run the comparison on your own data?

## What zero-shot forecasting means, and why it works

In the classical approach you build a separate model for each series: look at the data, identify the seasonality, estimate parameters from that series' own history. That is the discipline described in [time-series forecasting](/en/posts/time-series-forecasting/), and it works well — as long as you have enough history.

A time-series foundation model inverts that arrangement. The model is pretrained on a large corpus of millions of different series. What it learns is not the parameters of any one series but the general grammar of series: how a trend looks, how seasonality breaks, how a spike decays. It then takes a series it has never seen and produces a forecast **with no training at all**. That is zero-shot forecasting.

To see why it helps, think about the weakest case: you have eighteen months of history. Not enough to estimate seasonality with confidence, and nowhere near enough to train a machine-learning model. The best the classical route can do is fit parameters on a coarse assumption. A pretrained model, by contrast, looks at that series carrying the knowledge of thousands of similar patterns it has already seen. That is where its advantage in the low-data regime comes from.

The scale involved is also no longer enormous. Chronos-2 ([October 2025, 120 M parameters](https://github.com/amazon-science/chronos-forecasting)) and TimesFM 2.5 ([September 2025, 200 M parameters, 16k context](https://github.com/google-research/timesfm)) are small models next to today's language models, which puts the setup cost within reach for many teams.

## What the numbers say — and on what date they said it

[As reported in the fev-bench paper](https://arxiv.org/abs/2509.26468), across 100 tasks drawn from 7 domains, the results are as follows — win rate and skill score respectively:

-   **Chronos-2:** 91.4% win rate, 47.3% skill score.
-   **TiRex:** 83.3% and 42.6%.
-   **TimesFM-2.5:** 79.6% and 42.2%.
-   **Statistical Ensemble:** 45.5% and 20.7%.
-   **CatBoost:** 34.4% and 23.0%.
-   **Seasonal Naive:** 19.6% and 0.0%.

The paper's own conclusion is blunt: all pretrained models are substantially more accurate _and faster_ than the best statistical and task-specific models. The speed half gets dropped from most summaries, and in production it is often the half that decides.

As a second yardstick there is [GIFT-Eval](https://arxiv.org/abs/2410.10393): 23 datasets, 144,000 time series, 177 million data points, 7 domains, 10 frequencies and 17 baselines. Looking at two independent harnesses rather than leaning on one is the cheapest way to tell whether a result is a property of the models or of the harness.

<div class="callout"><strong>Tip:</strong> The figures above are measurements as of the publication of those papers, not the current live standing. Leaderboards move: new model versions ship, datasets get updated, evaluation protocols change. Before making a decision, check the live board for the benchmark in question and note which version was measured.</div>

One more caveat: win rate and error magnitude are not the same thing. A model can lead on 91% of tasks and lead by a hair on every one of them. How a single aggregate metric hides its own distribution is a permanent theme in the [choice of metric](/en/posts/classification-metrics/), and it applies here exactly as it does elsewhere.

## The counterweight: bolting an LLM onto forecasting did not work

To keep this from turning into marketing copy, it is worth stopping to draw a distinction. Two different ideas have been running under one heading in time-series forecasting:

-   **Models pretrained specifically for time series** — the Chronos family and its peers. Both architecture and pretraining corpus were designed for series.
-   **LLM-adapted forecasters** — an off-the-shelf language model adapted to consume numeric series.

[A study of the second group](https://arxiv.org/abs/2406.16964) finds that removing the LLM component, or replacing it with a basic attention layer, does not degrade forecasting performance. In other words the performance was not coming from the language model at all.

Read that finding carefully: **the critique targets LLM-adapted forecasters, not purpose-built time-series foundation models like Chronos.** Conflating the two is the most frequent citation error in this area. The accurate summary is that pretraining worked, and wedging a language model into the middle did not.

A similar story is unfolding on the tabular side and calls for the same caution. The reported result for TabPFN-3 is ambitious: it [beats 8-hour-tuned gradient-boosted-tree baselines on datasets up to 1M training rows](https://arxiv.org/abs/2605.13986). Against that, an independent [insurance-pricing study](https://arxiv.org/abs/2605.22892) finds it does not consistently outperform established baselines. Both can be true, because “wins on average” and “wins in your domain” are not the same sentence.

## Will it beat yours? Setting the comparison up properly

A benchmark table gives you a shortlist; it does not make the decision. Only a measurement on your own data does that, and running that measurement has a specific discipline.

### The measurement setup

-   **Seasonal-naive baseline first.** The rule that sets next period equal to the same period last year is a stubbornly hard opponent on a surprising number of production series. Any model that cannot beat it does not enter the conversation.
-   **Walk-forward validation.** A random split on a time series leaks the future into the past. Move the cutoff forward, forecast repeatedly, and pool the errors across those windows.
-   **The same horizon and the same cutoff for every candidate.** Two models measured at different horizons cannot be compared. This is the most common and the easiest mistake to miss.
-   **A leakage check.** A zero-shot model may have seen a public version of your dataset in its pretraining corpus. If you are testing on a public dataset, note that possibility explicitly.

```text
# A fair time-series comparison (pseudocode)
candidates = [seasonal_naive, statistical_model, gbdt_model, foundation_model]
horizon = 28                                # identical for every candidate
for cutoff in walk_forward_windows(series, step=horizon, count=12):
    history = series[:cutoff]               # nothing after the cutoff is visible
    for cand in candidates:
        t0 = now()
        pred = cand.forecast(history, horizon)   # same horizon, same cutoff
        record(cand, cutoff, error(pred, series[cutoff:cutoff+horizon]),
               latency=now()-t0)            # cost is part of the result
# Average over windows and report the spread too;
# a single window measures luck, not a model.
```

### Count cost as part of the result

Reporting a model's error metric without its inference cost and latency hides half the decision. If you forecast ten thousand series every night, a model that is 2% better and thirty times more expensive is usually the wrong choice. That is why the fev-bench paper's emphasis on speed matters: here, speed is a decision variable rather than a convenience.

<div class="callout"><strong>Tip:</strong> Report the variation across windows, not just the mean. If two models land close together, the question is whether the gap can be told apart from noise at all — which is exactly the subject of <a href="/en/posts/statistical-significance-model-comparison/">statistical significance in model comparison</a>. Do not change architecture over one decimal place.</div>

## When do classical methods still win?

General superiority in benchmarks does not retire the classics. In four situations they remain the first choice.

-   **Strong, known seasonality:** if you already know the seasonal structure for certain — public holidays, payday cycles, the academic calendar — encoding that knowledge directly is more reliable than waiting for a model to rediscover it from data.
-   **Exogenous regressors you must control:** if you need to see the effect of price, promotion or weather _separately_, a model with readable coefficients gives you something a foundation model will not.
-   **Hard interpretability requirements:** if you have to explain to an auditor or a board how a forecast was formed, an explainable structure is not negotiable.
-   **Tiny compute budgets:** on an edge device, inside an embedded system, or on a pipeline refreshing millions of series hourly, a statistical model is still the cheapest correct answer.

It is also worth drawing one boundary clearly: forecasting and [anomaly detection](/en/posts/anomaly-detection/) are not the same job. A foundation model may produce an excellent expected value, but “is this point anomalous” needs a threshold, an uncertainty band and a false-alarm budget. Swapping the forecasting model also breaks the calibration of your anomaly detector, so do not change both at once.

> The useful question is not “which model is better” but “which measurement will make this decision”. A team that answers the second is still ready when the answer to the first changes.

A practical closing recommendation: add the foundation model to your pipeline as an _additional candidate_, not as a replacement. Seasonal naive, your current model and one zero-shot foundation model — measure all three in the same harness, at the same horizon, on the same cutoffs. Let your own measurement decide rather than the table.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The answer flipped: as reported in the fev-bench paper, pretrained models came out both more accurate and faster than the best statistical and task-specific models.</li><li>Purpose-built time-series foundation models won; for LLM-adapted forecasters, removing the LLM component did not degrade performance.</li><li>A win rate measured over a hundred tasks tells you nothing about your series; only your own measurement decides.</li><li>Set the comparison up with a seasonal-naive baseline, walk-forward validation, and the same horizon and cutoff for every candidate.</li><li>Classical methods can still be the first choice under known seasonality, exogenous regressors, interpretability requirements or tiny compute budgets.</li></ul></div>

<div class="faq"><details><summary>If I use a foundation model, do I still have to train anything?</summary><p>You may not need training, but you always need evaluation. Zero-shot forecasting produces output directly for a series it has never seen, which removes most of the setup cost. Whether it works well on your series, however, is shown only by your own walk-forward measurement. Inference cost and latency are also now part of the decision.</p></details><details><summary>Can I trust the ranking on the benchmark boards?</summary><p>As a starting point yes, as a decision no. The numbers in this post are the measurements those papers reported, not the current live standing; leaderboards move as model versions and protocols change. Check the live board for the benchmark before deciding, and note which version was actually measured.</p></details><details><summary>Is the advantage on short series real?</summary><p>The low-data regime is where pretrained models are strongest. On an eighteen-month series you cannot estimate seasonality with confidence or train a machine-learning model at all, whereas a pretrained model looks at it carrying patterns it has already seen. Even so, do not decide without comparing against a seasonal-naive baseline.</p></details></div>

---

In short: the default starting point in time-series forecasting has changed, and refusing to accept that means working from stale information. But a benchmark headline is not a measurement of your series. The right reflex is simple: baseline with seasonal naive, measure candidates in one harness, count cost as part of the result, and run the same measurement again a year from now.
