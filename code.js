objects = [];
status = "";
percent = "";

function setup()
{
    canvas = createCanvas(400, 300);
    canvas.position(580, 150);
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 400, 300);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            percent = floor(objects[i].confidence * 100);
            fill("#EE82EE");
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#EE82EE");
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectFinder").innerHTML = object_name + " found";
                synth = window.speechSynthesis;
                speak_data = object_name + 'object detected';
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }else
            {
                document.getElementById("status").innerHTML = object_name + "not found";
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    object_name = document.getElementById("object_input").value;
    document.getElementById("status").innerHTML = "Status = Detecting Object";
}

function modelLoaded()
{
    console.log("Model loaded");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}