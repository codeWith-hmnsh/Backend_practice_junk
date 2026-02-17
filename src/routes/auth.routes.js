import { Router } from "express";
import { 
    registerUser, 
    login, 
    logout, 
    forgotPasswordRequest, 
    resetForgotPassword,
    verifyEmail,
    refreshAccessToken,
    getCurrentUser,
    resendEmailVerification,
    changeCurrentPassword
} from "../controller/auth.controllers.js"; 

import { validate } from "../middlewares/validator.middleware.js";
import { 
    userForgotPasswordValidator, 
    userLoginValidator, 
    userRegisterValidator,
    userResetPasswordValidator, // Matched your validator/index.js name
    userchangePasswordValidator  // Matched your validator/index.js name
} from "../validators/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js"; 

const router = Router();

// --- Public Routes ---
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetPasswordValidator(), validate, resetForgotPassword);

// --- Secure Routes (Requires Login) ---
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser); // Standard practice is GET
router.route("/change-password").post(
    verifyJWT, 
    userchangePasswordValidator(), 
    validate, 
    changeCurrentPassword
);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);

export default router;