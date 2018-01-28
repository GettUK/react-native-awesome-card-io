import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import NavigatorApp from 'navigators/navigatorApp';
import { connect } from 'react-redux';

import { changeIsOpenKeyboard } from 'actions/app/statuses';

class AppContainer extends Component {
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide
		);
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	keyboardDidShow = () => {
		this.props.dispatch(changeIsOpenKeyboard(true));
	};
	keyboardDidHide = () => {
		this.props.dispatch(changeIsOpenKeyboard(false));
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<NavigatorApp
					navigation={addNavigationHelpers({
						dispatch: this.props.dispatch,
						state: this.props.navigatorApp
					})}
				/>
			</View>
		);
	}
}
AppContainer.propTypes = {
	navigatorApp: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

function select({ router }) {
	return {
		navigatorApp: router.navigatorApp
	};
}

export default connect(select)(AppContainer);
