import * as babel from 'babel-core';
import generate from 'babel-generator';
import fs from 'fs';

import plugin from '../src/index.js';

const code = fs.readFileSync('./test/testfile.js');

const newAST = babel.transform(code, {
	plugins: [plugin]
});

console.log(generate(newAST.ast).code);
