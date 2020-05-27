import { connect } from 'react-redux';
import { State } from '../../../Reducers';
import CurrentScoreView from './CurrentScoreView';

const mapStateToProps = (state: State) => {
  return {
    currentScore: state.currentScoreReducer.currentScore,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export const CurrentScoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentScoreView);
