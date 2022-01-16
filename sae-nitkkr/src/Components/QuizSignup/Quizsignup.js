import React, { useState } from "react";
// import logo from "./logo.svg";
import { FaInfoCircle} from "react-icons/fa";

import "./Quizsignup.css";

 function Quizsignup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    semester: "",
     referal: "", 
     });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // connect with firebase
  const SubmitData = async (ev) => {
    ev.preventDefault();
    const { name, email, phone, college, branch, semester,referal,transactionId } = userData;
      const res = fetch(
        "https://tryingquiz-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name, email, phone, college, branch, semester,referal,transactionId
          }),
        }
      );

      if (res) {
        setUserData({
          name: "", email:"", phone:"", college:"", branch:"", semester:"",referal:"",transactionId:""
        });
        alert("Data Stored");
      } 

  };
  const EnableButton = async (event) => {
    event.preventDefault();
    const { name, email, phone, college, branch, semester,referal } = userData;
  if (name && email && phone && college && branch && semester && referal){
    document.getElementById('payform-button2').disabled=false;
    document.getElementById('transaction').disabled=false;}
    else {
      alert("Please fill the data");
    
  }
}

  return (
    <>
      <p className="payform-heading">REGISTER FOR QUIZ</p>
      <div  className="payform-container">
        <div method="POST" className="payform-form">
          <div className="field">
            {" "}
            <span className="payform-label">Full Name * </span>
            <br />
            <input
              className="payform-input"
              type="text"
              alt="Name"
              name="name"
              id="amb_name"
              required="required"
              value={userData.name}
              onChange={postUserData}
            />{" "}
          </div>
          <div className="field">
            <span className="payform-label">Email id* </span>
            <br />
            <input
              className="payform-input"
              type="Email"
              name="email"
              id="amb_college"
              required="required"
              value={userData.email}
              onChange={postUserData}
            />{" "}
          </div>
          <div className="field">
            <span className="payform-label">Phone No. * </span>
            <br />
            <input
              className="payform-input"
              type="number"
              name="phone"
              required="required"
              value={userData.phone}
              onChange={postUserData}
            />
          </div>
          <div className="field">
            <span className="payform-label">College</span>
            <br />
            <input
              className="payform-input"
              type="text"
              required="unrequired"
              name="college"
              value={userData.college}
              onChange={postUserData}
            />{" "}
          </div>
          <div className="field">
            <span className="payform-label"> Branch </span>
            <br />
            <input
              className="payform-input"
              type="name"
              name="branch"
              required="unrequired"
              value={userData.branch}
              onChange={postUserData}
            />
          </div>
          <div className="field">
            {" "}
            <span className="payform-label"> Semester </span>
            <br />
            <input
              className="payform-input"
              type="email"
              name="semester"
              alt="semester"
              id=""
              required="unrequired"
              value={userData.semester}
              onChange={postUserData}
            />
          </div>

          <div className="field">
            {" "}
            <span className="payform-label"> Referal Code(optional code) </span>
            <br />
            <input
              className="payform-input"
              type="email"
              name="referal"
              alt=""
              id=""
              required="unrequired"
              value={userData.referal}
              onChange={postUserData}
            />
            &nbsp; &nbsp;
            <img
              src="https://img.icons8.com/ios/20/000000/info--v4.png"
              style={{ margin: "-6px" }}
            />
          </div>
          <br />
          <br />
          <button onClick={EnableButton}  className="payform-button">₹ &nbsp; Pay Now</button>

          <div className="field">
            {" "}
            <span  className="payform-label"> Transaction ID </span>
            <br />
            <input
            id="transaction"
              className="payform-input"
              type=""
              name="transactionId"
              alt=""
              disabled={true}
              required=""
            />
          </div>
          <br />

          <button disabled={true} onClick={SubmitData}  id="payform-button2" className="payform-button2">Confirm Registration</button>
        </div>
        <div className="payform-infocontain">
          <div className="payform-info">
          <FaInfoCircle /> &nbsp;
          Instructions 
            <p>
              * Make sure your email id is correct as you will be getting
              confirmation on that email
            </p>

            <p>
              * After clicking on Pay, <b>NOTE TRANSACTION ID </b>you get from
              RazorPay and add it to Transaction ID Field
            </p>

            <p>
              * Transaction ID Field will be <b>activated</b> when payment is
              made.
            </p>
          </div>
          <br />
          <div className="payform-checkbox">
            <input type="checkbox" id="" name="" value="" />
            <label for=""> I have read and understood the instructions</label>
            <br />
            <br />
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Quizsignup;
