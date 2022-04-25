export const TOTAL_RAISE = 40000;

export enum ChainID {
    BSC = 56,
    BSC_TESTNET = 97,

    AVAX = 0,
    AVAX_TESTNET = 43113,

    POLY = 0,
    POLY_TESTNET = 80001,

    FTM = 0,
    FTM_TESTNET = 4002,
}

export const CHAINS = [ChainID.BSC_TESTNET, ChainID.AVAX_TESTNET, ChainID.FTM_TESTNET, ChainID.POLY_TESTNET];

interface IContracts {
    [key: number]: { [key: string]: string };
  }

export const Contracts:IContracts = {
    [ChainID.BSC_TESTNET]: {
        PRESALE : "0x91bfd2fe1f4974e6f73ec34de56ee3272ca281cb",
        USDT: "0x9B90388F9A727622DE07988580E2D5f5D5E64368",
        USDC: "0x550d999a47954f859541Cb2Bc24CbAb7C9CAfe31",
        BUSD: "0xa90214368b49c1D0D7921bee2A433C1293Eba13c",
    },  
    [ChainID.POLY_TESTNET]: {
        PRESALE: "0x261898D6e55C0A6B4842a214c61E870adE3daf8e",
        USDT: "0x41A74cbdfB815dc47e8F130AE6f27710adCd98b3",
        USDC: "0x00c1b9E490452cEe0d3d90c9778b32657d304327",
        BUSD: "0x95E40788c5990Ea749aC8117cA03eC6E0E91f3eF",
    },
    [ChainID.AVAX_TESTNET]: {
        PRESALE: "0xbbb2BA6F2Eb5Acaf2ca29338839566E69AdbcC98",
        USDT: "0xa90214368b49c1D0D7921bee2A433C1293Eba13c",
        USDC: "0x524d792C5C474362DD12Bc530B2c2DF7BB074cCD",
        BUSD: "0x919dd23f4bB6F7c92b466aC232e6487132f4DA0f",
    },
    [ChainID.FTM_TESTNET]: {
        PRESALE: "0x13dD0b14AA28f97154ab13d8df837305490eEb26",
        USDT: "0x5D76268bE65e59D99C29Bd3493F2178bE941F873",
        USDC: "0x997924baaBb096c3c89Db527fA4FB67a0924fFFD",
    }
}

interface IContributionTokens {
    [key: number]: string[]
}
export const ContributionTokens:IContributionTokens = {
    [ChainID.BSC_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.POLY_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.AVAX_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.FTM_TESTNET]: ["USDT", "USDC"],
}

interface IRpcUrls {
    [key: number]: string;
}

export const RpcUrls:IRpcUrls = {
    [ChainID.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [ChainID.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainID.AVAX_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
    //[ChainID.AVAX]: '',
    [ChainID.POLY_TESTNET]: 'https://matic-mumbai.chainstacklabs.com',
    //[ChainID.POLY]: '',
    [ChainID.FTM_TESTNET]: 'https://rpc.testnet.fantom.network/',
    //[ChainID.FTM]: '',

}

export const Networks:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "BSC Testnet",
    [ChainID.POLY_TESTNET] : "Mumbai Testnet",
    [ChainID.AVAX_TESTNET] : "AVAX Testnet",
    [ChainID.FTM_TESTNET] : "FTM Testnet",
}

export const Explorers:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "http://testnet.bscscan.com/",
    [ChainID.POLY_TESTNET] : "https://mumbai.polygonscan.com/",
    [ChainID.AVAX_TESTNET] : "https://testnet.snowtrace.io/",
    [ChainID.FTM_TESTNET] : "https://testnet.ftmscan.com/",
}

export const DEFAULT_CHAIN = ChainID.BSC_TESTNET;