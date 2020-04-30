/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-03-27 14:15:12
*------------------------------------------------------- */


import Amplify, { Auth, Hub } from 'aws-amplify';
import URL from 'src/constants/url.constant';

const { redirectSignIn } = URL;

Amplify.configure({
	Auth: {
		identityPoolId: process.env.identityPoolId,
		region: process.env.region,
		identityPoolRegion: process.env.identityPoolRegion,
		userPoolId: process.env.userPoolId,
		userPoolWebClientId: process.env.userPoolWebClientId,
		oauth: {
			domain: 'hummingbird.auth.ap-southeast-1.amazoncognito.com',
			redirectSignIn,
			redirectSignOut: 'http://localhost:4000/login',
			responseType: 'token',
		},
	},
});

export const normalLogin = async (username, password) => {
	return Auth.signIn(username, password);
};

export const signup = async (userData) => {
	return Auth.signUp({
		username: userData.username,
		password: userData.password,
		attributes: {
			email: userData.username,
			name: userData.name,
		},
	});
};

export const getUserAuth = async () => {
	try {
		const res = await Auth.currentSession();
		return res.idToken.payload;
	} catch {
		return false;
	}
};

export const getUserToken = async () => {
	try {
		const res = await Auth.currentSession();
		return res.idToken.jwtToken;
	} catch {
		return false;
	}
};

export const isAuthenticated = async () => {
	try {
		const res = await Auth.currentSession();
		return !!res.idToken;
	} catch {
		return false;
	}
};

export const logout = async () => {
	return Auth.signOut();
};

export const verify = async (username, code) => {
	return Auth.confirmSignUp(username, code);
};

export const federatedSignInFB = () => {
	return Auth.federatedSignIn({ provider: 'Facebook' });
};

export const federatedSignInGG = () => {
	return Auth.federatedSignIn({ provider: 'Google' });
};

export const Lib = {
	Auth,
	Hub,
};
