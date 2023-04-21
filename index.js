

class object {
constructor(e,x,y,w,h,c,t,tc,type) {

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
this.type = type;

this.clear =  function () {

  this.ctx.fillStyle="black";
  this.ctx.fillRect(this.x,this.y,this.w,this.h);
  this.ctx.fillStyle="black";
this.ctx.fillText(this.t,this.x+10,this.y+10);


}

this.render=function() {


  this.ctx.fillStyle=this.c;
this.ctx.fillRect(this.x,this.y,this.w,this.h);
this.ctx.fillStyle=this.tc;
this.ctx.fillText(this.t,this.x+10,this.y+10);

};

this.worldbounds = function () {

  if ( this.x < 64 ) {

      this.x = 64;

    return true;

  }

  if ( this.x > window.innerWidth - 768 ) {

      this.x  = window.innerWidth - 768;

    return true;

  }

 if ( this.y < 64 ) {


  this.y  = 64;

    return true;


 }

  if ( this.y > window.innerHeight - 320 ) {

    this.y = window.innerHeight - 320;

    return true;



  }

  return false;

}

this.bounds = function (o) {

  if ( this.x < o.x + o.w && this.x > o.x - o.w )
  if ( this.y < o.y + o.h && this.y > o.y - o.h )

      return true;

  return false;

}

this.move=function(x,y) {



  this.clear();



  

this.x+=x;
this.y+=y;

this.worldbounds();    


  this.render();

};


}
}

var monsters = [];
var npcs = [];
var unitChance = 5;
var monsterIndex = 0;
var player;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function create() {

  var background = new object('canvas',0,0,window.innerWidth,window.innerHeight,'black','Welcome to Aezaria.','yellow',"background");
  player = new object('canvas',256,256,64,64,'green','Player','yellow',"player");

  background.render();
  player.render();



  for ( var x = 0; x < window.innerWidth; x += 64 ) {
    for ( var y = 0; y < window.innerHeight; y += 64 ) {

         var chance =  getRandomInt(1000);

          if ( chance < unitChance )  {

  var monster = new object('canvas',x,y,64,64,'red','Monster','yellow',"monster");

              monster.render();

  monsters.push(monster);


          }

    }

  }


  for ( var x = 0; x < window.innerWidth; x += 64 ) {
    for ( var y = 0; y < window.innerHeight; y += 64 ) {

         var chance =  getRandomInt(1000);

          if ( chance < unitChance )  {

  var npc = new object('canvas',x,y,64,64,'white','Citizen','black',"npc");

              npc.render();

  npcs.push(npc);


          }

    }

  }


      window.onclick=function() {
      }
      
      window.onkeydown =function(e) {
      
      if(e.keyCode==37) {
      
      player.move(-64,0);

        for ( var m = 0 ; m < monsters.length; m++ )

          if (player.bounds(monsters[m]) )  {

                player.move(64,0);

                monsters[m].render();

          }

      }
      if(e.keyCode==39) {
      
      player.move(64,0);

      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(-64,0);

          monsters[m].render();

      }

      
      }
      if(e.keyCode==38) {
      
      player.move(0,-64);
      
      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(0,64);

            
          monsters[m].render();

        }
  

      }
      if(e.keyCode==40) {
      
      player.move(0,64);

      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(0,-64);


            monsters[m].render();

 

      }

      
      }
      
      }


}


create();
setInterval(function () {




  monsterIndex = getRandomInt(monsters.length);

  var chance =  getRandomInt(1000);


  if ( chance < 250 ) {

    monsters[monsterIndex].move(0,-64);


    for ( var m = 0; m < monsters.length ; m++ ) {

      if (monsterIndex == m )

      continue


      if (monsters[monsterIndex].bounds(monsters[m]) )  {



        monsters[monsterIndex].move(0,64);
  
            monsters[monsterIndex].render();
  
  }

      }

    if (player.bounds(monsters[monsterIndex]) )  {


      monsters[monsterIndex].move(0,64);

          player.render();

}



  }

  if ( chance > 250 && chance < 500 ) {

      monsters[monsterIndex].move(0,64);

      for ( var m = 0; m < monsters.length ; m++ ) {

          if (monsterIndex == m )

              continue

        if (monsters[monsterIndex].bounds(monsters[m]) )  {

  
          monsters[monsterIndex].move(0,-64);
    
             monsters[monsterIndex].render();
    
    }
  
        }
  

      if (player.bounds(monsters[monsterIndex]) )  {


        monsters[monsterIndex].move(0,-64);
  

            player.render();

  }
  

  }
  if ( chance > 500 && chance < 750 ) {

      monsters[monsterIndex].move(64,0);

      for ( var m = 0; m < monsters.length ; m++ ) {

        if (monsterIndex == m )

        continue


        if (monsters[monsterIndex].bounds(monsters[m]) )  {


  
          monsters[monsterIndex].move(-64,0);
    
              monsters[monsterIndex].render();
    
    }
  
        }
  

      if (player.bounds(monsters[monsterIndex]) )  {


        monsters[monsterIndex].move(-64,0);

            player.render();
  
  }
  

  }

  if ( chance > 750 && chance < 1000 ) {


    monsters[monsterIndex].move(-64,0);

    for ( var m = 0; m < monsters.length ; m++ ) {

      if (monsterIndex == m )

      continue

      if (monsters[monsterIndex].bounds(monsters[m]) )  {


        monsters[monsterIndex].move(64,0);
  
            monsters[monsterIndex].render();
  
  }

      }


    if (player.bounds(monsters[monsterIndex]) )  {


      monsters[monsterIndex].move(64,0);


        player.render();

}


  }

  

},100);
