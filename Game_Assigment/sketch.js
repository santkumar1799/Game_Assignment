let ball_x,ball_y,ball_dx,ball_dy;
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx;
let life=3;
let grid=[];
let scores=0;

function setup() {
  createCanvas(400, 400);
  ball_x=width/2;
  ball_y=height/2;
  ball_dx=3;
  ball_dy=2;
  ball_d = 25;
  paddle_width = 80;
  paddle_height =25;
  paddle_x=width/2-paddle_width/2;
  paddle_y =height-20;
  paddle_dx=2;
  for(var i=0;i<4;i++){
    let row=[];
    for(var j=0;j<6;j++){
      let brick=[];
      brick['x']=i*85+35;
      brick['y']=j*25+25;
      brick['w']=70;
      brick['h']=20;
      brick['v']=true;
      row.push(brick);
    }
    grid.push(row);    
  }
}

function draw() {
  
  textSize(15);
  
  background("lightblue");
  ball_x+=ball_dx;
  ball_y+=ball_dy;
  fill("gold");
  circle(ball_x,ball_y,ball_d);
  rect(paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx);
  for(var i=0;i<4;i++){
    for(var j=0;j<6;j++){
      fill("darkred");
      rect(grid[i][j].x,grid[i][j].y,grid[i][j].w,grid[i][j].h);
      if(ball_x-(ball_d/2)<grid[i][j].x+grid[i][j].w && 
         ball_y>grid[i][j].y && ball_y <grid[i][j].y                  +grid[i][j].h &&  ball_x +(ball_d/2)>grid[i][j].x){
        grid[i][j].h=0;
        grid[i][j].w=0;
        ball_dx=-ball_dx;
        scores++;
          
      }
      if(ball_y-(ball_d/2)<grid[i][j].y+grid[i][j].h && 
        ball_x >grid[i][j].x && ball_x <grid[i][j].x +grid[i][j].w &&           ball_y +(ball_d/2)>grid[i][j].y){
        ball_dy=-ball_dy;
        scores++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
    }
    
  }
  if(keyIsDown(RIGHT_ARROW) && paddle_x+paddle_width<width){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW) && paddle_x>0){
    paddle_x-=paddle_dx;
  }
  if(ball_x+(ball_d/2)>width || ball_x-(ball_d/2)<0){
    ball_dx=-(ball_dx);
  }
  if(ball_y-(ball_d/2)<0){
    ball_dy=-(ball_dy);
  }
  if(ball_y+(ball_d/2)>=height-20){
    if(ball_x+(ball_d/2)>=paddle_x && ball_x-(ball_d/2)<=paddle_x+paddle_width){
      ball_dy=-(ball_dy);
    }
    if(ball_y+(ball_d/2)>height){
      ball_dx=0;
      ball_dy=0;
      
      if(life>1){
        life--;
        setup();
      }
      else{
        text("Game Over",180,200);
      text("Your Score: "+ scores,180,250);
      }
    }
  } 
  text("Life "+ life, width-380,20);
  text("Score : "+ scores , width-80,20);
}