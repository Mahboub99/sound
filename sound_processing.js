var recorder, soundFile, mic, pause_flag, amplitute, one_pause;
var list_pause = new Array();

function setup() {
  // # Setting up the recording configurations
  recorder = new p5.SoundRecorder();
  soundFile = new p5.SoundFile();

  // create an audio in
  let cnv = createCanvas(50, 25);
  cnv.mousePressed(userStartAudio);
  cnv.style("background", "gray");
  cnv.style("text-align", "center");
  cnv.style("font-size", "24px");
  cnv.style("font-weight", 700);
  cnv.style("cursor", "pointer");
  //onmouseover(cnv.style("translate", "scale(1.2)"));
  text("Start", 10, 15);

  if (mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 25) {
    cnv.style(" transform", "scale(1.2)");
  }
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  //recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // recorder.stop();
  // soundFile.play();
  // saveSound(soundFile, 'mySound.wav');

  // shared variable for the thead
  pause_flag = 0;
  amplitute = 0;
  recorder.record(soundFile);
}

function foo() {
  //Threading

  console.log("\n\nfoo running in the thread\n");
  console.log("Flag = ", pause_flag);

  fill(255);
  text("tap to start");
  amplitute = mic.getLevel() ** 2 * 10000;
  console.log(amplitute);

  if (amplitute < 1) {
    //threshold value =  1
    pause_flag += 1;
    console.log("[Pause] amplitute < 0 ", amplitute);
  } else {
    pause_flag = 0;
    console.log("[Sound] ampliude > 0 ", amplitute);
  }

  if (pause_flag == 31) {
    // confirming a complete pause
    // *
    stopThread(foo);

    recorder.stop();
    console.log("stoping the recorder");
    one_pause = soundFile.getBlob();
    console.log(one_pause);

    // * appending list_pause
    list_pause.push(one_pause);
  }
}

function stopThread() {
  clearInterval(thread_interval);
  //TODO: start new setup
  setup();
  //TODO: call set interval
  thread_interval = setInterval(foo, 0.1 * 1000);
}
var thread_interval = setInterval(foo, 0.1 * 1000);
