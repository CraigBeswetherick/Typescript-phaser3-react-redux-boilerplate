import { connect } from 'react-redux';
import { State } from '../../reducers';
import { GameView } from './GameView';
import { completeLevel, increaseScore, resetScore } from '../../actions';

const mapStateToProps = (state: State) => {
  return {
    currentLevel: state.currentLevelReducer.currentLevel
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCompleteLevel: () => dispatch(completeLevel()),
    onIncreaseScore: (increment: number) => dispatch(increaseScore(increment)),
    onResetScore: () => dispatch(resetScore())
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);
