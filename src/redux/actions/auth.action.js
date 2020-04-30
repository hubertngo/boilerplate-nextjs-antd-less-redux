/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2019-10-02 08:32:09
*------------------------------------------------------- */
export const getUserAuthSuccess = (userData, next) => {
	return {
		type: 'GET_USER_AUTH_SUCCESS',
		payload: userData,
	};
};
