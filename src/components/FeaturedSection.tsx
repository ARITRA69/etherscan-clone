"use client";
import React from "react";
import { PiGasCan } from "react-icons/pi";
import { useEthContext } from "@/context/eathContext";

const FeaturedSection = () => {
  const { ethPrice, gasPrice } = useEthContext();

  const formatEthPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };

  return (
    <div className="shadow-xl rounded-lg p-3 flex">
      <div className="flex w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div></div>
            <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p>Ether Price</p>
              <p>
                <span className="text-opacity-100 font-semibold">
                  ${formatEthPrice(ethPrice)}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p>Gas Price</p>
              <p>
                <PiGasCan />
                <span className="text-opacity-100 font-semibold">
                  {gasPrice} Gwei
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default FeaturedSection;
