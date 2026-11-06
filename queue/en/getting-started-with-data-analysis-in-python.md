---
title: "Getting Started with Data Analysis in Python: First Steps with pandas"
description: "A beginner's path into data analysis with Python, Jupyter and pandas: reading a CSV, filtering, grouping and plotting, using a small example dataset."
publishDate: "2026-11-15T09:17:00+03:00"
lang: en
category: "Data"
tags: ["Python", "Data Analysis", "Pandas"]
translation: "python-ile-veri-analizine-baslangic"
heroImage:
  src: "../../../assets/blog/covers/getting-started-with-data-analysis-in-python.jpg"
  alt: "Python code next to a small table and a simple line chart on a screen"
---

You have a spreadsheet or a CSV export and you are wondering what it can tell you. Spreadsheet software takes you a long way, but it starts to strain when you need to repeat the same analysis every month, combine thousands of rows from several files, or show someone else exactly what you did. That is where Python and its best-known data library, pandas, come in. In this post I want to lay out a starting path that works even if you have never programmed: set up the tools, read a small dataset, filter it, group it and draw a chart.

## Why Python and pandas?

Python is one of the most widely used languages for data analysis, largely because its syntax is readable and its library ecosystem is huge. pandas is an open-source library that brings table thinking to Python. Its core structure is the `DataFrame`: a table with rows and named columns, much like a spreadsheet sheet. A single column is called a `Series`.

For me, the biggest benefit of analysing data with code is reproducibility. A formula typed into a cell is hard to trace a few months later, whereas code is a written record of every step. When the data changes, you can rerun the whole analysis in one go.

## Setting up: Python and Jupyter

All you need to begin is a recent version of Python 3, which you can download from python.org. Then, in a terminal (Command Prompt or PowerShell on Windows), install the packages:

```bash
pip install pandas matplotlib jupyterlab
jupyter lab
```

The second command opens JupyterLab in your browser. Jupyter notebooks let you run code in small cells and see the result right underneath. That is a comfortable way to explore data: try something, look at the result, move on.

If you would rather skip installation, browser-based notebook environments are another option. Services such as Google Colab let you run Python without installing anything on your computer. Before uploading personal or sensitive company data to such a service, though, think about where it will be stored and who can access it. While learning, made-up or public datasets like the one in this post are the safest choice.

<div class="callout"><strong>Tip:</strong> Creating a separate virtual environment for each project (<em>python -m venv .venv</em>) keeps package versions from different projects from clashing. You do not need it on day one, but it is a good habit to pick up early.</div>

## A first dataset: reading a CSV

As an example I will use three days of sales from an imaginary café with two branches. In real life this data would live in a file and you would read it with `pd.read_csv("sales.csv")`. Here I put the data directly into the code so that anyone can run it as is:

```python
import io
import pandas as pd
import matplotlib.pyplot as plt

csv_text = """date,branch,product,qty,unit_price
2026-10-01,Downtown,Tea,120,15
2026-10-01,Downtown,Bagel,80,20
2026-10-01,Riverside,Tea,90,15
2026-10-01,Riverside,Bagel,60,20
2026-10-02,Downtown,Tea,135,15
2026-10-02,Downtown,Bagel,70,20
2026-10-02,Riverside,Tea,95,15
2026-10-02,Riverside,Bagel,,20
2026-10-03,Downtown,Tea,150,15
2026-10-03,Downtown,Bagel,90,20
2026-10-03,Riverside,Tea,110,15
2026-10-03,Riverside,Bagel,75,20
"""

df = pd.read_csv(io.StringIO(csv_text), parse_dates=["date"])
print(df.shape)   # (12, 5): 12 rows, 5 columns
print(df.head())  # first 5 rows
df.info()         # column types and non-null counts
```

The `parse_dates` argument makes pandas read the `date` column as dates rather than text, which makes sorting and grouping by time much easier later on.

## Getting to know and cleaning the data

Before any analysis, look at the state of the data. Since I spend a lot of time on data quality, I would especially encourage you not to skip this step: missing or wrong values quietly affect every calculation that follows.

```python
print(df.isna().sum())  # how many missing values per column?

df = df.dropna(subset=["qty"])                 # drop the row with a missing quantity
df["revenue"] = df["qty"] * df["unit_price"]   # add a calculated column
```

