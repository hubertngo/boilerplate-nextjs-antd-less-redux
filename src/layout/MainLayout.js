/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-04-24 16:20:31
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'src/components/MainLayout';

const LMainLayout = ({ children }) => {
	return (
		<div style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh' }}>
			<MainLayout>
				{children}
			</MainLayout>
		</div>
	);
};

LMainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

LMainLayout.defaultProps = {
	// classes: {},
};

export default LMainLayout;
