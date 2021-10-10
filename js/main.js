
//===========================CONFIG FILE=================================
const DELAY_TIME_OUT = 300;
const ENTER_KEY = 13;
const ENOUGH_CORRECT_TIME = 2;
const SHIFT_KEY = 16;
const CTRL_KEY = 17;

const VOLUME = 5;
const VOICE_URI = "native";
const PITCH_AUDIO = 1;
const RATE_AUDIO = 1; 
const SPEAKER_LANGUAGE = 'en-US';
const F2_KEY = 113;


let VOCABULARIES;
const vocabFileReader = new FileReader();



var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let userVoiceTextHTML = document.getElementById("voiceuser");


recognition.onresult = function (e) {
  var userVoiceText = e.results[0][0].transcript;
  userVoiceTextHTML.innerText = "oh no, you said : " + userVoiceText;
  if (userVoiceText.toLowerCase() === currentVocabulary.eng){
    correctInputTime++;
    responsiveVoice.speak(currentVocabulary.eng ); 
    $(".vocab").addClass("right-green");
    resetUserInputForm();
    userVoiceTextHTML.innerText = "";
    if (correctInputTime === ENOUGH_CORRECT_TIME) {
      goToNextRandomVocabulary();
    }
  }
}



vocabFileReader.onload = () =>{
  VOCABULARIES = vocabFileReader.result.split('\r\n').map(getVocByLine);
  VOCABULARIES = VOCABULARIES.filter( function(element){
    return element.eng !== '';
  });
  renderVocab(); 
  $(".file").css("display", "none");
  $("p").css("display", "none");
  $(".container").css("display", "block");
  $(".input-text").focus();
  document.getElementById("tutorial-el").innerText = "";
}

const inputTxtFile = document.querySelector('input[type="file"]');
inputTxtFile.addEventListener(
  'change',
  () => vocabFileReader.readAsText(inputTxtFile.files[0])
);


let viMeaningHTML = document.getElementById("vi");

let currentVocabulary;
let correctInputTime = 0;

//==========================RUN FILE============================================


$(document).on(
  "keyup",
  $('input[type="text"]'),
  (userInput) =>{
    if (userInput.keyCode === SHIFT_KEY) {
      $("#vi").slideToggle();
    }
  }
);



$(document).on(
  "keyup",
  $('input[type="text"]'),
  (userInput) =>{
    if (userInput.keyCode === CTRL_KEY) {
      Speaker.say(currentVocabulary.eng);
    }
  }
);


$(document).on(
  "keyup",
  $('input[type="text"]'),
  (userInput) =>{
    if (userInput.keyCode === F2_KEY) {
      recognition.start();
    }
  }
);



$(document).on(
  "keyup",
  $('input[type="text"]'),
  (userInput) =>{
    if (userInput.keyCode === ENTER_KEY) {
      currentVocabularyCompareWith($('input[type="text"]').val());
      resetUserInputForm();
      if (correctInputTime === ENOUGH_CORRECT_TIME) {
        goToNextRandomVocabulary();
      }
    }
  }
);






//==========================PROGRAM FILE==================================

function getVocByLine(line){
  let words = line.split(': ');
  return {eng: words[0], vi: words[1]};
}



class Speaker{
  static main = new SpeechSynthesisUtterance();
  static config(){
    Speaker.main.voiceURI = VOICE_URI;
    Speaker.main.volume = VOLUME;
    Speaker.main.rate = RATE_AUDIO;
    Speaker.main.pitch = PITCH_AUDIO;
    Speaker.main.lang = SPEAKER_LANGUAGE;
  }
  static say(msg){
    Speaker.main.text = msg;
    window.speechSynthesis.speak(Speaker.main);
  }
}




function getRandomVocab() {
  return VOCABULARIES[Math.floor(Math.random() * VOCABULARIES.length)];
} 




function goToNextRandomVocabulary () {
  setTimeout(
    () => {
      currentVocabulary = getRandomVocab();
      correctInputTime = 0;
      $(".vocab").html(currentVocabulary.eng);
      viMeaningHTML.innerText = currentVocabulary.vi;
    },
    DELAY_TIME_OUT
  );
}



function resetUserInputForm () {
  userVoiceTextHTML.innerText = "";
  setTimeout(
    () =>{
      $(".vocab").removeClass("wrong-red right-green");
      $("input").val("");
    },
    DELAY_TIME_OUT
  );
}



function currentVocabularyCompareWith (userInputValue) {
  if (userInputValue=== currentVocabulary.eng.toLowerCase() ) {
    correctInputTime++;
    responsiveVoice.speak(currentVocabulary.eng ); 
    $(".vocab").addClass("right-green");
  }
  else {
    $(".vocab").addClass("wrong-red");
  }
}




function renderVocab () {
  currentVocabulary = getRandomVocab();
  $(".vocab").html(currentVocabulary.eng);
  viMeaningHTML.innerText = currentVocabulary.vi;
}


function goTo(link){
  location = link;
}