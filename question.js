const pointsTag = document.getElementById("pointsTag");
const optionOneButton = document.getElementById("optionOne");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const question_page_body = document.getElementById("question_page_body");

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

let questionNumberCount = 1;
let points = 0;
let correct = 1;

fetch('questions.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    processData(data);
  })
  .catch(error => {
    console.error('There was a problem fetching the questions:', error);
  });

  function processData(data) {
    const lines = data.split('\n');
    
    if (questionNumberCount < 1 || questionNumberCount > lines.length) {
      console.error('Invalid question number');
      return;
    }
    
    const line = lines[questionNumberCount - 1];
    const components = line.split(';');
    
    if (components.length >= 3) {
      const number = components[0];
      const questionText = components[1];
      const answerText = components[2];
  
      questionNumber.innerHTML = number;
      question.innerHTML = questionText;
      answer.innerHTML = answerText;
    } else {
      console.error('Invalid data format for question:', line);
    }
  }
  


optionOneButton.addEventListener('click', function(){
    pointsTag.innerHTML = "points: " + points;

});