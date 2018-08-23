/* eslint-disable no-trailing-spaces */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { omit } from 'lodash';

import { Modal, Icon, Divider } from 'components';

import { color } from 'theme';

import { withTheme } from 'providers';

import { strings } from 'locales';

import styles from './styles';

const ORDER_PANEL_WIDTH = 40;
const ROW_HEIGHT = 64;

class StopPointsModal extends PureComponent {
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

  state = {
    isDragging: false
  }

  componentDidUpdate({ data: dataProps }) {
    const { data } = this.props;

    if (data !== dataProps) {
      this.order = Object.keys(data);
    }
  }

  handleEditAddress = (id) => {
    if (id < 0) {
      this.props.onAddPoint();
      return;
    }
    const { data, onEditAddress } = this.props;

    const keys = Object.keys(data);
    const index = keys.findIndex(item => data[item].id === id);
    const address = data[keys[index]];
    const type = index < (keys.length - 1) ? 'stops' : 'destinationAddress';

    onEditAddress(address, { type, index }, true);
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

    this.props.onChangeAddress({ stops });

    this.props.onRowMoved();
  };

  renderRow = ({ line, id = -1, textStyle = styles.listItemLabel, canDelete = true }) => (
    <TouchableWithoutFeedback onPress={this.handleEditAddress.bind(null, id)}>
      <View style={styles.rowWrapper}>
        <View style={styles.rowInnerWrapper}>
          <View style={styles.dragButton}>
            <Icon name="drag" size={15} />
          </View>

          <Text style={textStyle} numberOfLines={1}>{line}</Text>

          {canDelete && <TouchableWithoutFeedback onPress={this.handleDeleteAddress.bind(null, id)}>
            <View style={styles.deleteButton}>
              <Icon name="close" size={16} color={color.secondaryText} />
            </View>
          </TouchableWithoutFeedback>}
        </View>

        <View style={styles.dividerWrapper}>
          <Divider left={2} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  isAddStopAvailable = (index = Object.values(this.order).length) => index <= 4;

  renderAddButton = () => (
    this.isAddStopAvailable()
      ? this.renderRow({
        line: strings('booking.label.addStopPoint'),
        textStyle: styles.addButtonLabel,
        canDelete: false
      }) : null
  )

  renderStops = () => {
    const renderIt = ({ child, index = '+', needIcon = true }) => (
      <View key={`${index}`} style={styles.counterItemContainer}>
        <View style={styles.counterRoundedWrapperStyle}>
          {child || <Text style={styles.counterTextStyle}>{index + 1}</Text>}
        </View>
        {needIcon &&
          <View style={styles.dividerLineBtnStyle}>
            <Icon name="dottedLine" pointsNum={9} size={20} gradientColorStart="#615FFF" gradientColorStop="#615FFF" />
          </View>}
      </View>
    );

    const renderIterator = () => this.order.map((child, index) =>
      renderIt({ index, needIcon: this.isAddStopAvailable(index + 1) }));

    const renderPlus = () => renderIt({
      child: <Text style={styles.plusBtnStyle}> + </Text>,
      needIcon: false
    });

    const renderIcon = (inverted = false) => {
      const start = inverted ? '#615FFF' : '#48B5FF';
      const stop = inverted ? '#48B5FF' : '#615FFF';
      return (
        <View style={styles.iconStyle}>
          <Icon name="dottedLine" pointsNum={9} gradientColorStart={start} gradientColorStop={stop} size={20} />
        </View>
      );
    };

    return (
      <View style={[styles.leftPanelContainer, { height: this.getListHeight() }]}>
        {renderIcon()}

        {this.order.length > 0 && renderIterator()}
        {this.isAddStopAvailable() && renderPlus()}

        {renderIcon(true)}
      </View>
    );
  }

  order = Object.keys(this.props.data);

  getListHeight = (defaultHeight = 60) => (
    Object.keys(this.props.data).length * defaultHeight
  )

  handleDragStart = () => this.setState({ isDragging: true });

  handleDragStop = () => this.setState({ isDragging: false });

  renderList = () => {
    const { data } = this.props;
    const keys = Object.keys(data);

    const order = keys.length !== this.order.length ? keys : this.order;

    return (
      <View style={[styles.wrapper, { height: 100 + this.getListHeight() }]}>
        <View style={{ height: this.getListHeight() }}>
          <SortableListView
            data={data}
            order={order}
            disableSorting={this.order && this.order.length <= 1}
            activeOpacity={0.92}
            sortRowStyle={styles.sortRowStyle}
            onMoveStart={this.handleDragStart}
            onMoveEnd={this.handleDragStop}
            onRowMoved={this.handleRowMoved}
            renderRow={this.renderRow}
            scrollEnabled={false}
            limitScrolling
          />
        </View>

        {this.renderAddButton()}
      </View>
    );
  }

  renderOrderPanel = () => (
    <View style={{ width: ORDER_PANEL_WIDTH, height: this.getListHeight() }}>
      {!this.state.isDragging && this.renderStops()}
    </View>
  )

  render() {
    const { isVisible, onClose } = this.props;

    const height = 40 + this.getListHeight() + (this.isAddStopAvailable() ? ROW_HEIGHT : 0);

    return (
      <Modal isVisible={isVisible} onClose={onClose} >
        <View style={{ flexDirection: 'row', height }}>
          {this.renderOrderPanel()}
          {this.renderList()}
        </View>
      </Modal>
    );
  }
}

export default withTheme(StopPointsModal);
