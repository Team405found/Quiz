import React, { useEffect } from 'react'
import './Quiz.css'
import { quizData } from '../../assets/data'

const Quiz = () => {
    let savedIndex = localStorage.getItem('quizIndex') ? parseInt(localStorage.getItem('quizIndex')) : 0;
    let savedScore = localStorage.getItem('quizScore') ? parseInt(localStorage.getItem('quizScore')) : 0;
    let savedResult = localStorage.getItem('quizCompleted') === 'true';
    let savedLocked = localStorage.getItem('quizLocked') === 'true';


    let [index, setIndex] = React.useState(savedIndex);
    let [question, setQuestion] = React.useState(quizData[index]);
    let [locked, setLocked] = React.useState(savedLocked);
    let [score, setScore] = React.useState(savedScore);
    let [result, setResult] = React.useState(savedResult);
    // const [savedIndex, setSavedIndex] = React.useState(0);
    // const [savedScore, setSavedScore] = React.useState(0);
    // const [savedResult, setSavedResult] = React.useState(false);

    // useEffect(() => {
    //     setSavedIndex(localStorage.getItem('quizIndex') ? parseInt(localStorage.getItem('quizIndex')) : 0);
    //     setIndex(savedIndex);
    //     setQuestion(quizData[index]);
    //     setSavedScore(localStorage.getItem('quizScore') ? parseInt(localStorage.getItem('quizScore')) : 0);
    //     setScore(savedScore);
    //     setSavedResult(localStorage.getItem('quizCompleted') === 'true');
    //     setResult(savedResult);
    // }, []);

    useEffect(() => {
        if (!result) {
            option1.current.classList.add('unlocked');
            option2.current.classList.add('unlocked');
            option3.current.classList.add('unlocked');
            option4.current.classList.add('unlocked');
        }
    }, [result]);

    let option1 = React.useRef(null);
    let option2 = React.useRef(null);
    let option3 = React.useRef(null);
    let option4 = React.useRef(null);
    let option_array = [option1, option2, option3, option4];


    // useEffect(() => {
    //     // localStorage.setItem('quizIndex', index+1);
    // }, [locked]);

    useEffect(() => {
        localStorage.setItem('quizIndex', index);
        localStorage.setItem('quizScore', score);
        localStorage.setItem('quizCompleted', result);
        localStorage.setItem('quizLocked', locked);
    }, [index, score, result, locked]);

    // const updateIndex = (i) => {
    //     console.log('i=' + i);
    //     setIndex(i);
    //     console.log('index=' + index);
    //     // setIndex(i);
    // };

    const checkAnswer = (e, ans) => {
        if (locked === false) {
            if (question.answer === ans) {
                e.target.classList.add('correct');
                localStorage.setItem('quizIndex', index + 1);
                setScore(score + 1);

            }
            else {
                e.target.classList.add('wrong');
                option_array[question.answer - 1].current.classList.add('correct');
            }
            setLocked(true);
            localStorage.setItem('quizIndex', index + 1);
            option_array.forEach((option) => {
                option.current.classList.remove('unlocked');
                option.current.classList.add('locked');
            });
        }
    }

    const nextQuestion = () => {
        if (locked === true && (index%10) < 9) {
            setIndex(++index);
            setQuestion(quizData[index]);
            option_array.map((option) => {
                option.current.classList.remove('correct');
                option.current.classList.remove('wrong');
                option.current.classList.remove('locked');
                option.current.classList.add('unlocked');
            });
            setLocked(false);
        }
        else if (locked === true && index%10 === 9) {
            setIndex(++index);
            setResult(true);
        }
    }
    const resetQuiz = () => {
        // Reset index, score, and clear localStorage
        if(index>=49)
            setIndex(0);
        setScore(0);
        setQuestion(quizData[index]);
        setResult(false);
        if(index>=49)
            localStorage.removeItem('quizIndex');
        localStorage.removeItem('quizScore');
        localStorage.removeItem('quizCompleted');
        // option_array.forEach((option) => {
        //     option.current.classList.remove('correct', 'wrong', 'locked');
        //     option.current.classList.add('unlocked');
        // });
        setLocked(false);
    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? <><h2>You scored {score} out of 10</h2>
                <button onClick={resetQuiz}>Reset</button></> :
                <><h2>{(index%10) + 1}. {question.question} </h2>
                    <ul>
                        <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.options[0]}</li>
                        <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.options[1]}</li>
                        <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.options[2]}</li>
                        <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.options[3]}</li>
                    </ul>
                    {/* {locked && <div className="done-message">Done!! Can't answer this anymore.</div>} */}
                    <button onClick={nextQuestion}>Next</button>
                    <div className='index'>{(index%10) + 1} of 10 questions</div></>}
        </div>
    )
}

export default Quiz