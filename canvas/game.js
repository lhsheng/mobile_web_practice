(function(){
var ctx=null;

window.requestAnimFrame=(function(){
	return window.requestAnimationFrame  ||
	window.wekitRequestAnimationFrame    ||
	window.mozRequestAnimationFrame      ||
	window.msRequestAnimationFrame       ||
	window.oRequestAnimationFrame        ||
	function(callback){
		window.setTimeout(callback,1000/60);
	};
})();



var game={
	canvas:document.getElementById("canvas"),
	setup:function(){
		if (this,canvas.getContext) {
			ctx=this.canvas.getContext("2d");
			this.width=this.canvas.width;
			this.height=this.canvas.height;
			screen.welcome();
			this.canvas.addEventListener("click",this.rungame,false);
			//this.init();
			Ctrl.init();
		}
	},
	animate:function(){
        game.play=requestAnimFrame(game.animate);
        game.draw();
	},
	rungame:function(){
		game.canvas.removeEventListener("click",game.rungame,false);
		game.init();
		game.animate();

	},
	init:function(){
		Background.init();
		hub.init();
		ball.init();
		paddle.init();
		Bricks.init();
		//this.animate();
		
		
	},
    draw:function(){
    	ctx.clearRect(0,0,this.width,this.height);
    	Background.draw();
    	Bricks.draw();
    	paddle.draw();
    	hub.draw();
    	ball.draw();
    	


    },
    restartgame:function(){
    	game.canvas.removeEventListener("click",game.restartgame,false);
    	game.init();
    }
};

var screen={
	welcome:function(){
		this.text="canvas game";
		this.textsub="click to start";
		this.textcolor="#333";
		this.creat();
	},
	creat:function(){
		ctx.fillStyle="#333";
		ctx.fillRect(0,0,game.width,game.height);
		ctx.fillStyle="#fff";
		ctx.textAlign="center";
		ctx.font="40px arial";
		ctx.fillText(this.text,game.width/2,game.height/2);
		ctx.font="20px arial";
		ctx.fillText(this.textsub,game.width/2,game.height/2+30);

	},
	gameover:function(){
		this.text="game over";
		this.textsub="click to restart";
		this.creat();
	}
}
var hub={
    init:function(){
		this.lv=1;
		this.score=0;
	},
	draw:function(){
		ctx.font='12px Arial';
		ctx.fillStyle='#000';
		//ctx.textAlign='left';
		ctx.fillText('score:'+ this.score,20,game.height-5);
        //ctx.textAlign='right';
       ctx.fillText('lv:'+this.lv,game.width-20,game.height-5);
	}
};
var Background={
	init:function(){
		this.ready=false;
		this.img=new Image();
		this.img.src='background.png';
		this.img.onload=function(){
			Background.ready=true;
		};
	},
	draw:function(){
		if (this.ready) {
			ctx.drawImage(this.img,0,0);
		}
	}
};
var Bricks={
	gap:2,
    col:5,
    w:80,
    h:15,
	init:function(){
          this.row=3;
          this.total=0;
          this.count=[this.row];
          for(var i=this.row;i--;){
          	this.count[i]=[this.col];
          }


	},
	draw:function(){
          var i,j;
          for(i=this.row;i--;){
          	for(j=this.col;j--;){
          		if(this.count[i][j]!==false){
          			if(ball.x>=this.x(j)&&
          				ball.x<=(this.x(j)+this.w)&&
          				ball.y>=this.y(i)&&
          				ball.y<=(this.y(i)+this.h)){
          				this.collide(i,j);
          			    continue;
          			}
          			ctx.fillStyle="#333";
          			ctx.fillRect(this.x(j),this.y(i),this.w,this.h);
          		}
          	}
          }
          if(this.total===(this.row*this.col)){
          	game.levelUp();
          }

	},
	collide:function(i,j){
		     hub.score+=1;
		     this.total+=1;
             this.count[i][j]=false;
             ball.sy=-ball.sy;
	},

	x:function(row){
       return (row*this.w)+(row*this.gap);
	},
	y:function(col){
       return (col*this.h)+(col*this.gap)
	}

};
var ball={
	r:10,
	init:function(){
		this.x=120;
		this.y=120;
		this.sx=2;
		this.sy=-2;
	},
	draw:function(){
		this.edges();
		this.collide();
		this.move();
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.closePath();
		ctx.fillStyle="#666";
		ctx.fill();

	},
	edges:function(){
		if(this.y<1){
			this.y=1;
			this.sy=-this.sy;

		}
		else if(this.y>game.height){
			this.sy=this.sx=0;
			this.x=this.y=1000;
			screen.gameover();
			canvas.addEventListener("click",game.restartgame,false);
			return;
		}
		if(this.x<1){
			this.x=1;
			this.sx=-this.sx;

		}else if(this.x>game.width){
            this.x=game.width-1;
            this.sx=-this.sx;
		}
	},
	collide:function(){
            if (this.x>=paddle.x&&
            	this.x<=(paddle.x+paddle.w)&&
            	this.y>=paddle.y&&
            	this.y<=(paddle.y+paddle.h)) {
            	this.sx=7*((this.x-(paddle.x+paddle.w/2))/paddle.w);
                this.sy=-this.sy;
            }
	},
	move:function(){
		this.x+=this.sx;
		this.y+=this.sy;
	}

};
var paddle={
	w:90,
	h:20,
	r:9,
	init:function(){
         this.x=100;
         this.y=210;
         this.speed=4;
	},
	draw:function(){
		this.move();
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.arcTo(this.x+this.w,this.y,this.x+this.w,this.y+this.r,this.r);
		ctx.lineTo(this.x+this.w,this.y+this.h-this.r);
		ctx.arcTo(this.x+this.w,this.y+this.h,this.x+this.w-this.r,this.y+this.h,this.r);
		ctx.lineTo(this.x+this.r,this.y+this.h);
		ctx.arcTo(this.x,this.y+this.h,this.x,this.y+this.h-this.r,this.r);
		ctx.lineTo(this.x,this.y+this.r);
		ctx.arcTo(this.x,this.y,this.x+this.r,this.y,this.r);
		ctx.closePath();
		ctx.fill();

	},
	move:function(){
		if (Ctrl.left && this.x<game.width-(this.w/2) ){
            this.x+=this.speed;
		}else if(Ctrl.right&&this.x>-this.w/2){
			this.x+=-this.speed;
		}
	}
};
var Ctrl={
	init:function(){
		window.addEventListener("keydown",this.keyDown,true);
		window.addEventListener("keyup",this.keyUp,true);
	},
	keyDown:function(event){
		switch(event.keyCode){
               case 39:
               Ctrl.left=true;
               break;
               case 37:
               Ctrl.right=true;
               break;
               default:
               break;
		}
	},
	keyUp:function(event){
         switch(event.keyCode){
               case 39:
               Ctrl.left=false;
               break;
               case 37:
               Ctrl.right=false;
               break;
               default:
               break;
	}
    }

};


window.onload=function(){
	game.setup();
};
})()