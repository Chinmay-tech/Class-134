status='';
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    objectDetector=ml5.objectDetector('cococssd',modelLoaded);
}

function preload(){
    
}

function draw(){
    image(video,0,0,380,380);

    if (status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
     for (i=0; i < objects.length; i++)
     {
        document.getElementById("status").innerHTML ="Status : Object Detected";
        document.getElementById("no").innerHTML ="Number of detected objects ="+objects.length;

        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }
    }

}


function modelLoaded(){
    console.log('model is loaded');
    status=true;
    
}


function gotResult(error,results){
    if (error){
        console.error(error);
    }
    
    console.log(results);
    objects=results;
}