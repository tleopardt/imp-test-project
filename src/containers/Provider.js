"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

function Provider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export default Provider;
