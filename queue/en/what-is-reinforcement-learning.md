---
title: "What Is Reinforcement Learning? Trial, Error and Reward"
description: "Agents, environments, rewards and policies; the explore-exploit dilemma, AlphaGo, RLHF in language models and the limits of reinforcement learning."
publishDate: "2026-12-03T09:17:00+03:00"
lang: en
category: "Basics"
tags: ["Reinforcement Learning", "Artificial Intelligence", "Machine Learning"]
translation: "pekistirmeli-ogrenme-nedir"
heroImage:
  src: "../../../assets/blog/covers/what-is-reinforcement-learning.jpg"
  alt: "Stones on a Go board with arrows suggesting learning by trial and error"
---

Think of a child learning to ride a bicycle. Nobody tells them exactly which muscle to tense, and by how much, at every moment. They try, they fall, they notice the moments when they stay balanced, and over time they discover what works. Reinforcement learning is the name for an approach that lets machines learn in a similar way: not from examples of correct answers, but only from the consequences of their own actions. It shows up everywhere from Go-playing programs to the training of today's chat assistants. In this post I try to explain the core ideas, the famous examples and the limits of the method in plain language.

## The core ideas: agent, environment, reward, policy

In supervised learning, the best-known kind of machine learning, a model is given many examples together with their correct answers. Reinforcement learning has no such answer key. Instead, an **agent** takes actions in an **environment** and receives a **reward** or a penalty in return.

| Concept | Meaning | In the bicycle example |
|---|---|---|
| Agent | The part that decides and learns | The child learning to ride |
| Environment | The world the agent interacts with | The road, the bike, gravity |
| State | The current situation of the environment | Speed, lean, balance |
| Action | The moves available to the agent | Pedalling, steering |
| Reward | Numerical feedback after an action | Staying upright (+), falling (−) |
| Policy | The strategy for choosing an action in each state | The acquired skill of riding |

The agent's goal is not to maximise a single immediate reward but the total reward collected over time. That makes things harder. In chess, sacrificing a piece looks bad in the moment but may win the game a few moves later. Working out how much each action contributed to a long-term outcome is one of the central problems of reinforcement learning.

Richard Sutton and Andrew Barto, who laid the conceptual and algorithmic foundations of the field, received the 2024 ACM Turing Award for that work. The second edition of their book "Reinforcement Learning: An Introduction" (2018) is also available as a free PDF on the authors' website.

## Explore or exploit?

One of the most intuitive dilemmas in reinforcement learning is the balance between **exploration and exploitation**.

An everyday example: there is a restaurant you love in your neighbourhood. If you go there every evening, a good meal is guaranteed; that is "exploitation", making use of what you already know. But if you never try the new place that just opened, you may miss something even better; trying it is "exploration". Explore all the time and you will often eat badly. Never explore and you will never find out whether something better exists.

Algorithms face the same dilemma. A simple solution is to choose the best-known action most of the time and try a random one with a small probability. More sophisticated methods take into account how little is known about an action and steer exploration more intelligently. The dilemma appears not only in games but also, for example, in systems that decide which design a website should show.

<div class="callout"><strong>Tip:</strong> An easy way to grasp reinforcement learning is to think of teaching a dog a trick with treats. You cannot explain the "right answer" to the dog; you can only reward the behaviour you want. Give the treat at the wrong moment and you may teach a behaviour you did not intend.</div>

## A famous example: AlphaGo

The event that introduced reinforcement learning to a wide audience was AlphaGo, developed by DeepMind. Because the number of possible moves in Go is so vast, it had long been considered one of the hardest games for computers.

- **October 2015:** AlphaGo beat Fan Hui, three-time European champion, 5–0. It was the first time an AI system had defeated a Go professional.
- **March 2016:** in Seoul, it beat Lee Sedol, winner of 18 world titles, 4–1. According to DeepMind, more than 200 million people worldwide watched the match.
- **October 2017:** AlphaGo Zero was introduced. It used no human games at all: starting from random play, it learned only by playing against itself, and after three days of training it beat the version that had defeated Lee Sedol by 100 games to 0.

One detail is worth stressing. The original AlphaGo was not pure reinforcement learning. It combined learning from human games, reinforcement learning through self-play, and a search method that explores possible moves. What made AlphaGo Zero remarkable was reaching that level without human data.

