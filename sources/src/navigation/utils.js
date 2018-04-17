import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware('root', state => state.navigation);
const addListener = createReduxBoundAddListener('root');

export { middleware, addListener };
