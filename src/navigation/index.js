import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setApp } from '../redux/actions/app';

import Navigator from './Navigator';

import OverlayActivityIndicator from '../components/OverlayActivityIndicator';
import Alert from '../components/Alert';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

@connect((state) => {
  const { app, navigation } = state;
  return {
    app,
    navigation
  };
}, dispatch => ({
  ...bindActionCreators({
    setApp,
  }, dispatch),
  dispatch
}))


export default class App extends Component {
  static propTypes = {
    app: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      alerts: PropTypes.array.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape().isRequired,
    setApp: PropTypes.func.isRequired
  };

  closeLastAlert = (handler) => {
    const { app, setApp } = this.props;
    const alerts = [...app.alerts];
    alerts.pop();
    setApp({ alerts });
    if (handler) {
      handler();
    }
  };
  render() {
    const { dispatch, navigation, app } = this.props;
    const { isLoading, alerts } = app;
    const lastAlert = alerts[alerts.length - 1];
    return (
      <View style={styles.container}>
        <Navigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
        <OverlayActivityIndicator visible={isLoading} />
        <Alert
          title={lastAlert ? lastAlert.title : ''}
          text={lastAlert ? lastAlert.text : ''}
          visible={lastAlert != null}
          type={lastAlert ? lastAlert.type : undefined}
          okHandler={() => this.closeLastAlert(lastAlert.okHandler)}
          yesHandler={() => this.closeLastAlert(lastAlert.yesHandler)}
          noHandler={() => this.closeLastAlert(lastAlert.noHandler)}
        />
      </View>
    );
  }
}
