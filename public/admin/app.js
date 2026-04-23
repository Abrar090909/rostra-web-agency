/* =============================================
   ROSTRA CRM — Complete Application
   Light Premium SaaS Theme · Lucide Icons
   Router · Data Layer · All Pages · Charts
   ============================================= */

// ─── Utility Helpers ───
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const html = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (vals[i] ?? ''), '');
const formatCurrency = n => '₹' + Number(n||0).toLocaleString('en-IN');
const formatDate = d => { if(!d) return '—'; const dt=new Date(d); return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); };
const daysAgo = d => { if(!d) return ''; const diff=Math.floor((Date.now()-new Date(d).getTime())/(864e5)); return diff===0?'Today':diff===1?'1 day ago':`${diff} days ago`; };
const daysUntil = d => { if(!d) return 999; return Math.ceil((new Date(d).getTime()-Date.now())/(864e5)); };
const timeAgo = d => { if(!d) return ''; const ms=Date.now()-new Date(d).getTime(); const mins=Math.floor(ms/6e4); if(mins<60) return `${mins}m ago`; const hrs=Math.floor(mins/60); if(hrs<24) return `${hrs}h ago`; const days=Math.floor(hrs/24); return `${days}d ago`; };
const uid = () => Math.random().toString(36).substr(2,9);
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));

// Lucide icon helper
function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

// Color for avatars based on string
const avatarColors = ['#1C1917','#78716C','#16A34A','#D97706','#DC2626','#2563EB','#0891B2','#7C3AED','#BE185D','#EA580C'];
const getAvatarColor = str => avatarColors[str.split('').reduce((a,c)=>a+c.charCodeAt(0),0) % avatarColors.length];
const getInitials = name => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
const gradientFromId = id => {
  const tints = ['#fef2f2','#fffbeb','#f0fdf4','#eff6ff','#faf5ff','#fff1f2','#ecfdf5','#fefce8'];
  return tints[(id.charCodeAt(4)+id.charCodeAt(5)) % tints.length];
};

// ─── Data Layer (localStorage) ───
const STORAGE_KEY = 'rostra_crm_data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return null;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDB() {
  let data = loadData();
  if (!data) {
    data = createSeedData();
    saveData(data);
  }
  return data;
}

function updateDB(fn) {
  const data = getDB();
  fn(data);
  data.lastUpdated = new Date().toISOString();
  saveData(data);
  return data;
}

// ─── Seed Data ───
function createSeedData() {
  const now = new Date();
  const y = now.getFullYear();
  
  const clients = [
    { id:'RST-2026-001', name:'Rohan Mehta', businessName:'ACES Decor', email:'rohan@acesdecor.com', phone:'+91 98765 43210', whatsapp:'+91 98765 43210', city:'Mumbai', country:'India', source:'Instagram',
      project:{ name:'E-Commerce Website', type:'Shopify', description:'Complete Shopify store with custom theme, product catalog, payment gateway', startDate:'2026-01-15', deadline:'2026-03-15', priority:'High', status:'Completed', progress:100 },
      financials:{ totalValue:45000, paidAmount:45000, paymentMethod:'UPI', advanceDate:'2026-01-15', remainingDueDate:'2026-03-15' },
      notes:'Delivered on time. Very happy with the results. Might refer more clients.', createdAt:'2026-01-10T10:00:00Z', updatedAt:'2026-03-15T14:30:00Z' },

    { id:'RST-2026-002', name:'Priya Sharma', businessName:'BloomBox Studio', email:'priya@bloombox.in', phone:'+91 87654 32109', whatsapp:'+91 87654 32109', city:'Bengaluru', country:'India', source:'LinkedIn',
      project:{ name:'Brand Identity + Website', type:'Web Design', description:'Complete brand redesign including logo, color palette, and portfolio website', startDate:'2026-02-01', deadline:'2026-04-30', priority:'High', status:'In Progress', progress:65 },
      financials:{ totalValue:62000, paidAmount:31000, paymentMethod:'Bank Transfer', advanceDate:'2026-02-01', remainingDueDate:'2026-04-30' },
      notes:'Client prefers minimal aesthetic. Mood board approved.', createdAt:'2026-01-28T09:00:00Z', updatedAt:'2026-04-18T11:00:00Z' },

    { id:'RST-2026-003', name:'Arjun Kapoor', businessName:'TechNova Solutions', email:'arjun@technova.io', phone:'+91 76543 21098', whatsapp:'+91 76543 21098', city:'Delhi', country:'India', source:'Referral',
      project:{ name:'SaaS Dashboard', type:'Web Design', description:'Custom analytics dashboard with real-time data visualization and API integration', startDate:'2026-02-15', deadline:'2026-05-15', priority:'Urgent', status:'In Progress', progress:40 },
      financials:{ totalValue:120000, paidAmount:60000, paymentMethod:'Bank Transfer', advanceDate:'2026-02-15', remainingDueDate:'2026-05-15' },
      notes:'Complex project. Weekly sync calls scheduled.', createdAt:'2026-02-10T08:00:00Z', updatedAt:'2026-04-20T16:00:00Z' },

    { id:'RST-2026-004', name:'Sneha Patel', businessName:'WellNest Clinic', email:'sneha@wellnest.health', phone:'+91 65432 10987', whatsapp:'+91 65432 10987', city:'Ahmedabad', country:'India', source:'Cold Call',
      project:{ name:'Clinic Website + SEO', type:'WordPress', description:'Medical clinic website with appointment booking, doctor profiles, blog', startDate:'2026-03-01', deadline:'2026-05-01', priority:'Medium', status:'In Review', progress:85 },
      financials:{ totalValue:35000, paidAmount:17500, paymentMethod:'UPI', advanceDate:'2026-03-01', remainingDueDate:'2026-05-01' },
      notes:'Final review pending from client. SEO optimization in progress.', createdAt:'2026-02-25T11:00:00Z', updatedAt:'2026-04-19T09:00:00Z' },

    { id:'RST-2026-005', name:'Danish Khan', businessName:'FitForge', email:'danish@fitforge.co', phone:'+91 54321 09876', whatsapp:'+91 54321 09876', city:'Hyderabad', country:'India', source:'Instagram',
      project:{ name:'Fitness App Landing', type:'Web Design', description:'High-conversion landing page for fitness app with animated sections', startDate:'2026-03-10', deadline:'2026-04-25', priority:'High', status:'In Progress', progress:70 },
      financials:{ totalValue:28000, paidAmount:14000, paymentMethod:'Razorpay', advanceDate:'2026-03-10', remainingDueDate:'2026-04-25' },
      notes:'Client wants punchy, energetic design. Animations approved.', createdAt:'2026-03-05T10:00:00Z', updatedAt:'2026-04-20T15:00:00Z' },

    { id:'RST-2026-006', name:'Meera Iyer', businessName:'CraftBrew Co', email:'meera@craftbrew.in', phone:'+91 43210 98765', whatsapp:'+91 43210 98765', city:'Pune', country:'India', source:'Reddit',
      project:{ name:'Shopify Store', type:'Shopify', description:'Craft beer e-commerce with age verification, subscription model', startDate:'2026-03-20', deadline:'2026-05-20', priority:'Medium', status:'Not Started', progress:0 },
      financials:{ totalValue:38000, paidAmount:0, paymentMethod:'UPI', advanceDate:null, remainingDueDate:'2026-05-20' },
      notes:'Project kickoff delayed. Waiting for brand assets.', createdAt:'2026-03-15T14:00:00Z', updatedAt:'2026-03-15T14:00:00Z' },

    { id:'RST-2026-007', name:'Vikram Singh', businessName:'PropVista Realty', email:'vikram@propvista.com', phone:'+91 32109 87654', whatsapp:'+91 32109 87654', city:'Jaipur', country:'India', source:'LinkedIn',
      project:{ name:'Real Estate Platform', type:'Web Design', description:'Property listing platform with search filters, map integration, agent profiles', startDate:'2026-01-20', deadline:'2026-04-20', priority:'High', status:'On Hold', progress:55 },
      financials:{ totalValue:95000, paidAmount:47500, paymentMethod:'Bank Transfer', advanceDate:'2026-01-20', remainingDueDate:'2026-04-20' },
      notes:'Project paused due to client budget revision. Resuming next month.', createdAt:'2026-01-15T09:00:00Z', updatedAt:'2026-04-01T10:00:00Z' },

    { id:'RST-2026-008', name:'Aisha Rahman', businessName:'EduSpark Academy', email:'aisha@eduspark.in', phone:'+91 21098 76543', whatsapp:'+91 21098 76543', city:'Kolkata', country:'India', source:'Referral',
      project:{ name:'LMS Portal', type:'Web Design', description:'Learning management system with course modules, video hosting, quiz engine', startDate:'2026-04-01', deadline:'2026-07-01', priority:'Medium', status:'In Progress', progress:20 },
      financials:{ totalValue:150000, paidAmount:50000, paymentMethod:'Bank Transfer', advanceDate:'2026-04-01', remainingDueDate:'2026-07-01' },
      notes:'Early stage. Wireframes in progress. Tech stack finalized.', createdAt:'2026-03-25T12:00:00Z', updatedAt:'2026-04-20T13:00:00Z' },
  ];

  const expenses = [
    { id: uid(), category:'Hosting', description:'AWS Hosting — March', amount:5200, date:'2026-03-05', paymentMethod:'Bank Transfer' },
    { id: uid(), category:'Software', description:'Figma Team Plan', amount:4800, date:'2026-03-01', paymentMethod:'Razorpay' },
    { id: uid(), category:'Marketing', description:'LinkedIn Ads Campaign', amount:12000, date:'2026-03-10', paymentMethod:'UPI' },
    { id: uid(), category:'Hosting', description:'Vercel Pro Plan', amount:2800, date:'2026-03-15', paymentMethod:'Razorpay' },
    { id: uid(), category:'Software', description:'Notion Team', amount:1500, date:'2026-04-01', paymentMethod:'UPI' },
    { id: uid(), category:'Freelancer', description:'Contract Developer — React', amount:25000, date:'2026-03-20', paymentMethod:'Bank Transfer' },
    { id: uid(), category:'Marketing', description:'Instagram Ads — April', amount:8000, date:'2026-04-05', paymentMethod:'UPI' },
    { id: uid(), category:'Office', description:'Co-working Space — April', amount:6000, date:'2026-04-01', paymentMethod:'UPI' },
    { id: uid(), category:'Hosting', description:'AWS Hosting — April', amount:5500, date:'2026-04-05', paymentMethod:'Bank Transfer' },
    { id: uid(), category:'Software', description:'GitHub Team', amount:2200, date:'2026-04-01', paymentMethod:'Razorpay' },
  ];

  const invoices = [
    { id:'INV-001', clientId:'RST-2026-001', amount:45000, status:'Paid', issuedDate:'2026-01-15', dueDate:'2026-02-15', paidDate:'2026-02-10' },
    { id:'INV-002', clientId:'RST-2026-002', amount:31000, status:'Paid', issuedDate:'2026-02-01', dueDate:'2026-03-01', paidDate:'2026-02-28' },
    { id:'INV-003', clientId:'RST-2026-002', amount:31000, status:'Sent', issuedDate:'2026-04-01', dueDate:'2026-04-30', paidDate:null },
    { id:'INV-004', clientId:'RST-2026-003', amount:60000, status:'Paid', issuedDate:'2026-02-15', dueDate:'2026-03-15', paidDate:'2026-03-12' },
    { id:'INV-005', clientId:'RST-2026-003', amount:60000, status:'Overdue', issuedDate:'2026-03-15', dueDate:'2026-04-15', paidDate:null },
    { id:'INV-006', clientId:'RST-2026-004', amount:17500, status:'Paid', issuedDate:'2026-03-01', dueDate:'2026-03-31', paidDate:'2026-03-25' },
    { id:'INV-007', clientId:'RST-2026-004', amount:17500, status:'Pending', issuedDate:'2026-04-10', dueDate:'2026-05-01', paidDate:null },
    { id:'INV-008', clientId:'RST-2026-005', amount:14000, status:'Paid', issuedDate:'2026-03-10', dueDate:'2026-04-10', paidDate:'2026-04-08' },
    { id:'INV-009', clientId:'RST-2026-005', amount:14000, status:'Pending', issuedDate:'2026-04-15', dueDate:'2026-04-25', paidDate:null },
    { id:'INV-010', clientId:'RST-2026-007', amount:47500, status:'Paid', issuedDate:'2026-01-20', dueDate:'2026-02-20', paidDate:'2026-02-15' },
    { id:'INV-011', clientId:'RST-2026-007', amount:47500, status:'Overdue', issuedDate:'2026-03-20', dueDate:'2026-04-20', paidDate:null },
    { id:'INV-012', clientId:'RST-2026-008', amount:50000, status:'Paid', issuedDate:'2026-04-01', dueDate:'2026-04-30', paidDate:'2026-04-05' },
  ];

  const employees = [
    { id: uid(), name:'Abrar Ahmed', role:'Founder & Lead Developer', email:'abrar@rostra.in', phone:'+91 86030 38778', salary:0, joinDate:'2025-01-01', status:'Active' },
    { id: uid(), name:'Neha Verma', role:'UI/UX Designer', email:'neha@rostra.in', phone:'+91 99887 66554', salary:35000, joinDate:'2025-06-15', status:'Active' },
    { id: uid(), name:'Rahul Gupta', role:'Full Stack Developer', email:'rahul@rostra.in', phone:'+91 88776 55443', salary:40000, joinDate:'2025-09-01', status:'Active' },
    { id: uid(), name:'Sara Khan', role:'Digital Marketing', email:'sara@rostra.in', phone:'+91 77665 44332', salary:28000, joinDate:'2026-01-10', status:'Active' },
    { id: uid(), name:'Karan Joshi', role:'Content Writer', email:'karan@rostra.in', phone:'+91 66554 33221', salary:18000, joinDate:'2026-02-01', status:'Active' },
  ];

  const salaries = [];
  employees.filter(e=>e.salary>0).forEach(emp => {
    for(let m=1; m<=3; m++) {
      const month = now.getMonth() - m;
      const yr = month < 0 ? y-1 : y;
      const mn = ((month % 12) + 12) % 12;
      salaries.push({ id: uid(), employeeId: emp.id, month: mn, year: yr, amount: emp.salary, status:'Paid', paidDate: `${yr}-${String(mn+1).padStart(2,'0')}-28` });
    }
  });

  const activities = [
    { id: uid(), type:'payment', description:'Payment received ₹22,500 from', clientName:'BloomBox Studio', clientId:'RST-2026-002', amount:22500, timestamp: new Date(Date.now()-2*36e5).toISOString() },
    { id: uid(), type:'project', description:'Project "SaaS Dashboard" moved to', clientName:'TechNova Solutions', clientId:'RST-2026-003', detail:'In Progress', timestamp: new Date(Date.now()-5*36e5).toISOString() },
    { id: uid(), type:'invoice', description:'Invoice #INV-009 sent to', clientName:'FitForge', clientId:'RST-2026-005', timestamp: new Date(Date.now()-864e5).toISOString() },
    { id: uid(), type:'expense', description:'Expense ₹5,500 added — AWS Hosting', amount:5500, timestamp: new Date(Date.now()-2*864e5).toISOString() },
    { id: uid(), type:'payment', description:'Payment received ₹50,000 from', clientName:'EduSpark Academy', clientId:'RST-2026-008', amount:50000, timestamp: new Date(Date.now()-3*864e5).toISOString() },
    { id: uid(), type:'project', description:'Project "Clinic Website + SEO" moved to', clientName:'WellNest Clinic', clientId:'RST-2026-004', detail:'In Review', timestamp: new Date(Date.now()-4*864e5).toISOString() },
    { id: uid(), type:'client', description:'New client onboarded:', clientName:'EduSpark Academy', clientId:'RST-2026-008', timestamp: new Date(Date.now()-5*864e5).toISOString() },
    { id: uid(), type:'invoice', description:'Invoice #INV-005 overdue from', clientName:'TechNova Solutions', clientId:'RST-2026-003', timestamp: new Date(Date.now()-6*864e5).toISOString() },
    { id: uid(), type:'project', description:'Project "Real Estate Platform" set to', clientName:'PropVista Realty', clientId:'RST-2026-007', detail:'On Hold', timestamp: new Date(Date.now()-7*864e5).toISOString() },
    { id: uid(), type:'payment', description:'Payment received ₹14,000 from', clientName:'FitForge', clientId:'RST-2026-005', amount:14000, timestamp: new Date(Date.now()-8*864e5).toISOString() },
  ];

  return { clients, expenses, invoices, employees, salaries, activities, lastUpdated: new Date().toISOString(), settings:{ companyName:'Rostra Agency', currency:'₹', currencyCode:'INR' } };
}

