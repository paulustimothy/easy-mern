import { Container, Flex, Text, HStack, ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { Link } from "react-router-dom"

import { LuMoon, LuSun, LuSquarePlus  } from "react-icons/lu"

const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return <Container maxW={"1140px"} px={4}>
    <Flex 
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{ 
        base: "column",
        sm: "row"
       }}
       >

      <Text
        fontSize={{ base: "22", sm: "28" }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient="to-r"
        gradientFrom={"cyan.400"}
        gradientTo={"blue.500"}
        bgClip={"text"}
      >
        <Link to={"/"}>Product Store 🛒</Link>
      </Text>

      <HStack spacing={2} alignItems={"center"} >
        <Link to={"/create"}>
          <IconButton variant="outline">
            <LuSquarePlus />
          </IconButton>
        </Link>
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
          <IconButton onClick={toggleColorMode} variant="outline">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </ClientOnly>
      </HStack>

    </Flex>
  </Container>
}

export default Navbar