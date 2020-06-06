import { connect } from 'react-redux';
import { State } from '../../Reducers';
import GameView from './GameView';
import {
  increaseScore,
  resetScore,
  increaseDate,
  buyBusiness,
  buyManager,
} from '../../Actions';

const mapStateToProps = (state: State) => {
  return {
    currentDate: state.currentScoreReducer.currentDate,
    businesses: state.currentScoreReducer.businesses,
    managers: state.currentScoreReducer.managers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncreaseScore: (increment: number) => dispatch(increaseScore(increment)),
    onResetScore: () => dispatch(resetScore()),
    onIncreaseDate: () => dispatch(increaseDate()),
    onBuyBusiness: (businessId: number) => {
      dispatch(buyBusiness(businessId));
    },
    onBuyManager: (managerId: number) => {
      dispatch(buyManager(managerId));
    },
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);
