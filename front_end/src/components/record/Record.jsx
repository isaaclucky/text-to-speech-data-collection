import React, {useEffect, useState} from 'react'
import './Record.css'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

export default function Record() {

    const [audioUrl, setAudioUrl] = useState(null)
    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      })

    function handleAudioStop(data) {
        console.log(data);
        setAudioDetails(data)
        setAudioUrl(data.url)
    }

    function handleAudioUpload(file) {
        console.log(file);
    }

    function handleRest() {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        setAudioDetails(reset)
      }
    


    useEffect(()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices
              .getUserMedia(
                // constraints - only audio needed for this app
                {
                  audio: true,
                }
              )
              // Success callback
              .then((stream) => {})
              // Error callback
              .catch((err) => {
                alert(`The following getUserMedia error occurred: ${err}`);
              });
          } else {
            alert("getUserMedia not supported on your browser!");
          }
    },[])

    function handleOnChange(value, args){
        console.log(value)
        console.log(args)
    }

  return (
    <div>
        <Recorder
          record={true}

          title={"New recording"}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data) => handleAudioStop(data)}
          handleOnChange={(value) => handleOnChange(value, "firstname")}
          handleAudioUpload={(data) => handleAudioUpload(data)}
          handleReset={handleRest}
           mimeTypeToUseWhenRecording={`audio/webm`} 
        />
    </div>
  )
}
