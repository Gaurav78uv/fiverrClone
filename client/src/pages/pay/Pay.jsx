import React, { useState,useEffect } from 'react'
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useParams}  from "react-router-dom";
import CheckOutForm from '../../components/checkOutForm/CheckOutForm';
import newRequest from "../../utils/newRequest.js";
const stripePromise = loadStripe("pk_test_51NSchOSEulWAqTnAOtBnSH4g7RDSWungccn4APFAUL3yI9kIA8SsHsZQJ5pGDFajs2AOgiA8ExRtBJiKf9Iympl500ihKZhsFd");
export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");
  const {id} = useParams();
  useEffect(()=>{
    const makeRequest = async()=>{
        try{
            const res = await newRequest.post(
                `/orders/create-payment-intent/${id}`
            );
            setClientSecret(res.data.clientSecret);
        }catch(err){
            console.log(err);
        }
    };
    makeRequest();
  },[]);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  )
}
