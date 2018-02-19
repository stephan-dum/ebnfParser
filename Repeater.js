class Repeater extends Rule {
	constructor(options, root) {
		super(options, root);
		
		if(Array.isArray(options.repeat)) {
			this.min = options.repeat[0];
			this.max = options.repeat[1];
		} else if(options.repeat instanceof Number) {
			this.min = this.max = options.repeat;
		}
	}
	iterate(str, args, context) {
		var tmp_str = Rule.prototype.iterate.call(this, str, args, context);

		if(tmp_str === false) {
			if(this.min === 0) {
				return str;
			}
			
			return false;
		}
		
		str = tmp_str;
		var i = 1;
		
		while(
			str != ""
			&& (this.max == undefined || ++i <= this.max)
			&& (tmp_str = Rule.prototype.iterate.call(this, str, args, context)) !== false
		) {
			str = tmp_str;
		}
		
		if(this.min != undefined && i < this.min) {
			return false;
		}
		
		return str;
	}
}
