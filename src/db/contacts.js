const db = require('./db')

const createContact = contact => {
  return db.one(`
    INSERT INTO
      contacts (first_name, last_name)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      contact.f_name,
      contact.l_name,
    ]
  )
  .catch(error => error)
}

const getContacts = function(){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    `, [])
}

const getContact = (contactId) =>
  db.one(`
    SELECT id, first_name, last_name FROM contacts WHERE id=$1::int LIMIT 1
    `,
    [contactId])
    .catch(error => error);


const deleteContact = (contactId) =>
  db.query(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `)
    .catch(error => error)

const searchForContact = function(searchQuery){
  return db.query(`
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
