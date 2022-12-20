// import React, { useState } from 'react';
import './App.css';

function App() {

  var cameraStream: any = null;


  function startStreaming() {
    var stream: any = document.querySelector("#stream");

    var mediaSupport: any = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function (mediaStream: any) {
          cameraStream = mediaStream;
          stream.srcObject = mediaStream;
          stream.play();
          console.log("camerStream2", cameraStream)
        })
        .catch(function (err) {
          console.log("Unable to access camera: " + err);
        });
    }
    else {
      console.log("its on")
      alert('Your browser does not support media devices.');

      return;
    }
  }

  // Stop Streaming
  function stopStreaming() {
    var stream: any = document.querySelector("#stream");

    if (null != cameraStream) {
      console.log("stoped")
      var track: any = cameraStream.getTracks()[0];
      track.stop();
      stream.load();

      cameraStream = null;
    }
  }

  function captureSnapshot() {
    var stream: any = document.querySelector("#stream");
    var capture: any = document.querySelector("#capture");
    var snapshot: any = document.querySelector("#snapshot");


    if (null != cameraStream) {
      console.log("screen-shot");
      var ctx: any = capture.getContext('2d');
      var img: any = new Image();

      ctx.drawImage(stream, 0, 0, capture.width, capture.height);

      img.src = capture.toDataURL("image/png");
      img.width = 480;

      snapshot.innerHTML = '';
      snapshot.appendChild(img);
    }
  }

  return (
    <div>
      <div className="button-group">
        <button id='btn-start' onClick={startStreaming} type="button" className="button">Start Streaming</button>
        <button id='btn-stop' onClick={stopStreaming} type="button" className="button">Stop Streaming</button>
        <button id='btn-capture' onClick={captureSnapshot} type="button" className="button">Capture Image</button>
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
