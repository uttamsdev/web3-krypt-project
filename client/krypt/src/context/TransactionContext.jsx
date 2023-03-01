import React, {useState, useEffect} from "react";
import { ethers } from "ethers";

import {contractABI, contractAddress} from '../../utils/Constant'

export const TransactionContext = React.createContext(); // creating context

const { ethereum } = window;


console.log(contractABI, contractAddress);
//fetch ethereum
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractABI, contractABI, signer);


    console.log({
        provider,
        signer,
        transactionContract
    })
}


export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo:'', amount: '', keyword: '', message: ''}); // this info should be same as from name
    
    //getting form input data
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));

    }

    const checkIfWalletIsConnected = async() => {
        try {
            if(!ethereum)  return alert("Please install MetaMak.");
            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length){ //if accounted connected
            setCurrentAccount(accounts[0])
        } else {
            console.log("No account found");
        }
        console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async() => {
        try {
            if(!ethereum)  return alert("Please install MetaMak.");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }


    //sendTransaction
    const sendTransaction = async() => {

        try {
            if(!ethereum)  return alert("Please install MetaMak.");
            const { addressTo, amount, keyword, message } = formData;
            getEthereumContract();
            //get the data from the form

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    useEffect(()=> {
        checkIfWalletIsConnected();
    },[])
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData,sendTransaction,  handleChange }}>
            {children}
        </TransactionContext.Provider>
    )

}