

function object(e,x,y,w,h,c,t,tc) {

  this.context = function(canvas) {

    return document.getElementById(canvas).getContext('2d');
  
  }

  this.ctx = this.context(e);
  this.x = x;
  this.y = y;
  this.c = c;
  this.t = t;
  this.w = w;
  this.h = h;
  this.tc = tc;
  
  this.render = function () {

      this.ctx.fillStyle =  this.c;
      this.ctx.fillRect(this.x,this.y,this.w,this.h);
      this.ctx.fillStyle = this.tc;
      this.ctx.fillText(this.t,this.x+10,this.y+10);      

  }

  

}

var monsters = [];
var numMonsters = 5;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function main() {

  var background = new object('canvas',0,0,window.innerWidth,window.innerHeight,'black','Welcome to Aezaria.','yellow');
  var player = new object('canvas',250,250,64,64,'green','Player','yellow');

  for ( var m = 0; m < numMonsters; m++ )

    {


      var  x =  getRandomInt(window.innerWidth);
      var  y =  getRandomInt(window.innerHeight);

      var monster = new object('canvas',250,250,64,64,'green','Player','yellow');


    }

  background.render();
  player.render();

}

setInterval(main(), 100);