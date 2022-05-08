import React , {useEffect}from 'react'
import { Swiper, SwiperSlide} from "swiper/react";
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";
import { detailCity } from '../../redux/actions/Weather/actions';
import style from './DetailCity.module.css';
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay,EffectCoverflow, Pagination } from "swiper";


export default function DetailCity() {

  const {latitud, longitud} = useParams() as {latitud: string, longitud: string};
  const infoCity = useSelector((state:any) => state.city);

//console.log("INFOOO",infoCity)
    
const dispatch = useDispatch();

useEffect(() => {
  dispatch(detailCity(latitud, longitud))

// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);


  const daily = infoCity.daily 
  const hours = infoCity.hourly

const week = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const today = new Date().getDay();
const sortedDay = week.splice(today);

for (let i = 0; i < week.length; i++) {
  sortedDay.push(week[i]);
}
sortedDay.push(sortedDay[0]);

const hourNow = new Date().getHours();
const hoursTodayAndTomorrow = [];
for (let i = 0; i < 24; i++) {
  if (hourNow + i > 23) {
    hoursTodayAndTomorrow.push(hourNow + i - 24);
  } else {
    hoursTodayAndTomorrow.push(hourNow + i);
  }
}
const hours48 = [...hoursTodayAndTomorrow, ...hoursTodayAndTomorrow];

const hora = new Date().getHours();
const minutos = new Date().getMinutes();
const letras = hora < 12 ? "am" : "pm";


  return(
    <div className={style.detailWeather}>
  <div className={style.intro}>
       <div className={style.nameCity}>{infoCity.name}</div>
    <div className="horas">
         - {minutos < 9
            ? `${hora}:0${minutos}${letras}`
            : `${hora}:${minutos}${letras}`} -
        </div>
      </div>
      <div className={style.cards}>


      <Swiper
        slidesPerView={8}
        spaceBetween={5}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Pagination]}
        className={style.swiper}
      >
          {hours?.map((h:any, i:any) => (
            // <Hourly hour={hours48[i]} weather={h.weather} temp={h.temp} />
            <SwiperSlide>
         
      <div className={style.contentDaily}>
        {hours48[i] > 9 ? hours48[i] : `0${hours48[i]}`}
      <div>{h.temp}°c</div>
      <img
        className="imagen"
        src={"http://openweathermap.org/img/wn/" + h.weather[0].icon + "@2x.png"}
        width="40"
        height="40"
        alt=""
      />
      </div>
      
       </SwiperSlide>
          ))}
     
      </Swiper>

<div className={style.dailySecction}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className={style.swiperDaily}
      >
        <div className={style.containerDaily}>
          {daily?.map((d:any, i:any) => (

<SwiperSlide>
            <div className={style.contentDaily}>
  <h3>{sortedDay[i]}</h3>
  <img src={"http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png"} alt="img"  className={style.imgDaily}/>

  <div className={style.descriptionDaily}>{d.weather[0].description}</div>
  <div className={style.rowTemperature}>
        <div>
          <p>Min</p>
          <p>{d.temp.min}°c</p>
        </div>
        <div >
          <p>Max</p>
          <p>{d.temp.max}°c</p>
        </div>
    </div> 
    </div>
    </SwiperSlide>
          ))}
        </div>
      </Swiper>
      </div>
    </div>
        
  
  
  
    </div>



  )
}



 

