import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container_button: {
		position: 'absolute',
		backgroundColor: 'rgba(246,140,65,0.95)',
		alignSelf: 'stretch',
		flexDirection: 'row'
	},
	view: {
		height: 45,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	text: {
		fontSize: 18,
		color: '#FFF',
		fontWeight: '500'
	}
});

export default styles;
