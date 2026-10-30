// The one place that decides where saved data lives in localStorage,
// so every page reads and writes the same keys.
export function progressKey(identity, goalKey) {
  return `road2code_progress_${identity}_${goalKey}`
}

export function notesKey(identity, goalKey) {
  return `road2code_notes_${identity}_${goalKey}`
}
