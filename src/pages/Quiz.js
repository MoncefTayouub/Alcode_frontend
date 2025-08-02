import React, { useEffect, useState , useRef } from 'react'
import question_image from '../files/question_image.webp'
import play_white from '../files/play_white.svg'
import audioPlayer from '../files/audioPlayer.svg'
import volume_off from "../files/volumeOffFolid.svg"
import soundOne from "../files/soundOneBlue.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AudioExp from '../Items/AudioExp'
import pauseWhite from '../files/pauseWhite.svg'
import AutoPlayAudio from '../Items/AutoPlayAudio'
import skip_button from '../files/skip_button_white_second.svg'
import play_blue from '../files/play_blue.svg'
import Pause_blue from '../files/Pause_blue.svg'
import x_nav_mark from '../files/x_mark_white.svg'


export default function Quiz({backend_img,validationRef,setvalidationRef,setreloading,logged,backend_url,selectedSerie,setselectedSerie,testResults,settestResults}) {
    const navigate = useNavigate();
    const [moDAnswer ,  setmoDAnswer ] = useState(0)
    const [ data , setData ] = useState(null)
    const [nbQ , setNbQ]= useState(0)
    const [userAnswers , setuserAnswers] = useState([])
    const [setQuiz ,sSETetQuiz ] = useState()
    const [switcher , setswitcher  ] = useState(false) 

    // ------ audio desc ----------------
    const [audioFinsh , setAudioFinsh] = useState(false)
    const [timing , settimnig ] = useState(false)

    // ------------- pause / play quiz ------------
    const [pauseQuiz , setpauseQuiz] = useState(false)

    

    

    const [selectedAnswers , setselectedAnswers] = useState([])
   

    const hadnleRes = (qi, anss) => {
        return corrIds.includes(anss) 
       
    };

    const [corrIds , setcorrIds ] = useState(false)

    useEffect(()=> {
        var res = []
        if (userAnswers) {
            userAnswers.map((ob,i)=> {  
                res.push(...ob.correctAnswers)
            })
            setcorrIds(res)
        }
},[userAnswers])
    const checkAnswer = (ans )=> {
        return selectedAnswers.filter((ob,i)=> {
           return ob.answer.includes(ans)
        }).length
    }


    const checkAnswerCorrect = (qi)=> {
            var coorRes = []
            
            var qzRes = true 
            
            userAnswers.map((ob,i)=> {
                if (ob.qzId == qi) {
                    var ansRes = true
                    var quesFound = false 
                    selectedAnswers.map((mm,j)=> {
                        if (mm.QI == ob.qId) {
                          quesFound = true
                            if (mm.answer.length == ob.correctAnswers.length) {
                                ob.correctAnswers.map((ans,k)=> {
                                        ansRes &&= mm.answer.includes(ans)
                                    
                                })
                            }else 
                                ansRes = false
                        }
                    }   )
                    if (!quesFound) qzRes = false
                    else qzRes &&= ansRes
                }
            })

            
            return qzRes
    }
    const handleQuestionUserAnswer = (qi)=> {
    
        // var selectAll = [] 
        // var UTA = 0 
        // selectedAnswers.map((ob,i)=> {
        //   selectAll.push(...ob.answer)
        //   if (ob.QI == qi) {
        //     UTA = ob.answer.length
        //   }
        // })
        // var res = []
        // var total = 0 
        // var corr = 0 
        // userAnswers.map((ob,i)=>{
        //   if (ob.qzId == qi) {
        //     ob.correctAnswers.map((mm)=> {
        //       if (selectAll.includes(mm)) 
        //         corr ++ 
        //       total ++ 
        //     })
        //   }
        // })
        // console.log('res',res,'corr',corr,'total',total,'userAnswers',userAnswers,'selectedAnswers',selectedAnswers,'selectAll',selectAll,'UTA',UTA)
        // if (UTA != total) return ' worong_expText '
        var checkingAns = checkAnswerCorrect(qi)
        return !checkingAns ?  ' worong_expText ' : ' corr_expText ' 
        // return res.length == ct  
        }


    useEffect(()=> {
        window.scrollTo(0, 0);   
       
           
       
        
        },[])

        // <div className='reloadSection center '   >
        //   <div class="loader"></div>
        //   </div>   



        // handle loggin
        useEffect(()=> {
            // console.log('validationRef',validationRef,'logged',logged)
            if (logged !== 1  ) {
                navigate('/login')
            }else 
            if (validationRef == 0  ) {
                navigate('/ByPass')
            }else 
            if (validationRef == -1  ) {
                // navigate('/SingelBrowser')
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
                setData(dataR['content'].reverse())
                setuserAnswers(dataR['correct'])
                setNbQ(dataR['content'].length - 1)
                console.log('dataR',dataR)
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
    settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data,'corrIds':corrIds})
           navigate("/result")
}

const [skipQuestion,setskipQuestion] = useState(false)
useEffect(() => {
    if (skipQuestion) {
        setskipQuestion(false); 
        setTimeLeft(30);       
        setAudioFinsh(false);  
        if (!(moDAnswer == 1 && totalcounter % 2 === 0)) {
            setNbQ((prevNbQ) => prevNbQ - 1); 
        }
        settotalcounter(prev => prev + 1);    
        return; 
    }

    
    if (nbQ == -1 && !isPlaying && startTest && moDAnswer !== 1 ) {
            
            settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data,'corrIds':corrIds})
            navigate("/result")
    }
    if (nbQ < 0 || isPlaying || !startTest || !audioFinsh || pauseQuiz || false ) return ;
    
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
            setAudioFinsh(false)
            if (!(moDAnswer == 1 && totalcounter % 2 == 0 )) {
                
                if (moDAnswer == 2 && nbQ > 0 ) setskipQuestion(!skipQuestion)
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
    }, 30000); // 30 seconds = 30000 milliseconds
    
    return () => {
        clearInterval(smallSequence);
        clearInterval(timer);
    };
}, [nbQ,isPlaying,startTest,audioFinsh,skipQuestion,pauseQuiz]);







