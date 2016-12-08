// globals
var mybody1, babies
var Scale = 3.1;
var locked = false;
var stop = false;

// body class is the center of scene. Systems center of mass. 
function Body (tempc, tempspeed, temangle, tempscale, Xtemp, Ytemp,  tempSize,  tempTrans) {
    this.pos = new Array(2);
    this.mouse = new Array(2);
    this.pos[0] = Xtemp;
    this.pos[1] = Ytemp;
    this.Xpos = Xtemp;
    this.Ypos = Ytemp;
    this.c = tempc;
    this.speed = tempspeed;
    this.size = tempSize;    
    this.angle = temangle;
    this.t_scale = tempscale; 
    this.transX = tempTrans;
    this.mouse[0] = 0.0;
    this.mouse[1] = 0.0;
  }
  // display function is the same for all the bodies
Body.prototype.display =function(){
    //
    stroke(0);
    fill(this.c);
    push();
    
    
    translate(this.Xpos , this.Ypos );

    scale(Scale*0.4);

    ellipse(0, 0,this.size ,this.size ); 
    
    text(this.Xpos.toFixed(2),0, 10);
    text(this.angle.toFixed(2),0, 20);
    pop();
  };

  // Move function is unique . All the other bodies depend in Body(system) coordinates.
Body.prototype.move = function(){
    if(locked){
        if (mouseX-this.mouse[0] == mouseX) {
          this.mouse[0] = mouseX;
          this.mouse[1] = mouseY;
        } 

        this.pos[0] = (mouseX -(mouseX - this.pos[0]))-(this.mouse[0]-mouseX)   ;
        this.pos[1] =  (mouseY - (mouseY- this.pos[1])) -(this.mouse[1]-mouseY)  ;
        this.mouse[0] =  mouseX ;
        this.mouse[1] =  mouseY  ;

  
    } else {
          this.mouse[0] = mouseX;
          this.mouse[1] = mouseY;
    }
    


    if( this.angle >0 && this.angle <  2* PI ){ 
        this.Xpos = this.pos[0] + (this.transX * cos (this.angle));
        
        this.Ypos = this.pos[1]  + ( this.transX * sin (this.angle));
        this.angle += this.speed;
    }
    else {
        if (stop){
          this.Xpos = this.pos[0] + this.transX;
          this.Ypos = this.pos[1] + this.transX;
          this.angle = 0;
        } else {
          this.angle = 0;
          this.angle += this.speed;
        }
    }
  }

// Baby class proto class for all system bodies , inherits from Body and has a parent object
function Baby(tempc, tempspeed, temangle, tempscale, Xtemp, Ytemp,  tempSize,  tempTrans, dad) {
    Body.call(this, tempc, tempspeed, temangle, tempscale, Xtemp, Ytemp,  tempSize,  tempTrans);
    this.dad = dad;
}
Baby.prototype= Object.create(Body.prototype); 
Baby.prototype.constructor = Baby;
Baby.prototype.move = function(){ // Baby's own move function
    
    var t_scale = Scale *0.4;
    
    if(  this.angle >0 && this.angle <  2* PI ){
        
        this.Xpos = this.dad.Xpos + ((this.transX*t_scale) * cos (this.angle));
        //console.log(this.dad.Xpos + "+" + this.transX + "*" + t_scale + "*" + cos (this.angle));
        this.Ypos = this.dad.Ypos +((this.transX*t_scale) * sin (this.angle));
        if (!stop) {this.angle += this.speed;}
        
    }
        else {
          this.angle = 0;
          this.angle += this.speed;
        }
    }  
    
Baby.prototype.display = function(){
  Body.prototype.display.call(this);
}

// my dragging function
 function mouse_move() {

   if (mouseIsPressed == true){
       locked = true;
       stop = true;

    } else {
      locked = false;
      stop = false;
    }
 }  

function get_json() {
// future function
}

// preloads everything before setup()
function preload() {
  get_json()
  // load pictures
}


// zooming functionality (MouseEvent event) 
function mouseWheel() {
  
    if (Scale > 0 && Scale < 50) {
      Scale = Scale + event.delta/abs(event.delta) *0.4 ;
    }
    else { 
      if (Scale <0.0){
        Scale = 1.0;
      };
        if  (Scale > 50.0) {
          Scale = 49.0;
        };
        
    }
  console.log(Scale,event.delta, event );

} 
  
//Body (tempc, tempspeed, temangle, tempscale, Xtemp, Ytemp,  tempSize,  tempTrans) 
 // Процессинг готовит сцену
function setup() {
createCanvas(640, 360); 
mybody1 = new Body(color(255, 222, 56), 0, 0.0, 1, width/2, height/2, 20, 0);
babies = new Array();
babies.push(new Baby(color(155, 0, 56), 0.01, 0.0, 1, width/2, height/2, 10, 50, mybody1));
 babies.push(new Baby(color(155, 200, 0), 0.11, 0.0, 1, babies[0].Xpos, babies[0].Ypos, 5, 15, babies[0] ));
   babies.push(new Baby(color(155, 200, 0), 0.002, 0.0, 1, mybody1.Xpos, mybody1.Ypos, 5, 85, mybody1 ));
     babies.push(new Baby(color(15, 200, 10), 0.02, 0.0, 1, babies[2].Xpos, babies[2].Ypos, 5, 15, babies[2] ));
 for (var i = babies.length-1; i >= 0; i--) { 
    var baby = babies[i];     
     //console.log("pos",baby.pos , "angle", baby.angle, "X", baby.Xpos, baby.t_scale, i );
 }



}

// покадровая прорисока сцены
function draw() {
  background("black");
  mybody1.move();
  mybody1.display();
  for (var i = 0; i <= babies.length-1; i++) { 
    var baby = babies[i];
   // console.log(baby.Xpos)
    baby.move();
    baby.display();
  }
  mouse_move()
}
