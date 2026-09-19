import { Router, type IRouter } from "express";
import {
  ActionProposalBody,
  CreateMilestoneBody,
  CreateProjectBody,
  CreateProposalBody,
  CreateReviewBody,
  CreateTaskBody,
  GetProfessionalParams,
  GetProjectParams,
  GetWorkspaceParams,
  ListCompaniesQueryParams,
  ListProfessionalsQueryParams,
  ListProjectsQueryParams,
  SendMessageBody,
} from "@workspace/api-zod";

type Professional = {
  id: string;
  name: string;
  category: string;
  specialization: string;
  country: string;
  city: string;
  experience: number;
  portfolioCount: number;
  completedProjects: number;
  trustScore: number;
  verificationStatus: string;
  availability: string;
  avatar: string;
  bio?: string;
  services?: string[];
  portfolio?: PortfolioProject[];
};

type PortfolioProject = {
  id: string;
  name: string;
  projectType: string;
  country: string;
  city: string;
  area: number;
  year: number;
  services: string[];
  description: string;
  image: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  region: string | null;
  projectType: string;
  area: number;
  budget: number;
  currency: string;
  timeline: string;
  requiredServices: string[];
  status: string;
  createdAt: string;
  matchCount: number;
  clientName: string;
};

type Proposal = {
  id: string;
  projectId: string;
  projectTitle: string;
  professionalId: string;
  professionalName: string;
  fee: number;
  currency: string;
  timeline: string;
  scope: string;
  deliverables: string[];
  message: string;
  status: string;
  createdAt: string;
};

type Contract = {
  id: string;
  projectId: string;
  projectTitle: string;
  clientName: string;
  professionalName: string;
  fee: number;
  currency: string;
  scope: string;
  startDate: string;
  endDate: string;
  status: string;
};

type Task = { id: string; title: string; assignee: string; dueDate: string; status: string };
type Milestone = { id: string; title: string; dueDate: string; amount: number; currency: string; status: string };
type Message = { id: string; sender: string; text: string; date: string };

const avatar = (initials: string) =>
  `https://images.unsplash.com/photo-${initials}?auto=format&fit=crop&w=160&q=80`;

