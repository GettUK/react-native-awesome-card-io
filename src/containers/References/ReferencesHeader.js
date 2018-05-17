import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScreenHeader } from 'components';
import { BackHandler } from 'react-native';
import { setReferenceErrors, validateReferences } from 'actions/ui/map';
import { showConfirmationAlert } from 'utils';
import { some, isEmpty } from 'lodash';
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

  anyConditionalPresent = () => some(this.props.bookerReferences, ref => ref.conditional && !isEmpty(ref.value));

  validateReferences = async () => {
    const { bookerReferences, setReferenceErrors, validateReferences } = this.props;
    let errors = {};
    bookerReferences.forEach((ref, i) => {
      if (ref.conditional && !this.anyConditionalPresent()) {
        errors[`bookerReferences.${i}.value`] = ['fill at least one of these fields'];
      }
      if (ref.mandatory && isEmpty(ref.value)) {
        errors[`bookerReferences.${i}.value`] = ['is not present'];
      }
    });

    if (isEmpty(errors)) {
      try {
        await validateReferences();
      } catch ({ response }) {
        errors = response.data.errors;
      }
    }

    setReferenceErrors(errors);
    return errors;
  };


  handleBackBtnPress = async () => {
    if (isEmpty(await this.validateReferences())) {
      this.goBack();
    } else {
      showConfirmationAlert({
        title: strings('goBack'),
        message: strings('information.goBackWithReferenceErrors'),
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

const mapState = ({ ui }) => ({
  bookerReferences: ui.map.fields.bookerReferences
});

const mapDispatch = ({
  setReferenceErrors,
  validateReferences
});
export default connect(mapState, mapDispatch)(ReferencesHeader);
