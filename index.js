

class object {
constructor(e,x,y,w,h,c,t,tc) {

this.context=function(canvas) {

return document.getElementById(canvas).getContext('2d');

};

this.ctx=this.context(e);
this.x=x;
this.y=y;
this.c=c;
this.t=t;
this.w=w;
this.h=h;
this.tc=tc;

this.render=function() {

this.ctx.fillStyle=this.c;
this.ctx.fillRect(this.x,this.y,this.w,this.h);
this.ctx.fillStyle=this.tc;
this.ctx.fillText(this.t,this.x+10,this.y+10);

};

this.move=function(x,y) {

this.x+=x;
this.y+=y;

};

this.click=function() {
};

this.keydown=function(e) {

if(e.keyCode==37) {

this.move(-64,0);

}
if(e.keyCode==39) {

this.move(64,0);


}
if(e.keyCode==38) {

this.move(0,-64);


}
if(e.keyCode==40) {

this.move(0,64);


}

};

this.addClickEvent=function() {

window.addEventListener("onclick",this.click);

};

this.addKeyEvent=function() {

window.addEventListener("onkeydown",this.keydown);

};

}
}

var monsters = [];
var numMonsters = 0;
var monsterChance = 5;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function create() {

  var background = new object('canvas',0,0,window.innerWidth,window.innerHeight,'black','Welcome to Aezaria.','yellow');
  var player = new object('canvas',256,256,64,64,'green','Player','yellow');

  background.render();
  player.render();



      for ( var x = 0; x < window.innerWidth; x += 64 ) {
        for ( var y = 0; y < window.innerHeight; y += 64 ) {

             var chance =  getRandomInt(1000);

              if ( chance < monsterChance )  {

      var monster = new object('canvas',x,y,64,64,'red','Monster','yellow');

                  monster.render();

      monsters.push(monster);

                numMonsters++;

              }

        }

      }




    player.addKeyEvent();

}

function update() {


  for ( var m = 0; m < numMonsters; m++ ) {

    var monster = monsters[m];


      console.log("monster");


    var chance =  getRandomInt(1000);

    if ( chance < 250 )

      monster.move(0,-64);

    if ( chance > 250 && chance < 500 )

        monster.move(0,64);


    if ( chance > 500 && chance < 750 )

        monster.move(64,0);


    if ( chance > 750 && chance < 1000 )

        monster.move(-64,0);

      monster.render();

}



}



setInterval(update(),100);

create();