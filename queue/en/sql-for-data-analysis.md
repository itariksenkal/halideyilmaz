---
title: "SQL for Data Analysis: From SELECT to Window Functions"
description: "Using SELECT, WHERE, GROUP BY, JOIN and window functions for analysis: typical analyst questions on a small example schema, plus the SQL mistakes to avoid."
publishDate: "2026-11-16T09:17:00+03:00"
lang: en
category: "Data"
tags: ["SQL", "Data Analysis", "Databases"]
translation: "veri-analizi-icin-sql"
heroImage:
  src: "../../../assets/blog/covers/sql-for-data-analysis.jpg"
  alt: "A SQL query joining a customers table and an orders table"
---

Most of an organisation's data still lives in relational databases, in tables made of rows and columns, and the most common way to ask that data questions is SQL. "Who spent the most last month?", "How much revenue came from each city?", "Are there registered users who never ordered anything?" Each of these can be answered with a few lines of SQL. And SQL is no longer just for developers: analysts, product managers and finance teams use it more and more. In this post I walk through the constructs that matter most for analysis, using a tiny example schema, and the mistakes beginners most often make.

## An example schema: customers and orders

I will use a very simple two-table scenario: customers and the orders they place. The code below runs in both PostgreSQL and SQLite:

```sql
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  city        TEXT
);

CREATE TABLE orders (
  order_id    INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id),
  order_date  DATE,
  amount      NUMERIC
);

INSERT INTO customers VALUES
  (1, 'Ayşe',   'Ankara'),
  (2, 'Mehmet', 'İzmir'),
  (3, 'Elif',   'Ankara'),
  (4, 'Can',    NULL);

INSERT INTO orders VALUES
  (101, 1, '2026-09-03', 250),
  (102, 1, '2026-10-12', 400),
  (103, 2, '2026-10-15', 150),
  (104, 3, '2026-10-20', NULL),
  (105, 2, '2026-10-28', 300),
  (106, 1, '2026-10-30', 100);
```

I deliberately planted two "flaws": Can has no city, and Elif's order has no amount. Real data always has gaps like these, and they quietly change query results.

<div class="callout"><strong>Tip:</strong> You do not need a server to practise. SQLite is a database that lives in a single file and can be used straight away through Python's built-in <em>sqlite3</em> module. SQLite has supported window functions since version 3.25.0, released in 2018.</div>

## SELECT and WHERE: picking the right rows

The most basic query says which columns you want (`SELECT`), from which table (`FROM`) and under which condition (`WHERE`):

```sql
SELECT order_id, customer_id, amount
FROM orders
WHERE order_date >= '2026-10-01'
  AND amount > 120
ORDER BY amount DESC;
```

This returns orders from October onwards with an amount above 120, largest first: orders 102, 105 and 103. Order 104, with no amount, does not appear, because `NULL > 120` is not "true" but "unknown".

One more detail worth knowing: a SQL query is not evaluated in the order it is written. Logically it runs roughly as `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`. That order explains many "why doesn't this work?" moments. For example, in many databases, PostgreSQL among them, you cannot use a column alias defined in `SELECT` inside `WHERE`, because the alias does not exist yet when `WHERE` runs. `ORDER BY` runs last, so it can use aliases.

## GROUP BY and HAVING: summarising

Analysis is usually about summaries rather than individual rows. `GROUP BY` groups rows by a column and computes aggregate functions for each group:

```sql
SELECT customer_id,
       COUNT(*)      AS order_count,
       COUNT(amount) AS orders_with_amount,
       SUM(amount)   AS total_amount
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 2;
```

Two details matter here. First, `COUNT(*)` counts all rows, while `COUNT(amount)` counts only rows where the amount is not null. Second, the difference between `WHERE` and `HAVING`: `WHERE` filters individual rows before grouping, and `HAVING` filters groups after the aggregates are computed. "Customers with at least two orders" is a condition on groups, so it belongs in `HAVING`.

## JOIN: combining tables

The strength of relational databases is that information is stored once, in separate tables, and combined when needed. To get total order value per city, we join the two tables on `customer_id`:

