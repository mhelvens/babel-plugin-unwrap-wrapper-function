export default ({types: t}) => {
	
	function shouldBeUnwrapped(path) {
		let comments = path.getStatementParent().node.leadingComments;
		return comments && comments.some((comment) => {
			return comment.type === 'CommentBlock' && /^\*[^@]*@wrapper.*/.test(comment.value);
		});
	}
	
	return {
	    visitor: {
	        ['ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'](path) {
	        	if (!shouldBeUnwrapped(path)) { return }
	        	const statementParent = path.getStatementParent();
	        	for (let sPath of path.get('body.body')) {
	        		if (!sPath.isDeclaration()) { continue }
			        statementParent.insertBefore(sPath.node);
	        		sPath.remove();
		        }
	        	
	        }
	    }
	};
	
};