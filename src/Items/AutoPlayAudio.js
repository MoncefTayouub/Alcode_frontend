import React, { useEffect, useRef, useState } from 'react';

const AutoPlayAudio = ({skipQuestion, pauseQuiz,setAudioFinsh,audioFinsh,timing,settimnig,setmuteAudio,muteAudio,moDAnswer,setmoDAnswer, descAudioIsPlaying,audioUrl ,startTest,setStartTest }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(null);
const [duration, setDuration] = useState(null);





// console.log(currentTime,'currentTime',duration,'duration',pauseQuiz,'pauseQuiz',skipQuestion,'skipQuestion'
//   // ,audioUrl,'audioUrl',muteAudio,'muteAudio',startTest,'startTest',audioFinsh,'audioFinsh',timing,'timing',descAudioIsPlaying,'descAudioIsPlaying',moDAnswer,'moDAnswer'
// )
useEffect(()=> {
  if (skipQuestion) {
    if (audioRef.current) {
    
        audioRef.current
        .pause()
        setIsPlaying(false)
        setCurrentTime(0)
        setDuration(0)
      
      }
    }
},[skipQuestion])

  useEffect(() => {
    if (audioRef.current) {
      if ( pauseQuiz) {
    
        audioRef.current
        .pause()
        setIsPlaying(false)
      
      } else 
      if (startTest && currentTime/duration != 1) 
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true); // Audio started playing successfully
        })
        .catch((error) => {
          // console.error('Audio playback failed:', error);
          setIsPlaying(false); // Autoplay failed
        });
    }
  //   if (!pauseQuiz){
  //   setCurrentTime(0)
  //   setDuration(0)
  // }
  }, [audioUrl,pauseQuiz]);

  useEffect(()=> {
    if (audioRef.current) {
        audioRef.current.muted = muteAudio
    } 
  },[muteAudio])
  const handleStartAudio = (mod)=> {
    setmoDAnswer(mod)
    setStartTest(true)
    audioRef.current && audioRef.current.play()

  }


  


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // console.log('currentTime',currentTime,'duration',duration)


  useEffect(()=> {
    if (currentTime == null ||  duration == null ) return ;
    let verce = currentTime/duration 
    settimnig(formatTime(duration - currentTime))
    if (verce == 1 ) setAudioFinsh(true) 
  },[currentTime,duration])

  useEffect(() => {
    if (audioRef.current == null) return ;
    const handleTimeUpdate = () => {
      if (audioRef.current )
      setCurrentTime(audioRef.current.currentTime);
    };
  
    const handleLoadedMetadata = () => {
      if (audioRef.current )
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      if (audioRef.current ){
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
    
    };
  }, []);

 
  

  return (
    <div className={startTest?'AutoPlayAudio':'AutoPlayAudio startTest center'}>
      <audio
        ref={audioRef}
        src={audioUrl}
        muted={muteAudio}
        style={{ width: 0, height: 0, opacity: 0 }}
      />
      {/* <p>{isPlaying ? 'speaking' : 'not speaking'}</p> */}
      {!startTest ? 
      <>
        
          <h3>اختر وضعك المفضل</h3>
          <p>نقدم لك خيارين لاستخدام منصتنا حسب احتياجاتك. يمكنك اختيار الوضع الأول لمعرفة الإجابة فورًا بعد كل خطوة، أو اختر الوضع الثاني لتحصل على جميع النتائج مجتمعة في النهاية
          </p>
            <div className='spacebetween'>
                <button className='butt01' onClick={() => handleStartAudio(1)}>
                اعرف الإجابة فورًا 
                </button>
                <button className='butt02' onClick={() => handleStartAudio(2)}>
                النتائج في النهاية        
                </button>
            </div>
      </>
      :''}
    </div>
  );
};

export default AutoPlayAudio;
