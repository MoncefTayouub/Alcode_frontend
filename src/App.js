import React , { useState, useEffect } from 'react'; // Optional if you are using React 17+
import { BrowserRouter, Routes, Route } from 'react-router-dom';import './App.css';
import Navbar from './compoments/Navbar'
import Home from "./pages/Home";
import Footer from './compoments/Footer'
import Serie from "./pages/Serie";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";   
import Owner from "./pages/Owner";
import axios from 'axios'
import Login from './compoments/Login';
import QuizRes from './compoments/QuizRes';
import { use } from 'react';
import SellingPoing from './compoments/SellingPoing';
import TestAudio from './Items/TestAudio';
import Quiz01_02 from './pages/Quiz01_02';
import SeeAllRess from './compoments/SeeAllRess';
import InernalError from './compoments/InernalError';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import SingelBrowser from './compoments/SingelBrowser';
import {Navigating} from './compoments/Manipulation'


const App = () => {
  // const backend_url = 'https://srv668869.hstgr.cloud/';
  // const backend_img = "https://srv668869.hstgr.cloud";
  const backend_img = 'http://127.0.0.1:8000';
  const backend_url = 'http://127.0.0.1:8000/';    
  const [testResults,settestResults] = useState()
  const [answersTable , setanswersTable  ] = useState([])
  const [logged , setLogged] = useState(-5)
  const [isOwner , setisOwner] = useState(false)    
  const [reloading , setreloading ] = useState(false)
  const [validationRef , setvalidationRef] = useState(null)
  const [callNbQ,setcallNbQ] = useState(null) 
  const [footerContent, setfooterContent] = useState()  
  const [pathname, setPathname] = useState('');




  async function getBrowserId() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return String(result.visitorId); 
}






  useEffect(() => {
    setPathname(window.location.pathname);  
    const handleLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  const [typeR, setTypeR] = useState(false);
  useEffect(() => {
    setTypeR(pathname === '/owner' || pathname === '/login' || pathname === '/ByPass');

    
  }, [pathname]);
  // console.log('pathname',pathname,"typeR",typeR)
    
  const [selectedSerie , setselectedSerie ] = useState(null)



  const checkUserLoggedIn = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    setreloading(true)
    const DataForm = new FormData();
    DataForm.append('accessToken', accessToken);
    DataForm.append('user', user);
    const brid = await getBrowserId();
    DataForm.append('browserID', brid);

    try {
      const response = await axios({
          method: 'POST',
          url: `${backend_url}verify_token`,
          data: DataForm,
      });

      const data = response.data; 
      // console.log(data,brid)
      setreloading(false)
      setvalidationRef(data.auth)
      setLogged(data.status)
      setfooterContent(data.seriesF.slice(0,5))
      if (data.status === 0) {
        return 0 ;
      }else {
          if (data.status === 2) 
            setisOwner(true)          
          return 1 ;
      }

       
  } catch (error) {
      console.error('Error during login:', error);
  }
        return -1;
    
};

const HandleSubmitData = async(DataForm,url,method)=> {
  try {
    const response = await axios({
        method: method,
        url: backend_url+url,
        data: DataForm,
    });
    const data = response.data; 
        return data ;
} catch (error) {
  console.error('Error during login:', error);
  return null
}
}

useEffect(() => {
  const initializeAuth = async () => {
      const isLoggedIn = await checkUserLoggedIn();
      setLogged(isLoggedIn)
  };

  initializeAuth();
}, [logged]);

const [loginOut , setloginOut] = useState(false)

const logOut = async (error = false) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken ) {
      setvalidationRef()
      setLogged(-5)
  }
  setloginOut(true)
  const DataForm = new FormData();
  DataForm.append('accessToken', accessToken);
  if (!error) {
    try {
      const response = await axios({
          method: 'POST',
          url: `${backend_url}logout`,
          data: DataForm,
      });
      const data = response.data; 
      setloginOut(false)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setLogged(-5)
  
       
  } catch (error) {
      console.error('Error during login:', error);
      // setreloading(false)
      // Navigating('/InernalError')
  }
    
  }else {
    setloginOut(false)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setLogged(-5)
  }
      return -1;
  
};

