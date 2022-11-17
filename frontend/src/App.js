import './App.css';
import { Box, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Uniswap from './components/Uniswap';
import Sushiswap from './components/Sushiswap';
import Quickswap from './components/Quickswap';
import axios from 'axios'
import { useEffect, useState } from 'react';
function App() {


  const [minvalue, setminvalue] = useState()
  const [maxvalue, setmaxvalue] = useState()

  const [obj, setobj] = useState({ minexchange: "", maxexchange: "" })

  const fetchdata = async () => {

    const uniprice = await axios.get('/uniswap')
    const sushiprice = await axios.get('/sushiswap')
    const quickprice = await axios.get('/quickswap')

    const partobj = {}
    partobj[parseFloat(uniprice.data)] = "uniswap"
    partobj[parseFloat(sushiprice.data)] = "sushiswap"
    partobj[parseFloat(quickprice.data)] = "quickswap"

    let maxval = Math.max(parseFloat(uniprice.data), parseFloat(sushiprice.data), parseFloat(quickprice.data))
    let minval = Math.min(parseFloat(uniprice.data), parseFloat(sushiprice.data), parseFloat(quickprice.data))

    setminvalue(minval)
    setmaxvalue(maxval)

    setobj({ minexchange: partobj[minval], maxexchange: partobj[maxval] })



  }






  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <Box flexDir={"column"} p={5} bg="blackAlpha.800" h="100vh" w="100vw" display={"flex"} justifyContent="center" alignItems={"center"}>
      <Box h="75%" w="75%" display={"flex"} flexDir="column" alignItems={"center"} justifyContent="space-evenly" >
        <Heading color={"white"} mt="2vh"> Check different market prices & buy cheapest</Heading>
        <Box bg="white" borderRadius={"10px"} w="60%" h="65%" p={4} >
          <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList>
              <Tab w="25%">Uniswap</Tab>
              <Tab w="25%">Sushiswap</Tab>
              <Tab w="25%">Quickswap</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Uniswap />
              </TabPanel>
              <TabPanel>
                <Sushiswap />
              </TabPanel>
              <TabPanel>
                <Quickswap />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
      <Box>
        <Box>
        </Box>
      </Box>
      <Box>
        {
          !minvalue &&
          <Box>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='black'
            color='white'
            size='xl'
          />
          <Text color="white" fontSize={"16px"}>loading ...</Text>
            </Box>
        }

        {
          minvalue &&
          <Box>
            <Text color={"white"} fontSize="24px"> Best Exchange for Buying is <b>{obj.minexchange}</b>  at <b> {parseFloat(minvalue).toFixed(2)} DAI/WETH</b> </Text>
            <Text color={"white"} fontSize="24px"> Best Exchange for Selling is <b>{obj.maxexchange}</b> at <b>{parseFloat(maxvalue).toFixed(2)} DAI/WETH</b> </Text>
            <Text color={"white"} fontSize="24px">Net Profit in  deal <b>{parseFloat(maxvalue - minvalue).toFixed(2)} DAI/WETH </b></Text>
          </Box>
        }
      </Box>
    </Box>
  );
}

export default App;
