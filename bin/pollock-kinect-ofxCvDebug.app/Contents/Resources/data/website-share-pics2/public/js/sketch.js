
var introSketch = function(sketch){
// function setup() {
//   createCanvas(windowWidth, windowHeight); // *CHANGE* from display to browser window size
//   colorMode(HSB, 360, 100, 100); // change color mode to use hue, saturation, brightness  
//   noStroke();
// }

// function draw() {
//   background(0, 0, 50);
// }
  var wordsArray = [];
  var i = 0;
  sketch.setup = function() {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight); // *CHANGE* from display to browser window size
    sketch.noStroke();
    sketch.frameRate(10);
  }

  sketch.setup2 = function(response){
    var keywordsObjAr = response.keywordsInDocuments;
    for(var i=0; i<keywordsObjAr.length; i++){
      wordsArray[i] = new sketch.Word(keywordsObjAr[i].text, keywordsObjAr[i].sentiment.type);
    }
    console.log(response);
    console.log(wordsArray);
  }

  sketch.draw = function() {
    

  }

  sketch.mouseDragged = function(){
      if(i > wordsArray.length){
        i = 0;
       }
       i++;
      wordsArray[i].draw(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
  
  }



  sketch.Word = function(text, _sentiment){
    var text = text;
    var sentiment = _sentiment;
    var angle;
    var color;
    var pos;
    pos = new p5.Vector(sketch.mouseX, sketch.mouseY);
   


    this.draw = function(x,y, px, py){
      angle = sketch.atan2(y - sketch.windowHeight/2, x - sketch.windowWidth/2);
      if(sentiment == "positive"){
        sketch.fill(238,56,113);
      }
      if(sentiment == "negative"){
        sketch.fill(43,137,137);
      }
      if(sentiment == "neutral"){
        sketch.fill(243,234,30);
      }
      sketch.textFont("OCRAStd");
      sketch.push();
      sketch.translate(x,y);
      sketch.rotate(angle);
      sketch.text(text,0, 0);
      sketch.pop();
    }

  }
} 

// function setup() {
//   createCanvas(windowWidth, windowHeight); // *CHANGE* from display to browser window size
//   colorMode(HSB, 360, 100, 100); // change color mode to use hue, saturation, brightness  
//   noStroke();
// }

// function draw() {
//   background(0, 0, 50);
// }


