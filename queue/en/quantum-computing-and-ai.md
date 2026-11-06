---
title: "Quantum Computing and AI: What Can We Realistically Expect?"
description: "Qubits, superposition and entanglement in plain words; what quantum computers can do today, quantum machine learning claims, and the post-quantum timeline."
publishDate: "2026-12-05T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Quantum Computing", "Artificial Intelligence", "Cryptography"]
translation: "kuantum-bilisim-ve-yapay-zeka"
heroImage:
  src: "../../../assets/blog/covers/quantum-computing-and-ai.jpg"
  alt: "Close-up of a quantum processor surrounded by cooling tubes"
---

We often hear sentences like "quantum computers will make AI exponentially faster" or "quantum computers will break all encryption". Some of these claims rest on solid science; others are hopes that have not yet been demonstrated. Quantum computing is a genuinely important field, but it pays to separate what is possible today, what only looks possible in theory, and what is still entirely uncertain. In this post I explain the basic ideas without the mathematics, and then try to draw a realistic picture for AI and for encryption.

## Bits and qubits: the basic difference

The computers we know store information in **bits**: each bit is either 0 or 1. Quantum computers use **qubits** (quantum bits).

What is special about a qubit is that, until it is measured, it can be in a **superposition** of 0 and 1. This is often described as "both 0 and 1 at the same time", but that is a little misleading. A better intuition is this: a qubit is in a state that sets the probabilities of getting 0 or 1 when it is measured. The moment you measure it, that state collapses to a single outcome, and you see only a 0 or a 1.

The second key idea is **entanglement**. The measurement results of entangled qubits are correlated in a way that has no classical explanation, however far apart they are. It means the qubits have to be described as a whole rather than one by one.

The power of a quantum computer comes from using these properties to arrange probabilities so that wrong answers cancel each other out and the right answer is reinforced. That only works for problems with particular structure. A quantum computer is not a supercomputer that "tries everything at once".

<div class="callout"><strong>Tip:</strong> Be wary when you hear that "a quantum computer tries all possibilities at once". A measurement yields only one result; the real art is designing an algorithm that makes the right answer more likely to come out.</div>

## What can quantum computers do today?

On the theory side, there are strong results. The best known is the algorithm Peter Shor presented in 1994, which shows that a large enough, error-free quantum computer could factor large numbers very quickly. The security of widely used encryption methods such as RSA rests on exactly how hard that task is. Quantum computers may also offer advantages on problems that are quantum by nature, such as simulating the behaviour of molecules and materials.

On the practical side, the picture is more cautious. In 2018 the physicist John Preskill named the current period the **NISQ** era (Noisy Intermediate-Scale Quantum). At the time he was describing devices of roughly 50 to 100 qubits. On such devices, qubits are very sensitive to noise and errors pile up quickly, which limits the size of computations that can be run reliably.

That is why error correction is the field's most critical topic. In December 2024, Google announced that its 105-qubit Willow chip had crossed an important threshold: as more qubits were added, the error rate went down rather than up. The same announcement said Willow completed a benchmark called random circuit sampling in under five minutes, a task estimated to take one of today's fastest supercomputers about 10²⁵ years. Google itself stressed, however, that this benchmark has no practical commercial application yet, and that the next challenge is a useful computation relevant to real-world problems.

## Quantum machine learning: claims and evidence

Where quantum computing meets AI, under the label "quantum machine learning", there is a lot of interest. Here it is especially important to separate claims from evidence.

| Claim | Current status |
|---|---|
| Quantum computers will speed up training of large language models | No practical demonstration supports this; loading large datasets into a quantum computer is itself a serious bottleneck |
| Some quantum algorithms give exponential speed-ups for machine learning | Some theoretical results exist, but several were later matched by classical algorithms |
| Quantum computers could help with certain scientific problems | A strong theoretical expectation, especially in chemistry and materials simulation |

There is an instructive example. A quantum algorithm for recommendation systems was thought to offer an exponential speed-up over classical methods. In 2018, Ewin Tang designed a classical algorithm working under similar assumptions and showed that the quantum method did not in fact provide an exponential advantage. Such "dequantization" results are a reminder that any claimed quantum advantage must be compared with the best classical method.

