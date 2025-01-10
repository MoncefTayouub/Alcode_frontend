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
  useEffect(()=> {
    if (testResults ) {

      const compareAnswers = (ans , bns)=> {
          if (ans.length !== bns.length) return 0 
          let cc = 0
          ans.filter((ob)=> {
            if (bns.includes(ob)) cc ++
          })
          return (cc == ans.length)
      }
      const answerIndex = (id) => {
        let index = -1; // Default value if no match is found
        testResults.data.forEach((ob) => {
            ob['content'].forEach((om) => {
                om.answers.forEach((of, idx) => {
                    if (of.id === id) {
                        index = idx + 1 ; // Store the index of the matching answer
                    }
                });
            });
        });
        return index; // Return the found index or -1 if not found
    };

      const checkAnswer = (ans )=> {
        return testResults['selectedAnswers'].filter((ob,i)=> {
           return ob.answer.includes(ans)
        }).length
    }
      

      settotalAnswer(testResults.userAnswers.length)
      var cP = 0 
      testResults.selectedAnswers.map((ob,i)=>{
        
       var  countP = testResults.userAnswers.filter((oc,j)=>{
          return (oc.QI == ob.QI && compareAnswers(ob.answer ,oc.answer)) 
        })
        cP += countP.length ? 1 : 0

      })
      // setcorrectAnswer(cP)  
      
      var totalSec = 0 
      var res = [] 
      testResults['userAnswers'].map((ob,i)=>{
        var total = [] 
        var corr = 0
        var ansIndex = []
        ob['content'].map((om,m)=> {
          om['CA'].map((oca , ca)=>{
            if (checkAnswer(oca)) corr++
            total ++
            ansIndex.push(answerIndex(oca))
          })
        })
        totalSec += total == corr ? 1 : 0 
        res.push({'status':total == corr , 'index' : i+1 , 'ans':ansIndex})
      })
      setcorrectAnswer(totalSec)
      setanswersTable(res)
      var obj = testResults
      obj.answersTable = res
      settestResults(obj)

    }
  },[testResults])


  const handleGoRes = (nbqq)=> {
    if (!testResults) return ;
    console.log(nbqq-1 , testResults.data , testResults.data[nbqq])
    setcallNbQ(nbqq-1)
    // setcallNbQ(testResults.data.length - nbqq)
    navigate('/QuizRes')
    return 1

  }

//  console.log('answersTable',answersTable,'testResults',testResults)
  return (
    <div className='Serie padding'>
        <div className='HeaderSerie  center'>
        <div className='image center'>
                <img src={motocycleIcon} alt='' />
        </div>
            <div className='descpt exp center'>
                <h3>نتائج الاختبار</h3>
                <p>نحن نقدم لك منصة تدريبية عبر الإنترنت مصممة خصيصًا لضمان نجاحك في اختبار القيادة النظري. من خلال تمارين عملية وحلول سلسلة، نساعدك على فهم جميع المفاهيم الأساسية بشكل فعال. مع برنامجنا الموثوق، ستكون مستعدًا تمامًا لاجتياز الاختبار والحصول على رخصتك بكل ثقة</p>
            </div>

          
        </div>
        <div className='twobutns scores center'>
                <div className='containerRes center'>
                  {
                    testResults ?  <p>{correctAnswer}/{totalAnswer}</p>
                    : <p>-- / -- </p>
                  }
                 
                </div>
                <button className='full rad20' onClick={()=>handleSeeRes()}>الإجابات الصحيحة</button>
        </div>
        <div className='resByAnswer center'>

          {
            answersTable.map((oc,i)=>

              <div onClick={()=>handleGoRes(oc.index)} key={i} className={oc.status ? 'boxOffice center boxOffice01 ' : 'boxOffice center boxOffice_01'}>
                  {/* <div  className='nbquestion center'>{oc.index}</div> */}
                  <div  className='nbquestion center'>{ oc.index}</div>
                  <div className='corrAns center'>
                    <p>الإجابات الصحيحة</p>
                    <div className='center'>
                      {
                        oc.ans.map((om,j)=>
                          <div className='layer'>{om}</div>
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
