  
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

const middlewares = [];

middlewares.push(createLogger());
// middlewares.push(reactNavigation)
middlewares.push(promise);

export default middlewares;