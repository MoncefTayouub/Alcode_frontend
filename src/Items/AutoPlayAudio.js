import React, { useEffect, useRef, useState } from 'react';

const AutoPlayAudio = ({moDAnswer,setmoDAnswer, descAudioIsPlaying,audioUrl ,startTest,setStartTest }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (audioRef.current) {
      console.log('audioRef.current',descAudioIsPlaying, audioRef.current.paused)
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
        style={{ width: 0, height: 0, opacity: 0 }}
      />
      {/* <p>{isPlaying ? 'speaking' : 'not speaking'}</p> */}
      {!startTest ? 
      <>
          {/* <button onClick={() => handleStartAudio()}>
            ابدأ الاختبار واثبت تميزك
          </button> */}
          <h3>اختر وضعك المفضل</h3>
          <p>نقدم لك خيارين لاستخدام منصتنا حسب احتياجاتك. يمكنك اختيار الوضع الأول لمعرفة الإجابة فورًا بعد كل خطوة، مما يساعدك على التعلم السريع والتفاعل الفوري. أو اختر الوضع الثاني لتحصل على جميع النتائج مجتمعة في النهاية، وهو مثالي لتحليل شامل وتجربة أكثر عمقًا</p>
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
