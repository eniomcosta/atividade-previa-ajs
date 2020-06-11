--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Book (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publishing_company TEXT NOT NULL,
  area TEXT NOT NULL
);

INSERT INTO Book (title, author, publishing_company, area) VALUES ('Test Title', 'Test Author', 'Test Publishing Company', 'Test Area');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE Book;