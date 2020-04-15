import React from 'react'
import ReactDom from 'react-dom'
import idSDK from 'manubhai-faceapk-1';
// import idSDK from '../npmrepo/index';

console.log("idSDK",idSDK);
function myCallBackFunction(response) {
  if (response.success) {
      var type = response.data.type;
      switch (type) {
          case 'front':
              // Client to handle the response
              var table = document.getElementById('myTable');
              table.src = response.data.image;
              table.style.display = 'block';
              var frontImageArea = document.getElementById('frontDocResponse');
              frontImageArea.src = response.data.image;
              frontImageArea.style.display = 'block';
              break;
          case 'back':
          // Client to handle the response
          var table = document.getElementById('myTable');
              table.src = response.data.image;
              table.style.display = 'block';
              var backImageArea = document.getElementById('backDocResponse');
              backImageArea.src = response.data.image;
              backImageArea.style.display = 'block';
              break;
          case 'face':
          // Client to handle the response
          var table = document.getElementById('myTable');
              table.src = response.data.image;
              table.style.display = 'block';
              var faceImageArea = document.getElementById('faceImageResponse');
              faceImageArea.src = response.data.image;
              faceImageArea.style.display = 'block';
              break;
      }
  } else {
      alert(response.message)
  }
}

class ManuComponent extends React.Component {
  constructor(){
    super();
    this.idSDK = idSDK;
    this.idSDK.default.init();    
  }

  captureFront = () => {
    console.log("captureFront");
    this.idSDK.default.captureDocumentFront(false, myCallBackFunction);
  }

  captureBack = () => {
    this.idSDK.default.captureDocumentBack(false, myCallBackFunction);
  }

  captureFace = () => {
    this.idSDK.default.captureFace(false, myCallBackFunction);
  }

  render() {
    return (
        <table id="myTable">
          <tr>
              <th>Document Front</th>
              <th>Document Back</th>
              <th>Face Image</th>
          </tr>
          <tr>
              <td>
                  <img id="frontDocResponse" style={{display: "none"}}/>
              </td>
              <td>
                  <img id="backDocResponse" style={{display: "none"}}/>
              </td>
              <td>
                  <img id="faceImageResponse" style={{display: "none"}}/>
              </td>
          </tr>
          <button onClick={this.captureFront}>Capture Front</button>
          <button onClick={this.captureBack}>CaptureBack</button>
          <button onClick={this.captureFace}>Capture Face</button>
      </table>
    )
  }
}
class App extends React.Component {
  render () {
    return (
      <div>
        <ManuComponent/>
      </div>
    )
  }
}

ReactDom.render(<App/>,document.getElementById('app'))