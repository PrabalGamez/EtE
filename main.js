Pred_1 = "";
Pred_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90
});

Webcam.attach("#webcam");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img src=" + data_uri + " id='captured_img'>"
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4VJ10qxzV/model.json", model_loaded);

function model_loaded() {
    console.log("model is loaded :)");
}

function speak() {
    synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + Pred_1;
    speak_data_2 = "and the second prediction is" + Pred_2;
    utter_dis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_dis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        Pred_1 = result[0].label;
        Pred_2 = result[1].label;
        document.getElementById("object_1").innerHTML = Pred_1;
        document.getElementById("object_2").innerHTML = Pred_2;
        speak();
        if(Pred_1 == "Happy"){
            document.getElementById("emoji_1").innerHTML = "&#128522";
        }

        if(Pred_1 == "Sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }

        if(Pred_1 == "Angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;";
        }

        if(Pred_2 == "Happy"){
            document.getElementById("emoji_2").innerHTML = "&#128522";
        }

        if(Pred_2 == "Sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }

        if(Pred_2 == "Angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;";
        }
    }
}