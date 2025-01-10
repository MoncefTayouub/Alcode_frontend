
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const backend_url = 'http://127.0.0.1:8000/'


export const submitData = async (DataForm, method, url) => {
  
  

    let data = null 
       await axios ({
      method : method , 
      url : backend_url+url ,
      data :  DataForm
  })
  .then((response)=>{
        console.log(response.data) ;
        data = response.data  
        return 1 
      
  }) .catch(function (error) {
    });
    return data 
  };
  
