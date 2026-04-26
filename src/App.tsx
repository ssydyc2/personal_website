import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Background from './pages/Background';
import Books from './pages/Books';
import Journey from './pages/Journey';
import StudyPlans from './pages/StudyPlans';

export default function App() {
  return (
    <BrowserRouter basename="/personal_website">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Background />} />
          <Route path="journey" element={<Journey />} />
          <Route path="books" element={<Books />} />
          <Route path="reading-list" element={<Books />} />
          <Route path="study-plans" element={<StudyPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
