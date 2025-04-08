import { React, useEffect, useState } from "react";
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
import { useSharedStyle } from "antd/es/input/style";

function EditProductModal({ isOpen, onClose, selectedProduct, onEditProduct }) {
    const [editedProduct, setEditedProduct] = useState(selectedProduct);
    console.log("Edit Product Modal Called");
    console.log('Selectd Product is: ', selectedProduct)
    const history = useHistory();

    // using to change whenever selectedProduct changes
    useEffect(()=>{
        setEditedProduct(selectedProduct);
    },[selectedProduct]);

    console.log('Edited pructL: ', editedProduct)

    const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
        ...prev,
        [name]:
        name === "Variant Inventory Qty" || name === "Variant Price"
            ? parseFloat(value)
            : value,
    }));
    };

    const handleSubmit = () => {
    console.log("Payload to send: ", editedProduct);
    onEditProduct(editedProduct);
    onClose();
    // history.push("/admin/tables");
    };

    return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl mb={3}>
            <FormLabel>Product Title</FormLabel>
            <Input
                name="Title"
                value={editedProduct.Title}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Handle</FormLabel>
            <Input
                name="Handle"
                value={editedProduct.Handle}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Image URL</FormLabel>
            <Input
                name="Image Src"
                value={editedProduct["Image Src"]}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Vendor</FormLabel>
            <Input
                name="Vendor"
                value={editedProduct.Vendor}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Tags (comma separated)</FormLabel>
            <Input
                name="Tags"
                value={editedProduct.Tags}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Inventory Quantity</FormLabel>
            <Input
                name="Variant Inventory Qty"
                type="number"
                value={editedProduct["Variant Inventory Qty"]}
                onChange={handleChange}
            />
            </FormControl>
            <FormControl mb={3}>
            <FormLabel>Price</FormLabel>
            <Input
                name="Variant Price"
                type="number"
                step="0.01"
                value={editedProduct["Variant Price"]}
                onChange={handleChange}
            />
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Edit Product
            </Button>
            <Button variant="ghost" onClick={onClose}>
            Cancel
            </Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    );
}

export default EditProductModal;
