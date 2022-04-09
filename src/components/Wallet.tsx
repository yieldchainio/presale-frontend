import Web3Modal from 'web3modal';
import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from "@toruslabs/torus-embed";
import { useWeb3Context } from '../hooks/useWeb3Context';
import { Networks } from '../constants';


const Wallet = () => {
    const { address, provider, web3Modal, connected, connect, disconnect, chainId} = useWeb3Context()
 
    useEffect(() => {
        // initiate web3modal

    }, [])
    
    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            connect();
        }
    }, [web3Modal])

    return (
        <div className="wallet-container">
            <div className="wallet-info">
                {
                    connected && chainId ?
                    <span className="chain">{Networks[chainId!]}</span>
                    :
                    ""
                }
                <span className="button-wrapper border-outer"><button className="border-inner" onClick={address != "" ? disconnect : connect}> {connected ? address.slice(0, 6)+"..."+address.slice(-4) : "Wallet" } </button></span>
            </div>
        </div>
    )
}

export default Wallet;