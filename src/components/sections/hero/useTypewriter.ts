import { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing and deleting each one.
 * Returns the current substring to render — pair it with your
 * own blinking caret element rather than baking `|` into the text,
 * so font metrics stay clean.
 */
const useTypewriter = (
  words: string[],
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1800
) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Finished typing a word — pause, then start deleting
    if (!deleting && subIndex === currentWord.length) {
      const pause = setTimeout(() => setDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    // Finished deleting — move to the next word
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return words[wordIndex].substring(0, subIndex);
};

export default useTypewriter;