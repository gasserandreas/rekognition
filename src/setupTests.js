import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import jestFetchMock from "jest-fetch-mock";

// setup enzyme
configure({ adapter: new Adapter() });

// setup fetch-mock
global.fetch = jestFetchMock;
