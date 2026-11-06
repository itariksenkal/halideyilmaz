---
title: "Causal Inference and Uplift Modelling: “Who Will Buy?” Is the Wrong Question"
description: "A churn model that perfectly predicts who will leave tells you nothing about whom to call. Uplift modelling, the four segments, confounders versus colliders, what to do when you cannot randomise, and why reading SHAP causally is a mistake."
publishDate: "2026-08-13T23:09:00+03:00"
lang: en
category: "Methods"
tags: ["Methods", "AI"]
translation: "nedensel-cikarim-uplift"
heroImage:
  src: "../../../assets/blog/covers/causal-inference-uplift-modeling.jpg"
  alt: "Causal Inference and Uplift Modelling: “Who Will Buy?” Is the Wrong Question"
---

Suppose your churn model is flawless: it tells you almost exactly which customers will leave next month. You hand the list to the call centre. How many customers did you save? The answer is not in the model — because the model answered “who will leave”, while the question you asked was “whom can I call and change something”. Those are two different questions, and the distance between them is the distance between predictive modelling and causal inference.

## Prediction is one thing, intervention is another

Think about the customers with the highest probability of leaving. Very often those are the ones who have already decided: they moved, their company closed, they signed a two-year contract with a competitor. Calling them is a polite gesture, but it is not a budget plan. The names your model puts at the top of the list may be exactly the names where intervention does nothing.

Put technically: a predictive model learns `P(Y | X)` — what happens in the world _as it currently is_. What you need is `τ(x) = P(Y | do(T=1), X=x) − P(Y | do(T=0), X=x)`, the individual treatment effect. The second cannot be derived from the first. There is no formula bridging them.

The practical consequence is uncomfortable: a model with an AUC of 0.92 can carry zero information about campaign return. However good your [classification metrics](/en/posts/classification-metrics/) look, what they measure is ranking quality, not the value of an intervention. A good predictor and a good decision tool are not the same object.

Once you see the gap, you start noticing how many dashboards in your organisation answer the wrong question. “This segment converts well” does not tell you the budget aimed at that segment was well spent. It only tells you that segment converts.

## Four segments: whom should you actually call?

The uplift literature sorts an audience into four boxes. The boxes are defined not by who people are, but by _what happens when you intervene versus when you do not_:

-   **Persuadables:** they stay or buy if you intervene, and you lose them if you do not. All of your return comes from here.
-   **Sure things:** they were going to buy anyway. Giving them a discount is voluntarily burning your own margin.
-   **Lost causes:** they are leaving whatever you do. The contact cost is pure waste.
-   **Sleeping dogs (do not disturb):** intervening makes things _worse_. The email that reminds someone of a forgotten subscription, the call that draws attention to contract terms. Their effect is negative.

Here is the critical part. A predictive churn model sorts the list by probability of leaving, which puts **lost causes** at the top. A purchase model sorts by probability of buying, which puts **sure things** at the top. Ranking by probability sends money to the least productive place at both ends.

