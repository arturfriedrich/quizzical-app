import React from "react"

export default function Question(props) {

    return (
        <section className="question">
            <p className="question-title">{props.question}</p>
            <hr />
        </section>
    )
}