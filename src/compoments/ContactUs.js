import React , {useEffect , useState} from 'react'

import youtubeBleu from "../files/youtubeBleu.svg"
import facebookBleu from "../files/facebookBleu.svg"
import whatsappBleu from "../files/whatsappBleu.svg"
import tiktokBleu from "../files/tiktokBleu.svg"
import instagramBleu from "../files/instagramBleu.svg"
import doublewave from "../files/doublewave.svg"
import { useNavigate } from 'react-router-dom'

export default function ContactUs({HandleSubmitData}) {

    const navigate = useNavigate()
  const [fullName , setFullName ] = useState('')
  const [Mail , setMail ] = useState('')   
  const [Subjects , setSubjects ] = useState('')
  const [MSG , setMSG ] = useState('')
  const [sent , setSent] = useState(false)
    const [errormessage , setErrormessage] = useState('')
  function isValidEmail(email) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
  const handleFields = () => {
    let bol = !(fullName == "" || Mail == "" || Subjects == "" || MSG == "" )
    if (!bol) setErrormessage('الرجاء ملء جميع الحقول')
    return bol
  }

  const Submit = ()=> {
    if (handleFields()){
        if (!isValidEmail(Mail)) {
            setErrormessage('الرجاء إدخال بريد إلكتروني صحيح')
            return ;
        }
         const DataForm= new FormData();
         DataForm.append('fullNames',fullName)
         DataForm.append('gmail',Mail)
         DataForm.append('subject',Subjects)
         DataForm.append('message',MSG)
         HandleSubmitData(DataForm,'contactUs','POST')
         .then(res => {
            if (res.status == 1 ) {
                setFullName('')
                setMail('')
                setSubjects('')
                setMSG('')
                setSent(true)
                setErrormessage('')
            }
            // console.log("Response:", res);
          })  
          .catch(error => {
            // console.error("Error in HandleSubmitData:", error);
            navigate('InernalError')
          });
        }

  }

  return (
    <div className='ContactUs center '>
        <div className='motivation center'>
            <p className="center">نحن هنا لدعمك والإجابة على جميع استفساراتك. إذا كنت بحاجة إلى مساعدة، أو لديك سؤال، أو ترغب في معرفة المزيد عن خدماتنا، يسعدنا تواصلك معنا. فريقنا جاهز لتقديم الدعم والمشورة لضمان حصولك على أفضل تجربة ممكنة. لا تتردد في التواصل معنا اليوم!</p>
        <div className='social_acc'>
            
            <div className='container center'>
                <h4>instagram/almoniteur</h4>    
                <a href='https://www.instagram.com/almoniteur/' target="_blank"  rel="noreferrer" > <img src={instagramBleu} alt=''></img> </a>
                </div>  
            <div className='container center'>
                <h4>facebook/almoniteur</h4>    
                <a href='https://www.facebook.com/profile.php?id=61558066622408&locale=fr_FR' target="_blank" rel="noreferrer" >   <img src={facebookBleu} alt=''></img></a>
            </div>  
            <div className='container center'>
                <h4>0613-294385</h4>    
                <a href={`https://wa.me/212613294385`} target="_blank" rel="noreferrer" >   <img src={whatsappBleu} alt=''></img></a>
            </div>  
            <div className='container center'>
                <h4>youtube/@Almoniteur</h4>    
                <a href='https://www.youtube.com/@Almoniteur' target="_blank" rel="noreferrer" >   <img src={youtubeBleu} alt=''></img></a>
            </div>  
            <div className='container center'>
                <h4>tiktok/@almoniteur</h4>    
                <a href='https://www.tiktok.com/@almoniteur' target="_blank" rel="noreferrer" >   <img src={tiktokBleu} alt=''></img>  </a>
            </div>  
           
         
              
        </div>      
        </div>
        <div className='form frs center'>
            <div className='imgCooon'>
             <img src={doublewave} className='' alt='' />

            </div>
             {
                sent ? 
                <>
                 <p className=''>تم إرسال بريدك الإلكتروني بنجاح. شكرًا لتواصلك معنا، وسنقوم بالرد عليك في أقرب وقت ممكن</p>
                <div className='twobutns center padding'>
                    <button className='gold rad20' onClick={()=>setSent(false)}>إرسال رسالة أخرى</button>
                </div> 
                </>
                : <>
                    <p>{errormessage}</p>
                    <input placeholder='الاسم الكامل' onChange={(e)=>setFullName(e.target.value)} value={fullName} />
                    <input placeholder='البريد الإلكتروني : example@gmail.com' onChange={(e)=>setMail(e.target.value)} value={Mail} />
                    <input placeholder='موضوع رسالتك' onChange={(e)=>setSubjects(e.target.value)} value={Subjects} />
                    
                    <textarea className='' onChange={(e)=>setMSG(e.target.value)} value={MSG} placeholder='لا تتردد في التواصل معنا إذا كنت بحاجة إلى أي توضيحات أو استفسارات. نحن هنا للمساعدة!' />
                    <div className='twobutns center '>
                        <button className='gold rad20' onClick={()=>Submit()}>إرسال</button>
                    </div> 
                </>
             }
           
        </div>
    </div>
  )
}
