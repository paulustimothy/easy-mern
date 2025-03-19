import { useProductStore } from '@/store/product';
import { Container, VStack, Text, SimpleGrid} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
const HomePage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
      <Text
        fontSize={{ base: "22", sm: "28" }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient="to-r"
        gradientFrom={"cyan.400"}
        gradientTo={"blue.500"}
        bgClip={"text"}
      >Current Products 🚀
      </Text>

      <SimpleGrid columns={{ 
        base:1,
        md:2,
        lg:3
       }} 
       gap="30px"
       w={"1000px"}
       mt={10}
       >
        {products.map((product, index) => (
          <ProductCard key={product.id || `product-${index}`} product={product} /> // if product.id is not available, use the index
        ))}
      </SimpleGrid>

      {products.length == 0 && ( // if products is empty, show this text
        <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
        No products found 😢 {" "} {/* {" "} is for spacing*/}

        <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
          Create a product
          </Text>
        </Link>
        
      </Text>
      )}

      </VStack>
    </Container>
  )
}

export default HomePage