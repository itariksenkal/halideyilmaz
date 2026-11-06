---
title: "CNNs and the Basics of Image Processing: How Does a Machine \"See\" an Image?"
description: "An intuitive guide to CNNs through filters, convolution, pooling and layers: how a machine actually parses and \"sees\" an image, with a short code sketch."
publishDate: "2026-08-09T23:49:00+03:00"
lang: en
category: "Vision"
tags: ["Vision", "AI"]
translation: "cnn-goruntu-isleme"
heroImage:
  src: "../../../assets/blog/covers/cnn-image-processing-basics.jpg"
  alt: "CNNs and the Basics of Image Processing: How Does a Machine \"See\" an Image?"
---

When you glance at a photo, saying "cat" takes a fraction of a second. To a computer, though, that same photo is just a giant table of millions of numbers. Convolutional neural networks (CNNs) are one of the most effective ways to turn that pile of numbers into meaningful concepts. In this post we'll walk through filters, convolution, pooling and layers using everyday analogies, so that by the end you have an intuitive grasp of how a machine "sees" an image.

## What is an image to a machine?

A digital image is made of tiny dots of color, called pixels, arranged in a grid. In a grayscale image each pixel is a single number representing brightness, usually from 0 (black) to 255 (white). In color images each pixel carries three numbers: the red, green and blue channels (RGB). So a 224x224 color photo is, to a computer, nothing more than a table of over 150,000 numbers.

An analogy helps: think of the image as an enormous spreadsheet where every cell holds a brightness value. A human eye looking at the sheet from a distance instantly catches the pattern; a computer, however, only sees individual cells. The job of a CNN is to find and interpret the _local patterns_ among those cells.

> The machine sees pixels; the CNN learns the relationships between them. The real intelligence lies not in single numbers, but in the patterns they form together.

## Filters: tiny pattern detectors

A filter (also called a kernel) is usually a small square of numbers, often 3x3 or 5x5. Each filter is sensitive to a specific pattern: some catch vertical edges, others horizontal edges, and others corners or color transitions. You can picture a filter as a small stencil with a particular shape drawn on it. Press the stencil onto a region of the image, and the more that region matches the stencil, the stronger the response it produces.

A classic example is a filter that detects vertical edges. If you fill its left column with negative values and its right column with positive ones, the filter responds strongly where there is a dark-to-light transition, and stays near zero on a flat surface. The beautiful part is this: in CNNs we don't write these filter values by hand; the network learns them from the data during training.

<div class="callout"><strong>Tip:</strong> If you visualize the filters in the first layer of a CNN, you'll often see edge and color-blob detectors, much like the early stages of the human visual system.</div>

## Convolution: sliding the filter across the image

Convolution is the operation of sliding the filter step by step, starting from the top-left corner of the image. At each stop the filter is multiplied with the pixels beneath it, the results are summed, and a single number is produced. That number tells us how closely that region resembles the pattern the filter is looking for. Once the filter has scanned the whole image, the result is a new table called a **feature map**.

Two concepts matter here. _Stride_ is how many pixels the filter moves at each step; a larger stride produces a smaller output. _Padding_ is the border of zeros added around the image to preserve information at the edges. Another crucial idea is _parameter sharing_: because the same filter is used across the whole image, we can recognize an edge whether it appears in the top-left or the bottom-right. This dramatically reduces the number of parameters to learn and gives the model a sense of position independence.

An everyday analogy: imagine you hold a piece of cardboard with a hole in it (the filter) and slide it across a newspaper from left to right, top to bottom. At each stop you read the letters visible through the hole and jot down a note. By the end you've produced a "reading map" of the entire newspaper. That is exactly what convolution does.

## Pooling: keep what matters, simplify the rest

Feature maps can still be large. Pooling shrinks these maps, which both lightens the computation and adds robustness to small shifts in position. The most common type is _max pooling_: for example, within a 2x2 window the highest value is kept and the rest are discarded. The logic is: "Was the pattern I'm looking for strongly present in this region? If so, exactly which pixel it sat on matters less."

You can compare this to summarizing. It's like reading a long paragraph and saying, "the most striking sentence here was this one." You lose some detail, but you keep the main idea and shorten the text. Pooling does a similar kind of summarization across the image.

