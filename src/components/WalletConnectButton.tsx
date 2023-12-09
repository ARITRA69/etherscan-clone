"use client";
import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckCheck, Copy } from "lucide-react";

interface IProviderOptions {
  [key: string]: {
    package: any;
    options: {
      appName: string;
      infuraId: { [key: number]: string };
    };
  };
}

const providerOptions: IProviderOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Etherscan",
      infuraId: { 3: "https://sepoliafaucet.com/" },
    },
  },
};

const WalletConnectButton: React.FC = () => {
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });

      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );

      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider);

        const signer = web3ModalProvider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard
        .writeText(walletAddress)
        .then(() => {
          console.log("Address copied to clipboard!");
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error copying address:", error);
        });
    }
  };

  return (
    <div>
      {web3Provider === null ? (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      ) : (
        <div>
          {/* <p>: </p> */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Connected</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] mr-6">
              <DropdownMenuLabel>Wallet Address</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex items-center justify-between">
                <p>
                  {walletAddress
                    ? `${walletAddress.substring(0, 10)}...`
                    : "Loading..."}
                </p>
                <div className="p-2 hover:shadow-lg rounded-lg cursor-pointer">
                  {isCopied ? (
                    <CheckCheck size={15} color="green" />
                  ) : (
                    <Copy onClick={copyToClipboard} size={15} />
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
