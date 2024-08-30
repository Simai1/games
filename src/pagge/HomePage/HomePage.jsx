import { useEffect, useRef, useState } from "react";
import styles from './HomePage.module.scss'; // Import styles
import React from 'react';
import { questionsData } from "./data";
import myGif from './../../image/happy-cat-cat.gif';
import CompleteCat from './../../image/Complete.PNG'; 
import ScharikImg from './../../image/scharik.png'; 
import tickSound from './../../sound/soudTimer.mp3'; // Import your ticking sound
import audioLaz from "./../../materials/audioLaz.mp3";
import snegiri from "./../../materials/snegir.mp3";
import snegirFul from "./../../materials/snegirFul.mp3";
import forforAnswer from "./../../materials/44Answer.mp3";
import zwonok from "./../../materials/zwonok.mp3";
import ariel from "./../../materials/ariel.jpg";
import catsImg from "./../../materials/cats.jpg";
import threPlanet from "./../../materials/threPlanet.jpg";
import begemot from "./../../materials/begemot.mp4";
import catPaketImg from "./../../materials/catPaketImg.jpg";
import CatPaketAudio from "./../../materials/CatPaket.mp3";
import gentelmenAud from "./../../materials/gentelmen.mp3";
import reisImg from "./../../materials/reis.JPG";
import DataContext from "../../context";
import { Link, useNavigate } from "react-router-dom";
import HappyAudio from "./../../materials/happy.mp3";

