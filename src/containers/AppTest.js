import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATTITIDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;
export default class App extends Component {
	state = {
		initialPosition: {
			latitude: 0,
			longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
		},
		markerPosition: {
            latitude: 0,
            longitude: 0
		}
	};
	watchID = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = parseFloat(position.coords.latitude);
			const long = parseFloat(position.coords.longitude);

			const initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITIDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            };
			console.log('initialRegion:', initialRegion);
			this.setState({initialPosition: initialRegion});
            this.setState({markerPosition: initialRegion});
		},
		e => { console.log('', e); },
		{enableHighAccuracy: true, timeout: 10000, maximumAge: 1000});
		this.watchID = navigator.geolocation.watchPosition(position => {
                const lat = parseFloat(position.coords.latitude);
                const long = parseFloat(position.coords.longitude);

                const lastRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATTITIDE_DELTA,
                    longitudeDelta: LONGTITUDE_DELTA
                };
                console.log('lastRegion:', lastRegion);
                this.setState({initialPosition: lastRegion});
                this.setState({markerPosition: lastRegion});
            },
            e => { console.log('error::', e); },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000});
	}
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
	}
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					provider={PROVIDER_GOOGLE}
					minZoomLevel={0}
					// maxZoomLevel={4}
					showsUserLocation
					showsMyLocationButton
					zoomEnabled
					region={this.state.initialPosition}
				/>
			</View>
		);
	}
}
