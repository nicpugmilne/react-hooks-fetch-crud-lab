import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((question) => onDeleteQuestion(question));
  }

  function handleUpdate(e) {
    const updatedAnswerIndex = e.target.value;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: updatedAnswerIndex,
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onAnswerUpdate(updatedQuestion));
  }

  function onAnswerUpdate(correctedAnswer) {
    const updatedAnswer = answers.map((answer) => {
      if (answer.id === correctedAnswer.id) {
        return correctedAnswer;
      } else {
        return answer;
      }
    });
    setCorrectAnswer(updatedAnswer);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
