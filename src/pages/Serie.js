import React , {useEffect , useState} from 'react' 
import Box from '../compoments/Box'
import motocycleIcon from '../files/motocycleIcon.png'
import { useNavigate } from 'react-router-dom';
import truck_section from '../files/truck_section.svg'
import car_section from '../files/car_section.svg'
import motocycle_section from '../files/motocycle_section.svg'
import bigTruck_section from '../files/bigTruck_section.svg'
import bus_section from '../files/bus_section.svg'

export default function Serie({backend_img,setreloading,selectType,categoryContent,selectedSerie,backend_url,setselectedSerie}) {
    const [title , setTitle ] = useState('')
    const [desc , setdesc ] = useState('')
    const [img , setimg ] = useState('') 
    
    const  licenceTypes =  ["A","B","C","CE","D"]

    

    useEffect (()=> {
        if (categoryContent != null) {
            setdesc(categoryContent['desc'])
            setTitle(categoryContent['title'])
            
            
        }
    },[categoryContent])

    const [ data , setData ] = useState()
    const navigate = useNavigate();
    let getData = async () => {
        var index = licenceTypes.indexOf(selectType)
        setreloading(true)
        let respons = await fetch (`${backend_url}course/content/${index}`)
        let data = await respons.json()
        setData(data)
        setreloading(false)
        window.scrollTo(0, 0);
         // eslint-disable-next-line default-case
         switch(selectType) {
            case 'A' : 
            setimg(motocycleIcon) 
            break ;
            case 'B' : 
            setimg(car_section) ;
            break ;   
            case 'C' : 
            setimg(truck_section)
            break ;
            case 'CE' : 
            setimg(bigTruck_section)
            break ;
            case 'D' : 
            setimg(bus_section)
            break ;
         }

    }
    useEffect(()=> {
        getData()
        window.scrollTo(0, 0);
    },[])
    

    const handleSettingSerie = (ob)=> {
        setselectedSerie(ob)
        window.scrollTo(0, 0);
        navigate('/quiz')
      }

      const startTest = ()=> {
        navigate('/quiz')
      }
  return (
    <div className='Serie padding padding_bottom'>
        <div className='HeaderSerie  center'>
            
            <div className='descpt center'>
                <h3>{title} </h3>
                <p>{desc}</p>
                {/* <div className='twobutns spacebetween'>
                    <button onClick={()=>startTest()} className='full rad20'>ابدأ السلسلة</button>
                </div> */}
            </div>
            <div className='image center'>
                <div className='containerImage center'>

                <img src={img} alt='' />
                </div>
            </div>
        </div>
        <div className='center gap'>
        {    
        data ? data['content'].map((ob,i)=> 
            <Box key={i} title={ob['title']} ob={ob} imgurl={backend_img+ob['icon']} handleSettingSerie={handleSettingSerie} />
        ) : ''
      }
     </div>
     {/* <div className='twobutns seeMore center padding'>
        <button className='full rad20'>عرض المزيد</button>
    </div> */}
    </div>
  )
}
