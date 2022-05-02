import { useEffect, useState } from "react";
import { Presale } from "../typechain/Presale";
import { Presale__factory } from "../typechain/factories/Presale__factory";
import { Contracts, TOTAL_RAISE } from "../constants";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { ethers } from "ethers";
import { usePresaleContext } from "../hooks/userPresaleContext";

const Details = () => {
    const { chainId, provider, connected } = useWeb3Context();
    const { maxContribution, hardCap} = usePresaleContext();

    const getInfo = async () => {};

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
                    <span className="details-value">${maxContribution.toLocaleString()}</span>
                </li>
                <li>
                    Total raise size
                    <span className="details-value">${hardCap.toLocaleString()}</span>
                </li>
                <li>
                    Tokens allocated for pre-seed round:
                    <span className="details-value">1,333,333</span>
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