const professionals: Professional[] = [
  {
    id: "pro-01",
    name: "Maya Chen",
    category: "ARCHITECT",
    specialization: "Sustainable residential design",
    country: "Singapore",
    city: "Singapore",
    experience: 12,
    portfolioCount: 24,
    completedProjects: 31,
    trustScore: 96,
    verificationStatus: "VERIFIED",
    availability: "Available",
    avatar: avatar("1500648767791-00dcc994a43e"),
    bio: "Architect focused on low-impact homes, passive design, and spaces that age beautifully.",
    services: ["Architecture", "Interior Design", "BIM Coordination"],
    portfolio: [
      {
        id: "portfolio-01",
        name: "Courtyard House",
        projectType: "Residential",
        country: "Singapore",
        city: "Singapore",
        area: 320,
        year: 2024,
        services: ["Architecture", "Interior Design"],
        description: "A shaded family home organized around a planted central courtyard.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "portfolio-02",
        name: "North Shore Villa",
        projectType: "Villa",
        country: "Malaysia",
        city: "Kuala Lumpur",
        area: 540,
        year: 2023,
        services: ["Architecture", "BIM"],
        description: "Tropical modern villa with deep overhangs and naturally ventilated rooms.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "pro-02",
    name: "Lucas Moreau",
    category: "INTERIOR_DESIGNER",
    specialization: "Hospitality and boutique retail",
    country: "France",
    city: "Paris",
    experience: 9,
    portfolioCount: 18,
    completedProjects: 22,
    trustScore: 93,
    verificationStatus: "VERIFIED",
    availability: "Available",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
    bio: "Interior designer shaping hospitality spaces with a strong sense of material and atmosphere.",
    services: ["Interior Design", "FF&E", "Brand Environments"],
    portfolio: [
      {
        id: "portfolio-03",
        name: "Rive Gauche Hotel",
        projectType: "Hotel",
        country: "France",
        city: "Paris",
        area: 2300,
        year: 2024,
        services: ["Interior Design", "FF&E"],
        description: "A quiet, tactile hotel renovation in a historic Parisian building.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "pro-03",
    name: "Amaka Okafor",
    category: "ENGINEER",
    specialization: "Structural engineering and retrofit",
    country: "Nigeria",
    city: "Lagos",
    experience: 14,
    portfolioCount: 16,
    completedProjects: 45,
    trustScore: 98,
    verificationStatus: "VERIFIED",
    availability: "Busy until Oct",
    avatar: avatar("1531123897727-8f129e1688ce"),
    bio: "Structural engineer delivering practical, resilient solutions for complex urban projects.",
    services: ["Structural Engineering", "Retrofit", "Site Review"],
    portfolio: [],
  },
  {
    id: "pro-04",
    name: "Diego Alvarez",
    category: "BIM_SPECIALIST",
    specialization: "BIM coordination and digital twins",
    country: "Spain",
    city: "Barcelona",
    experience: 8,
    portfolioCount: 11,
    completedProjects: 19,
    trustScore: 91,
    verificationStatus: "VERIFIED",
    availability: "Available",
    avatar: avatar("1500648767791-00dcc994a43e"),
    bio: "BIM specialist helping teams coordinate faster and make better decisions before site work begins.",
    services: ["BIM", "Revit", "Clash Detection"],
    portfolio: [],
  },
  {
    id: "pro-05",
    name: "Aisha Rahman",
    category: "ARCHITECT",
    specialization: "Commercial and workplace architecture",
    country: "United Arab Emirates",
    city: "Dubai",
    experience: 11,
    portfolioCount: 21,
    completedProjects: 28,
    trustScore: 95,
    verificationStatus: "VERIFIED",
    availability: "Available",
    avatar: avatar("1494790108377-be9c29b29330"),
    bio: "Architect creating high-performing workplaces and mixed-use environments across the Gulf.",
    services: ["Architecture", "Workplace Strategy", "Visualization"],
    portfolio: [],
  },
  {
    id: "pro-06",
    name: "Jon Bell",
    category: "CONTRACTOR",
    specialization: "Residential construction and renovation",
    country: "United Kingdom",
    city: "London",
    experience: 16,
    portfolioCount: 30,
    completedProjects: 52,
    trustScore: 97,
    verificationStatus: "VERIFIED",
    availability: "Available",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
    bio: "Construction partner for thoughtful renovations, from first survey to final handover.",
    services: ["Construction", "Renovation", "Project Management"],
    portfolio: [],
  },
];

const projects: Project[] = [
  {
    id: "project-01",
    title: "Courtyard House in Bukit Timah",
    description: "We are looking for an architecture partner to shape a 320 sqm family home with a planted courtyard, passive cooling, and a calm material palette.",
    country: "Singapore",
    city: "Singapore",
    region: "Central Region",
    projectType: "Residential",
    area: 320,
    budget: 180000,
    currency: "USD",
    timeline: "6–9 months",
    requiredServices: ["Architecture", "Interior Design"],
    status: "PUBLISHED",
    createdAt: "2026-08-28T09:00:00.000Z",
    matchCount: 4,
    clientName: "Demo Client",
  },
  {
    id: "project-02",
    title: "Flagship Workspace, Downtown Dubai",
    description: "A 1,200 sqm headquarters that brings hospitality-level warmth to a growing technology company.",
    country: "United Arab Emirates",
    city: "Dubai",
    region: null,
    projectType: "Office",
    area: 1200,
    budget: 420000,
    currency: "USD",
    timeline: "8–12 months",
    requiredServices: ["Architecture", "Interior Design", "Visualization"],
    status: "PUBLISHED",
    createdAt: "2026-08-21T09:00:00.000Z",
    matchCount: 3,
    clientName: "Demo Client",
  },
  {
    id: "project-03",
    title: "Riverside Boutique Hotel",
    description: "A 42-key adaptive reuse project seeking hospitality design leadership and FF&E documentation.",
    country: "France",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    projectType: "Hotel",
    area: 2300,
    budget: 650000,
    currency: "EUR",
    timeline: "12–18 months",
    requiredServices: ["Interior Design", "Consultant"],
    status: "PUBLISHED",
    createdAt: "2026-08-17T09:00:00.000Z",
    matchCount: 2,
    clientName: "Demo Client",
  },
  {
    id: "project-04",
    title: "West London Victorian Renovation",
    description: "Full renovation of a 190 sqm terraced home, including kitchen extension, interiors, and construction delivery.",
    country: "United Kingdom",
    city: "London",
    region: "Greater London",
    projectType: "Renovation",
    area: 190,
    budget: 260000,
    currency: "GBP",
    timeline: "5–7 months",
    requiredServices: ["Architecture", "Construction"],
    status: "IN_PROGRESS",
    createdAt: "2026-07-30T09:00:00.000Z",
    matchCount: 3,
    clientName: "Demo Client",
  },
  {
    id: "project-05",
    title: "Lagos Waterfront Mixed-Use Study",
    description: "Early-stage feasibility and structural concept for a mixed-use waterfront development.",
    country: "Nigeria",
    city: "Lagos",
    region: null,
    projectType: "Commercial",
    area: 6800,
    budget: 90000,
    currency: "USD",
    timeline: "10–14 weeks",
    requiredServices: ["Structural Engineering", "Architecture"],
    status: "PUBLISHED",
    createdAt: "2026-08-11T09:00:00.000Z",
    matchCount: 2,
    clientName: "Demo Client",
  },
];

const proposals: Proposal[] = [
  {
    id: "proposal-01",
    projectId: "project-01",
    projectTitle: "Courtyard House in Bukit Timah",
    professionalId: "pro-01",
    professionalName: "Maya Chen",
    fee: 128000,
    currency: "USD",
    timeline: "28 weeks",
    scope: "Concept through construction documentation with interior design coordination.",
    deliverables: ["Concept design", "Planning package", "Construction set", "BIM model"],
    message: "Your brief aligns closely with the way we work: climate-first, quietly detailed, and built for everyday life.",
    status: "SHORTLISTED",
    createdAt: "2026-08-29T11:30:00.000Z",
  },
  {
    id: "proposal-02",
    projectId: "project-01",
    projectTitle: "Courtyard House in Bukit Timah",
    professionalId: "pro-04",
    professionalName: "Diego Alvarez",
    fee: 82000,
    currency: "USD",
    timeline: "20 weeks",
    scope: "Full BIM coordination and design documentation support.",
    deliverables: ["Revit model", "Clash detection", "Drawing coordination"],
    message: "I can give your design team a dependable digital model and a clear path to site.",
    status: "SUBMITTED",
    createdAt: "2026-08-30T08:20:00.000Z",
  },
  {
    id: "proposal-03",
    projectId: "project-02",
    projectTitle: "Flagship Workspace, Downtown Dubai",
    professionalId: "pro-05",
    professionalName: "Aisha Rahman",
    fee: 210000,
    currency: "USD",
    timeline: "32 weeks",
    scope: "Workplace strategy, architecture, approvals, and visualization.",
    deliverables: ["Test fit", "Design development", "Authority package", "3D views"],
    message: "We understand the speed and care a new headquarters demands.",
    status: "SUBMITTED",
    createdAt: "2026-08-25T14:10:00.000Z",
  },
];

const contracts: Contract[] = [
  {
    id: "contract-01",
    projectId: "project-04",
    projectTitle: "West London Victorian Renovation",
    clientName: "Demo Client",
    professionalName: "Jon Bell",
    fee: 225000,
    currency: "GBP",
    scope: "Construction delivery, procurement coordination, and handover.",
    startDate: "2026-08-05",
    endDate: "2027-02-05",
    status: "ACTIVE",
  },
];

const workspaceByProject = new Map<string, { tasks: Task[]; milestones: Milestone[]; messages: Message[] }>([
  [
    "project-04",
    {
      tasks: [
        { id: "task-01", title: "Approve kitchen joinery samples", assignee: "Demo Client", dueDate: "2026-09-09", status: "IN_PROGRESS" },
        { id: "task-02", title: "Submit demolition method statement", assignee: "Jon Bell", dueDate: "2026-09-12", status: "TODO" },
        { id: "task-03", title: "Confirm lighting schedule", assignee: "Demo Client", dueDate: "2026-08-29", status: "DONE" },
      ],
      milestones: [
        { id: "milestone-01", title: "Construction mobilization", dueDate: "2026-09-15", amount: 45000, currency: "GBP", status: "IN_PROGRESS" },
        { id: "milestone-02", title: "First fix complete", dueDate: "2026-11-03", amount: 60000, currency: "GBP", status: "PENDING" },
      ],
      messages: [
        { id: "message-01", sender: "Jon Bell", text: "The site team is ready to start once the joinery samples are approved.", date: "2026-09-02T10:12:00.000Z" },
        { id: "message-02", sender: "Demo Client", text: "Thanks Jon — I’ll review them this afternoon.", date: "2026-09-02T12:40:00.000Z" },
      ],
    },
  ],
]);

const notifications = [
  { id: "notification-01", title: "New match found", description: "Maya Chen is a 95% match for your courtyard house.", date: "2h ago", read: false, kind: "MATCH" },
  { id: "notification-02", title: "Proposal shortlisted", description: "Your proposal for the Victorian renovation was shortlisted.", date: "Yesterday", read: false, kind: "SHORTLISTED" },
  { id: "notification-03", title: "Milestone due soon", description: "Construction mobilization is due in 11 days.", date: "2d ago", read: true, kind: "MILESTONE" },
];

const now = () => new Date().toISOString();
const nextId = (prefix: string) => `${prefix}-${Date.now()}`;

function projectMatches(project: Project) {
  return professionals
    .map((professional) => {
      let score = 0;
      const reasons: string[] = [];
      if (professional.category === "ARCHITECT" && project.requiredServices.includes("Architecture")) {
        score += 25;
        reasons.push("Strong project-type experience");
      } else if (project.requiredServices.some((service) => professional.services?.includes(service))) {
        score += 25;
        reasons.push("Strong project-type experience");
      }
      if (professional.country === project.country || professional.city === project.city) {
        score += 20;
        reasons.push("Location match");
      }
      if (project.requiredServices.some((service) =>
        professional.services?.some((item) => item.toLowerCase().includes(service.toLowerCase().split(" ")[0])),
      )) {
        score += 20;
        reasons.push("Relevant specialization");
      }
      if (professional.experience >= 8) {
        score += 15;
        reasons.push("Experienced delivery partner");
      }
      if (professional.portfolioCount > 0) {
        score += 10;
        reasons.push("Relevant portfolio");
      }
      if (professional.availability.toLowerCase().includes("available")) {
        score += 10;
        reasons.push("Currently available");
      }
      return {
        id: `match-${project.id}-${professional.id}`,
        professional,
        score,
        reasons,
      };
    })
    .filter((match) => match.score >= 45)
    .sort((a, b) => b.score - a.score);
}

function detailProfessional(professional: Professional) {
  return {
    ...professional,
    bio: professional.bio ?? "A trusted built-environment specialist with a collaborative, delivery-focused practice.",
    services: professional.services ?? [professional.category.replaceAll("_", " ")],
    portfolio: professional.portfolio ?? [],
  };
}

function workspace(projectId: string) {
  const existing = workspaceByProject.get(projectId);
  if (existing) return existing;
  const project = projects.find((item) => item.id === projectId);
  const contract = contracts.find((item) => item.projectId === projectId);
  if (!project || !contract) return null;
  const created = { tasks: [], milestones: [], messages: [] };
  workspaceByProject.set(projectId, created);
  return created;
}

const router: IRouter = Router();

router.get("/dashboard", (_req, res) => {
  res.json({
    role: "CLIENT",
    stats: { activeProjects: projects.filter((project) => project.status === "IN_PROGRESS").length + 2, proposals: proposals.length, matches: 12, unreadMessages: 3 },
    recentActivity: [
      { id: "activity-01", title: "New match found", description: "Maya Chen matches your courtyard house brief.", date: "2h ago", kind: "MATCH" },
      { id: "activity-02", title: "Proposal shortlisted", description: "Jon Bell is ready to discuss the next milestone.", date: "Yesterday", kind: "PROPOSAL" },
      { id: "activity-03", title: "Workspace updated", description: "A new task was added to Victorian Renovation.", date: "2d ago", kind: "WORKSPACE" },
    ],
    featuredProjects: projects.slice(0, 3),
    featuredProfessionals: professionals.slice(0, 4).map(detailProfessional),
  });
});

router.get("/projects", (req, res) => {
  const parsed = ListProjectsQueryParams.safeParse(req.query);
  const query = parsed.success ? parsed.data : {};
  const search = query.search?.toLowerCase();
  res.json(projects.filter((project) =>
    (!query.country || project.country === query.country) &&
    (!query.city || project.city.toLowerCase().includes(query.city.toLowerCase())) &&
    (!query.projectType || project.projectType === query.projectType) &&
    (!search || `${project.title} ${project.description} ${project.city}`.toLowerCase().includes(search)),
  ).map((project) => ({ ...project, matchCount: projectMatches(project).length })));
});

router.post("/projects", (req, res) => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Please complete all required project fields." });
  const input = parsed.data;
  const project: Project = {
    ...input,
    id: nextId("project"),
    region: input.region ?? null,
    status: "PUBLISHED",
    createdAt: now(),
    matchCount: 0,
    clientName: "Demo Client",
  };
  project.matchCount = projectMatches(project).length;
  projects.unshift(project);
  notifications.unshift({ id: nextId("notification"), title: "Project published", description: `${project.title} is now visible to matched professionals.`, date: "Just now", read: false, kind: "PROJECT" });
  return res.status(201).json(project);
});

router.get("/projects/:id", (req, res) => {
  const params = GetProjectParams.safeParse(req.params);
  const project = params.success ? projects.find((item) => item.id === params.data.id) : undefined;
  if (!project) return res.status(404).json({ error: "Project not found." });
  return res.json({
    ...project,
    matchCount: projectMatches(project).length,
    matches: projectMatches(project),
    proposals: proposals.filter((proposal) => proposal.projectId === project.id),
  });
});

router.get("/professionals", (req, res) => {
  const parsed = ListProfessionalsQueryParams.safeParse(req.query);
  const query = parsed.success ? parsed.data : {};
  const search = query.search?.toLowerCase();
  res.json(professionals.filter((professional) =>
    (!query.country || professional.country === query.country) &&
    (!query.city || professional.city.toLowerCase().includes(query.city.toLowerCase())) &&
    (!query.category || professional.category === query.category) &&
    (!search || `${professional.name} ${professional.category} ${professional.specialization}`.toLowerCase().includes(search)),
  ).map(detailProfessional));
});

router.get("/professionals/:id", (req, res) => {
  const params = GetProfessionalParams.safeParse(req.params);
  const professional = params.success ? professionals.find((item) => item.id === params.data.id) : undefined;
  if (!professional) return res.status(404).json({ error: "Professional not found." });
  return res.json(detailProfessional(professional));
});

router.get("/companies", (req, res) => {
  const parsed = ListCompaniesQueryParams.safeParse(req.query);
  const query = parsed.success ? parsed.data : {};
  const companies = [
    { id: "company-01", name: "Northline Studio", location: "Singapore · Kuala Lumpur", services: ["Architecture", "Interior Design"], projectCount: 18, verified: true, avatar: "NS" },
    { id: "company-02", name: "Atelier Forme", location: "Paris · Lyon", services: ["Interior Design", "Hospitality"], projectCount: 26, verified: true, avatar: "AF" },
    { id: "company-03", name: "Civic Works Collective", location: "London · Manchester", services: ["Construction", "Renovation"], projectCount: 42, verified: false, avatar: "CW" },
    { id: "company-04", name: "Axis Build Group", location: "Dubai · Abu Dhabi", services: ["Engineering", "Construction"], projectCount: 31, verified: true, avatar: "AB" },
    { id: "company-05", name: "Studio Baobab", location: "Lagos · Accra", services: ["Architecture", "Consulting"], projectCount: 14, verified: true, avatar: "SB" },
  ];
  const search = query.search?.toLowerCase();
  return res.json(companies.filter((company) => !search || `${company.name} ${company.location} ${company.services.join(" ")}`.toLowerCase().includes(search)));
});

router.get("/proposals", (_req, res) => res.json(proposals));

router.post("/projects/:id/proposals", (req, res) => {
  const projectId = req.params.id;
  const parsed = CreateProposalBody.safeParse(req.body);
  const project = projects.find((item) => item.id === projectId);
  if (!project) return res.status(404).json({ error: "Project not found." });
  if (!parsed.success) return res.status(400).json({ error: "Please complete the proposal fields." });
  const professional = professionals[3];
  const proposal: Proposal = {
    ...parsed.data,
    id: nextId("proposal"),
    projectId,
    projectTitle: project.title,
    professionalId: professional.id,
    professionalName: professional.name,
    status: "SUBMITTED",
    createdAt: now(),
  };
  proposals.unshift(proposal);
  notifications.unshift({ id: nextId("notification"), title: "New proposal received", description: `${proposal.professionalName} submitted a proposal for ${project.title}.`, date: "Just now", read: false, kind: "PROPOSAL" });
  return res.status(201).json(proposal);
});

router.post("/proposals/:id/action", (req, res) => {
  const parsed = ActionProposalBody.safeParse(req.body);
  const proposal = proposals.find((item) => item.id === req.params.id);
  if (!proposal) return res.status(404).json({ error: "Proposal not found." });
  if (!parsed.success) return res.status(400).json({ error: "Unsupported proposal action." });
  const actionStatus = { SHORTLIST: "SHORTLISTED", REJECT: "REJECTED", ACCEPT: "ACCEPTED" } as const;
  proposal.status = actionStatus[parsed.data.action as keyof typeof actionStatus] ?? proposal.status;
  let contract: Contract | null = null;
  if (parsed.data.action === "ACCEPT") {
    const project = projects.find((item) => item.id === proposal.projectId);
    if (project) {
      project.status = "IN_PROGRESS";
      contract = {
        id: nextId("contract"),
        projectId: project.id,
        projectTitle: project.title,
        clientName: project.clientName,
        professionalName: proposal.professionalName,
        fee: proposal.fee,
        currency: proposal.currency,
        scope: proposal.scope,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10),
        status: "ACTIVE",
      };
      contracts.unshift(contract);
      workspace(project.id);
      notifications.unshift({ id: nextId("notification"), title: "Contract created", description: `${proposal.professionalName} is now part of your project team.`, date: "Just now", read: false, kind: "CONTRACT" });
    }
  }
  return res.json({ proposal, contract });
});

router.get("/contracts", (_req, res) => res.json(contracts));

router.get("/workspace/:projectId", (req, res) => {
  const params = GetWorkspaceParams.safeParse(req.params);
  const project = params.success ? projects.find((item) => item.id === params.data.projectId) : undefined;
  const contract = params.success ? contracts.find((item) => item.projectId === params.data.projectId) : undefined;
  const data = params.success ? workspace(params.data.projectId) : null;
  if (!project || !contract || !data) return res.status(404).json({ error: "Workspace not found." });
  return res.json({
    project,
    contract,
    ...data,
    documents: [
      { id: "document-01", name: "Project brief.pdf", type: "PDF", date: "Aug 28, 2026" },
      { id: "document-02", name: "Site survey.dwg", type: "DWG", date: "Aug 30, 2026" },
    ],
  });
});

router.post("/workspace/:projectId/tasks", (req, res) => {
  const parsed = CreateTaskBody.safeParse(req.body);
  const data = workspace(req.params.projectId);
  if (!data) return res.status(404).json({ error: "Workspace not found." });
  if (!parsed.success) return res.status(400).json({ error: "Please provide a task title, assignee, and due date." });
  const task = { ...parsed.data, id: nextId("task"), status: "TODO" };
  data.tasks.unshift(task);
  return res.status(201).json(task);
});

router.post("/workspace/:projectId/milestones", (req, res) => {
  const parsed = CreateMilestoneBody.safeParse(req.body);
  const data = workspace(req.params.projectId);
  if (!data) return res.status(404).json({ error: "Workspace not found." });
  if (!parsed.success) return res.status(400).json({ error: "Please provide a milestone title, due date, and amount." });
  const milestone = { ...parsed.data, id: nextId("milestone"), status: "PENDING" };
  data.milestones.unshift(milestone);
  return res.status(201).json(milestone);
});

router.post("/workspace/:projectId/messages", (req, res) => {
  const parsed = SendMessageBody.safeParse(req.body);
  const data = workspace(req.params.projectId);
  if (!data) return res.status(404).json({ error: "Workspace not found." });
  if (!parsed.success) return res.status(400).json({ error: "Message cannot be empty." });
  const message = { ...parsed.data, id: nextId("message"), sender: "Demo Client", date: now() };
  data.messages.push(message);
  notifications.unshift({ id: nextId("notification"), title: "New message", description: "Your workspace message was sent.", date: "Just now", read: true, kind: "MESSAGE" });
  return res.status(201).json(message);
});

router.post("/workspace/:projectId/complete", (req, res) => {
  const project = projects.find((item) => item.id === req.params.projectId);
  if (!project) return res.status(404).json({ error: "Project not found." });
  project.status = "COMPLETED";
  const contract = contracts.find((item) => item.projectId === project.id);
  if (contract) contract.status = "COMPLETED";
  return res.json(project);
});

router.post("/reviews", (req, res) => {
  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Please provide a rating and review." });
  return res.status(201).json({ id: nextId("review"), ...parsed.data, createdAt: now() });
});

router.get("/notifications", (_req, res) => res.json(notifications));

export default router;