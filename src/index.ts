/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
import {
  minLength,
  object,
  safeParse,
  string,
  type BaseSchema,
  type EnumSchema,
  type InstanceSchema,
  type IntersectSchema,
  type Issue,
  type NanSchema,
  type NeverSchema,
  type NonNullableSchema,
  type NonNullishSchema,
  type NonOptionalSchema,
  type NullableSchema,
  type NullishSchema,
  type NumberSchema,
  type OptionalSchema,
  type PicklistSchema,
  type RecursiveSchema,
  type SpecialSchema,
  type StringSchema,
  type UnionSchema,
  type UnknownSchema,
  type SafeParseResult as ValibotSafeParseResult,
  type VoidSchema,
} from 'valibot';

type Schema =
  | BaseSchema<any, any>
  | StringSchema<any>
  | NumberSchema<any>
  | PicklistSchema<any>
  | OptionalSchema<any, any>
  | EnumSchema<any>
  | InstanceSchema<any>
  | IntersectSchema<any>
  | NanSchema
  | NeverSchema
  | NonNullableSchema<any>
  | NonNullishSchema<any>
  | NonOptionalSchema<any>
  | NullableSchema<any>
  | NullishSchema<any>
  | RecursiveSchema<any>
  | SpecialSchema<any>
  | UnionSchema<any>
  | UnknownSchema
  | VoidSchema;

export const createEnvSchema = (
  schemaDefinition: Record<string, Schema>
): ReturnType<typeof object> => object(schemaDefinition as any);

export const required = (key: string): ReturnType<typeof string> =>
  string([minLength(1, `${key} required`)]);

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
  return issues.map((issue) => {
    // Ensure attribute is a string or undefined
    const attribute = typeof issue.path?.[0].key === 'string' ? issue.path?.[0].key : undefined;

    return {
      attribute,
      input: issue.input,
      message: issue.message,
    };
  });
}
