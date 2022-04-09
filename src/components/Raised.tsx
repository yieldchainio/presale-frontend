import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CHAINS, Contracts, Networks, TOTAL_RAISE } from "../constants";
import { usePresaleContext } from "../hooks/userPresaleContext";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Presale__factory } from "../typechain/factories/Presale__factory";
import { Presale } from "../typechain/Presale";

const Raised = () => {
    const {connected, chainId, provider} = useWeb3Context();
    const {raised, raisedPerChain, hardCap} = usePresaleContext();
   // const [raised, setRaised] = useState(NaN);

    /*useEffect(() => {
        if (provider && chainId && Contracts[chainId!]) {
            const presale:Presale = Presale__factory.connect(Contracts[chainId!].PRESALE, provider!.getSigner())
            presale.contributed().then((value) => setRaised(parseFloat(ethers.utils.formatEther(value))))
        }
        
      
    }, [connected, chainId, provider])*/
    

    return (
        <div className="raised-container">
            Total Raised: <br />
            {raised.toLocaleString()} / ${TOTAL_RAISE.toLocaleString()}
            <div>Details</div>
            <div className="raised-details">
                {raisedPerChain.map((v, i) => <div>{Networks[CHAINS[i]]} : {v}</div>)}
            </div>
        </div>
    )
}

export default Raised;