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

export default function Quiz01_02({backend_img,validationRef,callNbQ,setvalidationRef,setreloading,logged,backend_url,selectedSerie,setselectedSerie,testResults,settestResults}) {
    const navigate = useNavigate();
    // const [moDAnswer ,  setmoDAnswer ] = useState(0)
    const [ data , setData ] = useState(null)
    const [nbQ , setNbQ]= useState(callNbQ != null ? callNbQ : 0 )
    const [userAnswers , setuserAnswers] = useState([])
    const [corrIds,setcorrIds] = useState()
    const [setQuiz ,sSETetQuiz ] = useState()
    const [switcher , setswitcher  ] = useState(false) 

    
    

    

    const [selectedAnswers , setselectedAnswers] = useState([])

    const hadnleRes = (qi, anss) => {
        if (corrIds) {
            return corrIds.includes(anss)
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
                navigate('/ByPass')
            }
        },[validationRef,logged])

    const [startTest , setStartTest] = useState(false)

   
useEffect(()=> {
    console.log('testResults data ',data)
    if (testResults && data === null) {
        setData(testResults.data)
        setuserAnswers(testResults.userAnswers)
        setselectedAnswers(testResults.selectedAnswers)
        setcorrIds(testResults.corrIds)
    }
},[testResults])

console.log(data , 'data')


const [isPlaying, setIsPlaying] = useState(false);
const [timeLeft, setTimeLeft] = useState(6); 


const [totalcounter , settotalcounter] = useState(0)







useEffect(() => {
    // if (nbQ == -1 && !isPlaying && startTest) {
        
    //         settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers,'data':data})
    //         navigate("/result")
    // }
    if (nbQ < 0 || isPlaying || !startTest || true ) return ;
    
    // Update every second    
   
    const smallSequence = setInterval(() => {
        
        setTimeLeft((prevTime) => prevTime - 1);   
       if ( timeLeft <= 0) clearInterval(smallSequence)
    }, 1000); // 1 second = 1000 milliseconds  

    const timer = setInterval(() => {

        // if (nbQ < 0) {
        //     settestResults({'selectedAnswers':selectedAnswers,'userAnswers':userAnswers})
        //     navigate("/result")
        //     clearInterval(smallSequence);
        //     clearInterval(timer);
        // }
        // if (nbQ >= 0  ) {
        //     setTimeLeft(6)
        //     if (!(moDAnswer == 1 && totalcounter % 2 == 0 )) {
        //         setNbQ((prevNbQ) => prevNbQ - 1);  
               
        //     }
        //     else 
        //     clearInterval(smallSequence);
        //     clearInterval(timer);
            
        //     // setTimeLeft(60); 
        // } else {
        //     clearInterval(timer);
        // }
        settotalcounter(prev => prev + 1)
    }, 6000); // 60 seconds = 60000 milliseconds
    
    return () => {
        clearInterval(smallSequence);
        clearInterval(timer);
    };
}, [nbQ,isPlaying,startTest]);



console.log(testResults)

  

const HandleUserAnswer = (idQ, id) => { 
    // var check = hadnleRes(idQ, id); // Check if the answer already exists
    // console.log('check -- check', check);
     
//    if( moDAnswer != 2 && !(moDAnswer == 1 && totalcounter % 2 == 0 )) 
//             return ;

//     let found = false;

//     const updatedAnswers = selectedAnswers.map((e) => {
//         if (e['QI'] === idQ) {
//             found = true;
//             // Check if the id already exists in the answer array
//             if (!e.answer.includes(id)) {
//                 return { ...e, answer: [...e.answer, id] }; // Append id to the array
//             }else {
//                 return { ...e, answer: e.answer.filter((item) => item !== id) };
//             }
//         }
//         return e; // Leave other answers unchanged
//     });

//     if (!found) {
//         // Add a new entry for the question with id as the first element in the answer array
//         updatedAnswers.push({ QI: idQ, answer: [id] });
//     }

//     // Update the state with the new array
//     setselectedAnswers(updatedAnswers);
};





 

 
    
    
      const handleBoxStyle = (QI, AI) => {
        // Check if there is a matching answer
        var cla = ' answer center '
        const isSelected = selectedAnswers.some((ob) => ob.QI === QI && ob.answer.includes(AI));
        if (isSelected)  cla+=' answerSelection ' 
        if ( hadnleRes(QI,AI)) cla+=' correctAnswer '
        // Return the appropriate className
        return cla
      };

      
      

      
       



      
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

    // console.log(callNbQ,nbQ)  
    // console.log('testResults',testResults,'corrIds',corrIds) 

    useEffect(()=> {
        if (data&&callNbQ != null )
            if ( callNbQ<data.length)
            setNbQ(callNbQ) 
    },[callNbQ,data])

    const checkAnswer = (ans )=> {
        return selectedAnswers.filter((ob,i)=> {
           return ob.answer.includes(ans)
        }).length   
    }

    const handleQuestionUserAnswer = (qi)=> {
        var corr = 0
        var total = 0
        var totalSec = false
        var ids = [] 
        selectedAnswers.map((ob,i)=> {
            ids.push(...ob.answer)
        })
        userAnswers.filter((f)=> {
            if (f.qId == qi) {
                total = f.correctAnswers.length
                corr = f.correctAnswers.filter((e)=> {
                    return ids.includes(e)
                }).length
                totalSec = corr == total
            }
        })
          return totalSec ? ' corr_expText ' : ' worong_expText '
    }

    // useEffect(()=>{
    //     if (data ) {
    //         if (nbQ>=0 && nbQ < data.length)
    //         // console.log('data current content ',data[nbQ])
    //     }
    // },[data])

    const handleanswerIndex = (ansId)=> {
        // if (!data || !startTest) return -1 
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
       const handleImgPath = ()=> {
        if (data != null && nbQ >= 0 ) {
            if (data[nbQ].correctAnswer == null ) 
                return backend_img +  data[nbQ].picture
                return backend_img + data[nbQ].correctAnswer
            console.log(data[nbQ] , data , nbQ)
        }
        return ''
       }
    
 return (   
    <div className='Quiz center'> 
   
           

                <div className='toolBar center'>
                        <AudioExp seeRes={true} handleSeeNbQ={handleSeeNbQ} len={data ? data.length : 0} nbQ={nbQ} startTest={startTest} isPlaying={isPlaying} setIsPlaying={setIsPlaying} totalTiming={totalTiming} pauseWhite={pauseWhite} togglePlayPause={togglePlayPause} audioExplainationRef={audioExplainationRef } AXurl={AXurl} />
                    {/* <p className='pbttn center' onClick={()=>setswitcher(false)}>استئناف</p> */}
                </div>
            
                

       
      
        <div className='img_container center'>
     {data ?  
            <p className='nbqHover'>{ ' السؤال رقم ' + ( data.length - nbQ  ) }</p>
     :''}

                <img  alt='' src={handleImgPath()} />
           
        </div>
       
     
        <div className={startTest ? 'TestContainer scrollableSection positionRelative' : ' scrollableSection TestContainer positionRelative bigHei '}>
             
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
                        {(  ob['question']['explication'].trim() !== '' ) ?

                        <div className='center'>
                                    <div className={' expText '+handleQuestionUserAnswer(parseInt(ob['question']['id']))}>
                                    {ob['question']['explication']}
                                    </div>
                        </div>
                        : ''}
                        </div> 
             
                ) :''
            } 

        </div>
       
    </div>
  )
}
