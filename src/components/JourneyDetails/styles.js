import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.white,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 7,
    paddingHorizontal: 20,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  icon: {
    marginRight: 20
  },
  blockItem: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textLines: {
    flexWrap: 'wrap',
    flex: 1
  },
  label: {
    fontSize: 14,
    color: color.secondaryText,
    marginBottom: 1
  },
  labelBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.primaryText,
    marginTop: 1
  },
  loading: {
    marginTop: 2,
    alignSelf: 'center'
  },
  divider: {
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: color.pixelLine,
    width: 1
  }
});
