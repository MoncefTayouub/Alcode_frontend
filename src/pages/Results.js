import React , {useEffect, useState} from 'react'
import Box from '../compoments/Box'
import motocycleIcon from '../files/motocycleIcon.png'
import { useNavigate } from 'react-router-dom';

export default function Results( {testResults,settestResults,logged}) {
  
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (logged != 1&&logged!=-5) navigate('/login')
    }, []);
  const handleSeeRes = ()=> {
    navigate('/QuizRes')
  }
  
  console.log(testResults)
  const [correctAnswer, setcorrectAnswer] = useState()
  const [totalAnswer, settotalAnswer] = useState()
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
      

      settotalAnswer(testResults.userAnswers.length)
      var cP = 0 
      testResults.selectedAnswers.map((ob,i)=>{
        
       var  countP = testResults.userAnswers.filter((oc,j)=>{
          return (oc.QI == ob.QI && compareAnswers(ob.answer ,oc.answer)) 
        })
        cP += countP.length ? 1 : 0

      })
      setcorrectAnswer(cP)    
    }
  },[testResults])

  console.log({
    'correctAnswer':correctAnswer , 
    'totalAnswer':totalAnswer , 

  })
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
        <div className='center gap'>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
     </div>
     <div className='twobutns seeMore center padding'>
        <button className='full rad20'>عرض المزيد</button>
    </div>
    </div>
  )
}
