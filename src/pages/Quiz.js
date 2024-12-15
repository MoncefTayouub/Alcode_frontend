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

export default function Quiz({logged,backend_url,selectedSerie,setselectedSerie,testResults,settestResults}) {
    const navigate = useNavigate();
    const [moDAnswer ,  setmoDAnswer ] = useState(0)
    const [ data , setData ] = useState(null)
    const [nbQ , setNbQ]= useState(0)
    const [userAnswers , setuserAnswers] = useState([])

    

    let getData = async () => { 
          
        let respons = await fetch (`${backend_url}loadData`)
        let data = await respons.json()
        setData(data['serieTest'])
        setNbQ(data['serieTest'].length - 1)
        setuserAnswers(data['res'])
    }

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
        getData()
        if (logged != 1&&logged!=-5) navigate('/login')
        },[])


    const [startTest , setStartTest] = useState(false)

    const submit = async()=> {  
        if (selectedSerie != null ) {
        const DataForm = new FormData();
        DataForm.append('id',selectedSerie['id'])
        DataForm.append('state','series_test')
        await axios ({
            method : 'POST' , 
            url : `${backend_url}owner/profiles/GEN` ,
            data :  DataForm,
        })
        .then((response)=>{

            let dataR = response.data
            if (dataR['status'] == 1 ) {
                setData(dataR['content'])
                setNbQ(dataR['content'].length - 1)
              }
        }).catch(function (error) {  
            console.log(error)
        });
    }
}
useEffect(()=> {
    submit()
},[selectedSerie])




const [isPlaying, setIsPlaying] = useState(false);
const [timeLeft, setTimeLeft] = useState(6); 


const [totalcounter , settotalcounter] = useState(0)

// console.log({
//     'timeLeft ':timeLeft , 
//     'moDAnswer':moDAnswer,
//     'userAnswers':userAnswers,
//     'selectedAnswers':selectedAnswers,  
//     'counter State':nbQ < 0 || isPlaying || !startTest,
//     'nbQ':nbQ ,
//     'isPlaying':isPlaying , 
//     'startTest':!startTest, 
//     'cond' : !(moDAnswer == 1 && totalcounter % 2 == 0 ),
//     'totalcounter':totalcounter ,
//     'testResults':testResults , 
// })





useEffect(() => {
    if (nbQ == -1 && !isPlaying && startTest) {
        
            settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data})
            navigate("/result")
    }
    if (nbQ < 0 || isPlaying || !startTest  ) return ;
    
    // Update every second    
   
    const smallSequence = setInterval(() => {
        
        setTimeLeft((prevTime) => prevTime - 1);   
       if ( timeLeft <= 0) clearInterval(smallSequence)
    }, 1000); // 1 second = 1000 milliseconds

    const timer = setInterval(() => {

        if (nbQ < 0) {
            settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers})
            navigate("/result")
            clearInterval(smallSequence);
            clearInterval(timer);
        }
        if (nbQ >= 0  ) {
            setTimeLeft(6)
            if (!(moDAnswer == 1 && totalcounter % 2 == 0 )) 
                setNbQ((prevNbQ) => prevNbQ - 1);    
            else 
            clearInterval(smallSequence);
            clearInterval(timer);
            
            // setTimeLeft(60); 
        } else {
            clearInterval(timer);
        }
        settotalcounter(prev => prev + 1)
    }, 6000); // 60 seconds = 60000 milliseconds
    
    return () => {
        clearInterval(smallSequence);
        clearInterval(timer);
    };
}, [nbQ,isPlaying,startTest]);







const HandleUserAnswer = (idQ, id) => { 
    // var check = hadnleRes(idQ, id); // Check if the answer already exists
    // console.log('check -- check', check);

    
    let found = false;

    const updatedAnswers = selectedAnswers.map((e) => {
        if (e['QI'] === idQ) {
            found = true;
            // Check if the id already exists in the answer array
            if (!e.answer.includes(id)) {
                return { ...e, answer: [...e.answer, id] }; // Append id to the array
            }else {
                return { ...e, answer: e.answer.filter((item) => item !== id) };
            }
        }
        return e; // Leave other answers unchanged
    });

    if (!found) {
        // Add a new entry for the question with id as the first element in the answer array
        updatedAnswers.push({ QI: idQ, answer: [id] });
    }

    // Update the state with the new array
    setselectedAnswers(updatedAnswers);
};



  
     
 

 
    
    //   useEffect(() => {   
    //     var res = []
    //     if (data) {
    //         data.map((ob, i) => {

    //             // Update the specific sub-array   
    //              ob['content'].map((oc, j) =>
    //                 res.push({'Qc':oc['question']['content'],'QI':oc['question']['id'],'answer': -1 })
    //             );
    //         }
    //       );
    //     }
    //     setuserAnswers(res)
    //   }, [data]);
    
      const handleBoxStyle = (QI, AI) => {
        // Check if there is a matching answer
        var cla = ' answer center '
        const isSelected = selectedAnswers.some((ob) => ob.QI === QI && ob.answer.includes(AI));
        if (isSelected)  cla+=' answerSelection ' 
        if ( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) &&hadnleRes(QI,AI)) cla+=' correctAnswer '
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

      return (
    <div className='Quiz center'> 
        {startTest ? 
        
        <>
        <div className='img_container'>
            <img  alt='' src={data != null && nbQ >= 0 ? backend_url+data[nbQ]['picture']:''} />
        </div>
        {
           moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ?
            nbQ == 0 ? 
            <div className='bar center '>
                <button className='instantBtn' onClick={()=>navigate('/')}>3awda</button>
            </div>   
            :
            <div className='bar center '>
            <button className='instantBtn' onClick={()=>handleResumConter()}>tali</button>
            </div>   
            : 
            <div className='bar center '>
             <div className='counter numberContainer center'>{timeLeft}</div>
                <div className='volum'>
                    <img alt='' src={muteAudio ? volume_off : soundOne} onClick={()=> handleMute()} />
                </div>
            </div>
        }
        </>
            : ''}
        <div className={startTest ? 'TestContainer positionRelative' : 'TestContainer positionRelative bigHei '}>
              {
                data != null && nbQ >= 0 ?
                !startTest ? 
                <AutoPlayAudio moDAnswer={moDAnswer} setmoDAnswer={setmoDAnswer} descAudioIsPlaying={isPlaying} startTest={startTest} setStartTest={setStartTest} audioUrl={backend_url+data[nbQ]['audio_content']}  />
                :
                <AutoPlayAudio moDAnswer={moDAnswer} setmoDAnswer={setmoDAnswer} descAudioIsPlaying={isPlaying} startTest={startTest} setStartTest={setStartTest} audioUrl={backend_url+data[nbQ]['audio_content']}  />
                   :'' }
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
                                    <div onClick={()=> HandleUserAnswer(ob['question']['id'],oc['id'])} className={handleBoxStyle(ob['question']['id'],oc['id'])}>
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
            <AudioExp startTest={startTest} isPlaying={isPlaying} totalTiming={totalTiming} pauseWhite={pauseWhite} togglePlayPause={togglePlayPause} audioExplainationRef={audioExplainationRef } AXurl={AXurl} />
            : ''
        }
    </div>
  )
}
