import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { omit } from 'lodash';

import { Modal, Icon } from 'components';

import styles from './styles';

export default class StopPointsModal extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    isVisible: PropTypes.bool,
    onEditAddress: PropTypes.func.isRequired,
    onAddPoint: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onRowMoved: PropTypes.func.isRequired
  };

  static defaultProps = {
    isVisible: false
  }

  componentWillUpdate({ data }) {
    const { data: dataProps } = this.props;

    if (data !== dataProps) {
      this.order = Object.keys(data);
    }
  }

  handleEditAddress = (id) => {
    const { data, onEditAddress } = this.props;

    const keys = Object.keys(data);
    const index = keys.findIndex(item => data[item].id === id);
    const address = data[keys[index]];
    const type = index < (keys.length - 1) ? 'stops' : 'destinationAddress';

    onEditAddress(address, { type, index });
  }

  handleDeleteAddress = (id) => {
    const { data } = this.props;

    const key = this.order.find(key => data[key].id === id);

    const filteredObject = omit(data, key);

    const keys = Object.keys(filteredObject);

    this.changePath(filteredObject, keys);
  }

  handleRowMoved = (meta) => {
    this.order.splice(meta.to, 0, this.order.splice(meta.from, 1)[0]);

    this.changePath(this.props.data, this.order);
  }

  changePath = (data, order) => {
    const stops = order.map(id => data[id]);
    const destinationAddress = stops.pop();

    this.props.onChangeAddress({ destinationAddress });
    this.props.onChangeAddress({ stops });

    this.props.onClose();

    this.props.onRowMoved();
  }

  renderRow = ({ line, id }) => (
    <TouchableWithoutFeedback onPress={this.handleEditAddress.bind(null, id)}>
      <View style={styles.listItem}>
        <Icon name="drag" />

        <Text style={styles.listItemLabel} numberOfLines={2}>{line}</Text>

        {Object.keys(this.props.data).length > 1
          ? <TouchableWithoutFeedback onPress={this.handleDeleteAddress.bind(null, id)}>
            <View style={styles.deleteButton}>
              <Icon name="close" size={16} />
            </View>
          </TouchableWithoutFeedback>
          : <View style={styles.deleteButton} />
        }
      </View>
    </TouchableWithoutFeedback>
  )

  renderAddButton = () => (
    <TouchableWithoutFeedback onPress={this.props.onAddPoint}>
      <View style={styles.addButton}>
        <Icon name="add" size={24} />
        <Text style={styles.addButtonLabel}>Add stop point</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  order = Object.keys(this.props.data);

  render() {
    const { data, isVisible, onClose } = this.props;

    const listHeight = Object.keys(data).length * 60;

    return (
      <Modal
        isVisible={isVisible}
        onClose={onClose}
      >
        <View style={[styles.wrapper, { height: 64 + listHeight }]}>
          <SortableListView
            style={{ height: listHeight }}
            data={data}
            order={this.order}
            onRowMoved={this.handleRowMoved}
            renderRow={this.renderRow}
            scrollEnabled={false}
            limitScrolling
          />

          {this.renderAddButton()}
        </View>
      </Modal>
    );
  }
}
