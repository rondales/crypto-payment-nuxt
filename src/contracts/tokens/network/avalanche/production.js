import { NETWORKS } from '@/constants'
import Usdt from '../../abis/avalanche/usdt'
import Usdc from '../../abis/avalanche/usdc'
import Wavax from '../../abis/avalanche/wavax'
import Erc20Abi from 'erc-20-abi'

const url = NETWORKS[43114].scanUrl + '/token'

export default {
  AVAX: {
    name: "Avalanche",
    symbol: "AVAX",
    address: null,
    abi: null,
    url: null,
    icon: require("@/assets/images/symbol/avax.svg"),
    iconPath: "crypto_currency/avax",
    iconType: "png"
  },
  "USDT.e": {
    name: "Tether USD",
    symbol: "USDT.e",
    address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    abi: Usdt.abi,
    url: `${url}/0xc7198437980c041c805A1EDcbA50c1Ce5db95118`,
    icon: require("@/assets/images/symbol/usdt.svg"),
    iconPath: "crypto_currency/usdt",
    iconType: "png"
  },
  "USDC.e": {
    name: "USD Coin",
    symbol: "USDC.e",
    address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    abi: Usdc.abi,
    url: `${url}/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664`,
    icon: require("@/assets/images/symbol/usdc.svg"),
    iconPath: "crypto_currency/usdc",
    iconType: "png"
  },
  WAVAX: {
    name: "Wrapped AVAX",
    symbol: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    abi: Wavax.abi,
    url: `${url}/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`,
    icon: require('@/assets/images/symbol/wavax.svg'),
    iconPath: "crypto_currency/wavax",
    iconType: "png"
  },
  aaBLOCK: {
    name: 'Blocknet',
    symbol: 'aaBLOCK',
    address: '0xC931f61B1534EB21D8c11B24f3f5Ab2471d4aB50',
    abi: Erc20Abi,
    url: `${url}/0xC931f61B1534EB21D8c11B24f3f5Ab2471d4aB50`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xC931f61B1534EB21D8c11B24f3f5Ab2471d4aB50/logo.png',
    iconPath: "crypto_currency/blocknet",
    iconType: "png"
  },
  'AAVE.e': {
    name: 'Aave Token',
    symbol: 'AAVE.e',
    address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
    abi: Erc20Abi,
    url: `${url}/0x63a72806098Bd3D9520cC43356dD78afe5D386D9`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x63a72806098Bd3D9520cC43356dD78afe5D386D9/logo.png',
    iconPath: "crypto_currency/aave",
    iconType: "png"
  },
  ACRE: {
    name: 'Arable Protocol',
    symbol: 'ACRE',
    address: '0x00EE200Df31b869a321B10400Da10b561F3ee60d',
    abi: Erc20Abi,
    url: `${url}/0x00EE200Df31b869a321B10400Da10b561F3ee60d`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x00EE200Df31b869a321B10400Da10b561F3ee60d/logo.png',
    iconPath: "crypto_currency/arable-protocol",
    iconType: "png"
  },
  agEUR: {
    name: 'agEUR',
    symbol: 'agEUR',
    address: '0x6feFd97F328342a8A840546A55FDcfEe7542F9A8',
    abi: Erc20Abi,
    url: `${url}/0x6feFd97F328342a8A840546A55FDcfEe7542F9A8`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x6feFd97F328342a8A840546A55FDcfEe7542F9A8/logo.png',
    iconPath: "crypto_currency/angle-protocol",
    iconType: "png"
  },
  AGF: {
    name: 'Augmented Finance',
    symbol: 'AGF',
    address: '0xb67a9374Da03d4114a6FB8f0E7F2b82b5cB34ee3',
    abi: Erc20Abi,
    url: `${url}/0xb67a9374Da03d4114a6FB8f0E7F2b82b5cB34ee3`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xb67a9374Da03d4114a6FB8f0E7F2b82b5cB34ee3/logo.png',
    iconPath: "crypto_currency/augmented-finance",
    iconType: "png"
  },
  AKITAX: {
    name: 'Akitavax',
    symbol: 'AKITAX',
    address: '0xE06fba763C2104dB5027F57f6A5Be0a0D86308af',
    abi: Erc20Abi,
    url: `${url}/0xE06fba763C2104dB5027F57f6A5Be0a0D86308af`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xE06fba763C2104dB5027F57f6A5Be0a0D86308af/logo.png',
    iconPath: "crypto_currency/akitavax",
    iconType: "png"
  },
  AMPL: {
    symbol: 'AMPL',
    name: 'Ampleforth',
    address: '0x027dbcA046ca156De9622cD1e2D907d375e53aa7',
    abi: Erc20Abi,
    url: `${url}/0x027dbcA046ca156De9622cD1e2D907d375e53aa7`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x027dbcA046ca156De9622cD1e2D907d375e53aa7/logo.png',
    iconPath: "crypto_currency/ampleforth",
    iconType: "png"
  },
  ANGLE: {
    name: 'ANGLE',
    symbol: 'ANGLE',
    address: '0xE6B9d092223f39013656702A40dbE6B7DeCc5746',
    abi: Erc20Abi,
    url: `${url}/0xE6B9d092223f39013656702A40dbE6B7DeCc5746`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xE6B9d092223f39013656702A40dbE6B7DeCc5746/logo.png',
    iconPath: "crypto_currency/angle-protocol",
    iconType: "png"
  },
  APEIN: {
    name: 'Ape In',
    symbol: 'APEIN',
    address: '0x938FE3788222A74924E062120E7BFac829c719Fb',
    abi: Erc20Abi,
    url: `${url}/0x938FE3788222A74924E062120E7BFac829c719Fb`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x938FE3788222A74924E062120E7BFac829c719Fb/logo.png',
    iconPath: "crypto_currency/ape-in",
    iconType: "png"
  },
  ARGON: {
    name: 'ArgonToken',
    symbol: 'ARGON',
    address: '0x1fE4751d9bDabaC8D90067056cB45AB6823d2C12',
    abi: Erc20Abi,
    url: `${url}/0x1fE4751d9bDabaC8D90067056cB45AB6823d2C12`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x1fE4751d9bDabaC8D90067056cB45AB6823d2C12/logo.png',
    iconPath: "crypto_currency/argon",
    iconType: "png"
  },
  AUSD: {
    name: 'Avaware USD',
    symbol: 'AUSD',
    address: '0x783C08b5F26E3daf8C4681F3bf49844e425b6393',
    abi: Erc20Abi,
    url: `${url}/0x783C08b5F26E3daf8C4681F3bf49844e425b6393`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x783C08b5F26E3daf8C4681F3bf49844e425b6393/logo.png',
    iconPath: "crypto_currency/avaware-usd",
    iconType: "png"
  },
  AVAI: {
    name: 'AVAI',
    symbol: 'AVAI',
    address: '0x346A59146b9b4a77100D369a3d18E8007A9F46a6',
    abi: Erc20Abi,
    url: `${url}/0x346A59146b9b4a77100D369a3d18E8007A9F46a6`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x346A59146b9b4a77100D369a3d18E8007A9F46a6/logo.png',
    iconPath: "crypto_currency/orca-avai",
    iconType: "png"
  },
  AVE: {
    name: 'Avaware',
    symbol: 'AVE',
    address: '0x78ea17559B3D2CF85a7F9C2C704eda119Db5E6dE',
    abi: Erc20Abi,
    url: `${url}/0x78ea17559B3D2CF85a7F9C2C704eda119Db5E6dE`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x78ea17559B3D2CF85a7F9C2C704eda119Db5E6dE/logo.png',
    iconPath: "crypto_currency/avaware",
    iconType: "png"
  },
  AVME: {
    name: 'AVME',
    symbol: 'AVME',
    address: '0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed',
    abi: Erc20Abi,
    url: `${url}/0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed/logo.png',
    iconPath: "crypto_currency/avme",
    iconType: "png"
  },
  AVXT: {
    name: 'Avaxtars Token',
    symbol: 'AVXT',
    address: '0x397bBd6A0E41bdF4C3F971731E180Db8Ad06eBc1',
    abi: Erc20Abi,
    url: `${url}/0x397bBd6A0E41bdF4C3F971731E180Db8Ad06eBc1`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x397bBd6A0E41bdF4C3F971731E180Db8Ad06eBc1/logo.png',
    iconPath: "crypto_currency/avaxtars-token",
    iconType: "png"
  },
  AXIAL: {
    name: 'AxialToken',
    symbol: 'AXIAL',
    address: '0xcF8419A615c57511807236751c0AF38Db4ba3351',
    abi: Erc20Abi,
    url: `${url}/0xcF8419A615c57511807236751c0AF38Db4ba3351`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xcF8419A615c57511807236751c0AF38Db4ba3351/logo.png',
    iconPath: "crypto_currency/axial",
    iconType: "png"
  },
  axlATOM: {
    name: 'Axelar Wrapped ATOM',
    symbol: 'axlATOM',
    address: '0x80D18b1c9Ab0c9B5D6A6d5173575417457d00a12',
    abi: Erc20Abi,
    url: `${url}/0x80D18b1c9Ab0c9B5D6A6d5173575417457d00a12`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x80D18b1c9Ab0c9B5D6A6d5173575417457d00a12/logo.png',
    iconPath: "crypto_currency/axelar-wrapped",
    iconType: "png"
  },
  axlUST: {
    name: 'Axelar Wrapped UST',
    symbol: 'axlUST',
    address: '0x260Bbf5698121EB85e7a74f2E45E16Ce762EbE11',
    abi: Erc20Abi,
    url: `${url}/0x260Bbf5698121EB85e7a74f2E45E16Ce762EbE11`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0x260Bbf5698121EB85e7a74f2E45E16Ce762EbE11/logo.png',
    iconPath: "crypto_currency/axelar-wrapped",
    iconType: "png"
  },
  BAVA: {
    name: 'BavaToken',
    symbol: 'BAVA',
    address: '0xe19A1684873faB5Fb694CfD06607100A632fF21c',
    abi: Erc20Abi,
    url: `${url}/0xe19A1684873faB5Fb694CfD06607100A632fF21c`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xe19A1684873faB5Fb694CfD06607100A632fF21c/logo.png',
    iconPath: "crypto_currency/bava-token",
    iconType: "png"
  },
  BLUE: {
    name: 'Blue Token',
    symbol: "BLUE",
    address: '0xc12e249FaBe1c5Eb7C558E5F50D187687a244E31',
    abi: Erc20Abi,
    url: `${url}/0xc12e249FaBe1c5Eb7C558E5F50D187687a244E31`,
    icon: 'https://raw.githubusercontent.com/pangolindex/tokens/main/assets/0xc12e249FaBe1c5Eb7C558E5F50D187687a244E31/logo.png',
    iconPath: "crypto_currency/tip-blue",
    iconType: "png"
  },
}