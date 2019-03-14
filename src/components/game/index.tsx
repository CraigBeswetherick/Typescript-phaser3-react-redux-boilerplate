import { connect } from 'react-redux';
import { State } from '../../reducers';
import { MemoryMazeView } from './MemoryMazeView';
import { completeLevel, increaseScore, resetScore } from '../../actions';

const mapStateToProps = (state: State) => {
  return {
    currentLevel: state.currentLevelReducer.currentLevel,
    currentScore: state.currentScoreReducer.currentScore
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCompleteLevel: (level: number) => dispatch(completeLevel()),
    onIncreaseScore: (increment: number) => dispatch(increaseScore(increment)),
    onResetScore: () => dispatch(resetScore())
  };
};

export const MemoryMazeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoryMazeView);
