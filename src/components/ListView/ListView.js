import React, { PureComponent } from 'react';
import { View, Text, FlatList, SectionList, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './styles';

class ListView extends PureComponent {
  renderList = () => {
    const {
      styles, renderItem, items, typeSections, keyExtractor, onEndReached, loading, refreshing, theme
    } = this.props;

    const props = {};

    if (typeSections) {
      props.sections = items;
      props.renderSectionHeader = this.props.renderSectionHeader;
    } else {
      props.data = items;
    }

    const Component = typeSections ? SectionList : FlatList;

    return (
      <View style={[styles.container, { backgroundColor: theme.color.bgSettings }]}>
        <Component
          {...props}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.items}
          onEndReached={onEndReached}
          ListFooterComponent={loading && Platform.OS === 'ios' &&
            <Text style={{ textAlign: 'center', color: theme.color.primaryText }}>{strings('app.label.loading')}</Text>
          }
          refreshing={refreshing}
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  }

  renderAndroidLoadingLabel = styles => (
    <View style={styles.loaderWrapper}>
      <View style={styles.loader}>
        <Text style={styles.loaderLabel}>{strings('app.label.loading')}</Text>
      </View>
    </View>
  )

  render() {
    const { styles, loading, items, theme } = this.props;

    return (
      <View style={[styles.flex, styles.centered, { backgroundColor: theme.color.bgSettings }]}>
        {(items && items.length) || loading
          ? this.renderList()
          : <Text style={[styles.emptyLabel, { color: theme.color.primaryText }]}>
            {strings('app.label.emptyResult')}
          </Text>
        }

        {loading && Platform.OS === 'android' && this.renderAndroidLoadingLabel(styles)}
      </View>
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
  styles,
  loading: false,
  refreshing: undefined,
  keyExtractor: item => String(item.id),
  onEndReached: undefined
};

export default withTheme(ListView);
