import { useEffect, useState } from "react";
import { Presale } from "../typechain/Presale";
import { Presale__factory } from "../typechain/factories/Presale__factory";
import { Contracts } from "../constants";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { ethers } from "ethers";


const Details = () => {

    const { chainId, provider, connected } = useWeb3Context();
    const [hardCap, setHardCap] = useState("")
    const [maxContrib, setMaxContrib] = useState("")


    const getInfo = async () => {

    }

    useEffect(() => {
        if(connected && provider && chainId && Contracts[chainId!]) {
            console.log(chainId!)
            const presaleContract:Presale = Presale__factory.connect(Contracts[chainId!].PRESALE, provider!.getSigner())
            presaleContract.HARD_CAP().then((value) => setHardCap(parseInt(ethers.utils.formatEther(value)).toLocaleString()));
            presaleContract.maxContribution().then((value) => setMaxContrib(parseInt(ethers.utils.formatEther(value)).toLocaleString()));

        }
    }, [connected, chainId, provider])

    return (
        <div className="details-container">
            <h2>Sale Details</h2>
            <hr />
            <div className="details-tokenomics">
                <div>
                    Round: Pre-Seed
                </div>
                <div>
                    Price per token: $0.03
                </div>
                <div>
                    Maximal contribution: ${maxContrib}
                </div>
                <div>
                    Total raise size: ${hardCap}
                </div>
                <div>
                    Total supply: 1,000,000
                </div>
            </div>
            <hr />
            <div className="details-vesting">
                <h3>Vesting:</h3>
                3% @TGE, 2 months cliff, 12 months linear daily vesting
            </div>
            <hr />
            <div className="details-info">
                <div>
                    Website: <a href="https://yieldchain.io">yieldchain.io</a>
                </div>
                <div>
                    Documentation: <a href="https://docs.yieldchain.io">docs.yieldchain.io</a>
                </div>
            </div>
        </div>
    )
}

export default Details;