import './App.scss';
import { useState, useEffect, useRef } from 'react';

const baseUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/';

const audioClips = [
  { key: 'Q', sound: 'Heater-1', displayName: 'Heater 1' },
  { key: 'W', sound: 'Heater-2', displayName: 'Heater 2' },
  { key: 'E', sound: 'Heater-3', displayName: 'Heater 3' },
  { key: 'A', sound: 'Heater-4_1', displayName: 'Heater 4' },
  { key: 'S', sound: 'Heater-6', displayName: 'Clap' },
  { key: 'D', sound: 'Dsc_Oh', displayName: 'Open-HH' },
  { key: 'Z', sound: 'Kick_n_Hat', displayName: "Kick-n'-Hat" },
  { key: 'X', sound: 'RP4_KICK_1', displayName: 'Kick' },
  { key: 'C', sound: 'Cev_H2', displayName: 'Closed-HH' },
].map(clip => ({ ...clip, url: `${baseUrl}${clip.sound}.mp3` }));

function DrumPad() {
  const [display, setDisplay] = useState('');
  const padRefs = useRef({}); // Ref to hold references to the buttons

  const playSound = (clip) => {
    const audio = document.getElementById(clip.key);
    audio.currentTime = 0; // Reset to start each time
    audio.play();
    setDisplay(clip.displayName);

    // Focus the button element using refs
    const button = padRefs.current[clip.displayName];
    button.focus();
    
    // Remove focus after a short delay
    setTimeout(() => {
      button.blur(); // Defocus the button
    }, 100); // Adjust the delay as needed
  };

  // Add event listener for keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
      const clip = audioClips.find(c => c.key === event.key.toUpperCase());
      if (clip) playSound(clip);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="drum-machine">
      <div className="pad-container">
        {audioClips.map((clip) => (
          <button
            key={clip.key}
            id={clip.displayName}
            onClick={() => playSound(clip)}
            className="drum-pad"
            ref={el => padRefs.current[clip.displayName] = el} // Save ref to button
          >
            {clip.key}
            <audio
              id={clip.key}
              className="clip"
              src={clip.url}
            ></audio>
          </button>
        ))}
      </div>
      <div id="display" className="display">{display}</div>
    </div>
  );
}

export default DrumPad;
