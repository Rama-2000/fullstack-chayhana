import React, { useEffect, useState } from "react";
import "./CompletedOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const CompletedOrders = ({ url }) => {
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchCompletedOrders = async () => {
    const response = await axios.get(`${url}/api/order/completed`);
    if (response.data.success) {
      setCompletedOrders(response.data.data);
    } else {
      toast.error("Error fetching completed orders");
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div className="completed-orders add">
      <h3>Completed Orders</h3>
      <div className="completed-order-list">
        {completedOrders.map((order, index) => (
          <div key={index} className="completed-order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="completed-order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className="completed-order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="completed-order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="completed-order-item-phone">{order.address.phone}</p>
              <p className="completed-order-item-payment">
                Payment Method: {order.paymentMethod}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>{order.amount} ₽</p>
            <p className="completed-status">Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders;