import e from 'cors';
import { connect } from 'mongoose';
import React ,{ref, useEffect} from 'react'
import { Await } from 'react-router-dom';

const serverUrl = "http://localhost:8000";

var connection = {};

const peerConnectionConfig = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
};



export default function VideoMeetComponent() {
  
  let socketId= useRef(null)
  let socketIdRef = useRef(null);

  // Reference to the local video element
  // humra video yeha pa dikhega aur dusrer ke liye ak array generate karenge jisme dusre ke video dikhega
  let localVideoRef = useRef(null);
  
  // Reference to the remote video elements
  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);
   
  let [video, setVideo] = useState();

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModel, setShowModel] = useState();

  let [screenAvailable, setScreenAvailable]= useState();

  let [messages, setMessages]= useState([]);

  let [message, setMessage]= useState("");
  
  let [newMessage, setNewMessage]= useState(0);

  let [askForUserName, setAskForUserName]= useState(true);

  let [userName, setUserName]= useState("");

  const videoRef = useRef(null);

  let [videos , setVideos]= useState([]);

  const getPermissions = async()=>{
    try{
        const videoPermission = await navigator.mediaDevices.getUserMedia({video:true})
        if(videoPermission){
            setVideoAvailable(true);
        }else{
            setVideoAvailable(false);
        }
        const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true})
        if(audioPermission){
            setAudioAvailable(true);
        }else{
            setAudioAvailable(false);
        }
        if(navigator.mediaDevices.getDisplayMedia){
            setScreenAvailable(true);
        }else{
            setScreenAvailable(false);
        }

        if(videoAvailable || audioAvailable){
           const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable , audio: audioAvailable});
           if(userMediaStream){
            window.localStream = userMediaStream;
            if(localVideoRef.current){
                localVideoRef.current.srcObject = userMediaStream;
            }
           }
        } 

    }catch (err){
      console.log(err);
    }
  }
  

  // TODO: Add the logic for handling video and audio streams, peer connections, and messaging here.
  useEffect(()=>{
    getPermissions();
  },[])

   let getUserMediaSucess =(stream) ={

   }




   let getUserMedia =()=>{
    if((video&& videoAvailable) || (audio && audioAvailable)){
         navigator.mediaDevices.getUserMedia({video: video , audio : audio})
         .then(getUserMediaSuccess) // tod0: getuserMediasucess
         .then((stream)=>{})
         .catch((err)=>
            console.log(error)
        )    
    }else{
            try{
              let tracks = localVideoRef.current.srcObject.getTracks();
              tracks.forEach(track => track.stop())
            }
            catch(e){

            }
        }
  }
  useEffect(()=>{
     if(video ===undefined && audio === undefined){
        getUserMedia();
     }
  },[])
    

  let getMedia =()=>{
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    // connectToSocketServer();
  }
  return (
    <div>

         {askForUserName ===true?
         <div>
            <h2>Enter the Lobby</h2>
            <TextField id="outlined-basic" label="Username" variant="outlined" value={userName} onChange={e => setUserName(e.target.value)}/>
            <Button variant="contained" onclick={connect}>Connect</Button>

        <div>
            <video ref={localVideoRef} autoPlay muted> </video>
        </div>

         </div> :<></>

        
        
        }

    </div>


  )
}
