import { connect } from 'react-redux';
import { State } from '../../Reducers';
import PreloaderView from './PreloaderView';

const mapStateToProps = (state: State) => {
  return {
    currentLevel: state.currentLevelReducer.currentLevel,
  };
};

export const PreloaderContainer = connect(mapStateToProps)(PreloaderView);
