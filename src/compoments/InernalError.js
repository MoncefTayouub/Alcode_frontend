import React from 'react'
import leftBarLogin from '../files/leftBarLogin.svg'
import mail_yellow from '../files/mail_yellow.svg'
import phoneNumber from '../files/phoneNumber.svg'
import { useNavigate } from 'react-router-dom';


export default function InernalError() {
    const navigate = useNavigate();

  return (
<div className='Login center'>
  <img className='imgLogin' src={leftBarLogin} alt='' />
        <h1>حدث خطأ داخلي في الخادم</h1>
        <p>نعتذر عن الإزعاج. يرجى المحاولة لاحقًا أو الاتصال بالدعم الفني إذا استمرت المشكلة.</p>
        <p className='link' onClick={()=>navigate('/')} > {"إعادة تحميل"}</p>
</div>
  )
}
