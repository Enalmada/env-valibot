// src/index.ts
import {
minLength,
object,
safeParse,
string
} from "valibot";
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
function reduceIssues(issues) {
  return issues.map((issue) => {
    const attribute = typeof issue.path?.[0].key === "string" ? issue.path?.[0].key : undefined;
    return {
      attribute,
      input: issue.input,
      message: issue.message
    };
  });
}
var createEnvSchema = (schemaDefinition) => object(schemaDefinition);
var required = (key) => string([minLength(1, `${key} required`)]);
export {
  validateEnv,
  required,
  reduceIssues,
  createEnvSchema
};
