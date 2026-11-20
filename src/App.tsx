
import './App.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './store/store';
import { router } from './routes/Router';
import DataLoader from './components/common/DataLoader';

function App() {
    return (
        <Provider store={store}>
            <DataLoader />
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;