import React, { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Question(props) {

    const { question, correctAnswer, incorrectAnswers, isSubmited } = props
    const [allAnswers, setAllAnswers] = useState([])
    const [chosen, setChosen] = useState("")

    useEffect(() => {
        setAllAnswers([correctAnswer, ...incorrectAnswers].sort())
    }, [])

    function handleClick(event) {
        if (event.target.classList.contains("chosen")) {
            event.target.classList.remove("chosen");
        } else {
            let answers = event.target.parentNode.childNodes;
            answers.forEach((ans) => {
                ans.classList.remove("chosen");
            });
            event.target.classList.add("chosen");
            setChosen(event.target.outerText)
        }
    }

    const answerElements = allAnswers.map(answer => {
        return (
            <>
                {!isSubmited ?
                    <button key={answer} className="question-answer" onClick={(event) => handleClick(event)}>{decode(answer)}</button>
                    :
                    <button
                        key={answer}
                        className={` chosen question-answer
                        ${correctAnswer === answer ? "correct" : ""}
                        ${chosen === answer && incorrectAnswers.some(ans => ans === chosen) ? "wrong" : ""}
                    `}
                    >{decode(answer)}</button>
                }
            </>
        )
    })


    return (
        <section className="question">
            <p className="question-title">{decode(props.question)}</p>
            <div className="answers">{answerElements}</div>
            <hr />
        </section>
    )
}