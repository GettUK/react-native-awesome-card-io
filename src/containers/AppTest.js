import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

export default class App extends Component {
	componentWillUnmount() {}
	render() {
		return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 20.993776,
                        longitude: 105.811417,
                        latitudeDelta: 0.021,
                        longitudeDelta: 0.021
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
		);
	}
}