// ─── Chart Helpers ───
function drawSparkline(canvas, data, color='#16A34A') {
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth * 2;
  const h = canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2,2);
  const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v,i) => ({ x: (i/(data.length-1))*cw, y: ch - ((v-min)/range)*(ch-4) - 2 }));
  
  ctx.beginPath();
  ctx.moveTo(pts[0].x, ch);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, ch);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0,0,0,ch);
  grad.addColorStop(0, color+'25');
  grad.addColorStop(1, color+'05');
  ctx.fillStyle = grad;
  ctx.fill();
  
  ctx.beginPath();
  pts.forEach((p,i) => i===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function drawLineChart(canvas, datasets, labels, opts={}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const pad = { top:20, right:20, bottom:36, left:60 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  let allVals = datasets.flatMap(d=>d.data);
  let maxVal = Math.max(...allVals);
  let minVal = 0;
  const steps = 5;
  const stepVal = Math.ceil(maxVal / steps / 1000) * 1000;
  maxVal = stepVal * steps;

  ctx.strokeStyle = '#F0EDE8';
  ctx.lineWidth = 0.5;
  for(let i=0; i<=steps; i++) {
    const y = pad.top + ch - (i/steps)*ch;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w-pad.right, y); ctx.stroke();
    ctx.fillStyle = '#A8A29E';
    ctx.font = '11px "Geist", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(stepVal*i).replace('₹',''), pad.left-8, y+4);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#A8A29E';
  labels.forEach((l,i) => {
    const x = pad.left + (i/(labels.length-1))*cw;
    ctx.fillText(l, x, h-pad.bottom+18);
  });

  datasets.forEach(ds => {
    const pts = ds.data.map((v,i) => ({
      x: pad.left + (i/(ds.data.length-1))*cw,
      y: pad.top + ch - ((v-minVal)/(maxVal-minVal||1))*ch
    }));

    if(ds.fill) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pad.top+ch);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length-1].x, pad.top+ch);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top+ch);
      grad.addColorStop(0, ds.color+'20');
      grad.addColorStop(1, ds.color+'03');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    ctx.beginPath();
    pts.forEach((p,i) => i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.strokeStyle = ds.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI*2);
      ctx.fillStyle = ds.color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });
  });

  const legendY = h - 8;
  let lx = pad.left;
  datasets.forEach(ds => {
    ctx.fillStyle = ds.color;
    ctx.fillRect(lx, legendY-5, 10, 3);
    ctx.fillStyle = '#78716C';
    ctx.font = '11px "Geist", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ds.label, lx+14, legendY);
    lx += ctx.measureText(ds.label).width + 30;
  });
}

function drawDonutChart(canvas, segments, opts={}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);
  
  const cx = size/2, cy = size/2;
  const outerR = size/2 - 8;
  const innerR = outerR * 0.62;
  const total = segments.reduce((a,s) => a+s.value, 0);
  let startAngle = -Math.PI/2;

  segments.forEach(seg => {
    const sweep = (seg.value/total) * Math.PI*2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle+sweep);
    ctx.arc(cx, cy, innerR, startAngle+sweep, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    startAngle += sweep;
  });

  ctx.fillStyle = '#1C1917';
  ctx.font = '28px "Instrument Serif", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy-6);
  ctx.fillStyle = '#78716C';
  ctx.font = '12px "Geist", sans-serif';
  ctx.fillText('Projects', cx, cy+14);
}

function drawBarChart(canvas, groups, labels, colors, groupLabels) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const pad = { top:20, right:20, bottom:48, left:60 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  const allVals = groups.flat();
  const maxVal = Math.max(...allVals);
  const steps = 5;
  const stepVal = Math.ceil(maxVal / steps / 1000) * 1000 || 1;
  const adjMax = stepVal * steps;

  ctx.strokeStyle = '#F0EDE8';
  ctx.lineWidth = 0.5;
  for(let i=0;i<=steps;i++) {
    const y = pad.top + ch - (i/steps)*ch;
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(w-pad.right,y); ctx.stroke();
    ctx.fillStyle = '#A8A29E';
    ctx.font = '11px "Geist", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(stepVal*i).replace('₹',''), pad.left-8, y+4);
  }

  const groupCount = groups.length;
  const barCount = groups[0].length;
  const groupWidth = cw / barCount;
  const barWidth = Math.min(groupWidth / (groupCount+1), 24);
  const gap = barWidth * 0.3;

  for(let b=0; b<barCount; b++) {
    const gx = pad.left + b*groupWidth + groupWidth/2;
    for(let g=0; g<groupCount; g++) {
      const bx = gx + (g - groupCount/2)*(barWidth+gap);
      const val = groups[g][b];
      const bh = (val/adjMax)*ch;
      ctx.fillStyle = colors[g];
      ctx.beginPath();
      const rx = 3;
      const by = pad.top+ch-bh;
      ctx.moveTo(bx-barWidth/2+rx, by);
      ctx.lineTo(bx+barWidth/2-rx, by);
      ctx.quadraticCurveTo(bx+barWidth/2, by, bx+barWidth/2, by+rx);
      ctx.lineTo(bx+barWidth/2, pad.top+ch);
      ctx.lineTo(bx-barWidth/2, pad.top+ch);
      ctx.lineTo(bx-barWidth/2, by+rx);
      ctx.quadraticCurveTo(bx-barWidth/2, by, bx-barWidth/2+rx, by);
      ctx.fill();
    }
    ctx.fillStyle = '#A8A29E';
    ctx.font = '11px "Geist", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[b], gx, h-pad.bottom+16);
  }

  let lx = pad.left;
  const ly = h - 8;
  groupLabels.forEach((gl,i) => {
    ctx.fillStyle = colors[i];
    ctx.fillRect(lx, ly-5, 10, 3);
    ctx.fillStyle = '#78716C';
    ctx.font = '11px "Geist", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(gl, lx+14, ly);
    lx += ctx.measureText(gl).width + 24;
  });
}

function drawGauge(canvas, pct) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 140;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size+'px';
  canvas.style.height = size+'px';
  ctx.scale(dpr,dpr);
  const cx=size/2, cy=size/2;
  const r = size/2-10;
  const startAngle = 0.75*Math.PI;
  const endAngle = 2.25*Math.PI;
  const sweep = endAngle - startAngle;

  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = '#E8E5E0';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, startAngle + sweep*(pct/100));
  const color = pct >= 75 ? '#16A34A' : pct >= 40 ? '#D97706' : '#DC2626';
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.fillStyle = '#1C1917';
  ctx.font = '26px "Instrument Serif", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(Math.round(pct)+'%', cx, cy-2);
  ctx.fillStyle = '#78716C';
  ctx.font = '11px "Geist", sans-serif';
  ctx.fillText('Paid', cx, cy+16);
}

function animateValue(el, start, end, duration=1200) {
  const s = performance.now();
  const isFormatted = el.dataset.formatCurrency === 'true';
  const step = (ts) => {
    const progress = Math.min((ts-s)/duration, 1);
    const eased = 1 - Math.pow(1-progress, 3);
    const val = Math.round(start + (end-start)*eased);
    el.textContent = isFormatted ? formatCurrency(val) : val.toLocaleString('en-IN');
    if(progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


// ─── Router ───
const ROUTES = {
  'dashboard': { title: 'Dashboard', icon: 'layout-dashboard', render: renderDashboard },
  'analytics': { title: 'Analytics', icon: 'bar-chart-3', render: renderAnalytics },
  'clients': { title: 'All Clients', icon: 'users', render: renderClients },
  'add-client': { title: 'Add Client', icon: 'user-plus', render: () => openDrawer() },
  'projects': { title: 'Projects', icon: 'folder-kanban', render: renderProjects },
  'revenue': { title: 'Revenue', icon: 'indian-rupee', render: renderRevenue },
  'expenses': { title: 'Expenses', icon: 'receipt', render: renderExpenses },
  'invoices': { title: 'Invoices', icon: 'file-text', render: renderInvoices },
  'pending-bills': { title: 'Pending Bills', icon: 'clock', render: renderPendingBills },
  'employees': { title: 'Employees', icon: 'user', render: renderEmployees },
  'salaries': { title: 'Salaries', icon: 'wallet', render: renderSalaries },
  'settings': { title: 'Settings', icon: 'settings', render: renderSettings },
};

const NAV_SECTIONS = [
  { label:'OVERVIEW', items:['dashboard','analytics'] },
  { label:'CLIENTS', items:['clients','add-client','projects'] },
  { label:'FINANCE', items:['revenue','expenses','invoices','pending-bills'] },
  { label:'TEAM', items:['employees','salaries'] },
  { label:'', items:['settings'] },
];

let currentRoute = 'dashboard';
let currentClientId = null;

function navigate(route) {
  if(route === 'add-client') { openDrawer(); return; }
  if(route.startsWith('client/')) {
    currentClientId = route.split('/')[1];
    currentRoute = 'client-detail';
    renderPage();
    return;
  }
  currentRoute = route;
  currentClientId = null;
  window.location.hash = route;
  renderPage();
}

function renderPage() {
  const main = $('#main-content');
  if(currentRoute === 'client-detail') {
    $('#topbar-title').textContent = 'Client Detail';
    renderClientDetail(main);
  } else {
    const routeObj = ROUTES[currentRoute];
    if(routeObj) {
      $('#topbar-title').textContent = routeObj.title;
      routeObj.render(main);
    }
  }
  updateActiveNav();
  $('#sidebar').classList.remove('mobile-open');
  $('#mobile-overlay').classList.remove('open');
  requestAnimationFrame(refreshIcons);
}

function updateActiveNav() {
  $$('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.route === currentRoute);
  });
}

function buildSidebar() {
  const nav = $('#sidebar-nav');
  const db = getDB();
  const overdueCount = db.invoices.filter(i=>i.status==='Overdue').length;
  const totalClients = db.clients.length;

  let h = '';
  NAV_SECTIONS.forEach(section => {
    h += `<div class="nav-group">`;
    if(section.label) h += `<div class="nav-group-label">${section.label}</div>`;
    section.items.forEach(key => {
      const r = ROUTES[key];
      let badge = '';
      if(key === 'pending-bills' && overdueCount > 0) badge = `<span class="nav-badge danger">${overdueCount}</span>`;
      if(key === 'clients') badge = `<span class="nav-badge">${totalClients}</span>`;
      h += `<div class="nav-item${currentRoute===key?' active':''}" data-route="${key}">
        <span class="nav-icon"><i data-lucide="${r.icon}"></i></span>
        <span>${r.title}</span>
        ${badge}
      </div>`;
    });
    h += `</div>`;
  });
  nav.innerHTML = h;

  $$('.nav-item', nav).forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });

  refreshIcons();
}

