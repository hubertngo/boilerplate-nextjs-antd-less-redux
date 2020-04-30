/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:54
*------------------------------------------------------- */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { fromJS, Iterable } from 'immutable';
import ENV from 'src/constants/env.constant';
import rootReducer, { initialState } from 'src/redux/reducers';
import rootSaga from 'src/redux/sagas';
import { combineReducers } from 'redux-immutablejs';

const sagaMiddleware = createSagaMiddleware();

const stateTransformer = (state) => {
	if (Iterable.isIterable(state)) return state.toJS();
	return state;
};

const logger = createLogger({
	stateTransformer,
	collapsed: (getState, action, logEntry) => !logEntry.error,
	predicate: (getState, action) => !['@@redux-form/CHANGE', '@@redux-form/REGISTER_FIELD'].includes(action.type),
});

export default (state = initialState) => {
	const composeMiddleware = ENV === 'production' || !process.browser ?
		compose(
			applyMiddleware(sagaMiddleware),
		) :
		compose(
			applyMiddleware(sagaMiddleware),
			applyMiddleware(logger),
		);

	const store = createStore(
		combineReducers(rootReducer),
		fromJS(state),
		composeMiddleware,
	);

	store.sagaTask = sagaMiddleware.run(rootSaga);

	return store;
};
