import { type BaseIssue, type BaseSchema, type EnumSchema, type GenericSchema, type InstanceSchema, type IntersectSchema, type LazySchema, type NanSchema, type NeverSchema, type NonNullableSchema, type NonNullishSchema, type NonOptionalSchema, type NullableSchema, type NullishSchema, type NumberSchema, type OptionalSchema, type PicklistSchema, type StringSchema, type UnionSchema, type UnknownSchema, type SafeParseResult as ValibotSafeParseResult, type VoidSchema, object } from "valibot";
type Schema = GenericSchema<any, any> | StringSchema<any> | NumberSchema<any> | PicklistSchema<any, any> | OptionalSchema<any, any> | EnumSchema<any, any> | InstanceSchema<any, any> | IntersectSchema<any, any> | NanSchema<any> | NeverSchema<any> | NonNullableSchema<any, any> | NonNullishSchema<any, any> | NonOptionalSchema<any, any> | NullableSchema<any, any> | NullishSchema<any, any> | LazySchema<any> | BaseSchema<any, any, any> | UnionSchema<any, any> | UnknownSchema | VoidSchema<any>;
export declare const createEnvSchema: (schemaDefinition: Record<string, Schema>) => ReturnType<typeof object>;
export declare const required: (key: string) => import("valibot").SchemaWithPipe<[StringSchema<undefined>, import("valibot").MinLengthAction<string, 1, `${string} required`>]>;
export interface ReducedIssue {
    attribute: string | undefined;
    input: unknown;
    message: string;
}
export declare function validateEnv(schema: Schema, envVars: Record<string, unknown>, skipEnvValidation?: string | undefined): ValibotSafeParseResult<Schema> | undefined;
export declare function reduceIssues(issues: BaseIssue<any>[]): ReducedIssue[];
export {};
