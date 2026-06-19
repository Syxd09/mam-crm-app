import React, { useState } from 'react';
import { SCRIPTS, getMailtoLink } from './ScriptsLibrary';

const SEGMENTS = ['OEM', 'EPC', 'Architecture', 'Factory', 'Defence'];
const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost', 'Cold'];

export default function LeadsTable({ 
  leads, 
  onAddLead, 
  onEditLead, 
  onDeleteLead, 
  onUpdateStatus, 
  onAddLeadNote, 
  onImportCSV,
  onSelectLead
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSegment, setFilterSegment] = useState('');

  // Filter leads locally for responsive quick feedback
  const filteredLeads = leads.filter(lead => {
    const query = search.toLowerCase();
    const matchesSearch = !search || 
      (lead.name || '').toLowerCase().includes(query) ||
      (lead.company || '').toLowerCase().includes(query) ||
      (lead.email || '').toLowerCase().includes(query) ||
      (lead.phone || '').toLowerCase().includes(query);
      
    const matchesStatus = !filterStatus || lead.status === filterStatus;
    const matchesSegment = !filterSegment || lead.segment === filterSegment;
    
    return matchesSearch && matchesStatus && matchesSegment;
  });

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads to export.');
      return;
    }
    const headers = ['Name', 'Company', 'Job Title', 'Segment', 'Service', 'City', 'Email', 'Phone', 'Status', 'Notes', 'Follow-up Date'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        `"${(lead.company || '').replace(/"/g, '""')}"`,
        `"${(lead.job_title || '').replace(/"/g, '""')}"`,
        `"${(lead.segment || '').replace(/"/g, '""')}"`,
        `"${(lead.service || '').replace(/"/g, '""')}"`,
        `"${(lead.city || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.status || '').replace(/"/g, '""')}"`,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        `"${(lead.follow_up_date || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `mam_crm_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="leads-page">
      {/* Search and Filters */}
      <div className="search-row">
        <input 
          type="text" 
          placeholder="Search leads by name, company, email, phone..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="filter-select" 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select 
          className="filter-select" 
          value={filterSegment}
          onChange={(e) => setFilterSegment(e.target.value)}
        >
          <option value="">All Segments</option>
          {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn btn-sm btn-primary" onClick={handleExportCSV} title="Export current leads to CSV">
          <i className="ti ti-download"></i> Export CSV
        </button>
      </div>

      {/* Leads Table Card */}
      <div className="card" style={{ overflowX: 'auto', padding: '12px' }}>
        {filteredLeads.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name & City</th>
                <th>Company</th>
                <th>Segment</th>
                <th>Service Required</th>
                <th>Project Details</th>
                <th>Contact details</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id} onClick={() => onSelectLead(lead)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{lead.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      {lead.city || 'N/A'}
                    </div>
                    {/* Render Folder Badge */}
                    {lead.folder_name && (
                      <span 
                        className="folder-badge"
                        style={{ 
                          backgroundColor: `${lead.folder_color}12`,
                          color: lead.folder_color,
                          border: `1px solid ${lead.folder_color}33`
                        }}
                      >
                        <i className="ti ti-folder-filled"></i> {lead.folder_name}
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{lead.company}</div>
                    {lead.job_title && (
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {lead.job_title}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="tag">{lead.segment}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: '13px' }}>{lead.service || 'General'}</div>
                  </td>
                  <td>
                    <div 
                      style={{ 
                        fontSize: '12px', 
                        color: 'var(--color-text-secondary)',
                        maxWidth: '240px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }} 
                      title={lead.notes}
                    >
                      {lead.notes || 'No project details'}
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {lead.email ? (
                      <a 
                        href={getMailtoLink(lead, SCRIPTS[lead.segment]?.email?.[0]?.text || '', 'mamindustries19@gmail.com', 'Matheen')}
                        className="link" 
                        title="Send Prefilled Intro Email"
                        style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        {lead.email} <i className="ti ti-mail-forward" style={{ fontSize: '11px' }}></i>
                      </a>
                    ) : (
                      '-'
                    )}
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{lead.phone || '-'}</div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select 
                      style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }}
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn btn-sm" 
                        onClick={() => onEditLead(lead)} 
                        title="Edit Lead"
                      >
                        <i className="ti ti-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm" 
                        onClick={() => onAddLeadNote(lead)} 
                        title="Add Note"
                      >
                        <i className="ti ti-notebook"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => onDeleteLead(lead.id)} 
                        title="Delete Lead"
                      >
                        <i className="ti ti-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty">
            <i className="ti ti-users" style={{ fontSize: '48px', display: 'block', marginBottom: '12px', opacity: 0.3 }}></i>
            No leads found matching current query.
          </div>
        )}
      </div>
    </div>
  );
}