From the angle of my own work on model evaluation, the same principle applies: a new method's success should be measured against the strongest alternative, not a weak baseline. As of November 2026, to my knowledge, there is no strong evidence that quantum computers offer a practical advantage over classical hardware on common real-world machine learning tasks. The area is interesting for research, but expectations of a near-term AI revolution call for caution.

## Post-quantum cryptography: the truly urgent part

The way quantum computing touches everyday life most closely may not be AI at all, but encryption. When a quantum computer big and accurate enough to run Shor's algorithm will exist is uncertain. Yet one risk applies today: an attacker can record encrypted data now and decrypt it years later, once a suitable quantum computer appears. This is known as "harvest now, decrypt later", and it is a serious concern for data that must stay secret for many years.

That is why encryption methods that resist quantum computers, known as **post-quantum cryptography**, have been under development for years. The US National Institute of Standards and Technology (NIST) is running an important timeline:

- **13 August 2024:** NIST published its first three post-quantum standards: FIPS 203 (ML-KEM) for general encryption and key establishment, and FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA) for digital signatures. NIST urged system administrators to start the transition immediately.
- **March 2025:** NIST selected HQC, an algorithm based on different mathematics, as a backup to ML-KEM, and said it expects the final standard in 2027.
- **October 2026:** NIST published the final version of IR 8547, its transition report. It states that quantum-vulnerable public-key algorithms, such as RSA and elliptic-curve methods, will be deprecated after 2030 and disallowed under NIST standards after 2035.

Although the timeline is aimed at US institutions, NIST standards are widely used as a reference around the world, so they are expected to shape practice in many countries and sectors.

<div class="callout"><strong>Note:</strong> If you are responsible for information security in an organisation, a good first step is an inventory of which systems use which encryption methods. This post is general information; for decisions specific to your organisation, consult security professionals.</div>

## How to think about it

When I read news about quantum computing, a few questions help:

- Is this a lab demonstration, or does it solve a practical problem?
- Was the comparison made against the best classical method?
- Are the error rates and qubit counts actually sufficient for the claimed application?

For AI, it is too early to expect a major short-term transformation. For encryption, there is no reason to wait: the transition has already begun.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Thanks to superposition and entanglement, qubits behave differently from bits on certain problems, but quantum computers do not "try everything at once".</li><li>Today's quantum computers are noisy; error correction is advancing, but a practical commercial advantage has not yet been shown.</li><li>Some quantum machine learning claims were later matched by better classical algorithms.</li><li>NIST published its first post-quantum encryption standards in August 2024.</li><li>Under NIST's October 2026 report, quantum-vulnerable public-key methods are to be deprecated after 2030 and disallowed after 2035.</li></ul></div>

<div class="faq"><details><summary>Can quantum computers break encryption today?</summary><p>Publicly known quantum computers are not yet large or accurate enough to break widely used encryption such as RSA. But because encrypted data can be collected now and decrypted later, the transition has already begun.</p></details><details><summary>Will quantum computers speed up AI?</summary><p>There are some theoretical possibilities, but no practical advantage has yet been shown on common real-world machine learning tasks. In the near term, classical hardware remains the main driver of AI progress.</p></details><details><summary>Does post-quantum cryptography require a quantum computer?</summary><p>No. These are algorithms that run on today's classical computers but rely on mathematical problems designed to resist attacks by quantum computers.</p></details><details><summary>Do I need to do anything as an individual user?</summary><p>In most cases, no direct action is needed; browsers, operating systems and service providers will handle the transition. Keeping your software up to date is the simplest way to benefit from it.</p></details></div>

---

**Sources**

- [NIST – NIST Releases First 3 Finalized Post-Quantum Encryption Standards (2024)](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST – NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption (2025)](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption)
- [NIST IR 8547, Transition to Post-Quantum Cryptography Standards (2026)](https://csrc.nist.gov/pubs/ir/8547/final)
- [Google – Meet Willow, our state-of-the-art quantum chip (2024)](https://blog.google/technology/research/google-willow-quantum-chip/)
- [Preskill (2018), Quantum Computing in the NISQ era and beyond – arXiv](https://arxiv.org/abs/1801.00862)
- [Tang (2018), A quantum-inspired classical algorithm for recommendation systems – arXiv](https://arxiv.org/abs/1807.04271)