## Reinforcement learning in language models: RLHF

Today one of the most discussed uses of reinforcement learning is in training large language models. A language model first learns to predict the next word over a huge amount of text. That alone does not guarantee helpful, clear or safe answers.

This is where **reinforcement learning from human feedback** (RLHF) comes in. One of its foundations was a 2017 paper by Christiano and colleagues: instead of hand-writing a reward function, learn from people saying which of two behaviours they prefer.

The InstructGPT paper, published by OpenAI researchers in 2022, described applying this to language models in three steps:

1. Fine-tune the model with supervised learning on example answers written by people.
2. Have people rank different answers produced by the model, and train a "reward model" on those rankings.
3. Tune the language model with reinforcement learning to maximise that reward model.

One striking finding was that human raters preferred outputs from the 1.3-billion-parameter InstructGPT model to those of the 175-billion-parameter GPT-3, a model roughly 100 times larger. Size is not everything; what a model is tuned towards matters a great deal.

## Limits and things to watch for

Reinforcement learning is powerful, but it is not easy. The main challenges are:

- **Reward design:** an agent maximises the reward exactly as you defined it, not as you meant it. A 2020 DeepMind post called this "specification gaming", with a well-known example: in a boat racing game, hitting targets along the track gave bonus points, so the agent learned to circle a small area hitting the same targets over and over instead of finishing the race.
- **Sample hunger:** agents often need an enormous number of trials. Playing a game millions of times is possible; doing that many trials with a real robot, let alone a patient, is not.
- **From simulation to reality:** a policy that works well in simulation can fail when faced with the noise and surprises of the real world.
- **Safety:** exploration, by definition, means trying the unknown. In some environments a bad trial can have serious consequences.

A similar caution applies to language models. A reward model that represents human preferences is not a perfect copy of those preferences. A model can learn to produce what the reward model scores highly rather than what people actually want.

<div class="callout"><strong>Note:</strong> When you hear that a system was "trained with reinforcement learning", a good question to ask is: what is the reward based on, and how well does it represent the behaviour that is really wanted?</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>In reinforcement learning, an agent learns from the rewards that follow its actions, without being shown correct answers.</li><li>Balancing exploration and exploitation is one of the field's core dilemmas.</li><li>AlphaGo beat Lee Sedol 4–1 in 2016; AlphaGo Zero became even stronger in 2017 without human data.</li><li>RLHF uses a reward model learned from human preferences to make language models more helpful.</li><li>Reward design, the cost of trials and safety are among the most important limits of reinforcement learning.</li></ul></div>

<div class="faq"><details><summary>How is reinforcement learning different from supervised learning?</summary><p>In supervised learning, the model is given the correct answer for each example. In reinforcement learning, the correct answer is unknown; the agent learns from the consequences of its actions, that is, from rewards and penalties.</p></details><details><summary>Where is reinforcement learning used in practice?</summary><p>Beyond games, it is used in robotics, recommendation systems, resource management and the fine-tuning of language models. In many applications, though, it is one component alongside other methods.</p></details><details><summary>Does RLHF make language models fully reliable?</summary><p>No. RLHF helps models give more helpful and appropriate answers, but it does not eliminate mistakes, made-up information or bias. Evaluation and human oversight are still needed.</p></details><details><summary>Where should I start if I want to learn more?</summary><p>Sutton and Barto's "Reinforcement Learning: An Introduction" is considered the field's core text and is freely available on the authors' website. Basic probability and Python are enough to begin.</p></details></div>

---

**Sources**

- [Sutton and Barto, Reinforcement Learning: An Introduction (2nd edition)](http://incompleteideas.net/book/the-book-2nd.html)
- [Google DeepMind – AlphaGo](https://deepmind.google/research/breakthroughs/alphago/)
- [Google DeepMind – AlphaGo Zero: Starting from scratch (2017)](https://deepmind.google/discover/blog/alphago-zero-starting-from-scratch/)
- [Christiano et al. (2017), Deep reinforcement learning from human preferences – arXiv](https://arxiv.org/abs/1706.03741)
- [Ouyang et al. (2022), Training language models to follow instructions with human feedback – arXiv](https://arxiv.org/abs/2203.02155)
- [Google DeepMind – Specification gaming: the flip side of AI ingenuity (2020)](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)
