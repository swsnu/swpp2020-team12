import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Ranking from './ranking';
import {getMockStore} from '../../test-utils/mocks';
import {history} from '../../store/store';