function init() {
  buildSidebar();
  refreshIcons();

  const hash = window.location.hash.slice(1);
  if(hash && ROUTES[hash]) currentRoute = hash;
  else if(hash.startsWith('client/')) {
    currentClientId = hash.split('/')[1];
    currentRoute = 'client-detail';
  }
  renderPage();

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.slice(1);
    if(h.startsWith('client/')) {
      currentClientId = h.split('/')[1];
      currentRoute = 'client-detail';
      renderPage();
    } else if(ROUTES[h]) { currentRoute = h; renderPage(); }
  });

  $('#mobile-menu-btn').addEventListener('click', () => {
    $('#sidebar').classList.toggle('mobile-open');
    $('#mobile-overlay').classList.toggle('open');
  });
  $('#mobile-overlay').addEventListener('click', () => {
    $('#sidebar').classList.remove('mobile-open');
    $('#mobile-overlay').classList.remove('open');
  });

  $('#drawer-close').addEventListener('click', closeDrawer);
  $('#drawer-cancel').addEventListener('click', closeDrawer);
  $('#drawer-overlay').addEventListener('click', closeDrawer);

  $('#confirm-cancel').addEventListener('click', closeConfirm);
  $('#confirm-dialog .confirm-overlay').addEventListener('click', closeConfirm);

  $('#notif-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = $('#notif-dropdown');
    dd.classList.toggle('open');
    if(dd.classList.contains('open')) buildNotifications();
  });
  document.addEventListener('click', () => {
    $('#notif-dropdown').classList.remove('open');
  });

  $('#global-search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if(q.length >= 2 && currentRoute !== 'clients') {
      navigate('clients');
      setTimeout(() => {
        const si = $('#client-search');
        if(si) { si.value = q; si.dispatchEvent(new Event('input')); }
      }, 100);
    }
  });
}

function buildNotifications() {
  const db = getDB();
  const list = $('#notif-list');
  const notifs = db.activities.slice(0, 5);
  list.innerHTML = notifs.map(a => `
    <div class="notif-item">
      <div class="notif-text">${a.description} ${a.clientName||''} ${a.detail||''}</div>
      <div class="notif-time">${timeAgo(a.timestamp)}</div>
    </div>
  `).join('');
}


// ═══════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════
function renderDashboard(container) {
  const db = getDB();
  const clients = db.clients;
  const expenses = db.expenses;
  const invoices = db.invoices;

  const totalRevenue = clients.reduce((a,c) => a + c.financials.paidAmount, 0);
  const totalValue = clients.reduce((a,c) => a + c.financials.totalValue, 0);
  const outstanding = totalValue - totalRevenue;
  const activeProjects = clients.filter(c => ['In Progress','In Review'].includes(c.project.status)).length;
  const completedProjects = clients.filter(c => c.project.status === 'Completed').length;
  const overdueInvoices = invoices.filter(i => i.status === 'Overdue').length;
  const totalExpenses = expenses.reduce((a,e) => a + e.amount, 0);

  const now = new Date();
  const greetHour = now.getHours();
  const greetText = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left">
        <h1>${greetText}, Abrar</h1>
        <div class="subtitle">${dateStr}</div>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openDrawer()"><i data-lucide="plus"></i> Add Client</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card animate-fadeInUp stagger-1">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Total Revenue</span>
          <div class="kpi-card-icon green"><i data-lucide="indian-rupee"></i></div>
        </div>
        <div class="kpi-card-value" id="kpi-revenue" data-format-currency="true">₹0</div>
        <div class="kpi-card-sub"><span class="change-pill green">↑ 18%</span> from last month</div>
        <div class="kpi-sparkline"><canvas id="spark-revenue" style="width:100%;height:32px"></canvas></div>
      </div>

      <div class="kpi-card animate-fadeInUp stagger-2">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Active Projects</span>
          <div class="kpi-card-icon blue"><i data-lucide="folder-open"></i></div>
        </div>
        <div class="kpi-card-value" id="kpi-projects">0</div>
        <div class="kpi-card-sub"><span class="change-pill green">↑ ${completedProjects}</span> completed this quarter</div>
        <div class="kpi-sparkline"><canvas id="spark-projects" style="width:100%;height:32px"></canvas></div>
      </div>

      <div class="kpi-card animate-fadeInUp stagger-3">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Outstanding</span>
          <div class="kpi-card-icon amber"><i data-lucide="clock"></i></div>
        </div>
        <div class="kpi-card-value" id="kpi-outstanding" data-format-currency="true">₹0</div>
        <div class="kpi-card-sub">${overdueInvoices > 0 ? `<span class="change-pill red">${overdueInvoices} overdue</span>` : '<span class="change-pill green">All on track</span>'}</div>
        <div class="kpi-sparkline"><canvas id="spark-outstanding" style="width:100%;height:32px"></canvas></div>
      </div>

      <div class="kpi-card animate-fadeInUp stagger-4">
        <div class="kpi-card-header">
          <span class="kpi-card-label">Monthly Growth</span>
          <div class="kpi-card-icon green"><i data-lucide="trending-up"></i></div>
        </div>
        <div class="kpi-card-value" id="kpi-growth">+24%</div>
        <div class="kpi-card-sub"><span class="change-pill green">↑</span> vs last month</div>
        <div class="kpi-sparkline"><canvas id="spark-growth" style="width:100%;height:32px"></canvas></div>
      </div>
    </div>

    <div class="charts-row">
      <div class="card animate-fadeInUp stagger-3">
        <div class="card-header">
          <span class="card-title">Revenue Overview</span>
          <div class="toggle-group">
            <button class="toggle-btn active" data-period="6m">6M</button>
            <button class="toggle-btn" data-period="1y">1Y</button>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-container"><canvas id="chart-revenue" style="width:100%;height:280px"></canvas></div>
        </div>
      </div>

      <div class="card animate-fadeInUp stagger-4">
        <div class="card-header">
          <span class="card-title">Project Status</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;align-items:center">
          <canvas id="chart-donut" style="width:200px;height:200px"></canvas>
          <div class="donut-legend" id="donut-legend"></div>
        </div>
      </div>
    </div>

    <div class="widgets-row">
      <div class="card animate-fadeInUp stagger-4">
        <div class="card-header">
          <span class="card-title">Recent Activity</span>
          <button class="btn btn-ghost btn-sm" onclick="navigate('analytics')">View All →</button>
        </div>
        <div class="card-body">
          <div class="activity-list" id="activity-list"></div>
        </div>
      </div>

      <div class="card animate-fadeInUp stagger-5">
        <div class="card-header">
          <span class="card-title">Upcoming Deadlines</span>
        </div>
        <div class="card-body">
          <div id="deadlines-list"></div>
        </div>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-5">
      <div class="card-header">
        <span class="card-title">Monthly Performance</span>
      </div>
      <div class="card-body">
        <div class="chart-container"><canvas id="chart-performance" style="width:100%;height:240px"></canvas></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const revEl = $('#kpi-revenue'); revEl.dataset.formatCurrency = 'true';
    animateValue(revEl, 0, totalRevenue);
    animateValue($('#kpi-projects'), 0, activeProjects);
    const outEl = $('#kpi-outstanding'); outEl.dataset.formatCurrency = 'true';
    animateValue(outEl, 0, outstanding);

    drawSparkline($('#spark-revenue'), [12000,18000,22000,28000,35000,42000,totalRevenue], '#16A34A');
    drawSparkline($('#spark-projects'), [1,2,2,3,3,4,activeProjects], '#2563EB');
    drawSparkline($('#spark-outstanding'), [80000,70000,65000,55000,50000,48000,outstanding], '#D97706');
    drawSparkline($('#spark-growth'), [5,8,12,15,18,22,24], '#16A34A');

    const months = ['Nov','Dec','Jan','Feb','Mar','Apr'];
    const revData = [8000,12000,45000,73000,52000,totalRevenue];
    const expData = [4000,6000,8000,15000,25000,totalExpenses];
    drawLineChart($('#chart-revenue'), [
      { label:'Revenue', data:revData, color:'#1C1917', fill:true },
      { label:'Expenses', data:expData, color:'#DC2626', fill:false },
    ], months);

    const statusCounts = {
      'Completed': { count: clients.filter(c=>c.project.status==='Completed').length, color:'#16A34A' },
      'In Progress': { count: clients.filter(c=>c.project.status==='In Progress').length, color:'#2563EB' },
      'In Review': { count: clients.filter(c=>c.project.status==='In Review').length, color:'#D97706' },
      'On Hold': { count: clients.filter(c=>c.project.status==='On Hold').length, color:'#DC2626' },
      'Not Started': { count: clients.filter(c=>c.project.status==='Not Started').length, color:'#A8A29E' },
    };
    const donutSegs = Object.entries(statusCounts).filter(([,v])=>v.count>0).map(([k,v])=>({label:k, value:v.count, color:v.color}));
    drawDonutChart($('#chart-donut'), donutSegs);

    $('#donut-legend').innerHTML = donutSegs.map(s => `
      <div class="donut-legend-item">
        <div class="donut-legend-dot" style="background:${s.color}"></div>
        ${s.label} (${s.value})
      </div>
    `).join('');

    const actList = $('#activity-list');
    const actColors = { payment:'green', project:'blue', invoice:'amber', expense:'red', client:'blue' };
    actList.innerHTML = db.activities.slice(0,8).map((a, i) => `
      <div class="activity-item">
        <div class="activity-dot-col">
          <div class="activity-dot ${actColors[a.type]||'blue'}"></div>
          ${i < 7 ? '<div class="activity-line"></div>' : ''}
        </div>
        <div class="activity-content">
          <div class="activity-text">${a.description} ${a.clientName?`<span class="highlight" onclick="navigate('client/${a.clientId}')">${a.clientName}</span>`:''} ${a.detail||''}</div>
          <div class="activity-time">${timeAgo(a.timestamp)}</div>
        </div>
      </div>
    `).join('');

    const deadlineClients = clients
      .filter(c => c.project.deadline && daysUntil(c.project.deadline) <= 14 && c.project.status !== 'Completed')
      .sort((a,b) => daysUntil(a.project.deadline) - daysUntil(b.project.deadline));

    const dlList = $('#deadlines-list');
    if(deadlineClients.length === 0) {
      dlList.innerHTML = '<div class="empty-state"><div class="empty-icon"><i data-lucide="circle-check"></i></div><h3>No upcoming deadlines</h3><p>All projects are on schedule</p></div>';
    } else {
      dlList.innerHTML = deadlineClients.map(c => {
        const days = daysUntil(c.project.deadline);
        const urgency = days <= 2 ? 'urgent' : days <= 5 ? 'warning' : 'safe';
        return `
          <div class="deadline-item">
            <div class="deadline-days ${urgency}">
              ${days < 0 ? Math.abs(days) : days}
              <span>${days < 0 ? 'overdue' : 'days'}</span>
            </div>
            <div class="deadline-info">
              <div class="deadline-client">${c.name}</div>
              <div class="deadline-project">${c.project.name}</div>
            </div>
            <div class="progress-wrap" style="width:100px">
              <div class="progress-bar"><div class="progress-bar-fill ${urgency==='urgent'?'red':urgency==='warning'?'amber':'green'}" style="width:${c.project.progress}%"></div></div>
              <span class="progress-pct">${c.project.progress}%</span>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('client/${c.id}')">View</button>
          </div>
        `;
      }).join('');
    }

    drawBarChart($('#chart-performance'),
      [[42000, 25000, 3, 1], [35000, 20000, 2, 0], [28000, 15000, 1, 0]],
      ['Revenue','Expenses','New Clients','Completed'],
      ['#1C1917','#78716C','#D4D0CB'],
      ['This Month','Last Month','2 Months Ago']
    );

    refreshIcons();
  });
}