```sql
SELECT c.city, SUM(o.amount) AS total_amount
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY total_amount DESC;
```

A plain `JOIN` (inner join) returns only rows that match in both tables. To answer "which customers have never ordered?", you need a `LEFT JOIN`: every row from the left table appears in the result, and when there is no match on the right, those columns are filled with `NULL`.

```sql
SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;
```

This returns only Can. The same pattern finds users who signed up but never bought anything, unmatched invoices or missing records.

## Window functions: calculating without losing rows

`GROUP BY` collapses rows into one summary row per group. Sometimes you want to keep every row and still compute something over a group, such as each customer's running total next to every order. That is what window functions do; the `OVER` clause is what turns a function into a window function.

```sql
SELECT customer_id, order_date, amount,
       SUM(amount)  OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_no
FROM orders
ORDER BY customer_id, order_date;
```

`PARTITION BY` defines the group the calculation runs within, and `ORDER BY` defines the order. For Ayşe the running total goes 250, 650, 750, and `order_no` shows whether an order was a customer's first, second or third. Questions like "what was each customer's first order?" become easy.

Window functions cannot be used in `WHERE`. To filter on them, for example to find each customer's largest order, wrap the query in a subquery:

```sql
SELECT *
FROM (
  SELECT customer_id, order_id, amount,
         RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rnk
  FROM orders
  WHERE amount IS NOT NULL
) AS ranked
WHERE rnk = 1;
```

## Common mistakes

SQL syntax is simple; the real difficulty is that a query can be quietly wrong. The mistakes I see most often:

- **Writing `= NULL`:** `WHERE city = NULL` returns nothing. Use `IS NULL` to find missing values.
- **Forgetting how NULLs affect averages:** `AVG(amount)` ignores nulls. In the example the average is 240; treating the missing amount as zero would give 200. Which one is right depends on the business question.
- **Multiplying rows with a JOIN:** joining on a one-to-many relationship and then summing can count the same value several times. Compare row counts before and after the join.
- **Breaking a LEFT JOIN with WHERE:** putting a condition on a right-table column in `WHERE` removes the unmatched (`NULL`) rows and effectively turns the query into an inner join. If you need that condition, put it in the `ON` clause.
- **Assuming date functions are portable:** grouping by month, for instance, uses different functions in PostgreSQL, SQLite and other systems. Check the documentation for the one you use.

<div class="takeaways"><h4>Key takeaways</h4><ul><li>SELECT, WHERE, GROUP BY and JOIN cover most everyday analyst questions.</li><li>WHERE filters rows before grouping; HAVING filters groups after aggregation.</li><li>The LEFT JOIN plus IS NULL pattern is the simplest way to find unmatched records.</li><li>Window functions compute running totals, row numbers and ranks without collapsing rows.</li><li>NULLs and join fan-out are the most common sources of silently wrong results.</li></ul></div>

<div class="faq"><details><summary>Which database should I learn SQL on?</summary><p>SQLite is very convenient to start with because it needs no installation. Basic queries are largely the same in PostgreSQL, MySQL and other relational systems; the differences are mostly in details such as date functions.</p></details><details><summary>Should I learn SQL or pandas?</summary><p>They are strong in different places. If the data sits in a database, filtering and summarising it there with SQL is usually more efficient. Pulling the result into a tool like pandas for deeper analysis and charts is a common workflow.</p></details><details><summary>What is the difference between a window function and GROUP BY?</summary><p>GROUP BY returns one row per group. A window function keeps every row and adds the result of the calculation alongside it.</p></details><details><summary>How can I check that my query is correct?</summary><p>Verify the result by hand on a small subset, compare row counts before and after each join, and check separately how columns containing NULLs affect the outcome.</p></details></div>

---

**Sources**

- [PostgreSQL Documentation – Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [PostgreSQL Documentation – Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html)
- [PostgreSQL Documentation – Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html)
- [PostgreSQL Documentation – Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [SQLite – Window Functions](https://www.sqlite.org/windowfunctions.html)
