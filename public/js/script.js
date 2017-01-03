var eventStream = null;
var dataStore = [];
var msgCount = 0;

function closeStream() {
  if(eventStream) {
    eventStream.close();
    const postReq = new XMLHttpRequest();
    postReq.open('POST', '/saveData')
  }
}

function initialize() {
  const form = document.getElementById('sse_form');
  const disconnectBtn = document.getElementById('close_stream');
  
  form.onsubmit = formSubmit;
  disconnectBtn.onclick = closeStream;
  
  setMessageCount(false);
}

function formSubmit(e) {
  e.preventDefault();
  let sseUrl = e.target[0].value;
  eventStream = initStream(sseUrl);
  console.log('submitted');
}


function initStream(url) {
  const stream = new EventSource(url);
  
  stream.addEventListener('message', msg => {
    dataStore.push(msg.data);
    setMessageCount();
  });
  
  return stream;
}

function setMessageCount(increment = true) {
  const countDiv = document.getElementById('msg_count');
  
  if(increment) {
    msgCount++;
  }
  
  countDiv.innerText = msgCount;
}

document.addEventListener('DOMContentLoaded', initialize);
