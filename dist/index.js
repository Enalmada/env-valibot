// src/EnvValibot.ts
import {minLength, object, safeParse, string} from "valibot";
function validateEnv(schema, envVars, skipEnvValidation = "false") {
  if (skipEnvValidation !== "true") {
    const parsed = safeParse(schema, envVars);
    if (!parsed.success) {
      const reducedIssues = reduceIssues(parsed.issues);
      console.error("Issue with environment variables: " + JSON.stringify(reducedIssues));
      process.exit(1);
    }
    return parsed;
  } else {
    return;
  }
}
var reduceIssues = function(issues) {
  return issues.map((issue) => ({
    attribute: issue.path?.[0].key,
    input: issue.input,
    message: issue.message
  }));
};
var required = (key) => string([minLength(1, `${key} required`)]);
var createEnvSchema = (schemaDefinition) => object(schemaDefinition);
export {
  validateEnv,
  required,
  createEnvSchema
};
