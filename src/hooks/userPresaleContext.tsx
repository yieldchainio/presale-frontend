import { Contract, ethers } from "ethers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ChainID, CHAINS, Contracts, RpcUrls } from "../constants" ;
import { Presale__factory } from "../typechain/factories/Presale__factory";
import useInterval from "./useInterval"


export type PresaleInfo = {
    raised: number;
    hardCap: number;
    open: boolean | null;
    raisedPerChain: number[];
    reload: () => void;
}

export type PresaleContextData = {
    presaleInfo: PresaleInfo
} | null;

export const PresaleContext = React.createContext<PresaleContextData>(null)


export const usePresaleContext = () => {
    const presaleContext = useContext(PresaleContext);

    if(!presaleContext) {
        throw new Error("Web3ContextProvider at wrong level")
    }

    const { presaleInfo } = presaleContext;

    return useMemo<PresaleInfo>(() => {
        return {...presaleInfo};
    }, [presaleContext])
}


interface Props {
    children: React.ReactNode
}



export const PresaleContextProvider = ({ children }: Props) => {
    const [open, setOpen] = useState(false);
    const [openPerChain, setOpenPerChain] = useState<boolean[]>(new Array(CHAINS.length).fill(false));
    const [raised, setRaised] = useState(NaN);
    const [raisedPerChain, setRaisedPerChain] = useState<number[]>(new Array(CHAINS.length).fill(0));
    const [hardCap, setHardCap] = useState(30000);
    const [reloadCnt, setReload] = useState(0);


    const reload = () => {
        setReload(reloadCnt+1);
    }

    const loadInfo = async () => {
        let raisedTotal = 0;
        let capSynced = 0
        for(let i in CHAINS) {

            const chain = CHAINS[i]
            const provider = new ethers.providers.JsonRpcProvider(RpcUrls[chain])
            const contract = Presale__factory.connect(Contracts[chain].PRESALE, provider)
            contract.isOpen().then((v) => {
                const _openPerChain = openPerChain
                _openPerChain[i] = v
                setOpenPerChain(_openPerChain)
                setOpen(_openPerChain.every((x) => x === true))
            });
            contract.contributed().then((_raised) => {
                const _raisedPerChain = raisedPerChain
                _raisedPerChain[i] = parseFloat(ethers.utils.formatEther(_raised));
                setRaisedPerChain(_raisedPerChain)
                setRaised(_raisedPerChain.reduce((x, y) => y+x))
            });
            
        }
        setHardCap(capSynced);
    }

    useEffect(() => {
        loadInfo()
    }, [reloadCnt])
    
    useInterval(loadInfo, 7000)
   

    const presaleInfo = useMemo(() => ({
        raised,
        hardCap,
        open,
        raisedPerChain,
        reload,
    }), [
        raised,
        hardCap,
        open,
        raisedPerChain,
        reload,
    ])
    return (
        <PresaleContext.Provider value={{presaleInfo: presaleInfo}}>{ children }</PresaleContext.Provider>
    )
}