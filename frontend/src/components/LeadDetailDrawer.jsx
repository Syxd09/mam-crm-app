import React, { useState } from 'react';
import { SCRIPTS, getMailtoLink, getGmailLink, personalizeScript } from './ScriptsLibrary';

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
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);

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

  // Get templates for this segment
  const segmentTemplates = SCRIPTS[lead.segment]?.email || [];
  const activeTemplate = segmentTemplates[selectedTemplateIdx] || segmentTemplates[0] || null;
  
  // Prefilled links for header card (defaults to Introductory email template 1)
  const introTemplateText = segmentTemplates[0]?.text || '';
  const defaultGmailLink = lead.email ? getGmailLink(lead, introTemplateText, 'mamindustries19@gmail.com', 'Matheen') : '#';

  // Prefilled links for active selected template in the widget
  const widgetGmailLink = lead.email && activeTemplate 
    ? getGmailLink(lead, activeTemplate.text, 'mamindustries19@gmail.com', 'Matheen') 
    : '#';
  const widgetMailtoLink = lead.email && activeTemplate 
    ? getMailtoLink(lead, activeTemplate.text, 'mamindustries19@gmail.com', 'Matheen') 
    : '#';

  // Get personalized preview of subject
  let previewSubject = 'No subject';
  if (activeTemplate) {
    const personalized = personalizeScript(activeTemplate.text, lead, 'Matheen');
    const subjectMatch = personalized.match(/^Subject:\s*(.*)/i);
    previewSubject = subjectMatch ? subjectMatch[1] : 'Precision Fabrication Inquiry';
  }

  const handleCopyTemplate = () => {
    if (!activeTemplate) return;
    const personalized = personalizeScript(activeTemplate.text, lead, 'Matheen');
    const subjectMatch = personalized.match(/^Subject:\s*(.*)/i);
    const body = subjectMatch ? personalized.replace(/^Subject:\s*(.*)\r?\n\r?\n/i, '') : personalized;
    
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(previewSubject).then(() => {
      setSubjectCopied(true);
      setTimeout(() => setSubjectCopied(false), 1500);
    });
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
                    <a href={defaultGmailLink} target="_blank" rel="noopener noreferrer" className="link" title="Click to compose Intro email in Gmail Web">
                      {lead.email} <i className="ti ti-mail-forward" style={{ fontSize: '12px', marginLeft: '2px' }}></i>
                    </a>
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

          {/* Quick Email Outreach Section */}
          {lead.email && segmentTemplates.length > 0 && (
            <div className="info-section">
              <h3 className="section-title">Quick Email Outreach</h3>
              <div style={{ 
                background: 'var(--color-bg-alt)', 
                padding: '16px', 
                borderRadius: '8px', 
                border: '1px solid var(--color-border)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
              }}>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                    Select Outreach Template Style
                  </label>
                  <select 
                    value={selectedTemplateIdx} 
                    onChange={(e) => setSelectedTemplateIdx(Number(e.target.value))}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      borderRadius: '6px', 
                      fontSize: '12.5px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-text)',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    {segmentTemplates.map((t, idx) => (
                      <option key={idx} value={idx}>
                        {t.num} ({t.style || 'Sequence'})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Preview of the personalized subject */}
                <div style={{ marginBottom: '16px', fontSize: '12px', background: 'var(--color-bg)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                  <strong>Subject:</strong> <span style={{ color: 'var(--color-text)' }}>{previewSubject}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <a
                    href={widgetGmailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                    style={{ 
                      textDecoration: 'none', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      flex: '1 1 100%', 
                      justifyContent: 'center',
                      fontWeight: '500'
                    }}
                  >
                    <i className="ti ti-mail-forward"></i> Send via Gmail (Web)
                  </a>
                  <a
                    href={widgetMailtoLink}
                    className="btn btn-sm btn-outline-primary"
                    style={{ 
                      textDecoration: 'none', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      flex: '1 1 100%',
                      justifyContent: 'center',
                      fontWeight: '500'
                    }}
                  >
                    <i className="ti ti-device-desktop"></i> Send via Mail App
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleCopySubject}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '500', flex: '1 1 45%', justifyContent: 'center' }}
                  >
                    {subjectCopied ? <><i className="ti ti-check"></i> Copied Subject</> : <><i className="ti ti-copy"></i> Copy Subject</>}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleCopyTemplate}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '500', flex: '1 1 45%', justifyContent: 'center' }}
                  >
                    {copied ? <><i className="ti ti-check"></i> Copied Body</> : <><i className="ti ti-copy"></i> Copy Body</>}
                  </button>
                </div>
              </div>
            </div>
          )}

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
