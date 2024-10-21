import {
	type BaseIssue,
	type ObjectPathItem,
	minLength,
	object,
	pipe,
	safeParse,
	string,
} from "valibot";

import {
	type ReducedIssue,
	createEnvSchema,
	reduceIssues,
	required,
	validateEnv,
} from "../src";

describe("index", () => {
	describe("required", () => {
		it("should return a string with a required rule", () => {
			const key = "test";
			const result = required(key);
			// workaround strict equality fail
			expect(JSON.stringify(result)).toEqual(
				JSON.stringify(pipe(string(), minLength(1, `${key} required`))),
			);
		});
	});

	describe("createEnvSchema", () => {
		it("should create a schema object", () => {
			const schemaDefinition = {
				TEST: string(),
			};
			const result = createEnvSchema(schemaDefinition);
			expect(JSON.stringify(result)).toEqual(
				JSON.stringify(object(schemaDefinition)),
			);
		});
	});

	describe("validateEnv", () => {
		const schema = object({
			TEST: string(),
		});
		const envVars = {
			TEST: "value",
		};

		it("direct call works", () => {
			const result = safeParse(string(), "value");
			expect(result?.success).toBe(true);
		});

		it("should return parsed result when validation is successful", () => {
			const result = validateEnv(schema, envVars, "false");
			expect(result?.success).toBe(true);
		});

		it("should not validate if skipEnvValidation is true", () => {
			const result = validateEnv(schema, envVars, "true");
			expect(result).toBeUndefined();
		});
	});

	describe("reduceIssues", () => {
		it("should reduce issues to a simpler format", () => {
			const issues: BaseIssue<any>[] = [
				{
					input: "test_input",
					message: "test_message",
					path: [{ key: "TEST_KEY" } as ObjectPathItem],
					type: "email",
					kind: "validation",
					expected: null,
					received: "",
				},
			];
			const expected: ReducedIssue[] = [
				{
					attribute: "TEST_KEY",
					input: "test_input",
					message: "test_message",
				},
			];
			const result = reduceIssues(issues);
			expect(result).toEqual(expected);
		});
	});
});
