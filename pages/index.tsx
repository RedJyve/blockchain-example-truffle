import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import { load } from '../src/utils';

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [accountAddress, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [items, setItems] = React.useState<any[]>([]);

  

  // Handlers

  const handleInputChange = (e:any) => setInput(e.currentTarget.value);
  const handleAddItem = async () => {
    await contract.addItem(input, {from: accountAddress});
    setInput('');
    setRefresh(true);
  };
  const handleToggled = async (id: number) => {
    await contract.buyItem(id, {from: accountAddress});
    setRefresh(true);
  };


  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddresAccount(e.accountAddress);
      setItems(e.items);
      setContract(e.groceryListContract);
    });
  });

  return (
    <VStack>
        <Head>
          <title>Grocery List</title>
          <meta name="description" content="Blockchain Grocery List." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HStack w='full'>
          <Spacer />
          <VStack>
            <Heading>Blockchain Grocery List</Heading>
            <Box h='30px'/>
            <HStack w='md'>
              <Input
              type='text'
              size='md'
              placeholder='New Item...'
              onChange={handleInputChange}
              value={input}
              />
              <Button onClick={handleAddItem} bg='green.200'>ADD</Button>
            </HStack>
            <Box h='30px' />
            <Text>Grocery List</Text>
            {
              items == null ? <Spinner />
              : items.map((item, idx) => !item[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{item[1]}</Text>
                <Spacer />
                <Button bg='green.300' onClick={ () => handleToggled(item[0].toNumber()) }>BUY</Button>
              </HStack> : null
              )
            }
            <Box h='10px' />
            <Text>Items Bought</Text>
            {
              items == null ? <Spinner /> :
              items.map((item, idx) => item[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{item[1]}</Text>
                <Spacer />
                <Button bg='red.300' onClick={ () => handleToggled(item[0].toNumber() ) }>NEED AGAIN</Button>
              </HStack> : null
              )
            }
          </VStack>
          <Spacer />
        </HStack>
    </VStack>
  )
}

export default Home