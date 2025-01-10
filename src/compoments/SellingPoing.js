import React from 'react'
import leftBarLogin from '../files/leftBarLogin.svg'
import mail_yellow from '../files/mail_yellow.svg'
import phoneNumber from '../files/phoneNumber.svg'
import { useNavigate } from 'react-router-dom';


export default function SellingPoing() {
    const navigate = useNavigate();

  return (
<div className='Login center'>
  <img className='imgLogin' src={leftBarLogin} alt='' />
  <div className="container ">
            <p>هل تفكر في الحصول على رخصة القيادة وتبحث عن أفضل الطرق لتحقيق ذلك بسهولة ونجاح؟ نحن هنا لمساعدتك! مقابل اشتراك شهري بسيط بقيمة 50 درهم فقط، يمكنك الاستفادة من:</p>
            <ul>
                <li>الوصول الكامل إلى جميع الدروس النظرية والعملية طوال الشهر.</li>
                <li>دعم مستمر ومخصص من مدربين محترفين يرافقونك خطوة بخطوة.</li>
                <li>إرشادات ونصائح فعالة تساعدك على تجاوز اختبار القيادة بثقة وبدون قلق.</li>
            </ul>
            <p>هذه الفرصة مصممة خصيصاً لتسهيل رحلتك نحو الحصول على رخصة القيادة، حيث نضمن لك تجربة مريحة ومليئة بالتعلم.</p>
            <p>للحصول على المزيد من التفاصيل أو للاشتراك، يرجى التواصل معنا عبر المعلومات المذكورة أدناه. نحن هنا لخدمتك!</p>
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
