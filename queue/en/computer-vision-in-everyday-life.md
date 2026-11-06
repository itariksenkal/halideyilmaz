---
title: "Computer Vision in Everyday Life: How Machines Learn to See"
description: "How night mode, face unlock, plate recognition, medical imaging, retail checkouts and factory quality control work, and where computer vision still fails."
publishDate: "2026-11-25T09:17:00+03:00"
lang: en
category: "Applications"
tags: ["Computer Vision", "Artificial Intelligence", "Image Processing"]
translation: "gunluk-hayatta-bilgisayarli-goru"
heroImage:
  src: "../../../assets/blog/covers/computer-vision-in-everyday-life.jpg"
  alt: "A camera lens with recognition boxes drawn around everyday objects"
---

When we look at a photo, we know in a fraction of a second that it contains a cat, a table or a familiar face. To a computer, the same photo is millions of pixels, each just a handful of numbers. Computer vision is the field that tries to pull meaning out of that pile of numbers, and it shows up in far more places than most of us realise: in our phone cameras, on our lock screens, at car park barriers, in hospitals and in factories. In this post I want to explain roughly how each of these works and where each one struggles. Since I work on model evaluation, I will also come back to a question I find important: why does something that works in the lab get confused in the real world?

## What does a computer "see" in an image?

A digital image is made of tiny squares called pixels, each storing colour and brightness as numbers. Most of today's computer vision systems rely on deep neural networks trained on millions of labelled examples. In their first layers these networks learn simple patterns such as edges and colour changes; in later layers, more complex parts like eyes, wheels or letters; and finally, whole objects.

There are a few core tasks: classification ("is there a cat in this photo?"), object detection ("where is the cat?"), segmentation ("which pixels belong to the cat?") and recognition or matching ("is this face the same person as the enrolled one?"). Each application below combines one or more of these.

## Vision in your pocket: phone cameras and face unlock

**Phone camera tricks.** A smartphone's small lens and sensor cannot physically gather as much light as a large camera. Software closes much of that gap, an approach known as computational photography. When you press the shutter, the phone often captures several frames in quick succession and aligns and merges them to reduce noise. Night mode is a longer version of the same idea. In portrait mode, a model separates the person from the background (segmentation), estimates depth and blurs the background artificially. The odd blurring you sometimes see around hair or the edges of glasses is exactly where that segmentation struggles.

**Face unlock.** There are two broad approaches. Systems that use only the front camera work with a flat image, so they can be more vulnerable to being fooled by a photo. According to Apple's published information on Face ID, its TrueDepth camera projects thousands of invisible dots onto the face to build a depth map and also captures an infrared image; these are turned into a mathematical representation and compared with the enrolled face data on the device. Apple says the face data never leaves the device or gets backed up to iCloud, and that the chance of a random person unlocking the phone with a single enrolled appearance is less than one in a million. The same source openly states that the odds are higher for twins, look-alike siblings and children under 13, whose facial features may not be fully developed.

## On the road: number plate recognition

The number plate readers at car park barriers or on traffic cameras usually work in three steps. First, object detection finds the plate in the image. Next, the plate is straightened and split into characters. Finally, optical character recognition (OCR) reads each character, and the result is checked against the country's plate format. Error rates rise at night, in rain, and with dirty or angled plates, and similar characters such as "0" and "O" or "8" and "B" are classic trouble spots. Well-designed systems use infrared lighting and send uncertain readings to a person.

## In the hospital: medical imaging

Medical imaging is one of the most promising and most delicate areas of computer vision. Models are used to flag suspicious regions on X-rays, CT scans or mammograms, to take measurements, or to move urgent cases to the top of the list. The US Food and Drug Administration (FDA) publishes a list of AI-enabled medical devices authorised for marketing, and the large majority of them are in radiology. The FDA also notes that the list is not a comprehensive resource.

These systems are generally designed to act as a second pair of eyes for the clinician rather than replace them. An important limitation: a model trained on one hospital's scanners and patient population may not perform the same way at another hospital using different equipment. That is why AI in healthcare needs local validation.

<div class="callout"><strong>Tip:</strong> Whenever you read an accuracy figure for an image recognition system, ask "Tested on what data, under what conditions?" The same model can perform noticeably worse on images that do not resemble the ones it was trained on.</div>

## In shops and factories: retail and quality control

**Retail.** At some self-checkouts, a camera recognises the fruit or vegetables you place on the scale and suggests options. Some stores use shelf cameras to track stock, and some have experimented with checkout-free shopping. These systems combine object detection and classification, but look-alike products (two varieties of apple, say) and crowded scenes remain hard. Checkout-free systems also raise a privacy question, because they rely on continuously observing customers.

**Quality control.** On production lines, cameras can check products for scratches, cracks, missing parts or colour defects at a speed no tired human eye can match. The interesting difficulty is that defective products are rare, so it is hard to collect enough "bad" examples to train on. Some systems therefore use anomaly detection: they learn only what a good product looks like and flag anything that deviates from it.

## Limits: where machines get confused

The weak points of computer vision systems are similar across applications. **Distribution shift:** models struggle in conditions unlike their training images, such as different lighting, cameras or seasons. **Under-representation:** error rates can rise for groups or situations that are rare in the training data; differences in face recognition accuracy across demographic groups have been measured by the US National Institute of Standards and Technology (NIST). **Fragility:** small changes to an image that a human would not even notice can fool some models. **Privacy:** when cameras are everywhere, whether we should do everything that is technically possible becomes a separate question.

None of this means the technology does not work. It simply reminds us that, instead of accepting results blindly, we need to know where and under what conditions a system can be trusted.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Computer vision combines a few core tasks: classification, object detection, segmentation and matching.</li><li>Much of the quality of phone photos comes from software merging several frames.</li><li>Face unlock systems that use depth information are harder to fool with a photo than those relying on a flat image.</li><li>In medical imaging, AI is a second pair of eyes for clinicians and needs re-validation at each new site.</li><li>Distribution shift, under-representation and privacy are the main limits of computer vision.</li></ul></div>

## Frequently asked questions

<div class="faq"><details><summary>Is face unlock more secure than a fingerprint?</summary><p>It depends on the system. Depth-sensing systems can offer strong security, but the risk rises for twins and look-alike siblings. If you are concerned, a strong passcode remains the safest option.</p></details><details><summary>Are the photos on my phone sent to the cloud for analysis?</summary><p>That depends on your phone and settings. Much processing now happens on the device, but cloud backup and some smart features may send photos to servers. Checking your privacy settings is the best way to know.</p></details><details><summary>Will AI replace radiologists?</summary><p>Most current systems are designed to support clinicians by flagging suspicious areas, taking measurements and prioritising urgent cases. Diagnosis and treatment decisions remain the clinician's responsibility.</p></details><details><summary>Why does computer vision sometimes make very basic mistakes?</summary><p>Because the model does not truly "understand"; it relies on patterns in its training data. If an image differs from those patterns, such as an unusual angle, light or object, it can fail at something that looks trivial to us.</p></details></div>

---

**Sources**

- [Apple – About Face ID advanced technology](https://support.apple.com/en-us/102381)
- [FDA – Artificial Intelligence-Enabled Medical Devices list](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices)
- [Richard Szeliski – Computer Vision: Algorithms and Applications (2nd ed., 2022)](https://szeliski.org/Book/)
- [NIST – Face Recognition Technology Evaluation: Demographic Effects](https://pages.nist.gov/frvt/html/frvt_demographics.html)
