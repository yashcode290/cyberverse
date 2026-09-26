import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CourseViewer from './components/CourseViewer';
import { LoginPage, SignupPage } from './components/pages/AuthPages';
import RoadmapPage from './components/pages/RoadmapPage';
import PathsPage from './components/pages/PathsPage';
import LabsPage from './components/pages/LabsPage';
import ChallengesPage from './components/pages/ChallengesPage';
import MissionsPage from './components/pages/MissionsPage';
import ProjectsPage from './components/pages/ProjectsPage';
import PlaygroundPage from './components/pages/PlaygroundPage';
import ToolsPage from './components/pages/ToolsPage';
import ResourcesPage from './components/pages/ResourcesPage';
import CommunityPage from './components/pages/CommunityPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import ProfilePage from './components/pages/ProfilePage';
import SettingsPage from './components/pages/SettingsPage';
import AdminPage from './components/pages/AdminPage';
import { dbService } from './services/dbService';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [currentUser, setCurrentUser] = useState(dbService.getCurrentUser());
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');
  const [completedLabs, setCompletedLabs] = useState(['nmap-basic-scan', 'packet-inspector-http']);
  const [earnedXP, setEarnedXP] = useState(650);

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') || '/';
      // Clean up hash query parameters if any
      const pathOnly = rawHash.split('?')[0];
      setCurrentPath(pathOnly);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setSignupSuccessMsg('');
  };

  const handleLogout = () => {
    dbService.logoutUser();
    setCurrentUser(null);
  };

  const handleSolveLab = (labId) => {
    if (!completedLabs.includes(labId)) {
      setCompletedLabs([...completedLabs, labId]);
      setEarnedXP(prev => prev + 100);
    }
  };

  // Check public routes
  const isPublicPage = currentPath === '/' || currentPath === '/login' || currentPath === '/signup';

  if (isPublicPage) {
    if (currentPath === '/login') {
      return (
        <LoginPage
          onNavigate={navigate}
          onAuthSuccess={handleAuthSuccess}
          successMessage={signupSuccessMsg}
        />
      );
    }

    if (currentPath === '/signup') {
      return (
        <SignupPage
          onNavigate={navigate}
          onSignupSuccess={(msg) => setSignupSuccessMsg(msg)}
        />
      );
    }

    return (
      <LandingPage
        onNavigate={navigate}
        onLogin={() => navigate('/login')}
        onGetStarted={() => navigate('/signup')}
      />
    );
  }

  // If user is not authenticated and trying to access an authenticated route, redirect to /login
  if (!currentUser) {
    return (
      <LoginPage
        onNavigate={navigate}
        onAuthSuccess={handleAuthSuccess}
        successMessage="Please log in to access this page."
      />
    );
  }

  // Authenticated Application Shell Layout
  return (
    <AppLayout
      currentPath={currentPath}
      onNavigate={navigate}
      currentUser={currentUser}
      onLogout={handleLogout}
    >
      {(currentPath === '/dashboard' || currentPath === '/') && (
        <Dashboard
          userXP={earnedXP}
          completedLabsCount={completedLabs.length}
          onNavigate={navigate}
        />
      )}

      {currentPath === '/roadmap' && <RoadmapPage onNavigate={navigate} />}
      {currentPath === '/paths' && <PathsPage onNavigate={navigate} />}
      
      {currentPath === '/learn' && (
        <CourseViewer
          completedCourses={completedLabs}
          onCompleteCourse={() => setEarnedXP(prev => prev + 100)}
          onLaunchLab={() => navigate('/labs')}
        />
      )}

      {currentPath.startsWith('/labs') && (
        <LabsPage
          solvedLabs={completedLabs}
          onSolveLab={handleSolveLab}
        />
      )}

      {currentPath === '/challenges' && (
        <ChallengesPage
          onAddXP={(xp) => setEarnedXP(prev => prev + xp)}
        />
      )}

      {currentPath === '/missions' && <MissionsPage onNavigate={navigate} />}
      {currentPath === '/projects' && <ProjectsPage onNavigate={navigate} />}
      
      {currentPath.startsWith('/playground') && (
        <PlaygroundPage
          onCompleteTerminalLab={() => handleSolveLab('nmap-basic-scan')}
        />
      )}

      {currentPath === '/tools' && <ToolsPage />}
      {currentPath === '/resources' && <ResourcesPage />}
      {currentPath === '/community' && <CommunityPage />}
      {currentPath === '/leaderboard' && <LeaderboardPage userXP={earnedXP} />}
      {currentPath === '/profile' && <ProfilePage userXP={earnedXP} completedLabs={completedLabs} />}
      {currentPath === '/settings' && <SettingsPage />}
      {currentPath === '/admin' && <AdminPage />}
    </AppLayout>
  );
}
