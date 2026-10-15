import userModel from "../models/userModels.js";
import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

export const showAddresses = async (req, res) => {
    const { id } = req.query;   // FIXED
    try {
      const user = await userModel.find({ _id : id});
      res.status(200).json({user});
    } 
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export const placeOrder = async (req, res) => {
    try {
      const { items, amount, address, paymentMethod, userId } = req.body;
      console.log(items, amount, address, paymentMethod, userId);
      
  
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized user" });
      }
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
        paymentMethod,
        payment: false,
        status: paymentMethod === "COD" ? "Confirmed" : "Pending",
      });
  
      await newOrder.save();  
      res.status(200).json({ success: true, message: "Order placed successfully", newOrder });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  //  Razorpay Order Creation
  export const createRazorpayOrder = async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ success: false, message: "Valid amount is required" });
      }

      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = {
        amount: Math.round(Number(amount) * 100), 
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      };
  
      const order = await instance.orders.create(options);
      res.status(200).json({ success: true, order, key: process.env.RAZORPAY_KEY });
    } catch (error) {
      console.error("Razorpay create-order error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  //  Verify Razorpay Payment & Update Stock
  export const verifyPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData,
      } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: "Missing payment verification parameters" });
      }
  
      const userId = req.user?.id || orderData?.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized user" });
      }

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign)
        .digest("hex");
  
      if (razorpay_signature === expectedSign) {
        const newOrder = new orderModel({
          userId,
          items: orderData?.items || [],
          amount: orderData?.amount || 0,
          address: orderData?.address || {},
          paymentMethod: "Razorpay",
          payment: true,
          status: "Confirmed",
        });
  
        await newOrder.save();  
        return res.status(200).json({ success: true, message: "Payment verified & order saved.", order: newOrder });
      } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Razorpay verify-payment error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };