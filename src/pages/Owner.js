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
export default function Owner({logged,backend_url}) {
  // const [content , setContent] = useState() 
  const [navSelect , SetnavSelect] = useState(15) 

  const [errorMsg , setErrorMsg] = useState(-1)

  const [serie , setSerie ] = useState(null)
  const [quiz , setquiz ] = useState(null)
  const [quizList , setquizList] = useState(null)
  const [questionList , setquestionList ] = useState([])

  const [editUser , seteditUser ] = useState(null) 


 

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

 useEffect(()=> {
    if (logged) {
      
    }
 },[logged])
  
  let content = <div></div>
  switch (navSelect) { 
    case 1 :
      content = <General  backend_url={backend_url} seteditUser={seteditUser}  SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      break ;
      case 2 :
        content = <AddUser editUser={editUser} seteditUser={seteditUser}  errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} SetnavSelect={SetnavSelect}  />
        break ;
        case 3 : 
        content = <AccNotActive setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;  
        case 4 : 
        content = <AccContacted setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 6 : 
        content = <AccNotCon setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 7 : 
        content = <Quizes setquizList={setquizList} quizList={quizList} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        case 8 :
        content = <AddSerie handleFileName={handleFileName} setquizList={setquizList} quizList={quizList} setquiz={setquiz} SetnavSelect={SetnavSelect} serieP={serie} setSerieP={setSerie} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 9 : 
        content = <SeriesRender setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;  
        case 10 :
        content = <Questions handleFileName={handleFileName} questionList={questionList} setquestionList={setquestionList} setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ;
        case 11 : 
        content = <QueDetail handleFileName={handleFileName} clearFields={clearFields} questionList={questionList} setquestionList={setquestionList}  setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        case 15 : 
        content = <HandleMails handleFileName={handleFileName} clearFields={clearFields} questionList={questionList} setquestionList={setquestionList}  setquiz={setquiz} quiz={quiz} setSerie={setSerie} serie={serie} SetnavSelect={SetnavSelect} errorMsg={errorMsg} setErrorMsg={setErrorMsg} backend_url={backend_url} />
        break ; 
        default :
      content  = <div>default {navSelect}</div>
}


  return (
    <div className='Owner center'>
        <div className='content scrollableSection'>
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
