import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { message } from "antd";

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  console.log("Add Product Modal Called");
  const history = useHistory();
  const [newProduct, setNewProduct] = useState({
    _id:"",
    Title: "",
    Handle: "",
    "Image Src": "",
    Vendor: "",
    Tags: "",
    "Variant SKU":"",
    "Shop location": 0,
    "Variant Price": 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "Shop location" 
          ? parseInt(value) || 0
          : name === "Variant Price"
            ? parseFloat(value)
            : value
    }));
  };

  const isFormComplete = () => {
    return (
      newProduct.Title?.trim() !== '' && 
      newProduct.Handle?.trim() !== '' && 
      newProduct["Variant SKU"]?.trim() !== '' && 
      newProduct["Image Src"]?.trim() !== '' && 
      newProduct.Vendor?.trim() !== '' && 
      newProduct.Tags?.trim() !== '' && 
      newProduct["Shop location"] >= 0 &&
      newProduct["Variant Price"] > 0
    );
  };

  const handleSubmit = async () => {
    console.log("Payload to send: ", newProduct);
    const authToken = sessionStorage.getItem('authToken') || "";
    try {
      const AddUserResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/`, 
        {
          "productData":newProduct,
          "eventState":"CREATE"
        }
        ,{
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        }
      });
      const addedProduct = {
        ...newProduct,
        "_id": AddUserResponse?.data?.id
      };
      setNewProduct(addedProduct);
      onAddProduct(addedProduct);
      console.log('New Product: ', addedProduct)
      onClose();
      // Reset form
      setNewProduct({
        _id:"",
        Title: "",
        Handle: "",
        "Image Src": "",
        Vendor: "",
        Tags: "",
        "Variant SKU":"",
        "Shop location": 0,
        "Variant Price": 0,
      });
      history.push("/admin/tables");
    } catch (error) {
      console.log('Failed due to', error)
      message.error(error?.response?.data?.message)
    }
    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Product Title</FormLabel>
            <Input
              name="Title"
              value={newProduct.Title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Handle</FormLabel>
            <Input
              name="Handle"
              value={newProduct.Handle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Product SKU</FormLabel>
            <Input
              name="Variant SKU"
              value={newProduct["Variant SKU"]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="Image Src"
              value={newProduct["Image Src"]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Vendor</FormLabel>
            <Input
              name="Vendor"
              value={newProduct.Vendor}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Categories (comma separated)</FormLabel>
            <Input
              name="Tags"
              value={newProduct.Tags}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Inventory Quantity</FormLabel>
            <Input
              name="Shop location"
              type="number"
              value={newProduct["Shop location"]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Price</FormLabel>
            <Input
              name="Variant Price"
              type="number"
              step="0.01"
              value={newProduct["Variant Price"]}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit}
            isDisabled={!isFormComplete()}>
            Add Product
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProductModal;
