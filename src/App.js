import React, { useState } from "react"

import Question from "./components/Question"

export default function App() {

    const [running, setRunning] = useState(false)

    function startQuiz() {
        setRunning(prevState => !prevState)
    }

    return (
        <main>
            {
                running ?
                    <Question />
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