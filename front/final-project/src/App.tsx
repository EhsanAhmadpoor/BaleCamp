import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import IssuesPage from "./pages/Issues/IssuesPage";
import BoardPage from "./pages/Board/BoardPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/board" element={<BoardPage />}>
          <Route path=":issueId">
            <Route path='edit' />
          </Route>
        </Route>
        <Route path="/issues" element={<IssuesPage />}>
          <Route path="new" />
          <Route path=":issueId">
            <Route path='edit' />
          </Route>
        </Route>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App;
