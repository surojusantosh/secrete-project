import { useState } from 'react';
import confetti from 'canvas-confetti';

// IMPORTS FOR YOUR ASSETS
import photo1 from '../assets/1.jpeg';
import photo2 from '../assets/2.jpeg';
import photo3 from '../assets/3.jpeg';
import askingGif from '../assets/4.gif'; // Your local GIF

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const memories = [
    {
      id: 1,
      src: photo1,
      caption: "Where it all started..."
    },
    {
      id: 2,
      src: photo2,
      caption: "All the crazy times"
    },
    {
      id: 3,
      src: photo3,
      caption: "And so many more to come"
    }
  ];

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  function moveButton() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ top: `${y}px`, left: `${x}px` });
    setNoCount(noCount + 1);
  }

  function handleYesClick() {
    setYesPressed(true);
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  function handleReset() {
    setYesPressed(false);
    setNoCount(0);
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  return (
    <div className="container">
      {yesPressed ? (
        <div className="success-container">
          {/* BACK BUTTON */}
          <button 
            onClick={handleReset}
            className="back-button"
          >
            ← Back
          </button>

          {/* SUCCESS GIF (Stays as the celebration gif) */}
          <img 
            src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" 
            alt="celebration-kiss" 
            className="success-gif"
          />
          <h1 className="success-text">Yay!!! I love you!! ❤️</h1>

          {/* THE ROAST */}
          {noCount > 0 && (
            <p className="roast-text">
               (But I saw you try to click "No" {noCount} times... 😤)
            </p>
          )}
          
          <div className="note-card">
            <p className="note-text">
              From our college days to now, every moment with you has been magic.
              I can't wait to make even more memories together. 
              Happy Valentine's Day, my love!
            </p>
          </div>

          {/* PHOTO GALLERY */}
          <div className="gallery">
            {memories.map((photo) => (
              <div key={photo.id} className="polaroid">
                <img src={photo.src} alt="memory" />
                <p>{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* ASKING GIF (Now using your local 4.gif) */}
          <img 
            className="main-gif" 
            src={askingGif} 
            alt="asking-gif" 
          />
          <h1 className="text">Will you be my Valentine?</h1>
          <div className="button-container">
            <button
              className="yes-button"
              style={{ fontSize: Math.min(noCount * 20 + 16, 100) }} 
              onClick={handleYesClick}
            >
              Yes
            </button>

            <button
              className="no-button"
              style={noCount === 0 ? {} : { position: 'fixed', top: position.top, left: position.left }}
              onMouseEnter={moveButton}
              onClick={moveButton} 
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}