import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Chart = () => {
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {

  //   fetchChartData()
  //     .then(data => {
  //       setChartData(data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching chart data:", error);
  //     });
  // }, []);

  // const fetchChartData = async () => {
  //   try {

  //     const response = await fetch("api_endpoint");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch chart data");
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // };

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  return (
    <>
      <div className={styles.chart}>
        <Slider {...settings}>
          <div>
            <h3>FIRST CYCLE</h3>
          </div>
          <div>
            <h3>SECOND CYCLE</h3>
          </div>
          <div>
            <h3>THIRD CYCLE</h3>
          </div>
          <div>
            <h3>FORTH CYCLE</h3>
          </div>
          <div>
            <h3>FIFTH CYCLE</h3>
          </div>
          <div>
            <h3>SIXTH CYCLE</h3>
          </div>
          <div>
            <h3>SEVENTH CYCLE</h3>
          </div>
          <div>
            <h3>NINTH CYCLE</h3>
          </div>
          <div>
            <h3>TENTH CYCLE</h3>
          </div>
        </Slider>
      </div>
    </>
  );
};

{
  /* <Slider {...settings}> */
}
// {chartData.map((chart, index) => (
// <div key={index}>
//   <h3>{chart.title}</h3>
{
  /* Render your custom chart component here using the fetched data */
}
{
  /* Example: <CustomChartComponent data={chart.data} /> */
}
// </div>
// ))}
{
  /* </Slider> */
}

export default Chart;
