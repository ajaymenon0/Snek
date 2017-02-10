$(function(){
  var xlen = $('#game').width()/10,
      ylen = $('#game').height()/10,
      length = 5,
      score=0,
      gamespeed = 50, //ms
      snekArr =[],
      egg,
      bgcolor="#ddd",
      direction="right";
  
  // Grid Creation
  for(var i=1;i<=ylen;i++){
    for(var j=1;j<=xlen;j++){
     $('#game').append('<div class="grid" id="'+j+'-'+i+'"></div>'); 
    }
  }
  
  function meksnek(){
    for(var i=length;i>0;i--){
      snekArr.push({x:i,y:Math.floor(ylen/2)});
    }
  }
  
  function mekegg(){
    egg = {
      x: Math.floor(Math.random() * xlen) + 1 ,
      y: Math.floor(Math.random() * ylen) + 1 
    }
  }
  
  function init(){
    //snek creation
    meksnek();
    mekegg();
  }
  
  
  function paintcell(cx,cy){
    $("#"+cx+"-"+cy).css("backgroundColor","black");
  }
  
  init();
  function paint(){
    $('.grid').css('backgroundColor',bgcolor); //wipe screen
    $('#score').text('SCORE: '+score);
    paintcell(egg.x,egg.y);
    
    var head = snekArr[0],
        nx = head.x,
        ny = head.y;
    
    if(direction==="right") nx>(xlen-1)?nx=1:nx++;
    if(direction==="left") nx<=1?nx=xlen:nx--;
    if(direction==="up") ny<=1?ny=ylen:ny--;
    if(direction==="down") ny>(ylen-1)?ny=1:ny++;
    
    if(nx == egg.x && ny == egg.y){
      var tail = {x:nx, y:ny};
      mekegg();
      clearInterval(gameloop);
      gamespeed = gamespeed-2;
      gameloop = setInterval(function(){paint()},gamespeed);
      score++;
    }else{
      var tail = snekArr.pop();
      tail.x = nx;
      tail.y = ny;
    }
    
    snekArr.unshift(tail);
    
    for(var i=1;i<(snekArr.length);i++){
      if(nx==snekArr[i].x && ny==snekArr[i].y)
        clearInterval(gameloop);
    }
    
    snekArr.forEach(function(snek_coords){
      paintcell(snek_coords.x,snek_coords.y);
    })
    
  }
  
  $('body').keydown(function(e){
    if(e.key==='w' && direction!="down") direction = "up";
    if(e.key==='a' && direction!="right") direction = "left";
    if(e.key==='s' && direction!="up") direction = "down";
    if(e.key==='d' && direction!="left") direction = "right";
  });
  
  var gameloop = setInterval(function(){paint()},gamespeed);
  
})