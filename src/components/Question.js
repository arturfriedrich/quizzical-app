import React, { useState } from "react"
import { useEffect } from "react/cjs/react.development"

export default function Question(props) {

    const { question, correctAnswer, incorrectAnswers } = props
    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        setAllAnswers([correctAnswer, ...incorrectAnswers].sort())
    }, [])

    const answerElements = allAnswers.map(answer => {
        return (
            <button className="question-answer">{answer}</button>
        )
    })


    return (
        <section className="question">
            <p className="question-title">{props.question}</p>
            <div className="answers">{answerElements}</div>
            <hr />
        </section>
    )
}