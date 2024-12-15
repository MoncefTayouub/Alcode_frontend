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

const App = () => {
  const backend_url = 'http://srv668869.hstgr.cloud/';
  const [testResults,settestResults] = useState()
  const [logged , setLogged] = useState(-5)

  const [footerContent, setfooterContent] = useState()

  const [pathname, setPathname] = useState('');
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
    setTypeR(pathname === '/owner');
  }, [pathname]);

  const [selectedSerie , setselectedSerie ] = useState(null)


  const checkUserLoggedIn = async () => {
    // Retrieve tokens from localStorage
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (!accessToken || !user) {
        // No tokens or user info; user is not logged in
        console.log('User is not logged in');
        return 0 ;
    }

    const DataForm = new FormData();
    DataForm.append('accessToken', accessToken);
    DataForm.append('user', user);

    try {
      const response = await axios({
          method: 'POST',
          url: `${backend_url}verify_token`,
          data: DataForm,
      });

      const data = response.data; 
      console.log('referesh' , data)
      setfooterContent(data.seriesF)
      if (data.status === true) {
          return 1 ;
      } else if (data.status === 0) {
        return 0 ;
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
}, []);


const logOut = ()=> {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  setLogged(false)
}




  return (
    <BrowserRouter>
      <div className="App">
        <Navbar logOut={logOut} logged={logged}  typeR={typeR} />   
        <Routes>
          {/* <Route path="/" element={<Home HandleSubmitData={HandleSubmitData} logged={logged} setselectedSerie={setselectedSerie} selectedSerie={selectedSerie} backend_url={backend_url} />} />    
          <Route path="/Serie" element={<Serie  setselectedSerie={setselectedSerie} selectedSerie={selectedSerie} backend_url={backend_url} />} />    
          <Route path="/Quiz" element={<Quiz logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  setselectedSerie={setselectedSerie} selectedSerie={selectedSerie}    />} />    
          <Route path="/QuizRes" element={<QuizRes logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  setselectedSerie={setselectedSerie} selectedSerie={selectedSerie}    />} />    
          <Route path="/result" element={<Results logged={logged} testResults={testResults} settestResults={settestResults} backend_url={backend_url}  />} />     */}
          <Route path="/Owner" element={<Owner logged={logged} backend_url={backend_url} />} />    
          <Route path="/login" element={<Login logged={logged} setLogged={setLogged} backend_url={backend_url} />} />    
        </Routes>
        <Footer setselectedSerie={setselectedSerie} pathname={pathname} footerContent={footerContent} typeR={typeR} />
      </div>
    </BrowserRouter>
  );
};

export default App;
