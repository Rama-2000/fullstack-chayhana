import userModel from "../models/userModel.js";

// Add items to user cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ succes: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error" });
  }
};

//Remove items from userCart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ succes: true, message: "Removed from card" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error" });
  }
};

//fetch user cart data

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ succes: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({succes:false,message:"Error"})
  }
};

export { addToCart, removeFromCart, getCart };
