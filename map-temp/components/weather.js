import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import api from '../services/api';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  // triggered when user starts dragging the map, and then stops
  onRegionChangeComplete({ longitude, latitude }) {
    console.log('map moved!');
    this.setState({
      pin: { longitude, latitude }
    });
    
    api(latitude, longitude).then((data) => {
      this.setState(data);
      console.log(this.state);
    }).catch(err => console.log(err));
  }

  render() {
    const { city, temperature, description } = this.state;
    return (
      <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
          <Marker 
            coordinate={this.state.pin}
            title={'testing'}
            description={'test description'}
          />
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{ city }</Text>
          <Text style={styles.text}>{ temperature }</Text>
          <Text style={styles.text}>{ capitalize(description) }</Text>
        </View>
      </View>
    );
  }
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5fcff'
  },
  map: {
    flex: 2,
    marginTop: 25
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  },
  text: {
    fontSize: 25
  }
});

export default Weather;