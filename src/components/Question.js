import React, { useState } from 'react';
import PropTypes from 'prop-types';


function Question(props) {
    const [message, setMessage] = useState();
    const handleClick = (e) => {
        e.target.value == true ? setMessage('Correct') : setMessage('Nope!')
    }

    return (
        <div>
            <h3>{props.question.text}</h3>
            {
                props.question.answers.map(a => 
                    <div key={a.id}>
                        <label>{a.value}</label><input type='radio' name={a.id} value={a.isCorrect} onClick={handleClick} />
                    </div>)
            }
            <span>{message}</span>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.object,
    text: PropTypes.string,
    answers: PropTypes.array
}


export default Question;