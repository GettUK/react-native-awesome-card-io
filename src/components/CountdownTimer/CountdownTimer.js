import React, { PureComponent } from 'react';
import timer from 'react-timer-hoc';
import { Text } from 'react-native';
import moment from 'moment';
import { setCurrentOrder, deleteCurrentOrder } from 'utils';
import styles from './styles';

class CountdownTimer extends PureComponent {
  state = {
    endTime: this.props.endTime || moment()
  };

  componentDidMount() {
    setCurrentOrder(this.props.orderId, this.state.endTime);
  }

  componentDidUpdate(_, { endTime }) {
    const { timer, onCountdownComplete, orderId } = this.props;
    const now = moment();
    if (now.unix() + 1 >= endTime.unix()) {
      timer.stop();
      deleteCurrentOrder(orderId);
      onCountdownComplete();
    }
  }

  render() {
    const { endTime } = this.state;
    const now = moment();
    const remainingTime = moment(endTime.diff(now));

    return (
      <Text style={[styles.timer, !remainingTime.minute() ? styles.timerEnds : {}]}>
        {remainingTime.format(remainingTime.minute() > 0 ? 'm:ss' : ':ss')}
      </Text>
    );
  }
}

export default timer(1000)(CountdownTimer);
