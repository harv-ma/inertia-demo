import { ChakraProvider } from "@chakra-ui/react";

export default function Root({ children }: any) {
    return <ChakraProvider>{children}</ChakraProvider>;
}
