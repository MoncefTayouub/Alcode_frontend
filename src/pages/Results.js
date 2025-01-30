import React , {useEffect, useState} from 'react'
import Box from '../compoments/Box'
import motocycleIcon from '../files/motocycleIcon.png'
import { useNavigate } from 'react-router-dom';

export default function Results( {setcallNbQ,testResults,settestResults,logged}) {
  
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // if (logged != 1&&logged!=-5) navigate('/login')
    }, []);
  const handleSeeRes = ()=> {
    navigate('/QuizRes')
  }
  
  const [correctAnswer, setcorrectAnswer] = useState()
  const [totalAnswer, settotalAnswer] = useState()
  const [answersTable , setanswersTable  ] = useState([])
  const [ResSucc, setResSucc] = useState(false)


  // useEffect(()=> {
  //   var test = []
  //   for(var i = 1  ; i <= 40 ; i++) 
  //     test.push({'status':1 , 'index' : i, 'ans':[2,4]})
  //   setanswersTable(test)
  // },[])

  const handleQuestionUserAnswer = (qi)=> {
    if (!testResults) return 0 
    var selectedAnswers = testResults.selectedAnswers
    var userAnswers = testResults.userAnswers

    var selectAll = [] 
    selectedAnswers.map((ob,i)=> {
      selectAll.push(...ob.answer)
    })
        
    var total = 0 
    var corr = 0 
    userAnswers.map((ob,i)=>{
      if (ob.qzId == qi) {
        ob.correctAnswers.map((mm)=> {
          if (selectAll.includes(mm)) 
            corr ++ 
          total ++ 
        })
      }
    })
    return corr == total
    // return res.length == ct  
    }

  useEffect(()=> {
    if (testResults ) {

      


      const answerIndex = (ansId)=> {
        let data = testResults.data
        if (!data) return -1 
        for (var nbQ = 0 ; nbQ < data.length ; nbQ++) {
          let counter = 1 
          for (var i = 0 ; i < data[nbQ].content.length  ;i++){
              const row = data[nbQ].content[i]
              for (let j = 0 ; j < row.answers.length ; j++) {
                  if ( row.answers[j].id == ansId ) return counter
                  counter ++ 
              }
      
          } 
        }
        return 0
    
       }

      
      

      settotalAnswer(testResults.userAnswers.length)
     
      
      var totalSec = 0 
      var res = [] 
      testResults.data.map((ob,i)=>{

        
        var ansIndex = []
        testResults.userAnswers.filter((kk,k)=> {
            if (kk.qzId == ob.id) 
              for (var c = 0 ; c < kk.correctAnswers.length ; c ++) ansIndex.push(answerIndex(kk.correctAnswers[c]))
        })
        let status = handleQuestionUserAnswer(ob.id)
        if (status) totalSec ++ 
        res.push({'status':status , 'index' : testResults.data.length - i - 1, 'ans':ansIndex})
      })
      setResSucc(totalSec>=32)
      setcorrectAnswer(totalSec)
      setanswersTable(res.reverse())
      var obj = testResults
      obj.answersTable = res
      settestResults(obj)

    }
  },[testResults])


  const handleGoRes = (nbqq)=> {
    console.log(nbqq - 1 )
    if (!testResults) return ;
    setcallNbQ(testResults.data.length - nbqq - 1 )
    navigate('/QuizRes')
    return 1    

  }


  

 console.log('answersTable',answersTable,'testResults',testResults)
  return (
    <div className='Serie padding'>
        {/* <div className='HeaderSerie  center'>
        <div className='image center'>
                <img src={motocycleIcon} alt='' />
        </div>
            <div className='descpt exp center'>
                <h3>نتائج الاختبار</h3>
                <p>نحن نقدم لك منصة تدريبية عبر الإنترنت مصممة خصيصًا لضمان نجاحك في اختبار القيادة النظري. من خلال تمارين عملية وحلول سلسلة، نساعدك على فهم جميع المفاهيم الأساسية بشكل فعال. مع برنامجنا الموثوق، ستكون مستعدًا تمامًا لاجتياز الاختبار والحصول على رخصتك بكل ثقة</p>
            </div>

          
        </div> */}
        <div className='twobutns scores center'>
                <div className={ResSucc ? ' containerRes center res_succ ' : ' containerRes center res_fail ' }>
                  {
                    // testResults ?  <p className={ResSucc ? ' p_succ ' : ' p_fail '}>{correctAnswer}/{totalAnswer}</p>
                    testResults ?  <p className={ResSucc ? ' p_succ ' : ' p_fail '}>{correctAnswer}/{40}</p>
                    : <p>-- / -- </p>
                  }
                 
                </div>
                {/* <button className='full rad20' onClick={()=>handleSeeRes()}>الإجابات الصحيحة</button> */}
        </div>
        <p className='feeback'>
          {
          ResSucc ? " أحسنت! لقد أكملت الاختبار بنجاح. يبدو أنك مستعد للقيادة بثقة. استمر في التعلم وممارسة القيادة لتحسين مهاراتك!"  
          : 'للأسف، يبدو أنك لم تكن محظوظًا هذه المرة. لا تقلق، استمر في التدريب والتعلم، وستصبح قائدًا محترفًا قريبًا!'
        }</p>     
      <div className='resByAnswer center'>

          {
            answersTable.map((oc,i)=>

              <div onClick={()=>handleGoRes(oc.index)} key={i} className={oc.status ? 'boxOffice center boxOffice01 ' : 'boxOffice center boxOffice_01'}>
                  {/* <div  className='nbquestion center'>{oc.index}</div> */}
                  <div  className='nbquestion center'>{ oc.index + 1 }</div>
                  <div className='corrAns center'>
                    {/* <p>الإجابات الصحيحة</p> */}
                    <div className='center'>
                      {
                        oc.ans.map((om,j)=>
                          <div className='layer center'>{om}</div>
                        )
                      }
                      {/* <div className='layer'>3</div>
                      <div className='layer'>3</div> */}

                    </div>
                  </div>
                </div>
            )
          }


          {/* <div className='boxOffice boxOffice01 center'>
            <div  className='nbquestion center'>1</div>
            <div className='corrAns center'>
              <p>الإجابات الصحيحة</p>
              <div className='center'>
                <div className='layer'>3</div>
                <div className='layer'>3</div>
                <div className='layer'>3</div>

              </div>
            </div>
          </div>

          <div className='boxOffice boxOffice_01 center'>
            <div  className='nbquestion center'>1</div>
            <div className='corrAns center'>
              <p>الإجابات الصحيحة</p>
              <div className='center'>
                <div className='layer'>3</div>
                <div className='layer'>3</div>
                <div className='layer'>3</div>

              </div>
            </div>
          </div>

          <div className='boxOffice boxOffice_00 center'>
            <div  className='nbquestion center'>1</div>
            <div className='corrAns center'>
              <p>الإجابات الصحيحة</p>
              <div className='center'>
                <div className='layer'>3</div>
                <div className='layer'>3</div>
                <div className='layer'>3</div>

              </div>
            </div>
          </div> */}


        </div>
      
 
    </div>
  )
}
