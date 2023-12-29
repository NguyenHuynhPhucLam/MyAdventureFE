import React, {useState, useEffect} from "react";
import Chart from 'react-apexcharts';
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const Report = (props) => {
  const [bookings, setBookings] = useState([])
  const [adults, setAdults] = useState([])
  const [children, setChildren] = useState([])
  const [years, setYears] = useState([])
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [option, setOption] = useState("Customer Count")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/booking", requestOptions)
      .then(response => response.json())
      .then(result => setBookings(result))
      .catch(error => console.log('error', error));


      fetch("http://localhost:3001/adult", requestOptions)
      .then(response => response.json())
      .then(result => setAdults(result))
      .catch(error => console.log('error', error));

      fetch("http://localhost:3001/children", requestOptions)
      .then(response => response.json())
      .then(result => setChildren(result))
      .catch(error => console.log('error', error));
      
      fetch("http://localhost:3001/booking/booking-year", requestOptions)
      .then(response => response.json())
      .then(result => setYears(result))
      .catch(error => console.log('error', error));
  }, [])


  const RevenueInMonth = (month, year, bookings) => {
    let sum = 0;
    bookings.forEach(booking => {
      const date = new Date(booking.date);
      if(date.getMonth() === month && date.getFullYear() == year && booking.status !== "Cancelled" && booking.price!== undefined) {
        sum = sum + booking.price;
        console.log('booking.price', booking.price)
      }
    })

    return sum;
  }


  const RevenueInYear = (year) => {
    const revenues = [];
    for (let month = 0; month <= 11; month++) {
      const count = RevenueInMonth(month, year, bookings);
      revenues.push(count);
    }
      return revenues;
    }


    const CancelInMonth = (month, year) => {
      let count = 0;
      bookings.forEach(booking => {
        const date = new Date(booking.date);
        if(date.getMonth() === month && date.getFullYear() == year && booking.status === "Cancelled") {
          count++;
        }
      })
  
      return count;
    }
  
  
    const CancelInYear = (year) => {
      const CancelCounts = [];
      for (let month = 0; month <= 11; month++) {
        const count = CancelInMonth(month, year);
        CancelCounts.push(count);
      }
        return CancelCounts;
      }

  const CustomerCountInMonth = (month, year) => {
    let count = 0;
    bookings.forEach(booking => {
      const date = new Date(booking.date);
      if(date.getMonth() === month && date.getFullYear() == year && booking.status !== "Cancelled") {
        adults.forEach(adult => {
          if(adult.bookingDate === booking.date && booking.email === adult.bookingEmail) {
            count ++;
          }
        })

        children.forEach(child => {
          if(child.bookingDate === booking.date && booking.email === child.bookingEmail) {
            count ++;
          }
        })
      }
    })

    console.log("count" + count)

    return count;
  }


  const CustomerCountInYear = (year) => {
    const customerCounts = [];
    for (let month = 0; month <= 11; month++) {
      const count = CustomerCountInMonth(month, year);
      customerCounts.push(count);
    }
      return customerCounts;
    }

    const chartOptions = {
        chart: {
          type: 'bar',
        },
        series: [
          {
            name: 'Customer Count (people)',
            data: [],
          },
        ],
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', "June", "July", "August", "September", "October", "November", "December"],
        },
      };

      if (option === "Customer Count")
      {
        const customerCounts = CustomerCountInYear(year);
        chartOptions.series[0].data = customerCounts;
        chartOptions.series[0].name = 'Customer Count (people)'
      } else if (option === "Revenue") {
        const revenues = RevenueInYear(year);
        chartOptions.series[0].data = revenues;
        chartOptions.series[0].name = 'Revenue ($)'
      } else if (option === "Cancelled Booking Count") {
        const cancelCounts = CancelInYear(year);
        chartOptions.series[0].data = cancelCounts;
        chartOptions.series[0].name = 'Cancel Booking Count'
      }
    

  return (
    <div         
    style={{
      marginLeft: "10vw",
      marginRight: "10vw",
      marginBottom: "5vw",
    }}>

    <div
      style={{      
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",}}
      >
        <h1
          className={styles.titleText}
          style={{ fontSize: "2.5vw", fontWeight: "800", marginTop: "3%" }}
        >
          REPORT
        </h1>
      </div>

        <div className={styles.horizontal}>
          <div>
            <div className={styles.sub}>About:</div>
            <motion.select
                  className={styles.filterBox}
                  name="option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  <motion.option key="Customer Count" value="Customer Count">Customer Count</motion.option>
                  <motion.option key="Revenue" value="Revenue">Revenue</motion.option>
                  <motion.option key="Cancelled Booking Count" value="Cancelled Booking Count">Cancelled Booking Count</motion.option>
          </motion.select>
          </div>

          <div style={{marginLeft: "5vw"}}>
              <div className={styles.sub}>Year:</div>
              <motion.select
                    className={styles.filterBox}
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                  {years?.map((year, index) => (
                    <motion.option key={index} value={year}>{year}</motion.option>
                  ))}
            </motion.select>
          </div>
        </div>

      <div className={styles.title}>The chart about {option} in 2023</div>

      <div style={{marginTop: "2.5vw"}}>
        <Chart options={chartOptions} series={chartOptions.series} type="bar" height={300} />
      </div>
    </div>
  );
};

export default Report;

