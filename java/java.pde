Body mybody1;
//Body mybody2;
//Body mybody3;
//Body mybody4;
ArrayList<Baby> babies;
float Scale;
boolean locked = false;
boolean stop = false;
void setup() {
  size(1200, 800);
  frameRate(30);
  babies = new ArrayList<Baby>();
  mybody1 = new Body(color(255, 222, 56), 0, 0.0, 1, width/2, height/2, 20, 0);
   babies.add(new Baby(color(155, 0, 56), 0.01, 0.0, 1, width/2, height/2, 10, 50, mybody1));
    babies.add(new Baby(color(155, 200, 0), 0.11, 0.0, 1, babies.get(0).Xpos, babies.get(0).Ypos, 5, 15, babies.get(0) ));
     babies.add(new Baby(color(155, 200, 0), 0.002, 0.0, 1, mybody1.Xpos, mybody1.Ypos, 5, 85, mybody1 ));
     babies.add(new Baby(color(15, 200, 10), 0.02, 0.0, 1, babies.get(2).Xpos, babies.get(2).Ypos, 5, 15, babies.get(2) ));
     Scale = 3.0;
}

 void mouse_move() {

   if (mousePressed == true){
       locked = true;
       stop = true;

    } else {
      locked = false;
      stop = false;
    }
 }    
  

void mouseWheel(MouseEvent event) {
    if (Scale > 0 && Scale < 50) {
      Scale = Scale + event.getCount()* 0.4;
    }
    else{ 
      if (Scale <0.0){
        Scale = 1.0;}
        if  (Scale > 50.0) {
          Scale = 49.0;
        }
        
    }
  println(Scale);

} 

void draw() {
  background(0,0,0,0);
  mybody1.move();
  mybody1.display();
  for (int i = babies.size()-1; i >= 0; i--) { 
    Baby baby = babies.get(i);
    if(!stop){
      

    }
        baby.move();
    baby.display();
  }
  
mouse_move();
}