DROP TABLE IF EXISTS cocktails CASCADE;
CREATE TABLE IF NOT EXISTS cocktails (
  cocktail_name VARCHAR(30),
  reviews VARCHAR(500)[],
  review_date DATETIME[]
);
/* creates table to hold cocktails and arrays of reviews and their dates for each cockktail */
