import React , {useState , useEffect} from 'react'
import leftBarLogin from '../files/leftBarLogin.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useNavigationHistory } from './NavigationHistoryProvider';


export default function Login({backend_url,setLogged,logged}) {
    const navigate = useNavigate();
    const [resp , setresp] = useState(false)


    const [username , setUsername] = useState('')
    const [password , setpassword] = useState('')
    const [error , setError ] = useState('')

    const submit = async () => {
      if (username === '' || password === '') {
          setError('تأكد من أن اسم المستخدم وكلمة المرور غير فارغين');
          return;
      }
      
      const DataForm = new FormData();
      DataForm.append('username', username);
      DataForm.append('password', password);
      setresp(true)
      try {
          const response = await axios({
              method: 'POST',
              url: `${backend_url}userlogin`,
              data: DataForm,
          });
  
          const data = response.data;
          setresp(false)
          setLogged(data.status)
          if (data.status === 1) {
              // Store JWT in localStorage
              const { jwt } = data;
              localStorage.setItem('accessToken', jwt.access);
              localStorage.setItem('refreshToken', jwt.refresh);
              localStorage.setItem('user', JSON.stringify({
                  id: jwt.user_id,
                  username: jwt.username, 
              }));
  
              // Reset username and password fields
              setUsername('');
              setpassword('');
  
              navigate('/'); 
              
          } else if (data.status === 0) {
              setError('اسم المستخدم أو كلمة المرور غير صحيحة');
          }
      } catch (error) {
          console.error('Error during login:', error);
        navigate('InernalError')
          setError('An error occurred during login. Please try again.');
      }
  };
  
 

  return (
    <div className='Login center'>
        <p>{error}</p>
        
      <img className='imgLogin' src={leftBarLogin} alt='' />
      <input className='bigInput' onChange={(e)=>setUsername(e.target.value)} value={username}  placeholder='username' />
      <input className='bigInput' type='password' onChange={(e)=>setpassword(e.target.value)} value={password}  placeholder='password' />
      <div className='twobutns  center padding'>
        <button  className='full rad20' onClick={()=>submit()} >{resp ? '...' :'تسجيل'}</button>
    </div>     
    </div>
  )
}
