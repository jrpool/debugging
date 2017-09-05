COMMENT ON DATABASE contacts_debugging is 'Learners Guild debugging exercise';

DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

COMMENT ON TABLE contacts is 'names of contacts';
