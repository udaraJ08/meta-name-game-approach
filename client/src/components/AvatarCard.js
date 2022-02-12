import React from "react";
import bubble from "../assets/audio/bubble.wav";

const AvatarCard = ({name}) => {

    return <div style={{width: "150px", height: "150px"}} className="m-4">
        <img
            onMouseOver={async () => {
                const audio = new Audio(bubble);
                await audio.play();
                await audio.remove();
            }
            }
            className="object-fit image-scale pointer"
            src={`https://avatars.dicebear.com/api/${name.nftType}/${name.name}.svg`}/>
        <h4 className="text-center text-white">{name.name}</h4>
    </div>
}

export default AvatarCard;