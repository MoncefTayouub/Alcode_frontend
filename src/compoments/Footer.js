import React , {useState , useEffect} from 'react'
import instagramyellow from '../files/instagramyellow.svg'
import facebookyellow from '../files/facebookyellow.svg'
import whatsappyellow from '../files/whatsappyellow.svg'
import youtubeyellow from '../files/youtubeyellow.svg'
import tiktokyellow from '../files/tiktokyellow.svg'
import Big_logo from '../files/Big_logo.png'
import phoneNumber from '../files/phoneNumber.svg'
import mail_yellow from '../files/mail_yellow.svg'
import Polygon from '../files/Polygon.svg'
import { useNavigate , useLocation } from 'react-router-dom';
import buzzmark from '../files/buzzmark.png'

export default function Footer({footerContent,setselectedSerie,pathname}) {
 
  const navigate = useNavigate();
  const [ typeR , settypeR] = useState(false)
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
    settypeR(location.pathname=="/login" || location.pathname=="/owner" || location.pathname=="/ByPass"|| location.pathname=="/InernalError"|| location.pathname=="/quiz"|| location.pathname=="/QuizRes" || location.pathname=="/SingelBrowser" )
  }, [location]);

  // console.log('footer',footerContent)
  const log = ()=> {
      navigate('/login')
  }

  const handleSettingSerie = (ob)=> {
    setselectedSerie(ob)
    // if (pathname != 'quiz')
    navigate('/quiz')
    }

    const currentYear = new Date().getFullYear();
  var content = (typeR) ? <div></div> : 
    <div>

    <div className='Footer center '>
      <div className='descContainer'>
        <div className='hight spacebetween'>
            <div className='social_footer center'>
                <div>
                <a href='https://www.instagram.com/almoniteur/' target="_blank"  rel="noreferrer" > <img src={instagramyellow} alt=''></img> </a>
                </div>
                <div>
                <a href='https://www.facebook.com/profile.php?id=61558066622408&locale=fr_FR' target="_blank" rel="noreferrer" >   <img src={facebookyellow} alt=''></img></a>
                </div>
                <div>
                <a href={`https://wa.me/212613294385`} target="_blank" rel="noreferrer" >   <img src={whatsappyellow} alt=''></img></a>
                </div>
                <div>
                <a href='https://www.youtube.com/@Almoniteur' target="_blank" rel="noreferrer" >   <img src={youtubeyellow} alt=''></img></a>
                </div>
                <div>
                <a href='https://www.tiktok.com/@almoniteur' target="_blank" rel="noreferrer" >   <img src={tiktokyellow} alt=''></img>  </a>
                </div>
                
               
            </div>
            <div className='dicovering center'>
                <h2>اكتشف أحدث  سلسلات</h2>
                {
                   (footerContent) ? 
                   footerContent.map ((ob,i)=>
                    <p onClick={()=>handleSettingSerie(ob)} key={i}>{ob.title}</p>
                  )
                   
                   :''
                }
            
            </div>
        </div>
        <div className='detail_content center'>
            <div className='cont center'>
                <img src= {phoneNumber}  alt='' /> 
                <a style={{color : 'white' }} href={`https://wa.me/212613294385`} target="_blank" rel="noreferrer" >  <p>0613-294385</p></a>

            </div>
            <div className='cont center'>
                <img src={mail_yellow} alt='' /> 
                <p>contact@alcode.com</p>
            </div>
        </div>
      </div>
      <div className='logoFooter center'>
        <img className='Polygon' alt='' src={Polygon} />
        <img className='Big_logo' src={Big_logo} alt='' />
      </div>

    </div>
    <div className='copyright center'>
        <img src={buzzmark}/>
        <a href='https://buzzmark.ma/'>Copyright © {currentYear} Buzzmark agency. All rights reserved.</a>
    </div>
    </div>
  return (
    <div>   
      {content}
    </div>
  )
}
