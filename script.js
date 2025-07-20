let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakWord() {
  const word = document.getElementById("targetWord").value.trim();
  if (!word) {
    alert("Please enter a word first.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';

  const femaleVoice = voices.find(v =>
    v.lang === 'en-US' &&
    (v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('samantha') ||
     v.name.toLowerCase().includes('zira') ||
     v.name.toLowerCase().includes('woman'))
  );
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  speechSynthesis.speak(utterance);
}

function startListening() {
  let word=document.getElementById("targetWord").value.trim();
  let msg=window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!msg)
  {
    alert('not working');
  }
  let recog=new msg();
  recog.lang='en-US';
  recog.interimResults=false;
  recog.maxAlternatives=1;
  recog.onresult=function(event){
    let ans=event.results[0][0].transcript;
    if(!word)
    {
      document.getElementById("targetWord").value = ans;
    speakWord();
  show(100);

    }
    else{
      const acc=accuracy(ans, word);
      show(acc);
    }
    
  }
  recog.onerror=function(event){
    alert('Error occurred in recognition: ' + event.error);
  }
  recog.onend=function(){
    console.log('Speech recognition service disconnected');
  } 
  recog.start();

}
function accuracy(ans, word) {
  let a=ans.length;
  let b=word.length;
  c=0;
  let minLength = Math.min(a, b);for(lrt i=0;i<minLength;i++)
  {
    if(ans[i]!==word[i])
    {
      c++;
    }
  }
  return Math.round((c/word.length)*100);
}
function show(acc){
  console.log(acc);
}