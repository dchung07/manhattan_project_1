const pointsTag = document.getElementById("pointsTag");
const option1 = document.getElementById("option1");
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
let answerConfirm = "";

let picked = false;

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
    
    function displayQuestion(questionIndex) {
      const line = lines[questionIndex - 1];
      const components = line.split(';');
  
      if (components.length >= 6) {
        const number = components[0];
        const questionText = components[1];
        const optionOne = components[2];
        const optionTwo = components[3];
        const optionThree = components[4];
        const optionFour = components[5];
        const theAnswer = components[6];
  
        questionNumber.innerHTML = number;
        question.innerHTML = questionText;
  
        option1.innerHTML = optionOne;
        option2.innerHTML = optionTwo;
        option3.innerHTML = optionThree;
        option4.innerHTML = optionFour;
  
        answer.innerHTML = ''; 
        answerConfirm = theAnswer; 
  
        picked = false;
      } else {
        console.error('Invalid data format for question:', line);
      }
    }
  
    displayQuestion(questionNumberCount); 
  
    function checkAnswer(selectedOption) {
      if (!picked) {
        picked = true; 
        if (selectedOption.innerHTML.trim() === answerConfirm.trim()) {
          answer.innerHTML = "Correct! + 1 point!";
          points += 1;
          pointsTag.innerHTML = "points: " + points;
        } else {
          answer.innerHTML = "Wrong! The real answer was: " + answerConfirm;
        }
        if(questionNumberCount >= lines.length) {
          localStorage.setItem('points', points);
          points = 0;
          setTimeout(function() {
            window.location.href = 'end_page.html'
          }, 1000);
        } else {
          questionNumberCount += 1; 
          setTimeout(function () {
            displayQuestion(questionNumberCount); 
          }, 1000); 
        }
      }
    }
  
    option1.addEventListener('click', function () {
      checkAnswer(option1);
    });
  
    option2.addEventListener('click', function () {
      checkAnswer(option2);
    });
  
    option3.addEventListener('click', function () {
      checkAnswer(option3);
    });
  
    option4.addEventListener('click', function () {
      checkAnswer(option4);
    });
  }