import React , {useState , useEffect } from 'react'
import General from '../ownerCompo/General'
import AddUser from '../ownerCompo/AddUser'
import AddSerie from '../ownerCompo/AddSerie'
import Questions from '../ownerCompo/Questions'
import QueDetail from '../ownerCompo/QueDetail'
import AccNotActive from '../ownerCompo/AccNotActive'
import RenderProfiles from '../ownerCompo/RenderProfiles'
import AccContacted from '../ownerCompo/AccContacted'
import AccNotCon from '../ownerCompo/AccNotCon'
import SeriesRender from '../ownerCompo/SeriesRender'
import Quizes from '../ownerCompo/Quizes'
import { useNavigate } from 'react-router-dom';
import HandleMails from './HandleMails'
import reloadImage from '../files/reloadImage.svg'
import axios from 'axios'

export default function Owner({isOwner,logged,backend_url}) {
  const navigate = useNavigate();
  // const [content , setContent] = useState() 
  const [navSelect , SetnavSelect] = useState(8) 

  const [errorMsg , setErrorMsg] = useState(-1)

  const [serie , setSerie ] = useState(null)
  const [quiz , setquiz ] = useState(null)
  const [quizList , setquizList] = useState(null)
  const [questionList , setquestionList ] = useState([])

  const [editUser , seteditUser ] = useState(null) 

  const [reloading , setreloading ] = useState(false)
 
  const [GoBack , setGoBack] = useState()

  const clearFields = ()=> {
    setErrorMsg(-1) 
    setquestionList(null)
    setquizList(null)
    setquiz(null)
    setSerie(null)
  }

  let errorDiv = <div></div>
  // eslint-disable-next-line default-case
  switch (errorMsg) {
    case -1 : 
      errorDiv = <div></div>
      break ;
    case 0 : 
    errorDiv =  <div className='error center error0'><p>البريد الإلكتروني موجود بالفعل. يرجى التأكد من إنشاء حساب باستخدام بريد إلكتروني آخر</p></div>
    break ; 
    case 1 : 
    errorDiv =  <div className='error center error1'><p>تم إضافة مستخدم الحساب بنجاح</p></div>
    break ; 
    // eslint-disable-next-line no-duplicate-case
    case 2 : 
      errorDiv =  <div className='error center error0'><p>لم يتم اختيار أيقونة. يرجى التأكد من رفع واحدة</p></div>
      break ; 
    // eslint-disable-next-line no-duplicate-case
    case 3 : 
      errorDiv =  <div className='error center error0'><p>لم يتم ملء العنوان أو الوصف </p></div>
      break ; 
      case 4 : 
      errorDiv =  <div className='error center error0'><p>تأكد من إضافة جميع الملفات </p></div>
      break ; 
      // eslint-disable-next-line no-duplicate-case
      case 5 : 
      errorDiv =  <div className='error center error1'><p>تم حذف العنصر بنجاح</p></div>
      break ; 
      // eslint-disable-next-line no-duplicate-case
      case 6 : 
      errorDiv =  <div className='error center error1'><p>تم حذف العنصر بنجاح</p></div>
      break ;    
      case 7 : 
      errorDiv =  <div className='error center error0'><p>error</p></div>
      break ; 
      case 8 : 
      errorDiv =  <div className='error center error1'><p>تم إضافة العنصر بنجاح</p></div>
      break ; 
      case 9 : 
      errorDiv =  <div className='error center error0'><p>one of the filed is empty</p></div>
      break ; 
      
    
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(-1)
      
      // Place your function logic here 
    }, 6000); // 30 seconds = 30000 milliseconds

    // Cleanup to avoid memory leaks if the component unmounts
    return () => clearTimeout(timer);
  }, [errorMsg]);
  const handleSelectNav = ()=> {
    SetnavSelect(8)
    clearFields()
  }

  const handleAddUser = ()=> {
    SetnavSelect(2)   
    seteditUser(null)
    clearFields()
  }

  

  const handleFileName = (name)=> {
    var nname = name + ''
    var rt = nname.split("/")
    // console.log(rt[0],rt,rt[rt.length -1 ],rt.length -1)
    return rt[rt.length -1 ]   
 }


 
 const submit = async () => {
   const user = localStorage.getItem('user')
   console.log('accessToken',user,user==null)
   if (user == null){
      navigate('/login');
     return 0 ;
    }
    const jsonObject = JSON.parse(user);
    console.log('not logged in',jsonObject)
    setreloading(true)
       const DataForm = new FormData();
       DataForm.append('user', jsonObject.id);
    
       try {
           const response = await axios({
               method: 'POST',
               url: `${backend_url}userlogin/check`,
               data: DataForm,
           });
   
           const data = response.data;
           console.log('dataaaaaaaa',data)
           setreloading(false)
           if (data.status === 0) {
              navigate('/login')
           }
           
       } catch (error) {
           console.error('Error during login:', error);
       }
   };

