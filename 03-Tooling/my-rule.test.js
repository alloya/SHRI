import { RuleTester } from "eslint";
import SortImports from "./my-rule";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const errors = [{ message: 'Sort imports' }];

ruleTester.run('sort-imports', SortImports, {
  valid: [
    {
      code: `
        import fs from 'fs';
      `
    },
  ],
  invalid: [
    {
      code: `
        import path from 'path';
        import fs from 'fs';
      `,
      errors
    }
  ]
})