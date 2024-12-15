import React ,{useEffect , useState , useRef} from 'react'
import play_white from '../files/play_white.svg'
import audioPlayer from '../files/audioPlayer.svg'
import pauseWhite from '../files/pauseWhite.svg'
import leftWhite from '../files/leftWhite.svg'
import rightWhite from '../files/rightWhite.svg'

export default function AudioExp({len,nbQ,isPlaying,audioExplainationRef,togglePlayPause,totalTiming,seeRes=false,handleSeeNbQ}) {

    const [currentTime , setcurrentTime] = useState(0) 
    // const [hourMode ]

     useEffect(()=> {
        if (totalTiming > 0 ) {
            setcurrentTime(totalTiming)
        }
    },[totalTiming])

    console.log(len,nbQ,seeRes)
    // const handleSeeNbQ = (dir)=> {
    //     console.log('handleSeeNbQ',dir)
    // }

    useEffect(() => {

        if (currentTime < 0 || !isPlaying ) return ;
        // Update every second
        const smallSequence = setInterval(() => {
            setcurrentTime((prevTime) => prevTime - 1);
        }, 1000); // 1 second = 1000 milliseconds
    
        
    
        return () => {
            clearInterval(smallSequence);
        };
    }, [isPlaying,currentTime]);

 
    const [leftTime , setleftTime ] = useState('')
    useEffect(()=> {
        let min =  parseInt(currentTime/60)
        let sec = currentTime % 60 
        min =  min > 9 ? min : "0"+ min
        sec = sec>9 ? sec : "0"+sec
        setleftTime( min + ':' +  sec  )
    },[currentTime])
  return (
    <div className='audioExplaination padding center'>
            <div className='seeRes'>
            

            </div>
            <div className='audioPlayer center width100 '>
                 {seeRes && nbQ < len -1 ?    <img alt='' onClick={() => handleSeeNbQ(0)} src={leftWhite} /> : ''} 
                    <div className='audioLabel spacebetween'>
                        <p>{ leftTime }</p>
                        <div className='slide_bar center'>
                            <div className='s_bar' style={{width :(100-currentTime/totalTiming*100)+"%" }} ></div>
                        </div>
                        {
                            audioExplainationRef.current ? 
                            <img alt='' src={isPlaying ? pauseWhite  : play_white } onClick={()=>togglePlayPause()} />
                            : ''
                        }
                        <img alt='' src={audioPlayer} />
                    </div>
                    { seeRes && nbQ > 0 ? <img onClick={() => handleSeeNbQ(1)} alt='' src={rightWhite} /> : ''}

            </div>
            <p className='mativ'>استمع إلى الشرح الكامل والتعرف على كافة التفاصيل بسهولة</p>

        </div>
  )
}
