import React, {useEffect, useRef, useState} from 'react';
import {
  TextField,
  Button,
} from '@mui/material';

import "../styles/videoComponenet.css";

const server_url = "http://localhost:8000"

var connections = {};


const peerConfigConnection = {
    "iceServers" : [ 
        {"urls": "stun : stun.l.google.com:19302"}
    ]

}

export default function VideoMeetComponent() {

var socketRef = useRef();
let socketIdRef = useRef();

let localVideoRef = useRef();

let [videoAvailable, setVideoAvailable] = useState(true);

let [ audioAvailable, setAudioAvailable] = useState(true);

let [video , setVideo] = useState();

let [audio, setAudio] = useState();

let [screen, setScreen] = useState();
let[showModel,setModel ] = useState();

let [screenAvailable ,setScreenAvailable]= useState();

let [messages , setMessages]= useState([]);

let [message, setMessage]= useState("");

let[newMessages, setNewMessages] = useState(0);

let [askForUserName , setAskForUserName] = useState(true);

let [ username , setUsername] = useState("");

const videoRef = useRef([]);

const [videos, setVideos]= useState([]);

//TODO
// if(isChrome() === false){

// }
const getPermissions = async () => {
  try{
     const videoPermissions = await navigator.mediaDevices.getUserMedia({video : true});

     if(videoPermissions) {
       setVideoAvailable(true);

     }else{
      setVideoAvailable(false);
     }

   const audioPermissions = await navigator.mediaDevices.getUserMedia({audio : true});

     if(audioPermissions) {
       setAudioAvailable(true);

     }else{
      setAudioAvailable(false);
     }
    
    // screen sharing available
    if(navigator.mediaDevices.getDisplayMedia) {
      setScreenAvailable(true)
    }else{
      setScreenAvailable(false);
    }

    if(videoAvailable || audioAvailable){
      const userMediaStream = await navigator.mediaDevices.getUserMedia({video : videoAvailable, audio : audioAvailable});
    
    
    
    if(userMediaStream) {
      Window.localStream = userMediaStream;
      if(localVideoRef.current) {
        localVideoRef.current.srcObject = userMediaStream;
      }
    }
    }


  }catch(err){
    console.log(err);
  }
}


useEffect(() =>{
  getPermissions();
}, [])

// ye function ye karega agr koi ak stream me audio, video and mute kiya hai to har jagha wahi bhejga any thing agr kuch band kar rhe hai to sare media me ye band kar do
let getUserMediaSuccess = (stream) => {

}

let getUserMedia = () =>{
  if((video && videoAvailable) || (audio && audioAvailable)) {
    navigator.mediaDevices.getUserMedia({ video : video , audio : audio})
    .then(()=>{getUserMediaSuccess}) //ToDo getuserMediaSuccess
    .then((stream)=>{})
    .catch((e) => console.log(e));
    
  }else{
    try{
         let tracks = localVideoRef.current.srcObject.getTracks();
         tracks.forEach(track => track.stop())
    }catch{

    }
  }
}

useEffect(()=> {
   if(video !== undefined && audio !== undefined){
    getUserMedia();
   }
}, [audio, video])


let getMedia = () =>{
  setVideo(videoAvailable);
  setAudio(audioAvailable);
  // connectToSocketServer();
}

let connect = () =>{
  setAskForUserName(false);
  getMedia();
}

  return (
    <div>
        {askForUserName === true ?
      
      <div>
        <h2>Enter into Lobby</h2>
        <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
        <Button variant="contained" onClick={connect}>Connect</Button>

        <div>
            <video ref={localVideoRef} autoPlay muted></video>

        </div>
        </div> : <></>
    }
     </div>
  )
}


// isme hum implenet karenga video shi se chal rha hai ya nhi aur bhi feature add karenga related to video , audio and mutes connectTo Socket or manything
