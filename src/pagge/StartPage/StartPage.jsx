import { Link, useNavigate } from "react-router-dom";

import SratImg from "./../../image/StartImg.jpg";
import styles from "./StartPage.module.scss";
import sound from "./../../materials/StartSound.mp3"
import { useEffect, useRef } from "react";
import React from "react";
function StartPage() {
    const Startsound = useRef(new Audio(sound)).current;

    const soundAudio = () => {
        setTimeout(() => {
            Startsound.play();
        }, 1000); // Задержка в 100 мс
    }
    const navigate = useNavigate();
    const StopAudio = () => {
        setTimeout(() => {
            Startsound.pause();
            Startsound.currentTime = 0;
            navigate("/HomePage");
        }, 1000); // Задержка в 100 мс
        
    }
    return ( 
        <div style={{marginTop: "50px"}} className={styles.StartPage}>
            <div>
                <img onClick={soundAudio} src={SratImg}/>
            </div>
           
                <button onClick={() => StopAudio()} className={styles.btn} style={{marginTop: "50px"}}>Начать игру</button>
           
        </div>
     );
}

export default StartPage;