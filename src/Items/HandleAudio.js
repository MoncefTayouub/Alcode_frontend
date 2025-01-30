import React, { useState, useEffect, useRef } from 'react';

const HandleAudio = ({ audioUrl, isPlaying ,setCurrentTiming,setTotalDuration,ismute}) => {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);


   

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    // Handle autoplay errors (e.g., browser restrictions)
                    console.error("Autoplay error:", error);
                });
            } else {
                audioRef.current.pause();
            }
            audioRef.current.muted = ismute;
        }
    }, [isPlaying, audioUrl]); // Important: Add audioUrl to the dependency array

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.addEventListener('loadedmetadata', () => {
            setTotalDuration(audioRef.current.duration);
          });
          audioRef.current.addEventListener('timeupdate', () => {
            setCurrentTiming(audioRef.current.currentTime);
          });
        }
    }, [audioUrl]);

    const handleTimeChange = (event) => {
      if (audioRef.current){
        audioRef.current.currentTime = event.target.value;
        setCurrentTiming(event.target.value)
      }
    }

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    

    return (
        <div>
          {
            audioUrl !== '' ? 
            <audio style={{width:0 , height:0 , opacity:0}} ref={audioRef} src={audioUrl} preload="metadata" muted={ismute} /> 
            : ''
          }
        </div>
    );
};

export default HandleAudio;