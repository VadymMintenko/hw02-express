const express = require("express");
const contactsController = require("../../controllers/contacts-controllers");
const schemas = require("../../schemas/contacts-schemas");
const { validateBody, isValidId, authenticate } = require("../../decorator");

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteContact
);

module.exports = router;
