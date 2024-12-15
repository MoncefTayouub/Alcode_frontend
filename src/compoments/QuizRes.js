import React, { useEffect, useState , useRef } from 'react'
import question_image from '../files/question_image.webp'
import play_white from '../files/play_white.svg'
import audioPlayer from '../files/audioPlayer.svg'
import volume_off from "../files/volume_off.svg"
import soundOne from "../files/soundOne.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AudioExp from '../Items/AudioExp'
import pauseWhite from '../files/pauseWhite.svg'
import AutoPlayAudio from '../Items/AutoPlayAudio'

export default function QuizRes({logged,backend_url,selectedSerie,setselectedSerie,testResults,settestResults}) {
    const navigate = useNavigate();
    const [moDAnswer ,  setmoDAnswer ] = useState(0)
    const [ data , setData ] = useState(null)
    const [nbQ , setNbQ]= useState(0)
    const [userAnswers , setuserAnswers] = useState([])

    

   

    const [selectedAnswers , setselectedAnswers] = useState([])

    const hadnleRes = (qi,anss)=> {
        if (userAnswers) {
            return userAnswers.filter((e,i)=>{
                if (e['QI']==qi && e['answer'].indexOf(anss) > -1 ) return e
            }).length > 0 
            
        }
        return 0 
    }




    useEffect(()=> {
        window.scrollTo(0, 0);
        if (testResults) {
            setselectedAnswers(testResults.selectedAnswers)
            setuserAnswers(testResults.userAnswers)
            setData(testResults.data)
            
            setNbQ(testResults.data.length - 1)
        }
        if (logged != 1&&logged!=-5) navigate('/login')
        },[testResults])


    const [startTest , setStartTest] = useState(true)






const [isPlaying, setIsPlaying] = useState(false);
const [timeLeft, setTimeLeft] = useState(6); 


const [totalcounter , settotalcounter] = useState(0)



















  
     
 

 
    
   
    
      const handleBoxStyle = (QI, AI) => {
        // Check if there is a matching answer
        var cla = ' answer center '
        const isSelected = selectedAnswers.some((ob) => ob.QI === QI && ob.answer.includes(AI));
        if (isSelected)  cla+=' answerSelection ' 
        if ( hadnleRes(QI,AI)) cla+=' correctAnswer '
        // Return the appropriate className
        return cla
      };

      
      

      
       



      
    const [ACurl , setACurl ]= useState('')  
    const [AXurl , setAXurl ]= useState('')  
   

    const audiDesc = useRef(null);   
    const audioExplainationRef = useRef(null);
    const togglePlayPause = () => {
        // console.log('-----' , isPlaying , AXurl ,audioExplainationRef.current )
        if (audioExplainationRef.current){
        if (isPlaying ) {
            audioExplainationRef.current.pause();
        } else {
            audioExplainationRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }else console.log('not set yet')
    }

    
    const [totalTiming, setTotalTiming] = useState(0);

    console.log(selectedAnswers,userAnswers)

    

    useEffect(()=> {
        if (nbQ < 0) {
            // seeResaults()
        }else {
           
            if (data) {
                setACurl(backend_url+data[nbQ]['audio_content'])  
                setAXurl(backend_url+data[nbQ]['auidio_explaination'])   
                let  audioRef =    new Audio(backend_url+data[nbQ]['auidio_explaination']);
                let  audioD  =    new Audio(backend_url+data[nbQ]['audio_content']);
                 audioExplainationRef.current = audioRef
                 audiDesc.current = audioD
                 audioRef.addEventListener('loadedmetadata', () => {
                    setTotalTiming(parseInt(audioRef.duration))
                  }); 

                  
                }
        }
      },[nbQ])

      const [muteAudio , setmuteAudio  ] = useState(false ) 

      const handleMute = ()=> {
        if (audiDesc.current) {
            audioExplainationRef.current.muted = !muteAudio
            setmuteAudio(!muteAudio) 
        }  
      }

      const decreasenbQ = ()=> {
        if (nbQ <= 0) 
            return 0 
        setNbQ((prev)=>prev - 1 )
        return 1 
      }

      const handleResumConter = ()=> {
        var va = decreasenbQ()
        setTimeLeft(6)
        settotalcounter((prev)=>prev+1)
      }

      const handleSeeNbQ = (dir)=> {

        // eslint-disable-next-line default-case
        switch(dir) {
            case 0 : 
            if (data && data.length > nbQ + 1 ) setNbQ((prevNbQ) => prevNbQ + 1);
            break ;
            case 1 : 
            if (nbQ>0) setNbQ((prevNbQ) => prevNbQ - 1);
            break ;
        }
        // if (dir) if (data && data.length > nbQ + 1 ) setNbQ((prevNbQ) => prevNbQ + 1); 
        // else if (nbQ>0) setNbQ((prevNbQ) => prevNbQ - 1);
    }
      return (
    <div className='Quiz center'> 
        {startTest ? 
        
        <>
        <div className='img_container'>
            <img  alt='' src={data != null && nbQ >= 0 ? backend_url+data[nbQ]['picture']:''} />
        </div>
        {
            nbQ <= 0 ?  <div className='bar center '>
            <button className='instantBtn' onClick={()=>navigate('/')}>3awda</button>
        </div> : 'dd'
        }    
        </>
            : ''}
        <div className={startTest ? 'TestContainer positionRelative' : 'TestContainer positionRelative bigHei '}>
              
                {
                data != null && nbQ >= 0 ? data[nbQ]['content'].map((ob,i)=> 
                <div key={i}>
              
                        
                        <h5   >{ob['question']['content']}</h5>
                    <div   className='questions center'>
                    {ob['answers'].map((oc,j)=> 
                            <div key={j*454432200} className='answerContainer center'>
                                    <div className='QN center'>
                                        {j+1}
                                    </div>
                                    <div  className={handleBoxStyle(ob['question']['id'],oc['id'])}>
                                        <p>{oc['content']}</p>
                                    </div>
                            </div>
                    )}

                        </div>
                        </div> 
             
                ) :''
            } 

        </div>
        {
            startTest ? 
            <AudioExp nbQ={nbQ} len={data ? data.length : 0} handleSeeNbQ={handleSeeNbQ} seeRes={true} startTest={true} isPlaying={isPlaying} totalTiming={totalTiming} pauseWhite={pauseWhite} togglePlayPause={togglePlayPause} audioExplainationRef={audioExplainationRef } AXurl={AXurl} />
            : ''
        }
    </div>
  )
}
