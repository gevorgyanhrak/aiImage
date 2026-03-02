import { Routes, Route } from 'react-router';
import Providers from './providers';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';

const App = () => (
  <Providers>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/:category/:id" element={<DetailPage />} />
    </Routes>
    <Footer />
  </Providers>
);

export default App;
