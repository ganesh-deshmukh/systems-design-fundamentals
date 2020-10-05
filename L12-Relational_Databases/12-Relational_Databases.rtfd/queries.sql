-- POWERFUL QUERIES

-- Sum the number of payments for each user
SELECT customer_name, count(*)
FROM payments
GROUP BY customer_name
ORDER BY count DESC;

-- Sum the payment amounts for each month
SELECT sum(amount), extract(year from processed_at) as year, 
  extract(month from processed_at)
FROM payments
GROUP BY month, year
ORDER BY sum DESC;

-- Sum the payment amounts for each month for each user

-- Find the largest single-user payments for each month



-- transfer 100 from Ruby to Harry

