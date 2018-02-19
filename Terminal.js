class Terminal {
	constructor(regExp, whiteSpace) {
		if(whiteSpace) {
			this.regExp = regExp;
		} else {
			this.regExp = new RegExp("^\\s*(?:"+regExp.source+")", regExp.ignoreCase?"i":"");
		}
	}
	
	exec(str, args) {
		var tokens = this.regExp.exec(str);
		
		if(tokens != null) {
			str = str.substring(tokens.shift().length);
			Array.prototype.push.apply(args, tokens);
			return str || new String("");
		}

		return false;
	}
}
