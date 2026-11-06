---
title: "From RNNs and LSTMs to the Transformer: The Evolution of Sequence Architectures"
description: "An intuitive guide to the evolution of sequence architectures: how RNNs work, their limits like vanishing gradients and the inability to parallelize, the gates of the LSTM, and why attention won out with the Transformer."
publishDate: "2026-08-09T23:48:00+03:00"
lang: en
category: "History"
tags: ["History", "AI"]
translation: "rnn-den-transformer"
heroImage:
  src: "../../../assets/blog/covers/rnn-lstm-to-transformer.jpg"
  alt: "From RNNs and LSTMs to the Transformer: The Evolution of Sequence Architectures"
---

When we read a sentence, we take the words one after another in a sequence; yet we build meaning by holding the whole sequence in mind. The history of teaching machines to process sequences is exactly this tension: the balance between **following the order** and **not forgetting distant information**. The road from RNNs to LSTMs and on to the Transformer is the evolution of ideas that struck this balance a little better each time.

## Why is a "sequence" a hard problem?

The pixels in an image are all there at once; but the words in a sentence form a _sequence_. "The dog bit the boy" and "The boy bit the dog" carry the same words yet mean the opposite. So a model must capture not only **which** words appear, but also **in what order** and **how they relate** to one another.

On top of that, sequences are not a fixed length: a three-word sentence may arrive, or a three-hundred-word paragraph. A sequence architecture is therefore expected to work regardless of length and to account for distant information too.

> "The real test of sequence processing isn't short sentences but long ones: can you still remember at the end what was said at the start?"

## RNN: a loop with a memory

The first powerful idea was the **recurrent neural network** (RNN). The intuition is simple: read the sentence left to right, one word at a time, and after each word keep a small _summary_ in mind. This summary is called the **hidden state**. At each step the model takes the current word and the previous summary, combines them, and produces a new summary.

Think of the notes you take while reading a book: at the end of each page you update your note, then move to the next page with that updated note. An RNN works exactly like this; it carries a single "notebook" through the sentence. Thanks to this recurrent structure, the model can in principle process arbitrarily long sequences with the same parameters.

<div class="callout"><strong>Tip:</strong> Think of an RNN as "a single cell with a memory, called again and again for every word." The magic isn't a new network but the same network feeding back into itself.</div>

## Two big limits of RNNs

This elegant idea stalls in two places. The first is the **long-range dependency** problem. Information is carried step by step through a single summary; as the sentence grows, something said at the start all but fades by the time it reaches the end. The technical name is the _vanishing gradient_: during training, the correction signal coming from distant words shrinks, fold after fold, toward zero as it travels backward. The result: the model struggles to form long-distance links like "I watered the flowers, because they … had wilted."

The second is the **parallelization** problem. Because each step waits for the previous one's summary, the computation is inherently sequential. You cannot move to the next word before processing the current one. Modern hardware (GPUs/TPUs) is built to do thousands of operations at once, yet an RNN leaves most of that power idle. This makes training big models on big data slow and expensive.

-   **Long-range dependency:** The relation between distant words weakens along the chain.
-   **Sequentiality:** Steps wait for one another, so training cannot be parallelized and does not scale.

## LSTM and GRU: managing forgetting with gates

The first major answer to the long-range problem was the **LSTM** (long short-term memory). The idea: instead of a plain summary, give the model a _long-term memory track_ (the cell state), and let small **gates** decide what gets written to that track, what gets erased, and what gets passed out.

-   **Forget gate:** How much of the old memory should we keep, and how much should we drop?
-   **Input gate:** How much of the new information should we write into memory?
-   **Output gate:** How much of the memory should we reflect into the current output?

An analogy: you keep a "master notebook" (the cell state) in mind, and on each page you make three decisions — what to erase, what to add, what to say now. Thanks to these gates, an important piece of information can stay intact in the notebook even when hundreds of words come in between. The **GRU** is a simpler, fewer-gated relative of the same idea; on most tasks it delivers comparable performance with a lighter structure.

LSTMs/GRUs largely eased the long-range problem and were the standard for years, from translation to speech recognition. But they could not remove the second limit, **sequentiality**: they still processed words one at a time, in order.

## The turning point: attention

The real leap came from dropping the assumption that "all information must be squeezed into a single summary." The idea of **attention** says: while processing a word, you may look at _all_ the words in the sequence at once — but not equally, with different weights according to need. The model answers, fresh and directly at every step, the question "which words should I listen to right now, and how much?"

