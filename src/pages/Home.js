import React ,{useEffect , useState} from 'react'
import HemoHeader from '../compoments/HemoHeader'// ,{useState}
import instagramyellow from '../files/instagramyellow.svg'
import facebookyellow from '../files/facebookyellow.svg'
import whatsappyellow from '../files/whatsappyellow.svg'
import youtubeyellow from '../files/youtubeyellow.svg'
import tiktokyellow from '../files/tiktokyellow.svg'
import AboutSectoin from '../compoments/AboutSectoin'
import Box from '../compoments/Box'
import ContactUs from '../compoments/ContactUs'
import BySection from '../compoments/BySection'
import { useNavigate } from 'react-router-dom';
import whatsapp_white from '../files/whatsapp_white.svg'
import what_layout from '../files/what_layout.svg'
import whatsapp_vert from '../files/whatsapp_vert.svg'

function Home({setselectType,backend_img,HandleSubmitData,backend_url,setselectedSerie}) {    
  const navigate = useNavigate();
  const [ data , setData ] = useState()    
  let getData = async () => { 
      let respons = await fetch (`${backend_url}owner/profiles/HOME`)
      let data = await respons.json()
      setData(data)
  }

  
  
  useEffect(()=> {
      getData() 
      window.scrollTo(0, 0);
  },[])

  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(window.location.pathname);  
    const handleLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const [firstRows , setfirstRows ] = useState([])
  const [lastRows , setlastRows ] = useState([])
  const handleSettingSerie = (ob)=> {
    setselectedSerie(ob)
    // if (pathname != 'quiz')
    navigate('/quiz')
    }


  

  useEffect(()=> {
      if (data) {
          setfirstRows(data['content'].slice(0, 6))
          setlastRows(data['content'].slice( 6 ))
      }
  },[data])

  const navi = ()=> {
    setselectType('B')
    navigate('/serie')
  }

  

  return (
    <div>
     <HemoHeader/>
     <div className='social padding spacebetween'>
            <div className='socialIcons center'>
               <a href='https://www.instagram.com/almoniteur/' target="_blank"  rel="noreferrer" > <img src={instagramyellow} alt=''></img> </a>
                <a href='https://www.tiktok.com/@almoniteur' target="_blank" rel="noreferrer" >   <img src={tiktokyellow} alt=''></img>  </a>
                <a href='https://www.facebook.com/profile.php?id=61558066622408&locale=fr_FR' target="_blank" rel="noreferrer" >   <img src={facebookyellow} alt=''></img></a>
                <a href={`https://wa.me/212613294385`} target="_blank" rel="noreferrer" >   <img src={whatsappyellow} alt=''></img></a>
                <a href='https://www.youtube.com/@Almoniteur' target="_blank" rel="noreferrer" >   <img src={youtubeyellow} alt=''></img></a>
            </div>
            <h3>كونوا معنا يومياً في المساء، لمتابعة البث المباشر على جميع منصات التواصل الاجتماعي</h3>
     </div>
     <BySection data={data} setselectType={setselectType} />  
     <AboutSectoin />
     <a href={'https://wa.me/212613294385'}  target="_blank">
     <div className='link_whatwsapp spacebetween'>
      <div className='whatsapp_vert'>
            <img src={whatsapp_vert} alt=''></img>
      </div>
      <div className='desccc center'>
          <h3>احصل على حسابك الآن</h3>
          <p>لا تضيع الوقت! تواصل معنا عبر واتساب للحصول على حسابك مباشرة والتمتع بجميع دروس رخصة القيادة والاختبارات التي تحتاجها</p>
          <div className='bttons center'>
            <img src={whatsapp_white}/>
            <p>تواصل معنا الآن</p>
        </div>
      </div>
      <div className='img_whatapp'>
            <img src={what_layout} alt=''></img>
      </div>
 
    </div>
    </a>
     <div id = 'content'></div>
     <div className='center gap'>
      {
        firstRows.length ? firstRows.map((ob,i)=> 
            <Box key={i} title={ob['title']} ob={ob} imgurl={backend_img+ob['icon']} handleSettingSerie={handleSettingSerie} />
        ) : ''
      }
       
     
     </div>
     <div className='twobutns seeMore center padding'>
        <button className='full rad20' onClick={()=>navi()}>عرض المزيد</button>
    </div>

    <a id='contact'></a>
    <ContactUs  HandleSubmitData={HandleSubmitData} />
    <div className='headerContent padding center'>
      <p>تصفح مكتبتنا الشاملة من الدورات التدريبية المصممة لتلبية احتياجاتك التعليمية والمهنية. اكتشف الآن مجموعة متنوعة من المواضيع وابدأ رحلتك في التعلم معنا.</p>
     
    </div>
    <div className='center gap'>
    {
        lastRows.length ? lastRows.map((ob,i)=> 
            <Box key={i} title={ob['title']} imgurl={backend_img+ob['icon']} handleSettingSerie={handleSettingSerie}/>
        ) : ''
      }  
     </div>
     <div className='twobutns seeMore center padding'>
        <button onClick={()=>navi()} className='full rad20'>عرض المزيد</button>
    </div>
    </div>
  )
}

export default Home