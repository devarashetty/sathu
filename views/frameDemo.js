import React from 'react'
import $ from "jquery";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import moment from 'moment'

class AffectView extends React.Component {
  constructor(){
    super()
  }

  onClickEvent = ()=>{
    console.log("logs")
    if (this.detector && !this.detector.isRunning) {
      this.detector.start();
    }
    console.log('#logs', "Clicked the start button");
  }
  
  onStopEvent = ()=> {
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  }

  onResetEvent = () => {
    console.log('#logs', "Clicked the reset button");
    if (this.detector && this.detector.isRunning) {
      this.detector.reset();

    }
  }

  onPlayerReady = (event)=>{
    event.target.playVideo();
  }

  onPlayerStateChange = (event) => {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  componentDidMount(){
    if($){
      var divRoot = $("#affdex_elements")[0];
      var width = 640;
      var height = 480;
      var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
      var detector
      //Construct a CameraDetector and specify the image width / height and face detector mode.
      this.detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

      detector = this.detector

      //Enable detection of all Expressions, Emotions and Emojis classifiers.
      detector.detectAllEmotions();
      detector.detectAllExpressions();
      detector.detectAllEmojis();
      detector.detectAllAppearance();

      //Add a callback to notify when the detector is initialized and ready for runing.
      detector.addEventListener("onInitializeSuccess", function() {
        console.log('#logs', "The detector reports initialized");
        //Display canvas instead of video feed because we want to draw the feature points on it
        $("#face_video_canvas").css("display", "block");
        $("#face_video").css("display", "none");
      });

      function log(node_name, msg) {
        $(node_name).append("<span>" + msg + "</span><br />")
      }

      //function executes when Start button is pushed.
      function onStart() {
        if (detector && !detector.isRunning) {
          detector.start();
        }
        console.log('#logs', "Clicked the start button");
      }

      

      //Add a callback to notify when camera access is allowed
      detector.addEventListener("onWebcamConnectSuccess", function() {
        console.log('#logs', "Webcam access allowed");
      });

      //Add a callback to notify when camera access is denied
      detector.addEventListener("onWebcamConnectFailure", function() {
        console.log("Webcam access denied");
      });

      //Add a callback to notify when detector is stopped
      detector.addEventListener("onStopSuccess", function() {
      });

      //Add a callback to receive the results from processing an image.
      //The faces object contains the list of the faces detected in an image.
      //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
      detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
        $('#results').html("");
        log('#results', "Timestamp: " + timestamp.toFixed(2));
        log('#results', "Number of faces found: " + faces.length);
        if (faces.length > 0) {
          log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
          log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          }));
          log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          }));
          log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
          if($('#face_video_canvas')[0] != null)
            drawFeaturePoints(image, faces[0].featurePoints);
        }
      });

      //Draw the detected facial feature points on the image
      function drawFeaturePoints(img, featurePoints) {
        var contxt = $('#face_video_canvas')[0].getContext('2d');

        var hRatio = contxt.canvas.width / img.width;
        var vRatio = contxt.canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);

        contxt.strokeStyle = "#FFFFFF";
        for (var id in featurePoints) {
          contxt.beginPath();
          contxt.arc(featurePoints[id].x,
            featurePoints[id].y, 2, 0, 2 * Math.PI);
          contxt.stroke();

        }
      }
    }
  }

  _onPlay = ()=>{
    console.log('playing')
  }
    
  _onProgress = () => {
    console.log("progress ",moment().toDate())
  }

  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    
    return (
      <div class="container-fluid">
        <ReactPlayer 
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
          progressInterval = {5000}
          controls 
          onPlay= {this._onPlay}
          onProgress = {this._onProgress}
        />
      </div>
    )
  }
}

export default AffectView