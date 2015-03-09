var Wheel = function(options) {
	var config, cMod, pt, ptc, reder, frameMove, settle, spin, init;
	console.log(options);
	pt = function(x,y) {
		return {x: x, y: y};
	};
	ptc = function (p) {
		return {x: p.x, y: p.y};
	};

	cMod = function(theta) {
		return theta % (Math.PI * 2);
	};

	var config = {
		insideRadius: 35,
		outsideRadius: 300,
		position: pt(330,330),
		theta: 0,
		angularVelocity: 0,
		drag: 10,
		
		spinning: true,
		settling: false,
		
		slices: options.slices || [],
		
		totalSize: options.slices.length || 1,
		
		colors: [
			'red',
			'yellow',
			'green',
			'blue',
			'purple'
		],
	};
	
	render = function(ctx) {
		var maxw = ctx.canvas.width;
		
		var cx, xy;
		
		ctx.save();
		
		
		ctx.translate(config.position.x, config.position.y);
		
		// draw the circle underneath
		
		ctx.save();
		
		ctx.rotate(config.theta);
		//ctx.rotate(0);
		
		
		var curAngle = 0;
		

		// fill interior of circle 

		for(var i = 0; i < config.slices.length; i++) {
			var rads = (config.slices[i].size * Math.PI * 2) / config.totalSize;
			ctx.beginPath();
			ctx.moveTo(config.insideRadius, 0);
			ctx.arc(0, 0,  config.insideRadius, curAngle, curAngle + rads, false);
			ctx.lineTo(Math.cos(curAngle + rads) * config.outsideRadius, Math.sin(curAngle + rads) * config.outsideRadius);
			ctx.arc(0, 0,  config.outsideRadius, curAngle + rads, curAngle, true);

		
			
			ctx.closePath();
			
			ctx.lineWidth = 3;
			
			ctx.fillStyle = config.colors[i % config.colors.length];
			ctx.fill();
			
			curAngle = 0
			ctx.rotate(rads);
			//break;
		} 

		ctx.save();
		// draw text
		for(var i = 0; i < config.slices.length; i++) {
			var rads = (config.slices[i].size * Math.PI * 2) / config.totalSize;
			ctx.rotate(rads / 2);
			
			ctx.font = '20px Roboto Slab';
			var metrics = ctx.measureText(config.slices[i].name);
			var textwidth = metrics.width;
			
			if(textwidth > config.outsideRadius - config.insideRadius - 24)
				ctx.font = '16px Roboto Slab';
			
			metrics = ctx.measureText(config.slices[i].name);
			textwidth = metrics.width;
			if(textwidth > config.outsideRadius - config.insideRadius - 24)
				ctx.font = '12px Roboto Slab';
			
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'black';
			var tx = config.insideRadius + 30;
			var ty = 10;
			ctx.strokeText('    ' + config.slices[i].name, tx, ty);
			ctx.fillText('    ' + config.slices[i].name, tx, ty);
			
			ctx.rotate(rads / 2);
		} 
		ctx.restore();
		

		// draw interior lines
		ctx.save();
		for(var i = 0; i < config.slices.length; i++) {
			var rads = (config.slices[i].size * Math.PI * 2) / config.totalSize;
			ctx.beginPath();
			ctx.moveTo(config.insideRadius, 0);
			ctx.lineTo(config.outsideRadius, 0);
			ctx.closePath();
			
			ctx.strokeStyle = 'black';
			ctx.stroke();
			
			ctx.rotate(rads);
		}
		ctx.restore();

		
		// draw circles
		
		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.arc(0, 0,  config.insideRadius, 0, Math.PI * 2, false);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = 20;
		ctx.arc(0, 0,  config.outsideRadius, 0, Math.PI * 2, false);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
	


		ctx.restore();
		
		// draw the arrow
		ctx.translate(10, 0);
		ctx.beginPath();
		
		var out = (config.outsideRadius * .05);
		var up = out * 2;
		ctx.moveTo(config.outsideRadius + out, -up);
		ctx.lineTo(config.outsideRadius + out, up);
		ctx.lineTo(config.outsideRadius - up - up, 0);
		ctx.lineTo(config.outsideRadius + out, -up);
			
		ctx.closePath();
		
		ctx.lineWidth = 5;
		
		ctx.fillStyle = "#a7a9ac";
		ctx.fill();	
		
		ctx.strokeStyle = '#bdbec0';
		ctx.stroke();
		
		
		ctx.restore();
	};
	
	
	frameMove = function(te) {
		
		if(config.spinning) {
			if(config.angularVelocity < .001) {
				config.angularVelocity = 0;
				config.drag = 0;
				//config.settle(); // can't decide if i want it to settle or not. 
			}			
			config.theta = cMod(config.theta + (config.angularVelocity * te));
			config.angularVelocity -= config.drag * te;
			config.angularVelocity = Math.max(0, config.angularVelocity);

		}
		
		if(config.settling) {
			var dt = config.theta - config.target_theta;
			config.theta -= dt * te * .6;
			if(Math.abs(config.target_theta - config.theta) < .001) {
				config.theta = config.target_theta;
				config.settling = false;
			}
			
		}

		
	};
	
	settle = function() {
		config.settling = true;
		config.spinning = false;
		config.final_theta = config.theta;
		
		// figure out which item it's in
		config.target_theta = 0;
		var qqq = 0;
		for(var i =  config.slices.length -1; i >= 0; i--) {
			var rads = (config.slices[i].size * Math.PI * 2) / config.totalSize;
			if(qqq < config.final_theta && (qqq + rads) > config.final_theta) {
				config.target_theta = qqq + (rads / 2);
				break;
			}
			qqq += rads;
		};
		
		config.angularVelocity = 0;
		config.drag = 0;
	}
	
	spin = function() {
		if(config.angularVelocity > 0.001) return;
		
		config.settling = false;
		config.spinning = true;
		
		config.drag = 1 +  Math.random() * .2;
		config.angularVelocity =  6 + Math.random() * 1;
	}
	
	init = function() {
		
		config.totalSize = config.slices.reduce(function(acc, q) { return acc + q.size; }, 0);
			
	}
	return {frameMove: frameMove, init: init, render: render, settle: settle, spin: spin};
};