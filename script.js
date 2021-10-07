const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const letters = document.querySelector('.btn-letters');
const notes = document.querySelector('.btn-notes');
const btn = document.querySelector('.fullscreen');

const addLetters = () => {
  letters.classList.add('btn-active');
  notes.classList.remove('btn-active');
  pianoKeys.forEach((elem) => {
    elem.classList.add('piano-key-letter');
  })
}

const addNotes = () => {
  notes.classList.add('btn-active');
  letters.classList.remove('btn-active');
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-letter');
  })
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

const playAudioKeyboard = (event) => {
  const audio = document.querySelector(`audio[data-letter="${event.code[3]}"]`);
  const keyNote = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);

  if (!audio) return;
  if(event.repeat) return;

  const src = audio.src;
  audio.currentTime = 0;
  audio.play(src);

  keyNote.classList.add('piano-key-active');
  keyNote.classList.add('piano-key-active-pseudo');
  pianoKeys.forEach(key => key.addEventListener('transitionend', removeActive));
}

function removeActive (elem) {
  if(elem.propertyName !== 'transform') return;
  elem.target.classList.remove('piano-key-active');
  elem.target.classList.remove('piano-key-active-pseudo');
}

function playAudio(event) {
  const audio = new Audio();
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }
}
  
const startSound = (event) => {
    if (event.target.classList.contains('piano-key')) {
      event.target.classList.add('piano-key-active');
      event.target.classList.add('piano-key-active-pseudo');
    }
      playAudio(event);
  }

const stopSound = (event) => {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
  }

const startMouseOver = (event) => {
    if (event.target.classList.contains('piano-key')) {
      event.target.classList.add('piano-key-active');
      event.target.classList.add('piano-key-active-pseudo');
    }
      piano.addEventListener('mouseover', startSound);
      piano.addEventListener('mouseout', stopSound);
  }

const stopMouseOver = () => {
    pianoKeys.forEach((elem) => {
      elem.classList.remove('piano-key-active');
      elem.classList.remove('piano-key-active-pseudo');
    })
      piano.removeEventListener('mouseover', startSound);
      piano.removeEventListener('mouseout', stopSound);
  }
  
  piano.addEventListener('mousedown', playAudio);
  piano.addEventListener('mousedown', startMouseOver);
  document.body.addEventListener('mouseup', stopMouseOver);

  window.addEventListener('keydown', playAudioKeyboard);

  letters.addEventListener('click', addLetters);
  notes.addEventListener('click', addNotes);

  btn.addEventListener('click', toggleFullScreen);
