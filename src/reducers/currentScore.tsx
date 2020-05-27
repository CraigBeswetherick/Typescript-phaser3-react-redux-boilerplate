import { INCREASE_SCORE, RESET_SCORE } from '../Actions';

export interface CurrentScoreState {
  currentScore: number;
}

const defaultCurrentScoreState = (): CurrentScoreState => ({
  currentScore: 0,
});

export const currentScoreReducer = (
  state = defaultCurrentScoreState(),
  action: any
) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return handleIncreaseScoreReducer(state, action.increment);
    case RESET_SCORE:
      return handleResetScoreReducer(state);
  }

  return state;
};

const handleResetScoreReducer = (state: CurrentScoreState) => {
  return Object.assign({}, state, {
    currentScore: 0,
  });
};

const handleIncreaseScoreReducer = (
  state: CurrentScoreState,
  increment: number
) => {
  return Object.assign({}, state, {
    currentScore: state.currentScore + increment,
  });
};
