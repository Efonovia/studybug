import './App.css';
import Home from './pages/home';
import Login from './pages/auth/login';
// import Layout from './pages/layout';
import Signup from './pages/auth/signup';
import Dashboard from './pages/dashboard';
import SessionPage from './pages/studyareas/SessionPage';
import NotesPage from './pages/studyareas/notes/NotesPage';
import QuizesPage from './pages/studyareas/quizes/QuizesPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotePageArea from './pages/studyareas/notes/NotePageArea';
import QuizEditPage from './pages/studyareas/quizes/QuizEditPage';
import QuizViewPage from './pages/studyareas/quizes/QuizViewPage';
import QuizStatsPage from './pages/studyareas/stats/QuizStatsPage';
import FlashCardsPage from './pages/studyareas/flashcards/FlashCardsPage';
import QuizCreationPage from './pages/studyareas/quizes/QuizCreationPage';
import FlashCardsSetEditPage from './pages/studyareas/flashcards/FlashCardsSetEditPage';
import FlashCardsSetPageArea from './pages/studyareas/flashcards/FlashCardsSetPageArea';
import FlashCardsSetCreationPage from './pages/studyareas/flashcards/FlashCardsSetCreationPage';




function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/session/:sessionId" element={<SessionPage />} /> 
          <Route path="dashboard/session/:sessionId/notes" element={<NotesPage />} /> 
          <Route path="dashboard/session/:sessionId/quizes" element={<QuizesPage />} /> 
          <Route path="dashboard/session/:sessionId/flashcards" element={<FlashCardsPage />} /> 
          <Route path="dashboard/session/:sessionId/notes/:noteId" element={<NotePageArea />} /> 
          <Route path="dashboard/session/:sessionId/quizes/create/" element={<QuizCreationPage />} /> 
          <Route path="dashboard/session/:sessionId/quizes/view/:quizId" element={<QuizViewPage />} />
          <Route path="dashboard/session/:sessionId/quizes/edit/:quizid" element={<QuizEditPage />} />
          <Route path="dashboard/session/:sessionId/quizes/:quizId/stats" element={<QuizStatsPage />} />
          <Route path="dashboard/session/:sessionId/flashcardsset/create" element={<FlashCardsSetCreationPage />} /> 
          <Route path="dashboard/session/:sessionId/flashcardsset/edit/:flashcardssetId" element={<FlashCardsSetEditPage />} /> 
          <Route path="dashboard/session/:sessionId/flashcardsset/view/:flashcardssetId" element={<FlashCardsSetPageArea />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
