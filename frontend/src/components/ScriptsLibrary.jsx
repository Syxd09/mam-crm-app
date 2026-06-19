import React, { useState } from 'react';

const SEGMENTS = ['OEM', 'EPC', 'Architecture', 'Factory', 'Defence'];

export const SCRIPTS = {
  OEM: {
    email: [
      { num: 'Email 1 — Introduction (Sequence)', style: 'Sequence', text: `Subject: Precision fabrication partner for [Company]\n\nHi [Name],\n\nI noticed [Company] manufactures [product type] and I wanted to reach out directly.\n\nMAM Industries is a Bengaluru-based precision metal fabrication company — laser cutting, CNC bending, MIG/TIG welding, powder coating — all under one roof. We work with OEMs across automotive and industrial machinery.\n\nI'd love to understand your current fabrication requirements and see if we can be a fit. Would a quick 15-minute call this week work?\n\nBest,\n[Your name]\nMAM Industries | mamindustries.in` },
      { num: 'Email 2 — Follow-up (Sequence, Day 5)', style: 'Sequence', text: `Subject: Re: Precision fabrication for [Company]\n\nHi [Name],\n\nFollowing up on my earlier note. We recently helped an OEM in [city] reduce fabrication lead times by 30% by consolidating their vendor base with us.\n\nGiven your production volumes, I believe we could offer similar value — consistent quality, on-time delivery, and a single accountable partner.\n\nAre you the right person to discuss fabrication vendors, or should I reach out to someone else on your team?\n\nBest,\n[Your name]` },
      { num: 'Email 3 — Final nudge (Sequence, Day 12)', style: 'Sequence', text: `Subject: One last note — MAM Industries\n\nHi [Name],\n\nI'll keep this brief. If you're evaluating fabrication partners or have a project coming up, I'd love a chance to quote.\n\nWe offer: laser cutting, CNC bending, full welding (MIG/TIG/CO2), and powder coating — all from our Bengaluru facility.\n\nHappy to share our capability sheet or arrange a facility visit. Just reply with a good time.\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 4 — Short & Direct Pitch', style: 'Short & Direct', text: `Subject: Fabrication capacity in Bengaluru\n\nHi [Name],\n\nDo you have any active requirements for laser cutting, CNC bending, or welding at [Company]?\n\nMAM Industries is a single-roof precision metal fabrication shop in Bengaluru. We have open capacity this month and can turn around quotes within 24 hours.\n\nLet me know if I can send over our capability sheet.\n\nBest,\n[Your name]` },
      { num: 'Email 5 — Value & Case Study Focus', style: 'Value & Case Study', text: `Subject: Sourcing optimization for [Company]\n\nHi [Name],\n\nWe recently partnered with a machinery OEM to consolidate their fabrication supply chain. By handling laser cutting, bending, welding, and powder coating under one roof, we reduced their turnaround times by 35% and lowered logistics overhead.\n\nGiven [Company]'s focus on manufacturing efficiency, I wanted to see if we could explore a similar collaboration.\n\nCould we schedule a 10-minute call to discuss your sourcing needs?\n\nBest,\n[Your name]` },
      { num: 'Email 6 — Direct Call Booking', style: 'Meeting Request', text: `Subject: Quick call re: [Company] fabrication vendor list\n\nHi [Name],\n\nI’d like to request a brief introductory call to present MAM Industries as a potential fabrication partner for [Company].\n\nWe specialize in high-precision metal components and have ready capacity at our Bengaluru facility.\n\nWould you be open to a 10-minute call next Tuesday at 11 AM?\n\nBest,\n[Your name]` }
    ],
    linkedin: [
      { num: 'Connection request (300 chars max)', text: `Hi [Name], came across [Company] while researching OEM fabrication requirements in India. We're a Bengaluru precision fabrication shop — laser cutting, welding, powder coating. Thought there could be a fit. Happy to connect.` },
      { num: 'Message 1 — After connecting (48–72 hrs)', text: `Hi [Name], thanks for connecting!\n\nMAM Industries does precision metal fabrication — laser cutting, CNC bending, MIG/TIG welding, powder coating. We work with OEMs across automotive and industrial machinery.\n\nCurious — does [Company] work with external fabrication vendors, or is it all done in-house? Just want to understand your setup before suggesting anything.` },
      { num: 'Message 2 — Follow-up (Day 7)', text: `Hi [Name], just following up on my earlier message.\n\nWe recently helped an OEM reduce sourcing complexity by consolidating multiple fabrication steps with us under one roof. Happy to share specifics if it's relevant.\n\nIs fabrication something you're looking to optimise right now, or would it be better to reconnect next quarter?` }
    ]
  },
  EPC: {
    email: [
      { num: 'Email 1 — Introduction (Sequence)', style: 'Sequence', text: `Subject: Structural & precision fabrication for [Company]\n\nHi [Name],\n\nI'm reaching out because [Company]'s project pipeline caught our attention — particularly on metal structures.\n\nMAM Industries provides structural and precision metal fabrication out of Bengaluru — laser cutting, CNC bending, MIG/TIG welding, and powder coating. We're set up to meet the delivery timelines that EPC projects demand.\n\nAre you responsible for vendor evaluation on the fabrication side? If so, I'd love to understand your upcoming requirements.\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 2 — Follow-up (Sequence, Day 5)', style: 'Sequence', text: `Subject: Re: Fabrication vendor for [Company]\n\nHi [Name],\n\nQuick follow-up. One thing EPC contractors often tell us is that vendor consolidation and reliable delivery are the two things they struggle with most on fabrication.\n\nWe're built for exactly that — multi-process capability in one facility, project-specific scheduling, and documented quality control.\n\nEven if you don't have an immediate requirement, it may be worth a brief call to add us to your approved vendor list for future projects.\n\nBest,\n[Your name]` },
      { num: 'Email 3 — Final nudge (Sequence, Day 12)', style: 'Sequence', text: `Subject: Approved vendor list — MAM Industries\n\nHi [Name],\n\nLast note from my end. If there's a project in the pipeline that needs fabrication capability — structural, precision, or decorative metal — we'd like to be considered.\n\nHappy to send our capability sheet, company profile, and quality documentation for your records. No obligation.\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 4 — Short & Direct Pitch', style: 'Short & Direct', text: `Subject: Structural fabrication for [Company]\n\nHi [Name],\n\nAre you looking for reliable structural or precision metal fabricators for [Company]'s current projects in [city]?\n\nMAM Industries provides heavy-duty laser cutting, bending, and TIG/MIG welding under one roof in Bengaluru.\n\nWould you like a copy of our QA/QC procedures and client list?\n\nBest,\n[Your name]` },
      { num: 'Email 5 — Value & Case Study Focus', style: 'Value & Case Study', text: `Subject: Avoiding project delays on fabrication for [Company]\n\nHi [Name],\n\nOne of the main challenges EPC contractors face is fabricator delays holding up project sites. At MAM Industries, we resolve this with dedicated project management and internal single-roof processes (laser cutting to final powder coating).\n\nFor a recent project in [city], we delivered 40 tons of fabricated structures 5 days ahead of schedule.\n\nI'd love to share our project tracker and capability statement. Do you have 10 minutes this week?\n\nBest,\n[Your name]` },
      { num: 'Email 6 — Direct Call Booking', style: 'Meeting Request', text: `Subject: Meeting request: Fabrication vendor registration\n\nHi [Name],\n\nI would like to schedule a brief introductory meeting to initiate vendor registration for MAM Industries with [Company].\n\nWe provide heavy and precision structural fabrication and hold certifications relevant to EPC projects.\n\nCould we connect for 10 minutes on Thursday afternoon?\n\nBest,\n[Your name]` }
    ],
    linkedin: [
      { num: 'Connection request', text: `Hi [Name], noticed [Company] is active in EPC/infrastructure projects in India. MAM Industries offers precision and structural metal fabrication from Bengaluru — we work with contractors on project-specific requirements. Would love to connect.` },
      { num: 'Message 1 — After connecting', text: `Hi [Name], thanks for connecting!\n\nWe do precision metal fabrication — laser cutting, CNC bending, welding, powder coating. A few EPC contractors use us for project-specific fabrication where standard vendor catalogues don't cut it.\n\nAre you involved in vendor selection for fabrication on your projects, or is that handled separately?` },
      { num: 'Message 2 — Follow-up', text: `Hi [Name], just circling back. We're looking to expand our EPC client base and get onto vendor lists for upcoming infrastructure and industrial projects.\n\nWould it be useful to send over our company profile and capability doc? That way we're on your radar when a requirement comes up — no pressure to engage right now.` }
    ]
  },
  Architecture: {
    email: [
      { num: 'Email 1 — Introduction (Sequence)', style: 'Sequence', text: `Subject: Custom metalwork for your projects — MAM Industries\n\nHi [Name],\n\nI came across [Company]'s portfolio and was particularly impressed by your project styles. It got me thinking about how we might support your work.\n\nMAM Industries specialises in precision metal fabrication — we do a lot of custom structural and decorative metalwork for architecture and interior fit-out projects. Laser-cut screens, bespoke staircases, cladding, furniture frames — we can prototype and produce.\n\nAre you working on any projects where custom metal fabrication would be relevant?\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 2 — Follow-up (Sequence, Day 5)', style: 'Sequence', text: `Subject: Re: Custom metal fabrication — [Company]\n\nHi [Name],\n\nFollowing up briefly. We've worked with architects on everything from decorative laser-cut panels to structural support elements — and we're happy to work from CAD files or drawings.\n\nIf it'd help, I can share a few examples of custom architectural metalwork we've done recently.\n\nWorth a 10-minute call?\n\nBest,\n[Your name]` },
      { num: 'Email 3 — Final nudge (Sequence, Day 12)', style: 'Sequence', text: `Subject: Portfolio & capability — MAM Industries\n\nHi [Name],\n\nLast note. I'll send over our capability sheet and a few project photos in case it's useful for future reference.\n\nIf you ever have a project that needs custom fabrication — prototypes, one-offs, or production runs — we're easy to work with and based in Bengaluru.\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 4 — Short & Direct Pitch', style: 'Short & Direct', text: `Subject: Custom metal fabrication in [city]\n\nHi [Name],\n\nI'm with MAM Industries. We specialize in custom architectural metalwork — decorative screens, staircases, structural frames, and custom furniture.\n\nWe can fabricate directly from your CAD files with high precision at our Bengaluru facility.\n\nDo you have any current projects in [city] requiring bespoke metal elements?\n\nBest,\n[Your name]` },
      { num: 'Email 5 — Value & Case Study Focus', style: 'Value & Case Study', text: `Subject: Prototyping custom metalwork for [Company]\n\nHi [Name],\n\nWe know that architectural metalwork requires a balance of structural integrity and aesthetic precision. \n\nWe recently helped an architecture firm design and fabricate a custom laser-cut facade for a commercial building in [city], turning around the prototype in just 4 days.\n\nI'd love to send you a PDF of our design catalog and material finishes.\n\nAre you free for a quick chat next week?\n\nBest,\n[Your name]` },
      { num: 'Email 6 — Direct Call Booking', style: 'Meeting Request', text: `Subject: Showroom visit / Portfolio review\n\nHi [Name],\n\nI'd love to arrange a brief call to share our architectural metalwork portfolio with the team at [Company].\n\nWe work with leading designers to bring complex metal concepts to life.\n\nWould you be open to a 10-minute online portfolio review or a visit to our Bengaluru facility?\n\nBest,\n[Your name]` }
    ],
    linkedin: [
      { num: 'Connection request', text: `Hi [Name], love [Company]'s work — especially the use of metalwork in your recent projects. We do precision and custom metal fabrication at MAM Industries. Thought it'd be worth connecting in case there's a fit on a future project.` },
      { num: 'Message 1 — After connecting', text: `Hi [Name], thanks for connecting!\n\nWe do custom metal fabrication — laser cutting, CNC bending, welding, powder coating. A lot of our work is bespoke: decorative screens, staircases, structural frames, furniture — working from CAD or drawings.\n\nDo you tend to source metalwork locally in Bengaluru, or does it depend on the project?` },
      { num: 'Message 2 — Follow-up', text: `Hi [Name], just following up. Happy to share our portfolio and capability doc — it might be useful to have on file for when a project comes up that needs custom metalwork.\n\nAlternatively, if there's something specific you're working on right now, I'd love to understand the brief.` }
    ]
  },
  Factory: {
    email: [
      { num: 'Email 1 — Introduction (Sequence)', style: 'Sequence', text: `Subject: Fabrication support for [Company] — MAM Industries\n\nHi [Name],\n\nI'm reaching out because manufacturing and plant operations teams often need a reliable fabrication partner for both planned and unplanned requirements.\n\nMAM Industries offers laser cutting, CNC bending, MIG/TIG/CO2 welding, and powder coating from our Bengaluru facility. We work with factory and plant teams on everything from jigs and fixtures to replacement parts and custom assemblies.\n\nDo you have a current fabrication vendor, or is this something you'd be open to exploring?\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 2 — Follow-up (Sequence, Day 5)', style: 'Sequence', text: `Subject: Re: Fabrication for [Company]\n\nHi [Name],\n\nFollowing up on my note. The most common thing we hear from plant teams is that their current vendors are slow to respond or can't handle the variety of requirements that come up.\n\nWe're a multi-process shop, so we can handle most metal fabrication needs under one roof — and we're set up to turn around urgent requirements quickly.\n\nWorth a brief call this week?\n\nBest,\n[Your name]` },
      { num: 'Email 3 — Final nudge (Sequence, Day 12)', style: 'Sequence', text: `Subject: Last note — MAM Industries fabrication\n\nHi [Name],\n\nI'll keep it short. If you have upcoming fabrication requirements — or want a backup vendor for urgent plant needs — we'd love to be on your list.\n\nReply and I'll send over our capability sheet and pricing overview.\n\nBest,\n[Your name]\nMAM Industries` },
      { num: 'Email 4 — Short & Direct Pitch', style: 'Short & Direct', text: `Subject: Custom jigs & plant fabrication\n\nHi [Name],\n\nDo you need custom jigs, fixtures, safety guards, or material handling racks for your plant in [city]?\n\nMAM Industries provides rapid-turnaround fabrication (laser cutting, bending, welding) for factory operations.\n\nLet me know if we can quote on any current maintenance or operational requirements.\n\nBest,\n[Your name]` },
      { num: 'Email 5 — Value & Case Study Focus', style: 'Value & Case Study', text: `Subject: Reducing plant downtime with rapid fabrication\n\nHi [Name],\n\nWhen a production line needs a custom replacement bracket or safety guard, response time is critical.\n\nWe recently assisted a manufacturing facility in [city] by fabricating and powder-coating custom assembly jigs within 48 hours, minimizing their scheduled downtime.\n\nI'd love to set up MAM Industries as an approved maintenance vendor for [Company]. Can we discuss this briefly?\n\nBest,\n[Your name]` },
      { num: 'Email 6 — Direct Call Booking', style: 'Meeting Request', text: `Subject: Operational support introduction\n\nHi [Name],\n\nI would like to arrange a short phone call to introduce our factory fabrication support services to [Company].\n\nWe support operations teams with custom parts, safety upgrades, and production tooling.\n\nWould Wednesday morning work for a quick introductory call?\n\nBest,\n[Your name]` }
    ],
    linkedin: [
      { num: 'Connection request', text: `Hi [Name], I work with manufacturing and plant operations teams on precision metal fabrication requirements. MAM Industries — Bengaluru, multi-process shop. Thought it'd be worth connecting.` },
      { num: 'Message 1 — After connecting', text: `Hi [Name], thanks for connecting!\n\nWe do fabrication for plant and factory teams — laser cutting, CNC bending, welding, powder coating. Everything from jigs and fixtures to replacement components and custom assemblies.\n\nDoes [Company] work with external fabricators, or is everything done in-house?` },
      { num: 'Message 2 — Follow-up', text: `Hi [Name], just following up. Happy to share our capability sheet and turnaround times — might be worth having on file as a backup vendor even if you have a primary supplier right now.\n\nLet me know if that'd be useful.` }
    ]
  },
  Defence: {
    email: [
      { num: 'Email 1 — Introduction (Sequence)', style: 'Sequence', text: `Subject: Precision fabrication capability — MAM Industries\n\nDear [Name],\n\nI am writing to introduce MAM Industries, a Bengaluru-based precision metal fabrication company specialising in laser cutting, CNC bending, MIG/TIG/CO2 welding, and powder coating.\n\nWe understand that defence and aerospace procurement involves rigorous qualification and documentation requirements. We are prepared to support that process and would welcome the opportunity to discuss our capabilities in relation to [Company]'s requirements.\n\nPlease let me know if it would be appropriate to submit a formal capability document or arrange a facility review.\n\nYours sincerely,\n[Your name]\nMAM Industries` },
      { num: 'Email 2 — Follow-up (Sequence, Day 7)', style: 'Sequence', text: `Subject: Re: MAM Industries — Precision fabrication\n\nDear [Name],\n\nI am following up on my previous correspondence. We understand procurement cycles in defence and aerospace are long, and we are not looking for an immediate commitment.\n\nOur intent is to be considered for future requirements by providing our full capability documentation, quality records, and facility details at your convenience.\n\nPlease advise on the appropriate process to be registered as a potential vendor.\n\nYours sincerely,\n[Your name]` },
      { num: 'Email 3 — Final nudge (Sequence, Day 21)', style: 'Sequence', text: `Subject: Vendor registration — MAM Industries\n\nDear [Name],\n\nThis is my final follow-up. I would appreciate guidance on the appropriate channel to submit our company profile and capability document for vendor registration consideration.\n\nIf now is not the right time, I am happy to reconnect at your preferred date.\n\nYours sincerely,\n[Your name]\nMAM Industries` },
      { num: 'Email 4 — Short & Direct Pitch', style: 'Short & Direct', text: `Subject: High-precision metal fabrication capabilities\n\nDear [Name],\n\nMAM Industries offers high-precision metal fabrication (laser cutting, CNC bending, and certified welding) in Bengaluru.\n\nWe work with defense suppliers to fabricate sub-assemblies conforming to strict quality and tolerance requirements.\n\nMay we submit our company profile for your vendor list?\n\nSincerely,\n[Your name]` },
      { num: 'Email 5 — Value & Case Study Focus', style: 'Value & Case Study', text: `Subject: Certified welding & precision fabrication for [Company]\n\nDear [Name],\n\nWe understand that defense component manufacturing requires complete material traceability and welding certifications.\n\nAt MAM Industries, we maintain rigorous QA protocols for every fabrication step — from raw laser cutting to specialized powder coating.\n\nI would like to share our quality manual and material testing procedures with the quality team at [Company]. Let me know a convenient time to speak.\n\nSincerely,\n[Your name]` },
      { num: 'Email 6 — Direct Call Booking', style: 'Meeting Request', text: `Subject: Capability presentation request\n\nDear [Name],\n\nI am writing to request a formal meeting to present MAM Industries' precision fabrication capabilities to the procurement committee at [Company].\n\nWe have experience in defense-grade structural welding and sheet metal processing.\n\nCould we schedule a 15-minute call or online briefing session this month?\n\nSincerely,\n[Your name]` }
    ],
    linkedin: [
      { num: 'Connection request', text: `Dear [Name], I represent MAM Industries, a precision metal fabrication company in Bengaluru — laser cutting, CNC bending, welding, powder coating. We are exploring opportunities in the defense and aerospace supply chain. Would appreciate connecting.` },
      { num: 'Message 1 — After connecting', text: `Dear [Name], thank you for connecting.\n\nMAM Industries provides precision metal fabrication and we are in the process of qualifying for defense and aerospace supply chain opportunities.\n\nCould you advise on the appropriate process to introduce our capabilities to your procurement or vendor development team?` },
      { num: 'Message 2 — Follow-up', text: `Dear [Name], following up on my earlier message. We are happy to share our full capability document, quality records, and facility details. Our intent is simply to be on your radar for future requirements.\n\nPlease let me know how best to proceed.` }
    ]
  }
};

export const personalizeScript = (text, lead, yourName = 'Matheen') => {
  if (!text) return '';
  const leadName = lead.name || '';
  const leadCompany = lead.company || '';
  const leadCity = lead.city || '';
  const leadService = lead.service || '';
  return text
    .replace(/\[Name\]/g, leadName || '[Name]')
    .replace(/\[Company\]/g, leadCompany || '[Company]')
    .replace(/\[Firm\]/g, leadCompany || '[Firm]')
    .replace(/\[Project\/Company\]/g, leadCompany || '[Project/Company]')
    .replace(/\[city\]/g, leadCity || '[city]')
    .replace(/\[City\]/g, leadCity || '[City]')
    .replace(/\[product type\]/g, leadService || '[product type]')
    .replace(/\[type of project, if known\]/g, leadService || '[type of project]')
    .replace(/\[type of project\]/g, leadService || '[type of project]')
    .replace(/\[project or style\]/g, leadService || '[project or style]')
    .replace(/\[Your name\]/g, yourName || '[Your name]')
    .replace(/\[Your projects\]/g, yourName || '[Your projects]')
    .replace(/\[spec\]/g, '20mm steel');
};

export const getMailtoLink = (lead, scriptText, ccEmail = 'mamindustries19@gmail.com', yourName = 'Matheen') => {
  const personalized = personalizeScript(scriptText, lead, yourName);
  const subjectMatch = personalized.match(/^Subject:\s*(.*)/i);
  const subject = subjectMatch ? subjectMatch[1] : 'Precision Fabrication Inquiry';
  const body = subject ? personalized.replace(/^Subject:\s*(.*)\r?\n\r?\n/i, '') : personalized;
  return `mailto:${encodeURIComponent(lead.email || '')}?cc=${encodeURIComponent(ccEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const getGmailLink = (lead, scriptText, ccEmail = 'mamindustries19@gmail.com', yourName = 'Matheen') => {
  const personalized = personalizeScript(scriptText, lead, yourName);
  const subjectMatch = personalized.match(/^Subject:\s*(.*)/i);
  const subject = subjectMatch ? subjectMatch[1] : 'Precision Fabrication Inquiry';
  const body = subject ? personalized.replace(/^Subject:\s*(.*)\r?\n\r?\n/i, '') : personalized;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email || '')}&cc=${encodeURIComponent(ccEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function ScriptsLibrary({ leads = [] }) {
  const [currentSeg, setCurrentSeg] = useState('OEM');
  const [currentChannel, setCurrentChannel] = useState('email');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Lead selection state
  const [selectedLeadId, setSelectedLeadId] = useState('');

  // Customization states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [ccEmail, setCcEmail] = useState('mamindustries19@gmail.com');
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [yourName, setYourName] = useState('');
  
  // Email template style filter state
  const [emailStyle, setEmailStyle] = useState('All');

  const personalizeText = (text) => {
    return personalizeScript(text, { name, company, city, service }, yourName || 'Matheen');
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  const handleLeadSelect = (leadId) => {
    setSelectedLeadId(leadId);
    if (!leadId) {
      setName('');
      setCompany('');
      setEmail('');
      setCcEmail('mamindustries19@gmail.com');
      setCity('');
      setService('');
      return;
    }
    const lead = leads.find(l => String(l.id) === String(leadId));
    if (lead) {
      setName(lead.name || '');
      setCompany(lead.company || '');
      setEmail(lead.email || '');
      setCity(lead.city || '');
      setService(lead.service || '');
      if (SEGMENTS.includes(lead.segment)) {
        setCurrentSeg(lead.segment);
      }
    }
  };

  const handleReset = () => {
    setSelectedLeadId('');
    setName('');
    setCompany('');
    setEmail('');
    setCcEmail('mamindustries19@gmail.com');
    setCity('');
    setService('');
  };

  // Sort leads alphabetically by company name for premium UX dropdown selection
  const sortedLeads = [...leads].sort((a, b) => 
    (a.company || '').localeCompare(b.company || '')
  );

  const currentData = SCRIPTS[currentSeg]?.[currentChannel] || [];
  
  // Filter current data if email style is selected
  const filteredData = currentChannel === 'email' && emailStyle !== 'All'
    ? currentData.filter(item => item.style === emailStyle)
    : currentData;

  return (
    <div className="scripts-page">
      {/* Customizer Panel */}
      <div className="card personalize-card" style={{ marginBottom: '24px' }}>
        <div className="card-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="card-title">
            <i className="ti ti-edit" style={{ marginRight: '6px' }}></i> 
            Personalize Script Details
          </span>
          {(name || company || email || city || service || ccEmail !== 'mamindustries19@gmail.com') && (
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={handleReset} 
              style={{ 
                padding: '4px 10px', 
                fontSize: '11.5px', 
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <i className="ti ti-rotate"></i> Reset Fields
            </button>
          )}
        </div>

        {/* Lead Dropdown Selector */}
        <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <i className="ti ti-user-check" style={{ color: 'var(--color-primary)' }}></i> 
              Auto-fill from Existing Lead / Customer
            </label>
            <select
              value={selectedLeadId}
              onChange={(e) => handleLeadSelect(e.target.value)}
              style={{ 
                width: '100%', 
                maxWidth: '450px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              <option value="">-- Choose an Existing Lead --</option>
              {sortedLeads.map(l => (
                <option key={l.id} value={l.id}>
                  {l.company} {l.name ? `(${l.name})` : ''} — {l.segment}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Contact Person Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Tata Motors"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@company.com"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">CC Email</label>
            <input
              type="email"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
              placeholder="e.g. manager@company.com"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Pune"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Service / Project</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. solar structures"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Your Name</label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="e.g. Matheen"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Select Segment Target</span>
        </div>
        
        {/* Segment Tabs */}
        <div className="script-tabs">
          {SEGMENTS.map(s => (
            <button
              key={s}
              className={`script-tab ${currentSeg === s ? 'active' : ''}`}
              onClick={() => setCurrentSeg(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Channel Selection Buttons & Style Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`script-tab ${currentChannel === 'email' ? 'active' : ''}`}
              onClick={() => {
                setCurrentChannel('email');
                setEmailStyle('All');
              }}
            >
              <i className="ti ti-mail"></i> Email Outreach
            </button>
            <button
              className={`script-tab ${currentChannel === 'linkedin' ? 'active' : ''}`}
              onClick={() => setCurrentChannel('linkedin')}
            >
              <i className="ti ti-brand-linkedin"></i> LinkedIn Social
            </button>
          </div>

          {currentChannel === 'email' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-muted)' }}>Email Style:</span>
              <div style={{ 
                display: 'inline-flex', 
                gap: '4px', 
                background: 'var(--color-bg-alt)', 
                padding: '3px', 
                borderRadius: '8px', 
                border: '1px solid var(--color-border)' 
              }}>
                {['All', 'Sequence', 'Short & Direct', 'Value & Case Study', 'Meeting Request'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setEmailStyle(style)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '11px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: emailStyle === style ? 'var(--color-primary)' : 'transparent',
                      color: emailStyle === style ? '#fff' : 'var(--color-text)',
                      transition: 'all 0.2s ease',
                      fontWeight: emailStyle === style ? '600' : '400'
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scripts Content */}
        <div className="scripts-content">
          {filteredData.map((script, idx) => {
            const personalized = personalizeText(script.text);

            return (
              <div key={idx} className="script-block">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div className="script-num" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {script.num} 
                    {script.style && (
                      <span 
                        className="badge" 
                        style={{ 
                          fontSize: '10px', 
                          backgroundColor: 'var(--color-bg-alt)', 
                          color: 'var(--color-primary)', 
                          border: '1px solid var(--color-border)', 
                          padding: '2px 8px', 
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}
                      >
                        {script.style}
                      </span>
                    )}
                  </div>
                </div>

                <div className="script-text">{personalized}</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                  <button
                    className="btn btn-sm copy-btn btn-primary"
                    onClick={() => handleCopy(personalized, idx)}
                  >
                    {copiedIndex === idx ? (
                      <>
                        <i className="ti ti-check"></i> Copied
                      </>
                    ) : (
                      <>
                        <i className="ti ti-copy"></i> Copy Body
                      </>
                    )}
                  </button>

                  {currentChannel === 'email' && email && (
                    <>
                      <a
                        href={getGmailLink({ name, company, email, city, service }, script.text, ccEmail, yourName || 'Matheen')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                        style={{ 
                          textDecoration: 'none', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          fontWeight: '500'
                        }}
                      >
                        <i className="ti ti-mail-forward"></i> Send via Gmail
                      </a>

                      <a
                        href={getMailtoLink({ name, company, email, city, service }, script.text, ccEmail, yourName || 'Matheen')}
                        className="btn btn-sm btn-outline-primary"
                        style={{ 
                          textDecoration: 'none', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          fontWeight: '500'
                        }}
                      >
                        <i className="ti ti-device-desktop"></i> Send via Mail App
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {filteredData.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No scripts matching the selected outreach style.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
