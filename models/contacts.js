const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContcts = await listContacts();
  const index = allContcts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = allContcts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContcts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allContcts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContcts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContcts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const allContcts = await listContacts();
  const index = allContcts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  allContcts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContcts, null, 2));
  return allContcts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
