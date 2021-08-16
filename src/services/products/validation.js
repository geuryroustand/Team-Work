import { body, checkSchema, validationResult } from "express-validator";

const schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "title validation Failed, type must be string",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "category validation Failed, type must be string",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "content validation Failed, type must be string",
    },
  },

  imageUrl: {
    in: ["body"],
    isString: {
      errorMessage: "imageUrl validation Failed, type must be string",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "category validation Failed, type must be string",
    },
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "price validation Failed, type must be numeric",
    },
  },
};

const searchSchema = {
  category: {
    in: ["query"],
    isString: {
      errorMessage: "category must be in query with type string in search!",
    },
  },
};

// const commentSchema = {
//     text: {
//         isString: {
//             errorMessage: "text must be in  string and required!"
//         }
//     },
//     username: {
//         isString: {
//             errorMessage: "username is required!"
//         }
//     }
// }

export const checkProductSchema = checkSchema(schema);
export const checkSearchSchema = checkSchema(searchSchema);
// export const checkCommentSchema = checkSchema(commentSchema)

export const checkValidResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("product Validation is failed");
    error.status = 400;
    error.errors = errors.array();
    next(error);
  }
  next();
};
