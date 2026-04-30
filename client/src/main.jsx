import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import LandingPage from './pages/LandingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Settings from './pages/Settings.jsx'

import EducatorDashboard from './pages/educator/EducatorDashboard.jsx'
import EducatorAssignmentSetup from './pages/educator/EducatorAssignmentSetup.jsx'
import EducatorSubmissionIntake from './pages/educator/EducatorSubmissionIntake.jsx'
import EducatorReviewReport from './pages/educator/EducatorReviewReport.jsx'
import EducatorProcessLogViewer from './pages/educator/EducatorProcessLogViewer.jsx'

import StudentDocumentLibrary from './pages/student/StudentDocumentLibrary.jsx'
import StudentNewDocumentSetup from './pages/student/StudentNewDocumentSetup.jsx'
import StudentMainEditor from './pages/student/StudentMainEditor.jsx'
import StudentReportPanel from './pages/student/StudentReportPanel.jsx'
import StudentAIDetectionDetail from './pages/student/StudentAIDetectionDetail.jsx'
import StudentWritingProcessReplay from './pages/student/StudentWritingProcessReplay.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/educator/assignments/new" element={<EducatorAssignmentSetup />} />
        <Route path="/educator/submissions/intake" element={<EducatorSubmissionIntake />} />
        <Route path="/educator/review-report" element={<EducatorReviewReport />} />
        <Route path="/educator/process-log" element={<EducatorProcessLogViewer />} />

        <Route path="/student/documents" element={<StudentDocumentLibrary />} />
        <Route path="/student/documents/new" element={<StudentNewDocumentSetup />} />
        <Route path="/student/editor" element={<StudentMainEditor />} />
        <Route path="/student/report" element={<StudentReportPanel />} />
        <Route path="/student/ai-detection-detail" element={<StudentAIDetectionDetail />} />
        <Route path="/student/process-replay" element={<StudentWritingProcessReplay />} />

        <Route path="/analyze" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
