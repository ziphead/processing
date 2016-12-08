class Body {
color  c;
float Xpos;
float Ypos;
float speed;
float angle ;
float ScaleF ;
float size ;
float transX;
float[] pos = new float[2];
float[] mouse = new float[2];
  Body(color  tempc, float tempspeed, float temangle, float tempscale, float Xtemp, float Ytemp, float tempSize, float tempTrans) {
    pos[0] = Xtemp;
    pos[1] = Ytemp;
    Xpos = Xtemp;
    Ypos = Ytemp;
    c = tempc;
    speed = tempspeed;
    size = tempSize;    
    angle = temangle;
    ScaleF = tempscale; 
    transX = tempTrans;
    mouse[0] = 0.0;
    mouse[1] = 0.0;
  }
  void display(){
    //
    stroke(0);
    fill(c);
    pushMatrix();
    
    
    translate(Xpos , Ypos );
        //translate(Xpos - shift[0], Ypos - shift[1]);
    scale(Scale*0.2);

    ellipse(0, 0,size ,size ); 
    
    text(Xpos,0, 10);
    text(angle,0, 20);
    popMatrix();
  }

  
  void move(){
    if(locked){
        if (mouseX-mouse[0] == mouseX) {
          mouse[0] = mouseX;
          mouse[1] = mouseY;
        } 
              //println("мышь x", mouseX, "- position x", mouse[0], pos[0] );
        pos[0] = (mouseX -(mouseX - pos[0]))-(mouse[0]-mouseX)   ;
        pos[1] =  (mouseY - (mouseY- pos[1])) -(mouse[1]-mouseY)  ;
        mouse[0] =  mouseX ;
        mouse[1] =  mouseY  ;
              //println("мышь x", mouseX,"+offset x", mouse[0], "position x = ", pos[0] );
  
    } else {
          mouse[0] = mouseX;
          mouse[1] = mouseY;
    }
    


    if( angle >0 && angle <  2* PI ){ 
        Xpos = pos[0] + (transX * cos (angle));
        
        Ypos = pos[1]  + ( transX * sin (angle));
        angle += speed;
    }
    else {
        if (stop){
          Xpos = pos[0] + transX;
          Ypos = pos[1] + transX;
          angle = 0;
        } else {
          angle = 0;
          angle += speed;
        }
    }
  }
}

class Baby extends Body{
  Body dad;
  Baby(color  tempc, float tempspeed, float temangle, float tempscale, float Xtemp, float Ytemp, float tempSize, float tempTrans, Body obj)
  {
    super(tempc, tempspeed, temangle, tempscale, Xtemp, Ytemp, tempSize, tempTrans);
    dad = obj;
  }
  void move(){
    float t_scale = Scale *0.4;
    
    if(  angle >0 && angle <  2* PI ){
        
        Xpos = dad.Xpos + ((transX*t_scale) * cos (angle));
        Ypos = dad.Ypos +((transX*t_scale) * sin (angle));
        if (stop) {angle += speed *18;}
        angle += speed;
    }
    else {
          if (stop){
        Xpos = dad.Xpos + ((transX*t_scale) * cos (angle));
        Ypos = dad.Ypos +((transX*t_scale) * sin (angle));
          angle = 0;
        } else {
          angle = 0;
          angle += speed;
        }
    }
  }
}