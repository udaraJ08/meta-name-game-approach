import React, {useEffect, useState} from "react";
import {Input} from 'reactstrap';
import {INIT_DATA, PREV, NEXT} from "./const";
import getWeb3 from "../../getWeb3";
import Zkoopa from "../../contracts/Zkoopa.json";
import AvatarCard from "../../components/AvatarCard";
import magic from '../../assets/audio/magic.wav';
import mint from '../../assets/audio/mint.wav';
import next from '../../assets/audio/next.mp3';
import prev from '../../assets/audio/prev.mp3';
import key from '../../assets/audio/key.wav';
import bubble from "../../assets/audio/bubble.wav";

const MintBoard = () => {

    const [imageList] = useState(INIT_DATA);
    const [imgIndex, setImgIndex] = useState(0);
    const [name, setName] = useState("");

    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [allZkooopas, setAllZkoopas] = useState([]);

    useEffect(async () => {
        const web3 = await getWeb3();
        const web3Contract = await loadWeb3Contract(web3);
        await loadWeb3Account(web3);
        await getAllNft(web3Contract);
    }, []);

    const getAllNft = async (contract) => {
        const allNFT = await contract.methods.getAllZkoopas().call();
        setAllZkoopas(allNFT);
    }

    const loadWeb3Account = async (web3) => {
        const accounts = await web3.eth.getAccounts();
        if (accounts) setAccount(accounts[0]);
    }

    const loadWeb3Contract = async (web3) => {
        const netID = await web3.eth.net.getId();
        const networkData = Zkoopa.networks[netID];

        if (networkData) {
            const abi = Zkoopa.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            setContract(contract)
            return contract;
        }
    }

    const handleArrow = async (type) => {

        switch (type) {
            case NEXT:
                if (imgIndex === INIT_DATA.length - 1) setImgIndex(0);
                else setImgIndex(imgIndex + 1);
                const audio_next = new Audio(prev);
                await audio_next.play();
                await audio_next.remove();
                break;
            case PREV:
                if (imgIndex === 0) setImgIndex(INIT_DATA.length - 1);
                else setImgIndex(imgIndex - 1);
                const audio = new Audio(next);
                await audio.play();
                await audio.remove();
                break;
        }
    }

    const minting = async () => {
        const audio_mint = new Audio(mint);
        await audio_mint.play();
        await audio_mint.remove();
        await contract.methods.mint(name, imageList[imgIndex].name).send({from: account});
        await getAllNft(contract);
        const audio = new Audio(magic);
        await audio.play();
        await audio.remove();
    }

    return <div className="full-page mint-board-grad d-flex">
        <div className="h-100 bg-danger w-25 side-nav flex-column center p-3">
            <div className="center flex-column w-100">
                <h3 className="text-warning mb-4 text-capitalize text-center">{imageList[imgIndex].name}</h3>
                <img
                    onMouseOver={async () => {
                        const audio = new Audio(bubble);
                        await audio.play();
                        await audio.remove();
                    }}
                    className="image-scale pointer mb-3" src={imageList[imgIndex].img} width="50%"/>
                <div className="w-75 d-flex mt-3 justify-content-between center">
                    <button
                        onClick={() => handleArrow(PREV)}
                        className="btn btn-outline-primary">{"<"}</button>
                    <h6 className="text-grey">SELECT AVATAR TYPE</h6>
                    <button
                        onClick={() => handleArrow(NEXT)}
                        className="btn btn-outline-primary">{">"}</button>
                </div>
            </div>
            <div className="w-100 mt-5">
                <p className="text-light">Enter your META name...</p>
                <Input onChange={async e => {
                    const audio = new Audio(key);
                    await audio.play();
                    await audio.remove();
                    setName(e.target.value)
                }
                }/>
                <div className="center w-100 mt-4">
                    <button
                        onClick={minting}
                        className="btn btn-danger">MINT YOUR AVATAR
                    </button>
                </div>
            </div>
        </div>
        <div className="h-100 w-75">
            <div className="h-10 w-100 center">
                <h1 className="text-danger font-lobster text-shadow"><u>META BOARD</u></h1>
            </div>
            <div className="h-90 w-100 overflow-hidden overflow-auto flex-wrap d-flex p-5">
                {
                    allZkooopas.map(e => <AvatarCard name={e}/>)
                }
            </div>
        </div>
    </div>
}

export default MintBoard;