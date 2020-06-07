import { connect } from 'react-redux';
import { State } from '../../../Reducers';
import CurrentScoreView from './CurrentScoreView';
import { increaseScore } from '../../../Actions';
import { Business } from '../../../Reducers/Business';
import { Manager } from '../../../Reducers/Managers';

const mapStateToProps = (state: State) => {
  return {
    currentScore: state.currentScoreReducer.currentScore,
    currentDate: state.currentScoreReducer.currentDate,
    timePlayed: state.currentScoreReducer.timePlayed,
    businesses: state.businessReducer.businesses,
    managers: state.managerReducer.managers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncreaseScore: (businesses: Array<Business>, managers: Array<Manager>) =>
      dispatch(increaseScore(businesses, managers)),
  };
};

export const CurrentScoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentScoreView);