-   **Max pooling:** takes the largest value in the window; emphasizes the dominant feature.
-   **Average pooling:** takes the average of the values in the window; produces a softer summary.
-   **Result:** smaller maps, less computation, and a model more robust to small shifts.

## Layers: a hierarchy from simple to complex

The real power of CNNs comes from stacking these operations on top of one another. The first convolutional layers learn simple things: edges, corners, color transitions. The next layer combines these simple parts to capture textures and basic shapes. Deeper layers begin to represent object parts like an eye, a wheel or a door handle, and at the very top whole concepts such as "cat" or "car."

This resembles how a child learns to draw: first lines, then shapes from lines, then faces from shapes. Each layer takes the output of the one below as its input and produces a more abstract representation. A typical flow looks like this: a block of _convolution → activation (e.g. ReLU) → pooling_ repeats several times, then the resulting features are flattened and fed into fully connected layers, and the final layer produces a class probability.

### Why is activation needed?

Convolution and summation are linear operations; if you only stack them, no matter how many layers you add, the result is still equivalent to a single linear operation. A nonlinear activation like ReLU (a simple rule that zeroes out negative values) steps in between and gives the network the ability to learn curved, complex relationships. Without nonlinearity, depth would be pointless.

## A small code example

The simplified pseudocode below shows the essence of convolution for a single filter. Its purpose is to clarify the logic of the operation rather than to be run as is.

```text
// 3x3 vertical edge filter (simple example)
filter = [[-1, 0, 1],
          [-1, 0, 1],
          [-1, 0, 1]]

feature_map = empty_table()

for each (y, x) position scanning the image:
    total = 0
    for each (i, j) over the filter:
        total += image[y+i][x+j] * filter[i][j]
    feature_map[y][x] = max(0, total)   // ReLU: zero out negatives

// Then pooling:
for each 2x2 block over feature_map:
    output[block] = largest_value(block)   // max pooling
```

In real libraries (such as PyTorch or TensorFlow) you don't write these loops by hand; a single layer call handles the whole thing, and the filter values are learned through training. But the underlying idea is exactly this: multiply, sum, pass through a nonlinear threshold, summarize, repeat.

## So does the machine really "see"?

The short answer: no, at least not in the way we mean it. A CNN converts an image into increasingly abstract numerical representations and, from those, produces the statistically most likely label. It does not grasp meaning, intent or context the way we do; what it "sees" is a reflection of the patterns in the data it was trained on. That's why, if the training data is imbalanced or incomplete, the model can make surprising mistakes.

Even so, this approach is incredibly powerful: anomaly detection in medical images, quality control on production lines, document digitization and much more are all built on these foundations. If you're curious about how artificial intelligence is woven into everyday life, you can browse the content at [HatsonTech](/en/posts/how-hatsontech-started/).

<div class="takeaways"><h4>Key takeaways</h4><ul><li>To a computer, an image is a table of numbers made of pixel brightness values.</li><li>Filters are tiny pattern detectors; a CNN learns their values from data.</li><li>Convolution slides a filter across the image to produce feature maps; parameter sharing brings efficiency.</li><li>Pooling shrinks the maps and adds robustness to small shifts in position.</li><li>Layers build a hierarchy from simple edges to complex objects; nonlinear activation makes this possible.</li><li>A CNN doesn't "see"; it produces probabilities from statistical patterns, so data quality is critical.</li></ul></div>

<div class="faq"><details><summary>Do I have to set the filter values myself?</summary><p>No. Classic image processing used hand-designed filters, but in CNNs the filter values are learned automatically from data during training. What you decide are architectural choices like the number and size of filters.</p></details><details><summary>What's the difference between convolution and pooling?</summary><p>Convolution detects patterns to produce new feature maps and has learnable parameters. Pooling only shrinks and summarizes those maps; it has no learned parameters and usually works by taking the largest value.</p></details><details><summary>Are CNNs only used for images?</summary><p>No. The same "capture local patterns" idea can be applied to audio waveforms, time series and even text. Still, the most common and intuitive use case is image and video processing.</p></details></div>

---
