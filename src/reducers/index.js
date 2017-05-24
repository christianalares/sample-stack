import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import sidebar from './sidebar'
import editor from './editor'
import admin from './admin'
import teacher from './teacher'

export default combineReducers({
	routeReducer,
	sidebar,
	editor,
	admin,
	teacher
})
