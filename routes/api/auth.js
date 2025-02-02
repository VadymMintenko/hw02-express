const express = require("express");
const { validateBody, authenticate, upload } = require("../../decorator");
const authCtrl = require("../../controllers/auth-controllers");
const schemas = require("../../schemas/contacts-schemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  authCtrl.register
);

router.get("/verify/:verificationToken", authCtrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  authCtrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authCtrl.updateAvatar
);

module.exports = router;
