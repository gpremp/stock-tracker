const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./src/db");
const { Stock } = require("./src/models/stock");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
// 

//     {
//       symbol: "AAPL",
//       companyName: "Apple Inc.",
//       price: 150.25,
//     },
//     {
//       symbol: "GOOGL",
//       companyName: "Alphabet Inc.",
//       price: 2800.50,
//     },
//     {
//       symbol: "TSLA",
//       companyName: "Tesla, Inc.",
//       price: 750.75,
//     },
//     {
//       symbol: "AMZN",
//       companyName: "Amazon.com, Inc.",
//       price: 3500.25,
//     },
//     {
//       symbol: "MSFT",
//       companyName: "Microsoft Corporation",
//       price: 300.40,
//     },
//     {
//       symbol: "FB",
//       companyName: "Meta Platforms, Inc.",
//       price: 325.10,
//     },
//     {
//       symbol: "NVDA",
//       companyName: "NVIDIA Corporation",
//       price: 200.15,
//     },
//     {
//       symbol: "JPM",
//       companyName: "JPMorgan Chase & Co.",
//       price: 150.75,
//     },
//     {
//       symbol: "V",
//       companyName: "Visa Inc.",
//       price: 250.60,
//     },
//     {
//       symbol: "WMT",
//       companyName: "Walmart Inc.",
//       price: 140.45,
//     },
//     {
//       symbol: "AAP",
//       companyName: "Advance Auto Parts, Inc.",
//       price: 230.30,
//     },
//     {
//       symbol: "NFLX",
//       companyName: "Netflix, Inc.",
//       price: 560.20,
//     },
//     {
//       symbol: "DIS",
//       companyName: "The Walt Disney Company",
//       price: 180.90,
//     },
//     {
//       symbol: "GS",
//       companyName: "The Goldman Sachs Group, Inc.",
//       price: 370.15,
//     },
//     {
//       symbol: "CSCO",
//       companyName: "Cisco Systems, Inc.",
//       price: 50.85,
//     },
//     {
//       symbol: "BA",
//       companyName: "The Boeing Company",
//       price: 230.25,
//     },
//     {
//       symbol: "IBM",
//       companyName: "International Business Machines Corporation",
//       price: 130.60,
//     },
//     {
//       symbol: "KO",
//       companyName: "The Coca-Cola Company",
//       price: 55.40,
//     },
//     {
//       symbol: "PEP",
//       companyName: "PepsiCo, Inc.",
//       price: 155.70,
//     },
//   ];

// const instersData = async(stocks) =>{
//  await Stock.insertMany(stocks)
// }
// instersData(stockData);

app.get("/",(req,res)=>{
  res.json("hello")
})
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find().catch((err) => {
      console.log(err);
    });
    let newStock = stocks.map((stock) => {
      const baseNumber = stock.price;
      const randomPercentage = Math.random() * 0.04 - 0.02;
      const randomNumber = baseNumber + baseNumber * randomPercentage;
      const difference = Math.abs(baseNumber - randomNumber);
      const average = (baseNumber + randomNumber) / 2;
      const percentageDifference = (difference / average) * 100;
      stock.price = randomNumber.toFixed(3);
      stock.priceChangePercent = percentageDifference.toFixed(3);
      return stock
    });
    res.json(newStock);
  } catch (error) {
    res.send({error:error})
  }
  
});

app.get("/api/stocks/:id", async (req, res) => {
  try {
    const id = req.params.id
    let stock
    if(id!='undefined'){
       stock = await Stock.findOne().catch((err) => {
        console.log(err);
      });
      const baseNumber = stock.price;
        const randomPercentage = Math.random() * 0.04 - 0.02;
        const randomNumber = baseNumber + baseNumber * randomPercentage;
        const difference = Math.abs(baseNumber - randomNumber);
        const average = (baseNumber + randomNumber) / 2;
        const percentageDifference = (difference / average) * 100;
        stock.price = randomNumber.toFixed(3);
        stock.priceChangePercent = percentageDifference.toFixed(3);
    }
    
    
    res.json(stock);
  } catch (error) {
    res.send({error:error})
  }
  
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
