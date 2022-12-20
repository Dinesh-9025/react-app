// import React, { useState } from 'react';
import './App.css';

function App() {

  // const autoPlay: boolean = true
  // async function StartStreaming() {
  //   var video: any = document.querySelector("#videoElement")
  //   var audio: any = document.querySelector("#videoElement")

  //   navigator.mediaDevices.enumerateDevices()

  //   if (navigator.mediaDevices.getUserMedia) {

  //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //       .then(function (stream) {
  //         console.log("stream", stream);
  //         sessionStorage.setItem("id", stream.id)
  //         video.srcObject = stream;
  //         audio.srcObject = stream;
  //         video.onloadedmetadata = () => {
  //           video.play();
  //         };
  //       })
  //       .catch(function (err0r) {
  //         console.log("Something went wrong!", err0r);
  //       });
  //   }
  // }

  // function stop(e: any) {
  //   console.log("e", e)

  // }



  var btnStart:any = document.getElementById("btn-start");
  var btnStop:any = document.getElementById("btn-stop");
  var btnCapture:any = document.getElementById("btn-capture");

  // The stream & capture
  var stream:any = document.getElementById("stream");
  var capture:any = document.getElementById("capture");
  var snapshot:any = document.getElementById("snapshot");

  // The video stream
  var cameraStream:any = null;

  // Attach listeners
  btnStart.addEventListener("click", startStreaming);
  btnStop.addEventListener("click", stopStreaming);
  btnCapture.addEventListener("click", captureSnapshot);

  // Start Streaming
  function startStreaming() {

    var mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {

      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (mediaStream) {

          cameraStream = mediaStream;

          stream.srcObject = mediaStream;

          stream.play();
        })
        .catch(function (err) {

          console.log("Unable to access camera: " + err);
        });
    }
    else {

      alert('Your browser does not support media devices.');

      return;
    }
  }

  // Stop Streaming
  function stopStreaming() {

    if (null != cameraStream) {

      var track = cameraStream.getTracks()[0];

      track.stop();
      stream.load();

      cameraStream = null;
    }
  }

  function captureSnapshot() {

    if (null != cameraStream) {

      var ctx = capture.getContext('2d');
      var img = new Image();

      ctx.drawImage(stream, 0, 0, capture.width, capture.height);

      img.src = capture.toDataURL("image/png");
      img.width = 240;

      snapshot.innerHTML = '';

      snapshot.appendChild(img);
    }
  }


  return (
    <div className="App">
      <div className="button-group">
        <button id="btn-start" type="button" className="button">Start Streaming</button>
        <button id="btn-stop" type="button" className="button">Stop Streaming</button>
        <button id="btn-capture" type="button" className="button">Capture Image</button>
      </div>

      {/* Video Element & Canvas  */}
      <div className="play-area">
        <div className="play-area-sub">
          <h3>The Stream</h3>
          <video id="stream" width="320" height="240"></video>
        </div>
        <div className="play-area-sub">
          <h3>The Capture</h3>
          <canvas id="capture" width="320" height="240"></canvas>
          <div id="snapshot"></div>
        </div>
      </div>
    </div >
  );
}

export default App;
