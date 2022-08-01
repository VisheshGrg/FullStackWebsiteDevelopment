import React, { useEffect, useState } from "react";
import db from "../../Firebase.js";
import saelogo from "../../Assets/SAELOGO.png";
import emailjs from "@emailjs/browser";

import "./RegistrationDetails.css";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer(black)/FooterBlack";

var flag = true;
function RegistrationDetails() {
  let timestamp = "";
  const [authorised_user, setauthorised_user] = useState({});
  useEffect(() => {
    console.log("run");
    flag = false;
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setauthorised_user(items);
    }
  }, []);

  const makePayment = async () => {
      const res = await initializeRazorpay();
      document.getElementById("payform-button1").disabled = true;
      document.getElementById("payform-button1").style.background = "grey";
      setTimeout(() => {
        document.getElementById("payform-button1").disabled = false;
        document.getElementById("payform-button1").style.background = "#1a3c7f";
      }, 10000);

      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }

      // Make API call to the serverless API
      const data = await fetch("http://localhost:3000/razorpay", {
        method: "POST",
      }).then((t) => t.json());

      console.log(data);
      var options = {
        key: "rzp_test_4N9UbRbW9Gp0Mt",
        name: "SAE NIT Kurukshetra",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for your test donation",
        image: { saelogo },
        handler: async (response) => {
          await handler(response);
          await set_to_database();
          console.log(options);
          window.location = `/register_confirmation/${timestamp}`;
        },
        prefill: {
          name: "SAE NIT Kurukshetra",
          email: "saenitkurukshetra@gmail.com",
          contact: "9650735458",
        },
      };

      const handler = async (response) => {
        alert(
          "Congratulations! You have registered successfully with payment ID: " +
            response.razorpay_payment_id +
            " and order ID: " +
            response.razorpay_order_id
        );

        authorised_user.orderid = response.razorpay_order_id;
        timestamp = response.razorpay_payment_id;
        authorised_user.paymentid = timestamp;
      };

      const set_to_database = async () => {
        sendEmail();
        const Saving_user_data = authorised_user;
        let gotit = await setDoc(
          doc(db, "paymentregistrationid", timestamp),
          Saving_user_data
        );
      };

      const sendEmail = () => {
        const toSend = {
          name: authorised_user.name,
          sem: authorised_user.semester,
          branch: authorised_user.branch,
          email: authorised_user.email,
          college: authorised_user.college,
          OrderId: authorised_user.orderid,
          PaymentId:authorised_user.paymentid,
          Phone: authorised_user.phone,
          QRCodeURL: `https://saenitkurukshetra.in/registered/${authorised_user.paymentid}`,
        };
        emailjs
          .send(
            "service_dqf2x44",
            "template_zezhpzf",
            toSend,
            "ulnoJlsECTLQyCRZ5"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    
      localStorage.removeItem('userData');
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="reg-details-heading">
        <h1 className="reg-details-h1">Registeration Details</h1>
        <button className="pay-btn" id="payform-button1" onClick={makePayment}>
          Pay Now
        </button>
      </div>

      <div className="reg-details">
        <table border={1} className="reg-details-table">
          <tr>
            <th>TITLES</th>
            <th>VALUES</th>
          </tr>
          <tr>
            <td className="td-first">NAME</td>
            <td>{authorised_user.name}</td>
          </tr>
          <tr>
            <td className="td-first">EMAIL</td>
            <td>{authorised_user.email}</td>
          </tr>
          <tr>
            <td className="td-first">COLLEGE</td>
            <td>{authorised_user.college}</td>
          </tr>{" "}
          <tr>
            <td className="td-first">BRANCH</td>
            <td>{authorised_user.branch}</td>
          </tr>
          <tr>
            <td className="td-first">SEMESTER</td>
            <td>{authorised_user.semester}</td>
          </tr>{" "}
          <tr>
            <td className="td-first">PHONE NO.</td>
            <td>{authorised_user.phone}</td>
          </tr>{" "}
          <tr>
            <td className="td-first">TIMESLOT</td>
            <td>{authorised_user.timeSlot}</td>
          </tr>{" "}
          <tr>
            <td className="td-first">REFERAL</td>
            <td>{authorised_user.referal}</td>
          </tr>{" "}
          <tr>
            <td className="td-first">AMOUNT</td>
            <td>{authorised_user.amount}</td>
          </tr>{" "}
        </table>
      </div>
      <Footer />
    </>
  );
}

export default RegistrationDetails;