useEffect(()=> {
  submit()
},[])


 
  let content = <div></div>
  switch (navSelect) { 
    case 1 :
      content = <General setreloading={setreloading}  backend_url={backend_url} seteditUser={seteditUser}  SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      break ;
      case 2 :
        content = <AddUser setreloading={setreloading} editUser={editUser} seteditUser={seteditUser}  errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} SetnavSelect={SetnavSelect}  />
        break ;
        case 3 : 
        content = <AccNotActive setreloading={setreloading} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;  
        case 4 : 
        content = <AccContacted  setreloading={setreloading} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 6 : 
        content = <AccNotCon  setreloading={setreloading} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 7 : 
        content = <Quizes setreloading={setreloading}  setquizList={setquizList} quizList={quizList} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        case 8 :
        content = <AddSerie  GoBack={GoBack} setGoBack={setGoBack} reloading={reloading} setreloading={setreloading} handleFileName={handleFileName} setquizList={setquizList} quizList={quizList} setquiz={setquiz} SetnavSelect={SetnavSelect} serieP={serie} setSerieP={setSerie} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 9 : 
        content = <SeriesRender setreloading={setreloading} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;  
        case 10 :
        content = <Questions GoBack={GoBack} setGoBack={setGoBack} setreloading={setreloading} handleFileName={handleFileName} questionList={questionList} setquestionList={setquestionList} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 11 : 
        content = <QueDetail GoBack={GoBack} setGoBack={setGoBack} setreloading={setreloading} handleFileName={handleFileName} clearFields={clearFields} questionList={questionList} setquestionList={setquestionList}  setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        case 15 : 
        content = <HandleMails setreloading={setreloading} handleFileName={handleFileName} clearFields={clearFields} questionList={questionList} setquestionList={setquestionList}  setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        default :
      content  = <div>default {navSelect}</div>
}

// reloading 




useEffect(()=> {
  if (GoBack != -1 )
  // eslint-disable-next-line default-case
  switch(GoBack) {
    case 0 : 
    SetnavSelect(8) 
    break ;
    case 1 : 
    SetnavSelect(10) 
    break ;
    case 2 : 

    break ;


  }
},[GoBack])


  return (
    <div className='Owner center'>
        <div className='content scrollableSection'>
        { reloading ? 
        <div className='reloadSection center '   >
          <div class="loader"></div>
          </div>           
        : '' 
      }
             {errorDiv}
             {/* <div className='error center error1'><p>{errorMsg[1]}</p></div> */}
            {content}  
        </div>

        <div className='nav center'>
            <p className={(navSelect === 15) ? 'bigT one' : 'bigT'} onClick={()=> SetnavSelect(15)} >رسائل جديدة</p>
            <p className={(navSelect === 1) ? 'bigT one' : 'bigT'} onClick={()=> SetnavSelect(1)} >إدارة الحسابات</p>
            <p className={(navSelect === 2) ? ' one' : ''} onClick={()=> handleAddUser()} > {}إضافة حساب</p>
            <p className={(navSelect === 3) ? ' one' : ''}  onClick={()=> SetnavSelect(3)} >الحسابات غير المشتركة</p>
            <p className={(navSelect === 4) ? ' one' : ''}  onClick={()=> SetnavSelect(4)} >الحسابات تم التواصل معها</p>
            <p className={(navSelect === 6) ? ' one' : ''} onClick={()=>SetnavSelect(6)} >الحسابات لم يتم التواصل معها</p>
            <p className={(navSelect === 9) ? 'bigT one' : 'bigT'}  onClick={()=>SetnavSelect(9)}>محتوى السلاسل</p>
            <p className={(navSelect === 8) ? ' one' : ''} onClick={()=> handleSelectNav()} >إضافة سلسلة</p>
            <p className={(navSelect === 9) ? ' one' : ''} onClick={()=> SetnavSelect(9)} >جميع السلاسل</p>
        </div>
    </div>
  )
}
