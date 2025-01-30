import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function AddUser({reloading,setreloading,backend_url,errorMsg,setErrorMsg,SetnavSelect,seteditUser,editUser}) {
  const navigate = useNavigate()

  const [fullName , setFullName] = useState("")
  const [mail , setMail] = useState("")
  const [Phone , setPhone] = useState('')
  const [password , setpassword] = useState("")
  const [days , setDays] = useState('')

  const calcCounterDays= (date,number_of_days )=> {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + number_of_days);
    var currentDate = new Date(); 
    var differenceInMs = dd - currentDate;
    var diff =  Math.floor(differenceInMs / (24 * 60 * 60 * 1000));
    if (diff <= 0 ) {
      return -1 
    }else return diff
  }

  const [dayesLeft , setdayesLeft ] = useState(-1)
  useEffect(()=> {
    if (editUser != null) {
      setFullName( editUser['firstname']+"" + editUser['lastname']) 
      setMail(editUser['mail'])
      setPhone(editUser['phone_number'])
      setpassword(editUser['password'])
      setDays(editUser['duration'])     
      setdayesLeft(calcCounterDays(editUser['dur_start'],editUser['duration']))
    }
  },[])

            const [data , setData] = useState()
            const [update , setUpdate] = useState(false)
            useEffect(()=>{
                getData();
            },[update])       

            let getData = async () => {
              try {
                  let response = await fetch(`${"backend_url"}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  let data = await response.json();
                  setData(data);
              } catch (error) {
                  console.error("Error fetching or parsing data:", error);
              }
          };
          

             // Empty dependency array ensures this runs once when the component mounts
          
             const checkINpust = ()=> {
              return !(fullName == '' || password == '' || mail == ''  || Phone == 0 || Phone == '' ) 
             } 
             const clearINput = ()=> {
              setFullName('') 
              setMail('')
              setPhone('')
              setpassword('')
              setDays('')  
             }
             const setUser = async ()=> {  
      
              if (checkINpust () ) {
                setreloading(true)
                const DataForm= new FormData();
                var method = 'POST'     
                // var [fiN , laN] = fullName.split(" ")
                DataForm.append('firstname',fullName)
                DataForm.append('lastname', '')
                DataForm.append('phone_number', Phone )
                DataForm.append('mail', mail )
                DataForm.append('duration', days )
                DataForm.append('password', password )
                if (editUser != null) {
                  DataForm.append('id', editUser['id']  )
                  method = 'PUT'
                }
                await axios ({
                  method : method , 
                  url : `${backend_url}owner/user` ,
                  data :  DataForm
              })
              .then((response)=>{
                    let data = response.data ;
                    setreloading(false)
                    if (data['status'] == 1 ){
                    setErrorMsg(1) 
                    clearINput()
                    seteditUser(null)   
                  }
                  if (data['status'] == 0) {     
                    setErrorMsg(0)
                  }
                          
                  
              }).catch(function (error) {
                navigate('/InernalError')
                });
    
              }else {
                setErrorMsg(9)
              }
          
      }
     
      const handleCounterDays = (date,number_of_days )=> {
        
        var differenceInDays = calcCounterDays (date,number_of_days )
        if (differenceInDays < 0) {
          return <>
          {/* <p>مدة الصلاحية تبدأ من تاريخ {editUser['dur_start']}</p> */}
          <p>المدة منتهية</p>
          </>
      } else {
          return <p> {`المدة المتبقية: ${differenceInDays} يوم`}</p>; // Remaining duration in days
      }
      }
      const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update width when window resizes
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener to window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
 
 
  return (
    <div className='AddUser ownerPadding center'>

      {editUser != null ? 
        <div className='editMode'>
              <p>كلمة المرور لا تظهر لأسباب أمنية، يُرجى التأكد من تعديلها عن طريق إضافة كلمة مرور جديدة.</p>
              {handleCounterDays(editUser['dur_start'],editUser['duration'])}
          </div>
          : ''
      }
      <input className='bigInput' onChange={(e)=>setFullName(e.target.value)} value={fullName} placeholder='الاسم الكامل' />
      <input className='bigInput' onChange={(e)=>setMail(e.target.value)} value={mail} type='email' placeholder='البريد الإلكتروني : example@gmail.com' />
      <input className='bigInput' onChange={(e)=>setpassword(e.target.value)} value={password} type='' placeholder='كلمة المرور' />
      <input onChange={(e)=>setPhone(e.target.value)} value={Phone} className='bigInput' placeholder="أدخل رقم الهاتف" />
      <input onChange={(e)=>setDays(e.target.value)} value={days} className='bigInput'  placeholder='المدة بالأيام' />
      <div className='twobutns  center padding'>
        <button onClick={()=>setUser()} className='full rad20'>حفظ وإضافة آخر</button>
    </div>    </div>
  )
}
