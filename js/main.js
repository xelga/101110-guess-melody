import {renderScreen} from './util.js';
import welcomeScreen from './welcome-screen.js';
import {gameConfig} from './data.js';

renderScreen(welcomeScreen(gameConfig));
