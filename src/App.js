import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import Question from "./components/Question"

export default function App() {

    const [running, setRunning] = useState(false)
    const [allQuestions, setAllQuestions] = useState([])

    function startQuiz() {
        setRunning(prevState => !prevState)
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => {
                setAllQuestions(data.results)
            })
    }, [])

    const questionsElement = allQuestions.map(q => {
        console.log(q.question)
        return (
            <Question
                key={nanoid()}
                question={q.question}
            />
        )
    })

    return (
        <main>
            {
                running ?
                    { questionsElement }
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