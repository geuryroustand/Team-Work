import { body } from "express-validator";

const bodyValidation = [
    body("comment").exists().withMessage("Comment is a mandatory field"),
    body("rate").exists().withMessage("Rate is a mandatory field"),
];

export default bodyValidation