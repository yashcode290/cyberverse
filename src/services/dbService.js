// Client-Side Persistent Database Service for CyberVerse
const USERS_KEY = 'cyberverse_db_users';
const SESSION_KEY = 'cyberverse_db_session';

const initialUsers = [
  {
    id: 'usr-admin-1',
    name: 'CyberVerse Main Admin',
    email: 'admin@cyberverse.edu',
    password: 'admin123',
    role: 'Admin',
    isProtected: true, // Protected Super Admin Account
    xp: 2500,
    level: 10,
    labsCompleted: 12,
    createdAt: '2026-01-15'
  },
  {
    id: 'usr-student-1',
    name: 'Alex Explorer',
    email: 'explorer@cyberverse.edu',
    password: 'demo123',
    role: 'Student',
    isProtected: false,
    xp: 650,
    level: 3,
    labsCompleted: 4,
    createdAt: '2026-02-01'
  }
];

export const dbService = {
  getUsers: () => {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(data);
  },

  saveUsers: (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser: () => {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) {
      return initialUsers[1];
    }
    return JSON.parse(data);
  },

  setCurrentUser: (user) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  registerUser: ({ name, email, password, role = 'Student' }) => {
    const users = dbService.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists!' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      role,
      isProtected: false,
      xp: 100,
      level: 1,
      labsCompleted: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    dbService.saveUsers(users);
    return { success: true, user: newUser };
  },

  loginUser: ({ email, password }) => {
    const users = dbService.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid email or password combination.' };
    }

    dbService.setCurrentUser(user);
    return { success: true, user };
  },

  logoutUser: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateUserRole: (userId, newRole) => {
    const users = dbService.getUsers();
    const target = users.find(u => u.id === userId);
    
    // Security Rule: Protect main super admin from demotion
    if (target && target.isProtected) {
      return { success: false, error: 'Protected Main Super Admin cannot be demoted!' };
    }

    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    dbService.saveUsers(updated);
    return { success: true };
  },

  grantXP: (userId, amount) => {
    const users = dbService.getUsers();
    const updated = users.map(u => {
      if (u.id === userId) {
        const newXP = u.xp + amount;
        return { ...u, xp: newXP, level: Math.floor(newXP / 200) + 1 };
      }
      return u;
    });
    dbService.saveUsers(updated);
  },

  deleteUser: (userId) => {
    const users = dbService.getUsers();
    const target = users.find(u => u.id === userId);
    
    // Security Rule: Protect main super admin from deletion
    if (target && target.isProtected) {
      return { success: false, error: 'Protected Main Super Admin cannot be deleted!' };
    }

    const filtered = users.filter(u => u.id !== userId);
    dbService.saveUsers(filtered);
    return { success: true };
  }
};
