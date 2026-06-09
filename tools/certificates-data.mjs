/** Single source for certificate archive — used by generate-certificates-html.mjs */
export const CERT_CHAPTER_IDS = {
  audit: 'cert-audit',
  methods: 'cert-methods',
  'quality-management': 'cert-quality',
  'regulatory-affairs': 'cert-regulatory',
  'ai-and-other': 'cert-ai',
};

export const CERT_GROUPS = [
  {
    id: 'audit',
    title: 'Audit',
    subtitle: 'Process and quality audit',
    ariaLabel: 'Audit',
    certs: [
      {
        file: 'bjoern-seiler-vda-6-3-process-auditor.jpg',
        title: 'VDA 6.3 Process Auditor',
        context: 'VDA · process audit',
        caption: 'Process audit competence for supplier and production environments.',
      },
      {
        file: 'bjoern-seiler-eoq-quality-auditor.jpg',
        title: 'EOQ Quality Auditor',
        context: 'EOQ · audit',
        caption: 'European Organization for Quality auditor qualification.',
      },
    ],
  },
  {
    id: 'methods',
    title: 'Methods',
    ariaLabel: 'Methods',
    certs: [
      {
        file: 'bjoern-seiler-tuev-methods-certificate.jpg',
        title: 'TÜV Methods Certificate',
        context: 'TÜV · methods',
        caption: 'Methods and analytical foundation for quality work.',
      },
      {
        file: 'bjoern-seiler-iso-14971-risk-management.jpg',
        title: 'ISO 14971 Risk Management',
        context: 'ISO 14971 · risk',
        caption: 'Risk management methods for medical devices.',
      },
      {
        file: 'bjoern-seiler-design-control.jpg',
        title: 'Design Control',
        context: 'Medical devices · design',
        caption: 'Design control in regulated medical-device development.',
      },
      {
        file: 'bjoern-seiler-process-validation-medical-devices.jpg',
        title: 'Process Validation for Medical Devices',
        context: 'Medical devices · validation',
        caption: 'Process validation qualification for medical-device manufacturing.',
      },
      {
        file: 'bjoern-seiler-ppc.jpg',
        title: 'Production and Process Control (PPC)',
        context: 'Medical devices · methods',
        caption: 'Production and process control in medical-device contexts.',
      },
    ],
  },
  {
    id: 'quality-management',
    title: 'Quality Management',
    ariaLabel: 'Quality Management',
    certs: [
      {
        file: 'bjoern-seiler-medidee-mp-advisor.jpg',
        title: 'Medical Device Advisor (Medidee)',
        context: 'Medical devices · advisory',
        caption: 'Medical-device advisory qualification.',
      },
      {
        file: 'bjoern-seiler-iso-14001-environmental-management.jpg',
        title: 'ISO 14001 Environmental Management',
        context: 'ISO · environmental',
        caption: 'Environmental management systems.',
      },
      {
        file: 'bjoern-seiler-medical-device-quality-management.jpg',
        title: 'Medical Device Quality Management',
        context: 'ISO 13485 · medical devices',
        caption: 'Quality management in medical-device environments.',
      },
      {
        file: 'bjoern-seiler-quality-management-representative.jpg',
        title: 'Quality Management Representative (QMR)',
        context: 'DGQ · QMS',
        caption: 'Quality management representative qualification.',
      },
    ],
  },
  {
    id: 'regulatory-affairs',
    title: 'Regulatory Affairs',
    ariaLabel: 'Regulatory Affairs',
    certs: [
      {
        file: 'bjoern-seiler-vda-product-safety-psb.jpg',
        title: 'VDA Product Safety (PSB)',
        context: 'VDA · product safety',
        caption: 'Product safety representative foundation in the VDA context.',
      },
      {
        file: 'bjoern-seiler-eu-mdr-udi.jpg',
        title: 'EU-MDR UDI',
        context: 'EU-MDR · regulatory',
        caption: 'Unique Device Identification under EU-MDR.',
      },
      {
        file: 'bjoern-seiler-eu-mdr-technical-documentation.jpg',
        title: 'EU-MDR Technical Documentation',
        context: 'EU-MDR · regulatory',
        caption: 'Technical documentation requirements under EU-MDR.',
      },
      {
        file: 'bjoern-seiler-eu-mdr-prrc-article-15.jpg',
        title: 'EU-MDR PRRC (Article 15)',
        context: 'EU-MDR · regulatory',
        caption: 'Person responsible for regulatory compliance under Article 15.',
      },
      {
        file: 'bjoern-seiler-medical-device-risk-manager.jpg',
        title: 'Medical Device Risk Manager',
        context: 'EU-MDR · risk',
        caption: 'Risk management responsibility in regulated medical-device contexts.',
      },
      {
        file: 'bjoern-seiler-post-market-surveillance.jpg',
        title: 'Post-Market Surveillance',
        context: 'Medical devices · PMS',
        caption: 'Post-market surveillance for medical devices.',
      },
    ],
  },
  {
    id: 'ai-and-other',
    title: 'AI and other',
    ariaLabel: 'AI and other',
    certs: [
      {
        file: 'bjoern-seiler-lsi-chinese-level-1.jpg',
        title: 'LSI Chinese — Level 1',
        context: 'Language · Chinese',
        caption: 'Language qualification supporting supplier work in Chinese contexts.',
      },
      {
        file: 'bjoern-seiler-dgq-chatgpt-in-audits.jpg',
        title: 'DGQ — ChatGPT in Audits',
        context: 'DGQ · continuing education',
        caption: 'Applied use of AI tools in audit contexts.',
      },
      {
        file: 'bjoern-seiler-dgq-ai-tools-in-audits.jpg',
        title: 'DGQ — AI Tools in Audits',
        context: 'DGQ · continuing education',
        caption: 'Claude, Perplexity, Gemini and related tools in audit practice.',
      },
    ],
  },
];

