/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-12-03 20:50:11
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.less';

const BtnFacebook = (props) => {
	const { size, style, className, onClick } = props;

	return (
		<a href="#" className={classes.wrapper + ' ' + className} style={style} onClick={onClick}>
			<img src="assets/images/icons/icon-facebook.svg" alt="facebook-icon" width={size} height={size} />
		</a>
	);
};

BtnFacebook.propTypes = {
	size: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	onClick: PropTypes.func.isRequired,
};

BtnFacebook.defaultProps = {
	size: 30,
	className: '',
	style: {},
};

export default BtnFacebook;
