/* eslint-disable no-case-declarations */
/* eslint-disable curly */
/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email tientran0019@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-06-18 23:56:39
 *-------------------------------------------------------*/
import { fromJS } from 'immutable';

import { spliceOne } from 'src/utils';

import { MODEL_NAME } from 'src/redux/actions/note.action';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	view: {
	},
	history: [],
});

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NOTE':
			return state.update('view', () => {
				return action.payload;
			});
		case 'SET_NOTE_BY_NAME':
			if (!action.payload) return state.update('view', () => {
				return {};
			});

			const note = state.get('list') ? state.get('list').data.find(item => item.name === action.payload) : {};
			return state.update('view', () => {
				return note;
			}).update('history', (history) => {
				return [note, ...history.filter(item => item._id !== note._id)];
			});
		case 'SET_NOTE_BY_ID':
			if (!action.payload) return state.update('view', () => {
				return {};
			});
			const nodeFromList = state.get('list').data.find(item => item._id === action.payload);
			const nodeFromHistory = state.get('history').find(item => item._id === action.payload);
			const noteID = nodeFromList || nodeFromHistory || {};
			return state.update('view', () => {
				return noteID;
			}).update('history', (history) => {
				return [noteID, ...history.filter(item => item._id !== noteID._id)];
			});
		case `GET_${MODEL_NAME}_LIST_REQUEST`:
			return state.update('list', () => {
				return initialState.get('list');
			});

		case `GET_${MODEL_NAME}_LIST_SUCCESS`: {
			return state.update('list', () => {
				return {
					...action.payload,
					data: action.payload.data,
					loading: false,
				};
			});
		}

		case `GET_${MODEL_NAME}_DATA_REQUEST`:
			return state.update('view', () => {
				return initialState.get('view');
			});

		case `GET_${MODEL_NAME}_DATA_SUCCESS`:
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			}).update('history', (history) => {
				return [action.payload, ...history];
			});

		case `UPSERT_${MODEL_NAME}_SUCCESS`: {
			return state.update('list', (list) => {
				const { _id } = action.payload;

				if (list.data) {
					const index = list.data.findIndex((row) => {
						return row._id === _id;
					});

					if (index >= 0) {
						list.data[index] = { ...list.data[index], ...action.payload }; // eslint-disable-line
					}
					return { ...list, data: [...list.data] };
				}

				return initialState.get('list');
			}).update('view', (view) => {
				return { ...view, ...action.payload };
			});
		}

		case `DELETE_${MODEL_NAME}_SUCCESS`: {
			return state.update('list', (list) => {
				const { id } = action.payload;

				if (list.data) {
					const index = list.data.findIndex((row) => {
						return row._id === id;
					});

					spliceOne(list.data, index);
					list.total = list.total - 1; // eslint-disable-line
					list.skip = list.skip - 1; // eslint-disable-line

					return { ...list, data: [...list.data] };
				}

				return initialState.get('list');
			}).update('view', () => {
				return {};
			});
		}

		default:
			return state;
	}
};
