import { object, string, type Issue, type SafeParseResult as ValibotSafeParseResult } from 'valibot';
type Schema = ReturnType<typeof object> | ReturnType<typeof string>;
export declare const required: (key: string) => ReturnType<typeof string>;
export declare const createEnvSchema: (schemaDefinition: Record<string, Schema>) => ReturnType<typeof object>;
export interface ReducedIssue {
    attribute: string | undefined;
    input: unknown;
    message: string;
}
export declare function validateEnv(schema: Schema, envVars: Record<string, unknown>, skipEnvValidation?: string | undefined): ValibotSafeParseResult<Schema> | undefined;
export declare function reduceIssues(issues: Issue[]): ReducedIssue[];
export {};
