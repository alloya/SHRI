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

    // {
    //   code: `
    //     import { ClientBus, subscribe } from "@yandex-nirvana/bus";

    //     import { call } from "typed-redux-saga";

    //     import {selectDeliveryDate} from '../../selectors';

    //     import {calcDeliveryDate} from './helpers';
    //   `,
    // }
  ],
  invalid: [
//     {
//       code: 
// `
// import fs from 'fs';
// import path from 'path';

// import _ from 'lodash';
// `,
//       output: 
// `
// import fs from 'fs';
// import _ from 'lodash';
// import path from 'path';
// `,
//       errors:[{message: "Sort imports"},{message: "extraNewlines"}]
//     },
    {
      code: 
`
import fs from 'fs';
const dynamic = import("my-dynamic-import");
import _ from 'lodash';
import path from 'path';
`,
      output: 
`
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const dynamic = import("my-dynamic-import");
`,
      errors: [{message: "Sort imports"}, {message: 'missing separator'}]
    }
  ]
})