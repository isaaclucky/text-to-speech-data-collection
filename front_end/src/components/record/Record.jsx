import React, {useEffect, useState} from 'react'
import './Record.css'

export default function Record() {

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

  return (
    <div>Record</div>
  )
}
