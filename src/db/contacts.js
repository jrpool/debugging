const db = require('./db')

const createContact = contact =>
  db.one(`
    INSERT INTO
      contacts (first_name, last_name)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      contact.first_name,
      contact.last_name,
    ]
  )
  .catch(error => error);

const getContacts = () =>
  db.any(`
    SELECT
      *
    FROM
      contacts
    `, []);


const getContact = contactId =>
  db.one(`
    SELECT id, first_name, last_name FROM contacts WHERE id=$1::int LIMIT 1
    `,
    [contactId])
    .catch(error => error);



const deleteContact = contactId =>
  db.none(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `,
    [contactId])
    .catch(error => error);

const searchForContact = searchQuery => {
  return db.any(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(last_name || ' ' || first_name) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => error);
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact
}
