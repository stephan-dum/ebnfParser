class Delimiter extends Repeater {
	constructor(options, root) {
		super(options, root);
		
		this.delimiter = new RegExp("^\\s*(?:"+options.delimiter.source+")", options.delimiter.ignoreCase?"i":"");;
	}
	iterate(str, args, context) {
		var tmp_str;
		var match;
		
		tmp_str = Rule.prototype.iterate.call(this, str, args, context);
		
		if(tmp_str === false) {
			if(this.from == 0) {
				return str;
			}
			
			return false;
		}
		
		str = tmp_str;
		var i = 1;

		while(
			(this.to == undefined || ++i <= this.to)
			&& (match = this.delimiter.exec(str)) != null
		) {
			tmp_str = Rule.prototype.iterate.call(this, str.substring(match[0].length), args, context);
			
			if(tmp_str === false) {
				break;
			}
			str = tmp_str;
		}
		
		if(this.from != undefined && i < this.from) {
			return false;
		}
		
		return str;
	}
}
