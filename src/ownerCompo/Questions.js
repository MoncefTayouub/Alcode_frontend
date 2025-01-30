import React , { useState , useEffect , useRef }from 'react'
import volum_full from '../files/volum_full.svg'
import blue_plus from '../files/blue_plus.svg'
import yellow_plus from '../files/yellow_plus.svg'
import audioExpLogo from '../files/audioExp.svg'
import image_logo from '../files/image_logo.svg'
import axios from 'axios'
import Quiz from '../pages/Quiz'
import { useNavigate } from 'react-router-dom'
import trash_blue from '../files/trash_blue.svg'


export default function Questions({setreloading,setGoBack,logged,handleFileName,questionList , setquestionList ,serie,quiz , setquiz,setSerie,SetnavSelect,backend_url,errorMsg,setErrorMsg}) {

  const navigate = useNavigate()

  const [audioContent , setAudioContent ] = useState(null)
  const [audioExp , setAudioExp ] = useState(null)
  const [imgC , setimgC ] = useState(null)
  const [imgCExp , setimgCExp ] = useState(null)
  const [imgContent , setimgContent ] = useState(['','','',''])


  
  const [editMode , setEditmode] = useState(0)
  const [checkFiles,setcheckFiles] = useState([-1,-1,-1,-1])

  const checkFields = ()=> {
    if (editMode) return 1 
    let state =   checkFiles.filter(item => item == 1 ).length
    // if (audioContent == null || audioExp == null || imgC == null) {
      if (state != 4) {
      setErrorMsg(4)
      return 0
    }else return 1 
  }
  // console.log(quiz)
//   const handleFileName = (name)=> {

//     var rt = name.split("/")
//     // console.log(rt[0],rt,rt[rt.length -1 ],rt.length -1)
//     return rt[rt.length -1 ]
//  }
  useEffect(()=> {
    if (quiz != null) {
      setEditmode(1)

      setimgContent([
        handleFileName(quiz['auidio_explaination']),
        handleFileName(quiz['audio_content']),
        handleFileName(quiz['picture']),
        handleFileName(quiz['correctAnswer']),

      ])
    }   
  },[])


  
  const HandlefileExtention = (file) => {

    if (file) {
      const validAudioTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/flac"];
      if (validAudioTypes.includes(file.type)) {
        return 1 ;
      } else {
        return 0;
      }
    } else {
      return -1 ;
    }
  };

  const handleimageExtension = (file) => {
    
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];   
      if (file) {
        if (validImageTypes.includes(file.type)) {
          return 1 ;
        } else {
          return 0;
        }
      } else {
        return -1 ;
      }
  
}

  useEffect(()=> {
    var arr = [ 
      HandlefileExtention(audioContent),
      
      HandlefileExtention(audioExp) ,
       handleimageExtension(imgC),
       imgCExp === null ? 1
    : handleimageExtension(imgCExp)  ,
  ]
  setcheckFiles(arr)
  },[imgC,audioExp,audioContent,imgCExp])


  // console.log(quiz)
  const setQuestions = (data)=> {

    var res = []
    data.map((ob,i)=>{
      var answers = []
      ob['answers'].forEach(element => {
          answers.push({
            content : element['content'] ,
             status : element['status'] ,
              id : element['id']
            })
      });
      res.push({
        question : ob['questions']['content'] , 
        explication : ob['questions']['explication'] ,
        answers : answers , 
        id : ob['questions']['id']
      })
    })
    setquestionList(res)
  }
  // const 

  
  const Submit = async ()=> {

    if (checkFields()) {
      
      var method = 'POST' 
      const DataForm= new FormData();
      DataForm.append('auidio_explaination',audioExp)
      DataForm.append('audio_content',audioContent)
      DataForm.append('picture',imgC)
      DataForm.append('serie',serie['id'])
      DataForm.append('correctAnswer',imgCExp)
      setreloading(true)
      if (editMode) {
        DataForm.append('id',quiz['id'])
        method = 'PUT'
      }
      await axios ({
        method : method ,   
        url : `${backend_url}owner/quiz` ,
        data :  DataForm
    })
  
    .then((response)=>{
      setreloading(false)
          let data = response.data
          // eslint-disable-next-line eqeqeq
          if (data['status'] == 1 ) {
            if (editMode) {
              setQuestions(data['content'])
              setEditmode(0)
            }
            SetnavSelect(11)
            setquiz(data['quiz'])
          }
          setErrorMsg(8)
          setimgContent(['','','',''])
        
    }).catch(function (error) {
      navigate('/InernalError')
      });
     
    }
  }
  

  const fileInputRef = useRef(null);
  const audEx = useRef(null);
  const imgCober = useRef(null);
  const imgCoberExp = useRef(null);

  const handleTextClick = (select) => {
    // eslint-disable-next-line default-case
    switch(select) {
      case 1 : 
        fileInputRef.current.click();
        break ;
      case 2 : 
        audEx.current.click()

        break ;
      // eslint-disable-next-line no-fallthrough
      case 3 : 
        imgCober.current.click() ;
        break ;
      // eslint-disable-next-line no-duplicate-case
      case 4 : 
        imgCoberExp.current.click() ;
        break ;
      }
  };

  const handleFileChange = (event,select) => {
    const file = event.target.files[0];
    if (file) {
      // eslint-disable-next-line default-case
      switch(select) {
        case 1 : 
          setAudioContent(file)
          break ;
        case 2 : 
         setAudioExp(file)
        // eslint-disable-next-line no-fallthrough
        break ;
        case 3 : 
          setimgC(file)
          break ;
        case 4 : 
         setimgCExp(file)
        break ;
        }
      
   }
  };



 const handleFileInput = (file , name , index ,content)=> {
    if (file == null ) 
        if (imgContent[index-1] == '')
          return   <>
                      <p onClick={()=>handleTextClick(index)}> {name}</p>
                    </> 
          else  return <p onClick={()=>handleTextClick(index)}> {imgContent[index-1]} </p>
    else return <p onClick={()=>handleTextClick(index)}> {file.name} </p>
 }

 const CircleBox = ({ text, colorClass , tpe , setGoBack }) => {  
  return (
    <div className="circle-box">
      <div onClick={()=>setGoBack(tpe)} className={`circle ${colorClass}`}></div>
      <p onClick={()=>setGoBack(tpe)} className="circle-text">{text}</p>
    </div>
  );
};


 const handledeleteImage =async ()=> {
    if (quiz != null) {
      
      var method = 'POST' 
      const DataForm= new FormData();
      
      DataForm.append('id',quiz['id'])
      setreloading(true)
      await axios ({
        method : method ,   
        url : `${backend_url}owner/clearImgExp` ,
        data :  DataForm
    })
  
    .then((response)=>{
      setreloading(false)
          let data = response.data
          
        
    }).catch(function (error) {
      navigate('/InernalError')
      });
    }
      imgCoberExp.current.value = null;
      setimgContent(prev => {
        const newArray = [...prev]; // Create a shallow copy of the array
        newArray[3] = ''; // Update index 3
        return newArray; // Set the new state
      });
 }

 return (
    <div className='Questions ownerPadding center '>
       
       <div className="frame">
        <CircleBox tpe={0} setGoBack={setGoBack} text="سلسلة" colorClass="yellow" />
        <CircleBox tpe={1} setGoBack={setGoBack}  text="اختبار" colorClass="yellow" />
        <CircleBox tpe={2} setGoBack={setGoBack}  text="أسئلة" colorClass="blue" />
      </div>
        <div className='hederTitle center end'>
          <h3>{ serie != null ? serie['title'] : '-' }  </h3>
          <p className='hederTitle-content'>عنوان السلسلة  </p>
        </div>
         {editMode ? <p className='errorDescBIG'>أنت الآن تقوم بتعديل الاختبار . لتغيير الصوت أو الصورة، تأكد من تعديلها بالنقر على النص أو الصورة أدناه. ترك أحدهما فارغًا لن يؤدي إلى تعديل النسخة السابقة، لكن إضافة عناصر جديدة سيقوم بذلك.</p> : ''}
        <div className='filesound center'>
             {handleFileInput(audioContent , 'اختر الصوت للسؤال',1)}
            {/* <p onClick={()=>handleTextClick(1)}> {audioContent == null ? 'اختر الصوت للسؤال' : audioContent.name} </p> */}
            <img onClick={()=>handleTextClick(1)} alt='' src={volum_full} />
            <input type='file' ref={fileInputRef} onChange={((e)=>handleFileChange(e,1))} style={{width : 0 , height :0 , display : 0 }} />
            <p className='messageError404'>
              {checkFiles[0] == 0 ? "الملف المحدد ليس ملفًا صوتيًا صالحًا" : ""}
            </p>
        </div>
        <div className='filesound center'>
            {handleFileInput(audioExp,'إضافة تفسير صوتي ',2)} 
            {/* <p onClick={()=>handleTextClick(2)}> {audioExp == null ? 'إضافة تفسير صوتي ' : audioExp.name} </p> */}
            <img onClick={()=>handleTextClick(2)} alt='' src={audioExpLogo} />
            <input type='file' ref={audEx} onChange={((e)=>handleFileChange(e,2))} style={{width : 0 , height :0 , display : 0 }} />
            <p className='messageError404'>
            {checkFiles[1] ==  0 ? "الملف المحدد ليس ملفًا صوتيًا صالحًا" : ""}
            </p>
        </div>
        <div className='filesound center'>
           {handleFileInput(imgC,'إضافة صورة غلاف للسؤال',3)}
            {/* <p onClick={()=>handleTextClick(3)}> {imgC == null ? 'إضافة صورة غلاف للسؤال ' : imgC.name} </p> */}
            <img onClick={()=>handleTextClick(3)} alt='' src={image_logo} />
            <input type='file' ref={imgCober} onChange={((e)=>handleFileChange(e,3))} style={{width : 0 , height :0 , display : 0 }} />
            <p className='messageError404'>
            {checkFiles[2] == 0 ? "الملف المحدد ليس ملفً صالحًا" : ""}
            </p>
        </div>   
        <div className='filesound center'>
           {handleFileInput(imgCExp,'إضافة صورة مع شروحات',4)}
           <div className='imgs center'>
           <img onClick={()=>handleTextClick(4)} alt='' src={image_logo}   />
           { imgCExp != null || imgContent[3] != '' ?<img onClick={()=>handledeleteImage()} className='trash'  alt='' src={trash_blue} />  : ''}
           </div>   
            <input type='file' ref={imgCoberExp} onChange={((e)=>handleFileChange(e,4))} style={{width : 0 , height :0 , display : 0 }} />
            <p className='messageError404'>
            {checkFiles[3] == 0 ? "الملف المحدد ليس ملفًا صالحًا" : ""}
            </p>
        </div> 
        <div className='twobutns  center padding'>
          <button onClick={()=> Submit()}  className='full rad20'>التالي</button>
      </div> 
  
    </div>
  )
}
