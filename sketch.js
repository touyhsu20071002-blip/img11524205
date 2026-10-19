// Classifier Variable
let classifier;
// 模型路徑 (讀取同目錄下的 model.json)
let imageModelURL = './';

// Video
let video;
let label = "載入模型中...";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 420);

  // 針對 iPhone / iOS Safari 的相機設定
  var constraints = {
    audio: false,
    video: {
      facingMode: "environment" // 使用後鏡頭
    }
  };

  video = createCapture(constraints, function() {
    console.log('相機載入成功');
  });
  
  // 修正 iPhone Safari 必備設定：允許網頁內嵌入播放
  video.elt.setAttribute('playsinline', ''); 
  video.size(320, 320);
  video.hide();

  // 開始進行影像辨識
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
  text("11424135", 10, 38);

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

// 辨識視訊畫面
function classifyVideo() {
  if (video && classifier) {
    classifier.classify(video, gotResult);
  }
}

// 取得辨識結果
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
