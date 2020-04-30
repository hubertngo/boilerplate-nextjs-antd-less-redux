/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-04-24 15:56:24
*------------------------------------------------------- */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isAuthenticated } from 'src/utils/Auth';
import { Router } from 'src/routes';

const LoginRequiredLayout = ({ children }) => {
	const [logon, setLogon] = useState(false);
	useEffect(() => {
		const checkLogin = async () => {
			const login = await isAuthenticated();
			if (login) {
				setLogon(true);
			} else {
				Router.pushRoute('/login');
			}
		};
		checkLogin();
	}, []);

	if (!logon) {
		return null;
	}
	return children;
};

LoginRequiredLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default LoginRequiredLayout;