export function certSrc(folder, file) {
  return `assets/images/certificates/${folder}/${file}`;
}

export function renderCertCard(folder, cert) {
  const src = certSrc(folder, cert.file);
  const alt = `Björn Seiler ${cert.title} certificate`;
  const label = `View ${cert.title} certificate`;
  return `      <figure class="cert-card">
        <button type="button" class="cert-card__trigger" data-cert-view data-cert-src="${src}" data-cert-title="${cert.title}" data-cert-alt="${alt}" aria-label="${label}">
          <span class="cert-card__media"><img src="${src}" alt="${alt}" width="400" height="300" loading="lazy"></span>
        </button>
        <figcaption>
          <strong>${cert.title}</strong>
          <span class="cert-context">${cert.context}</span>
          <p class="cert-caption">${cert.caption}</p>
          <button type="button" class="cert-view-btn" data-cert-view data-cert-src="${src}" data-cert-title="${cert.title}" data-cert-alt="${alt}">View certificate</button>
        </figcaption>
      </figure>`;
}

export function renderCertChapterNav() {
  return CERT_GROUPS.map(
    (g) =>
      `          <li><a href="#${CERT_CHAPTER_IDS[g.id]}" data-chapter-link>${g.title}</a></li>`,
  ).join('\n');
}

export function renderCertGroups() {
  return CERT_GROUPS.map((g) => {
    const lead = g.subtitle
      ? `\n      <p class="cert-group-lead">${g.subtitle}</p>`
      : '';
    const chapterId = CERT_CHAPTER_IDS[g.id];
    return `    <div class="cert-group" id="${g.id}">
      <h3 class="cert-group-title" id="${chapterId}">${g.title}</h3>${lead}
      <div class="cert-group-grid cert-group-grid--three" aria-label="${g.ariaLabel}">
${g.certs.map((c) => renderCertCard(g.id, c)).join('\n')}
      </div>
    </div>`;
  }).join('\n');
}

export const HAS_CREDENTIAL_JSON = [
  'VDA 6.3 Process Auditor',
  'EOQ Quality Auditor',
  'Post-Market Surveillance',
  'ISO 14001 Environmental Management',
];
