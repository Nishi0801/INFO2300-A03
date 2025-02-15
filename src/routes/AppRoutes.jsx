import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NavBar from '../components/NavBar';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';
import ExpertPanel from '../pages/experts/ExpertPanel';
import GuideDetail from '../pages/GuideDetail.jsx';
import KnowlegeHub from '../pages/KnowlegeHub.jsx';
import CreateGuide from '../pages/experts/CreateGuide';
import UpdateGuide from '../pages/experts/UpdateGuide';

export default function AppRoutes() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/knowledge-hub" element={<KnowlegeHub/>} />
                <Route path='/guide/:guideId' element={<GuideDetail />} />

                <Route path="/expert-panel" element={<ExpertPanel />} />
                <Route path="/create-guide" element={<CreateGuide />} />
                <Route path="/update-guide/:id" element={<UpdateGuide />} />

                {/* Protect the dashboard route */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                {/* Default fallback route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}