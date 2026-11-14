import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import { SearchResults } from './pages/products/SearchResults';
import Auth from './pages/auth/Auth';


function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home onSelectCategory={(catId) => navigate(`/search?cat=${catId}`)} />} />
                <Route path="/search" element={<SearchResults key={location.search} />} />
                <Route path="/auth/login" element={<Auth />} />
            </Routes>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        </Provider>
    );
}