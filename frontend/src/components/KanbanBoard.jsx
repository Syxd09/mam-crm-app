import React, { useState } from 'react';

const COLUMNS = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost', 'Cold'];

const COLUMN_COLORS = {
  New: '#378ADD',
  Contacted: '#BA7517',
  Qualified: '#639922',
  Proposal: '#7F77DD',
  Won: '#1D9E75',
  Lost: '#E24B4A',
  Cold: '#888780'
};

export default function KanbanBoard({ leads, onUpdateStatus, onSelectLead }) {
  const [draggedOverCol, setDraggedOverCol] = useState(null);

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    setDraggedOverCol(column);
  };

  const handleDragLeave = () => {
    setDraggedOverCol(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDraggedOverCol(null);
    const leadIdStr = e.dataTransfer.getData('text/plain');
    if (leadIdStr) {
      const leadId = parseInt(leadIdStr, 10);
      onUpdateStatus(leadId, targetStatus);
    }
  };

  const moveCard = (leadId, currentStatus, direction) => {
    const currentIndex = COLUMNS.indexOf(currentStatus);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < COLUMNS.length) {
      onUpdateStatus(leadId, COLUMNS[nextIndex]);
    }
  };

  // Helper to determine follow up urgency
  const getFollowUpStatus = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fuDate = new Date(dateStr);
    fuDate.setHours(0, 0, 0, 0);

    if (fuDate < today) {
      return { label: `Overdue: ${dateStr}`, class: 'follow-overdue' };
    } else if (fuDate.getTime() === today.getTime()) {
      return { label: `Due Today`, class: 'follow-today' };
    } else {
      return { label: `Follow-up: ${dateStr}`, class: 'follow-future' };
    }
  };

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {COLUMNS.map(column => {
          const columnLeads = leads.filter(l => l.status === column);
          const isOver = draggedOverCol === column;

          return (
            <div
              key={column}
              className={`kanban-column ${isOver ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
            >
              <div 
                className="kanban-column-header" 
                style={{ borderTop: `3px solid ${COLUMN_COLORS[column]}` }}
              >
                <div className="column-title-wrap">
                  <span className="column-dot" style={{ backgroundColor: COLUMN_COLORS[column] }}></span>
                  <span className="column-title">{column}</span>
                </div>
                <span className="column-count">{columnLeads.length}</span>
              </div>

              <div className="kanban-cards-list">
                {columnLeads.map(lead => {
                  const followUp = getFollowUpStatus(lead.follow_up_date);
                  return (
                    <div
                      key={lead.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onClick={() => onSelectLead(lead)}
                    >
                      <div className="card-top">
                        <span className="card-segment-badge">{lead.segment}</span>
                        <div className="card-navigation-arrows" onClick={(e) => e.stopPropagation()}>
                          <button
                            disabled={COLUMNS.indexOf(column) === 0}
                            onClick={() => moveCard(lead.id, column, -1)}
                            title="Move Left"
                          >
                            <i className="ti ti-chevron-left"></i>
                          </button>
                          <button
                            disabled={COLUMNS.indexOf(column) === COLUMNS.length - 1}
                            onClick={() => moveCard(lead.id, column, 1)}
                            title="Move Right"
                          >
                            <i className="ti ti-chevron-right"></i>
                          </button>
                        </div>
                      </div>

                      <div className="card-lead-name">{lead.name}</div>
                      <div className="card-lead-company">{lead.company}</div>

                      {lead.service && (
                        <div className="card-service">
                          <i className="ti ti-tool"></i> {lead.service}
                        </div>
                      )}

                      {followUp && (
                        <div className={`card-follow-up ${followUp.class}`}>
                          <i className="ti ti-calendar-event"></i> {followUp.label}
                        </div>
                      )}

                      {lead.folder_name && (
                        <div 
                          className="folder-badge"
                          style={{
                            backgroundColor: `${lead.folder_color}12`,
                            color: lead.folder_color,
                            border: `1px solid ${lead.folder_color}33`,
                            alignSelf: 'flex-start',
                            marginTop: '8px'
                          }}
                        >
                          <i className="ti ti-folder-filled"></i> {lead.folder_name}
                        </div>
                      )}
                    </div>
                  );
                })}
                {columnLeads.length === 0 && (
                  <div className="kanban-empty-card">
                    Drag leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
