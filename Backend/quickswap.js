const qs = require('quickswap-sdk')
const ethers = require('ethers')

const alchemy = "https://polygon-mainnet.g.alchemy.com/v2/AA3sp49W3B2bBjiE7aPrJ7eVApTOYOMZ"
const daiaddress = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
const wethAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"



let qswapdata ;

const getdata = async (alchemy,daiaddress,wethAddress)=>{
    const provider =  new ethers.providers.JsonRpcProvider(alchemy)
    // const route = new qs.Route([pair],daiaddress)
    
    const dai = await  qs.Fetcher.fetchTokenData(1,daiaddress,provider)
    const weth = await qs.Fetcher.fetchTokenData(1,wethAddress,provider)

    const pair = await qs.Fetcher.fetchPairData(dai,weth,provider)
    const route = new qs.Route([pair],weth)

    qswapdata = route.midPrice.toSignificant(6)
    return qswapdata;
}

module.exports = {getdata}




