const express = require("express");
const contactsController = require("../../controllers/contacts-controllers");
const schemas = require("../../schemas/contacts-schemas");
const { validateBody, isValidId } = require("../../decorator");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteContact
);

module.exports = router;
