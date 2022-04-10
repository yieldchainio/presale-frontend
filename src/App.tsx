import React from "react";
import logo from "./logo.svg";
import "./App.css";
import image from "./images/title.png";
import Wallet from "./components/Wallet";
import Details from "./components/Details";
import Raised from "./components/Raised";
import Presale from "./components/Presale";
import { Web3ContextProvider } from "./hooks/useWeb3Context";
import { PresaleContextProvider } from "./hooks/userPresaleContext";

function App() {
    return (
        <Web3ContextProvider>
            <PresaleContextProvider>
                <div className="bg"></div>
                <div className="content">
                    <Wallet />
                    <div className="title">&nbsp;</div>
                    <div className="flex-box">
                        <Presale />
                        <Details />
                    </div>
                    <Raised />
                </div>
            </PresaleContextProvider>
        </Web3ContextProvider>
    );
}

export default App;
