import { object, string, type BaseSchema, type EnumSchema, type InstanceSchema, type IntersectSchema, type Issue, type NanSchema, type NeverSchema, type NonNullableSchema, type NonNullishSchema, type NonOptionalSchema, type NullableSchema, type NullishSchema, type NumberSchema, type OptionalSchema, type PicklistSchema, type RecursiveSchema, type SpecialSchema, type StringSchema, type UnionSchema, type UnknownSchema, type SafeParseResult as ValibotSafeParseResult, type VoidSchema } from 'valibot';
type Schema = BaseSchema<any, any> | StringSchema<any> | NumberSchema<any> | PicklistSchema<any> | OptionalSchema<any, any> | EnumSchema<any> | InstanceSchema<any> | IntersectSchema<any> | NanSchema | NeverSchema | NonNullableSchema<any> | NonNullishSchema<any> | NonOptionalSchema<any> | NullableSchema<any> | NullishSchema<any> | RecursiveSchema<any> | SpecialSchema<any> | UnionSchema<any> | UnknownSchema | VoidSchema;
export declare const createEnvSchema: (schemaDefinition: Record<string, Schema>) => ReturnType<typeof object>;
export declare const required: (key: string) => ReturnType<typeof string>;
export interface ReducedIssue {
    attribute: string | undefined;
    input: unknown;
    message: string;
}
export declare function validateEnv(schema: Schema, envVars: Record<string, unknown>, skipEnvValidation?: string | undefined): ValibotSafeParseResult<Schema> | undefined;
export declare function reduceIssues(issues: Issue[]): ReducedIssue[];
export {};