An uplift model ranks by the _difference_ in probability rather than the probability itself. The same distinction lives inside [recommender systems](/en/posts/recommender-systems/): recommending the item a user will click is not the same job as recommending the item the user would never have found without you. The first approach puts what the person was already searching for in the window and declares victory. The distinction has a measurable price tag — [one published deployment study](https://arxiv.org/abs/2607.05242) reports a 4.08% platform-wide increase in incremental GMV.

<div class="callout"><strong>Tip:</strong> Sleeping dogs are not a theoretical curiosity; they turn up routinely in reminder emails, retargeting and “we miss you” campaigns. The only way to see them is to hold back a control group, because even if everyone you touched improved, the possibility that more of them would have improved untouched never leaves the table.</div>

## Confounders, colliders, mediators: not every control is a good control

When you try to answer a causal question with observational data, the first enemy is the **confounder**: a common cause of both the treatment and the outcome. If you sent the campaign to your most loyal customers, the reason recipients bought more is loyalty, not the campaign. Fail to account for the confounder and you overstate the effect.

So far intuition holds. The trap is the next step. The reflex you bring from predictive modelling says “throw in every variable I have, extra ones do no harm.” In a causal question that reflex is wrong, and it is wrong in two distinct ways.

### Colliders

A collider is a variable _affected by_ both the treatment and the outcome. Leave it alone and it causes no trouble; control for it and you manufacture a relationship that does not exist. Support-ticket volume is a good example: it responds both to the campaign and to intent to leave. The moment you add it to the model, you see a link between them that was never there.

### Mediators

A mediator sits on the causal path: campaign → app usage → retention. Control for app usage and you erase part of the very effect you set out to measure, then report a total effect smaller than the real one.

In [feature engineering](/en/posts/feature-engineering/), an extra variable is usually harmless at worst. In a causal question, an extra variable can corrupt the answer. That is why causal analysis asks you to draw a diagram before writing code: which arrow points where, and what role does each variable play?

> Choosing variables for prediction is an optimisation problem. Choosing variables for causal inference is a declaration of assumptions — and those assumptions cannot be read off the data.

## Randomisation is the gold standard; what to do when you cannot randomise

The power of a randomised experiment is not that it balances the variables you measured. Its real power is that it balances **the ones you did not.** When assignment is decided by a coin flip, the only systematic difference between groups is the treatment; even a variable that never entered your database is equalised on average. No observational method can offer that guarantee.

But you cannot always randomise: you may not be able to apply a price change to only some customers, a regulation comes into force for everyone on the same day, or the event has already happened. Four classical designs step in here. Each buys you an answer in exchange for an assumption, and if the assumption fails, so does the answer.

-   **Difference-in-differences:** compares the before-and-after change in a treated group against an untreated one. The assumption: absent the treatment, the two would have moved in parallel.
-   **Synthetic control:** builds a virtual twin from a weighted combination of untreated units. It shines when a single unit — a city, a country, a store — was treated.
-   **Regression discontinuity:** if treatment is tied to a sharp threshold, units just above and just below the cutoff are separated almost at random. It is a small experiment nature hands you for free.
-   **Instrumental variables:** if you can find a variable that affects the treatment but touches the outcome only through it, you have borrowed a source of randomisation from outside your system.

`CausalPy` 0.9.0 (28 July 2026, from PyMC Labs) packages all four and is a reasonable starting point. `DoWhy` 0.14 (November 2025) is built around stating the causal graph and its assumptions explicitly, while `EconML` 0.17.0 (31 July 2026) and `CausalML` 0.17.0 (4 July 2026) are actively maintained options for effect estimation. Choosing the library is the easy decision here; the hard one is which assumption you are prepared to defend.

## How uplift models are trained — and why evaluation is genuinely hard

Three approaches dominate, and all of them start from data where the treatment assignment is known, ideally randomised.

-   **Two-model / T-learner:** fit one model on the treated group and a separate one on the control group; uplift is the difference. Simple, but the errors of two models accumulate in the difference, and when the true effect is small the noise swallows it.
-   **Single model / S-learner:** the treatment flag enters as an ordinary feature. It does not split the data, but if the model finds that flag unimportant it will systematically predict uplift near zero.
-   **Transformed outcome:** the target is rescaled by the assignment probability so that a single regression estimates the effect directly. Variance is high, but for ranking purposes it is often enough.

The hard part is not training, it is evaluation. The fundamental problem of causal inference is this: **you never observe both potential outcomes for the same unit.** If you called the customer, you cannot know what would have happened if you had not. There is no row-level ground truth, therefore no row-level error. Evaluation is necessarily done at group level: you split by score into buckets and look at the treated-versus-control difference within each bucket. The uplift curve, the Qini coefficient and AUUC are different packagings of that one idea.

```python
# Skeleton of an uplift evaluation (pseudocode)
# Precondition: a randomised test set with a held-out control group
score = uplift_model.predict(test)        # estimated effect, not probability
for bucket in split_into_deciles(test, score):   # highest effect first
    t = mean_outcome(bucket, treated=1)
    c = mean_outcome(bucket, treated=0)
    record(bucket, t - c)                 # observed incremental effect
# A good model: large gap in the top buckets, zero or negative at the bottom
# Report a confidence interval per bucket; one curve alone is not evidence
```

Which metric is the right one is also not a closed debate. [The UpliftBench study](https://arxiv.org/abs/2608.00915) finds that disagreement between _metrics_ drives inconsistency across benchmarks more than the choice of model does, and that AUUC aligns better with effect accuracy than the Qini coefficient. “Which uplift metric” is still an open question, so do not report a single number on its own.

## SHAP is not causal — and almost every XAI article reads it as if it were

Now to the spine of this post. Most published material on explainability reads SHAP output causally: “this feature has a high contribution, therefore changing it will change the outcome.” That sentence is wrong, and SHAP's own documentation says so.

> Making correlations transparent does not make them causal.

[That warning in the SHAP documentation](https://shap.readthedocs.io/en/latest/example_notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.html) comes with a worked example in which reading the attribution values leads to the conclusion that the engineering team should _introduce more bugs_ into the product. The absurdity is not a software fault; it is an artefact produced jointly by unobserved confounding and redundancy among the observed features. The model is behaving correctly on its own training distribution. What is broken is reading its output as an instruction to act.

The same critique exists in the literature: the [ICML 2020 critique of feature attribution as causation](https://arxiv.org/abs/2002.11097) maps out the limits of that reading. There is one more detail that practitioners skip surprisingly often: when computing Shapley values you must choose whether to stay _true to the model_ or _true to the data_, and the two choices produce different numbers. That [interventional-versus-observational fork](https://arxiv.org/abs/2006.16234) means the same model on the same row can yield two legitimate but different explanations.

<div class="callout"><strong>Tip:</strong> <a href="https://artificialintelligenceact.eu/article/15/" target="_blank" rel="noopener">Article 15 of the EU AI Act</a> requires safeguards against feedback loops in which biased outputs become future inputs. A feedback loop is by definition a causal problem: predictive modelling cannot diagnose it, because the loop is created by the model's own output. Meeting that article needs a causal frame, not a better attribution plot.</div>

So do we throw SHAP away? No. SHAP 0.52.0 (28 May 2026) is still a good tool for understanding what a model _learned_ — we go into that in [model interpretability](/en/posts/model-interpretability-xai/). The correct sentence is simply this: SHAP explains the behaviour of the model, not the behaviour of the world. If you want a model that is interpretable from the start, InterpretML's [Explainable Boosting Machine](https://github.com/interpretml/interpret) is a serious option. But none of these answers the question “what should we change” without a causal design behind it.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Knowing who will churn does not tell you whom to call; the quantity you need is a treatment effect, not a probability.</li><li>Four segments: persuadables generate the return, sure things burn margin, lost causes burn budget, and sleeping dogs turn the effect negative.</li><li>In a causal question, adding every variable hurts: a collider manufactures a relationship, a mediator erases the effect you are measuring.</li><li>Randomisation balances the variables you did not measure; without it you are left with difference-in-differences, synthetic control, regression discontinuity and instrumental variables.</li><li>A SHAP contribution is not a causal effect, and the clearest statement of that comes from SHAP's own documentation.</li></ul></div>

<div class="faq"><details><summary>Do I need a randomised experiment to build an uplift model?</summary><p>Not to train one, but in practice yes to evaluate one honestly. If treatment assignment came from your own decisions, you must separate confounding, which means a design such as difference-in-differences, synthetic control, regression discontinuity or instrumental variables. The cheapest fix is usually to hold back a small permanent percentage of every campaign as a control group.</p></details><details><summary>How do I know whether my uplift model is any good?</summary><p>You cannot know at row level, because you never see both outcomes for the same unit. Evaluation happens at group level: split by score into buckets and compare treated against control within each. The uplift curve, AUUC and Qini are different summaries of that; the UpliftBench study reports that disagreement between metrics shifts benchmark results more than the choice of model, so do not lean on a single number.</p></details><details><summary>Should I stop using SHAP altogether?</summary><p>No, but use it for the right question. SHAP shows how a model assembled a prediction, which is valuable for debugging, spotting leakage and noticing that a model has leaned on an unexpected variable. Deciding what to change in the world requires a causal design instead. If you want interpretability from the outset, alternatives such as the Explainable Boosting Machine are worth considering.</p></details></div>

---

In short: “who will buy?” is a good prediction problem and a poor decision problem. An action plan is built on differences, not on probabilities. The team that keeps a control group, writes its assumptions down, and stops mistaking explanations for instructions will get more out of the same budget — and, more importantly, will be able to prove it.
