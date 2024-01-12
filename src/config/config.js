const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "demo", "test")
      .required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  sql_config: {
    DIALECT: envVars.SQL_DIALECT,
    HOST: envVars.SQL_HOST,
    USER: envVars.SQL_USER,
    PASSWORD: envVars.SQL_PASSWORD,
    DB: envVars.SQL_DB,
    PORT: envVars.SQL_PORT,
  },
};
