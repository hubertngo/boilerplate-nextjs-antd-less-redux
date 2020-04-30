/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2019-10-02 15:22:26
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type.action';
import { applyURIFilter } from 'src/utils';

export const MODEL_NAME = 'NOTE';
export const MODEL_PLURAL = 'notes';

export const getOne = (payload = {}, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `/${id}${applyURIFilter(filter)}`,
			beforeCallType: 'GET_' + MODEL_NAME + '_DATA_REQUEST',
			successType: 'GET_' + MODEL_NAME + '_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getList = (payload = {}, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_' + MODEL_NAME + '_LIST_REQUEST' : '',
			successType: 'GET_' + MODEL_NAME + '_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const setNote = (payload = {}) => {
	return {
		type: 'SET_NOTE',
		payload,
	};
};

export const setNoteByName = (payload) => {
	return {
		type: 'SET_NOTE_BY_NAME',
		payload,
	};
};

export const upsertNote = (payload, next, nextError) => {
	const { id, ...data } = payload;

	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: '/',
				params: data,
				opt: { method: 'POST' },
				successType: `UPSERT_${MODEL_NAME}_SUCCESS`,
				afterSuccess: next,
				afterError: nextError,
			},
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: '/' + id,
			params: data,
			opt: { method: 'PUT' },
			successType: `UPSERT_${MODEL_NAME}_SUCCESS`,
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const remove = (payload, next) => {
	const { id } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `/${id}`,
			params: id,
			opt: { method: 'DELETE' },
			successType: 'DELETE_' + MODEL_NAME + '_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const setNoteById = (payload) => {
	return {
		type: 'SET_NOTE_BY_ID',
		payload,
	};
};
