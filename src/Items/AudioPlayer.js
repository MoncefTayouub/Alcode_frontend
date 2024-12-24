import React, { useState, useEffect, useRef } from "react";

const AudioPlayer = ({isPlaying, audioUrl, setTotalDuration, setCurrentTiming }) => {
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const startTimeRef = useRef(0);
  const elapsedTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Format time from seconds to "mm:ss"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Fetch and decode audio data
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const decodedBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedBuffer);
        setTotalDuration(formatTime(decodedBuffer.duration));
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    fetchAudio();
  }, [audioUrl, setTotalDuration]);

  // Play or pause the audio
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
    // setIsPlaying((prev) => !prev);
  };

  const playAudio = () => {
    if (audioBuffer && audioContextRef.current) {
      const currentTime = audioContextRef.current.currentTime;

      // Create a new buffer source and connect to the destination
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);

      // Start playback
      const offset = elapsedTimeRef.current;
      source.start(0, offset);
      startTimeRef.current = currentTime - offset;

      // Save the source for stopping later
      audioSourceRef.current = source;

      // Update current timing
      const updateCurrentTime = () => {
        const elapsed = currentTime - startTimeRef.current;
        setCurrentTiming(formatTime(elapsed));
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
      };
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      elapsedTimeRef.current += audioContextRef.current.currentTime - startTimeRef.current;
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;
