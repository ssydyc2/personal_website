import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Background from './pages/Background';
import Journey from './pages/Journey';

export default function App() {
  return (
    <BrowserRouter basename="/journey_to_performance_engineer_website">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Background />} />
          <Route path="journey" element={<Journey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
