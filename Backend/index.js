const express = require('express');
const quickswap = require('./quickswap')
const sushiswap = require('./sushiswap')
const uniswap = require('./uniswap')
const app = express();
const port = 4000;

const alchemy = "https://polygon-mainnet.g.alchemy.com/v2/AA3sp49W3B2bBjiE7aPrJ7eVApTOYOMZ"
const daiaddress = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
const wethAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"


app.get('/',(req,res)=>{
    const obj = {
        name : "Cherko",
        age : "20"
    }
    res.send(obj)
})

let quickres ;
app.get('/quickswap',async(req,res)=>{
    quickres = await quickswap.getdata(alchemy,daiaddress,wethAddress)
    res.send(quickres)
})

let sushires;
app.get('/sushiswap',async (req,res)=>{
    sushires = await sushiswap.sushiTest()
    res.send(sushires)
})

let unires ;
app.get('/uniswap',async (req,res)=>{
    unires = await uniswap.mainWSS()
    res.send(unires)
})








app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});