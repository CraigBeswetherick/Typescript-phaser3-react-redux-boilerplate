/*
 * action types
 */
export const COMPLETE_LEVEL = 'COMPLETE_LEVEL';
export const START_LEVEL = 'START_LEVEL';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

/*
 * action creators
 */
export function completeLevel() {
  return { type: COMPLETE_LEVEL};
}

export function increaseScore(increment: number) {
  return { type: INCREASE_SCORE, increment };
}

export function resetScore() {
  return { type: INCREASE_SCORE };
}
