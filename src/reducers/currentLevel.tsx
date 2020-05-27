import { COMPLETE_LEVEL } from '../Actions';

export interface CurrentLevelState {
  currentLevel: number;
}

const defaultCurrentLevelState = (): CurrentLevelState => ({
  currentLevel: 0,
});

export const currentLevelReducer = (
  state = defaultCurrentLevelState(),
  action: any
) => {
  switch (action.type) {
    case COMPLETE_LEVEL:
      return handleCompleteLevelReducer(state);
  }

  return state;
};

const handleCompleteLevelReducer = (state: CurrentLevelState) => {
  return Object.assign({}, state, {
    currentLevel: state.currentLevel + 1,
  });
};