// ═══════════════════════════════════════════
// PAGE: ALL CLIENTS
// ═══════════════════════════════════════════
let clientView = 'table';
let clientSearch = '';
let clientFilter = 'all';
let clientSort = 'name';

function renderClients(container) {
  const db = getDB();
  let clients = [...db.clients];

  if(clientSearch) {
    const q = clientSearch.toLowerCase();
    clients = clients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.businessName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.project.name.toLowerCase().includes(q)
    );
  }
  if(clientFilter !== 'all') {
    clients = clients.filter(c => c.project.status === clientFilter);
  }

  switch(clientSort) {
    case 'name': clients.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case 'date': clients.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); break;
    case 'amount': clients.sort((a,b)=>b.financials.totalValue-a.financials.totalValue); break;
    case 'status': clients.sort((a,b)=>a.project.status.localeCompare(b.project.status)); break;
  }

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left">
        <h1>All Clients <span class="count-badge">${db.clients.length}</span></h1>
        <div class="subtitle">Manage your client portfolio</div>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openDrawer()"><i data-lucide="plus"></i> Add Client</button>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-1">
      <div class="card-header">
        <div class="filter-bar">
          <div class="search-input">
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search clients..." id="client-search" value="${clientSearch}">
          </div>
          <select class="filter-select" id="client-filter">
            <option value="all"${clientFilter==='all'?' selected':''}>All Status</option>
            <option value="In Progress"${clientFilter==='In Progress'?' selected':''}>In Progress</option>
            <option value="In Review"${clientFilter==='In Review'?' selected':''}>In Review</option>
            <option value="Completed"${clientFilter==='Completed'?' selected':''}>Completed</option>
            <option value="On Hold"${clientFilter==='On Hold'?' selected':''}>On Hold</option>
            <option value="Not Started"${clientFilter==='Not Started'?' selected':''}>Not Started</option>
          </select>
          <select class="filter-select" id="client-sort">
            <option value="name"${clientSort==='name'?' selected':''}>Sort: Name</option>
            <option value="date"${clientSort==='date'?' selected':''}>Sort: Date</option>
            <option value="amount"${clientSort==='amount'?' selected':''}>Sort: Amount</option>
            <option value="status"${clientSort==='status'?' selected':''}>Sort: Status</option>
          </select>
          <div class="view-toggle">
            <button class="view-toggle-btn${clientView==='table'?' active':''}" data-view="table" title="Table View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
            <button class="view-toggle-btn${clientView==='card'?' active':''}" data-view="card" title="Card View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body no-pad" id="clients-content">
        ${clientView === 'table' ? renderClientTable(clients) : renderClientCards(clients)}
      </div>
    </div>
  `;

  $('#client-search').addEventListener('input', e => { clientSearch = e.target.value; renderClients(container); });
  $('#client-filter').addEventListener('change', e => { clientFilter = e.target.value; renderClients(container); });
  $('#client-sort').addEventListener('change', e => { clientSort = e.target.value; renderClients(container); });
  $$('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => { clientView = btn.dataset.view; renderClients(container); });
  });
  refreshIcons();
}

function renderClientTable(clients) {
  if(clients.length === 0) return '<div class="empty-state"><div class="empty-icon"><i data-lucide="users"></i></div><h3>No clients found</h3><p>Adjust your search or filters</p></div>';

  return `<div class="table-wrapper"><table class="data-table">
    <thead><tr>
      <th style="width:40px"></th>
      <th>Client ID</th>
      <th>Client</th>
      <th>Project</th>
      <th>Amount</th>
      <th>Paid</th>
      <th>Remaining</th>
      <th>Status</th>
      <th>Progress</th>
      <th>Onboarded</th>
      <th>Actions</th>
    </tr></thead>
    <tbody>
      ${clients.map(c => {
        const remaining = c.financials.totalValue - c.financials.paidAmount;
        const statusClass = c.project.status.toLowerCase().replace(/\s+/g,'-');
        const amountColor = remaining === 0 ? 'money-green' : remaining > 0 && c.financials.paidAmount > 0 ? 'money-amber' : 'money-red';
        const progressColor = c.project.progress >= 75 ? 'green' : c.project.progress >= 40 ? 'blue' : c.project.progress > 0 ? 'amber' : 'red';
        return `<tr>
          <td><div class="checkbox" onclick="this.classList.toggle('checked')"></div></td>
          <td><span style="font-family:var(--font-mono);color:var(--text-muted);font-size:12px">${c.id}</span></td>
          <td><div class="client-cell">
            <div class="avatar" style="background:${getAvatarColor(c.name)}">${getInitials(c.name)}</div>
            <div><div class="client-name">${c.name}</div><div class="client-email">${c.email}</div></div>
          </div></td>
          <td><div>${c.project.name}</div><span class="type-badge">${c.project.type}</span></td>
          <td><span class="money ${amountColor}">${formatCurrency(c.financials.totalValue)}</span></td>
          <td><span class="money money-green">${formatCurrency(c.financials.paidAmount)}</span></td>
          <td><span class="money ${remaining>0?'money-red':'money-green'}">${formatCurrency(remaining)}</span></td>
          <td><span class="badge badge-${statusClass}"><span class="badge-dot"></span>${c.project.status}</span></td>
          <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-bar-fill ${progressColor}" style="width:${c.project.progress}%"></div></div><span class="progress-pct">${c.project.progress}%</span></div></td>
          <td><div>${formatDate(c.createdAt)}</div><div style="font-size:11px;color:var(--text-muted)">${daysAgo(c.createdAt)}</div></td>
          <td><div class="action-btns">
            <button class="action-btn" title="View" onclick="navigate('client/${c.id}')"><i data-lucide="eye"></i></button>
            <button class="action-btn" title="Edit" onclick="openDrawer('${c.id}')"><i data-lucide="pencil"></i></button>
            <button class="action-btn danger" title="Delete" onclick="confirmDeleteClient('${c.id}')"><i data-lucide="trash-2"></i></button>
          </div></td>
        </tr>`;
      }).join('')}
    </tbody>
  </table></div>`;
}

function renderClientCards(clients) {
  if(clients.length === 0) return '<div class="empty-state"><div class="empty-icon"><i data-lucide="users"></i></div><h3>No clients found</h3><p>Adjust your search or filters</p></div>';

  return `<div class="client-cards-grid" style="padding:20px">
    ${clients.map(c => {
      const remaining = c.financials.totalValue - c.financials.paidAmount;
      const statusClass = c.project.status.toLowerCase().replace(/\s+/g,'-');
      const progressColor = c.project.progress >= 75 ? 'green' : c.project.progress >= 40 ? 'blue' : c.project.progress > 0 ? 'amber' : 'red';
      return `<div class="client-card" onclick="navigate('client/${c.id}')">
        <div class="client-card-strip" style="background:${gradientFromId(c.id)}"></div>
        <div class="client-card-body">
          <div class="client-card-top">
            <div class="avatar" style="background:${getAvatarColor(c.name)}">${getInitials(c.name)}</div>
            <div>
              <div class="client-card-name">${c.name}</div>
              <div class="client-card-id">${c.id}</div>
            </div>
            <span class="badge badge-${statusClass}" style="margin-left:auto"><span class="badge-dot"></span>${c.project.status}</span>
          </div>
          <div class="client-card-project">${c.project.name}</div>
          <div class="client-card-stats">
            <div class="client-card-stat"><div class="stat-label">Total</div><div class="stat-value">${formatCurrency(c.financials.totalValue)}</div></div>
            <div class="client-card-stat"><div class="stat-label">Paid</div><div class="stat-value money-green">${formatCurrency(c.financials.paidAmount)}</div></div>
            <div class="client-card-stat"><div class="stat-label">Due</div><div class="stat-value money-red">${formatCurrency(remaining)}</div></div>
          </div>
          <div class="progress-wrap"><div class="progress-bar" style="flex:1"><div class="progress-bar-fill ${progressColor}" style="width:${c.project.progress}%"></div></div><span class="progress-pct">${c.project.progress}%</span></div>
          <div class="client-card-footer">
            <span class="client-card-date">${formatDate(c.createdAt)}</span>
            <div class="client-card-actions">
              <button class="action-btn" title="Edit" onclick="event.stopPropagation();openDrawer('${c.id}')"><i data-lucide="pencil"></i></button>
              <button class="action-btn danger" title="Delete" onclick="event.stopPropagation();confirmDeleteClient('${c.id}')"><i data-lucide="trash-2"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}


// ═══════════════════════════════════════════
// DRAWER: Add / Edit Client
// ═══════════════════════════════════════════
let editingClientId = null;

function openDrawer(clientId = null) {
  editingClientId = clientId;
  const db = getDB();
  const client = clientId ? db.clients.find(c => c.id === clientId) : null;
  const isEdit = !!client;

  $('#drawer-title').textContent = isEdit ? 'Edit Client' : 'Add New Client';
  $('#drawer-save').textContent = isEdit ? 'Save Changes' : 'Save Client';

  const body = $('#drawer-body');
  body.innerHTML = `
    <div class="form-section">
      <div class="form-section-title">Client Information</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Client Name <span class="required">*</span></label>
          <input class="form-input" id="f-name" value="${isEdit?client.name:''}" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Business Name</label>
          <input class="form-input" id="f-business" value="${isEdit?client.businessName:''}" placeholder="Company name"></div>
        <div class="form-group"><label class="form-label">Email <span class="required">*</span></label>
          <input class="form-input" id="f-email" type="email" value="${isEdit?client.email:''}" placeholder="email@example.com"></div>
        <div class="form-group"><label class="form-label">Phone</label>
          <input class="form-input" id="f-phone" type="tel" value="${isEdit?client.phone:''}" placeholder="+91 XXXXX XXXXX"></div>
        <div class="form-group"><label class="form-label">WhatsApp</label>
          <input class="form-input" id="f-whatsapp" value="${isEdit?client.whatsapp:''}" placeholder="+91 XXXXX XXXXX"></div>
        <div class="form-group"><label class="form-label">City</label>
          <input class="form-input" id="f-city" value="${isEdit?client.city:''}" placeholder="City"></div>
        <div class="form-group"><label class="form-label">Country</label>
          <select class="form-select" id="f-country">
            <option value="India"${(!isEdit||client.country==='India')?' selected':''}>India</option>
            <option value="USA"${(isEdit&&client.country==='USA')?' selected':''}>USA</option>
            <option value="UK"${(isEdit&&client.country==='UK')?' selected':''}>UK</option>
            <option value="UAE"${(isEdit&&client.country==='UAE')?' selected':''}>UAE</option>
            <option value="Other"${(isEdit&&client.country==='Other')?' selected':''}>Other</option>
          </select></div>
        <div class="form-group"><label class="form-label">Client Source</label>
          <select class="form-select" id="f-source">
            <option value="Instagram"${(isEdit&&client.source==='Instagram')?' selected':''}>Instagram</option>
            <option value="LinkedIn"${(isEdit&&client.source==='LinkedIn')?' selected':''}>LinkedIn</option>
            <option value="Cold Call"${(isEdit&&client.source==='Cold Call')?' selected':''}>Cold Call</option>
            <option value="Reddit"${(isEdit&&client.source==='Reddit')?' selected':''}>Reddit</option>
            <option value="Referral"${(isEdit&&client.source==='Referral')?' selected':''}>Referral</option>
            <option value="Other"${(isEdit&&client.source==='Other')?' selected':''}>Other</option>
          </select></div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Project Details</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Project Name <span class="required">*</span></label>
          <input class="form-input" id="f-project" value="${isEdit?client.project.name:''}" placeholder="Project name"></div>
        <div class="form-group"><label class="form-label">Project Type <span class="required">*</span></label>
          <select class="form-select" id="f-type">
            ${['Web Design','Shopify','WordPress','Mobile App','AI Automation','Social Media','Other'].map(t =>
              `<option value="${t}"${isEdit&&client.project.type===t?' selected':''}>${t}</option>`
            ).join('')}
          </select></div>
        <div class="form-group full-width"><label class="form-label">Description</label>
          <textarea class="form-textarea" id="f-desc" placeholder="Project description...">${isEdit?client.project.description:''}</textarea></div>
        <div class="form-group"><label class="form-label">Start Date <span class="required">*</span></label>
          <input class="form-input" id="f-start" type="date" value="${isEdit?client.project.startDate:''}"></div>
        <div class="form-group"><label class="form-label">Deadline <span class="required">*</span></label>
          <input class="form-input" id="f-deadline" type="date" value="${isEdit?client.project.deadline:''}"></div>
        <div class="form-group"><label class="form-label">Priority</label>
          <select class="form-select" id="f-priority">
            ${['Low','Medium','High','Urgent'].map(p =>
              `<option value="${p}"${isEdit&&client.project.priority===p?' selected':''}>${p}</option>`
            ).join('')}
          </select></div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Financials</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Total Value (₹) <span class="required">*</span></label>
          <input class="form-input" id="f-total" type="number" value="${isEdit?client.financials.totalValue:''}" placeholder="0"></div>
        <div class="form-group"><label class="form-label">Advance Received (₹)</label>
          <input class="form-input" id="f-paid" type="number" value="${isEdit?client.financials.paidAmount:''}" placeholder="0"></div>
        <div class="form-group"><label class="form-label">Payment Method</label>
          <select class="form-select" id="f-paymethod">
            ${['UPI','Bank Transfer','Cash','Razorpay'].map(m =>
              `<option value="${m}"${isEdit&&client.financials.paymentMethod===m?' selected':''}>${m}</option>`
            ).join('')}
          </select></div>
        <div class="form-group"><label class="form-label">Advance Date</label>
          <input class="form-input" id="f-advdate" type="date" value="${isEdit?(client.financials.advanceDate||''):''}"></div>
        <div class="form-group"><label class="form-label">Remaining Due Date</label>
          <input class="form-input" id="f-duedate" type="date" value="${isEdit?(client.financials.remainingDueDate||''):''}"></div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Status</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Project Status</label>
          <select class="form-select" id="f-status">
            ${['Not Started','In Progress','In Review','Completed','On Hold'].map(s =>
              `<option value="${s}"${isEdit&&client.project.status===s?' selected':''}>${s}</option>`
            ).join('')}
          </select></div>
        <div class="form-group"><label class="form-label">Progress: <strong id="f-progress-val">${isEdit?client.project.progress:0}%</strong></label>
          <input class="form-range" id="f-progress" type="range" min="0" max="100" value="${isEdit?client.project.progress:0}"></div>
        <div class="form-group full-width"><label class="form-label">Notes</label>
          <textarea class="form-textarea" id="f-notes" placeholder="Additional notes...">${isEdit?client.notes:''}</textarea></div>
      </div>
    </div>
  `;

  $('#f-progress').addEventListener('input', e => {
    $('#f-progress-val').textContent = e.target.value + '%';
  });

  $('#drawer-overlay').classList.add('open');
  $('#client-drawer').classList.add('open');
  $('#drawer-save').onclick = saveClient;
}

function closeDrawer() {
  $('#drawer-overlay').classList.remove('open');
  $('#client-drawer').classList.remove('open');
  editingClientId = null;
}

function saveClient() {
  const name = $('#f-name').value.trim();
  const email = $('#f-email').value.trim();
  const project = $('#f-project').value.trim();
  const total = Number($('#f-total').value) || 0;
  const start = $('#f-start').value;
  const deadline = $('#f-deadline').value;

  let hasError = false;
  [['f-name',name],['f-email',email],['f-project',project],['f-total',total],['f-start',start],['f-deadline',deadline]].forEach(([id,val]) => {
    const el = $(`#${id}`);
    if(!val) { el.classList.add('error'); hasError = true; }
    else { el.classList.remove('error'); }
  });

  if(hasError) return;

  const clientData = {
    name,
    businessName: $('#f-business').value.trim(),
    email,
    phone: $('#f-phone').value.trim(),
    whatsapp: $('#f-whatsapp').value.trim(),
    city: $('#f-city').value.trim(),
    country: $('#f-country').value,
    source: $('#f-source').value,
    project: {
      name: project,
      type: $('#f-type').value,
      description: $('#f-desc').value.trim(),
      startDate: start,
      deadline,
      priority: $('#f-priority').value,
      status: $('#f-status').value,
      progress: Number($('#f-progress').value),
    },
    financials: {
      totalValue: total,
      paidAmount: Number($('#f-paid').value) || 0,
      paymentMethod: $('#f-paymethod').value,
      advanceDate: $('#f-advdate').value || null,
      remainingDueDate: $('#f-duedate').value || null,
    },
    notes: $('#f-notes').value.trim(),
    updatedAt: new Date().toISOString(),
  };

  updateDB(data => {
    if(editingClientId) {
      const idx = data.clients.findIndex(c => c.id === editingClientId);
      if(idx >= 0) { Object.assign(data.clients[idx], clientData); }
    } else {
      const year = new Date().getFullYear();
      const num = data.clients.length + 1;
      clientData.id = `RST-${year}-${String(num).padStart(3,'0')}`;
      clientData.createdAt = new Date().toISOString();
      data.clients.push(clientData);
      data.activities.unshift({
        id: uid(), type:'client', description:'New client onboarded:',
        clientName: clientData.businessName || clientData.name, clientId: clientData.id,
        timestamp: new Date().toISOString()
      });
    }
  });

  closeDrawer();
  buildSidebar();
  renderPage();
}