const HandleUserAnswer = (idQ, id) => {
    // var check = hadnleRes(idQ, id); // Check if the answer already exists
     
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
        // console.log("isSelected", isSelected, "hadnleRes", hadnleRes(QI,AI), 'cla', cla)
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
    }

    


    

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
  
   const clearAnswers = ()=> {
    // console.log(data,startTest)
        if (data && startTest) {
            let qid = data[nbQ].content.map((oc,i)=> {
                setselectedAnswers(selectedAnswers.filter((ob)=> ob.QI !== oc.question.id))
            }
            )
            // console.log( qid )

            
        }
   }

   const handleanswerIndex = (ansId)=> {
    if (!data || !startTest) return -1 
    let counter = 1 
    for (var i = 0 ; i < data[nbQ].content.length  ;i++){
        const row = data[nbQ].content[i]
        for (let j = 0 ; j < row.answers.length ; j++) {
            if ( row.answers[j].id == ansId ) return counter
            counter ++ 
        }

    }
    return 0

   }

  
    return (
    <div className='Quiz center'> 
          {
            startTest ? 
            <>
            {
             switcher ? 

                <div className='toolBar center'>
                        <AudioExp startTest={startTest} isPlaying={isPlaying} setIsPlaying={setIsPlaying}  pauseWhite={pauseWhite} togglePlayPause={togglePlayPause} audioExplainationRef={audioExplainationRef } AXurl={AXurl} />
                    <p className='pbttn center' onClick={()=>setswitcher(false)}>استئناف</p>
                </div>
            : 
                <div className='toolBar spacebetween jcfc'>

                    {
                    moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ?
                          <p onClick={()=>setswitcher(true)} className='pbttn center'>شرح صوتي</p>                        
                        : 
                        <div className='bar center '>
                            <div className='counter numberContainer center'>{timeLeft}</div>
                            <div className='volum'>
                                <img alt='' src={pauseQuiz ? Pause_blue : play_blue} onClick={()=> setpauseQuiz(!pauseQuiz)} />
                            </div>
                            <div className='volum'>   
                                <img alt='' src={muteAudio ? volume_off : soundOne} onClick={()=> setmuteAudio(!muteAudio)} />
                            </div>
                            <div className='timing'>{timing}</div>
                        </div>  
                    }
                    {
                        moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ?
                        nbQ == 0 ? 
                            <p className='pbttn  center' onClick={()=>setRes('/')}> النتائج</p>
                           
                        :
                        <p className='pbttn  center' onClick={()=>handleResumConter()}>التالي</p>
                        : 
                        <div className='center someBtn'  >
                        <p onClick={()=>setskipQuestion(!skipQuestion)} className='pbttn center'>تأكيد</p>
                        <p onClick={()=>clearAnswers()} className='pbttn center'>تصحيح</p>

                        </div>
                    }
                </div>
    
        }
            </>
            : ''
        }


    {startTest ? 
        
        <>
        <div className='img_container center'> 
             
            <p className='nbqHover'>{ ' السؤال رقم ' + ( data.length - nbQ  ) }</p>
            {
                ( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 )) ? 
                data[nbQ]['correctAnswer'] === null ? 
                  <img  alt='' src={data != null && nbQ >= 0 ?  backend_img+data[nbQ]['picture']:''} />
                : <img  alt='' src={data != null && nbQ >= 0 ?  backend_img+data[nbQ]['correctAnswer']:''} />

                :
                <img  alt='' src={data != null && nbQ >= 0 ?  backend_img+data[nbQ]['picture']:''} />
            }
        </div>
       </>
            : ''}
    
        
        <div className={startTest ? 'TestContainer scrollableSection positionRelative ' : '  TestContainer positionRelative h100vh '}>
              {
                data != null && nbQ >= 0 ?
                <AutoPlayAudio nbQ={nbQ} skipQuestion={skipQuestion} pauseQuiz={pauseQuiz} settimnig={settimnig} timing={timing} audioFinsh={audioFinsh} setAudioFinsh={setAudioFinsh} setmuteAudio={setmuteAudio} muteAudio={muteAudio} moDAnswer={moDAnswer} setmoDAnswer={setmoDAnswer} descAudioIsPlaying={isPlaying} startTest={startTest} setStartTest={setStartTest} audioUrl={backend_img+data[nbQ]['audio_content']}  />
                
                :'' }      
                {
                data != null && nbQ >= 0 ? data[nbQ]['content'].map((ob,i)=> 
                <div key={i}>
              
                        
                        <h5   >{ob['question']['content']}</h5>
                    <div   className='questions center'>
                    {ob['answers'].map((oc,j)=> 
                            <div key={j*454432200} className='answerContainer center'>
                                    <div className='QN center'>
                                        {/* {j+1} */}
                                        {handleanswerIndex(oc.id)}
                                    </div>
                                    <div onClick={()=> HandleUserAnswer(ob['question']['id'],oc['id'])} className={handleBoxStyle(ob['question']['id'],oc['id'])}>
                                        <p>{oc['content']}</p>
                                    </div>
                            </div>
                    )}

                        </div>
                        {/*  */}
                        {
                            ( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) && ob['question']['explication'].trim() !== ''  ) ?    
                                <div className='center'>
                                    <div className={' expText '+handleQuestionUserAnswer(data[nbQ].id)}>
                                        {ob['question']['explication']}
                                    </div>
                                </div>
                            : ''
                        }
                       
                        </div> 
                        
             
                ) :''
            } 
            {
            //         moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 ) ? ''
            // :
            //  <div className='expText expText_skip center' >
            //                <div className='ntnBox center' onClick={()=>setskipQuestion(!skipQuestion)}>
            //                         {/* <img  src={skip_button} /> */}
            //                         <p>تأكيد</p>
            //                </div>
            //                <div className='ntnBox center' onClick={()=>clearAnswers()}>
            //                         {/* <img  src={x_nav_mark} /> */}
            //                         <p>تصحيح</p>
            //                </div>

            // </div> 
            }
        </div>
       
    </div>
  )
}
