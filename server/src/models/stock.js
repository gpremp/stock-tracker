const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
	symbol: { type: String, required: true },
    companyName: { type: String, required: true },
    price: { type: Number, required: true },
    priceChangePercent : {type: Number,default : 0},
});

const Stock = mongoose.model("stocks", stockSchema);

module.exports = {Stock};