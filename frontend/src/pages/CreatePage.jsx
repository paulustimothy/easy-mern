import { useColorModeValue } from "@/components/ui/color-mode"
import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"
import { toaster } from "@/components/ui/toaster"

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const {createProduct} = useProductStore();

  const handleCreateProduct = async() => {
    const {success, message} = await createProduct(newProduct);
      if (success){
        toaster.success({
          title: "Success",
          description: message,
          action: {
            label: "Close",
          },
        })
      }
      else{
        toaster.error({
          title: "Error",
          description: message,
          action: {
            label: "Close",
          },
        })
      }
      setNewProduct({name: "", price: "", image: ""})
  }

  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Create New Product
      </Heading>

      <Box
        w={"xl"} bg={useColorModeValue("white", "gray.900")}
        p={6} rounded={"lg"} shadow={"md"}
      >
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            variant="outline"
            name = 'name'
            value = {newProduct.name}
            onChange = {(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
            placeholder="Price"
            name = 'price'
            value = {newProduct.price}
            onChange = {(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
            placeholder="Image URL"
            name = 'image'
            value = {newProduct.image}
            onChange = {(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme={"blue"}
             w={"full"}
             onClick={handleCreateProduct}>
              Add Product
            </Button>
        </VStack>
      </Box>

    </VStack>
  </Container>
}

export default CreatePage