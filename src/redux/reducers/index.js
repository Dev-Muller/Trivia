// reducers
import { combineReducers } from 'redux';
import game from './game';
import player from './player';
import ranking from './ranking';

const rootReducer = combineReducers({ game, player, ranking });

export default rootReducer;
