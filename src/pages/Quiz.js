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

export default function Quiz({backend_img,validationRef,setvalidationRef,setreloading,logged,backend_url,selectedSerie,setselectedSerie,testResults,settestResults}) {
    const navigate = useNavigate();
    const [moDAnswer ,  setmoDAnswer ] = useState(0)
    const [ data , setData ] = useState(null)
    const [nbQ , setNbQ]= useState(0)
    const [userAnswers , setuserAnswers] = useState([])
    const [setQuiz ,sSETetQuiz ] = useState()
    const [switcher , setswitcher  ] = useState(false) 

    const Auth =  () => {
    
    //   const user = localStorage.getItem('user')
    //     console.log('user',user)
    //   if (user == null){
    //      navigate('/login');
    //     return 0 ;
    //    }
    //    const jsonObject = JSON.parse(user);
    //    setreloading(true)
    //       const DataForm = new FormData();
    //       DataForm.append('user', jsonObject.id);
    //       DataForm.append('data', selectedSerie['id']);
       
    //       try {
    //           const response = await axios({
    //               method: 'POST',
    //               url: `${backend_url}userlogin/duration`,
    //               data: DataForm,
    //           });
      
    //           const data = response.data;
    //           if (data.status === 1) {
    //             setData(data['serieTest'])
    //             setNbQ(data['serieTest'].length - 1)
    //             setuserAnswers(data['res'])
    //           }
    //           setreloading(false)
    //           if (data.status === 0) {
    //              navigate('/login')
    //              return 0 
    //           }
    //           return 1 
              
    //       } catch (error) {
    //           console.error('Error during login:', error);
    //           return 0 
    //       }
      };    
    

    

    const [selectedAnswers , setselectedAnswers] = useState([])

    const hadnleRes = (qi, anss) => {
        if (userAnswers) {
            for (let i = 0; i < userAnswers.length; i++) {
                if (userAnswers[i].content.some(e => e.QI === qi && e.CA.includes(anss))) {
                    return true; // Found a match, exit early
                }
            }
        }
        return false; // No match found
    };




    useEffect(()=> {
        window.scrollTo(0, 0);
       
           
       
        
        },[])

        // <div className='reloadSection center '   >
        //   <div class="loader"></div>
        //   </div>   

        useEffect(()=> {
            if (logged !== 1  ) {
                navigate('/login')
            }else 
            if (validationRef == 0  ) {
                // navigate('/ByPass')
            }
        },[validationRef,logged])

    const [startTest , setStartTest] = useState(false)

    const submit = async()=> {  
        if (selectedSerie != null ) {
        const DataForm = new FormData();
        DataForm.append('id',selectedSerie['id'])
        DataForm.append('state','series_test')
        setreloading(true)
        await axios ({
            method : 'POST' , 
            url : `${backend_url}owner/profiles/GEN` ,
            data :  DataForm,
        })
        .then((response)=>{

            let dataR = response.data
            if (dataR['status'] == 1 ) {
                setreloading(false)
                setData(dataR['content'])
                setuserAnswers(dataR['correct'])
                setNbQ(dataR['content'].length - 1)
              }
        }).catch(function (error) {  
            navigate('/InernalError')
            // console.log(error)
        });
    }
}
useEffect(()=> {
    submit()
},[selectedSerie])




const [isPlaying, setIsPlaying] = useState(false);
const [timeLeft, setTimeLeft] = useState(30); 


const [totalcounter , settotalcounter] = useState(0)



const setRes = ()=> {
    settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data})
           navigate("/result")
}



useEffect(() => {
    if (nbQ == -1 && !isPlaying && startTest && moDAnswer !== 1 ) {
        
            settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data})
            navigate("/result")
    }
    if (nbQ < 0 || isPlaying || !startTest || false ) return ;
    
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
            setTimeLeft(30)
            if (!(moDAnswer == 1 && totalcounter % 2 == 0 )) {
                setNbQ((prevNbQ) => prevNbQ - 1);  
               
            }
            else 
            clearInterval(smallSequence);
            clearInterval(timer);
            
            // setTimeLeft(60); 
        } else {
            clearInterval(timer);
        }
        settotalcounter(prev => prev + 1)
    }, 30000); // 60 seconds = 60000 milliseconds
    
    return () => {
        clearInterval(smallSequence);
        clearInterval(timer);
    };
}, [nbQ,isPlaying,startTest]);







