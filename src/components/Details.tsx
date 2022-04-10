import { useEffect, useState } from "react";
import { Presale } from "../typechain/Presale";
import { Presale__factory } from "../typechain/factories/Presale__factory";
import { Contracts } from "../constants";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { ethers } from "ethers";

const Details = () => {
    const { chainId, provider, connected } = useWeb3Context();
    const [hardCap, setHardCap] = useState("");
    const [maxContrib, setMaxContrib] = useState("");

    const getInfo = async () => {};

    useEffect(() => {
        if (connected && provider && chainId && Contracts[chainId!]) {
            console.log(chainId!);
            const presaleContract: Presale = Presale__factory.connect(
                Contracts[chainId!].PRESALE,
                provider!.getSigner()
            );
            presaleContract
                .HARD_CAP()
                .then((value) =>
                    setHardCap(
                        parseInt(
                            ethers.utils.formatEther(value)
                        ).toLocaleString()
                    )
                );
            presaleContract
                .maxContribution()
                .then((value) =>
                    setMaxContrib(
                        parseInt(
                            ethers.utils.formatEther(value)
                        ).toLocaleString()
                    )
                );
        }
    }, [connected, chainId, provider]);

    return (
        <div className="details-container">
            <h2>Sale Details</h2>
            <hr />
            <ul className="details-tokenomics">
                <li>
                    Round
                    <span className="details-value">Pre-Seed</span>
                </li>
                <li>
                    Price per token
                    <span className="details-value">$0.03</span>
                </li>
                <li>
                    Maximal contribution
                    <span className="details-value">${maxContrib}</span>
                </li>
                <li>
                    Total raise size
                    <span className="details-value">${hardCap}</span>
                </li>
                <li>
                    Total supply
                    <span className="details-value">1,000,000</span>
                </li>
                <div className="details-vesting">
                    <h3>Vesting</h3>
                    <ul className="details-tokenomics">
                        <li>
                            Initial Release
                            <span className="details-value">3% @TGE</span>
                        </li>
                        <li>
                            Cliff Period
                            <span className="details-value">2 Months</span>
                        </li>
                        <li>
                            Release Period
                            <span className="details-value">12 Months</span>
                        </li>
                        <li>
                            Release Schedule
                            <span className="details-value">
                                Linear Daily Unlock
                            </span>
                        </li>
                    </ul>
                    {/* 3% @TGE, 2 months cliff, 12 months linear daily vesting */}
                </div>
            </ul>
            <hr />
            {/* <hr className="white-hr" /> */}
            <div className="details-info">
                <div>
                    Website: <a href="https://yieldchain.io">yieldchain.io</a>
                </div>
                <div>
                    Documentation:{" "}
                    <a href="https://docs.yieldchain.io">docs.yieldchain.io</a>
                </div>
            </div>
        </div>
    );
};

export default Details;
