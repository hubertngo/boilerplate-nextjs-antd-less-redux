/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-01-07 19:09:21
*------------------------------------------------------- */
import note, { initialState as initialNote } from './note.reducer';
import auth, { initialState as initialAuth } from './auth.reducer';

export const initialState = {
	auth: initialAuth,
	note: initialNote,
};

export default {
	auth,
	note,
};