const typeLicence = [
  {'type':"A", 
    "title":'انطلق نحو الحرية مع قيادة الدراجات النارية!', 
    "desc":'إذا كنت تبحث عن شعور الحرية والإثارة على الطرقات، فإن دورة الفئة A هي المفتاح لتحقيق أحلامك. ستتعلم كيفية قيادة الدراجات النارية بثقة، مع فهم عميق لقواعد السلامة والمناورات المتقدمة. من تحقيق التوازن المثالي إلى القيادة بسرعة وأناقة، ستصبح قائدًا محترفًا مستعدًا للاستمتاع بكل لحظة على الطريق. لا تنتظر أكثر، اختر إحدى الدورات أدناه وانطلق نحو الحرية!', 
    "icon":""},
   
   {'type':"B", 
    "title":'افتح أبواب الاستقلالية وحقق أحلامك مع رخصة الفئة B!', 
    "desc":'دورة الفئة B ليست مجرد دروس للقيادة، إنها تجربة لتحويلك إلى قائد حقيقي على الطريق. ستتعلم الأساسيات بدءًا من تشغيل السيارة إلى المناورات الدقيقة في الشوارع المزدحمة. مع التمارين العملية والمواقف الواقعية، ستكتسب الثقة اللازمة لتصبح سائقًا ماهرًا. سواء كنت تحلم بالسفر، العمل، أو ببساطة الاستمتاع بحياتك اليومية، فإن هذه الرخصة هي بوابتك لتحقيق المزيد. اختر واحدة من الدورات التالية وابدأ رحلتك الآن!', 
    "icon":""},
   
   {'type':"C", 
    "title":'أطلق العنان لقيادتك مع الفئة C - لأبطال النقل الثقيل!', 
    "desc":'هل ترى نفسك خلف عجلة شاحنة تنقل الحمولات الثقيلة عبر المدن والطرق السريعة؟ دورة الفئة C تم تصميمها خصيصًا لتعليمك كل ما تحتاجه لتصبح قائدًا محترفًا في عالم النقل الثقيل. من التحكم في المركبات الكبيرة إلى إدارة السلامة على الطرق، ستكتسب الخبرة والثقة لتكون مستعدًا لأي تحدٍ. اختر إحدى الدورات أدناه وابدأ رحلتك نحو التميز في النقل الثقيل!', 
    "icon":""},
   
   {'type':"CE", 
    "title":'تحكم في القوافل والمقطورات باحترافية كاملة مع الفئة CE!', 
    "desc":'إذا كنت تبحث عن تحدٍ أكبر في عالم القيادة، فإن رخصة الفئة CE هي الخيار الأمثل لك. تعلم كيفية قيادة الشاحنات ذات المقطورات وإدارة القوافل الثقيلة بثقة واحترافية. من فهم التوصيلات الدقيقة إلى المناورات الصعبة، ستكون مستعدًا لأي سيناريو على الطريق. اختر واحدة من الدورات التالية لتبدأ التحدي وتهيمن على عالم القوافل!', 
    "icon":""},
   
   {'type':"D", 
    "title":'كن قائد الحافلة المثالي وسفير القيادة الآمنة!', 
    "desc":'مع رخصة الفئة D، يمكنك أن تصبح قائدًا لحافلات الركاب، وتلعب دورًا محوريًا في حياة الناس اليومية. دورة تدريبية شاملة تركز على تعليمك كيفية قيادة الحافلات بأمان وراحة، مع التركيز على راحة الركاب وسلامتهم. من إدارة المواقف المختلفة على الطريق إلى بناء ثقة عالية بنفسك كقائد محترف، هذه الدورة هي المفتاح لتحقيق التميز في هذا المجال. اختر واحدة من الدورات أدناه وانطلق نحو حياة مهنية مليئة بالنجاحات!', 
    "icon":""} 
]
const [selectType , setselectType ] = useState()
const [categoryContent,setcategoryContent] = useState()
const setSeries = (type)=> {
    for (var i = 0 ; i < typeLicence.length ; i++) {
      if (typeLicence[i]['type'] == type ) return typeLicence[i]
    }
    return null
}
useEffect(()=> {
  setcategoryContent(setSeries(selectType))
},[selectType])





return (
    <BrowserRouter>
      <div className="App">
      { reloading ? 
        <div className='reloadSection center '   >
          <div className="loader"></div>
          </div>           
        : '' 
      }
        <Navbar loginOut={loginOut} setloginOut={setloginOut} logOut={logOut} logged={logged}  typeR={typeR} />   
        <Routes>
           <Route path="/" element={<Home backend_img={backend_img} setselectType={setselectType} HandleSubmitData={HandleSubmitData} logged={logged} setselectedSerie={setselectedSerie} selectedSerie={selectedSerie} backend_url={backend_url} />} />    
          <Route path="/Serie" element={<Serie backend_img={backend_img} setreloading={setreloading} selectType={selectType} categoryContent={categoryContent} setselectedSerie={setselectedSerie} selectedSerie={selectedSerie} backend_url={backend_url} />} />    
          <Route path="/Quiz" element={<Quiz   backend_img={backend_img} validationRef={validationRef} setreloading={setreloading} typeLicence={typeLicence} logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  setselectedSerie={setselectedSerie} selectedSerie={selectedSerie}    />} />    
          <Route path="/QuizRes" element={<Quiz01_02 backend_img={backend_img}  callNbQ={callNbQ} logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  setselectedSerie={setselectedSerie} selectedSerie={selectedSerie}    />} />    
          <Route path="/result" element={<Results answersTable={answersTable}  setanswersTable={setanswersTable} setcallNbQ={setcallNbQ} logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  />} />    
          <Route path="/Owner" element={<Owner backend_img={backend_img} isOwner={isOwner} logged={logged} backend_url={backend_url} />} />    
          <Route path="/login" element={<Login  logged={logged} setLogged={setLogged} backend_url={backend_url} />} />    
          <Route path="/ByPass" element={<SellingPoing  logged={logged} setLogged={setLogged} backend_url={backend_url} />} />    
          <Route path="/SingelBrowser" element={<SingelBrowser logOut={logOut}  logged={logged} setLogged={setLogged} backend_url={backend_url} />} />    
          <Route path="/InernalError" element={<InernalError  logged={logged} setLogged={setLogged} backend_url={backend_url} />} />    
        </Routes>
        <Footer setselectedSerie={setselectedSerie} pathname={pathname} footerContent={footerContent} typeR={typeR} />
      </div>
    </BrowserRouter>
  );
};

export default App;