// ═══════════════════════════════════════════
// DELETE CLIENT
// ═══════════════════════════════════════════
let pendingDeleteId = null;

function confirmDeleteClient(id) {
  pendingDeleteId = id;
  const db = getDB();
  const client = db.clients.find(c=>c.id===id);
  $('#confirm-title').textContent = 'Delete Client?';
  $('#confirm-message').textContent = `Are you sure you want to delete "${client?.name || id}"? This action cannot be undone.`;
  $('#confirm-ok').textContent = 'Delete';
  $('#confirm-ok').className = 'btn btn-danger';
  $('#confirm-ok').onclick = () => {
    updateDB(data => {
      data.clients = data.clients.filter(c => c.id !== pendingDeleteId);
      data.invoices = data.invoices.filter(i => i.clientId !== pendingDeleteId);
    });
    closeConfirm();
    buildSidebar();
    renderPage();
  };
  $('#confirm-dialog').classList.add('open');
}

function closeConfirm() {
  $('#confirm-dialog').classList.remove('open');
  pendingDeleteId = null;
}


// ═══════════════════════════════════════════
// PAGE: CLIENT DETAIL
// ═══════════════════════════════════════════
let clientDetailTab = 'overview';

function renderClientDetail(container) {
  const db = getDB();
  const client = db.clients.find(c => c.id === currentClientId);
  if(!client) { container.innerHTML = '<div class="empty-state"><div class="empty-icon"><i data-lucide="help-circle"></i></div><h3>Client not found</h3></div>'; refreshIcons(); return; }

  const remaining = client.financials.totalValue - client.financials.paidAmount;
  const pctPaid = client.financials.totalValue > 0 ? Math.round(client.financials.paidAmount / client.financials.totalValue * 100) : 0;
  const daysActive = Math.floor((Date.now() - new Date(client.createdAt).getTime()) / 864e5);
  const clientInvoices = db.invoices.filter(i => i.clientId === client.id);

  container.innerHTML = `
    <div class="card animate-fadeInUp">
      <div class="client-detail-header">
        <div class="avatar avatar-xl" style="background:${getAvatarColor(client.name)}">${getInitials(client.name)}</div>
        <div class="client-detail-info" style="flex:1">
          <h1>${client.name}</h1>
          ${client.businessName ? `<div class="business-name">${client.businessName}</div>` : ''}
          <div class="detail-meta">
            <span><i data-lucide="mail"></i> ${client.email}</span>
            <span><i data-lucide="phone"></i> ${client.phone || '—'}</span>
            <span class="type-badge">${client.source}</span>
            <span><i data-lucide="calendar"></i> Since ${formatDate(client.createdAt)}</span>
          </div>
        </div>
        <div class="client-detail-stats">
          <div class="client-detail-stat"><div class="stat-label">Total Value</div><div class="stat-value">${formatCurrency(client.financials.totalValue)}</div></div>
          <div class="client-detail-stat"><div class="stat-label">Paid</div><div class="stat-value money-green">${formatCurrency(client.financials.paidAmount)}</div></div>
          <div class="client-detail-stat"><div class="stat-label">Remaining</div><div class="stat-value money-red">${formatCurrency(remaining)}</div></div>
          <div class="client-detail-stat"><div class="stat-label">Days Active</div><div class="stat-value">${daysActive}</div></div>
        </div>
      </div>

      <div class="tabs">
        <button class="tab-btn${clientDetailTab==='overview'?' active':''}" onclick="clientDetailTab='overview';renderClientDetail($('#main-content'))">Overview</button>
        <button class="tab-btn${clientDetailTab==='project'?' active':''}" onclick="clientDetailTab='project';renderClientDetail($('#main-content'))">Project</button>
        <button class="tab-btn${clientDetailTab==='financials'?' active':''}" onclick="clientDetailTab='financials';renderClientDetail($('#main-content'))">Financials</button>
        <button class="tab-btn${clientDetailTab==='activity'?' active':''}" onclick="clientDetailTab='activity';renderClientDetail($('#main-content'))">Activity</button>
        <button class="tab-btn${clientDetailTab==='notes'?' active':''}" onclick="clientDetailTab='notes';renderClientDetail($('#main-content'))">Notes</button>
      </div>

      <div class="tab-content">
        ${renderClientTab(client, clientInvoices, pctPaid, remaining)}
      </div>
    </div>

    <div style="margin-top:16px;display:flex;gap:8px">
      <button class="btn btn-secondary" onclick="navigate('clients')"><i data-lucide="arrow-left"></i> Back to Clients</button>
      <button class="btn btn-primary" onclick="openDrawer('${client.id}')"><i data-lucide="pencil"></i> Edit Client</button>
      <button class="btn btn-danger" onclick="confirmDeleteClient('${client.id}')"><i data-lucide="trash-2"></i> Delete</button>
    </div>
  `;

  if(clientDetailTab === 'overview' || clientDetailTab === 'financials') {
    requestAnimationFrame(() => {
      const gc = $('#gauge-canvas');
      if(gc) drawGauge(gc, pctPaid);
      refreshIcons();
    });
  } else {
    refreshIcons();
  }
}

