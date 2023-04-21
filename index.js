var monsters = [];
var npcs = [];
var unitChance = 5;
var monsterIndex = 0;
var index = 0;
var player;
var bgcolor = "black";


class object {
constructor(e,x,y,w,h,c,t,tc,type,img) {

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
this.bgcolor = "";
this.background = "";
this.targetEntity = null;
this.health = 1000;
this.energy = 1000;

this.img_obj = {
  'source': null,
  'current': 0,
  'total_frames': 16,
  'width': 16,
  'height': 16
};


this.animate = function () { // context is the canvas 2d context.

  var iobj = this.img_obj;
  
      if (iobj.source != null)
          this.ctx.drawImage(iobj.source, iobj.current * iobj.width, 0,
                            iobj.width, iobj.height,
                            this.x, this.y, this.w, this.h);
      iobj.current = (iobj.current + 1) % iobj.total_frames;
                     // incrementing the current frame and assuring animation loop
 

}

this.loadResource = function () {

  var img = new Image();
  img.onload = function () { // Triggered when image has finished loading.
      this.img_obj.source = img;  // we set the image source for our object.
  }
  img.src = this.img;
  this.img_obj.width = img.width;
  this.img_obj.height = img.height;

  setInterval(this.animate,100);

}


this.clear =  function () {

  if ( this.img )   {

      loadResource();

  }

    else {




  this.ctx.fillStyle=bgcolor;
  this.ctx.fillRect(this.x,this.y,this.w,this.h);
  this.ctx.fillStyle=bgcolor;
this.ctx.fillText(this.t,this.x+10,this.y+10);
  this.ctx.fillStyle=bgcolor;
  this.ctx.fillText("Health: " + this.health,this.x,this.y+25);




    }

}

this.render=function() {

  if ( this.img )   {

    loadResource();


  }

    else {

  this.ctx.fillStyle=this.c;
this.ctx.fillRect(this.x,this.y,this.w,this.h);
this.ctx.fillStyle=this.tc;
this.ctx.fillText(this.t,this.x+10,this.y+10);





  




 if (this.type == "monster") {


  this.ctx.fillStyle=this.tc;
  this.ctx.fillText("Health: " + this.health,this.x,this.y+25);



}

else if (this.type == "npc") {


  this.ctx.fillStyle=this.tc;
  this.ctx.fillText("Health: " + this.health,this.x,this.y+25);



}
else if (this.type == "player") {


  this.ctx.fillStyle=this.tc;
  this.ctx.fillText("Health: " + this.health,this.x,this.y+25);



}

else {

  this.ctx.fillStyle=this.c;
  this.ctx.fillText("Health: " + this.health,this.x,this.y+25);



}


    }

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

this.target = function (o) {

    this.targetEntity = o;

}

this.follow = function () {

  if ( this.x < this.targetEntity.x && this.y < this.targetEntity.y ) {

    this.move(64,64);


}

if ( this.x > this.targetEntity.x && this.y > this.targetEntity.y ) {

  this.move(-64,-64);


}

}


}
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function create() {

  var background = new object('canvas',0,0,window.innerWidth,window.innerHeight,bgcolor,'Welcome to Aezaria.','yellow',"background");
  player = new object('canvas',256,256,64,64,'green','Player','yellow',"player");

  background.render();
  player.render();

    var  a = 0, b = 0;






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


      
      window.onkeydown =function(e) {
      
      if(e.keyCode==37) {
      
      player.move(-64,0);

      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(64,0);

            monsters[m].render();

      }



      for ( var m = 0 ; m < npcs.length; m++ )

      if (player.bounds(npcs[m]) )  {


        npcs[m] = new object('canvas',npcs[m].x,npcs[m].y,64,64,'yellow','Quest','black',"quest");


        player.move(64,0);


          npcs[m].render();




      }


      }
      if(e.keyCode==39) {
      
      player.move(64,0);

      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(-64,0);

          monsters[m].render();

      }



      for ( var m = 0 ; m < npcs.length; m++ )

      if (player.bounds(npcs[m]) )  {


        npcs[m] = new object('canvas',npcs[m].x,npcs[m].y,64,64,'yellow','Quest','black',"quest");


        player.move(-64,0);


          npcs[m].render();




      }


      
      }
      if(e.keyCode==38) {
      
      player.move(0,-64);
      
      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(0,64);

            
          monsters[m].render();

        }
  
  
        for ( var m = 0 ; m < npcs.length; m++ )

        if (player.bounds(npcs[m]) )  {
  

          
         npcs[m] = new object('canvas',npcs[m].x,npcs[m].y,64,64,'yellow','Quest','black',"quest");

         npcs[m].render();

  
          player.move(0,64);
  
  
 
  
  
        }
    

      }
      if(e.keyCode==40) {
      
      player.move(0,64);

      for ( var m = 0 ; m < monsters.length; m++ )

      if (player.bounds(monsters[m]) )  {

            player.move(0,-64);


            monsters[m].render();

 

      }


      for ( var m = 0 ; m < npcs.length; m++ )

      if (player.bounds(npcs[m]) )  {


        npcs[m] = new object('canvas',npcs[m].x,npcs[m].y,64,64,'yellow','Quest','black',"quest");


        player.move(0,-64);


          npcs[m].render();




      }

      
      }
      



      }


      setInterval(function () {




        check(npcs,monsters);
        check(monsters,npcs);
      
           
        
      
      },250);
      

}

function check2(index,array,x,y) {

  if ( !array[index] )

      return;

if (player.bounds(array[index]) )  {

    if ( array[index].type == "monster")

        player.health -= 25;


  array[index].move(x,y);


      player.render();

}

}

function check1(index,array1,array2,x,y,x2,y2) {

    if ( !array1[index] )

        return;

   array1[index].move(x,y);

  for ( var m = 0; m < array2.length ; m++ ) {

      if ( !array2[m] )

          continue;


  if (array1[index].bounds(array2[m]) )  {



    array1[index].move(x2,y2);

       array1[index].render();

}

  }


}

function check(array,array2) {


 index = getRandomInt(array.length);


  var chance =  getRandomInt(1000);


  if ( chance < 250 ) {




    check1(index, array,array2, 0, 64, 0, -64);

    check2(index,array,0,-64);


  }

  if ( chance > 250 && chance < 500 ) {

    check1(index, array, array2, 0, -64, 0, 64);

    check2(index,array,0,64);


  }

  if ( chance > 500 && chance < 750 ) {

    check1(index, array,array2, 64,0, -64,0);

    check2(index,array,-64,0);


  }
  if ( chance > 750 && chance < 1000 ) {

    check1(index, array,array2, -64,0, 64,0);

    check2(index,array,64,0);


  }


}

create();
