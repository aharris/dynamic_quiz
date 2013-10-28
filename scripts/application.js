$(document).ready(function(){
  getQuestion();
  getNextQuestion();
});

var questions = [
  {
    question: "Who is the father on the simpsons",
    choices : [
      "Homer",
      "Bart",
      "Burt Reynolds",
      "Chocolate"
    ],
    correctAnswer: 0
  },
  {
    question: "What is my name?",
    choices : [
      "Ashton",
      "Donelle",
      "Killa Cam",
      "Vanilla Bear"
    ],
    correctAnswer: 0
  },
  {
    question: "What is my birthday?",
    choices : [
      "24",
      "28",
      "18",
      "16"
    ],
    correctAnswer: 1
  }
];

var idx = 0,
  totalQuestions = questions.length;

var numberCorrect = 0;

$('#total-questions').text(totalQuestions);

var getQuestion = function() {
  $('form').empty();

  var getCurrentQuestion = questions[idx],
    question = questions[idx].question,
    choices = questions[idx].choices;

  $('#question-number').text(idx + 1);
  $('#question').text(question);

  for(var i = 0; i < choices.length; i++) {

    var choiceVal = choices[i],
    radioBtn = "<input type='radio' name='group1' value='" + choiceVal + "'>" + choiceVal + "<br>";

    $('form').append(radioBtn);
  }

};

var getNextQuestion = function() {
  $('button').on('click', function(){
    score();
    if(idx < totalQuestions - 1){
      idx++;
      getQuestion();
    } else {
      $('#questions').text('You got ' + numberCorrect + ' out of ' + totalQuestions + ' !');
    }
  });
};

var score = function() {
  var answer = $("input[type='radio']:checked").val();
  var correctAnswer = questions[idx].correctAnswer;
  var correctAnswerIdx = questions[idx].choices[correctAnswer];
  if(answer === correctAnswerIdx){
    numberCorrect++;
  }

  console.log(numberCorrect);
};









