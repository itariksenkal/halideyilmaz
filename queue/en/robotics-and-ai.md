---
title: "Robotics and AI: Why Is the Physical World So Hard?"
description: "Moravec's paradox, the perception-planning-control loop, learning from demonstration, foundation models for robots, and humanoid robots: hype versus reality."
publishDate: "2026-12-04T09:17:00+03:00"
lang: en
category: "Applications"
tags: ["Robotics", "Artificial Intelligence", "Humanoid Robots"]
translation: "robotik-ve-yapay-zeka"
heroImage:
  src: "../../../assets/blog/covers/robotics-and-ai.jpg"
  alt: "A two-armed robot trying to grasp objects on a table"
---

An AI model can now summarise a complex legal text, write code and solve exam questions. Ask the same AI to empty a dishwasher or pick up the pens from a cluttered desk, and things suddenly get much harder. That contrast raises one of the most interesting questions where robotics meets AI: why are the things we find easy so hard for machines? There has been genuinely exciting progress in recent years, and also a good deal of inflated expectation. In this post I look at why robots are hard, what has changed recently, and what to keep in mind when reading about humanoid robots.

## Moravec's paradox: the easy is hard and the hard is easy

In his 1988 book "Mind Children", the robotics researcher Hans Moravec made an observation: it is comparatively easy to make computers perform at an adult level on intelligence tests, but extremely hard to give them the perception and mobility skills of a one-year-old. This is now known as **Moravec's paradox**.

One explanation is evolutionary. Seeing, walking and grasping an object are the product of millions of years of evolution, and our brains do them without our even noticing. Chess and mathematics are, by comparison, recent skills that demand conscious effort. The things we find hard are simply the ones we can see ourselves doing.

For a robot, lifting a cup means answering all of these questions: where exactly is the cup, how heavy is it, is the surface slippery, is there liquid inside, how tightly should I grip, and which path should my arm take so that I do not hit anything? And the answers differ slightly for every cup, every table and every lighting condition.

## Perception, planning, control

Traditionally, a robot's job is split into three parts:

| Component | What it does | Typical difficulties |
|---|---|---|
| Perception | Understanding the world through cameras, depth sensors, touch sensors and more | Poor lighting, reflective surfaces, objects hiding one another |
| Planning | Choosing a sequence of actions to reach a goal | Uncertainty, a changing environment, many possible paths |
| Control | Sending the right commands to the motors moment by moment | Friction, delays, unexpected contact |

Industrial robots in factories have been very successful for decades. The secret of that success is a tightly controlled environment: the part is in the same place and the same orientation every time. In messy, constantly changing settings such as homes, hospitals or warehouses, the load on perception and planning multiplies. The real challenge is moving from the controlled factory to the disorder of the real world.

## Learning from demonstration

Instead of programming every movement by hand, can we teach a robot by showing it the task? **Learning from demonstration**, also called imitation learning, is built on that idea.

A typical approach works like this: a person guides the robot remotely (teleoperation) through a task many times, while camera images and the robot's movements are recorded. A model then learns from those recordings the link between "when I see this image" and "I should make this movement".

The strength of the approach is that it can pass on skills people can easily demonstrate but struggle to describe, such as folding a piece of cloth. The weakness is that collecting data is slow and expensive, since every demonstration needs a person working in real time. And when the robot meets a situation it never saw in the demonstrations, it may not know what to do.

<div class="callout"><strong>Tip:</strong> When you watch a robot video, look for the words "teleoperated" or "autonomous" in the description. The difference matters a great deal for understanding how "smart" the robot really is.</div>

## Foundation models for robots

The success of language models over the past few years has led robotics researchers to a similar question: can a general-purpose model trained on huge and varied data give robots more general skills too?

A few notable examples in this direction:

