const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');


const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

const faceDetector = new window.FaceDetector();
console.log(video,canvas,faceCanvas,faceDetector);

//Function that will populate the users video
async function populateVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        width:1280,
        height:720
    });
    video.srcObject = stream;
    await video.play();
    //size the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

async function detect(){
    const faces = await faceDetector.detect(video);
    
    requestAnimationFrame(detect);
    faces.forEach(drawFace);
}

function drawFace(face){
    const {
        width,
        height,
        top,
        left
    } = face.boundingBox;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='#ffc600';
    ctx.lineWidth = 2;
    console.log({width,height, top, left});
    ctx.strokeRect(left,top,width,height);
}

populateVideo().then(detect);
