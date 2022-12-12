import React, { useState } from 'react';
import './App.css';

function App() {

  const [autoPlay, setAutoPlay] = useState<boolean>(true)


  async function StartStreaming() {
    var video: any = document.querySelector("#videoElement")
    var audio: any = document.querySelector("#videoElement")

    if (navigator.mediaDevices.getUserMedia ) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          console.log("stream", stream);
          sessionStorage.setItem("id", stream.id)
          video.srcObject = stream;
          audio.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }

  function stop(e: any) {
    console.log("e", e) 

  }

  return (
    <div className="App">

      <div className='body'>
        <video autoPlay={autoPlay} id="videoElement">
          <source src="x" type="video/x" />
          <source src="x" type="x" />
        </video>
      </div>
      <div>
        <button id="button" onClick={() => StartStreaming()}>Start Video</button>
      </div>

    </div>
  );
}

export default App;
