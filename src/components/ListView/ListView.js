import React, { PureComponent } from 'react';
import { View, Text, FlatList, SectionList, Platform, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './styles';

class ListView extends PureComponent {
  renderList = () => {
    const { style, items, typeSections, loading, theme, ...rest } = this.props;

    const props = {};

    if (typeSections) {
      props.sections = items;
      props.renderSectionHeader = this.props.renderSectionHeader;
    } else {
      props.data = items;
    }

    const Component = typeSections ? SectionList : FlatList;

    return (
      <View style={styles.container}>
        <Component
          {...props}
          {...rest}
          style={[styles.items, style]}
          ListFooterComponent={loading && Platform.OS === 'ios' &&
            <Text style={[styles.loading, { color: theme.color.primaryText }]}>{strings('app.label.loading')}</Text>
          }
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  };

  renderAndroidLoadingLabel = () => (
    <View style={styles.loaderWrapper}>
      <View style={styles.loader}>
        <Text style={styles.loaderLabel}>{strings('app.label.loading')}</Text>
      </View>
    </View>
  );

  renderEmptyLabel = () => {
    const { theme } = this.props;
    return (
      <Text style={[styles.emptyLabel, { color: theme.color.secondaryText }]}>
        {strings('app.label.emptyResult')}
      </Text>
    );
  };

  render() {
    const { loading, items } = this.props;

    return (
      <KeyboardAvoidingView
        style={[styles.flex, styles.centered]}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        {(items && items.length) || loading
          ? this.renderList()
          : this.renderEmptyLabel()
        }

        {loading && Platform.OS === 'android' && this.renderAndroidLoadingLabel()}
      </KeyboardAvoidingView>
    );
  }
}

ListView.propTypes = {
  typeSections: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
  onEndReached: PropTypes.func
};

ListView.defaultProps = {
  loading: false,
  refreshing: undefined,
  keyExtractor: item => String(item.id),
  onEndReached: undefined
};

export default withTheme(ListView);