- **RT-2 (July 2023):** introduced by Google DeepMind, this model took vision-language models trained on web data, fine-tuned them on robot data, and produced robot actions directly. Models like this are called **vision-language-action** (VLA) models. DeepMind reported that RT-2 raised the success rate on previously unseen scenarios from its predecessor's 32% to 62%.
- **Open X-Embodiment (October 2023):** a collaboration of 21 institutions that pooled data from 22 different types of robot. According to the project page, the dataset contains more than one million real robot trajectories. The aim was to test whether a model trained on data from many robots generalises better to each individual robot.
- **Gemini Robotics (March 2025):** a VLA model that Google DeepMind built on Gemini 2.0. The company said it can adapt to new objects, environments and instructions, and handle dexterous tasks such as folding origami.

These developments represent real progress. But one point deserves emphasis: most of these results were achieved in research settings, on specific tasks and specific benchmarks. A model's success in the lab does not mean it will work reliably for years in a home or a warehouse.

## Humanoid robots: hype versus reality

Humanoid robots have attracted a lot of attention in recent years. Many companies have announced human-shaped robots and released impressive videos. Boston Dynamics, for example, announced in April 2024 that it was retiring its hydraulic Atlas and developing a fully electric one, with Hyundai as its first partner and applications to be tested with a small group of customers over the following years.

There is a sensible argument for the human form: our world was designed for people. Stairs, door handles, shelves and tools are shaped around the human body. In theory, a human-shaped robot could fit into those spaces without any changes to them.

Still, when reading news in this area, a few questions are worth keeping in mind:

- **Demo or production?** Doing a task once in a video is very different from doing it thousands of times a day, safely and with a low error rate.
- **Autonomous or remote-controlled?** In some demonstrations, robots are partly or fully guided by a person.
- **Cost and efficiency:** for many specific jobs, a wheeled platform or a fixed robot arm is cheaper and more reliable.
- **Safety:** a heavy, powerful machine working alongside people raises serious engineering and regulatory questions of its own.

As of November 2026, my assessment is this: humanoid robots are an interesting field of research and pilot projects, but public evidence that they work widely, reliably and economically in homes and workplaces is still limited. That does not mean it will never happen; it simply means the excitement in the headlines is worth reading with some caution.

<div class="callout"><strong>Note:</strong> Announcements in robotics change quickly. When judging a company's "coming soon" timeline, a useful yardstick is how many of its past announcements arrived on time.</div>

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Moravec's paradox reminds us that perception and movement, which feel easy to us, are among the hardest tasks for machines.</li><li>A robot's job can be split into perception, planning and control; the real difficulty lies in uncontrolled, changing environments.</li><li>Learning from demonstration is a powerful way to pass on skills people can perform easily but struggle to describe.</li><li>Work such as RT-2, Open X-Embodiment and Gemini Robotics suggests that large models can help robots generalise.</li><li>With humanoid robots, there is still a significant gap between impressive demos and reliable, economical use.</li></ul></div>

<div class="faq"><details><summary>Does Moravec's paradox still hold today?</summary><p>Largely, yes. AI has advanced very quickly on tasks involving language and reasoning, but reliable perception and precise movement in the real world remain hard problems. Recent progress is narrowing the gap, not closing it.</p></details><details><summary>What is a vision-language-action (VLA) model?</summary><p>A model that takes camera images and natural-language instructions as input and produces robot actions directly. It is usually built by fine-tuning a large model trained on web data with robot data.</p></details><details><summary>Will humanoid robots be in our homes soon?</summary><p>It is not possible to give a firm date. Research and pilot projects are under way, but there are serious hurdles in safety, cost and reliability still to overcome.</p></details><details><summary>Where should I start if I want to work in robotics?</summary><p>Programming, linear algebra and basic control theory make a good foundation. Working in simulation environments is a practical way to gain experience without expensive hardware.</p></details></div>

---

**Sources**

- [Google DeepMind – RT-2: New model translates vision and language into action (2023)](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)
- [Open X-Embodiment Collaboration (2023), Open X-Embodiment: Robotic Learning Datasets and RT-X Models – arXiv](https://arxiv.org/abs/2310.08864)
- [Open X-Embodiment project page](https://robotics-transformer-x.github.io/)
- [Google DeepMind – Gemini Robotics brings AI into the physical world (2025)](https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/)
- [Boston Dynamics – An electric new era for Atlas](https://bostondynamics.com/blog/electric-new-era-for-atlas/)
