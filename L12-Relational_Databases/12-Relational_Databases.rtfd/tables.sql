CREATE TABLE payments (
  customer_name varchar(128),
  -- processed_at date,
  amount int
);

CREATE TABLE balances (
  username varchar(128),
  balance int
);

-- one massive column of random integers
CREATE TABLE large_table (
  random_int int
);

INSERT INTO payments VALUES ('harry', 10 );
INSERT INTO payments VALUES ('ruby', 100 );
INSERT INTO payments VALUES ('troy', 10 );
INSERT INTO payments VALUES ('sam', 10 );
INSERT INTO payments VALUES ('dorky', 10 );
INSERT INTO payments VALUES ('bleu', 90 );
INSERT INTO payments VALUES ('casper', 100 );
INSERT INTO payments VALUES ('mosey', 70 );
INSERT INTO payments VALUES ('sasha', 60 );

INSERT INTO balances VALUES ('harry', 0);
INSERT INTO balances VALUES ('ruby', 1000);

-- populating large table with 50 million rows, 
-- numbers can go up to a billion
INSERT INTO large_table (random_int)
  SELECT round(random() * 1000000000)
  FROM generate_series(1, 50000000) s(i); 
