import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainRoute from './MainRoute';
import UserRoute from './UserRoute';

const Route = createSwitchNavigator({
  MainRoute,
  UserRoute,
});

export default createAppContainer(Route);
