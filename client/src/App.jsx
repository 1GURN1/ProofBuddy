import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StudentLandingPage from "./pages/StudentLandingPage";
import EducatorLandingPage from "./pages/EducatorLandingPage";
import SignupPage from "./pages/SignupPage";
import StudentDocumentLibrary from "./pages/StudentDocumentLibrary";
import StudentNewDocumentSetup from "./pages/StudentNewDocumentSetup";
import StudentMainEditor from "./pages/StudentMainEditor";
import StudentAIDetectionDetail from "./pages/StudentAIDetectionDetail";
import StudentWritingProcessReplay from "./pages/StudentWritingProcessReplay";
import StudentReportPanel from "./pages/StudentReportPanel";
import StudentReportPage from "./pages/StudentReportPage";
import EducatorDashboard from "./pages/EducatorDashboard";
import EducatorAssignmentSetup from "./pages/EducatorAssignmentSetup";
import EducatorSubmissionIntake from "./pages/EducatorSubmissionIntake";
import EducatorReviewReport from "./pages/EducatorReviewReport";
import EducatorProcessLogViewer from "./pages/EducatorProcessLogViewer";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/students" element={<StudentLandingPage />} />
        <Route path="/educators" element={<EducatorLandingPage />} />
        <Route path="/auth" element={<SignupPage />} />

        {/* Student */}
        <Route path="/student" element={<StudentDocumentLibrary />} />
        <Route path="/student/setup" element={<StudentNewDocumentSetup />} />
        <Route path="/student/editor" element={<StudentMainEditor />} />
        <Route path="/student/ai-detail" element={<StudentAIDetectionDetail />} />
        <Route path="/student/replay" element={<StudentWritingProcessReplay />} />
        <Route path="/student/share-requests" element={<StudentReportPanel />} />
        <Route path="/student/report" element={<StudentReportPage />} />

        {/* Educator */}
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/educator/course-setup" element={<EducatorAssignmentSetup />} />
        <Route path="/educator/intake" element={<EducatorSubmissionIntake />} />
        <Route path="/educator/report" element={<EducatorReviewReport />} />
        <Route path="/educator/process-log" element={<EducatorProcessLogViewer />} />

        {/* Shared */}
        <Route path="/settings" element={<Settings />} />

        {/* Fallbacks */}
        <Route path="/educator/submissions/intake" element={<Navigate to="/educator/intake" replace />} />
        <Route path="/educator/review-report" element={<Navigate to="/educator/report" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
