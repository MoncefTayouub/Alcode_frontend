import React ,{useEffect , useState , useRef} from 'react'
import play_white from '../files/play_white.svg'
import audioPlayer from '../files/audioPlayer.svg'
import pauseWhite from '../files/pauseWhite.svg'
import leftWhite from '../files/leftBlue.svg'
import rightWhite from '../files/rightBlue.svg'
import HandleAudio from './HandleAudio'
import play_blue from '../files/play_blue.svg'
import Pause_blue from '../files/Pause_blue.svg'
import go_back from '../files/go_back.svg'
import blue_Up_volume from '../files/blue_Up_volume.svg'
import { useNavigate } from 'react-router-dom';

export default function AudioExp({AXurl,setIsPlaying,len,nbQ,isPlaying,audioExplainationRef,togglePlayPause,seeRes=false,handleSeeNbQ}) {
    const [totalTiming , settotalTiming] = useState(0)
    const [currentTime , setcurrentTime] = useState(0) 
    const navigate = useNavigate();

    // const [hourMode ]

    //  useEffect(()=> {
    //     if (totalTiming > 0 ) {
    //         setcurrentTime(totalTiming)
    //     }
    // },[totalTiming])

    // console.log(len,nbQ,seeRes)
    // const handleSeeNbQ = (dir)=> {
    //     console.log('handleSeeNbQ',dir)
    // }

    
    // useEffect(() => {

    //     if (currentTime < 0 || !isPlaying ) return ;
    //     // Update every second
    //     const smallSequence = setInterval(() => {
    //         setcurrentTime((prevTime) => prevTime - 1);
    //     }, 1000); // 1 second = 1000 milliseconds
    
        
    
    //     return () => {
    //         clearInterval(smallSequence);
    //     };
    // }, [isPlaying,currentTime]);

 
    // const [leftTime , setleftTime ] = useState('')
    // useEffect(()=> {
    //     let min =  parseInt(currentTime/60)
    //     let sec = currentTime % 60 
    //     min =  min > 9 ? min : "0"+ min
    //     sec = sec>9 ? sec : "0"+sec
    //     setleftTime( min + ':' +  sec  )
    // },[currentTime])

    let audio = null

    // useEffect(()=> {
    //     if (AXurl != '') {
    //        audio =  new Audio(AXurl);
    //     }
    // },[AXurl])


    const [audioDuration, setAudioDuration] = useState(0); // Total audio duration in seconds
    const [isAudioReady, setIsAudioReady] = useState(false); // Boolean to check if audio is ready
    // const audioUrl = 'https://www.example.com/path-to-audio.mp3'; // Replace with your audio URL

    
    // useEffect(() => {
    //     if (audio == null) return ;
    //   const onLoadedMetadata = () => {
    //     settotalTiming(audio.duration); // Set the total duration
    //     setIsAudioReady(true); // Mark audio as ready
    //   };
  
    //   const onError = () => {
    //     setIsAudioReady(false); // Mark audio as not ready
    //   };
  
    //   // Attach event listeners
    //   audio.addEventListener('loadedmetadata', onLoadedMetadata);
    //   audio.addEventListener('error', onError);
  
    //   return () => {
    //     // Clean up event listeners
    //     audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    //     audio.removeEventListener('error', onError);
    //   };
    // }, [audio]);
  
    // useEffect(() => {
    //     if (audio == null || !isAudioReady ) return ;
    //   if (isPlaying ) {
    //     audio.pause();
    //   } else {
    //     audio.play();
    //   }
    //   // Cleanup to prevent multiple instances
    //   return () => {
    //     audio.pause();
    //     audio.currentTime = 0;
    //   };
    // }, [isPlaying, isAudioReady, audio]);


     function formatSeconds(seconds) {
            if (isNaN(seconds) || seconds < 0) {
              return "00:00"; // Handle invalid input
            }
          
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60); // Use Math.floor for accurate seconds
          
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
          
            return `${formattedMinutes}:${formattedSeconds}`;
          }


          // console.log(seeRes,nbQ,len)
    
  return (
    <div className='audioExplaination  center'>
            <div className='seeRes'>
            
            <HandleAudio setCurrentTiming={setcurrentTime} setTotalDuration={settotalTiming} audioUrl={AXurl} isPlaying={isPlaying} setReady={setIsAudioReady} />

            </div>
            <div className='audioPlayer center width100 '>
                    <div className='audioLabel center'>
                        { seeRes  ? <img onClick={() => navigate('/result')} alt='' src={go_back} /> : ''}
                         {seeRes && nbQ > 0 ?    <img alt='' onClick={() => handleSeeNbQ(1)} src={leftWhite}  /> : <img alt='' style={{ opacity: 0 }}  src={leftWhite}  />} 
                        <img alt='' src={isPlaying ? Pause_blue  : play_blue } onClick={()=>setIsPlaying(!isPlaying)} />
                        <p>{ formatSeconds(currentTime) }</p>
                        <div className='slide_bar center'>
                            <div className='s_bar' style={{width :(currentTime/totalTiming*100)+"%" }} ></div>
                        </div>
                        {
                            // isAudioReady ? 
                            // : ''
                        }
                        {/* <img alt='' src={audioPlayer} /> */}
                      { seeRes && nbQ < len -1 ? <img onClick={() => handleSeeNbQ(0)} alt='' src={rightWhite} /> : ''}
                    </div>

            </div>
            {/* <p className='mativ'>استمع إلى الشرح الكامل والتعرف على كافة التفاصيل بسهولة</p> */}

        </div>
  )
}
