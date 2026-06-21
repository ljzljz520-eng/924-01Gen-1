import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EditorPage } from "@/pages/EditorPage";
import { MobileInvitationPage } from "@/pages/MobileInvitationPage";
import { CollaboratorPage } from "@/pages/CollaboratorPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/editor" replace />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/invitation" element={<MobileInvitationPage />} />
        <Route path="/collaborator" element={<CollaboratorPage />} />
        <Route path="*" element={<Navigate to="/editor" replace />} />
      </Routes>
    </Router>
  );
}
