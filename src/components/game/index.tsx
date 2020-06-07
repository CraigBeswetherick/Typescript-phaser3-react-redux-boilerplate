import { connect } from 'react-redux';
import { State } from '../../Reducers';
import GameView from './GameView';
import { increaseDate, buyBusiness, buyManager } from '../../Actions';
import { Manager } from '../../Reducers/Managers';
import { Business } from '../../Reducers/Business';

const mapStateToProps = (state: State) => {
  return {
    currentDate: state.currentScoreReducer.currentDate,
    businesses: state.businessReducer.businesses,
    managers: state.managerReducer.managers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncreaseDate: (businesses: Array<Business>, managers: Array<Manager>) =>
      dispatch(increaseDate(businesses, managers)),
    onBuyBusiness: (businessId: number, business: Business) => {
      dispatch(buyBusiness(businessId, business));
    },
    onBuyManager: (managerId: number, manager: Manager) => {
      dispatch(buyManager(managerId, manager));
    },
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);