function renderClientTab(client, invoices, pctPaid, remaining) {
  switch(clientDetailTab) {
    case 'overview':
      return `<div class="detail-grid">
        <div>
          <div class="detail-card" style="margin-bottom:16px">
            <div class="detail-card-header"><span class="detail-card-title">Client Info</span><button class="btn btn-ghost btn-sm" onclick="openDrawer('${client.id}')">Edit</button></div>
            <div class="detail-card-body">
              ${[['Name',client.name],['Business',client.businessName],['Email',client.email],['Phone',client.phone],['WhatsApp',client.whatsapp],['City',client.city],['Country',client.country],['Source',client.source]].map(([l,v])=>`<div class="detail-row"><span class="label">${l}</span><span class="value">${v||'—'}</span></div>`).join('')}
            </div>
          </div>
          <div class="detail-card">
            <div class="detail-card-header"><span class="detail-card-title">Project Info</span></div>
            <div class="detail-card-body">
              ${[['Project',client.project.name],['Type',client.project.type],['Priority',client.project.priority],['Start Date',formatDate(client.project.startDate)],['Deadline',formatDate(client.project.deadline)],['Status',`<span class="badge badge-${client.project.status.toLowerCase().replace(/\s+/g,'-')}"><span class="badge-dot"></span>${client.project.status}</span>`]].map(([l,v])=>`<div class="detail-row"><span class="label">${l}</span><span class="value">${v}</span></div>`).join('')}
              <div style="margin-top:12px">
                <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">Progress</div>
                <div class="progress-wrap"><div class="progress-bar" style="flex:1;height:6px"><div class="progress-bar-fill accent" style="width:${client.project.progress}%"></div></div><span class="progress-pct">${client.project.progress}%</span></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="detail-card" style="margin-bottom:16px">
            <div class="detail-card-header"><span class="detail-card-title">Financial Summary</span></div>
            <div class="detail-card-body">
              <div class="gauge-container"><canvas id="gauge-canvas"></canvas>
                <div class="gauge-legend">
                  <div class="gauge-legend-item"><span class="label">Total</span><span class="value">${formatCurrency(client.financials.totalValue)}</span></div>
                  <div class="gauge-legend-item"><span class="label">Paid</span><span class="value money-green">${formatCurrency(client.financials.paidAmount)}</span></div>
                  <div class="gauge-legend-item"><span class="label">Remaining</span><span class="value money-red">${formatCurrency(remaining)}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-card">
            <div class="detail-card-header"><span class="detail-card-title">Payment Timeline</span></div>
            <div class="detail-card-body">
              <div class="payment-timeline">
                <div class="payment-step">
                  <div class="payment-step-icon ${client.financials.paidAmount>0?'done':'pending'}"><i data-lucide="${client.financials.paidAmount>0?'check':'clock'}"></i></div>
                  <div class="payment-step-info">
                    <div class="payment-step-label">Advance Payment</div>
                    <div class="payment-step-detail">${formatCurrency(client.financials.paidAmount)} — ${client.financials.advanceDate ? formatDate(client.financials.advanceDate) : 'Not received'}</div>
                  </div>
                </div>
                <div class="payment-step">
                  <div class="payment-step-icon ${remaining===0?'done':daysUntil(client.financials.remainingDueDate)<0?'overdue':'pending'}"><i data-lucide="${remaining===0?'check':daysUntil(client.financials.remainingDueDate)<0?'alert-triangle':'clock'}"></i></div>
                  <div class="payment-step-info">
                    <div class="payment-step-label">Remaining Payment</div>
                    <div class="payment-step-detail">${formatCurrency(remaining)} — ${remaining===0?'Paid':client.financials.remainingDueDate?'Due '+formatDate(client.financials.remainingDueDate):'No due date'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    case 'project':
      return `<div class="detail-card">
        <div class="detail-card-body">
          <h3 style="font-family:var(--font-display);font-size:20px;font-weight:400;margin-bottom:8px">${client.project.name}</h3>
          <span class="type-badge" style="margin-bottom:12px;display:inline-flex">${client.project.type}</span>
          <span class="badge badge-${client.project.status.toLowerCase().replace(/\s+/g,'-')}" style="margin-left:8px"><span class="badge-dot"></span>${client.project.status}</span>
          <p style="color:var(--text-secondary);margin:16px 0;line-height:1.6">${client.project.description || 'No description provided.'}</p>
          ${[['Priority',`<span class="badge badge-${client.project.priority==='Urgent'?'overdue':client.project.priority==='High'?'in-review':'in-progress'}"><span class="badge-dot"></span>${client.project.priority}</span>`],['Start Date',formatDate(client.project.startDate)],['Deadline',formatDate(client.project.deadline)],['Days Remaining',daysUntil(client.project.deadline)+' days']].map(([l,v])=>`<div class="detail-row"><span class="label">${l}</span><span class="value">${v}</span></div>`).join('')}
          <div style="margin-top:16px">
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Project Progress</div>
            <div class="progress-wrap"><div class="progress-bar" style="flex:1;height:8px"><div class="progress-bar-fill accent" style="width:${client.project.progress}%"></div></div><span class="progress-pct" style="font-size:14px">${client.project.progress}%</span></div>
          </div>
          <div style="margin-top:20px;display:flex;gap:8px;flex-wrap:wrap">
            <label class="form-label" style="width:100%">Quick Status Update</label>
            <select class="form-select" id="quick-status" style="width:auto">
              ${['Not Started','In Progress','In Review','Completed','On Hold'].map(s => `<option value="${s}"${client.project.status===s?' selected':''}>${s}</option>`).join('')}
            </select>
            <input class="form-input" id="quick-progress" type="number" min="0" max="100" value="${client.project.progress}" style="width:80px" placeholder="%">
            <button class="btn btn-primary btn-sm" onclick="quickUpdateClient('${client.id}')">Update</button>
          </div>
        </div>
      </div>`;

    case 'financials':
      return `<div class="detail-grid">
        <div>
          <div class="detail-card" style="margin-bottom:16px">
            <div class="detail-card-header"><span class="detail-card-title">Payment Details</span></div>
            <div class="detail-card-body">
              <div class="gauge-container"><canvas id="gauge-canvas"></canvas>
                <div class="gauge-legend">
                  <div class="gauge-legend-item"><span class="label">Total Value</span><span class="value">${formatCurrency(client.financials.totalValue)}</span></div>
                  <div class="gauge-legend-item"><span class="label">Amount Paid</span><span class="value money-green">${formatCurrency(client.financials.paidAmount)}</span></div>
                  <div class="gauge-legend-item"><span class="label">Outstanding</span><span class="value money-red">${formatCurrency(remaining)}</span></div>
                  <div class="gauge-legend-item"><span class="label">Payment Method</span><span class="value">${client.financials.paymentMethod}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="detail-card">
            <div class="detail-card-header"><span class="detail-card-title">Invoices</span></div>
            <div class="detail-card-body" style="padding:0">
              ${invoices.length > 0 ? `<table class="data-table"><thead><tr><th>Invoice</th><th>Amount</th><th>Status</th><th>Due</th></tr></thead><tbody>
                ${invoices.map(inv => `<tr>
                  <td style="font-family:var(--font-mono);font-size:12px">${inv.id}</td>
                  <td class="money">${formatCurrency(inv.amount)}</td>
                  <td><span class="badge badge-${inv.status.toLowerCase()}"><span class="badge-dot"></span>${inv.status}</span></td>
                  <td>${formatDate(inv.dueDate)}</td>
                </tr>`).join('')}
              </tbody></table>` : '<div class="empty-state" style="padding:20px"><p>No invoices yet</p></div>'}
            </div>
          </div>
        </div>
      </div>`;

    case 'activity':
      const clientActivities = getDB().activities.filter(a => a.clientId === client.id);
      return `<div class="detail-card">
        <div class="detail-card-body">
          ${clientActivities.length > 0 ? `<div class="activity-list">${clientActivities.map((a,i) => {
            const colors = { payment:'green', project:'blue', invoice:'amber', expense:'red', client:'blue' };
            return `<div class="activity-item"><div class="activity-dot-col"><div class="activity-dot ${colors[a.type]||'blue'}"></div>${i<clientActivities.length-1?'<div class="activity-line"></div>':''}</div><div class="activity-content"><div class="activity-text">${a.description} ${a.detail||''}</div><div class="activity-time">${timeAgo(a.timestamp)}</div></div></div>`;
          }).join('')}</div>` : '<div class="empty-state"><div class="empty-icon"><i data-lucide="clipboard"></i></div><h3>No activity yet</h3></div>'}
        </div>
      </div>`;

    case 'notes':
      return `<div class="detail-card">
        <div class="detail-card-body">
          <textarea class="form-textarea" id="client-notes" style="min-height:200px;width:100%">${client.notes||''}</textarea>
          <button class="btn btn-primary" style="margin-top:12px" onclick="saveClientNotes('${client.id}')">Save Notes</button>
        </div>
      </div>`;

    default: return '';
  }
}

function quickUpdateClient(id) {
  const status = $('#quick-status').value;
  const progress = clamp(Number($('#quick-progress').value)||0, 0, 100);
  updateDB(data => {
    const c = data.clients.find(c=>c.id===id);
    if(c) {
      c.project.status = status;
      c.project.progress = progress;
      c.updatedAt = new Date().toISOString();
      data.activities.unshift({ id:uid(), type:'project', description:`Project "${c.project.name}" moved to`, clientName:c.businessName||c.name, clientId:c.id, detail:status, timestamp:new Date().toISOString() });
    }
  });
  renderClientDetail($('#main-content'));
  buildSidebar();
}

function saveClientNotes(id) {
  const notes = $('#client-notes').value;
  updateDB(data => {
    const c = data.clients.find(c=>c.id===id);
    if(c) { c.notes = notes; c.updatedAt = new Date().toISOString(); }
  });
}


// ═══════════════════════════════════════════
// PAGE: ANALYTICS
// ═══════════════════════════════════════════
function renderAnalytics(container) {
  const db = getDB();
  const clients = db.clients;
  const totalRevenue = clients.reduce((a,c) => a + c.financials.paidAmount, 0);
  const totalValue = clients.reduce((a,c) => a + c.financials.totalValue, 0);
  const totalExpenses = db.expenses.reduce((a,e) => a + e.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const sources = {};
  clients.forEach(c => { sources[c.source] = (sources[c.source]||0) + 1; });

  const types = {};
  clients.forEach(c => { types[c.project.type] = (types[c.project.type]||0) + 1; });

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Analytics</h1><div class="subtitle">Business performance insights</div></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Total Revenue</div><div class="stat-value money-green">${formatCurrency(totalRevenue)}</div></div>
      <div class="stat-card"><div class="stat-label">Total Expenses</div><div class="stat-value money-red">${formatCurrency(totalExpenses)}</div></div>
      <div class="stat-card"><div class="stat-label">Net Profit</div><div class="stat-value" style="color:${profit>=0?'var(--green)':'var(--red)'}">${formatCurrency(profit)}</div></div>
    </div>

    <div class="charts-row animate-fadeInUp stagger-2">
      <div class="card">
        <div class="card-header"><span class="card-title">Revenue Trend</span></div>
        <div class="card-body"><div class="chart-container"><canvas id="analytics-revenue" style="width:100%;height:280px"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Client Sources</span></div>
        <div class="card-body" style="display:flex;flex-direction:column;align-items:center">
          <canvas id="analytics-sources" style="width:200px;height:200px"></canvas>
          <div class="donut-legend" id="sources-legend"></div>
        </div>
      </div>
    </div>

    <div class="charts-row animate-fadeInUp stagger-3">
      <div class="card">
        <div class="card-header"><span class="card-title">Project Types</span></div>
        <div class="card-body">
          ${Object.entries(types).map(([type, count]) => {
            const pct = Math.round(count / clients.length * 100);
            return `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-light)">
              <span style="min-width:120px;font-size:13px">${type}</span>
              <div class="progress-bar" style="flex:1;height:6px"><div class="progress-bar-fill accent" style="width:${pct}%"></div></div>
              <span class="progress-pct">${count} (${pct}%)</span>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Collection Rate</span></div>
        <div class="card-body" style="display:flex;flex-direction:column;align-items:center">
          <canvas id="analytics-collection" style="width:160px;height:160px"></canvas>
          <div style="margin-top:16px;text-align:center">
            <div style="font-size:13px;color:var(--text-secondary)">Total Billed: ${formatCurrency(totalValue)}</div>
            <div style="font-size:13px;color:var(--green)">Collected: ${formatCurrency(totalRevenue)}</div>
            <div style="font-size:13px;color:var(--red)">Pending: ${formatCurrency(totalValue-totalRevenue)}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-4">
      <div class="card-header"><span class="card-title">All Activity</span></div>
      <div class="card-body">
        <div class="activity-list">
          ${db.activities.map((a,i) => {
            const colors = { payment:'green', project:'blue', invoice:'amber', expense:'red', client:'blue' };
            return `<div class="activity-item"><div class="activity-dot-col"><div class="activity-dot ${colors[a.type]||'blue'}"></div>${i<db.activities.length-1?'<div class="activity-line"></div>':''}</div><div class="activity-content"><div class="activity-text">${a.description} ${a.clientName?`<span class="highlight" onclick="navigate('client/${a.clientId}')">${a.clientName}</span>`:''} ${a.detail||''}</div><div class="activity-time">${timeAgo(a.timestamp)}</div></div></div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const months = ['Nov','Dec','Jan','Feb','Mar','Apr'];
    drawLineChart($('#analytics-revenue'), [
      { label:'Revenue', data:[8000,12000,45000,73000,52000,totalRevenue], color:'#1C1917', fill:true },
    ], months);

    const srcColors = ['#1C1917','#78716C','#16A34A','#D97706','#DC2626','#2563EB'];
    const srcSegs = Object.entries(sources).map(([k,v],i) => ({label:k, value:v, color:srcColors[i%srcColors.length]}));
    drawDonutChart($('#analytics-sources'), srcSegs);
    $('#sources-legend').innerHTML = srcSegs.map(s => `<div class="donut-legend-item"><div class="donut-legend-dot" style="background:${s.color}"></div>${s.label} (${s.value})</div>`).join('');

    const collPct = totalValue > 0 ? Math.round(totalRevenue / totalValue * 100) : 0;
    drawGauge($('#analytics-collection'), collPct);
  });
}


// ═══════════════════════════════════════════
// PAGE: PROJECTS
// ═══════════════════════════════════════════
function renderProjects(container) {
  const db = getDB();
  const statuses = ['In Progress','In Review','Not Started','On Hold','Completed'];
  const statusColors = { 'In Progress':'var(--blue)', 'In Review':'var(--amber)', 'Not Started':'var(--text-muted)', 'On Hold':'var(--red)', 'Completed':'var(--green)' };

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Projects</h1><div class="subtitle">Track all project progress</div></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="openDrawer()"><i data-lucide="plus"></i> New Project</button></div>
    </div>
    <div class="animate-fadeInUp stagger-1" id="projects-board">
      ${statuses.map(status => {
        const statusClients = db.clients.filter(c => c.project.status === status);
        return `<div class="card" style="margin-bottom:16px">
          <div class="card-header">
            <span class="card-title" style="display:flex;align-items:center;gap:8px">
              <span class="status-dot" style="background:${statusColors[status]}"></span>
              ${status}
              <span class="count-badge">${statusClients.length}</span>
            </span>
          </div>
          <div class="card-body ${statusClients.length===0?'':'no-pad'}">
            ${statusClients.length === 0 ? '<div style="text-align:center;color:var(--text-muted);padding:20px;font-size:13px">No projects</div>' :
              `<table class="data-table"><thead><tr><th>Client</th><th>Project</th><th>Type</th><th>Priority</th><th>Deadline</th><th>Progress</th><th></th></tr></thead><tbody>
                ${statusClients.map(c => {
                  const days = daysUntil(c.project.deadline);
                  const progressColor = c.project.progress >= 75 ? 'green' : c.project.progress >= 40 ? 'blue' : 'amber';
                  return `<tr>
                    <td><div class="client-cell"><div class="avatar avatar-sm" style="background:${getAvatarColor(c.name)}">${getInitials(c.name)}</div><span>${c.name}</span></div></td>
                    <td>${c.project.name}</td>
                    <td><span class="type-badge">${c.project.type}</span></td>
                    <td><span class="badge badge-${c.project.priority==='Urgent'?'overdue':c.project.priority==='High'?'in-review':'in-progress'}"><span class="badge-dot"></span>${c.project.priority}</span></td>
                    <td>${formatDate(c.project.deadline)} <span style="font-size:11px;color:${days<0?'var(--red)':days<7?'var(--amber)':'var(--text-muted)'}">(${days<0?Math.abs(days)+'d overdue':days+'d left'})</span></td>
                    <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-bar-fill ${progressColor}" style="width:${c.project.progress}%"></div></div><span class="progress-pct">${c.project.progress}%</span></div></td>
                    <td><button class="btn btn-ghost btn-sm" onclick="navigate('client/${c.id}')">View</button></td>
                  </tr>`;
                }).join('')}
              </tbody></table>`}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  refreshIcons();
}


// ═══════════════════════════════════════════
// PAGE: REVENUE
// ═══════════════════════════════════════════
function renderRevenue(container) {
  const db = getDB();
  const totalRevenue = db.clients.reduce((a,c) => a + c.financials.paidAmount, 0);
  const totalValue = db.clients.reduce((a,c) => a + c.financials.totalValue, 0);
  const outstanding = totalValue - totalRevenue;

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Revenue</h1><div class="subtitle">Income tracking & payment history</div></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Total Billed</div><div class="stat-value">${formatCurrency(totalValue)}</div></div>
      <div class="stat-card"><div class="stat-label">Total Collected</div><div class="stat-value money-green">${formatCurrency(totalRevenue)}</div></div>
      <div class="stat-card"><div class="stat-label">Outstanding</div><div class="stat-value money-red">${formatCurrency(outstanding)}</div></div>
    </div>

    <div class="card animate-fadeInUp stagger-2" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">Revenue by Client</span></div>
      <div class="card-body no-pad">
        <table class="data-table"><thead><tr><th>Client</th><th>Project</th><th>Total Value</th><th>Paid</th><th>Remaining</th><th>Collection %</th></tr></thead>
        <tbody>
          ${db.clients.sort((a,b)=>b.financials.totalValue-a.financials.totalValue).map(c => {
            const rem = c.financials.totalValue - c.financials.paidAmount;
            const pct = c.financials.totalValue > 0 ? Math.round(c.financials.paidAmount/c.financials.totalValue*100) : 0;
            return `<tr>
              <td><div class="client-cell"><div class="avatar avatar-sm" style="background:${getAvatarColor(c.name)}">${getInitials(c.name)}</div><div><div class="client-name">${c.name}</div><div class="client-email">${c.businessName}</div></div></div></td>
              <td>${c.project.name}</td>
              <td class="money">${formatCurrency(c.financials.totalValue)}</td>
              <td class="money money-green">${formatCurrency(c.financials.paidAmount)}</td>
              <td class="money ${rem>0?'money-red':'money-green'}">${formatCurrency(rem)}</td>
              <td><div class="progress-wrap"><div class="progress-bar"><div class="progress-bar-fill ${pct>=75?'green':pct>=40?'amber':'red'}" style="width:${pct}%"></div></div><span class="progress-pct">${pct}%</span></div></td>
            </tr>`;
          }).join('')}
        </tbody></table>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-3">
      <div class="card-header"><span class="card-title">Revenue Trend</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="revenue-chart" style="width:100%;height:280px"></canvas></div></div>
    </div>
  `;

  requestAnimationFrame(() => {
    drawLineChart($('#revenue-chart'), [
      { label:'Collected', data:[8000,12000,45000,73000,52000,totalRevenue], color:'#16A34A', fill:true },
      { label:'Billed', data:[15000,25000,50000,80000,65000,totalValue], color:'#1C1917', fill:false },
    ], ['Nov','Dec','Jan','Feb','Mar','Apr']);
  });
}


// ═══════════════════════════════════════════
// PAGE: EXPENSES
// ═══════════════════════════════════════════
function renderExpenses(container) {
  const db = getDB();
  const expenses = [...db.expenses].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const total = expenses.reduce((a,e)=>a+e.amount,0);
  const categories = {};
  expenses.forEach(e => { categories[e.category] = (categories[e.category]||0) + e.amount; });

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Expenses</h1><div class="subtitle">Track business expenditure</div></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="openExpenseForm()"><i data-lucide="plus"></i> Add Expense</button></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Total Expenses</div><div class="stat-value money-red">${formatCurrency(total)}</div></div>
      <div class="stat-card"><div class="stat-label">This Month</div><div class="stat-value money-amber">${formatCurrency(expenses.filter(e=>new Date(e.date).getMonth()===new Date().getMonth()).reduce((a,e)=>a+e.amount,0))}</div></div>
      <div class="stat-card"><div class="stat-label">Categories</div><div class="stat-value">${Object.keys(categories).length}</div></div>
    </div>

    <div class="charts-row animate-fadeInUp stagger-2">
      <div class="card">
        <div class="card-header"><span class="card-title">All Expenses</span></div>
        <div class="card-body no-pad">
          <table class="data-table"><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Method</th><th></th></tr></thead>
          <tbody>
            ${expenses.map(e => `<tr>
              <td>${formatDate(e.date)}</td>
              <td>${e.description}</td>
              <td><span class="type-badge">${e.category}</span></td>
              <td class="money money-red">${formatCurrency(e.amount)}</td>
              <td style="font-size:12px;color:var(--text-muted)">${e.paymentMethod}</td>
              <td><button class="action-btn danger" onclick="deleteExpense('${e.id}')"><i data-lucide="trash-2"></i></button></td>
            </tr>`).join('')}
          </tbody></table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">By Category</span></div>
        <div class="card-body">
          ${Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([cat, amt]) => {
            const pct = Math.round(amt/total*100);
            return `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-light)">
              <span style="min-width:90px;font-size:13px">${cat}</span>
              <div class="progress-bar" style="flex:1;height:6px"><div class="progress-bar-fill red" style="width:${pct}%"></div></div>
              <span class="money" style="min-width:80px;text-align:right">${formatCurrency(amt)}</span>
              <span class="progress-pct">${pct}%</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  refreshIcons();
}

function openExpenseForm() {
  $('#drawer-title').textContent = 'Add Expense';
  $('#drawer-save').textContent = 'Save Expense';
  const body = $('#drawer-body');
  body.innerHTML = `
    <div class="form-section">
      <div class="form-section-title">Expense Details</div>
      <div class="form-grid">
        <div class="form-group full-width"><label class="form-label">Description <span class="required">*</span></label>
          <input class="form-input" id="exp-desc" placeholder="What was this expense for?"></div>
        <div class="form-group"><label class="form-label">Amount (₹) <span class="required">*</span></label>
          <input class="form-input" id="exp-amount" type="number" placeholder="0"></div>
        <div class="form-group"><label class="form-label">Date</label>
          <input class="form-input" id="exp-date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="form-group"><label class="form-label">Category</label>
          <select class="form-select" id="exp-category">
            ${['Hosting','Software','Marketing','Freelancer','Office','Travel','Miscellaneous'].map(c=>`<option value="${c}">${c}</option>`).join('')}
          </select></div>
        <div class="form-group"><label class="form-label">Payment Method</label>
          <select class="form-select" id="exp-method">
            ${['UPI','Bank Transfer','Cash','Razorpay'].map(m=>`<option value="${m}">${m}</option>`).join('')}
          </select></div>
      </div>
    </div>
  `;

  $('#drawer-save').onclick = () => {
    const desc = $('#exp-desc').value.trim();
    const amount = Number($('#exp-amount').value);
    if(!desc || !amount) { if(!desc) $('#exp-desc').classList.add('error'); if(!amount) $('#exp-amount').classList.add('error'); return; }

    updateDB(data => {
      data.expenses.push({ id:uid(), description:desc, amount, date:$('#exp-date').value, category:$('#exp-category').value, paymentMethod:$('#exp-method').value });
      data.activities.unshift({ id:uid(), type:'expense', description:`Expense ${formatCurrency(amount)} added — ${desc}`, amount, timestamp:new Date().toISOString() });
    });
    closeDrawer();
    renderPage();
  };

  $('#drawer-overlay').classList.add('open');
  $('#client-drawer').classList.add('open');
}

function deleteExpense(id) {
  updateDB(data => { data.expenses = data.expenses.filter(e=>e.id!==id); });
  renderPage();
}


// ═══════════════════════════════════════════
// PAGE: INVOICES
// ═══════════════════════════════════════════
function renderInvoices(container) {
  const db = getDB();
  const invoices = [...db.invoices].sort((a,b)=>new Date(b.issuedDate)-new Date(a.issuedDate));
  const paid = invoices.filter(i=>i.status==='Paid').reduce((a,i)=>a+i.amount,0);
  const pending = invoices.filter(i=>['Sent','Pending'].includes(i.status)).reduce((a,i)=>a+i.amount,0);
  const overdue = invoices.filter(i=>i.status==='Overdue').reduce((a,i)=>a+i.amount,0);

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Invoices</h1><div class="subtitle">Invoice management</div></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="openInvoiceForm()"><i data-lucide="plus"></i> Create Invoice</button></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Total Paid</div><div class="stat-value money-green">${formatCurrency(paid)}</div></div>
      <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value money-amber">${formatCurrency(pending)}</div></div>
      <div class="stat-card"><div class="stat-label">Overdue</div><div class="stat-value money-red">${formatCurrency(overdue)}</div></div>
    </div>

    <div class="card animate-fadeInUp stagger-2">
      <div class="card-header"><span class="card-title">All Invoices</span></div>
      <div class="card-body no-pad">
        <table class="data-table"><thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Status</th><th>Issued</th><th>Due Date</th><th>Actions</th></tr></thead>
        <tbody>
          ${invoices.map(inv => {
            const client = db.clients.find(c=>c.id===inv.clientId);
            return `<tr>
              <td style="font-family:var(--font-mono);font-size:12px">${inv.id}</td>
              <td>${client ? `<div class="client-cell"><div class="avatar avatar-sm" style="background:${getAvatarColor(client.name)}">${getInitials(client.name)}</div><span>${client.name}</span></div>` : inv.clientId}</td>
              <td class="money">${formatCurrency(inv.amount)}</td>
              <td><span class="badge badge-${inv.status.toLowerCase()}"><span class="badge-dot"></span>${inv.status}</span></td>
              <td>${formatDate(inv.issuedDate)}</td>
              <td>${formatDate(inv.dueDate)}</td>
              <td><div class="action-btns">
                ${inv.status !== 'Paid' ? `<button class="btn btn-ghost btn-sm" onclick="markInvoicePaid('${inv.id}')">Mark Paid</button>` : '<span style="font-size:12px;color:var(--green)">Paid</span>'}
              </div></td>
            </tr>`;
          }).join('')}
        </tbody></table>
      </div>
    </div>
  `;
  refreshIcons();
}

function markInvoicePaid(id) {
  updateDB(data => {
    const inv = data.invoices.find(i=>i.id===id);
    if(inv) {
      inv.status = 'Paid';
      inv.paidDate = new Date().toISOString().split('T')[0];
      const client = data.clients.find(c=>c.id===inv.clientId);
      if(client) {
        client.financials.paidAmount = Math.min(client.financials.totalValue, client.financials.paidAmount + inv.amount);
        client.updatedAt = new Date().toISOString();
      }
      data.activities.unshift({ id:uid(), type:'payment', description:`Payment received ${formatCurrency(inv.amount)} from`, clientName:client?.businessName||client?.name||'', clientId:inv.clientId, amount:inv.amount, timestamp:new Date().toISOString() });
    }
  });
  buildSidebar();
  renderPage();
}

function openInvoiceForm() {
  const db = getDB();
  $('#drawer-title').textContent = 'Create Invoice';
  $('#drawer-save').textContent = 'Create Invoice';
  const body = $('#drawer-body');
  body.innerHTML = `
    <div class="form-section">
      <div class="form-section-title">Invoice Details</div>
      <div class="form-grid">
        <div class="form-group full-width"><label class="form-label">Client <span class="required">*</span></label>
          <select class="form-select" id="inv-client">${db.clients.map(c=>`<option value="${c.id}">${c.name} — ${c.businessName}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Amount (₹) <span class="required">*</span></label>
          <input class="form-input" id="inv-amount" type="number" placeholder="0"></div>
        <div class="form-group"><label class="form-label">Due Date <span class="required">*</span></label>
          <input class="form-input" id="inv-due" type="date"></div>
        <div class="form-group"><label class="form-label">Status</label>
          <select class="form-select" id="inv-status">${['Sent','Pending','Draft'].map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div>
      </div>
    </div>
  `;

  $('#drawer-save').onclick = () => {
    const clientId = $('#inv-client').value;
    const amount = Number($('#inv-amount').value);
    const dueDate = $('#inv-due').value;
    if(!amount || !dueDate) { if(!amount) $('#inv-amount').classList.add('error'); if(!dueDate) $('#inv-due').classList.add('error'); return; }

    updateDB(data => {
      const num = data.invoices.length + 1;
      const id = `INV-${String(num).padStart(3,'0')}`;
      data.invoices.push({ id, clientId, amount, status:$('#inv-status').value, issuedDate:new Date().toISOString().split('T')[0], dueDate, paidDate:null });
      const client = data.clients.find(c=>c.id===clientId);
      data.activities.unshift({ id:uid(), type:'invoice', description:`Invoice #${id} sent to`, clientName:client?.businessName||client?.name||'', clientId, timestamp:new Date().toISOString() });
    });
    closeDrawer();
    renderPage();
  };

  $('#drawer-overlay').classList.add('open');
  $('#client-drawer').classList.add('open');
}


// ═══════════════════════════════════════════
// PAGE: PENDING BILLS
// ═══════════════════════════════════════════
function renderPendingBills(container) {
  const db = getDB();
  const pending = db.invoices.filter(i => ['Sent','Pending','Overdue'].includes(i.status)).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  const totalDue = pending.reduce((a,i)=>a+i.amount,0);
  const overdueCount = pending.filter(i=>i.status==='Overdue').length;

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Pending Bills <span class="count-badge" style="background:var(--red-dim);color:var(--red)">${pending.length}</span></h1><div class="subtitle">Outstanding payments requiring action</div></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Total Due</div><div class="stat-value money-red">${formatCurrency(totalDue)}</div></div>
      <div class="stat-card"><div class="stat-label">Overdue</div><div class="stat-value money-red">${overdueCount}</div></div>
      <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value money-amber">${pending.length - overdueCount}</div></div>
    </div>

    <div class="card animate-fadeInUp stagger-2">
      <div class="card-body no-pad">
        ${pending.length === 0 ? '<div class="empty-state"><div class="empty-icon"><i data-lucide="circle-check"></i></div><h3>All clear!</h3><p>No pending bills</p></div>' :
        `<table class="data-table"><thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Status</th><th>Due Date</th><th>Days</th><th>Actions</th></tr></thead>
        <tbody>
          ${pending.map(inv => {
            const client = db.clients.find(c=>c.id===inv.clientId);
            const days = daysUntil(inv.dueDate);
            return `<tr>
              <td style="font-family:var(--font-mono);font-size:12px">${inv.id}</td>
              <td>${client?`<div class="client-cell"><div class="avatar avatar-sm" style="background:${getAvatarColor(client.name)}">${getInitials(client.name)}</div><span>${client.name}</span></div>`:inv.clientId}</td>
              <td class="money money-red">${formatCurrency(inv.amount)}</td>
              <td><span class="badge badge-${inv.status.toLowerCase()}"><span class="badge-dot"></span>${inv.status}</span></td>
              <td>${formatDate(inv.dueDate)}</td>
              <td><span style="color:${days<0?'var(--red)':days<7?'var(--amber)':'var(--text-secondary)'};font-weight:500;font-family:var(--font-mono)">${days<0?Math.abs(days)+' overdue':days+' left'}</span></td>
              <td><div class="action-btns">
                <button class="btn btn-primary btn-sm" onclick="markInvoicePaid('${inv.id}')">Mark Paid</button>
              </div></td>
            </tr>`;
          }).join('')}
        </tbody></table>`}
      </div>
    </div>
  `;
  refreshIcons();
}


// ═══════════════════════════════════════════
// PAGE: EMPLOYEES
// ═══════════════════════════════════════════
function renderEmployees(container) {
  const db = getDB();

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Employees <span class="count-badge">${db.employees.length}</span></h1><div class="subtitle">Team management</div></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="openEmployeeForm()"><i data-lucide="plus"></i> Add Employee</button></div>
    </div>

    <div class="card animate-fadeInUp stagger-1">
      <div class="card-body no-pad">
        <table class="data-table"><thead><tr><th>Employee</th><th>Role</th><th>Email</th><th>Phone</th><th>Salary</th><th>Joined</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${db.employees.map(emp => `<tr>
            <td><div class="client-cell"><div class="avatar avatar-sm" style="background:${getAvatarColor(emp.name)}">${getInitials(emp.name)}</div><span class="client-name">${emp.name}</span></div></td>
            <td><span class="type-badge">${emp.role}</span></td>
            <td style="font-size:12px;color:var(--text-secondary)">${emp.email}</td>
            <td style="font-size:12px;color:var(--text-muted)">${emp.phone}</td>
            <td class="money">${emp.salary>0?formatCurrency(emp.salary):'—'}</td>
            <td>${formatDate(emp.joinDate)}</td>
            <td><span class="badge badge-active"><span class="badge-dot"></span>${emp.status}</span></td>
            <td><button class="action-btn danger" onclick="deleteEmployee('${emp.id}')"><i data-lucide="trash-2"></i></button></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </div>
  `;
  refreshIcons();
}

function openEmployeeForm() {
  $('#drawer-title').textContent = 'Add Employee';
  $('#drawer-save').textContent = 'Save Employee';
  const body = $('#drawer-body');
  body.innerHTML = `
    <div class="form-section">
      <div class="form-section-title">Employee Details</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Name <span class="required">*</span></label><input class="form-input" id="emp-name"></div>
        <div class="form-group"><label class="form-label">Role <span class="required">*</span></label><input class="form-input" id="emp-role"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="emp-email" type="email"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="emp-phone" type="tel"></div>
        <div class="form-group"><label class="form-label">Monthly Salary (₹)</label><input class="form-input" id="emp-salary" type="number" value="0"></div>
        <div class="form-group"><label class="form-label">Join Date</label><input class="form-input" id="emp-joindate" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
      </div>
    </div>
  `;
  $('#drawer-save').onclick = () => {
    const name = $('#emp-name').value.trim();
    const role = $('#emp-role').value.trim();
    if(!name||!role) { if(!name) $('#emp-name').classList.add('error'); if(!role) $('#emp-role').classList.add('error'); return; }
    updateDB(data => {
      data.employees.push({ id:uid(), name, role, email:$('#emp-email').value.trim(), phone:$('#emp-phone').value.trim(), salary:Number($('#emp-salary').value)||0, joinDate:$('#emp-joindate').value, status:'Active' });
    });
    closeDrawer(); renderPage();
  };
  $('#drawer-overlay').classList.add('open');
  $('#client-drawer').classList.add('open');
}

function deleteEmployee(id) {
  updateDB(data => { data.employees = data.employees.filter(e=>e.id!==id); });
  renderPage();
}


// ═══════════════════════════════════════════
// PAGE: SALARIES
// ═══════════════════════════════════════════
function renderSalaries(container) {
  const db = getDB();
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const totalMonthly = db.employees.reduce((a,e)=>a+e.salary,0);

  const grouped = {};
  db.salaries.forEach(s => {
    const key = `${s.year}-${String(s.month+1).padStart(2,'0')}`;
    if(!grouped[key]) grouped[key] = { salaries:[], total:0, label:`${monthNames[s.month]} ${s.year}` };
    const emp = db.employees.find(e=>e.id===s.employeeId);
    grouped[key].salaries.push({ ...s, empName: emp?.name||'Unknown' });
    grouped[key].total += s.amount;
  });

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Salaries</h1><div class="subtitle">Payroll management</div></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="processPayroll()">Process Payroll</button></div>
    </div>

    <div class="stat-row animate-fadeInUp stagger-1">
      <div class="stat-card"><div class="stat-label">Monthly Payroll</div><div class="stat-value">${formatCurrency(totalMonthly)}</div></div>
      <div class="stat-card"><div class="stat-label">Employees</div><div class="stat-value">${db.employees.filter(e=>e.salary>0).length}</div></div>
      <div class="stat-card"><div class="stat-label">Total Disbursed</div><div class="stat-value money-green">${formatCurrency(db.salaries.reduce((a,s)=>a+s.amount,0))}</div></div>
    </div>

    ${Object.entries(grouped).sort((a,b)=>b[0].localeCompare(a[0])).map(([key, g]) => `
      <div class="card animate-fadeInUp" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">${g.label}</span><span class="count-badge">${formatCurrency(g.total)}</span></div>
        <div class="card-body no-pad">
          <table class="data-table"><thead><tr><th>Employee</th><th>Amount</th><th>Status</th><th>Paid Date</th></tr></thead>
          <tbody>
            ${g.salaries.map(s => `<tr>
              <td>${s.empName}</td>
              <td class="money">${formatCurrency(s.amount)}</td>
              <td><span class="badge badge-${s.status.toLowerCase()}"><span class="badge-dot"></span>${s.status}</span></td>
              <td>${formatDate(s.paidDate)}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>
      </div>
    `).join('')}

    ${Object.keys(grouped).length === 0 ? '<div class="card"><div class="card-body"><div class="empty-state"><div class="empty-icon"><i data-lucide="wallet"></i></div><h3>No salary records</h3><p>Process payroll to create records</p></div></div></div>' : ''}
  `;
  refreshIcons();
}

function processPayroll() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  updateDB(data => {
    const empWithSalary = data.employees.filter(e => e.salary > 0);
    const existing = data.salaries.filter(s => s.month === month && s.year === year);
    if(existing.length >= empWithSalary.length) { alert('Payroll already processed for this month!'); return; }

    empWithSalary.forEach(emp => {
      const already = data.salaries.find(s => s.employeeId===emp.id && s.month===month && s.year===year);
      if(!already) {
        data.salaries.push({ id:uid(), employeeId:emp.id, month, year, amount:emp.salary, status:'Paid', paidDate:now.toISOString().split('T')[0] });
      }
    });
  });
  renderPage();
}


// ═══════════════════════════════════════════
// PAGE: SETTINGS
// ═══════════════════════════════════════════
function renderSettings(container) {
  const db = getDB();

  container.innerHTML = `
    <div class="page-header animate-fadeInUp">
      <div class="page-header-left"><h1>Settings</h1><div class="subtitle">Application preferences</div></div>
    </div>

    <div class="card animate-fadeInUp stagger-1" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">Company Profile</span></div>
      <div class="card-body">
        <div class="settings-grid">
          <div class="form-group"><label class="form-label">Company Name</label><input class="form-input" id="s-company" value="${db.settings.companyName}"></div>
          <div class="form-group"><label class="form-label">Currency Symbol</label><input class="form-input" id="s-currency" value="${db.settings.currency}"></div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="saveSettings()">Save Settings</button>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-2" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">Data Management</span></div>
      <div class="card-body">
        <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Export or import your CRM data. Data is stored locally in your browser.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-secondary" onclick="exportData()"><i data-lucide="download"></i> Export Data (JSON)</button>
          <label class="btn btn-secondary" style="cursor:pointer"><i data-lucide="upload"></i> Import Data <input type="file" accept=".json" style="display:none" onchange="importData(event)"></label>
          <button class="btn btn-danger" onclick="confirmResetData()"><i data-lucide="trash-2"></i> Reset All Data</button>
        </div>
      </div>
    </div>

    <div class="card animate-fadeInUp stagger-3">
      <div class="card-header"><span class="card-title">About</span></div>
      <div class="card-body">
        <div class="detail-row"><span class="label">System</span><span class="value">Rostra CRM v1.0</span></div>
        <div class="detail-row"><span class="label">Data Storage</span><span class="value">LocalStorage</span></div>
        <div class="detail-row"><span class="label">Last Updated</span><span class="value">${formatDate(db.lastUpdated)}</span></div>
        <div class="detail-row"><span class="label">Total Records</span><span class="value">${db.clients.length} clients, ${db.invoices.length} invoices, ${db.expenses.length} expenses</span></div>
      </div>
    </div>
  `;
  refreshIcons();
}

function saveSettings() {
  updateDB(data => {
    data.settings.companyName = $('#s-company').value.trim();
    data.settings.currency = $('#s-currency').value.trim();
  });
  alert('Settings saved!');
}

function exportData() {
  const db = getDB();
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rostra-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if(data.clients && data.invoices) {
        saveData(data);
        buildSidebar();
        renderPage();
        alert('Data imported successfully!');
      } else {
        alert('Invalid data format');
      }
    } catch(err) { alert('Error reading file: ' + err.message); }
  };
  reader.readAsText(file);
}

function confirmResetData() {
  $('#confirm-title').textContent = 'Reset All Data?';
  $('#confirm-message').textContent = 'This will delete ALL your CRM data and restore sample data. This cannot be undone.';
  $('#confirm-ok').textContent = 'Reset';
  $('#confirm-ok').className = 'btn btn-danger';
  $('#confirm-ok').onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    closeConfirm();
    buildSidebar();
    renderPage();
  };
  $('#confirm-dialog').classList.add('open');
}


// ─── Global exports ───
window.navigate = navigate;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.confirmDeleteClient = confirmDeleteClient;
window.closeConfirm = closeConfirm;
window.quickUpdateClient = quickUpdateClient;
window.saveClientNotes = saveClientNotes;
window.markInvoicePaid = markInvoicePaid;
window.openExpenseForm = openExpenseForm;
window.deleteExpense = deleteExpense;
window.openEmployeeForm = openEmployeeForm;
window.deleteEmployee = deleteEmployee;
window.processPayroll = processPayroll;
window.openInvoiceForm = openInvoiceForm;
window.saveSettings = saveSettings;
window.exportData = exportData;
window.importData = importData;
window.confirmResetData = confirmResetData;

// ─── BOOT ───
document.addEventListener('DOMContentLoaded', init);