The key point is this: attention forms a direct link between any two words **in a single step, regardless of the distance** between them. Information no longer has to be carried along a long chain; whether the relevant word is at the start of the sentence or the end, you reach for it directly. We dug deep into the math of attention and the Query–Key–Value intuition in a separate post; here we treat it as the driving force of the evolution.

## Transformer: drop the order, look at the relation

The 2017 paper _"Attention Is All You Need"_ took a bold step: it dropped recurrence entirely and built the architecture end to end on attention. This architecture is called the **Transformer**. Words no longer wait in line; the whole sequence is processed at once, and every word looks directly at all the others.

So how is order preserved? The Transformer adds **positional encoding** so that words don't lose their order — it injects into each word's representation the information "which position in the sequence am I?" That way the difference between "the dog bit the boy" and "the boy bit the dog" is still captured, but without any need for sequential processing.

-   **Parallelism:** All words are processed at once; GPUs run at full capacity and training speeds up.
-   **Direct context:** Distant words meet in a single step; long-range dependency is naturally resolved.
-   **Scalability:** These two properties made it possible to train huge models on huge data — the foundation of today's large language models.

## A small sketch

Let's place the essence of the three approaches side by side in a few lines of pseudocode; the difference is in "how information travels":

```python
# 1) RNN: carry a single summary step by step (sequential)
h = zero_vector
for word in sentence:          # each step waits for the previous one
    h = update(h, word)        # the same cell is called again and again
output = h                     # the whole sentence squeezed into one summary

# 2) LSTM: a "memory track" alongside the summary + gates
h, c = zero, zero              # c = long-term memory (cell state)
for word in sentence:
    forget = gate(h, word)     # what to keep from the old?
    add    = gate(h, word)     # what to write anew?
    c = forget * c + add * candidate(h, word)
    h = output_gate(h, word) * tanh(c)

# 3) Transformer: no order; everyone looks at everyone at once (parallel)
X = embedding(sentence) + positional_encoding(sentence)   # order info added
output = self_attention(X)     # each word reaches directly to all words
```

Notice: RNN and LSTM both have a `for` loop — the steps are sequential. The Transformer has no loop; the whole sequence is processed in one operation, all at once. The essence of the evolution is hidden in these lines.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>An RNN reads the sentence left to right and summarizes it into a single hidden state; elegant, but it loses information over long distances.</li><li>The two core limits of RNNs: vanishing gradients (long-range dependency) and the fact that sequential processing cannot be parallelized.</li><li>LSTM/GRU manage forgetting with gates and a memory track, largely solving long-range dependency — but they are still sequential.</li><li>Attention forms a direct link between any two words in a single step, independent of distance.</li><li>The Transformer drops recurrence, preserves order via positional encoding, and scales thanks to full parallelism.</li></ul></div>

## Conclusion: why did attention win?

This evolution fits in one sentence: **stop carrying information and form the relation directly.** The RNN carried information along a chain; the LSTM made that chain sturdier but did not break it. The Transformer dropped the chain altogether — because every word can reach directly for every word it needs, neither did information fade nor did operations wait on one another.

There are two practical reasons attention won: it solves long context naturally, and it runs fully in parallel on modern hardware. Together, these made it possible to train bigger models on more data; today's language assistants, translation and search systems largely stand on this foundation. If you're curious how these architectures turn into real products, you can take a look at [HatsonTech](/en/posts/how-hatsontech-started/), which focuses on applying AI to real work.

<div class="faq"><details><summary>Are RNNs and LSTMs completely useless today?</summary><p>No. In some applications — limited resources, short sequences, or where real-time streaming matters — they can still be the right choice. But for large-scale language tasks the Transformer has effectively become the standard.</p></details><details><summary>If the Transformer drops order, how does it know word order?</summary><p>Through positional encoding. A signal indicating its position in the sequence is added to each word's representation, so the model accounts for order without any need for sequential processing.</p></details><details><summary>What exactly does "vanishing gradient" mean?</summary><p>During training, the correction signal is folded with small factors at every step as it propagates backward through the network. Over long sequences these products shrink toward zero, so the learning signal from distant words is lost. The LSTM's memory track is designed precisely to keep this path largely open.</p></details></div>

---

In short, the story of sequence architectures is a series of ever-better answers to the question "how do we remember the past?" The RNN kept a notebook, the LSTM added smart gates to that notebook, and the Transformer set the notebook aside and learned to look at everything at once. Much of the capability of today's AI comes from this simple but profound shift of idea.
