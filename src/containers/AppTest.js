import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		flex: 1,
		...StyleSheet.absoluteFillObject
	}
});

export default class App extends Component {
	componentWillUnmount() {}
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					provider={PROVIDER_GOOGLE}
					minZoomLevel={0}
					maxZoomLevel={4}
					showsUserLocation
					showsMyLocationButton
					zoomEnabled
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121
					}}
				/>
			</View>
		);
	}
}
