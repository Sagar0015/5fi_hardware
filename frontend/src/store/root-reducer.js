import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import siteCoordinatorReducer from './siteCoordinator/siteCoordinator.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  siteCoordinator: siteCoordinatorReducer
});

export default rootReducer;
