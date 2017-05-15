import * as babel from 'babel-core';

import generate from 'babel-generator';

import plugin from '../src/index.js';

const code = `
	/**
	 * Wrapper function...
	 * @wrapper
	 */
	export default () => {
		
		/**
		 * Class C.
		 * @public
		 */
		return class C {}
		
		// return C;
		
	};
	
	/**
	 * Non-wrapper function...
	 */
	let x = () => {
		
		/**
		 * Class D.
		 * @public
		 */
		class D {}
		
		return D;
		
	};
`;

const newAST = babel.transform(code, {
	plugins: [plugin]
});

console.log(generate(newAST.ast).code);
