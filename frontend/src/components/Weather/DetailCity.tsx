import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { detailCity } from "../../redux/actions/Weather/actions";
import style from "./DetailCity.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import sunset from "../../assets/img/sunset.png";
import sunrise from "../../assets/img/sunrise.png";
import clock from "../../assets/img/clock.png";

export default function DetailCity() {
  const { latitud, longitud } = useParams() as {
    latitud: string;
    longitud: string;
  };
  const infoCity = useSelector((state: any) => state.city);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailCity(latitud, longitud));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const daily = infoCity.list;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  const getCurrentTime = (timezoneOffset: number) => {
    const localTime = new Date();
    const utcTime = localTime.getTime() + localTime.getTimezoneOffset() * 60000;
    const cityTime = new Date(utcTime + timezoneOffset * 1000);
    return cityTime.toLocaleTimeString();
  };

  const getSundown = (sunset: number) => {
    const date = new Date(sunset * 1000);
    return date.toLocaleTimeString();
  };

  const getSunRise = (sunrise: number) => {
    const date = new Date(sunrise * 1000);
    return date.toLocaleTimeString();
  };

  const formatWeatherData = (data: any) => {
    return data?.map((item: any, index: number) => {
      const date = new Date(item.dt * 1000);
      const hours = date.getHours();
      const day = week[date.getDay()];
      const tempCelsius = (item.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius and format to 2 decimal places
      return (
        <SwiperSlide key={index} className={style.weatherItem}>
          <p>
            {day} {hours}:00
          </p>
          <img
            className="imagen"
            src={
              "http://openweathermap.org/img/wn/" +
              item.weather[0].icon +
              "@2x.png"
            }
            width="40"
            height="40"
            alt=""
          />
          <p>{tempCelsius}°C</p>
          <p>{item.weather[0].description}</p>
        </SwiperSlide>
      );
    });
  };

  const cityTime = getCurrentTime(infoCity.city?.timezone);
  const sunDown = getSundown(infoCity.city?.sunset);
  const sunRise = getSunRise(infoCity.city?.sunrise);

  return (
    <div className={style.detailWeather}>
      <button
        className={style.backButton}
        onClick={() => window.history.back()}
      >
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/circled-left-2.png"
          alt="back button"
        />
      </button>
      <div className={style.intro}>
        <div className={style.nameCity}>{infoCity.city?.name}</div>
        <div className={style.hours}>
          <div className={style.time}>
            <img src={clock} alt="clock icon" /> {cityTime}
          </div>
          <section className={style.sunPosition}>
            <div className={style.time}>
              <img src={sunset} alt="sunset icon" /> {sunDown}
            </div>
            <div className={style.time}>
              <img src={sunrise} alt="sunrise icon" /> {sunRise}
            </div>
          </section>
        </div>
      </div>
      <div className={style.cards}>
        <div className={style.dailySecction}>
          <div className={style.containerDaily}>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className={style.swiper}
              navigation
            >
              {formatWeatherData(daily)}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
