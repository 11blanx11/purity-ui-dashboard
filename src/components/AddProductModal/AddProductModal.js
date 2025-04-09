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

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  console.log("Add Product Modal Called");
  const history = useHistory();
  const [newProduct, setNewProduct] = useState({
    Title: "",
    Handle: "",
    "Image Src": "",
    Vendor: "",
    Tags: "",
    "Shop location": 0,
    "Variant Price": 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "Shop location" || name === "Variant Price"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Payload to send: ", newProduct);
    onAddProduct(newProduct);
    onClose();
    // Reset form
    setNewProduct({
      Title: "",
      Handle: "",
      "Image Src": "",
      Vendor: "",
      Tags: "",
      "Shop location": 0,
      "Variant Price": 0,
    });
    history.push("/admin/tables");
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
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
