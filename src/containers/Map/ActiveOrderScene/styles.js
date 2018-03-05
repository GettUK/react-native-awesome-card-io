import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  },
  header: {
    fontSize: 26,
    fontWeight: '600'
  },
  separator: {
    flex: 1
  },
  actionsRow: {
    flexDirection: 'row'
  }
});

export const fbStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  label: {
    marginTop: 8
  }
});

export const onMyWayStyles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  button: {
    alignSelf: 'flex-end',
    padding: 16
  },
  buttonText: {
    color: '#5d75a1',
    fontWeight: '600'
  },
  listItem: {
    width: width - 32,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  listItemTitle: {
    fontSize: 16
  }
});

export const orderPanelStyles = StyleSheet.create({
  activeContainer: {
    padding: 16,
    paddingVertical: 4
  },
  activeItem: {
    width: '100%',
    borderRadius: 6,
    height: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    alignItems: 'center'
  }
});

export const pointerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: (width / 2) - 100,
    top: (height / 2) - 100 - 20 - 60,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    top: 85,
    left: 85
  }
})
