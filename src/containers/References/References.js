import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input, DismissKeyboardView, Icon } from 'components';
import { changeReference } from 'actions/ui/map';
import { strings } from 'locales';
import styles from './styles';

class References extends PureComponent {
  getReferenceError(i) {
    return this.props.bookerReferencesErrors[`bookerReferences.${i}.value`];
  }

  renderDropdownItem = (item, i) => {
    const { navigation } = this.props;

    const goToReferenceSelector = () => navigation.navigate('ReferenceValueSelector', { reference: item });
    const error = this.getReferenceError(i);

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={goToReferenceSelector}
          style={[styles.dropdownItem, error ? styles.errorBorder : {}]}
        >
          <Text style={[styles.flex, styles.dropdownItemTitle]}>{item.name}</Text>
          {item.value &&
            <Text style={[styles.flex, styles.dropdownItemValue]} numberOfLines={1}>{item.value}</Text>
          }
          <Icon name="chevron" size={16} color="#c7c7cc" style={styles.dropdownItemIcon} />
        </TouchableOpacity>
        {error && error.length > 0 &&
          <Text style={styles.error}>{error[0]}</Text>
        }
      </View>
    );
  };

  renderInputItem = (item, i) => {
    const { costCentreValue, changeReference } = this.props;
    const error = this.getReferenceError(i);
    const handleChange = value => changeReference({ ...item, value });

    return (
      <View style={styles.inputWrapper}>
        <Input
          label={item.name}
          value={item.value || ''}
          editable={!item.dropdown}
          onChangeText={handleChange}
          labelStyle={styles.inputLabel}
          inputStyle={styles.input}
          style={styles.inputContainer}
          error={error}
          selectionColor="#494949"
          pointerEvents={item.dropdown ? 'none' : 'auto'}
        />
        {item.costCentre && !!costCentreValue &&
          <TouchableOpacity style={styles.costCentre} activeOpacity={0.6} onPress={() => handleChange(costCentreValue)}>
            <Text style={styles.costCentreTitle}>{strings('label.usePassengerCostCentre')}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  renderItem = (item, i) => (
    <View key={item.id}>
      {!item.dropdown
        ? this.renderInputItem(item, i)
        : this.renderDropdownItem(item, i)
      }
    </View>
  );

  render() {
    const { bookerReferences } = this.props;
    return (
      <View style={[styles.flex, styles.container]}>
        <DismissKeyboardView style={styles.flex}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {bookerReferences.map(this.renderItem)}
          </ScrollView>
        </DismissKeyboardView>
      </View>
    );
  }
}

const mapState = ({ ui }) => ({
  bookerReferences: ui.map.fields.bookerReferences,
  bookerReferencesErrors: ui.map.fields.bookerReferencesErrors,
  costCentreValue: ui.map.fields.costCentre
});

const mapDispatch = ({
  changeReference
});

export default connect(mapState, mapDispatch)(References);
