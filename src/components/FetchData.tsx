"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const FetchData = () => {
  const [data, setData] = useState<any>(null);
  const API_KEY = "11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823";
  //   const address = "0x94AFAA68d51D27F89883dd8364793198ca9705Ad";

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

        const gasResponse = await axios.get("https://api.etherscan.io/api", {
          params: {
            module: "gastracker",
            action: "gasoracle",
            apikey: API_KEY,
          },
        });

        const marketCapResponse = await axios.get(
          "https://api.etherscan.io/api",
          {
            params: {
              module: "stats",
              action: "marketcap",
              apikey: API_KEY,
            },
          }
        );

        setData({
          ethPrice: response.data.result.ethusd,
          gasPrice: gasResponse.data.result.ProposeGasPrice,
          marketCap: marketCapResponse.data.result.market_cap,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_KEY]);
  return <></>;
};

export default FetchData;
