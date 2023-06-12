const express = require("express");
const { validateBody, authenticate } = require("../../decorator");
const authCtrl = require("../../controllers/auth-controllers");
const schemas = require("../../schemas/contacts-schemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authCtrl.register
);

router.post("/login", validateBody(schemas.loginSchema), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

module.exports = router;
