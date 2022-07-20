import { NETWORKS } from "@/constants";
import Usdt from "../../abis/ethereum/usdt";
import Usdc from "../../abis/ethereum/usdc";
import Dai from "../../abis/ethereum/dai";
import Uni from "../../abis/ethereum/uni";
import Sushi from "../../abis/ethereum/sushi";
import Weth from "../../abis/ethereum/weth";

const url = NETWORKS[1].scanUrl + "/address";

export default {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    abi: null,
    url: null,
    icon: require("@/assets/images/symbol/eth.svg"),
    iconPath: "token-eth",
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: Usdt.abi,
    url: `${url}/0xdac17f958d2ee523a2206206994597c13d831ec7`,
    icon: require("@/assets/images/symbol/usdt.svg"),
    iconPath: "token-usdt",
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: Usdc.abi,
    url: `${url}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
    icon: require("@/assets/images/symbol/usdc.svg"),
    iconPath: "token-usdc",
  },
  DAI: {
    name: "MakerDAO",
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: Dai.abi,
    url: `${url}/0x6B175474E89094C44Da98b954EedeAC495271d0F`,
    icon: require("@/assets/images/symbol/dai.svg"),
    iconPath: "token-dai",
  },
  UNI: {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    abi: Uni.abi,
    url: `${url}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`,
    icon: require("@/assets/images/symbol/uni.svg"),
    iconPath: "token-uni",
  },
  SUSHI: {
    name: "SushiSwap",
    symbol: "SUSHI",
    address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    abi: Sushi.abi,
    url: `${url}/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2`,
    icon: require("@/assets/images/symbol/sushi.svg"),
    iconPath: "token-sushi",
  },
  WETH: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: Weth.abi,
    url: `${url}/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
    icon: require("@/assets/images/symbol/weth.svg"),
    iconPath: "token-weth",
  },
};
