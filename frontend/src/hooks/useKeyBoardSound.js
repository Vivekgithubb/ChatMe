const keyStrokeSounds = [new Audio("/sounds/keystroke1.mp3")];

function useKeyboardSound() {
  const playRandomKey = () => {
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
    randomSound.currentTime = 0; // fior better user experience
    randomSound.play();
  };

  return { playRandomKey };
}

export default useKeyboardSound;
