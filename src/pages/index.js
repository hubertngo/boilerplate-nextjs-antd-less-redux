/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import Head from 'next/head';
import LoginRequire from 'src/layout/LoginRequire';
import Layout from 'src/layout/MainLayout';
import { Button } from 'antd';
import { logout } from 'src/utils/Auth';
import { Router } from 'src/routes';

const Index = (props) => {
	// const { } = props;
	const handleLogout = () => {
		logout().then(() => {
			Router.push('/login');
		});
	};

	return (
		<LoginRequire>
			<Layout>
				<Head>
					<title>Boilerplate</title>
				</Head>
				Dashboard
				<Button size="large" style={{ marginLeft: 8 }} onClick={handleLogout}>
					Cancel
				</Button>
			</Layout>
		</LoginRequire>
	);
};

Index.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Index.defaultProps = {
	// classes: {},
};

export default Index;
