class Rule {
	constructor(options, root) {
		if(Object.prototype.toString.call(options) != "[object Object]") {
			options = {
				symbols : Array.isArray(options)?options:[options]
			};
		}
		
    this.greedy = options.greedy;
		this.method = options.method;
		this.context = options.context;
		
		this.root = root;
		
		this.symbols = options.symbols.map(function(symbol) {
			switch(Object.prototype.toString.call(symbol)) {
				case "[object String]":
					return symbol;
				case "[object Array]":
				case "[object Object]":
					return new RuleGroup(symbol, root);
				default:
					return new Terminal(symbol, options.whiteSpace);
			}
		});
	}
	iterate(str, args, context) {
		var symbols = this.symbols;
		var tmp_str;
		var start_str = str;
		
		for(var i = 0; i < symbols.length; i++) {
			var symbol = symbols[i];
			
			if(typeof symbol == "string") {
				symbol = this.root[symbol];
			}
			
			if((tmp_str = symbol.exec(str, args, context)) === false) {
        if(this.greedy) {
          return false;
        }
				
				if(i > 1) {
					throw new Error("Parse error near: "+start_str);
				}
				
				return false;
			}
			
			str = tmp_str;
			
		}
		
		return str;
	}
	exec(str, parentArgs, context) {
		var method = this.method;
		var args = method?[]:parentArgs;
		
		if(this.context) {
			context = new this.context(context);
		}
		
		str = this.iterate(str, args, context);
		
		if(str === false) {
			return false;
		}
		
		if(method) {
			var result = method.apply(context, args);
				
			if(result) {
				parentArgs.push(result);
			}
		}
		
		return str;
	}
}
