import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import ListingForm from "./components/ListingForm";
import styles from "./home.module.css";
import { getComments, getListings, postComments, postListings, updateComments, updateListings } from "~/service/listing";
import { sendMessage } from "~/utils/message";

function HomeScreen() {
  const [formData, setFormData] = useState({
    type: '',
    data: null
  });
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openForm = (val) => {
    setFormData(val);
    onOpen();
  }
  
  const getAllData = async () => {
    const allPromise = Promise.all([
      getListings(),
      getComments()
    ])

    const promises = await allPromise;
    
    const listingData = promises[0].data.map((val) => {
      const body = promises[1].data.filter((x) => x.id === val.id)
      
      return {...val, body: body.length !== 0 ? body[0].body : ''}
    })

    setListing(listingData);
  }

  const addListing = async (data) => {
    setLoading(true);

    const listingBody = {
      id: listing.length + 1,
      title: data.title
    };

    const commentsBody = {
      id: listing.length + 1,
      body: data.description
    }

    const allPromise = Promise.all([
      postListings(listingBody),
      postComments(commentsBody)
    ])

    const promises = await allPromise;

    if (promises) {
      onClose();
      sendMessage(200);
      setLoading(false);
      getAllData();
    }
  }

  const editListing = async (data) => {
    setLoading(true);

    const listingBody = {
      id: data.id,
      title: data.title
    };

    const commentsBody = {
      id: data.id,
      body: data.description
    }

    const allPromise = Promise.all([
      updateListings(listingBody),
      updateComments(commentsBody)
    ])

    const promises = await allPromise;

    if (promises) {
      onClose();
      sendMessage(200);
      setLoading(false);
      getAllData();
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <Box className={styles.wrapper}>
      <Text className={styles.sectionText}>Listing Post</Text>
      <Text className={styles.regularText}>Add new post by clicking button below</Text>

      <Button colorScheme="blue" onClick={openForm}>Add new post</Button>

      <ListingForm 
        formData={formData} 
        setFormData={setFormData} 
        isOpen={isOpen} 
        onClose={onClose} 
        loading={loading} 
        onSubmit={formData.type === 'isDetail' ? editListing : addListing} />

      <Flex
        flexFlow="row wrap"
        alignItems="center"
        gap="10px"
        justifyContent="space-evenly"
        width="100%"
        paddingY="10px"
      >
        {
          listing.length !== 0
            ? listing.map((val, index) => (
              <Box className={styles.card} key={index} onClick={() => openForm({ type: 'isDetail', data: val })}>
                {val.title}
              </Box>
            ))
            : <Text className={styles.regularText}>Loading ...</Text>
        }
      </Flex>
    </Box>
  );
}

export default HomeScreen;
