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

let viMeaningHTML = document.getElementById("vi");

let currentVocabulary;
let correctInputTime = 0;
let thongBao = document.getElementById("thongbao");
let thongBao2 = document.getElementById("thongbao2");

let VOCABULARIES = [{eng:"student", vi:"học sinh"}, {eng:"teacher", vi:"giáo viên"}];

let soLanNhanShift = 0;


$(".container").css("display", "block");
$(".input-text").focus();
currentVocabulary = VOCABULARIES[0];
$(".vocab").html(currentVocabulary.eng);
viMeaningHTML.innerText = currentVocabulary.vi;








$(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === SHIFT_KEY) {
          soLanNhanShift++;
          if(soLanNhanShift === 1){
            thongBao2.innerText = "rất tốt, bấm shift một lần nữa để ẩn nghĩa";
          }else{
            thongBao2.innerText = "hoàn thành hướng dẫn. Chúc mừng bạn";
          }
        
        $("#vi").slideToggle();
      }
    }
  );
  
  
  
  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === CTRL_KEY) {
        $("#thongbao").css("display", "none");
        thongBao2.innerText = "rất tốt, hãy thử bấm shift nếu bạn quên từ này nghĩa gì";
        Speaker.say(currentVocabulary.eng);
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
          goToNextVocabulary();
        }
      }
    }
  );


  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if(correctInputTime == 2){
        thongBao.innerText = "oke, bây giờ hãy bấm thử nút Ctrl để nói giọng khác";
      }
    }
  );

  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if(correctInputTime == 1){
          thongBao.innerText = "rất tốt, hãy gõ thêm một lần nữa để qua từ mới";
      }
    }
  );








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
  
  
  
  
  
  
  
  function goToNextVocabulary () {
    setTimeout(
      () => {
        currentVocabulary = VOCABULARIES[1];
        $(".vocab").html(currentVocabulary.eng);
        viMeaningHTML.innerText = currentVocabulary.vi;
      },
      DELAY_TIME_OUT
    );
  }
  
  
  
  function resetUserInputForm () {
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
  
  