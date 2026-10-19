// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

// 1. 修改 model 的位置 (讀取與 sketch.js 同目錄下的 model.json)
let imageModelURL = './';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 420);

  // 2. 手機前鏡頭改為後鏡頭
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment" // 使用手機後鏡頭
      }
    }
    // video: {
    //   facingMode: "user"
    // }
  };

  video = createCapture(constraints);
  video.size(320, 320);
  video.hide();

  flippedVideo = ml5.flipImage(video);

  // Start classifying
  classifyVideo();
}

function draw() {
  background(255);

  // 繪製標題與學號
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text("AI辨識", 10, 10);

  textSize(18);
  text("11424135", 10, 38); // 填入你的學號

  // 繪製鏡頭畫面
  image(flippedVideo, 0, 65, 320, 320);

  // 顯示辨識結果
  fill(50);
  textSize(20);
  textAlign(CENTER);
  text(label, width / 2, 398);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
