import {defaults, isInteger, isObject, entries, assign} from 'lodash-bound';
import assert from 'power-assert';

import {humanMsg, definePropertiesByValue, babelHelpers, ValueTracker} from 'utilities';

import {constraint} from './util/misc';

const $$allowInvokingConstructor = Symbol('$$allowInvokingConstructor');

////////////////////////////////////////////////////////////////////////////////

/**
 * @wrapper
 */
export default (env) => {
	
	const bla = 'bla';
	
	/**
	 * The base-class of all entities described in the manifest.
	 * @public
	 */
	class Entity extends ValueTracker {
		
		static get environment() { return env }
		
		static get Field() { return this.environment.Field }
		
		static get Entity() { return Entity }
		
	}
	
	return env.Entity || Entity;
};
