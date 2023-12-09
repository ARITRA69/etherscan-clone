"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
} from "react";
import { fetchEthPrice, fetchGasPrice } from "../api/index";

interface EthContextProps {
  ethPrice: string;
  gasPrice: string;
}

interface Props {
  children: ReactNode;
}

const EthContext = createContext<EthContextProps>({
  ethPrice: "",
  gasPrice: "",
});

export const useEthContext = () => useContext(EthContext);

export const EthProvider: FC<Props> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ethPriceData = await fetchEthPrice();
        const gasPriceData = await fetchGasPrice();

        setEthPrice(ethPriceData?.result?.ethusd || "");
        setGasPrice(gasPriceData?.result?.ProposeGasPrice || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <EthContext.Provider value={{ ethPrice, gasPrice }}>
      {children}
    </EthContext.Provider>
  );
};
