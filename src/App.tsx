import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Authenticated Application Pages
import { DashboardPage } from './pages/DashboardPage';
import { LearnOverviewPage } from './pages/LearnOverviewPage';
import { LearningRoadmapPage } from './pages/LearningRoadmapPage';
import { ModulesPage } from './pages/ModulesPage';
import { LabViewerPage } from './pages/LabViewerPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { MissionsPage } from './pages/MissionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ToolsPage } from './pages/ToolsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CommunityPage } from './pages/CommunityPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        {/* Public Routes Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Authenticated Workspace Application Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnOverviewPage />} />
          <Route path="/roadmap" element={<LearningRoadmapPage />} />
          <Route path="/paths" element={<LearningRoadmapPage />} />
          <Route path="/paths/:id" element={<LearningRoadmapPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/:id" element={<ModulesPage />} />
          <Route path="/labs" element={<LabViewerPage />} />
          <Route path="/labs/:id" element={<LabViewerPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
