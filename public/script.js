var username = prompt("Enter username:");

const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
  // port: "8000",
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", function (call) {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

// When receive someone else's stream, add that stream
const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  console.log("new user (userId = " + userId + ") joined the room!");
};

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

let text = $("input");

$("html").keydown((e) => {
  if (e.which == 13 && text.val().length !== 0) {
    socket.emit("message", text.val());
    text.val("");
  }
});

socket.on("createMessage", message => {
    // $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`)
    $("ul").append(`<li class="message"><b>${username}</b><br/>${message}</li>`);
    scrollToBottom();
})

const scrollToBottom = () => {
    let d = $(".main__chat_window")
    d.scrollTop(d.prop("scrollHeight"));
}

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

const playStop = () => {
  console.log("object");
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `;
  document.querySelector(".main__mute_button").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `;
  document.querySelector(".main__mute_button").innerHTML = html;
};

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};

const rollD4 = () => {
  var d = "jogou d4: ";
  let roll = Math.floor(Math.random() * 4) + 1;
  socket.emit("message", d.concat(roll));
}

const rollD6 = () => {
  var d = "jogou d6: ";
  let roll = Math.floor(Math.random() * 6) + 1;
  socket.emit("message", d.concat(roll));
}

const rollD8 = () => {
  var d = "jogou d8: ";
  let roll = Math.floor(Math.random() * 8) + 1;
  socket.emit("message", d.concat(roll));
}

const rollD10 = () => {
  var d = "jogou d10: ";
  let roll = Math.floor(Math.random() * 10) + 1;
  socket.emit("message", d.concat(roll));
}

const rollD12 = () => {
  var d = "jogou d12: ";
  let roll = Math.floor(Math.random() * 12) + 1;
  socket.emit("message", d.concat(roll));
}

const rollD20 = () => {
  var d = "jogou d20: ";
  let roll = Math.floor(Math.random() * 20) + 1;
  socket.emit("message", d.concat(roll));
}