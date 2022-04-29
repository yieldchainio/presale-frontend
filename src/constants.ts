export const TOTAL_RAISE = 40000;

export enum ChainID {
    BSC = 56,
    BSC_TESTNET = 97,

    AVAX = 43114,
    AVAX_TESTNET = 43113,

    POLY = 137,
    POLY_TESTNET = 80001,

    FTM = 250,
    FTM_TESTNET = 4002,

    TELOS = 40,
    TELOS_TESTNET = 41,
}

//export const CHAINS = [ChainID.BSC_TESTNET, ChainID.AVAX_TESTNET, ChainID.FTM_TESTNET, ChainID.POLY_TESTNET, ChainID.TELOS_TESTNET];
export const CHAINS = [ChainID.BSC, ChainID.AVAX, ChainID.FTM, ChainID.POLY, ChainID.TELOS];


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
    [ChainID.BSC] : {
        PRESALE : "0xC29911724799b343F4E4B855697bF1CaD98719a9",
        USDT : "0x55d398326f99059ff775485246999027b3197955",
        USDC : "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        BUSD : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    },
    [ChainID.POLY_TESTNET]: {
        PRESALE: "0x261898D6e55C0A6B4842a214c61E870adE3daf8e",
        USDT: "0x41A74cbdfB815dc47e8F130AE6f27710adCd98b3",
        USDC: "0x00c1b9E490452cEe0d3d90c9778b32657d304327",
        BUSD: "0x95E40788c5990Ea749aC8117cA03eC6E0E91f3eF",
    },
    [ChainID.POLY] : {
        PRESALE : "0x75d9239dFC861D1c728050AC734f194f4B72d628",
        USDT : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        USDC : "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        BUSD : "0xa8d394fe7380b8ce6145d5f85e6ac22d4e91acde",
    },
    [ChainID.AVAX_TESTNET]: {
        PRESALE: "0xbbb2BA6F2Eb5Acaf2ca29338839566E69AdbcC98",
        USDT: "0xa90214368b49c1D0D7921bee2A433C1293Eba13c",
        USDC: "0x524d792C5C474362DD12Bc530B2c2DF7BB074cCD",
        BUSD: "0x919dd23f4bB6F7c92b466aC232e6487132f4DA0f",
    },
    [ChainID.AVAX] : {
        PRESALE : "0x75d9239dFC861D1c728050AC734f194f4B72d628",
        USDT : "0xc7198437980c041c805a1edcba50c1ce5db95118",
        USDC : "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        BUSD : "0x19860CCB0A68fd4213aB9D8266F7bBf05A8dDe98",
    },
    [ChainID.FTM_TESTNET]: {
        PRESALE: "0x13dD0b14AA28f97154ab13d8df837305490eEb26",
        USDT: "0x5D76268bE65e59D99C29Bd3493F2178bE941F873",
        USDC: "0x997924baaBb096c3c89Db527fA4FB67a0924fFFD",
    },
    [ChainID.FTM] : {
        PRESALE : "0x75d9239dFC861D1c728050AC734f194f4B72d628",
        USDT : "0x049d68029688eabf473097a2fc38ef61633a3c7a",
        USDC : "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    },
    [ChainID.TELOS_TESTNET] : {
        PRESALE: "0x287156c447A0881ca7143e72b67550B211310129",
        USDT : "0xa3df9A01b423E7C1C501314720b47d6145951256",
        USDC : "0xb98e0f7d9Cd41e11121D10D535b28B60261e5e6F",
    },
    [ChainID.TELOS] : {
        PRESALE: "0xb98e0f7d9Cd41e11121D10D535b28B60261e5e6F",
        USDT : "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73",
        USDC : "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b",
    },
}

interface IContributionTokens {
    [key: number]: string[]
}
export const ContributionTokens:IContributionTokens = {
    [ChainID.BSC_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.POLY_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.AVAX_TESTNET]: ["USDT", "USDC", "BUSD"],
    [ChainID.FTM_TESTNET]: ["USDT", "USDC"],
    [ChainID.BSC]: ["USDT", "USDC", "BUSD"],
    [ChainID.POLY]: ["USDT", "USDC", "BUSD"],
    [ChainID.AVAX]: ["USDT", "USDC", "BUSD"],
    [ChainID.FTM]: ["USDT", "USDC"],
    [ChainID.TELOS_TESTNET] : ["USDT", "USDC"],
    [ChainID.TELOS] : ["USDT", "USDC"],
}

interface IRpcUrls {
    [key: number]: string;
}

export const RpcUrls:IRpcUrls = {
    [ChainID.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [ChainID.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainID.AVAX_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
    [ChainID.AVAX]: 'https://api.avax.network/ext/bc/C/rpc',
    [ChainID.POLY_TESTNET]: 'https://matic-mumbai.chainstacklabs.com',
    [ChainID.POLY]: 'https://polygon-rpc.com/',
    [ChainID.FTM_TESTNET]: 'https://rpc.testnet.fantom.network/',
    [ChainID.FTM]: 'https://rpcapi.fantom.network/',
    [ChainID.TELOS_TESTNET]: "https://testnet.telos.net/evm",
    [ChainID.TELOS] : "https://mainnet.telos.net/evm",

}

export const Networks:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "BSC Testnet",
    [ChainID.BSC] : "BNB Chain",
    [ChainID.POLY_TESTNET] : "Mumbai Testnet",
    [ChainID.POLY] : "Polygon",
    [ChainID.AVAX_TESTNET] : "AVAX Testnet",
    [ChainID.AVAX] : "Avalanche",
    [ChainID.FTM_TESTNET] : "FTM Testnet",
    [ChainID.FTM] : "Fantom",
    [ChainID.TELOS_TESTNET] : "Telos Testnet",
    [ChainID.TELOS] : "Telos",
}

export const Explorers:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "http://testnet.bscscan.com/",
    [ChainID.BSC] : "https://bscscan.com/",
    [ChainID.POLY_TESTNET] : "https://mumbai.polygonscan.com/",
    [ChainID.POLY] : "https://polygonscan.com/",
    [ChainID.AVAX_TESTNET] : "https://testnet.snowtrace.io/",
    [ChainID.AVAX] : "https://snowtrace.io/",
    [ChainID.FTM_TESTNET] : "https://testnet.ftmscan.com/",
    [ChainID.FTM]: "https://ftmscan.com/",
    [ChainID.TELOS_TESTNET]: "https://testnet.teloscan.io/",
    [ChainID.TELOS]: "https://www.teloscan.io/"
}

export const DEFAULT_CHAIN = ChainID.BSC_TESTNET;

    // TODO: This probably could be loaded from some place other than here
export const JURISDICTIONS = [
        "United States of America (including its territories)",
        "Canada",
        "Democratic People’s Republic of Korea",
        "Cuba",
        "Syria",
        "Iran",
        "Crimea",
        "People’s Republic of China",
        "Bahamas",
        "Belarus",
        "Botswana",
        "Burundi",
        "Cambodia",
        "Central African Republic",
        "The Democratic Republic of the Congo",
        "Côte d’Ivoire",
        "Ethiopia",
        "Ghana",
        "Islamic Republic of Iran",
        "Iraq",
        "Lebanon",
        "Libya",
        "Mali",
        "Myanmar",
        "Nicaragua",
        "Pakistan",
        "Panama",
        "Somalia",
        "South Sudan",
        "Sri Lanka",
        "Sudan",
        "Syrian Arab Republic",
        "Trinidad and Tobago",
        "Tunisia",
        "Bolivarian Republic of Venezuela",
        "Yemen",
        "Zimbabwe",
    ].sort();