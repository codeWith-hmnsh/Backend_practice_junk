import { body } from "express-validator";
import {AvailableUserRole} from "../utils/constants.js"

/* ================= REGISTER ================= */

const userRegisterValidator = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLowercase()
    .withMessage("Username must be in lowercase")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),

  body("fullName")
    .optional()
    .trim()
];

/* ================= LOGIN ================= */

const userLoginValidator = () => [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

/* ================= CHANGE PASSWORD ================= */

const userchangePasswordValidator = () => [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
];

/* ================= FORGOT PASSWORD ================= */

const userForgotPasswordValidator = () => [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
];

/* ================= RESET PASSWORD ================= */

const userResetPasswordValidator = () => [
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
];


const createProjectValidator = () => {
  return [
    body("name")
      .notEmpty()   
      .withMessage("Project name is required"),
      body("description").optional(),
  
  ];
}

const addMembersToProjectValidator=()=>{
  return[
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(AvailableUserRole)
    .withMessage("Role is invalid"),                                                          

  ]
}

export {
  userRegisterValidator,
  userLoginValidator,
  userchangePasswordValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
  addMembersToProjectValidator,
};
