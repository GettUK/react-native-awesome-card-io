import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Button } from 'components';
import Rating from './Rating';

import styles from './styles';

export default class RateDriver extends Component {
  state = {
    rating: 0,
    text: ''
  };

  onRatingChange = (value) => {
    this.setState({ rating: value });
  };

  render() {
    return (
      <View style={[styles.flex, styles.content]}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Avatar
            rounded
            width={120}
            height={120}
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }}
          />
          <View style={styles.ratingValueContainer}>
            <Text style={styles.ratingValue}>4.4</Text>
          </View>
        </View>
        <Text style={styles.name}>Kevin Willis</Text>
        <Text style={styles.greyText}>Mercedes-Benz E350</Text>
        <Rating value={this.state.rating} onChange={this.onRatingChange} />
        <Text style={styles.greyText}>Rate your driver</Text>
        <TextInput
          multiline
          style={styles.message}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button raised={false} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Send Feedback</Text>
        </Button>
        <Button raised={false} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </Button>
      </View>
    );
  }
}