In the example, the Riverside branch has no bagel quantity on 2 October. I dropped that row, but it is worth remembering that this is a decision: bagel sales for that day will now look lower than they really were. In a real project, finding out why the value is missing (a logging error, or genuinely no sales?) is often better than simply deleting it.

## Filtering and grouping

In pandas you filter by writing a condition inside square brackets. Combine conditions with `&` (and) or `|` (or), and wrap each condition in parentheses:

```python
downtown_tea = df[(df["branch"] == "Downtown") & (df["product"] == "Tea")]
print(downtown_tea)

by_branch = df.groupby("branch")["revenue"].sum().sort_values(ascending=False)
print(by_branch)
# Downtown     10875.0
# Riverside     7125.0

table = df.pivot_table(index="date", columns="product", values="qty", aggfunc="sum")
print(table)
```

The idea behind `groupby` is often summarised as "split, apply, combine": split the data by branch, sum the revenue in each group, and combine the results into one table. `pivot_table` is the equivalent of a spreadsheet pivot table; here it shows the total quantity per product for each day.

When reading results, step back and sanity-check them. Downtown's revenue looks higher than Riverside's, but we know Riverside is missing a day of bagel data. Before drawing conclusions, ask how much of the gap is real and how much comes from the missing value. One of the most valuable habits in analysis is asking "what might be influencing this number?" next to every figure.

## A first chart

pandas draws charts using the Matplotlib library under the hood. Showing total revenue per day as a line chart takes a few lines:

```python
daily = df.groupby("date")["revenue"].sum()
ax = daily.plot(marker="o", title="Total revenue per day")
ax.set_xlabel("Date")
ax.set_ylabel("Revenue")
ax.set_ylim(bottom=0)
plt.tight_layout()
plt.show()
```

Labelling the axes and stating the unit is a small but important habit. `set_ylim(bottom=0)` makes the axis start at zero so that the differences between days do not look bigger than they are.

## Where to go next

This small example contains the whole loop: read, inspect, clean, summarise and visualise. Most real projects are larger, messier versions of the same loop. From here I would suggest looking at:

- **Combining tables:** `merge` matches two tables on a shared column (the pandas counterpart of a SQL JOIN).
- **Time series:** `resample` turns daily data into weekly or monthly summaries.
- **Text data:** the `.str` methods help fix differences in case, spacing and spelling.
- **The official docs:** pandas' own "10 minutes to pandas" guide and getting-started tutorials are a clear, up-to-date next step.
- **Your own data:** the best way to learn is to ask one small question of a real dataset you care about.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>The core structure in pandas is the DataFrame: a table with rows and named columns.</li><li>Jupyter lets you run code step by step and see results immediately, which suits exploratory analysis.</li><li>Check for missing values before analysing; dropping or filling them is a decision that changes results.</li><li>Filtering, groupby and pivot_table answer a large share of everyday analyst questions.</li><li>Small chart details such as axis labels, units and a zero baseline make results easier to read.</li></ul></div>

<div class="faq"><details><summary>Do I need to know how to program before learning this?</summary><p>No. The Python you need for basic analysis (variables, lists, calling functions) can be picked up with a few weeks of regular practice, and you can learn it alongside pandas.</p></details><details><summary>Why use pandas instead of a spreadsheet?</summary><p>Spreadsheets are still great for small, one-off tasks. pandas shines for repeated analyses, larger files and work where the steps need to be recorded. They complement rather than replace each other.</p></details><details><summary>What if my CSV file has special characters?</summary><p>If the file is saved as UTF-8 it usually just works. Some older files use a different encoding; in that case pass the correct one to read_csv with the encoding argument.</p></details><details><summary>Can I use an editor other than Jupyter?</summary><p>Yes. The same code runs as a plain .py file, and many code editors can open Jupyter notebooks directly. What matters at the start is picking an environment you are comfortable with.</p></details></div>

---

**Sources**

- [pandas – Getting started](https://pandas.pydata.org/docs/getting_started/index.html)
- [pandas – 10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [pandas – How do I create plots in pandas?](https://pandas.pydata.org/docs/getting_started/intro_tutorials/04_plotting.html)
- [Project Jupyter – Install](https://jupyter.org/install)
- [Python – Downloads](https://www.python.org/downloads/)
