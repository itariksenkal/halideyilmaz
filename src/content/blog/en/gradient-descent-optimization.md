---
title: "Gradient Descent and Optimization: How Does a Model \"Learn\"?"
description: "An intuitive walk through gradient descent via the loss function, learning rate, SGD and Adam: how does a model really \"learn\" by measuring and reducing its error?"
publishDate: "2026-08-09T23:46:00+03:00"
lang: en
category: "Training"
tags: ["Training", "AI"]
translation: "gradyan-inisi-optimizasyon"
heroImage:
  src: "../../../assets/blog/bimg-04.jpg"
  alt: "Gradient Descent and Optimization: How Does a Model \"Learn\"?"
---

On a foggy night, you're on the slope of a mountain you've never seen, and your only goal is to reach the bottom of the valley. You have no map and can't see far. All you can do is feel the slope beneath your feet, find the _steepest downhill direction_, and take a small step that way. Then look again, step again. This is exactly how an AI model "learns" — and the method is called **gradient descent**.

## Learning is a game of reducing error

Inside a model are **parameters** (weights): millions of numbers, randomly set at the start. The model makes a prediction; the further that prediction strays from the true answer, the more "wrong" it is. Learning is nothing more than nudging those millions of numbers, little by little, to shrink that gap step by step. The model doesn't "understand" anything; it constantly measures its error and corrects itself in the direction that minimizes it.

Think of a cook adjusting salt. They taste the soup, say "a bit flat," add a pinch of salt; taste again, adjust again. Each time they edge closer to the goal (perfect flavor). The model's "flavor" is a numerical error, and its "salt" is its parameters.

> "Learning isn't knowing the right answer; it's moving systematically from a wrong answer toward a right one."

## The loss function: how is error measured?

To correct the model, we first need to express its error as a single number. The thing that does this is called the **loss function**. Loss is the quantitative answer to "how far is my prediction from the truth?" A large loss means the model is bad; a small one means it's doing well. The entire goal of training is to make this number as small as possible.

Which loss function you use depends on the problem:

-   For **regression** (predicting a number, e.g., a house price), a common measure is _mean squared error_: the difference between prediction and truth is squared. Squaring penalizes large errors disproportionately.
-   For **classification** (predicting a category, e.g., "cat or dog"), a common measure is _cross-entropy_: the lower the probability the model assigns to the correct class, the larger the penalty.

Picture the loss function as a surface that gives the mountain's height. Every combination of parameters is a point on this surface; its height is the error at that point. The bottom of the valley is where the error is smallest. Our job is to get there.

<div class="callout"><strong>Tip:</strong> The loss function must be <em>differentiable</em> (smooth, with a computable slope). That's because the whole secret of descent lies in being able to measure the slope at every point.</div>

## Gradient descent: the math of walking downhill

The **gradient** is the mathematical tool that gives the direction and steepness of the slope on a multidimensional surface. Picture the slope of a single hill: the gradient is like an arrow pointing in the "steepest uphill direction." If we want to go down, we simply move in the _opposite_ direction of that arrow. That's where the step gets its name: descent along the negative gradient.

The process is just this loop:

1.  **Predict:** Compute the output with the current parameters.
2.  **Measure loss:** Reduce the prediction's distance from the truth to a single number.
3.  **Compute the gradient:** In which direction, and by how much, does each parameter change the loss? (This is computed via _backpropagation_.)
4.  **Update:** Nudge each parameter by a small amount in the direction that reduces the loss.

This loop repeats thousands, even millions of times. Each round the loss shrinks a little; the model becomes "a little less wrong." After enough rounds, the parameters settle at a point where the error is very low.

## Learning rate: how big should each step be?

The gradient tells us _which direction_ to go, but not _how big a step_ to take. The number that sets this step size is called the **learning rate**, and it's the most critical setting in training.

-   **Too small:** The steps are tiny; descending into the valley becomes painfully slow. You walk patiently and accurately, but it takes forever.
-   **Too large:** You overshoot the valley floor with giant strides and end up on the opposite slope; you bounce back and forth, and may never descend at all (divergence).
-   **Just right:** You approach the bottom quickly but steadily.

In the foggy-mountain analogy, the learning rate is your decision of "how many meters do I walk after each look?" It often helps to use a larger rate early in training and a smaller one as you progress; this is called a _learning rate schedule_.

