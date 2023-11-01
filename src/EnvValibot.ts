/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
import {
  minLength,
  object,
  safeParse,
  string,
  type BaseSchema,
  type Issue,
  type SafeParseResult as ValibotSafeParseResult,
} from 'valibot';

type Schema = BaseSchema<any, any>;

export const required = (key: string): ReturnType<typeof string> =>
  string([minLength(1, `${key} required`)]);

export const createEnvSchema = (
  schemaDefinition: Record<string, Schema>
): ReturnType<typeof object> => object(schemaDefinition as any);

export interface ReducedIssue {
  attribute: string | undefined;
  input: unknown;
  message: string;
}

export function validateEnv(
  schema: Schema,
  envVars: Record<string, unknown>,
  skipEnvValidation: string | undefined = 'false'
): ValibotSafeParseResult<Schema> | undefined {
  if (skipEnvValidation !== 'true') {
    const parsed = safeParse(schema, envVars);
    if (!parsed.success) {
      const reducedIssues: ReducedIssue[] = reduceIssues(parsed.issues);
      console.error('Issue with environment variables: ' + JSON.stringify(reducedIssues));
      process.exit(1);
    }
    return parsed;
  } else {
    return undefined;
  }
}

export function reduceIssues(issues: Issue[]): ReducedIssue[] {
  return issues.map((issue) => ({
    attribute: issue.path?.[0].key,
    input: issue.input,
    message: issue.message,
  }));
}
