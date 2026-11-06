---
title: "LLM Agents and Tool Use: Planning, MCP, and Multi-Step Tasks"
description: "How do LLM agents call tools, plan, and run multi-step tasks? We explain MCP, the opportunities, and the risks with plain, everyday analogies."
publishDate: "2026-08-09T23:33:00+03:00"
lang: en
category: "Agents"
tags: ["Agents", "AI"]
translation: "llm-ajanlari"
heroImage:
  src: "../../../assets/blog/bimg-17.jpg"
  alt: "LLM Agents and Tool Use: Planning, MCP, and Multi-Step Tasks"
---

Ask a language model a question and it writes you a sentence. Give an _agent_ a task and it gets work done: it opens the calendar, finds a free slot, sends the invite, then reports back. The difference is like asking a consultant for advice versus telling an assistant “handle this.” In this article we’ll explore — intuitively — how LLM agents think and use tools, why MCP (the Model Context Protocol) matters, and the opportunities and risks of multi-step tasks.

## Model or agent? The core distinction

A plain language model takes text and produces text. On its own it can’t touch the world: it can’t send an email, query a database, or check today’s weather. What it knows is limited to the text it saw up to the moment it was trained.

An **agent** appears when you wrap a _loop_ and a set of _tools_ around the model. The model no longer just writes an answer; it decides “run this tool with these inputs,” sees the tool’s result, and decides the next step based on that result. The model is the brain, the tools are the hands, and the loop is the mechanism that keeps turning until the job is done.

> A plain model is like a sage in a library: you ask, it explains. An agent is like an intern: you say “prepare this report,” and it goes off to gather sources, do the math, and bring back a draft.

This distinction matters because the agent’s power and its risk come from the same place: the fact that it can now genuinely _act_.

## How tool calling actually works

At the heart of tool calling lies a simple contract. You give the model a list — “here are the tools you have” — where each tool has a name, a description of what it does, and a schema describing the inputs it expects. When the model needs a tool, instead of plain prose it produces a **structured call**: “call the `get_weather` tool with city = Istanbul.”

There’s a crucial point here: the model itself doesn’t run the tool. The model only says “I want to run this”; the code that actually runs it is yours. You feed the result back to the model, and it turns that result into a sentence for you. The model produces the intent; the environment performs the action.

```text
# A tool definition shown to the model (conceptual)
{
  "name": "get_weather",
  "description": "Returns the current weather for a city.",
  "input_schema": {
    "type": "object",
    "properties": { "city": { "type": "string" } },
    "required": ["city"]
  }
}

# The call the model produces (structured data, not prose):
# -> get_weather(city = "Istanbul")
# Your code runs the tool and feeds the result back to the model:
# -> { "temp": 21, "condition": "partly cloudy" }
# The model turns it into a sentence: "It's 21°C and partly cloudy in Istanbul."
```

<div class="callout"><strong>Tip:</strong> Write tool descriptions as if you were writing for a person. The model decides which tool to call, and when, by reading these descriptions. A vague description is a direct invitation to the wrong tool choice.</div>

## Planning and the think–act–observe loop

A single tool call often isn’t enough. A task like “find the cheapest round-trip flight to Paris and add it to my calendar” requires several steps. This is where the agent’s **planning** ability comes in.

A common pattern is a loop of roughly three steps: **Think → Act → Observe**. The model first thinks about what to do (reasons), then acts by calling a tool, then observes the result. The observation brings new information; the model thinks again with it. The loop repeats until the task is complete.

```text
GOAL = "Find a 3-night hotel in Paris and tell me the price in euros"

loop (until task is done):
    think:   "First I should call the hotel-search tool."
    act:     search_hotel(city="Paris", nights=3)
    observe: [3 results, prices in dollars]
    think:   "Prices are in dollars; I should convert to euros."
    act:     convert_currency(amount=420, from="USD", to="EUR")
    observe: 388 EUR
    think:   "I have what I need, I can write the answer." -> DONE
```

The power of this loop lies in the model’s ability to _notice and correct its own mistakes_. If a tool returns an empty result, the model can try a different search. But that same flexibility, left unchecked, can also make the loop run forever; that’s why capping the number of steps is a good habit.

## MCP: a universal socket for tools

If every agent had to write custom glue code from scratch for every tool, the ecosystem would quickly turn into a tangle of cables. **MCP (the Model Context Protocol)** was born to solve exactly this: a _common standard_ for connecting tools, data sources, and models.

