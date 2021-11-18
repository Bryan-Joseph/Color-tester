Webcam.set({
    width: 350,
    height: 259,
    image_format:'png',
    png_quality: 90
});

Webcam.attach('#webcam');

function takeSnapshot(){
    Webcam.snap(image => {
        document.getElementById('result').innerHTML = "<img id='capturedImage' src='"+image+"'>";
    });
}

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/goOYUILvh/model.json",modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function verifySnapshot() {
    var img = document.getElementById("capturedImage");
    classifier.classify(img, afterClassification);
}

function afterClassification(error,result) {
    if (error) {
        console.error(error);
    }else{
        console.log(result);

        document.getElementById("object-color").innerHTML = result[0].label;
        document.getElementById("object-confidence").innerHTML = ((result[0].confidence).toFixed(3) * 100) + "%";
    }
}