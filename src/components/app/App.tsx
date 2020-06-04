import React from 'react';
import { MainTable } from '../mainTable/MainTable';
import { Provider } from '../../utils/globalState/Provider';

const App: React.FC = () => {
  return (
    <Provider>
        <MainTable />
    </Provider>
  );
}

export default App;
