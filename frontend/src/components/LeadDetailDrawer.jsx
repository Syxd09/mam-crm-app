import React, { useState } from 'react';

export default function LeadDetailDrawer({ 
  lead, 
  onClose, 
  allNotes, 
  onAddNote, 
  onEditLead 
}) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!lead) return null;

  // Filter notes belonging to this lead
  const leadNotes = allNotes.filter(
    note => note.lead_id === lead.id || (note.lead_name && note.lead_name === lead.company)
  );

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!noteTitle.trim() && !noteBody.trim()) {
      alert('Note title or details are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddNote({
        title: noteTitle.trim() || 'Outreach Log',
        body: noteBody.trim(),
        lead_id: lead.id,
        lead_name: lead.company,
        folder_id: lead.folder_id || null
      });
      setNoteTitle('');
      setNoteBody('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div>
            <div className="drawer-meta-row">
              <span className="tag">{lead.segment}</span>
              {lead.folder_name && (
                <span 
                  className="folder-badge"
                  style={{ 
                    backgroundColor: `${lead.folder_color}12`,
                    color: lead.folder_color,
                    border: `1px solid ${lead.folder_color}33`,
                    marginTop: 0
                  }}
                >
                  <i className="ti ti-folder-filled"></i> {lead.folder_name}
                </span>
              )}
            </div>
            <h2 className="drawer-title">{lead.company}</h2>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Panel">
            <i className="ti ti-x"></i>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-content">
          
          {/* Action Row */}
          <div className="drawer-actions">
            <button className="btn btn-sm btn-primary" onClick={() => { onEditLead(lead); onClose(); }}>
              <i className="ti ti-edit"></i> Edit Lead Profile
            </button>
          </div>

          {/* Core Info Cards */}
          <div className="info-section">
            <h3 className="section-title">Lead Information</h3>
            <div className="info-grid">
              <div className="info-card">
                <span className="info-label">Contact Person</span>
                <span className="info-value">{lead.name}</span>
                {lead.job_title && <span className="info-subtext">{lead.job_title}</span>}
              </div>
              <div className="info-card">
                <span className="info-label">City</span>
                <span className="info-value">{lead.city || 'N/A'}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Email</span>
                <span className="info-value">
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} className="link">{lead.email}</a>
                  ) : (
                    '-'
                  )}
                </span>
              </div>
              <div className="info-card">
                <span className="info-label">Phone</span>
                <span className="info-value">
                  {lead.phone ? (
                    <a href={`tel:${lead.phone}`} className="link">{lead.phone}</a>
                  ) : (
                    '-'
                  )}
                </span>
              </div>
              <div className="info-card" style={{ gridColumn: 'span 2' }}>
                <span className="info-label">Service/Product Required</span>
                <span className="info-value">{lead.service || 'General fabrication / Not specified'}</span>
              </div>
              {lead.follow_up_date && (
                <div className="info-card" style={{ gridColumn: 'span 2' }}>
                  <span className="info-label">Next Scheduled Follow-up</span>
                  <span className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)' }}>
                    <i className="ti ti-calendar-event"></i>
                    {lead.follow_up_date}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          {lead.notes && (
            <div className="info-section">
              <h3 className="section-title">Initial Project Scope</h3>
              <div className="notes-display-box">
                {lead.notes}
              </div>
            </div>
          )}

          {/* Timeline & Notes Section */}
          <div className="info-section">
            <h3 className="section-title">Outreach & Activity Timeline</h3>
            
            {/* Quick Log Form */}
            <form onSubmit={handleSubmitNote} className="timeline-quick-log">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Note Title (e.g., Follow-up Call, Pitch Deck Sent)"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <textarea
                  placeholder="Log details of this interaction..."
                  rows="2"
                  value={noteBody}
                  onChange={(e) => setNoteBody(e.target.value)}
                  required
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-sm btn-primary"
                disabled={isSubmitting}
                style={{ alignSelf: 'flex-end' }}
              >
                <i className="ti ti-plus"></i> {isSubmitting ? 'Logging...' : 'Log Note'}
              </button>
            </form>

            {/* Visual Timeline */}
            <div className="visual-timeline" style={{ marginTop: '20px' }}>
              <div className="timeline-item timeline-creation">
                <div className="timeline-node">
                  <i className="ti ti-circle-check"></i>
                </div>
                <div className="timeline-card">
                  <div className="timeline-date">{formatDate(lead.created_at)}</div>
                  <div className="timeline-title">Lead Created</div>
                  <div className="timeline-desc">Added to CRM Workspace. Initial status set to <strong>{lead.status}</strong>.</div>
                </div>
              </div>

              {leadNotes.map((note) => (
                <div key={note.id} className="timeline-item">
                  <div className="timeline-node">
                    <i className="ti ti-message-circle"></i>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-date">{formatDate(note.created_at || note.date)}</div>
                    <div className="timeline-title">{note.title}</div>
                    <div className="timeline-desc">{note.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
