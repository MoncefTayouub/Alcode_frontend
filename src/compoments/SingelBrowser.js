import React , {useEffect} from 'react'
import leftBarLogin from '../files/leftBarLogin.svg'
import mail_yellow from '../files/mail_yellow.svg'
import phoneNumber from '../files/phoneNumber.svg'
import { useNavigate } from 'react-router-dom';

export default function SingelBrowser({logOut}) {
        const navigate = useNavigate();

    useEffect(()=> {  
        logOut(true)
    },[])
  return (
    <div className='Login center'>
  <img className='imgLogin' src={leftBarLogin} alt='' />
  <div className="container ">
            <p>لضمان أمان حسابك وتجربة سلسة، يمكن تسجيل الدخول من متصفح واحد فقط في نفس الوقت. إذا كنت تحاول تسجيل الدخول من جهاز أو متصفح جديد، يُرجى تسجيل الخروج من الجلسة السابقة أولاً.</p>
            <p>كيف يمكنك تسجيل الخروج؟</p>
            <ul>
              <li>انتقل إلى المتصفح الذي تستخدمه حاليًا.</li>
              <li>إذا كنت مسجلاً للدخول، قم بتسجيل الخروج من حسابك.</li>
              <li>بعد ذلك، حاول تسجيل الدخول من المتصفح الجديد.</li>
            </ul>
            <p>إذا واجهت أي مشكلة أو كنت بحاجة إلى مساعدة، لا تتردد في التواصل مع فريق الدعم الخاص بنا. نحن هنا لمساعدتك!</p>
        </div>
        <div className='detail_contenter center'>
                <a style={{color : 'white' }} href={`https://wa.me/212613294385`} target="_blank" rel="noreferrer" > 
            <div className='cont center'>
                <img src= {phoneNumber}  alt='' /> 
                 <p>0613-294385</p>

            </div>
                 </a>
            <div className='cont center'>
                <img src={mail_yellow} alt='' /> 
                <p>contact@alcode.com</p>
            </div>
        </div>
        <p className='link' onClick={()=>navigate('/')} > {" صفحة الرئيسية "}</p>
</div>
  )
}
