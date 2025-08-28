import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);
  const url = "https://foody-backend-bua3.onrender.com";
  
  const [data, setData] = useState({
    firstName:"", lastName:"", email:"", street:"", city:"", state:"", zipcode:"", country:"", phone:""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate('/cart');
  }, [token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach(item => {
      if(cartItems[item._id] > 0){
        orderItems.push({...item, quantity: cartItems[item._id]});
      }
    });
    try {
      const response = await axios.post(url + "/api/order/place", {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2
      }, { headers: { token } });

      if(response.data.success){
        window.location.replace(response.data.session_url);
      } else alert("Error placing order");
    } catch(err){
      alert("Something went wrong");
    }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First Name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email id" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details total">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
