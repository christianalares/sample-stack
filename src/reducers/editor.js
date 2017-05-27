import { handleActions } from 'redux-actions'

export default handleActions({
	SET_EDITOR_TAB: (state, action) => {
		return ({
			...state,
			activeTab: action.payload
		})
	},

	UPDATE_CODE: (state, action) => {
		return ({
			...state,
			updatedCode: action.payload
		})
	},
	SET_COMPILER_RESPONSE: (state, action) => {
		return ({
			...state,
			compilerResponse: action.payload
		})
	},
	SET_CONSOLE_OUTPUT: (state, action) => {
		let consoleMessage = {
			key: +new Date(),
			timestamp: new Date(),
			type: action.payload.type,
			heading: action.payload.heading,
			message: action.payload.message
		}

		return ({
			...state,
			consoleOutput: [consoleMessage, ...state.consoleOutput]
		})
	},

	CLEAR_CONSOLE: (state, action) => {
		return ({
			...state,
			consoleOutput: []
		})
	},

	SET_CONNECTED_ROBOT: (state, action) => {
		return ({
			...state,
			connectedArduino: action.payload
		})
	},

	

}, {
	activeTab: 'user',
	updatedCode: `void setup() {
	pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
	digitalWrite(LED_BUILTIN, HIGH);
	delay(200);
	digitalWrite(LED_BUILTIN, LOW);
	delay(200);
}`,
	compilerResponse: null,
	consoleOutput: [],
	connectedArduino: null
})
