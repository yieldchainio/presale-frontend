import { useEffect, useState } from "react";
import { CHAINS, Contracts, ContributionTokens, JURISDICTIONS } from "../constants";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Presale as TPresale } from "../typechain/Presale";
import { Presale__factory } from "../typechain/factories/Presale__factory";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { ethers } from "ethers";
import { usePresaleContext } from "../hooks/userPresaleContext";
import Modal from "./Modal";
import Raised from "./Raised";

const Presale = () => {
    const { chainId, provider, connected, address } = useWeb3Context();
    const { open, reload } = usePresaleContext();
    const [amount, setAmount] = useState<number>(0);
    const [token, setToken] = useState<string>("");
    const [presaleContract, setPresaleContract] = useState<TPresale>();
    const [tokenContract, setTokenContract] = useState<ERC20>();
    const [approved, setApproved] = useState(false);
    const [allowance, setAllowance] = useState(0);
    const [txRunning, setTxRunning] = useState(false);
    const [balance, setBalance] = useState(0);
    const [contribution, setContribution] = useState(0);
    const [txError, setTxError] = useState("");
    const [invalidInput, setInvalidInput] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (value: string) => {
        if (value === "") {
            value = "0";
        }

        if (RegExp("^[+-]?[0-9]+(.[0-9]+)?$").exec(value)?.length !== 1) {
            const parsedValue = parseFloat(value);
            if (parsedValue <= 0) {
                setAmount(0);
                setInvalidInput(true);
            } else {
                setInvalidInput(false);
                setAmount(parsedValue);
            }
        } else {
            setInvalidInput(true);
            setAmount(0);
        }
    };

    const getAllowance = () => {
        if (
            tokenContract !== undefined &&
            presaleContract !== undefined &&
            provider !== null
        ) {
            tokenContract!
                .allowance(address, presaleContract!.address)
                .then((value) => {
                    setAllowance(parseFloat(ethers.utils.formatEther(value)));
                    setApproved(value.gt(0));
                });
        }
    };

    const approve = async (extra?: number) => {
        setTxRunning(true);
        if (token !== "" && amount > 0) {
            let toApprove = amount;
            if (extra) toApprove += extra;
            try {
                const tx = await tokenContract!.approve(
                    Contracts[chainId!].PRESALE,
                    ethers.utils.parseEther(toApprove.toString())
                );
                await tx.wait();
                getAllowance();
            } catch (e: any) {
                console.log("Err", e);
                setTxError(e!.message);
                setTxRunning(false);
                throw e;
                
            }
        }
        setTxRunning(false);
    };

    const openLegalsModal = () => {
        setIsModalOpen(true);
    };

    const contribute = async () => {
        setTxError("");
        if (presaleContract !== undefined && provider !== null) {
            if (amount == 0) {
                setTxError("Contribution too low");
                return;
            }
            if (allowance < amount) {
                try {
                    await approve();
                } catch {
                    return;
                }
            }

            setTxRunning(true);
            console.log(ethers.utils.parseEther(amount.toString()));

            presaleContract!
                .contribute(token, ethers.utils.parseEther(amount.toString()))
                .then((tx) => {
                    tx.wait().then((receipt) => {
                        if (receipt.status == 1) {
                            reload();
                            getAllowance();
                            getContribution();
                        }
                        setTxRunning(false);
                    });
                })
                .catch((e: any) => {
                    console.log(e);
                    setTxRunning(false);
                    setTxError(e.data.message);
                });
        }
    };

    const getContribution = () => {
        if (presaleContract !== undefined) {
            presaleContract.contributions(address).then((v) => {
                setContribution(parseFloat(ethers.utils.formatEther(v)));
            });
        }
    };

    useEffect(() => {
        if (token == "" && chainId && Contracts[chainId!]) {
            setToken(Contracts[chainId!].USDT);
        }

        if (provider !== null && chainId && Contracts[chainId!]) {
            setPresaleContract(
                Presale__factory.connect(
                    Contracts[chainId!].PRESALE,
                    provider!.getSigner()
                )
            );
        }
    }, [chainId, provider, connected]);

    useEffect(() => {
        if (provider !== null && presaleContract !== undefined) {
            const tc: ERC20 = ERC20__factory.connect(
                token,
                provider!.getSigner()
            );
            setTokenContract(tc);

            tc.balanceOf(address).then((v) => {
                setBalance(parseFloat(ethers.utils.formatEther(v)));
            });

            getContribution();
        }
    }, [token, presaleContract, provider]);

    useEffect(() => {
        getAllowance();
    }, [tokenContract]);

    return (
        <div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="legal-warning">
                    <span>
                        By proceeding you agree to not be a member of the
                        following jurisdictions:
                    </span>
                    <p
                        style={{
                            columnCount: 3,
                        }}
                    >
                        {JURISDICTIONS.map((j, i) => (
                            <span key={j} className={i % 2 === 0 ? "" : "odd"}>
                                {j}
                                <br />
                            </span>
                        ))}
                    </p>
                    <button
                        className="legal-proceed"
                        onClick={(e) => {
                            setIsModalOpen(false);
                            contribute();
                        }}
                    >
                        Proceed
                    </button>
                </div>
            </Modal>
            <div className="border-outer">
                <div className="border-inner">
                    <div className="presale-container">
                        { !(CHAINS.includes(chainId!)) || !Contracts[chainId!] ? (
                            connected ? (
                                <div>Unsupported network ({chainId!})</div>
                            ) : (
                                <div>Connect your wallet</div>
                            )
                        ) : !open ? (
                            <div>Presale is closed</div>
                        ) : (
                            <div>
                                <div className="presale-tokens">
                                    <h3>Choose Token</h3>
                                    <span className="border-outer inline">
                                        <span className="border-inner inline">
                                            <select
                                                onChange={(e) =>
                                                    setToken(e.target.value)
                                                }
                                            >
                                                {ContributionTokens[
                                                    chainId!
                                                ].map((value) => (
                                                    <option
                                                        key={value}
                                                        value={
                                                            Contracts[chainId!][
                                                                value
                                                            ]
                                                        }
                                                    >
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </span>
                                    </span>
                                    <div className="presale-balance">
                                        Available:{" "}
                                        <span>{balance.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="presale-amount">
                                    <h3>Amount to contribute</h3>
                                    <span
                                        className={`border-outer inline ${
                                            invalidInput ? "invalid" : ""
                                        }`}
                                    >
                                        <span className="border-inner inline">
                                            <input
                                                type="number"
                                                onChange={(e) => {
                                                    handleChange(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>

                                <div className="presale-output">
                                    <h3>You will get</h3>
                                    <div className="presale-output-amount">
                                        <span>
                                            {(amount / 0.03).toFixed(2)}
                                        </span>{" "}
                                        YC
                                    </div>
                                </div>
                                <div className="presale-proceed">
                                    {open ? (
                                        <button
                                            className={
                                                txRunning ? "running" : ""
                                            }
                                            onClick={() => openLegalsModal()}
                                            disabled={txRunning}
                                        >
                                            Contribute
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="presale-balance">
                                    Your contribution: $
                                    {contribution.toLocaleString()}
                                </div>
                                <div className="presale-error">{txError}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presale;

/*
allowance >= amount && approved && 

                                <div>
                                    <div>
                                        <button onClick={() => contribute()} disabled={txRunning}>Buy Now</button>
                                    </div>
                                    <div>
                                        Allowance: {allowance} (<button onClick={() => approve(allowance)} disabled={txRunning}>Approve Extra</button>)
                                    </div>
                                </div>
                                : 
*/
