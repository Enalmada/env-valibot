// src/index.ts
import {
  minLength,
  object,
  pipe,
  safeParse,
  string
} from "valibot";
var createEnvSchema = (schemaDefinition) => object(schemaDefinition);
var required = (key) => pipe(string(), minLength(1, `${key} required`));
function validateEnv(schema, envVars, skipEnvValidation = "false") {
  if (skipEnvValidation !== "true") {
    const parsed = safeParse(schema, envVars);
    if (!parsed.success) {
      const reducedIssues = reduceIssues(parsed.issues);
      console.error(`Issue with environment variables: ${JSON.stringify(reducedIssues)}`);
      process.exit(1);
    }
    return parsed;
  }
  return;
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
export {
  validateEnv,
  required,
  reduceIssues,
  createEnvSchema
};
