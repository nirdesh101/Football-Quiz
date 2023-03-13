const questions = [
    {
        question: 'Who won the 2022 world cup?',
        answers: [
          {text: 'Argentina', correct: true },
          {text: 'Portugal', correct: false },
          {text: 'France', correct: false },
          {text: 'England', correct: false }
        ],
        correctAns : "Argentina"
      },
      
      {
        question: 'Who scored the fastest goal in World Cup history?',
        answers: [
          {text: 'Cristiano Ronaldo', correct: false },
          {text: 'Miroslav Klose', correct: false },
          {text: 'Hakan Şükür', correct: true },
          {text: 'Clint Dempsey', correct: false }
        ],
        correctAns : "Hakan Şükür"
      },
      
      {
        question: 'Which country has hosted the most World Cups?',
        answers: [
          {text: 'Italy', correct: false },
          {text: 'Mexico', correct: false },
          {text: 'Germany', correct: false },
          {text: 'Brazil', correct: true }
        ],
        correctAns : "Brazil"
      },
      
      {
        question: 'Who has scored the most goals in World Cup history?',
        answers: [
          { text: 'Lionel Messi', correct: false },
          { text: 'Cristiano Ronaldo', correct: false },
          { text: 'Miroslav Klose', correct: true },
          { text: 'Pelé', correct: false }
        ],
        correctAns :"Miroslav Klose"
      },
      
      {
        question: 'Which country has won the World Cup the most times in a row?',
        answers: [
          {text: 'Brazil', correct: true },
          {text: 'Germany', correct: false },
          {text: 'Argentina', correct: false },
          {text: 'Italy', correct: false }
        ],
        correctAns : "Brazil"
      },
      
      {
        question: 'Who won the first World Cup golden boot in 1930?',
        answers: [
          {text: 'Bernard Voorhoof', correct: false },
          {text: 'Guillermo Stábile', correct: true },
          {text: 'Bert Patenaude', correct: false },
          {text: 'Preguinho', correct: false }
        ],
        correctAns : "Guillermo Stábile"
      },
      
      {
        question: 'Which country won the 2010 World Cup?',
        answers: [
          {text: 'Spain', correct: true },
          {text: 'Netherlands', correct: false },
          {text: 'Germany', correct: false },
          {text: 'Brazil', correct: false }
        ],
        correctAns : "Spain"
      },

      {
        question: 'Who won the Golden Boot award for most goals scored in the 2014 World Cup?',
        answers: [          
            {text: 'Lionel Messi', correct: false},
            {text: 'Thomas Muller', correct: true},
            {text: 'Neymar', correct: false},
            {text: 'James Rodriguez', correct: false},
        ],
        correctAns : "Thomas Muller"
      },

      {
        question: 'Who won the Golden Boot award for most goals scored in the 2018 World Cup?',
        answers: [
            {text: 'Lionel Messi', correct: false},
            {text: 'Neymar', correct: false},
            {text: 'Harry kane', correct: true},
            {text: 'Kylian Mbappe', correct: false},
        ],
        correctAns : "Harry Kane"
      },

      {
        question: 'With 202 clean sheets, which goalkeeper has the best record in the Premier League?',
        answers: [
            {text: 'Petr Cech', correct: true},
            {text: 'Alisson', correct: false},
            {text: 'De gea', correct: false},
            {text: 'Ederson', correct: false},
        ],
        correctAns : "Petr Cech"
      },

]

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionIndex = document.getElementById("number-of-question");
const quesIndexDiv = document.getElementById("quesIndex")
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const submitBtn = document.getElementById("submitBtn");

let shuffledQuestions, currentQuestionIndex
let score = 0;

nextButton.disabled = true;

  function disable(){
    nextButton.disabled = true;
  }

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()

})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  nextButton.style.display = "block";
  quesIndexDiv.style.display ="block"
  submitBtn.style.display = "none"
}

function setNextQuestion() {
    resetState()
    if (currentQuestionIndex < questions.length) {
      showQuestion(shuffledQuestions[currentQuestionIndex])
      questionIndex.innerText = currentQuestionIndex + 1 + " of " + questions.length + " questions"
    } else {
      questionContainerElement.style.display = "none"
      nextButton.style.display = "none"
      modal.style.display = "block"
      modalText.innerText = `Your score is ${score} out of ${questions.length}`
    }
  }

function showQuestion(question) {
   
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    console.log(answer.text)
    button.setAttribute("value", answer.text)
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
      score++
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.disabled = false
    } else {
      submitBtn.style.display = "block"
      questionContainerElement.style.display = "none"
      nextButton.style.display = "none"  
      quesIndexDiv.style.display ="none"
    }
  }
  

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

let i = 1
   function incrNum(){
    if(i < questions.length){
        i = i + 1
    }
       questionIndex.innerHTML = i + " of " + questions.length +" question";
    }


// MODAL Part
submitBtn.addEventListener("click", () => {
    modalText.innerHTML = "You scored " +  score + " out of " + questions.length + " questions" + " 🥳🎉" ;
    modal.style.display = "block"
    const blur = document.getElementById("blur");
    blur.classList.toggle('active')
    })