import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";

import EducatorDashboard from "./pages/EducatorDashboard";
import EducatorAssignmentSetup from "./pages/EducatorAssignmentSetup";
import EducatorSubmissionIntake from "./pages/EducatorSubmissionIntake";
import EducatorReviewReport from "./pages/EducatorReviewReport";
import EducatorProcessLogViewer from "./pages/EducatorProcessLogViewer";

import StudentDocumentLibrary from "./pages/StudentDocumentLibrary";
import StudentNewDocumentSetup from "./pages/StudentNewDocumentSetup";
import StudentMainEditor from "./pages/StudentMainEditor";
import StudentReportPanel from "./pages/StudentReportPanel";
import StudentAIDetectionDetail from "./pages/StudentAIDetectionDetail";
import StudentWritingProcessReplay from "./pages/StudentWritingProcessReplay";

import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Educator */}
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route
          path="/educator/assignments/new"
          element={<EducatorAssignmentSetup />}
        />
        <Route
          path="/educator/submissions/intake"
          element={<EducatorSubmissionIntake />}
        />
        <Route
          path="/educator/review-report"
          element={<EducatorReviewReport />}
        />
        <Route
          path="/educator/process-log"
          element={<EducatorProcessLogViewer />}
        />

        {/* Student */}
        <Route
          path="/student/documents"
          element={<StudentDocumentLibrary />}
        />
        <Route
          path="/student/documents/new"
          element={<StudentNewDocumentSetup />}
        />
        <Route path="/student/editor" element={<StudentMainEditor />} />
        <Route path="/student/report" element={<StudentReportPanel />} />
        <Route
          path="/student/ai-detection-detail"
          element={<StudentAIDetectionDetail />}
        />
        <Route
          path="/student/process-replay"
          element={<StudentWritingProcessReplay />}
        />

        {/* Shared */}
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;