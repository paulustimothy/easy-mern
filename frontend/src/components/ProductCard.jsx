import { Box, Heading, HStack, IconButton, Image, Text, Button, CloseButton, Dialog, Portal, Input, Stack, Field } from '@chakra-ui/react'
import { useRef, useState } from "react"
import { MdDelete, MdEdit } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from '@/store/product';
import { toaster } from "@/components/ui/toaster"

const ProductCard = ({product}) => {

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const ref = useRef(null)
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDelete = async (pid) => {
        const {success, message} = await deleteProduct(pid);
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
    }

    const handleUpdate = async (pid, updatedProduct) => {
        const {success} = await updateProduct(pid, updatedProduct);
        if (success){
            toaster.success({
              title: "Success",
              description: "Product updated successfully",
              action: {
                label: "Close",
              },
            })
          }
          else{
            toaster.error({
              title: "Error",
              description: "Product not updated",
              action: {
                label: "Close",
              },
            })
          }
    }

  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s ease'
    _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
    bg={bg}
    >
        <Image src={product.image} alt={product.name}  h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>

                <Dialog.Root initialFocusEl={() => ref.current}>
                <Dialog.Trigger asChild>
                <IconButton colorPalette='blue'><MdEdit /></IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                        <Dialog.Title>Update Product</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                        <Stack gap="4">
                            <Field.Root>
                            <Field.Label>Product Name</Field.Label>
                            <Input 
                            ref={ref} 
                            value={updatedProduct.name} 
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            </Field.Root>
                            <Field.Root>
                            <Field.Label>Product Price</Field.Label>
                            <Input 
                            value={updatedProduct.price} 
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            </Field.Root>
                            <Field.Root>
                            <Field.Label>Product Image</Field.Label>
                            <Input 
                            value={updatedProduct.image} 
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                            </Field.Root>
                        </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                        <Button onClick={() => handleUpdate(product._id, updatedProduct)}>Save</Button>
                        </Dialog.ActionTrigger>
                        </Dialog.Footer>
                    </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
                </Dialog.Root>

                <Dialog.Root role="alertdialog">
                <Dialog.Trigger asChild>
                    <IconButton colorPalette='red'><MdDelete /></IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                        <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                        <p>
                            This action cannot be undone. This will permanently delete your
                            product.
                        </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button colorPalette="red" onClick={() => handleDelete(product._id)}>Delete</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
                </Dialog.Root>
            </HStack>
        </Box>

        

    </Box>
  )
}

export default ProductCard