'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
const form = document.querySelector('form');
canvas.width = 480;
canvas.height = 360;

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
var socket = io();

form.addEventListener('submit', function(e){
    const canvas = window.canvas = document.querySelector('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    socket.emit('chat message', { msg : document.getElementById('m').value, snapshot: canvas.toDataURL()});
    document.getElementById('m').value = '';
    e.preventDefault();
    return false;
})

socket.on('chat message', function(obj){
  var el =  document.createElement("li");
  el.innerHTML = '<img style="width:100px;height:75px" src="'+obj.snapshot+'"> ' + obj.msg;
  document.getElementById('messages').appendChild(el)
  window.scrollTo(0, document.body.scrollHeight);
});
