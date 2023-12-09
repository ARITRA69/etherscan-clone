"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ModeToggle } from "./themeToggle/ModeToggle";
import { PiGasCan } from "react-icons/pi";
import { Button } from "./ui/button";
import WalletConnectButton from "./WalletConnectButton";

interface Data {
  ethPrice: string;
  gasPrice: string;
}
//https://api-sepolia.etherscan.io/api?module=account&action=balance&address=0xCF26017222af2e32e870728cEFF4088B672D9D10&tag=latest&apikey=11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823
const Header: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = "11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.etherscan.io/api", {
          params: {
            module: "stats",
            action: "ethprice",
            apikey: API_KEY,
          },
        });
        console.log("API Response:", response.data.ProposeGasPrice);
        const gasResponse = await axios.get("https://api.etherscan.io/api", {
          params: {
            module: "gastracker",
            action: "gasoracle",
            apikey: API_KEY,
          },
        });

        setData({
          ethPrice: response.data.result.ethusd,
          gasPrice: gasResponse.data.result.ProposeGasPrice,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_KEY]);

  return (
    <div className="w-11/12 lg:w-2/3 mx-auto flex justify-between items-center py-3 border-b text-sm text-opacity-60">
      <div className="flex items-center gap-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1>
              EATH Price:{" "}
              <span className="text-[#2e90cf]">
                ${parseFloat(data?.ethPrice ?? "0").toFixed(2)}
              </span>
            </h1>
            <p className="flex items-center gap-1">
              <PiGasCan />
              Gas Price:{" "}
              <span className="text-[#2e90cf]">{data?.gasPrice} Gwei</span>
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-6">
        <ModeToggle />
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Header;
