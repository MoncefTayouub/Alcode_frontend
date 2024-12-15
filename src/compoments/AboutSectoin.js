import React  from 'react'
import Big_logo from "../files/Big_logo.png"
export default function AboutSectoin() {

  


  return (
    <div className='AboutSectoin padding spacebetween'>
      <div className='desc center'>
        <p>نحن نقدم لك منصة تدريبية عبر الإنترنت مصممة خصيصًا لضمان نجاحك في اختبار القيادة النظري. من خلال تمارين عملية وحلول سلسلة، نساعدك على فهم جميع المفاهيم الأساسية بشكل فعال. مع برنامجنا الموثوق، ستكون مستعدًا تمامًا لاجتياز الاختبار والحصول على رخصتك بكل ثقة.</p>
        <div className='twobutns spacebetween'>
        <a href='/#contact'>  <button className='blank rad20'>تواصلوا معنا</button></a>
        <a href='/#content'>   <button className='full rad20'>ابدأ التعلم الآن</button></a>
            </div>
      </div>
      <div className='bigLogo'>
        <img src={Big_logo} alt='' />
      </div>
    </div>
  )
}
