$(document).ready(function(){
  login();
  fetchData();
  getQuestion();
  getNextQuestion();
  goBack();
  saveAnswers();
});

var name;

var login = function () {
  if(!docCookies.hasItem('name')) {
    name = prompt('Enter Name');
    docCookies.setItem('name', name)
  } else {
    name = docCookies.getItem('name');
    document.getElementById('welcome').innerText = 'Welcome ' + name;
  }
};

var fetchData = function () {
    var req = new XMLHttpRequest();
    req.open("GET", "scripts/data.json", false);
    req.send(null);
    return JSON.parse(req.responseText);
};

var idx = 0,
  questions = fetchData().questions,
  totalQuestions = questions.length
  questionEl = $('#questions');

var numberCorrect = 0;

$('#total-questions').text(totalQuestions);

var saveAnswers = function () {
  questions[idx].givenAnswer = $("input[type='radio']:checked").val();
}

var getQuestion = function() {
  questionEl.fadeOut("slow", function () {
    $('form').empty();

    var getCurrentQuestion = questions[idx],
      question = questions[idx].question,
      choices = questions[idx].choices;

    $('#question-number').text(idx + 1);
    $('#question').text(question);

    for(var i = 0; i < choices.length; i++) {

      var choiceVal = choices[i],
      selectedRadioBtn = "<input type='radio' name='group1' value='" + choiceVal + "' checked='true' >" + choiceVal + "<br>";
      radioBtn = "<input type='radio' name='group1' value='" + choiceVal + "'>" + choiceVal + "<br>";

      if (questions[idx].givenAnswer === choices[i]) {
        $('form').append(selectedRadioBtn);
      } else {
        $('form').append(radioBtn);
      }
    }
  });
  questionEl.fadeIn("slow");

};

var getNextQuestion = function() {
  $('button').on('click', function(){
    if ($("input[type='radio']:checked").val()) {
      saveAnswers();
      if(idx < totalQuestions - 1){
        idx++;
        getQuestion();
      } else {
        score();
        $('#questions').text('You got ' + numberCorrect + ' out of ' + totalQuestions + ' !');
      }
    } else {
      alert("Please enter an answer");
    }
  });
};

var goBack = function () {
  $('#back').on('click', function(e){
    saveAnswers();
    e.preventDefault();
    getPreviousQuestion();
  });
};

var getPreviousQuestion = function () {
  if (idx > 0) {
    idx--;
    getQuestion();
  }
};

var score = function() {
  var answer = $("input[type='radio']:checked").val();

  for (var i = 0; i < totalQuestions; i++) {
    var correctAnswer = questions[i].correctAnswer ? questions[i].correctAnswer : null;
    var givenAnswer = questions[i].givenAnswer ? questions[i].givenAnswer : null;

    if (correctAnswer && givenAnswer) {
      if(correctAnswer.toString() === givenAnswer.toString()){
        numberCorrect++;
      }
    }
  };

  console.log(numberCorrect);
};

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },


  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};









