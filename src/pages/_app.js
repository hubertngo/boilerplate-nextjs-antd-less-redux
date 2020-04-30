/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-02-22 17:54:41
*------------------------------------------------------- */

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from 'src/redux/store';

import NProgress from 'nprogress';
import Router from 'next/router';

import { getUserAuth } from 'src/utils/Auth';
import { getUserAuthSuccess } from 'src/redux/actions/auth.action';

import 'src/theme/index.less';
import 'src/theme/custom.less';

// const Noop = ({ children }) => children;

Router.events.on('routeChangeStart', url => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {

	componentDidMount() {
		const initialUser = async () => {
			const objUser = await getUserAuth();
			if (objUser) {
				this.props.store.dispatch(getUserAuthSuccess(objUser || {}));
			}
		};
		initialUser();
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withRedux(createStore)(withReduxSaga(MyApp));
