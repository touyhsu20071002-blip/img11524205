let classifier;
let imageModelURL = './';

let video;
let label = "載入模型中...";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 420);

  // 3. 手機後鏡頭設定
  var constraints = {
    audio: false,
    video: {
      facingMode: "environment" // 使用後鏡頭
    }
  };

  video = createCapture(constraints);
  video.size(320, 320);
  video.hide();

  // 修正 iPhone 必須加上 playsinline 才能順利顯示影像
  if (video && video.elt) {
    video.elt.setAttribute('playsinline', '');
  }

  classifyVideo();
}

function draw() {
  background(255);

  // 印出標題與學號
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text("AI辨識", 10, 10);

  textSize(18);
  text("11524205", 10, 38);

  // 繪製鏡頭畫面
  if (video) {
    image(video, 0, 65, 320, 320);
  }

  // 顯示辨識結果
  fill(50);
  textSize(20);
  textAlign(CENTER);
  text(label, width / 2, 398);
}

function classifyVideo() {
  if (video && classifier) {
    classifier.classify(video, gotResult);
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  if (results && results[0]) {
    label = results[0].label;
  }
  classifyVideo();
}