function HomePage() {
    const [questions, setQuestions] = useState(questionsData);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [showQuestionPopup, setShowQuestionPopup] = useState(false);
    const [showAnswerPopup, setShowAnswerPopup] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [visible, setVisible] = useState(false);
    const [timer, setTimer] = useState(30); // Timer state
    const [timerActive, setTimerActive] = useState(false); // Timer active state
    const tickAudio = useRef(new Audio(tickSound)).current;
    const AudioLaz = useRef(new Audio(audioLaz)).current;
    const Snegiri = useRef(new Audio(snegiri)).current;
    const SnegiriFull = useRef(new Audio(snegirFul)).current;
    const ForforAnswer = useRef(new Audio(forforAnswer)).current;
    const Zwonok = useRef(new Audio(zwonok)).current;
    const CatPaketAud = useRef(new Audio(CatPaketAudio)).current;
    const gentelmenAudio = useRef(new Audio(gentelmenAud)).current;
    const HappyAudios = useRef(new Audio(HappyAudio)).current;
    const [answerImg, setAnswerImg] = useState("");  
    const [ImgAnswer, setImgAnswer] = useState("");
    const [catPaket, setCatPaket] = useState(false);
    // useEffect(() => {
    //     console.log(timer);
    //     if (timerActive && timer > 0) {
    //         tickAudio.play(); // Play ticking sound
    //     } 
    // }, [timerActive]);
    
    const { ContextData} = React.useContext(DataContext);
    // useEffect(() => {
    //     ContextData.setScore(score);
    // }, [ContextData.scope]);

    useEffect(() => {
        console.log(timer);
        if (timer === 0) {
          // Задержка перед паузой
        setTimeout(() => {
            tickAudio.pause();
            tickAudio.currentTime = 0; // Сбросить аудио, если нужно
            Snegiri.pause();
            Zwonok.pause();
            gentelmenAudio.pause();
        }, 100); // Задержка в 100 мс
        }
    }, [timer]);
    


    useEffect(() => {
        let interval = null;
        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    return prevTimer - 1;
                });
            }, 1000);
        } else if (timer === 0) {
            setShowQuestionPopup(false);
            setShowAnswerPopup(true); // Show answer pop-up when timer ends
            setTimerActive(false); // Stop the timer
        }
        return () => clearInterval(interval);
    }, [timerActive, timer]);


    //!При нажатии на вопрос откртие
    const handleQuestionClick = (question) => {
        if (!ContextData.answeredQuestions.has(question.id)) {
            setCurrentQuestion(question);
            setShowQuestionPopup(true);
            setShowAnswerPopup(false);
            if(question?.id !== 10289){
                setTimer(30); // Reset timer to 30 seconds
                setTimerActive(true); // Start the timer
            }
            if(question?.id !== 33 && question?.id !== 55 && question?.id !== 10289 && question?.id !== 23019){
               tickAudio.play(); // Play ticking sound
               if(question?.id === 331112){
                setImgAnswer("cats");
                }
                if(question?.id === 32039){
                    setImgAnswer("reis");
                }
            }else{
                if(question?.id === 33){
                    Snegiri.play();
                }
                if(question?.id === 55){
                    Zwonok.play();
                }
                if(question?.id === 10289){
                    setCatPaket(true)
                    CatPaketAud.play();
                }if(question?.id === 23019){
                    gentelmenAudio.play();
                }
            }
          
        }
    };


    //!При нажатии на показать ответ
    const handleQuestionClickVizible = (question) => {
        console.log(question);
        if(question?.id === 22){
            AudioLaz.play();
        }else if(question?.id === 33){
            SnegiriFull.play();
        }else if(question?.id === 44){
            ForforAnswer.play();
        }else if(question?.id === 23122){
            setAnswerImg("ariel");
        }else if(question?.id === 5321123321){
            setAnswerImg("threPlanet");
        }else if(question?.id === 37){
            setAnswerImg("begemot");
        }

        setVisible(true)
    }

    //!при нажатии на правильно не правильно
    const handleAnswer = (isCorrect) => {
        console.log('currentQuestion', currentQuestion);
        if (isCorrect) {
            ContextData.setScope(ContextData.scope + currentQuestion.value);
        }
        ContextData.setAnsweredQuestions(new Set(ContextData.answeredQuestions).add(currentQuestion.id));
        setShowAnswerPopup(false);
        setVisible(false);
        setAnswerImg("")
        setImgAnswer("");
        setCatPaket(false)
        // Задержка перед паузой
        setTimeout(() => {
            tickAudio.pause();
            tickAudio.currentTime = 0; // Сбросить аудио, если нужно
            AudioLaz.pause();
            Snegiri.pause();
            SnegiriFull.pause();
            ForforAnswer.pause();
            Zwonok.pause();
            gentelmenAudio.pause();
        }, 100); // Задержка в 100 мс
    };
    
    const nextPage = () => {
        setCatPaket(false)
        CatPaketAud.pause();
        setTimer(30); // Reset timer to 30 seconds
        setTimerActive(true); // Start the timer
        tickAudio.play(); // Play ticking sound
    }
    const navigate = useNavigate();

    useEffect(() => {
        if(ContextData?.answeredQuestions.size === 25){
            HappyAudios.play();
        }
    }, [ContextData]);

    const nextPageMagagzio = () => {
        navigate("/Magazin");
        HappyAudios.pause();
    }
    return (
        <div >
        {ContextData?.answeredQuestions.size === 25 ? (
            <div className={styles.FinslWin}>
                <div>
                    <div>
                        <img src={CompleteCat} alt="" style={{width: 700, height: 600, marginTop: -150}}/>
                    </div>
                    <div>
                        <div>
                            <img src={myGif} alt="Описание гифки" />
                        </div>
                        <div>
                           <button className={styles.btn} onClick={nextPageMagagzio}>Получить призы</button>
                        </div>
                    </div>
                    <img className={styles.animated1} src={ScharikImg} alt="ScharikImg"/>
                    <img className={styles.animated2} src={ScharikImg} alt="ScharikImg"/>
                </div>
            </div>
        ) : (
            <>
            <div className={styles.score}>Счет: {ContextData.scope}</div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {questions.map((quest) => (
                        <div key={quest.id} className={styles.QuestionBlock}>
                            <div className={styles.BlockName}>
                                <p>{quest.BlockName}</p>
                            </div>
                            {quest.question.map((question) => (
                                <div key={question.id} className={styles.butttonBlock}>
                                    <button 
                                        className={styles.question_button} 
                                        onClick={() => handleQuestionClick(question)}
                                        style={{ opacity: ContextData.answeredQuestions.has(question.id) ? 0 : 1 }} // Change opacity if answered
                                    >
                                        {question.value}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {showQuestionPopup && catPaket && <div className={styles.catPaket}><img onClick={() => nextPage()} src={catPaketImg} alt=""/></div>}
                {showQuestionPopup && !catPaket && (
                    <div className={styles.popupCont}>
                        <div className={styles.popup}>
                            <div className={styles.popupTimer}>
                                <h2>{currentQuestion.text}</h2>
                                {ImgAnswer === "cats" && <img style={{width: 700, height: 400}} src={catsImg} alt=""/>}
                                {ImgAnswer === "reis" && <img style={{width: 700, height: 400}} src={reisImg} alt=""/>}
                                <div className={styles.popupTimerBlock}>
                                    <div>
                                        <div>
                                            <button onClick={() => {setTimer(0);  tickAudio.pause();}}>Ответ готов</button>
                                        </div>
                                        <progress value={timer} max={30} /><p>{timer} сек.</p>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                )}
                {showAnswerPopup && (
                    <div className={styles.popupCont}>
                        <div className={styles.popup}>
                        <div>
                            <div className={styles.popupVizibleBlock}>
                                {!visible && (<button onClick={() => handleQuestionClickVizible(currentQuestion)}>Показать ответ</button>)}
                                {visible && (
                                    <div>   
                                        <h3 className={styles.otvet}>Правильный ответ: {currentQuestion?.trueOtvet || "---"}</h3>
                                        {answerImg === "ariel" && (<img  style={{width: 1000, height: 500}} src={ariel} alt=""/>)}
                                        {answerImg === "threPlanet" && (<img style={{width: 1000, height: 600}} src={threPlanet} alt=""/>)}
                                        {answerImg === "begemot" && (<video controls width={1000} height={600}><source src={begemot} type="video/mp4"/></video>)}
                                    </div>
                                )}
                            </div>
                            <button onClick={() => handleAnswer(true)}>Правильно</button>
                            <button onClick={() => handleAnswer(false)}>Неправильно</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </>
        )}
        </div>
    );
}

export default HomePage;
