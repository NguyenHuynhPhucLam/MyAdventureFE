import React from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import CustomerTextBox from "../../components/CustomerTextBox";
import { useLocation, useNavigate } from "react-router-dom";

const DetailBookingScreen = () => {
  const navigate = useNavigate();
  const location  = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const bookingID = searchParams.get('id');
  console.log(bookingID);

  let form = {
    transport: "",
    hotel: "",
    tour: "",
    address: "",
    departuretDate: "",
  };
  let user = {
    name: "Lê Thị Bích Hằng",
  };
  let tour = {
    id: "1234",
    departure: "Sài Gòn",
    destination: "Sapa",
    date: "05/10/2003",
    status_code: 1,
    status: ["Cancelled", "Waiting for handling", "Paid", "Confirmed"],
  };
  let statusBackgroundColor;
  if (tour.status_code == 0) {
    statusBackgroundColor = "#FF8139";
  } else if (tour.status_code == 1) {
    statusBackgroundColor = "#FFED8C";
  } else if (tour.status_code == 2) {
    statusBackgroundColor = "#66F235";
  } else if (tour.status_code == 3) {
    statusBackgroundColor = "#F5AE45";
  }

  // method:
  const handleTransportChange = (event) => {};

  const handleHotelChange = (event) => {};

  const handleTourChange = (event) => {};

  const handleAddressChange = (event) => {};

  const setDeparturetDate = (event) => {};
  return (
    <div className={styles.container}>
      <div className={styles.hi}>
        Hi, <span className={styles.mark}>Lê Thị Bích Hằng</span>
      </div>
      <div className={styles.welcome}>
        We are happy that you have chosen our company for your upcoming trips.
        We thank you very much and wish you a rewarding experience at
        MyAdventure!
      </div>
      <div className={styles.welcome} style={{ marginBottom: "5vh" }}>
        Here are all your booking and its status!
      </div>

      <div className={styles.mainContentContainer}>
        <div className={styles.title}>Your Booking #{tour.id}</div>

        <div className={styles.title} style={{ fontSize: "4vh" }}>
          {tour.departure} - {tour.destination}
        </div>

        <div
          className={styles.title}
          style={{
            textTransform: "capitalize",
            fontSize: "3vh",
          }}
        >
          Booking Date: {tour.date}
        </div>

        <div
          className={styles.statusContainer}
          style={{ backgroundColor: statusBackgroundColor }}
        >
          {tour.status[tour.status_code]}
        </div>

        {/* Modify & Cancel Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "5%",
          }}
        >
          <motion.button
            className={styles.optionBtn}
            style={{ backgroundColor: "#FF8139" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9, rotate: "25deg" }}
          >
            Cancel
          </motion.button>
          {tour.status_code == 1 ? (
            <motion.button
              className={styles.optionBtn}
              style={{ backgroundColor: "#66F235" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9, rotate: "-25deg" }}
              onClick={() => navigate("/detail-booking-modify")}
            >
              Modify
            </motion.button>
          ) : tour.status_code == 3 ? (
            <motion.button
              className={styles.optionBtn}
              style={{ backgroundColor: "#66F235", width: "15%" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9, rotate: "-25deg" }}
              onClick={() => navigate("/make-payment")}
            >
              Make Payment
            </motion.button>
          ) : (
            <></>
          )}
        </div>

        {/* Account Box */}
        <p className={styles.text}>
          We will contact or send notifications to you via this contact:
        </p>
        <motion.div
          className={styles.accountBox}
          // whileTap={{ opacity: 0.75, rotate: "1deg" }}
        >
          <img
            src={require("../../assets/icons/account.png")}
            alt="account"
            style={{ width: "2.5vw", height: "2.5vw", marginLeft: "2vw" }}
          />
          <div className={styles.signIn}>
            <div style={{ fontWeight: "600" }}>Lê Thị Bích Hằng</div>
            <div style={{ marginTop: "2vh" }}>21522041@gm.uit.edu.vn</div>
          </div>
        </motion.div>

        {/* Your Detail Booking */}
        <div
          style={{
            fontSize: "4vh",
            fontWeight: "bold",
            marginTop: "5vh",
          }}
        >
          Your detail booking
        </div>
        <div className={styles.note}>
          <img
            src={require("../../assets/icons/note.png")}
            alt="note"
            style={{ width: "2.3vw", height: "2.3vw", marginLeft: "2vw" }}
          ></img>
          <div style={{ marginLeft: "2vw", fontSize: "2.5vh" }}>
            You must check carefully to avoid the information errors
          </div>
        </div>

        {/* Booking Form */}
        <div className={styles.bookingForm} style={{ alignSelf: "center" }}>
          {/* 1. Customer's Information */}
          <div className={styles.heading1}>1. Customer's Information</div>
          <div className={styles.heading2}>a. Adult</div>
          <div className={styles.infoTag}>
            <CustomerTextBox name="Adult 1" type="adult" />
            <CustomerTextBox name="Adult 2" type="adult" />
          </div>
          <div className={styles.heading2} style={{ marginTop: "2vh" }}>
            b. Children
          </div>
          <div className={styles.infoTag}>
            <CustomerTextBox name="Children 1" />
            <CustomerTextBox name="Children 2" />
          </div>
        </div>

        <div className={styles.heading1} style={{ marginTop: "6vh" }}>
          2. Travel's Information
        </div>
        <div
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "5vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Departure-Destination:</div>
            <div style={{ fontSize: "3vh" }}>Sài Gòn - Sapa</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Kinds of transportation:</div>
            <div style={{ fontSize: "3vh" }}>Plane</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Range of hotel:</div>
            <div style={{ fontSize: "3vh" }}>3 stars</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Kinds of tour:</div>
            <div style={{ fontSize: "3vh" }}>Economy</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Pickup Address:</div>
            <div style={{ fontSize: "3vh" }}>
              123 Dinh Bo Linh, ward 6, Binh Thanh Dis, HCM City
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Expected departure date:</div>
            <div style={{ fontSize: "3vh" }}>10/10/2023</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Expected duration:</div>
            <div style={{ fontSize: "3vh" }}>5 days</div>
          </div>
        </div>

        {/*Transportation Information*/}
        <div
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "5vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div
              className={styles.heading2}
              style={{ fontSize: "4vh", fontWeight: "bold" }}
            >
              Transportation:
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Transportation's brand: </div>
            <div style={{ fontSize: "3vh" }}>Vietnam Airlines</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Departure Date: </div>
            <div style={{ fontSize: "3vh" }}>10/10/2023</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Departure Time: </div>
            <div style={{ fontSize: "3vh" }}>8:00 a.m</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Return Date: </div>
            <div style={{ fontSize: "3vh" }}>15/10/2023</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "4vh",
            }}
          >
            <div className={styles.heading2}>Return Time</div>
            <div style={{ fontSize: "3vh" }}>3:00 p.m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingScreen;
