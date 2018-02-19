class RuleGroup {
	constructor(rules, root) {
		if(!Array.isArray(rules)) {
			rules = [rules];
		} 
		
		this.rules = rules.map(function(rule) {
			if(rule.delimiter) {
				return new Delimiter(rule, root);					
			}
			if(rule.repeat) {
				return new Repeater(rule, root);
			}
			
			return new Rule(rule, root);
		});
	}
	exec(str, args, context) {
		var argC = args.length;
		var tmp_str;
		var rules = this.rules;

		for(var i = 0, length = rules.length; i < length; i++) {
			if((tmp_str = rules[i].exec(str, args, context)) !== false) {
				return tmp_str;
			}
			
			args.splice(argC);
		}
		
		return false;
	}
}