## SGD: a handful of steps instead of the whole mountain

In pure gradient descent we look at the _entire_ dataset to compute the gradient for each step. That's very accurate but unbearably slow when there are millions of examples. The fix is to use a small random portion of the data at each step. This is called **stochastic gradient descent** (SGD); the word "stochastic" refers to that randomness.

In practice we usually use not a single example but a small group (say 32 or 64); these groups are called _mini-batches_. The cost is that the gradient becomes a bit "noisy": each step may not point in exactly the right direction. But this noise is often a feature, not a flaw:

-   Much faster: because each step is cheap, you take far more steps in the same time.
-   The noise can keep the model from getting stuck in shallow, bad "pits" (local minima); small jolts can fling it into a better valley.

<div class="callout"><strong>Tip:</strong> "Batch size" and "learning rate" are linked. If you increase the batch size, you usually need to raise the learning rate too; tuning the two together works best.</div>

## Momentum and Adam: smarter steps

Pure SGD sometimes zigzags back and forth across a narrow, long valley, leaving real forward progress slow. To solve this, optimization methods matured.

### Momentum

Picture a ball rolling downhill: thanks to the speed it builds up, the ball rolls over small bumps and keeps its general direction. **Momentum** does exactly this: it accumulates part of past steps as "velocity," so it accelerates in a consistent direction and damps out the zigzags.

### Adam

One of the most widely used methods today is **Adam** (Adaptive Moment Estimation). Adam combines two ideas: like momentum it remembers past direction, _and_ it adapts the step size separately for each parameter. Some parameters should learn fast, others slow; Adam balances this automatically. The result: on most problems, fast and stable training with little tuning.

Think of it as an experienced climber managing each foot separately: small steps on slippery ground, big ones on firm footing. Still, Adam is no magic wand; in some cases a well-tuned SGD + momentum can generalize better. The right choice depends on the problem.

## The learning loop in a few lines

Let's see the whole idea in pseudocode. The heart of the update rule is a single line: `parameter = parameter − rate × gradient`.

```text
# Start: parameters random
params = random_init()
rate = 0.01            # learning rate

for each epoch:
    shuffle(data)
    for each mini_batch (in data):
        pred = model(mini_batch, params)
        loss = loss_function(pred, truth)

        # gradient: differentiate loss w.r.t. each param (backprop)
        grad = derivative(loss, params)

        # small step in the OPPOSITE direction of the gradient
        params = params - rate * grad

    print("end-of-epoch loss:", loss)
```

Advanced methods like Adam enrich that last line: instead of the raw gradient, they use a step that is filtered from the past and adapted per parameter. But the essence stays the same: _measure, find the slope, take a small step the other way, repeat._

<div class="takeaways"><h4>Key takeaways</h4><ul><li>A model doesn't "learn"; it measures its error and adjusts its parameters to minimize it.</li><li>The loss function reduces error to a single number; training is the game of shrinking that number.</li><li>Gradient descent walks to the valley floor by following the loss's slope in the opposite direction.</li><li>The learning rate is the step size: too small is slow, too large is unstable.</li><li>SGD speeds things up by processing data in small groups; momentum and Adam make the steps smarter.</li></ul></div>

---

In short, a model's "learning" is like finding your way down a foggy mountain by feel, step by step: measure the loss, compute the slope, take a small step the other way, repeat thousands of times. The learning rate sets the size of that step, SGD its speed, and Adam its accuracy. This simple yet deep loop beats at the heart of nearly every AI system today. If you're curious how these ideas turn into real products, take a look at [HatsonTech](/en/posts/how-hatsontech-started/), which focuses on applying AI to real work.

<div class="faq"><details><summary>What exactly is a gradient?</summary><p>The gradient is a vector made of the loss's partial derivatives with respect to each parameter. On a multidimensional surface it points in the "steepest uphill" direction; to reduce error, we move in the opposite direction.</p></details><details><summary>What's the difference between SGD and batch gradient descent?</summary><p>Batch gradient descent looks at all the data on every step — accurate but slow. SGD uses a random small group (mini-batch) on each step — a bit noisy but much faster, and it often yields better results.</p></details><details><summary>Should I always use Adam?</summary><p>Adam is a strong default because it works well with little tuning in most cases. But a well-tuned SGD + momentum can generalize better on some problems. The best approach is to experiment per problem; there is no single right method.</p></details></div>
