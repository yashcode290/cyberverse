import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/dbService';
import { 
  ShieldAlert, Users, Award, Database, Key, Trash2, 
  Terminal, RefreshCw, Activity, Lock 
} from 'lucide-react';

export default function AdminPage() {
  const [usersList, setUsersList] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');

  const loadData = () => {
    setUsersList(dbService.getUsers());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleRole = (userId, currentRole, isProtected) => {
    if (isProtected) {
      setStatusMsg('Security Rule: Protected Main Super Admin cannot be demoted!');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }

    const newRole = currentRole === 'Admin' ? 'Student' : 'Admin';
    dbService.updateUserRole(userId, newRole);
    loadData();
  };

  const handleGrantXP = (userId) => {
    dbService.grantXP(userId, 100);
    loadData();
  };

  const handleDeleteUser = (userId, isProtected) => {
    if (isProtected) {
      setStatusMsg('Security Rule: Protected Main Super Admin cannot be deleted!');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }

    if (window.confirm('Are you sure you want to delete this user account from the database?')) {
      dbService.deleteUser(userId);
      loadData();
    }
  };

  const totalXPGranted = usersList.reduce((acc, u) => acc + (u.xp || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* SOLID NON-GRADIENT ADMIN HEADER BANNER */}
      <div className="cyber-card" style={{
        backgroundColor: '#120924',
        border: '1px solid rgba(200, 121, 255, 0.3)',
        borderLeft: '4px solid #c879ff',
        padding: '1.75rem 2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '0.4rem', fontSize: '0.75rem' }}>
              🛡️ PLATFORM ADMINISTRATOR CONTROL CONSOLE
            </span>
            <h2 style={{ fontSize: '1.85rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldAlert color="#c879ff" size={28} /> CyberVerse Admin Control Center
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Manage registered user accounts, database permissions, grant XP, and monitor security telemetry.
            </p>
          </div>

          <button onClick={loadData} className="btn-cyber-purple" style={{ padding: '0.6rem 1.1rem', backgroundColor: '#c879ff', color: '#050811', fontWeight: 700 }}>
            <RefreshCw size={16} /> Sync Database
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(255, 51, 102, 0.15)', border: '1px solid #ff3366', color: '#ff3366', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 700 }}>
          ⚠️ {statusMsg}
        </div>
      )}

      {/* SOLID ADMIN TELEMETRY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="cyber-card" style={{ backgroundColor: '#120924', border: '1px solid rgba(200, 121, 255, 0.25)', borderLeft: '4px solid #c879ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ backgroundColor: 'rgba(200, 121, 255, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
              <Users color="#c879ff" size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#c879ff', fontWeight: 700, textTransform: 'uppercase' }}>USER ACCOUNTS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {usersList.length} Accounts
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-card" style={{ backgroundColor: '#120924', border: '1px solid rgba(0, 255, 102, 0.25)', borderLeft: '4px solid #00ff66' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
              <Award color="#00ff66" size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#00ff66', fontWeight: 700, textTransform: 'uppercase' }}>TOTAL XP AWARDED</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
                {totalXPGranted} XP
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-card" style={{ backgroundColor: '#120924', border: '1px solid rgba(255, 51, 102, 0.25)', borderLeft: '4px solid #ff3366' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ backgroundColor: 'rgba(255, 51, 102, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
              <Activity color="#ff3366" size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#ff3366', fontWeight: 700, textTransform: 'uppercase' }}>SECURITY TELEMETRY</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ff3366', fontFamily: 'var(--font-mono)' }}>
                100% Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USER MANAGEMENT DATABASE TABLE */}
      <div className="cyber-card" style={{ backgroundColor: '#120924', border: '1px solid rgba(200, 121, 255, 0.25)', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#c879ff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database color="#c879ff" size={22} /> User Accounts & Role Permissions Database
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              Full administrative control over student & administrator accounts stored in local database.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#090412', color: '#c879ff', textAlign: 'left', borderBottom: '1px solid rgba(200, 121, 255, 0.2)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>User Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Email Address</th>
                <th style={{ padding: '0.85rem 1rem' }}>Assigned Role</th>
                <th style={{ padding: '0.85rem 1rem' }}>Level & XP</th>
                <th style={{ padding: '0.85rem 1rem' }}>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((usr) => (
                <tr key={usr.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#cbd5e1' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#ffffff' }}>
                    {usr.name} {usr.isProtected && <span style={{ fontSize: '0.72rem', color: '#ffd166', marginLeft: '0.35rem' }}>🔒 Protected Main Admin</span>}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.83rem', color: '#94a3b8' }}>
                    {usr.email}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={usr.role === 'Admin' ? 'badge badge-purple' : 'badge badge-cyan'}>
                      {usr.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)' }}>
                    Lvl {usr.level || 1} • <strong style={{ color: '#00ff66' }}>{usr.xp || 0} XP</strong>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleToggleRole(usr.id, usr.role, usr.isProtected)}
                        disabled={usr.isProtected}
                        className="btn-cyber-purple"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', opacity: usr.isProtected ? 0.5 : 1, cursor: usr.isProtected ? 'not-allowed' : 'pointer' }}
                      >
                        Set as {usr.role === 'Admin' ? 'Student' : 'Admin'}
                      </button>

                      <button
                        onClick={() => handleGrantXP(usr.id)}
                        className="btn-cyber-green"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                      >
                        +100 XP
                      </button>

                      <button
                        onClick={() => handleDeleteUser(usr.id, usr.isProtected)}
                        disabled={usr.isProtected}
                        className="btn-cyber-ghost"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', color: '#ff3366', opacity: usr.isProtected ? 0.5 : 1, cursor: usr.isProtected ? 'not-allowed' : 'pointer' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
