import React, { useState } from "react";

function Question(props) {
    const { index, questionPrompt, options, onOptionSelect, selectedOptionId, showResults } = props;

    const [localSelectedOptionId, setLocalSelectedOptionId] = useState(selectedOptionId);

    function handleOptionSelect(option) {
        setLocalSelectedOptionId(option);
        onOptionSelect(option);
    }

    const optionElements = options.map((option) => (
        <div
            className="option"
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            style={{
                height: "20px",
                background: showResults ? (option.isCorrect ? "green" : 
                (localSelectedOptionId && localSelectedOptionId.id === option.id ? "red": "black")) :
                    (localSelectedOptionId && localSelectedOptionId.id === option.id ? "purple" : "black"),
                color: localSelectedOptionId && localSelectedOptionId.id === option.id ? "white" : "white",
                cursor: "pointer",
            }}
        >
            {option.optionText}
        </div>
    ));

    return (
        <div className="question">
            <h1>
                {index}. {questionPrompt}
            </h1>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {optionElements}
            </div>
        </div>
    );
}

export default Question;
