import { createStore, combineReducers } from 'redux';

import { Map } from 'immutable';



/****************** App Reducer ********** */

const appState = new Map({
	status : "Loading...",
	ready : false,
	error : "",
	data : null
});


const appActions = {
	GET_DATA: 'getData',
	ON_DATA: 'onData',
	ON_DATA_ERROR : 'onDataError',
	getData : () => ({
		type : appActions.GET_DATA
	}),
	onData : (data) => ({
		type : appActions.ON_DATA,
		data : data
	}),
	onDataError : (error) => ({
		type : appActions.ON_DATA_ERROR,
		error : error
	})
};


function appReducer(state = appState, action) {
  switch (action.type) {
		case appActions.GET_DATA:
			pickData();
			return state;
		case appActions.ON_DATA:
			return state.set("status", "Ready").set("ready", true).set("error", "").set("data", action.data);
		case appActions.ON_DATA_ERROR:
			return state.set("status", "in Error state : " + action.error).set("ready", false).set("error", "");
    default:
      return state;
  }
  return state;
}

function pickData(){
	// new 'fetch' api in Javascript
	fetch('/data.json').then( (response) => {
		if(response.ok === true){
			response.json().then( onData ).catch( onDataError );
		}
	} ).catch( onDataError ) ;
}

function onData(data){
	store.dispatch(appActions.onData(data));
	store.dispatch(uiActions.sendComp1Props({
		applicationName : data.appName
	}));
}

function onDataError(error){
	store.dispatch(appActions.onDataError(error));
}



/****************** UI Reducer ********** */

const uiState = new Map({
	component1Props : null,
	component2Props : null
});


const uiActions = {
	SEND_COMP1_PROPS: 'sendComp1Props',
	sendComp1Props : (props) => ({
		type : uiActions.SEND_COMP1_PROPS,
		props : props
	}),
	SEND_COMP2_PROPS: 'sendComp2Props',
	sendComp2Props : (props) => ({
		type : uiActions.SEND_COMP2_PROPS,
		props : props
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


/*********** Store ********************* */

let allReducers = combineReducers({
	app : appReducer,
	ui : uiReducer
});

const store = createStore(allReducers);

export { store, appActions, uiActions };