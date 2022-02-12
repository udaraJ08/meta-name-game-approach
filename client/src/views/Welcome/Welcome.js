import React, {useState} from "react";

import Footer from "../../components/Footer";
import bless from "../../assets/audio/bless.wav";

const Welcome = () => {

    const [slideEnable, setSlideEnable] = useState(false);

    const slideupAnimation = () => {
        if (slideEnable) {
            return "slide-up";
        }
    }

    const audioRun = async () => {
        const audio = new Audio(bless);
        await audio.play();
        await audio.remove();
    }

    return <div
        onClick={audioRun}
        className={`full-page main-back-grad ${slideupAnimation()} center text-light flex-column overflow-hidden`}>
        <div style={{width: "150px", height: "150px"}} className="m-2 animate__bounce animate__animated z-index-top">
            <img className="object-fit" src={`https://avatars.dicebear.com/api/bottts/s.svg`}/>
        </div>
        <h1 className="main-topic animate__lightSpeedInLeft animate__animated ">ZKOOPA</h1>
        <h5 className="animate__lightSpeedInRight animate__animated sub-topic">custom avatar builder</h5>
        <button
            onClick={() => setSlideEnable(true)}
            className="btn btn-danger mt-5 text-lg">LET'S GO MINTING
        </button>
        <Footer/>
    </div>
}

export default Welcome;