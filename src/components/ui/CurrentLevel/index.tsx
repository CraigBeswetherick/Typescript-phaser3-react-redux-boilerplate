import { connect } from 'react-redux';
import { State } from '../../../reducers';
import CurrentLevelView from './CurrentLevelView';

const mapStateToProps = (state: State) => {
  return {
    currentLevel: state.currentLevelReducer.currentLevel
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export const CurrentLevelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentLevelView);
