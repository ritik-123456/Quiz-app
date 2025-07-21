const questions=[
    {
        question:"which is largest animal in the world?",
        answers:[
            {text:"shark",correct:false},
            {text:"BlueWhale",correct:true},
            {text:"Elephant",correct:false},
            {text:"girrafe",correct:false},
        ]
    },
    {
        question:"which is the smallest country in the world?",
        answers:[
            {text:"Vatican city",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"srilanka",correct:false},
        ]
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:true},
            {text:"Australia",correct:false},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answerbtn");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score=0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton=e.target; 
    const correct=selectedButton.dataset.correct;
    if(correct){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
let startbtn=document.getElementById("start-btn");
startbtn.addEventListener("click",() => {
    document.querySelector(".app").style.display="none";
    startQuiz();                
    document.querySelector(".quiz").style.display="block";
});