import React from 'react'
import $ from "jquery";
import ReactPlayer from 'react-player'
import moment from 'moment'
import {Doughnut} from 'react-chartjs-2'
import {
  colorEmojiMap
} from '../constants'

class AffectView extends React.Component {
  constructor(){
    super()
  }

  componentDidMount(){
    let self = this;
    if($){
      var divRoot = $("#webcamFaceDetector")[0];
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
        $("#face_video_canvas").css("display", "none");
        $("#face_video").css("display", "none");
      })

      //function executes when Start button is pushed.
      function onStart() {
        if (detector && !detector.isRunning) {
          $("#logs").html("");
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
        console.log(self.emotions)
      });

      //Add a callback to receive the results from processing an image.
      //The faces object contains the list of the faces detected in an image.
      //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
      detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
        
        if (faces.length > 0) {
          self.appearances = JSON.stringify(faces[0].appearance);
          
          // console.log('#results', "Appearance: " + self.appearances)

          self.emotions = JSON.stringify(faces[0].emotions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          })
          console.log('#results', "Emotions: " + self.emotions)

          self.expressions = JSON.stringify(faces[0].expressions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          })

          // console.log('#results', "Expressions: " + self.expressions)

          // console.log('#results', "Emoji: " + faces[0].emojis.dominantEmoji)

          if($('#face_video_canvas')[0] != null)
            drawFeaturePoints(image, faces[0].featurePoints);

          if(Number(timestamp.toFixed(2))%2){
            self.forceUpdate()
          }
        }
      })

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
    console.log('playing');
    this._onWebcamStart();
  }
    
  _onProgress = () => {
    console.log("progress ",moment().toDate())
  }

  _onPause = () => {
    console.log("OnPauser");
    this._onWebcamStop();
  }

  _onWebcamStart = ()=>{
    console.log("logs")
    if (this.detector && !this.detector.isRunning) {
      $("#logs").html("");
      this.detector.start();
    }
    console.log('#logs', "Clicked the start button");
  }
  
  _onWebcamStop = ()=> {
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  }

  _onWebcamReset = () => {
    console.log('#logs', "Clicked the reset button");
    if (this.detector && this.detector.isRunning) {
      this.detector.reset();

      $('#results').html("");
    }
  }

  render () {
    console.log('this.emotions',this.emotions, typeof(this.emotions))
    
    if(typeof(this.emotions) === 'string')
      this.emotions = JSON.parse(this.emotions)
    
    const emojiValues = Object.keys(colorEmojiMap).map((exp)=>{ 
                          console.log("Expressions",exp);
                          return this.emotions && this.emotions[exp] || null
                        })
    const data = {
      labels:Object.keys(colorEmojiMap),
      datasets: [{
        data: emojiValues,
        backgroundColor: Object.values(colorEmojiMap),
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    }
    return (
      <div className='page d-flex align-items-center flex-row'>
          <ReactPlayer 
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            progressInterval = {5000}
            controls 
            onPlay= {this._onPlay }
            onProgress = {this._onProgress}
            onPause = {this._onPause }
          />
          <div>
            <header className='text-center'> Emotion chart </header>
            <Doughnut
              data={data}
              height = {'250px'}
              width = {'500px'}
            />
          </div> 
      </div>
    )
  }
}

export default AffectView