/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App'; // ✅ Doğru konum
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
