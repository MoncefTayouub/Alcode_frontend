import React, { useEffect, useRef, useState } from 'react';

const AutoPlayAudio = ({setmuteAudio,muteAudio,moDAnswer,setmoDAnswer, descAudioIsPlaying,audioUrl ,startTest,setStartTest }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (audioRef.current) {
      if (descAudioIsPlaying ) {
    
        audioRef.current
        .pause()
        setIsPlaying(false)
      
      } else 
      if (startTest)
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true); // Audio started playing successfully
        })
        .catch((error) => {
          console.error('Audio playback failed:', error);
          setIsPlaying(false); // Autoplay failed
        });
    }
  }, [audioUrl,descAudioIsPlaying]);

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
