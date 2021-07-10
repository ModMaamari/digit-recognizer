var canvas = document.getElementById("paint");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var curX, curY, prevX, prevY;
var hold = false;
ctx.lineWidth = 20;
var fill_value = true;
var stroke_value = false;
var canvas_data = {"pencil": []}
           
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "white"

function reset(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas_data = { "pencil": []}
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
        
// pencil tool
function pencil(){
    
    canvas.onmousedown = function(e){
        var rect = canvas.getBoundingClientRect();
        curX = e.clientX - rect.left;
        curY = e.clientY - rect.top;
        hold = true;
            
        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };
        
    canvas.onmousemove = function(e){
        if(hold){
            var rect = canvas.getBoundingClientRect();
            curX = e.clientX - rect.left;
            curY = e.clientY - rect.top;
            draw();
            recognize()
        }

    };
        
    canvas.onmouseup = function(e){
        hold = false;
    };
        
    canvas.onmouseout = function(e){
        hold = false;
    };
        
    function draw(){
        ctx.lineTo(curX, curY);
        ctx.stroke();
        canvas_data.pencil.push({ "startx": prevX, "starty": prevY, "endx": curX,
                                  "endy": curY, "thick": ctx.lineWidth, "color": ctx.strokeStyle });
    }
}
        

function recognize()
{
    var canvasData = JSON.stringify(canvas_data);
    var image = canvas.toDataURL();
    
    $.ajax({
        type: "POST",
        url: '/',
        data: { save_cdata: canvasData, save_image: image },
        dataType: 'json',
        success: function(data){
             
            document.getElementById("p0").value = parseFloat(data.p0)
            document.getElementById("p1").value = parseFloat(data.p1)
            document.getElementById("p2").value = parseFloat(data.p2)
            document.getElementById("p3").value = parseFloat(data.p3)
            document.getElementById("p4").value = parseFloat(data.p4)
            document.getElementById("p5").value = parseFloat(data.p5)
            document.getElementById("p6").value = parseFloat(data.p6)
            document.getElementById("p7").value = parseFloat(data.p7)
            document.getElementById("p8").value = parseFloat(data.p8)
            document.getElementById("p9").value = parseFloat(data.p9)
        }
    });
    
} 
