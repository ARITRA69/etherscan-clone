"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEthContext } from "@/context/eathContext";

type SearchResultProps = {
  accountAddress: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ accountAddress }) => {
  const { ethPrice } = useEthContext();
  const [balanceInWei, setBalanceInWei] = useState<string>("");
  const [balanceInEth, setBalanceInEth] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const balanceResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=balance&address=${accountAddress}&apikey=11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823`
        );
        if (balanceResponse.ok) {
          const balanceData = await balanceResponse.json();
          setBalanceInWei(balanceData.result);
          const balanceInEth = parseFloat(balanceData.result) / 1e18; // Convert Wei to Ether
          setBalanceInEth(balanceInEth.toFixed(5)); // Displaying 5 decimal places for Ether
        }
        const transactionsResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&apikey=11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823`
        );
        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const formatEthPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString();
  };

  return (
    <>
      {accountAddress ? (
        <div className="space-y-8">
          <h2 className="py-6 border-b">
            <span className="font-light text-lg">Address{"  "}</span>
            <span className="text-blue-500">{accountAddress}</span>
          </h2>
          <Card className="border">
            <CardHeader className="text-lg font-semibold">Overview</CardHeader>
            <CardContent className="flex flex-col gap-6 text-sm">
              <p className="flex flex-col gap-1 uppercase">
                <span className="opacity-70">ETH balance</span>
                <span>{balanceInEth} ETH</span>
              </p>
              <p className="flex flex-col gap-1 uppercase">
                <span className="opacity-70">ETH Value</span>
                <span>$ {formatEthPrice(ethPrice)}</span>
              </p>
            </CardContent>
          </Card>
          <h3 className="px-4 py-2 bg-blue-500 text-white w-max rounded-lg">
            Transactions
          </h3>
          <ul>
            {transactions.map((transaction: any, index: number) => (
              <li key={index}>
                From: {transaction.from}, To: {transaction.to}, Value:{" "}
                {transaction.value}, Hash: {transaction.hash}, Block:{" "}
                {transaction.blockNumber}, Age:{" "}
                {formatDate(transaction.timeStamp)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResult;
