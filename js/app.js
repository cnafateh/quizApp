import allQuestions from './questions/questions.json' assert {type: 'json'};


const page = document.querySelector(".page")
let startBtn = page.querySelector(".startBtn")
let questions = []

// ###################################################################################

// FUNCTIONS

let createRandomNum = function(count){
  // create count+1 questions but createPage func use "index number 1" to "index number count" for generating questions :)
    for(let i = 0; i <= count; i++){
      let randomNum = Math.floor(Math.random() * allQuestions.length);
      questions.push(allQuestions[randomNum])
    }
    console.log(questions)
}

let movePage = function(n){
    page.style.transform = `translate(-${n * 100}%, 0)`
}

let createPages = function(count){
  for(let i = 1; i <= count; i++){
    if(i != count){
    page.innerHTML += `
                    <div class="page" style="position: absolute; top: 0; left: ${i * 100}%;">
                        <h2 class="question">${i}- ${questions[i].question}</h2>
                        <p data-answer="${questions[i].answer}" data-option="A" class="option option_hover">${questions[i].A}</p>
                        <p data-answer="${questions[i].answer}" data-option="B" class="option option_hover">${questions[i].B}</p>
                        <p data-answer="${questions[i].answer}" data-option="C" class="option option_hover">${questions[i].C}</p>
                        <p data-answer="${questions[i].answer}" data-option="D" class="option option_hover">${questions[i].D}</p>
                        <button class="nextBtn">Next</button>
                    </div>
                    `
    startBtn = page.querySelector(".startBtn")
    }else{
      page.innerHTML += `
                    <div class="page" style="position: absolute; top: 0; left: ${i * 100}%;">
                        <h2 class="question">${i}- ${questions[i].question}</h2>
                        <p data-answer="${questions[i].answer}" data-option="A" class="option option_hover">${questions[i].A}</p>
                        <p data-answer="${questions[i].answer}" data-option="B" class="option option_hover">${questions[i].B}</p>
                        <p data-answer="${questions[i].answer}" data-option="C" class="option option_hover">${questions[i].C}</p>
                        <p data-answer="${questions[i].answer}" data-option="D" class="option option_hover">${questions[i].D}</p>
                        <button class="seeResult">See result</button>
                    </div>
                        `
    startBtn = page.querySelector(".startBtn")
    }
  }
}
let winOrLose = function(){
  let totalQuestions = Number(localStorage.getItem("totalQuestions"))
  let correctAnswers = Number(localStorage.getItem("correctAnswer"))
  let status = correctAnswers/totalQuestions
  if(status >= 0.5){
    return true
  }else{
    return false
  }
}
let createResultPage = function(){
  let totalQuestions = Number(localStorage.getItem("totalQuestions"))
  let correctAnswers = Number(localStorage.getItem("correctAnswer"))
  if(winOrLose()){
    page.innerHTML += `
                        <div class="page" style="position: absolute; top: 0; left: ${(totalQuestions + 1)* 100}%;">
                          <div class="imgContainer"><img src="./imgs/win.png" width="150"></div>
                          <p class="resultP"><span class="redP">${correctAnswers}</span> questions of <span class="redP">${totalQuestions}</span> questions was correct</p>
                        </div>
                        ` 
  }else{
    page.innerHTML += `
                        <div class="page" style="position: absolute; top: 0; left: ${(totalQuestions + 1)* 100}%;">
                          <div class="imgContainer"><img src="./imgs/lose.png" width="150"></div>
                          <p class="resultP"><span class="redP">${correctAnswers}</span> questions of <span class="redP">${totalQuestions}</span> questions was correct</p>
                        </div>
                        ` 
  }
}
var flag = 0
let correctAnswer = function(target){
  target.style.border =  "none"
  target.style.background = "rgba(54, 175, 255, 0.802)"
  target.style.borderRadius = "12px"  
  target.style.transition = "2s"  
  const options = document.querySelectorAll(".option")
  for(let i = flag; i < flag + 4; i++){
  options[i].classList.remove("option_hover")}
  flag += 4
}

let wrongAnswer = function(target){
  target.style.border =  "none"
  target.style.background = "rgba(255, 58, 58, 0.768)"
  target.style.borderRadius = "12px"  
  target.style.transition = "2s"  
  const options = document.querySelectorAll(".option")
  for(let i = flag; i < flag + 4; i++){
  options[i].classList.remove("option_hover")}
  flag += 4
}
// ###################################################################################

// CODE
let pageCounter = 0
let correctAnswers = 0
let nextBtnStatus = false

startBtn.addEventListener("click", function(){
  const count = document.querySelector("input").value
  if(count.length !== 0){
  localStorage.setItem("totalQuestions", `${count}`)
  localStorage.setItem("correctAnswer", `${correctAnswers}`)
  createRandomNum(count)
  createPages(count)
  const nextBtn = document.querySelectorAll(".nextBtn")
  const options = document.querySelectorAll(".option")
  const seeResult = document.querySelector(".seeResult")
  pageCounter++
  movePage(pageCounter)

  for(let i = 0; i < nextBtn.length; i++){
    nextBtn[i].addEventListener("click", function(){
      if(nextBtnStatus){
        pageCounter++
        movePage(pageCounter)
        nextBtnStatus = false
      }
    })
    }

  for(let i = 0; i < options.length; i++){
    options[i].addEventListener("click", function(e){
      nextBtnStatus = true
      if(options[i].dataset.answer == options[i].dataset.option){
        correctAnswer(e.target)
        correctAnswers++
        localStorage.setItem("correctAnswer", `${correctAnswers}`)
      }else{
        wrongAnswer(e.target)
      }
    })
    }

  seeResult.addEventListener("click", function(){
    if(nextBtnStatus){
    createResultPage()
    pageCounter++
    movePage(pageCounter)
    nextBtnStatus = false
    }
  })
}
})