import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'components';
import { ReferenceValueSelector } from 'containers';
import { changeReference, validateReferences } from 'actions/booking';
import { strings } from 'locales';
import { isNumber } from 'lodash';
import styles from './styles';


class References extends PureComponent {
  getReferenceError = () => {
    const { booking: { bookingForm: { bookerReferencesErrors = {} } }, referenceIndex } = this.props;

    return bookerReferencesErrors && bookerReferencesErrors[`bookerReferences.${referenceIndex}.value`];
  };

  renderInputItem = (item) => {
    const { booking: { bookingForm: { costCentre } }, changeReference, validateReferences, onClose } = this.props;
    const error = this.getReferenceError();
    const handleChange = value => changeReference({ ...item, value });
    const handleValidateReferences = () => {
      const isEmptyValue = (item.value || '') === '';

      if (!isEmptyValue) onClose();
      setTimeout(() => {
        if (!isEmptyValue) validateReferences();
      }, 350); // for smooth animation
    };
    const handleCostCentre = () => {
      handleChange(costCentre);
      onClose();
    };

    return (
      <View style={styles.inputWrapper}>
        <Input
          label={item.name}
          returnKeyLabel={'Done'}
          returnKeyType={'done'}
          blurOnSubmit
          onSubmitEditing={handleValidateReferences}
          value={item.value || ''}
          editable={!item.dropdown}
          onChangeText={handleChange}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          style={styles.inputContainer}
          error={error}
          pointerEvents={item.dropdown ? 'none' : 'auto'}
        />
        {item.costCentre && !!costCentre &&
          <TouchableOpacity style={styles.costCentre} activeOpacity={0.6} onPress={handleCostCentre}>
            <Text style={styles.costCentreTitle}>{strings('booking.label.usePassengerCostCentre')}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  renderContent = (item) => {
    const { changeReference, onClose } = this.props;
    return (item.dropdown
      ? <ReferenceValueSelector reference={item} changeReference={changeReference} onClose={onClose}/>
      : this.renderInputItem(item)
    );
  };

  render() {
    const { referenceIndex, booking: { bookingForm: { bookerReferences = [] } } } = this.props;
    return isNumber(referenceIndex) && this.renderContent(bookerReferences[referenceIndex]);
  }
}

const mapState = ({ booking }) => ({
  booking
});

const mapDispatch = ({
  changeReference,
  validateReferences
});

export default connect(mapState, mapDispatch)(References);
