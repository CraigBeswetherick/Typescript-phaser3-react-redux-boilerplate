import { connect } from 'react-redux';
import { State } from '../../../Reducers';
import CurrentScoreView from './CurrentScoreView';

const mapStateToProps = (state: State) => {
  return {
    currentScore: state.currentScoreReducer.currentScore,
    currentDate: state.currentScoreReducer.currentDate,
    timePlayed: state.currentScoreReducer.timePlayed,
  };
};

export const CurrentScoreContainer = connect(mapStateToProps)(CurrentScoreView);
