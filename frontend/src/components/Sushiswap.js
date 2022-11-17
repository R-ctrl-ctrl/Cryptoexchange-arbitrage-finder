import React, { useEffect, useState } from 'react'
import { Box, Img, Input, Textarea } from '@chakra-ui/react'
import axios from 'axios'


const Sushiswap = () => {

  const[first,setfirst] = useState(0)
  const[second,setsecond] = useState()

  const fetchdata = async()=>{
    const d = await axios.get('/sushiswap')
    return d.data
  }

  const handlechange = async()=>{
    let currdata = await fetchdata()
    currdata = currdata * parseFloat(first)
    setsecond(currdata)
  }

  useEffect(()=>{
    handlechange()
    // alert(first * 2)
 },[first])


  return (
    <Box w="full" h="35vh">
    <Box  w="full" h="40%" display={"flex"} bg="blackAlpha.200" p={1}>
        <Input placeholder='0' onChange={(e)=>setfirst(e.target.value)} focusBorderColor='none' fontSize={"34px"} type="number" bg="transparent" resize={"none"} border={"none"} w="85%" h="90%"/>
        <Img w="15%" h="full" src="https://master-7rqtwti-vx5gsfvi2i4ce.us-2.platformsh.site/sites/default/files/2020-06/ethereum-logo1_1.png"/>
    </Box>


    <Box mt="2vh"  w="full" h="40%" display={"flex"} bg="blackAlpha.200" p={1}>
        <Input isDisabled={true} value={second} placeholder='0' focusBorderColor='none' fontSize={"34px"} type="number" bg="transparent" resize={"none"} border={"none"} w="85%" h="90%"/>
        <Img p={2} w="15%" h="full" src="https://b2broker.com/app/uploads/2019/12/multi-collateral-dai-dai-logo.png"/>
    </Box>    
  </Box>
  )
}

export default Sushiswap
