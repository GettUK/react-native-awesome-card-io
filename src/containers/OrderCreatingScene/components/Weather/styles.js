import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  btnWrapper: {
    paddingTop: 10,
    marginBottom: 15
  },
  weatherBtn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 50,
    margin: 2,
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  temperature: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  divider: {
    marginVertical: 8
  },
  modalDivider: {
    marginVertical: 20
  },
  modalContent: {
    backgroundColor: color.white,
    borderRadius: 10,
    overflow: 'hidden'
  },
  dayWeatherContainer: {
    backgroundColor: '#456',
    height: 150,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  dayBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  closeBtnWrapper: {
    alignSelf: 'center'
  },
  closeBtn: {
    paddingHorizontal: 40,
    backgroundColor: color.primaryBtns
  },
  closeBtnText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  city: {
    color: color.white,
    fontSize: 22
  },
  temperatureHuge: {
    color: color.white,
    fontSize: 50
  },
  description: {
    color: color.white,
    fontSize: 12,
    marginBottom: 4
  },
  dayWeatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayWeatherRight: {
    alignItems: 'flex-end'
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130
  },
  valueIcon: {
    marginRight: 4,
    marginBottom: 4
  },
  value: {
    marginLeft: 'auto',
    fontWeight: 'bold'
  },
  forecastContent: {
    padding: 20
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forecastDay: {
    flex: 1,
    alignItems: 'center'
  },
  dayTitle: {
    fontSize: 10,
    marginBottom: 12
  },
  forecastIcon: {
    marginBottom: 8
  },
  forecastDayTemp: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4
  },
  forecastNightTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  forecastHumidity: {
    fontSize: 10
  },
  forecastHumidityIcon: {
    marginRight: 4
  },
  spinnerWrapper: {
    minHeight: 125,
    justifyContent: 'center'
  }
});
