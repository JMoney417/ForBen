import React from 'react';
import QuizQuestion from '../models/quizQuestion';
import Question from './Question';

const questions = [
    new QuizQuestion(1, "True or False, React is a framework", [{value:'True', isCorrect:false},{value:'False',isCorrect:true}]),                                                                                              
    new QuizQuestion(2, "What Hook method is used to create a state object in a react Functional Component", [{value:'useContext', isCorrect:false},{value:'useRefs',isCorrect:false},{value:'useState',isCorrect:true},{value:'useEffect',isCorrect:false}])                                                                                            
]

function Quiz() {
  return (
    <div>
        <h1>Quiz</h1>
        {
            questions.map( q => <Question question={q} key={q.id} />)
        }
    </div>
  )
}


export default Quiz