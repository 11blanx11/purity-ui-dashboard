// Chakra imports
import React, { useMemo, useState, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Button,
  Avatar,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon, AddIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import AddProductModal from "components/AddProductModal/AddProductModal.js";
import ProductsTableData from "variables/general.js";

console.log("Loading Admin Tables...");

const handleEdit = ({}) => {
  console.log("Edit Triggered...");
};

const TitleCell = ({ title, handle, image }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
      <Avatar src={image} w="50px" borderRadius="12px" me="18px" />
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {handle}
        </Text>
      </Flex>
    </Flex>
  );
};

const PriceCell = ({ price }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="row">
      <Text mr="4px" fontSize="md" color="gray.600" fontWeight="normal">
        INR
      </Text>
      <Text fontSize="md" color={textColor} fontWeight="bold">
        {price}
      </Text>
    </Flex>
  );
};

const InventoryCell = ({ inventory }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const outOfStockBg = useColorModeValue("gray.400", "#425270");
  // const inStockBg = useColorModeValue("green.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const inStock = inventory > 0 ? true : false;
  return (
    <Flex direction="column">
      <Badge
        bg={inStock === true ? "green.400" : outOfStockBg}
        color={inStock === true ? "white" : colorStatus}
        fontSize="16px"
        p="3px 10px"
        borderRadius="8px"
        width="fit-content"
      >
        {inStock === true ? "In Stock" : "Out of Stock"}
      </Badge>
      <Text
        mt="5px"
        color={colorStatus}
        fontSize="14px"
        fontWeight="black"
        p="2px 8px"
        borderRadius="8px"
        width="fit-content"
      >
        {inventory}/50
      </Text>
    </Flex>
  );
};

const ActionCell = ({ onEdit }) => {
  return (
    <Button p="0px" bg="transparent" variant="no-hover" onClick={handleEdit}>
      <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">
        Edit
      </Text>
    </Button>
  );
};

const initialData = {
  Title: "",
  Handle: "",
  "Image Src": "",
  Vendor: "",
  Tags: "",
  "Variant Inventory Qty": 0,
  "Variant Price": 0,
};

const Products = ({ title, captions, data }) => {
  const [productData, setProductData] = useState(initialData);
  const [sorting, setSorting] = useState([]);
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const textColor = useColorModeValue("gray.700", "white");
  const buttonbg = useColorModeValue("blue.400", "#1a202c");

  const columns = useMemo(
    () => [
      {
        accessorKey: "Title",
        header: "Product",
        cell: (info) => (
          <TitleCell
            title={info.row.original.Title}
            handle={info.row.original.Handle}
            image={info.row.original["Image Src"]}
          />
        ),
      },
      { accessorKey: "Vendor", header: "Vendor", enableSorting: true },
      { accessorKey: "Tags", header: "Category", enableSorting: false },
      {
        accessorKey: "Variant Inventory Qty",
        header: "Inventory",
        enableSorting: true,
        cell: (info) => <InventoryCell inventory={info.getValue()} />,
      },
      {
        accessorKey: "Variant Price",
        header: "Price",
        enableSorting: true,
        cell: (info) => <PriceCell price={info.getValue()} />,
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: () => <ActionCell onEdit={() => {}} />,
      },
    ],
    []
  );

  const addProduct = useCallback((newProduct) => {
    setProductData((prevData) => [...prevData, newProduct]);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              {title}
            </Text>
            <Button
              ms="20px"
              leftIcon={<AddIcon />}
              bg={buttonbg} // Note: you have "color="blue.400"" in your query
              color="white"
              size="sm"
              onClick={onAddModalOpen}
            >
              Add Product
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} my=".8rem" pl="0px" color="gray.400">
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      color="gray.400"
                      ps={header.index === 0 ? "0px" : null}
                      cursor={
                        header.column.getCanSort() ? "pointer" : "default"
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex align="center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <Icon
                            as={
                              header.column.getIsSorted() === "asc"
                                ? TriangleUpIcon
                                : header.column.getIsSorted() === "desc"
                                ? TriangleDownIcon
                                : null
                            }
                            ml={1}
                            w={3}
                            h={3}
                            visibility={
                              header.column.getIsSorted() ? "visible" : "hidden"
                            }
                          />
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  filter={
                    row.original["Variant Inventory Qty"] > 0
                      ? "none"
                      : "opacity(0.5)"
                  }
                  _hover={{
                    filter: "none",
                    opacity: 1,
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onAddProduct={addProduct}
      />
    </>
  );
};

export default Products;
