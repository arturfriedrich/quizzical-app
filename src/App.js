import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import Question from "./components/Question"

export default function App() {

    const [running, setRunning] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [questions, setQuestions] = useState(() => JSON.parse(localStorage.getItem("questions")) || [])
    const [score, setScore] = useState(0)

    function startQuiz() {
        setRunning(true)
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(response => response.json())
            .then(data => setQuestions(data.results))
    }, [running])

    useEffect(() => {
        localStorage.setItem("questions", JSON.stringify(questions))
    }, [questions])

    useEffect(() => {
        setScore(0)
        if (isSubmited) {
            questions.map(quest => {
                if (localStorage.getItem(quest.question) === quest.correct_answer) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        }
    }, [isSubmited, questions, score])

    function checkAnswers() {
        if (isSubmited) {
            setIsSubmited(false)
            setRunning(false)
        } else {
            setIsSubmited(true)
        }
    }

    const questionsElement = questions.map(ques => {
        let questionId = nanoid()
        return (
            <Question
                key={questionId}
                question={ques.question}
                correctAnswer={ques.correct_answer}
                incorrectAnswers={ques.incorrect_answers}
                isSubmited={isSubmited}
            />
        )
    })



    return (
        <main>
            {
                running ?
                    <>
                        <div className="questions-wrapper">
                            <div className="questions">{questionsElement}</div>
                            {isSubmited && <p className='quiz__result'>You scored {score}/5 correct answers</p>}
                            <button className="check-answers" onClick={checkAnswers}>{isSubmited ? "Play again" : "Check answers"}</button>
                        </div>
                    </>
                    :
                    <section className="start-screen">
                        <h1 className="start-title">Quizzical</h1>
                        <p className="start-description">Answer five questions to test<br /> your knowledge</p>
                        <button className="start-button" onClick={startQuiz}>Start quiz</button>
                    </section>
            }
        </main>
    )
}