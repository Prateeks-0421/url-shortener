const razorpay = require("../service/payment");

router.post("/create-order", async(req,res)=>{

    const options = {
        amount: 10, // ₹1
        currency: "INR",
        receipt: "receipt_1"
    };

    const order = await razorpay.orders.create(options);

    return res.json(order);
    
});