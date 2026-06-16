// admin/src/components/Settings/Settings.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../Toast/Toast';

function Settings() {
  const { admin } = useAuth();

  const [company, setCompany] = useState({
    name: 'VVM Traders', email: 'info@vvmtraders.in',
    phone: '+91 00000 00000', address: 'India — Pan-India Operations',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM IST',
    fssai: 'FSSAI-12345678', website: 'www.vvmtraders.in',
    gstin: '29XXXXX0000X1ZX',
  });

  const [creds, setCreds] = useState({ current: '', newPass: '', confirm: '' });
  const [savedCompany, setSavedCompany] = useState(false);
  const [savedCreds, setSavedCreds] = useState(false);

  const saveCompany = () => {
    setSavedCompany(true);
    toast('Company information saved');
    setTimeout(() => setSavedCompany(false), 3000);
  };

  const saveCreds = () => {
    if (!creds.current) { toast('Please enter your current password', 'error'); return; }
    if (creds.newPass !== creds.confirm) { toast('New passwords do not match', 'error'); return; }
    if (creds.newPass.length < 6) { toast('Password must be at least 6 characters', 'error'); return; }
    setSavedCreds(true);
    toast('Credentials updated successfully');
    setCreds({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSavedCreds(false), 3000);
  };

  const Section = ({ title, children, action }) => (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-title">{title} {action}</div>
      {children}
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage company info, credentials, and preferences</p>
        </div>
      </div>

      <div className="settings-grid-1-1">
        {/* Company Info */}
        <div>
          <Section title="Company Information">
            <div className="form-grid">
              {[
                ['Company Name', 'name', 'VVM Traders'],
                ['Email Address', 'email', 'info@vvmtraders.in'],
                ['Phone / WhatsApp', 'phone', '+91 XXXXX XXXXX'],
                ['GSTIN', 'gstin', '29XXXXX0000X1ZX'],
                ['FSSAI License', 'fssai', 'FSSAI-XXXXXXXX'],
                ['Website', 'website', 'www.vvmtraders.in'],
              ].map(([l, k, ph]) => (
                <div key={k} className="form-group">
                  <label className="form-label">{l}</label>
                  <input className="form-input" value={company[k]} placeholder={ph}
                    onChange={e => setCompany(c => ({ ...c, [k]: e.target.value }))} />
                </div>
              ))}
              <div className="form-group full">
                <label className="form-label">Address / Operations</label>
                <input className="form-input" value={company.address}
                  onChange={e => setCompany(c => ({ ...c, address: e.target.value }))} />
              </div>
              <div className="form-group full">
                <label className="form-label">Business Hours</label>
                <input className="form-input" value={company.hours}
                  onChange={e => setCompany(c => ({ ...c, hours: e.target.value }))} />
              </div>
            </div>
            <button className="btn btn-gold" onClick={saveCompany} style={{ marginTop: 8 }}>
              {savedCompany ? '✅ Saved!' : 'Save Company Info'}
            </button>
          </Section>

          {/* Export data */}
          <Section title="Export Data">
            <p style={{ fontSize: 13, color: 'var(--text-mid)', marginBottom: 16, lineHeight: 1.6 }}>
              Download your data as CSV for record-keeping or reporting.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { l: '📬 Export Enquiries', color: '#3498DB' },
                { l: '🌶️ Export Products', color: '#27AE60' },
                { l: '📦 Export Orders', color: '#C9A84C' },
              ].map((b, i) => (
                <button key={i} className="btn btn-sm" style={{ background: `${b.color}20`, color: b.color, border: `1px solid ${b.color}40` }}
                  onClick={() => toast(`${b.l.split(' ').slice(1).join(' ')} export initiated`)}>
                  {b.l}
                </button>
              ))}
            </div>
          </Section>
        </div>

        {/* Right column */}
        <div>
          {/* Admin profile */}
          <Section title="Admin Profile">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: '16px', background: 'rgba(255,255,255,.03)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(201,168,76,.15)', border: '2px solid rgba(201,168,76,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: 'var(--gold)', fontWeight: 600 }}>
                {admin?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 15 }}>{admin?.name || 'Admin'}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{admin?.username} · {admin?.role}</div>
              </div>
            </div>
          </Section>

          {/* Change password */}
          <Section title="Change Password">
            {[
              ['Current Password', 'current', 'Current password'],
              ['New Password', 'newPass', 'Min. 6 characters'],
              ['Confirm New Password', 'confirm', 'Repeat new password'],
            ].map(([l, k, ph]) => (
              <div key={k} className="form-group">
                <label className="form-label">{l}</label>
                <input type="password" className="form-input" placeholder={ph} value={creds[k]}
                  onChange={e => setCreds(c => ({ ...c, [k]: e.target.value }))} />
              </div>
            ))}
            <button className="btn btn-gold" onClick={saveCreds}>
              {savedCreds ? '✅ Updated!' : 'Update Password'}
            </button>
          </Section>

          {/* System info */}
          <Section title="System Information">
            {[
              ['API Server', 'http://localhost:5000'],
              ['Client App', 'http://localhost:3000'],
              ['Admin App', 'http://localhost:3001'],
              ['Node.js Version', '18.x+'],
              ['Stack', 'React + Express + Node.js'],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-mid)' }}>{l}</span>
                <span style={{ color: 'var(--text-dim)', fontFamily: v.startsWith('http') ? 'monospace' : 'inherit', fontSize: 12 }}>{v}</span>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