const HandleUserAnswer = (idQ, id) => { 
    // var check = hadnleRes(idQ, id); // Check if the answer already exists
    // console.log('check -- check', check);
     
   if( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 )) 
            return ;

    let found = false;

    const updatedAnswers = selectedAnswers.map((e) => {
        if (e['QI'] === idQ) {
            found = true;
            if (!e.answer.includes(id)) {
                return { ...e, answer: [...e.answer, id] }; 
            }else {
                return { ...e, answer: e.answer.filter((item) => item !== id) };
            }
        }
        return e; 
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
   

    // const audiDesc = useRef(null);   
    const audioExplainationRef = useRef(null);
    const togglePlayPause = () => {
        if (audioExplainationRef.current){
        if (isPlaying ) {
            audioExplainationRef.current.pause();
        } else {
            audioExplainationRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    //   else console.log('not set yet')
    }

    
    const [totalTiming, setTotalTiming] = useState(0);

   

    

    useEffect(()=> {
        if ( data && nbQ >= 0 ) {
            setAXurl(backend_img+data[nbQ]['auidio_explaination'])  
            
        }
        // if (nbQ < 0) {
        //     // seeResaults()
        // }else {
           
        //     if (data) {
                
        //         // setAXurl(backend_url+data[nbQ]['auidio_explaination'])   
        //         console.log('auidio_explaination',backend_url+data[nbQ]['auidio_explaination'])
        //         let  audioRef =    new Audio(backend_url+data[nbQ]['auidio_explaination']);
        //         let  audioD  =    new Audio(backend_url+data[nbQ]['audio_content']);
        //          audioExplainationRef.current = audioRef   
        //         //  audiDesc.current = audioD
        //          audioRef.addEventListener('loadedmetadata', () => {
        //             setTotalTiming(parseInt(audioRef.duration))
        //           }); 
    
                  
        //         }
        // }
      },[nbQ,data])

      const [muteAudio , setmuteAudio  ] = useState(false ) 

      

     

      const decreasenbQ = ()=> {
        if (nbQ <= 0) 
            return 0 
        setNbQ((prev)=>prev - 1 )
        return 1 
      }

      const handleResumConter = ()=> {
        var va = decreasenbQ()
        setTimeLeft(30)
        settotalcounter((prev)=>prev+1)
      }



    //   console.log({
        // 'timeLeft ':timeLeft , 
        // 'moDAnswer':moDAnswer,
        // 'userAnswers':userAnswers,
        // 'selectedAnswers':selectedAnswers,  
        // 'counter State':nbQ < 0 || isPlaying || !startTest,
        // 'nbQ':nbQ ,
        // 'isPlaying':isPlaying , 
        // 'startTest':startTest, 
        // 'cond' : !(moDAnswer == 1 && totalcounter % 2 == 0 ),
        // 'totalcounter':totalcounter ,
        // 'testResults':testResults , 
        // 'data':data,
    //     'expAudioBool' : startTest,
    //     'AXurl' : AXurl,
    // })
    // console.log('handleBoxStyle',handleBoxStyle(69,142),moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ),'hadnleRes',hadnleRes(69,142))
      return (
    <div className='Quiz center'> 
    {
            startTest ? 
            <>
            {
             switcher ? 

                <div className='toolBar center'>
                        <AudioExp startTest={startTest} isPlaying={isPlaying} setIsPlaying={setIsPlaying} totalTiming={totalTiming} pauseWhite={pauseWhite} togglePlayPause={togglePlayPause} audioExplainationRef={audioExplainationRef } AXurl={AXurl} />
                    <p className='pbttn center' onClick={()=>setswitcher(false)}>استئناف</p>
                </div>
            : 
                <div className='toolBar spacebetween jcfc'>

                    {
                    moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ?
                        nbQ == 0 ? 
                            <p className='pbttn  center' onClick={()=>setRes('/')}> النتائج</p>
                           
                        :
                        <p className='pbttn  center' onClick={()=>handleResumConter()}>التالي</p>
                        
                        : 
                        <div className='bar center '>
                        <div className='counter numberContainer center'>{timeLeft}</div>
                            <div className='volum'>
                                <img alt='' src={muteAudio ? volume_off : soundOne} onClick={()=> setmuteAudio(!muteAudio)} />
                            </div>
                        </div>  
                    }
                    <p onClick={()=>setswitcher(true)} className='pbttn center'>شرح صوتي</p>
                </div>

        }
            </>
            : ''
        }
        {startTest ? 
        
        <>
        <div className='img_container center'>
            
            {
                ( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 )) ? 
                <img  alt='' src={data != null && nbQ >= 0 ?  backend_img+data[nbQ]['correctAnswer']:''} />
                :
                <img  alt='' src={data != null && nbQ >= 0 ?  backend_img+data[nbQ]['picture']:''} />
            }
        </div>
        {/* {
           moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ?
            nbQ == 0 ? 
            <div className='bar center '>
                <button className='pbttn' onClick={()=>navigate('/')}> صفحة الرئيسية </button>
            </div>   
            :
            <div className='bar center '>
            <button className='pbttn' onClick={()=>handleResumConter()}>التالي</button>
            </div>   
            : 
            <div className='bar center '>
             <div className='counter numberContainer center'>{timeLeft}</div>
                <div className='volum'>
                    <img alt='' src={muteAudio ? volume_off : soundOne} onClick={()=> setmuteAudio(!muteAudio)} />
                </div>
            </div>
        } */}
        </>
            : ''}
        <div className={startTest ? 'TestContainer scrollableSection positionRelative ' : '  TestContainer positionRelative h100vh '}>
              {
                data != null && nbQ >= 0 ?
                <AutoPlayAudio setmuteAudio={setmuteAudio} muteAudio={muteAudio} moDAnswer={moDAnswer} setmoDAnswer={setmoDAnswer} descAudioIsPlaying={isPlaying} startTest={startTest} setStartTest={setStartTest} audioUrl={backend_img+data[nbQ]['audio_content']}  />
                
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
                        {
                            ( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 )) ?
                                <div className='center'>
                                    <div className='expText'>
                                    {ob['question']['explication']}
                                    </div>
                                </div>
                            : ''
                        }
                        </div> 
             
                ) :''
            } 

        </div>
       
    </div>
  )
}
