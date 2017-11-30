import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { fork, takeEvery, put, all, call } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';



/****************** App Reducer ********** */

const appState = new Map({
	status: "Loading...",
	ready: false,
	error: "",
	data: null
});


const appActions = {
	GET_DATA: 'getData',
	ON_DATA: 'onData',
	ON_DATA_ERROR: 'onDataError',
	getData: () => ({
		type: appActions.GET_DATA
	}),
	onData: (data) => ({
		type: appActions.ON_DATA,
		data: data
	}),
	onDataError: (error) => ({
		type: appActions.ON_DATA_ERROR,
		error: error
	})
};


function appReducer(state = appState, action) {
	switch (action.type) {
		case appActions.ON_DATA:
			return state.set("status", "Ready").set("ready", true).set("error", "").set("data", action.data);
		case appActions.ON_DATA_ERROR:
			return state.set("status", "in Error state : " + action.error).set("ready", false).set("error", "");
		default:
			return state;
	}
	return state;
}


/****************** UI Reducer ********** */

const uiState = new Map({
	component1Props: null,
	component2Props: null
});


const uiActions = {
	SEND_COMP1_PROPS: 'sendComp1Props',
	sendComp1Props: (props) => ({
		type: uiActions.SEND_COMP1_PROPS,
		props: props
	}),
	SEND_COMP2_PROPS: 'sendComp2Props',
	sendComp2Props: (props) => ({
		type: uiActions.SEND_COMP2_PROPS,
		props: props
	})
};


function uiReducer(state = uiState, action) {
	switch (action.type) {
		case uiActions.SEND_COMP1_PROPS:
			return state.set("component1Props", action.props);
		case uiActions.SEND_COMP2_PROPS:
			return state.set("component2Props", action.props);
		default:
			return state;
	}
	return state;
}


/****************** Saga ************************/

function pickData(url, ...params) {
	return fetch(url, params)
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(error => {
			return Promise.reject(new Error(error));
		})
		.then(data => {
			return data;
		})
}

export function* getData() {
	yield takeEvery(appActions.GET_DATA, function* () {
		let data = yield call(pickData, '/data.json');
		if (data) {

			yield put(appActions.onData(data));
			yield put(uiActions.sendComp1Props({
				applicationName: data.appName
			}));

		} else {

			yield put(appActions.onDataError("error"));

		}
	});
}

function* saga() {
  yield all([
    fork(getData)
  ]);
}

function* rootSaga(getState) {
  yield all([
    saga()
  ]);
}

/*********** Store with Saga ********************* */

let allReducers = combineReducers({
	app: appReducer,
	ui: uiReducer
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(allReducers, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);


export { store, appActions, uiActions };