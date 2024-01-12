const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "cookies"]);
  const object = pick(req, Object.keys(validSchema));
  const options = {
    errors: {
      wrap: {
        label: false,
      },
    },
  };
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object, options);

  if (error) {
    console.log("error in validation : ", error);

    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
