
function cMod(theta) {
	return theta % (Math.PI * 2);
}

function Wheel(options) {
	
	var defaults = {
		insideRadius: 35,
		outsideRadius: 300,
		position: pt(330,330),
		theta: 0,
		angularVelocity: 0,
		drag: 10,
		
		spinning: true,
		settling: false,
		
		slices: [
		],
		
		totalSize: 1,
		
		colors: [
			'red',
			'yellow',
			'green',
			'blue'
		],
	};
		
	var e = $.extend({}, defaults, options);
	for(x in e) this[x] = e[x];
	
	
	
	this.render = function(ctx) {
		var maxw = ctx.canvas.width;
		
		var cx, xy;
		
		ctx.save();
		
		
		ctx.translate(this.position.x, this.position.y);
		
		// draw the circle underneath
		
		ctx.save();
		
		ctx.rotate(this.theta);
		//ctx.rotate(0);
		
		
		var curAngle = 0;
		

		// fill interior of circle 
		for(var i = 0; i < this.slices.length; i++) {
			var rads = (this.slices[i].size * Math.PI * 2) / this.totalSize;
			ctx.beginPath();
			ctx.moveTo(this.insideRadius, 0);
			ctx.arc(0, 0,  this.insideRadius, curAngle, curAngle + rads, false);
			ctx.lineTo(Math.cos(curAngle + rads) * this.outsideRadius, Math.sin(curAngle + rads) * this.outsideRadius);
			ctx.arc(0, 0,  this.outsideRadius, curAngle + rads, curAngle, true);

		
			
			ctx.closePath();
			
			ctx.lineWidth = 3;
			
			ctx.fillStyle = this.colors[i % this.colors.length];
			ctx.fill();
			
			curAngle = 0
			ctx.rotate(rads);
			//break;
		} 

		ctx.save();
		// draw text
		for(var i = 0; i < this.slices.length; i++) {
			var rads = (this.slices[i].size * Math.PI * 2) / this.totalSize;
			ctx.rotate(rads / 2);
			
			ctx.font = '20px Arial';
			var metrics = ctx.measureText(this.slices[i].name);
			var textwidth = metrics.width;
			
			if(textwidth > this.outsideRadius - this.insideRadius - 24)
				ctx.font = '16px Arial';
			
			metrics = ctx.measureText(this.slices[i].name);
			textwidth = metrics.width;
			if(textwidth > this.outsideRadius - this.insideRadius - 24)
				ctx.font = '12px Arial';
			
			
			ctx.fillStyle = 'silver';
			var tx = this.insideRadius + 30;
			var ty = 10;
			ctx.fillText(this.slices[i].name, tx, ty);
			
			ctx.rotate(rads / 2);
		} 
		ctx.restore();
		

		// draw interior lines
		ctx.save();
		for(var i = 0; i < this.slices.length; i++) {
			var rads = (this.slices[i].size * Math.PI * 2) / this.totalSize;
			ctx.beginPath();
			ctx.moveTo(this.insideRadius, 0);
			ctx.lineTo(this.outsideRadius, 0);
			ctx.closePath();
			
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'black';
			ctx.stroke();
			
			ctx.rotate(rads);
		}
		ctx.restore();

		
		// draw circles
		
		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.arc(0, 0,  this.insideRadius, 0, Math.PI * 2, false);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = 20;
		ctx.arc(0, 0,  this.outsideRadius, 0, Math.PI * 2, false);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
	


		ctx.restore();
		
		// draw the arrow
		ctx.translate(10, 0);
		ctx.beginPath();
		
		var out = (this.outsideRadius * .05);
		var up = out * 2;
		ctx.moveTo(this.outsideRadius + out, -up);
		ctx.lineTo(this.outsideRadius + out, up);
		ctx.lineTo(this.outsideRadius - up - up, 0);
		ctx.lineTo(this.outsideRadius + out, -up);
			
		ctx.closePath();
		
		ctx.lineWidth = 5;
		
		ctx.fillStyle = "#a7a9ac";
		ctx.fill();	
		
		ctx.strokeStyle = '#bdbec0';
		ctx.stroke();
		
		
		ctx.restore();
	};
	
	
	this.frameMove = function(te) {
		
		if(this.spinning) {
			if(this.angularVelocity < .001) {
				this.angularVelocity = 0;
				this.drag = 0;
				this.settle();
			}			
			this.theta = cMod(this.theta + (this.angularVelocity * te));
			this.angularVelocity -= this.drag * te;
			this.angularVelocity = Math.max(0, this.angularVelocity);

		}
		
		if(this.settling) {
			var dt = this.theta - this.target_theta;
			this.theta -= dt * te * .6;
			if(Math.abs(this.target_theta - this.theta) < .001) {
				this.theta = this.target_theta;
				this.settling = false;
			}
			
		}

		
	};
	
	this.settle = function() {
		this.settling = true;
		this.spinning = false;
		this.final_theta = this.theta;
		
		// figure out which item it's in
		this.target_theta = 0;
		var qqq = 0;
		for(var i =  this.slices.length -1; i >= 0; i--) {
			var rads = (this.slices[i].size * Math.PI * 2) / this.totalSize;
			if(qqq < this.final_theta && (qqq + rads) > this.final_theta) {
				this.target_theta = qqq + (rads / 2);
				break;
			}
			qqq += rads;
		};
		
		this.angularVelocity = 0;
		this.drag = 0;
	}
	
	this.spin = function() {
		if(this.angularVelocity > 0.001) return;
		
		this.settling = false;
		this.spinning = true;
		
		this.drag = 1 +  Math.random() * .2;
		this.angularVelocity =  6 + Math.random() * 1;
	}
	
	this.init = function() {
		
		this.totalSize = this.slices.reduce(function(acc, q) { return acc + q.size; }, 0);
			
	}
	
	this.init();
	
	
}