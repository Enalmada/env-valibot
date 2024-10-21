/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
import {
	type BaseIssue,
	type BaseSchema,
	type EnumSchema,
	type GenericSchema,
	type InstanceSchema,
	type IntersectSchema,
	type LazySchema,
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
	type StringSchema,
	type UnionSchema,
	type UnknownSchema,
	type SafeParseResult as ValibotSafeParseResult,
	type VoidSchema,
	minLength,
	object,
	pipe,
	safeParse,
	string,
} from "valibot";

type Schema =
	| GenericSchema<any, any>
	| StringSchema<any>
	| NumberSchema<any>
	| PicklistSchema<any, any>
	| OptionalSchema<any, any>
	| EnumSchema<any, any>
	| InstanceSchema<any, any>
	| IntersectSchema<any, any>
	| NanSchema<any>
	| NeverSchema<any>
	| NonNullableSchema<any, any>
	| NonNullishSchema<any, any>
	| NonOptionalSchema<any, any>
	| NullableSchema<any, any>
	| NullishSchema<any, any>
	| LazySchema<any>
	| BaseSchema<any, any, any>
	| UnionSchema<any, any>
	| UnknownSchema
	| VoidSchema<any>;

export const createEnvSchema = (
	schemaDefinition: Record<string, Schema>,
): ReturnType<typeof object> => object(schemaDefinition as any);

export const required = (key: string) =>
	pipe(string(), minLength(1, `${key} required`));

export interface ReducedIssue {
	attribute: string | undefined;
	input: unknown;
	message: string;
}

export function validateEnv(
	schema: Schema,
	envVars: Record<string, unknown>,
	skipEnvValidation: string | undefined = "false",
): ValibotSafeParseResult<Schema> | undefined {
	if (skipEnvValidation !== "true") {
		const parsed = safeParse(schema, envVars);
		if (!parsed.success) {
			const reducedIssues: ReducedIssue[] = reduceIssues(parsed.issues);
			console.error(
				`Issue with environment variables: ${JSON.stringify(reducedIssues)}`,
			);
			process.exit(1);
		}
		return parsed;
	}
	return undefined;
}

export function reduceIssues(issues: BaseIssue<any>[]): ReducedIssue[] {
	return issues.map((issue) => {
		// Ensure attribute is a string or undefined
		const attribute =
			typeof issue.path?.[0].key === "string" ? issue.path?.[0].key : undefined;

		return {
			attribute,
			input: issue.input,
			message: issue.message,
		};
	});
}
