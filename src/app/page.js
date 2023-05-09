"use client";

import styles from "./page.module.css";
import HomeScreen from "./screens/HomeScreen";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <ChakraProvider>
        <HomeScreen />
      </ChakraProvider>
    </main>
  );
}