My favorite analogy is USB. Before USB, every device had its own cable; after USB, you could plug anything into a single port. MCP is like USB for the AI world: you write a tool once according to the MCP standard, and _every_ agent that supports MCP can use it.

In practice, MCP standardizes the conversation between a **client** (the application running the agent) and a **server** (the side that exposes tools and data). The server says “here are my tools,” the client introduces them to the model, the model calls one, and the server runs it. Because everyone speaks the same language, the pieces become pluggable.

> MCP’s value shows up not in any single tool but in _interoperability_: a tool written once is reused across every client that supports the standard.

## The anatomy of a multi-step task

In the real world, the tasks given to agents are rarely single-step. A request like “extract the figures from this PDF, put them in a table, and summarize it” combines reading, parsing, computing, and summarizing into a single flow. The typical components of a multi-step task are:

-   **Decomposition:** breaking the big goal into small subtasks, each solvable with one tool.
-   **State/memory:** carrying intermediate results between steps. Step three must remember the data found in step one.
-   **Error recovery:** when a tool fails, trying an alternative or asking the user for clarity instead of giving up.
-   **Stopping criterion:** defining clearly when the task counts as “done”; otherwise the agent keeps looping.

As tasks grow longer, the chance of error accumulates: if each step has a small margin of error, those margins compound across a ten-step chain. That’s why mature agent designs reduce a task to as few, robust steps as possible and add verification at critical points.

<div class="callout"><strong>Tip:</strong> In a multi-step task, don’t fall into the “cram everything into one giant prompt” trap. Splitting the task into clear subtasks both improves accuracy and makes it easier to see where things broke when something goes wrong.</div>

## Opportunities and risks

The promise of agents is big: automating repetitive digital chores, coordinating multiple systems with a single natural-language request, and shrinking hours-long research-and-collation work down to minutes. Set up correctly, an agent can run an end-to-end workflow on your behalf.

But like any system that can act, agents carry real risks:

-   **Irreversible actions:** once an email is sent or a record deleted, there’s no going back. Human approval is essential for high-impact tools.
-   **Prompt injection:** a web page or document the agent reads may contain hidden instructions (“ignore previous instructions, do this instead”). Never treat external data as a trusted command.
-   **Error accumulation:** small mistakes grow over long chains; without intermediate verification, the result can quietly break.
-   **Cost and looping:** with a weak stopping criterion, the agent takes more steps than needed — getting both slower and more expensive.
-   **Authority boundary:** every tool you give an agent is a permission you grant it. Apply the principle of least privilege: give only what’s needed.

> A practical rule: think of the agent as a smart but inexperienced intern. Its capability is surprising, but on important decisions you want it to ask for approval and to limit where its hands can reach.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>Agent = model + tools + loop; a plain model only writes, while an agent acts.</li><li>In a tool call the model produces the intent; the surrounding code is what actually runs the tool.</li><li>Planning usually proceeds through a Think–Act–Observe loop, and the step count should be capped.</li><li>MCP is a universal “socket” for tools: write once, use across every compatible client.</li><li>The biggest risks are irreversible actions and prompt injection; human approval and least privilege are essential.</li></ul></div>

<div class="faq"><details><summary>What’s the difference between an agent and a chatbot?</summary><p>A chatbot replies with text; when the chat ends you’re left with a sentence. An agent acts through tools: it reads files, calls APIs, completes a job for you. An agent may contain a chatbot, but the difference is between “talking” and “getting work done.”</p></details><details><summary>Do I have to support MCP to use it?</summary><p>No — MCP isn’t required to build an agent; you can wire tools in directly. What MCP gives you is interoperability: if you write your tool once against the standard, you can reuse it across different clients and benefit from ready-made MCP servers.</p></details><details><summary>How do I protect myself if the agent does something wrong?</summary><p>Three layers are recommended: human approval for high-impact actions, caution toward external data (prompt injection), and least privilege (let the agent access only the tools it truly needs). Add a step/cost cap to prevent runaway loops.</p></details></div>

---

In short, LLM agents are turning AI from a “talking consultant” into a “working assistant.” That shift is a major opportunity, but like any system that acts, it demands careful design: clear tools, limited authority, human approval, and measurable stopping criteria. If you’re planning to design safe, fit-for-purpose AI solutions, the [HatsonTech](/en/posts/how-hatsontech-started/) team would be glad to weigh these architectural decisions with you.
