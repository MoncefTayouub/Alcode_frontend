import React, { useState } from 'react'
import HandleAudio from './HandleAudio';
export default function TestAudio() {
    const [CurrentTiming,setCurrentTiming] = useState(0);
    const [TotalDuration,setTotalDuration] = useState(0);
    const [isAudioReady, setIsAudioReady] = useState(false);    
    const [ismute , setismute] = useState(false)
    const audioUr='http://127.0.0.1:8000//media/audios/Teddy_Swims_-_Lose_Control_Live_MacRoo9.mp3';
    const [isPlaying,setisPlaying] = useState(0);

  return (
     <div>
        <div>CurrentTiming: {CurrentTiming}</div>
        <div>TotalDuration: {TotalDuration}</div>
        <div>isAudioReady: {  isAudioReady ==null} ---- </div>      
        <div onClick={()=>setismute(!ismute)}>muty zmar</div>
        <div onClick={()=>setisPlaying(!isPlaying)}>{isPlaying ? "pause" : "play"}</div>
      <HandleAudio setReady={setIsAudioReady} ismute={ismute} audioUrl = {audioUr} isPlaying = {isPlaying} setTotalDuration = {setTotalDuration} setCurrentTiming = {setCurrentTiming} />
    </div>
  )
}
