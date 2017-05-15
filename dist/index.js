'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
	var t = _ref.types;


	function shouldBeUnwrapped(path) {
		var comments = path.getStatementParent().node.leadingComments;
		return comments && comments.some(function (comment) {
			return comment.type === 'CommentBlock' && /^\*[^@]*@wrapper.*/.test(comment.value);
		});
	}

	return {
		visitor: _defineProperty({}, 'ArrowFunctionExpression|FunctionExpression|FunctionDeclaration', function ArrowFunctionExpressionFunctionExpressionFunctionDeclaration(path) {
			if (!shouldBeUnwrapped(path)) {
				return;
			}
			var statementParent = path.getStatementParent();
			_reverse = [].concat(_toConsumableArray(path.get('body.body'))).reverse();

			if (!(_reverse && (typeof _reverse[Symbol.iterator] === 'function' || Array.isArray(_reverse)))) {
				throw new TypeError('Expected _reverse to be iterable, got ' + _inspect(_reverse));
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _reverse[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _reverse;

					var sPath = _step.value;

					if (!sPath.isDeclaration()) {
						continue;
					}
					statementParent.insertAfter(sPath.node);
					sPath.remove();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			path.remove();
		})
	};
};

function _inspect(input, depth) {
	var maxDepth = 4;
	var maxKeys = 15;

	if (depth === undefined) {
		depth = 0;
	}

	depth += 1;

	if (input === null) {
		return 'null';
	} else if (input === undefined) {
		return 'void';
	} else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
		return typeof input === 'undefined' ? 'undefined' : _typeof(input);
	} else if (Array.isArray(input)) {
		if (input.length > 0) {
			if (depth > maxDepth) return '[...]';

			var first = _inspect(input[0], depth);

			if (input.every(function (item) {
				return _inspect(item, depth) === first;
			})) {
				return first.trim() + '[]';
			} else {
				return '[' + input.slice(0, maxKeys).map(function (item) {
					return _inspect(item, depth);
				}).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
			}
		} else {
			return 'Array';
		}
	} else {
		var keys = Object.keys(input);

		if (!keys.length) {
			if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
				return input.constructor.name;
			} else {
				return 'Object';
			}
		}

		if (depth > maxDepth) return '{...}';
		var indent = '  '.repeat(depth - 1);
		var entries = keys.slice(0, maxKeys).map(function (key) {
			return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
		}).join('\n  ' + indent);

		if (keys.length >= maxKeys) {
			entries += '\n  ' + indent + '...';
		}

		if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
			return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
		} else {
			return '{\n  ' + indent + entries + '\n' + indent + '}';
		}
	}
}
