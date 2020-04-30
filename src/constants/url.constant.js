/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-02-14 16:27:58
*------------------------------------------------------- */
export default {
	API_URL: process.env.API_URL || 'http://localhost:3005/api/v1',
	WEB_URL: process.env.WEB_URL || 'http://localhost:3334',
	redirectSignIn: process.env.NODE_ENV === 'production' ? 'https://d33976b6kksjd9.cloudfront.net/login' : 'http://localhost:4000/login',
};
