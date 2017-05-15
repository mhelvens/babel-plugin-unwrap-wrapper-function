export default ({types: t}) => {
	
	function shouldBeUnwrapped(path) {
		let node = path.getStatementParent().node;
		let comments = node.leadingComments;
		return comments && comments.some((comment) => {
			return comment.type === 'CommentBlock' && /^\*[^@]*@wrapper.*/.test(comment.value);
		});
	}
	
	function moveDeclaration(path) {
		const pStatement = this.getStatementParent();
		let node;
		switch (pStatement.type) {
			case 'ExportDefaultDeclaration': {
				node = t.exportDefaultDeclaration(path.node);
			} break;
			default: throw new Error("The unwrap-wrapper-function plugin can only handle wrapper functions following `export default`.")
		}
		node.leadingComments = path.node.leadingComments;
		pStatement.insertAfter(node);
        path.remove();
	}
	
	return {
	    visitor: {
	        ['ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'](path) {
	        	if (!shouldBeUnwrapped(path)) { return }
	        	for (let sPath of [...path.get('body.body')].reverse()) {
	        		if (!sPath.isDeclaration())      { continue }
	        		if (!sPath.node.leadingComments) { continue }
			        path::moveDeclaration(sPath);
	        		break;
		        }
	        	path.remove();
	        }
	    }
	};
	
};
