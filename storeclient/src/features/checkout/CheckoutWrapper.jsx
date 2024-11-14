import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import Checkout from './Checkout'
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import agent from '../../header/api/agent';
import { setBasket } from '../basket/basketSlice';
import Loading from '../../header/layout/Loading';
const stripePromise = loadStripe('pk_test_51QHITbLX087rmk8kEXb1cTRhW6kV6BHrhQuVYBFYL2CziUlnpR3mAxoBYom0Yi7aehpB5CRnIefH1xomlG4KRw9y00tCjNqDHx');
const CheckoutWrapper = () => {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
          agent.Payments.createPaymentIntent()
          .then(basket=>dispatch(setBasket(basket)))
          .catch(error=>console.log(error))
          .finally(()=>setLoading(false))
  },[dispatch]);
  if(loading)return <Loading message="Loading Checkout"/>
  return (
   <Elements stripe={stripePromise}>
      <Checkout/>
   </Elements>
  )
}

export default CheckoutWrapper