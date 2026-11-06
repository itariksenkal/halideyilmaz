---
title: "Model Interpretability (XAI): Why Did a Model Decide That Way?"
description: "An intuitive guide to SHAP, LIME, and attention visualization: why a model decides the way it does, and how these explanations strengthen trust and accountability."
publishDate: "2026-08-09T23:42:00+03:00"
lang: en
category: "Interpretability"
tags: ["Interpretability", "AI"]
translation: "model-yorumlanabilirligi"
heroImage:
  src: "../../../assets/blog/covers/model-interpretability-xai.jpg"
  alt: "Model Interpretability (XAI): Why Did a Model Decide That Way?"
---

When a model says "I'm denying your loan," the real question isn't "is it right?" but "why?" Explainable AI (XAI) aims to translate the reasoning behind a prediction into human terms. In this post we walk through SHAP, LIME, and attention visualization with everyday intuition, and we discuss how interpretability is woven together with trust and accountability.

## Why the "why" matters

The difference between a doctor saying "this test looks fine" and "these three values are above normal, so I want a follow-up" is explainability. The first gives the result; the second gives the reasoning too. AI models often behave like the first doctor: they produce a highly accurate number but say nothing about how that number came to be.

Complex models (deep networks, gradient-boosted trees) interleave millions of parameters, which is why they are often called "black boxes." Interpretability is the set of methods built to shine a light inside the box. There are two basic needs:

-   **Local explanation:** "Why did this single prediction come out this way?"
-   **Global explanation:** "Which features does the model weigh in general?"

> Accuracy tells you _how_ right a model is; interpretability tells you _why_ it is right (or wrong).

## SHAP: splitting credit fairly

SHAP (SHapley Additive exPlanations) draws on Shapley values from cooperative game theory. The intuition: a team won a match; how do we fairly distribute each player's contribution to the win? The answer is to add each player to the team in different orders and average the extra value they bring.

In a model, the "players" are the features (age, income, payment history...), and the "win" is the prediction value. SHAP measures how far each feature pushes the prediction away from an average baseline. The elegant part is that the contributions sum exactly to the prediction:

```text
prediction = base_value + Σ shap_value[feature]

# Example: credit score prediction (higher = approval likelihood)
base_value             = 0.50
shap[income]           = +0.18   # income pushed it up
shap[past_late_pay]    = -0.22   # late payments pulled it down
shap[age]              = +0.04
# ----------------------------------
prediction = 0.50 + 0.18 - 0.22 + 0.04 = 0.50
```

This table is easy to read: past late payments were the biggest factor pulling this application down. SHAP's greatest strength is being consistent and additive; the explanations align mathematically with the prediction rather than being fabricated to match intuition.

<div class="callout"><strong>Tip:</strong> Exact SHAP computation grows exponentially with the number of features. In practice, TreeSHAP is used for tree-based models and sampling-based approximations for others, keeping the computation scalable.</div>

## LIME: a local, simple surrogate

LIME (Local Interpretable Model-agnostic Explanations) works from a different intuition. Explaining a complex model as a whole is hard; but _around_ a single prediction, the model behaves almost linearly. LIME trains a simple surrogate (for instance, a linear regression) that mimics the model in that small region.

Analogy: you can't describe an entire winding mountain road with one equation, but at the exact spot where you're standing, the road's slope can be expressed as a single number. LIME measures the slope "right here."

1.  Generate new samples by making small perturbations around the instance to explain.
2.  Get predictions for these samples from the original complex model.
3.  Weight each sample by its closeness to the center.
4.  Fit a simple, interpretable model to this weighted data.

LIME is model-agnostic: it works by looking only at input-output behavior, knowing nothing about the internals. This flexibility is an advantage, but there's a downside too: because of random sampling, explanations can shift slightly from run to run. SHAP is more stable; LIME is faster and more intuitive.

## Attention visualization: where did the model look?

In text and image models (especially Transformers), the "attention" mechanism produces a weight distribution showing which parts of the input the model emphasizes at each step. Plotting this as a heatmap gives a powerful visual explanation: if a translation model concentrates on the source word "pen" while generating its target equivalent, we can see that link in color.

For image models, methods like Grad-CAM similarly mark, in warm colors, which region of the image the model looked at while deciding "cat." If it focused on ears and whiskers, we feel reassured; if it focused on the grass in the background, we question the model.

> Important caveat: attention weights are not always an "explanation." High attention does not prove that a part made a _causal_ contribution to the decision; it only shows that the model looked there during processing. Use it as a clue, not as conclusive proof.

## Trust, accountability, and pitfalls

Interpretability is not a technical luxury; in many domains it is a legal and ethical requirement. In high-stakes decisions like credit, insurance, healthcare, and hiring, the affected person has a right to know the reasoning. An explainable model makes the following possible:

-   **Trust:** experts can audit and approve the model once they see the reasoning.
-   **Debugging:** if the model gives the right answer for the wrong reason (e.g., data leakage), you can catch it.
-   **Fairness auditing:** you can see whether a forbidden feature (e.g., indirect discrimination via zip code) has crept into the decision.
-   **Accountability:** decisions become contestable and documentable.

Still, explanations are not perfect. An explanation can be misleading; a simplified surrogate does not carry every nuance of the original model. "Explainable" and "correct" are not the same: a convincing-looking explanation does not justify a wrong model. That's why explanations should be used alongside model evaluation, not instead of it.

For more context on responsible AI design and auditable systems, take a look at the [HatsonTech](/en/posts/how-hatsontech-started/) approach.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Interpretability answers "why," not "what"; it complements accuracy rather than replacing it.</li><li>SHAP comes from game theory; it is consistent and additive, with contributions summing to the prediction.</li><li>LIME trains a simple surrogate around a single prediction; it is fast and model-agnostic but less stable.</li><li>Attention and Grad-CAM show "where the model looked," but high attention is not proof of causality.</li><li>In high-stakes decisions, explainability is essential for trust, fairness auditing, and accountability.</li></ul></div>

<div class="faq"><details><summary>Should I use SHAP or LIME?</summary><p>If stability and mathematical consistency are the priority and you have enough compute, SHAP is preferred; TreeSHAP is especially efficient for tree-based models. If you need a fast, intuitive, model-agnostic explanation, LIME is practical. Using both and cross-checking their consistency is also a common practice.</p></details><details><summary>Are attention weights the model's true reasoning?</summary><p>Not exactly. Attention shows which parts of the input the model emphasizes during processing, but that doesn't necessarily mean a causal explanation. Treat it as a useful clue rather than conclusive proof, and back it up with methods like SHAP when possible.</p></details><details><summary>Does interpretability reduce accuracy?</summary><p>It depends on the method. Post-hoc methods like SHAP and LIME explain a trained model without changing it, so they don't affect accuracy. Inherently interpretable simple models (linear models, shallow trees) can sometimes yield lower accuracy, raising the classic trade-off between explainability and performance.</p></details></div>

---
