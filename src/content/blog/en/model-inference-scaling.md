---
title: "Model Inference and Scaling: Cutting GPU Costs with Latency, Throughput, Quantization and the KV-Cache"
description: "A practical guide to latency, throughput, quantization, KV-cache and batching, with everyday analogies, focused on lowering the cost of GPU inference."
publishDate: "2026-08-09T23:31:00+03:00"
lang: en
category: "Scaling"
tags: ["Scaling", "AI"]
translation: "model-cikarimi-olcekleme"
heroImage:
  src: "../../../assets/blog/covers/model-inference-scaling.jpg"
  alt: "Model Inference and Scaling: Cutting GPU Costs with Latency, Throughput, Quantization and the KV-Cache"
---

Training a model is a one-time marathon; running it every day, on every request, is a race that never ends. In production, the real bill usually comes not from training but from inference. In this article we unpack latency, throughput, quantization, the KV-cache and batching with everyday analogies, and take a practical look at how to bring down your GPU costs.

## What is inference, and why is it expensive?

Inference is a trained model producing a response to new input: you type your question, and the model generates the answer word by word, or more precisely token by token. Training happens once, in the lab; inference runs live, for every user, millions of times a day. That is why, over the long run, most of the total GPU bill comes from inference.

An autoregressive language model produces text in two phases. First, in the **prefill** phase, it processes all the tokens in your input at once; this phase is compute-bound (it stresses the GPU's processing power). Then, in the **decode** phase, it produces output one token at a time; this phase is memory-bandwidth-bound, because every new token requires reading the model's full weights from memory.

> In short: prefill is like reading a letter, you scan it all at a glance; decode is like answering it by hand, line by line.

## Latency vs. throughput: two different clocks

These two measures are often confused, but they mean very different things:

-   **Latency:** How long a single request takes to complete. Two sub-metrics matter here: time to first token (TTFT) and the time between each subsequent token (TPOT, or tokens-per-second speed).
-   **Throughput:** How many tokens the system produces per unit of time in total; that is, tokens served across all users per second.

An analogy: in a cafe, how fast a single customer gets their coffee is latency. How many coffees the barista makes per hour is throughput. The interesting part: if the barista prepares several coffees at once, total throughput rises, but that one customer might wait a few seconds longer. Latency and throughput often compete with each other.

<div class="callout"><strong>Tip:</strong> In a chat interface the user wants to see the first word quickly, so optimize TTFT. For background jobs like bulk summarization, the speed of any single request is irrelevant, so maximize throughput.</div>

## KV-cache: never do the same work twice

Each time the model produces a new token, it attends to all previous tokens (attention). In a naive implementation the entire history is recomputed at every step; this is like re-reading the whole paragraph every time you add a sentence. The KV-cache steps in exactly here: it stores the computed key and value vectors of each token in memory, so the next step only needs to compute for the new token.

The benefit is large: redundant computation disappears and the decode phase speeds up considerably. The price is memory. The cache grows linearly with conversation length, and for long contexts it can take up even more space than the model weights themselves. When GPU memory fills up, you must either reduce the number of concurrent users or shorten the context.

```python
# Conceptual logic of the KV-cache (pseudocode)
kv_cache = []                      # empty at the start
for step in range(max_tokens):
    if step == 0:
        # prefill: process the whole input, store K/V
        k, v = model.encode(prompt)
        kv_cache = [k, v]
    else:
        # decode: compute only for the last token
        k_new, v_new = model.step(last_token)
        kv_cache.append((k_new, v_new))
    last_token = model.predict_next(kv_cache)
    if last_token == EOS: break
```

## Batching: leave with a full bus

A GPU often sits idle while processing a single request, because the decode phase is limited by memory bandwidth and the compute units wait empty. If you process several requests at once (batching), you get more work done from the same weight read. It is like leaving with a full bus instead of a half-empty one: same fuel, many more passengers.

In static batching all requests start at the same time and the rest wait until the slowest one finishes. Modern servers instead use **continuous batching**: when a request finishes, a new one from the queue takes its place immediately, keeping the GPU constantly full. This technique boosts throughput dramatically.

<div class="callout"><strong>Tip:</strong> Use mature servers like vLLM, TGI or TensorRT-LLM, which provide continuous batching and manage KV-cache memory in chunks via techniques like PagedAttention; don't reinvent this wheel.</div>

## Quantization: shrinking the suitcase

By default, model weights are stored as 16-bit floating point numbers (FP16/BF16). **Quantization** means representing those numbers with fewer bits: for example 8-bit (INT8) or 4-bit. Think of it like putting the clothes in your suitcase into vacuum bags to shrink the volume: same items, much less space.

The gains are concrete. Using 8-bit instead of 16-bit roughly halves the memory footprint of the weights, and 4-bit cuts it to a quarter. A smaller model means fewer memory reads, which speeds up the memory-bandwidth-bound decode phase and lets you fit a larger model, or more concurrent users, onto the same GPU.

It isn't free: as bits decrease there can be small losses in accuracy. But modern methods like GPTQ and AWQ keep the loss imperceptible on most tasks. A practical rule of thumb: 8-bit is almost always safe; 4-bit is a good balance in most production scenarios; for more aggressive schemes, always measure on your own data.

## A practical roadmap for cutting costs

Putting these pieces together, a clear order of priority emerges for lowering the GPU bill:

1.  **Pick the right model:** The smallest model that is good enough for the task is the biggest saving. Don't use a giant model just "to be safe."
2.  **Apply quantization:** Unlock more capacity on the same hardware with 8-bit or 4-bit.
3.  **Enable continuous batching:** Never leave the GPU idle; throughput often rises several-fold.
4.  **Manage the KV-cache:** Avoid needlessly long contexts; use prefix caching for frequently used system prompts.
5.  **Separate workloads:** Run latency-sensitive chat and background batch jobs in different queues.
6.  **Measure and iterate:** Continuously monitor p50/p95 latency, tokens-per-second and GPU utilization.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Over the long run, most of the total cost is inference, not training.</li><li>Latency is the speed of a single request; throughput is total production, and the two often compete.</li><li>The KV-cache avoids recomputation but consumes memory; long context is expensive.</li><li>Continuous batching multiplies throughput by keeping the GPU full.</li><li>Quantization lowers the memory footprint, speeds up decode and raises capacity.</li></ul></div>

<div class="faq"><details><summary>Does quantization make my model "dumber"?</summary><p>Usually not. 8-bit quantization is nearly lossless on most tasks. At 4-bit there can be small losses, but with methods like GPTQ/AWQ they are often imperceptible. For critical applications, measuring on your own data is essential.</p></details><details><summary>Does raising throughput always hurt latency?</summary><p>No. Thanks to continuous batching you can improve both up to a point. But if you grow the batch size too far, single-request latency starts to rise; the right balance depends on your workload.</p></details><details><summary>Should I write my own server?</summary><p>In most cases, no. Mature inference servers like vLLM, TGI or TensorRT-LLM offer continuous batching, KV-cache management and quantization support out of the box. Using them is both safe and fast.</p></details></div>

---

Optimizing inference is not a single magic button; it is tuning model choice, quantization, batching and cache management together. With the right combination you can extract many times more value from the same hardware. If you want to learn more about building AI infrastructure efficiently and sustainably, take a look at the [HatsonTech](/en/posts/how-hatsontech-started/) approach.
