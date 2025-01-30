import React , {useEffect , useState} from 'react'
import blue_plus from '../files/blue_plus.svg'
import yellow_plus from '../files/yellow_plus.svg'
import axios from 'axios'
import { use } from 'react'
import edit_blue from '../files/edit_blue.svg'
import trash_blue from '../files/trash_blue.svg'
import isCorr from '../files/isCorr.svg'
import notCorr from '../files/notCorr.svg'
import isvalidBlue from '../files/isvalidBlue.svg'
import { useNavigate } from 'react-router-dom';

export default function QueDetail({setreloading,GoBack,setGoBack,logged,clearFields,questionList , setquestionList ,quiz,serie,setSerie,SetnavSelect,backend_url,errorMsg,setErrorMsg}) {
    const [content , setContent ] = useState()
    const [answers , setAnswers ] = useState([])
    const [answerContent , setAnswerContent] = useState('')
    const [desc , setDesc] = useState('')
    const [questions , setQuesions] = useState([])
    const navigate = useNavigate();

    //   {
    //     question: 'content',
    //     answers: [{'content' :'answerContent' , 'status' : 0 },{'content' :'answerContent01' , 'status' : 1 },{'content' :'answerContent333' , 'status' : 0 }],
    //   },
    //   {
    //     question: 'content',
    //     answers: [{'content' :'answerContent' , 'status' : 0 },{'content' :'answerContent01' , 'status' : 1 },{'content' :'answerContent333' , 'status' : 0 }],
    //   }
    // ])
    const [answercheck , setanswercheck ] = useState('') 
    const [compoUpdate , setcompoUpdate] = useState(1)

    useEffect(()=> {
        if (questionList != null) {
          setQuesions(questionList)
        }
        // if (!logged) navigate('/login')
    },[])

    const addAnswer = ()=> {
        if (answerContent === '') {
          setanswercheck ("لا يمكنك ترك الإجابة فارغة")
          return 0
        }
        if (editanswerMode == -1 ) {
        setAnswers([...answers , {'content' :answerContent , 'status' : 0 , "id":-1 }])
        
        }else {
            var ert = answers.map((ob,i)=> {
                if (i == editanswerMode) {
                  return {
                    ...ob,'content' : answerContent ,
                  }
                }else return ob
            })
            setAnswers(ert)

        }
        setAnswerContent("")
        seteditanswerMode(-1)
      }

    
    const checkCorrectAnswer = ()=> {
      return Object.keys(answers.filter((e)=>e['status']===1)).length > 0 
    }

    const setCorrectAnswer = (index )=> {
      setcompoUpdate(compoUpdate+1)
        for (var i = 0 ; i< answers.length ; i++) 
          if (i == index) answers[i]['status'] = answers[i]['status'] == 1 ? 0 : 1  
          // else answers[i]['status'] = 0
          setAnswers(answers)
    }


    // ------------------ edit question -------------- 
    const [editQuestionMode , seteditQuestionMode ] = useState(-1)
    const [editanswerMode , seteditanswerMode ] = useState(-1)
    const [answerStatus , setanswerStatus ] = useState(false)
   
    const editQes = (i)=> {
        var res = questions[i]     
        seteditQuestionMode(i) 
        setContent(res['question'])
        setAnswers(res['answers'])
        setDesc(res['explication'])
      }

      const editAnser = (i)=> {
        var res = answers[i] 
        seteditanswerMode(i) 
        setAnswerContent(res['content'])

      }

    

      const addQuestion = () => {
       if (checkCorrectAnswer()){
      if (!content || answers.length === 0 ) {
        setanswercheck("لا يمكن أن يكون محتوى السؤال أو الإجابات فارغًا");
        return;
      }
    
      if (editQuestionMode != -1) {
        var que = questions.map((ob,i)=> {
          if (i==editQuestionMode) {
            ob['question'] = content 
            ob['answers'] = answers
            return {
              ...ob , 'question' : content , 'answers' : answers , 'explication' : desc
            };
          }else {
            return ob
          }
        })
        setQuesions(que)
      }else 
      setQuesions([
        ...questions,
        {
          question: content,
          answers: answers,
          explication : desc ,
          id : -1 
        },
      ]);
      
      setAnswerContent([]); // Clear answers
      setContent(''); // Clear question content
      setAnswers([])
      setDesc('')
      setanswercheck('')
      seteditanswerMode(-1)
      seteditQuestionMode(-1)
   }else 
      setanswercheck('يجب اختيار إجابة صحيحة واحدة بالضغط على الإجابة الصحيحة لتصبح باللون الأحمر')
  
  };

  const checkInput = ()=> {
    return questions.length > 0 
  }
  
      const Submit = async ()=> {
        if (checkInput()) {
          setreloading(true)
        const DataForm= new FormData();
        DataForm.append('content',JSON.stringify(questions))
        DataForm.append('quiz',quiz['id'])
        var method = 'POST'
        if (questionList != null) {
          method = 'PUT'
        }

        await axios ({
          method : method , 
          url : `${backend_url}owner/answer` ,
          data :  DataForm,
          
      })
      .then((response)=>{
        setreloading(false)
            let data = response.data
            // eslint-disable-next-line eqeqeq
            if (data['status'] == 1 ) {
              SetnavSelect(8)
              setErrorMsg(6)
              seteditanswerMode(-1)
              seteditQuestionMode(-1)
              clearFields()
            }else setErrorMsg(7)
          
      }).catch(function (error) {
        navigate('/InernalError')
        });
      }else {
        setanswercheck('تأكد من إضافة سؤال وبعض الإجابات')
      }
      }
      
     
      
      const [del_serie , setdel_serie] = useState(-1) 

      const handleDelete = async ()=> { 
          if (del_serie != -1 ) {
            setreloading(true)
          const DataForm= new FormData();
          DataForm.append('id',questions[del_serie]['id'])
          DataForm.append('serie',serie['id'])
          DataForm.append('type','question')
          var method = 'DELETE'
        
          // DataForm.append('quiz',quiz)
          
          await axios ({   
            method : method , 
            url : `${backend_url}owner/answer` ,
            data :  DataForm,
        })
        .then((response)=>{
          setreloading(false)
              let data = response.data
              setdel_serie(-1)
              setErrorMsg(6)
              
        }).catch(function (error) {
          navigate('/InernalError')
          });
          }
  }

 

 console.log(answers)

    const deleteItem = () => {

      var delQ = questions[del_serie] 
      if (delQ['id'] != -1 ) handleDelete()
      setQuesions((prevArr) => prevArr.filter((item,i) => i !== del_serie));
    
    };

    const [del_answer , setdel_answer] = useState(-1) 


   
    

    const handleDeleteAnswer = async ()=> {
      console.log('del_answer',del_answer)
      if (del_answer == -1 ) setErrorMsg(7)
      if (answers.length == 0 || del_answer == -1 ) return 0
      // get id of the answer
      let id = answers[del_answer]['id']
      if (id == -1) {
        setAnswers((prevArr) => prevArr.filter((item,i) => i !== del_answer));
        setdel_answer(-1)
        return 1 ;
      }
      
      
        setreloading(true)
        const DataForm= new FormData();
        DataForm.append('type','answer')
        DataForm.append('id',answers[del_answer]['id'])
        await axios ({   
          method : 'DELETE' , 
          url : backend_url+'owner/answer' ,
          data :  DataForm,
      })
      .then((response)=>{
        setreloading(false)
            let data =  response.data 
            console.log(data)
            if (data['status'] == 1 ) {
              setAnswers((prevArr) => prevArr.filter((item,i) => i !== del_answer));
              setdel_answer(-1)   

            }
            
      }).catch(function (error) {
        navigate('/InernalError')
        });        
        
      
        
    }

    const CircleBox = ({ text, colorClass , tpe , setGoBack }) => {  
      return (
        <div className="circle-box">
          <div onClick={()=>setGoBack(tpe)} className={`circle ${colorClass}`}></div>
          <p onClick={()=>setGoBack(tpe)} className="circle-text">{text}</p>
        </div>
      );
    };

    useEffect(() => {

        const timer = setTimeout(() => {
          setanswercheck('')    
          // Place your function logic here 
        }, 6000); // 30 seconds = 30000 milliseconds
    
        // Cleanup to avoid memory leaks if the component unmounts
        return () => clearTimeout(timer);
      }, [answercheck]);

      const handleAnswerKeyDown = (e)=> {
          if (e.key === 'Enter' && desc != '' && answerContent != '') {
            addAnswer()
          }
      }

    
    return (
    <div className='Questions ownerPadding center '>
        <div className="frame">
        <CircleBox tpe={0} setGoBack={setGoBack} text="سلسلة" colorClass="yellow" />
        <CircleBox tpe={1} setGoBack={setGoBack}  text="اختبار" colorClass="yellow" />
        <CircleBox tpe={2} setGoBack={setGoBack}  text="أسئلة" colorClass="yellow" />
      </div>
      {
        del_serie != -1 ?  <div className='deleteConfirmMessage center' >
        <div className='boxer center'>
            <p>هل تؤكد حذف هذه السلسلة؟</p>
            <div className='center'>
                <button onClick={()=>deleteItem()}>نعم</button>
                <button onClick={()=>setdel_serie(-1)}>لا</button>
            </div>

        </div>
    </div> : ''  

       }
        {
        del_answer != -1 ?  <div className='deleteConfirmMessage center' >
        <div className='boxer center'>
            <p>هل تؤكد الحذف؟</p>
            <div className='center'>
                <button onClick={()=>handleDeleteAnswer()}>نعم</button>
                <button onClick={()=>setdel_answer(-1)}>لا</button>
            </div>

        </div>
    </div> : ''  

       }
    <div className='hederTitle center end'>
      <h3>{ serie != null ? serie['title'] : '-' }  </h3>
      <p>عنوان السلسلة  </p>
    </div> 
      {
        questions ?
        questions.map((ob,i)=>
        <div className='questionApear center' key={i}>
           <div className='croud center'> 
                            <img alt='' onClick={()=>editQes(i)} src={edit_blue} />
                            <img alt='' onClick={()=>setdel_serie(i)} src={trash_blue} />
                         </div>   
          <h4>  {ob['question']} , {i+1}  </h4>
          <p className='explinationText'>{ob['explication']}</p> 
          {
            ob['answers'].map((os , j)=> 
            <p key={j} className={os['status'] == 1 ? 'wrongAnswer' : ''} >{j+1}  {os['content']} </p>
            )
          }
          <p></p>
        </div>
        ) : ''
      }
      

 
    <input className='bigInput' onChange={(e)=>setContent(e.target.value)} value={content}  placeholder='السؤال' />
    <textarea className='bigInput'  onChange={(e)=> {setDesc(e.target.value)}} value={desc} placeholder='تفاصيل' />

    <div className='answerD'>
        {answers.length ? 
        answers.map((e,i)=> 
        <div className='spacebetween positionRelative' key={i}>
          <div className='croud center'> 
                            <img alt='' onClick={()=>editAnser(i)} src={edit_blue} />
                            <img alt='' onClick={()=>setdel_answer(i)} src={trash_blue} />
                         </div>  
                         <div></div>
          <p key={i} className={e['status'] == 1 ? 'wrongAnswer' : ''} onClick={()=>setCorrectAnswer(i)}>{e['content']}</p> 
        </div>

      )
         : <p>إضافة اقتراح جديد للإجابة على السؤال </p>
        }
        <div className='container fdc spacebetween'>
          <div className='bxown center '>
            {
             ( editanswerMode != -1 ) ?  <img onClick={(e)=> addAnswer() } alt='' src={isCorr} />  
             : <img onClick={(e)=> addAnswer() } alt='' src={yellow_plus} /> 
             }
            <input className='bigInput'  onKeyDown={handleAnswerKeyDown} placeholder='اقترح إجابة للمستخدم' onChange={(e)=> {setAnswerContent(e.target.value)}}  value={answerContent}/>

          </div>
            </div>
        <div className='errorAnswer wrongAnswer'>
          {/* <p> {answercheck === 0 ? 'يجب اختيار إجابة صحيحة واحدة بالضغط على الإجابة الصحيحة لتصبح باللون الأحمر.' : '' }  </p> */}
          <p> {answercheck  }  </p>
        </div>
        <div className='container end center'>
            {/* <input className='bigInput' placeholder='اقترح إجابة للمستخدم' /> */}
            <p onClick={()=>addQuestion()}>أضف سؤالًا آخر </p>
            <img alt='' onClick={()=>addQuestion()} src={(editQuestionMode == -1 ? blue_plus : isvalidBlue)} />
        </div>
    </div>
  <div className='twobutns  center padding'>
    <button onClick={()=> Submit()}  className='full rad20'>حفظ </button>
</div> 
</div>
  )
}
