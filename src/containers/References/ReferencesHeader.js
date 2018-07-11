import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScreenHeader } from 'components';
import { BackHandler } from 'react-native';
import { validateReferences } from 'actions/booking';
import { showConfirmationAlert } from 'utils';
import { isEmpty } from 'lodash';
import { strings } from 'locales';

class ReferencesHeader extends PureComponent {
  componentDidMount() {
    this.backListener = BackHandler.addEventListener('backPress', async () => {
      await this.handleBackBtnPress();
      return false;
    });
  }

  componentWillUnmount() {
    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  goBack = () => this.props.navigation.goBack(null);

  handleBackBtnPress = async () => {
    if (isEmpty(await this.props.validateReferences())) {
      this.goBack();
    } else {
      showConfirmationAlert({
        title: strings('alert.title.goBack'),
        message: strings('alert.message.goBackWithReferenceErrors'),
        handler: this.goBack
      });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScreenHeader
        navigation={navigation}
        title="Booking References"
        handleBackBtnPress={this.handleBackBtnPress}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  bookerReferences: booking.bookingForm.bookerReferences
});

const mapDispatch = ({
  validateReferences
});
export default connect(mapState, mapDispatch)(ReferencesHeader);
