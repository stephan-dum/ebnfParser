class Parser {
	constructor(grammar, ...parentGrammar) {		
		this.ast = {};

		if(grammar == undefined) {
			grammar = {};
		}
		
    if(parentGrammar.length) {
		  grammar = ScopeChain(grammar, ...parentGrammar);
		}
    
		this.addNode(grammar);
	}

	addNode(name, node) {
		var grammar = (
			Object.prototype.toString.call(name) == "[object String]"
				?{[name] : node}
				:name
		);
		
		for(var key in grammar) {
			if(this.ast[key]) {
				throw TypeError("Root node ´"+key+"´ already defined!");
			}
			
			this.ast[key] = new RuleGroup(grammar[key], this.ast);
		}
	}
	exec(str, root, context) {
		var args = [];

		var result = this.ast[root].exec(str, args, context || this);
		
		if(!/^\s*$/.test(result)) {
			throw new Error("Parse Error near: "+(result || str));
		} else if(result === false) {
			throw new Error("Parse error in ", str);
		}
		
		return args;
	}
}
