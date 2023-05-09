import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea, 
  Flex
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function ListingForm({ isOpen, onClose, formData, onSubmit, loading }) {
  const { type, data } = formData
  const [edit, setEdit] = useState(false);
  const { register, reset: ResetForm, handleSubmit } = useForm();

  const modalTitle = () => {
    if (type === 'isDetail' && !edit) return data?.title
    else if (type === 'isDetail' && edit) return 'Edit Listing'
    else return 'Add Listing'
  }

  const sendData = (e) => {
    if (edit) {
      return onSubmit({...e, id: data.id})
    } else {
      return onSubmit(e)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      ResetForm()
      setEdit(false);
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(sendData)}>
          <ModalHeader>{modalTitle()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              type === 'isDetail' && !edit
                ? data?.body
                : <Flex direction='column' gap='10px'>
                  <Input {...register('title')} defaultValue={data?.title} placeholder='Title' />
                  <Textarea {...register('description')} defaultValue={data?.body} height='200px' placeholder='Description' />
                </Flex>
            }
          </ModalBody>

          <ModalFooter>
          { 
            type === 'isDetail' && !edit
              ? <Button colorScheme="yellow" onClick={() => setEdit(true)}>Edit Post</Button>
              : <Fragment>
                <Button mr={3} onClick={onClose}>Close</Button>
                <Button type='submit' colorScheme="blue" isLoading={loading}>{edit ? 'Edit' : 'Submit'}</Button>
              </Fragment>
          }
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ListingForm;
