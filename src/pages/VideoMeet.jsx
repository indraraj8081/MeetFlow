import React, {useRef, useState} from 'react';
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

let [askForUserName , setAskForUserName] = useState(ture);

let [ username , setUsername] = useState("");

const videoRef = useRef([]);

const [videos, setVideos]= useState([]);

//TODO
// if(isChrome() === false){

// }

  return (
    <div>
        {askForUserName === true ?
      
      <div>
        <h2>Enter into Lobby</h2>
        </div> : <></>
    }
     </div>
  )
}

