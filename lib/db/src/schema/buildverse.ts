import { boolean, integer, jsonb, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const id = () => serial("id").primaryKey();
const createdAt = () => timestamp("created_at").defaultNow().notNull();

export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  country: text("country"),
  city: text("city"),
  createdAt: createdAt(),
});

export const companies = pgTable("companies", {
  id: id(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  services: jsonb("services").$type<string[]>().notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: createdAt(),
});

export const professionalProfiles = pgTable("professional_profiles", {
  id: id(),
  userId: integer("user_id"),
  category: text("category").notNull(),
  specialization: text("specialization").notNull(),
  experience: integer("experience").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  verificationStatus: text("verification_status").notNull(),
  createdAt: createdAt(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: id(),
  profileId: integer("profile_id"),
  name: text("name").notNull(),
  projectType: text("project_type").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  area: numeric("area").notNull(),
  year: integer("year").notNull(),
  services: jsonb("services").$type<string[]>().notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const projects = pgTable("projects", {
  id: id(),
  clientId: integer("client_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  region: text("region"),
  projectType: text("project_type").notNull(),
  area: numeric("area").notNull(),
  budget: numeric("budget").notNull(),
  currency: text("currency").notNull(),
  timeline: text("timeline").notNull(),
  requiredServices: jsonb("required_services").$type<string[]>().notNull(),
  status: text("status").notNull(),
  createdAt: createdAt(),
});

export const matches = pgTable("matches", {
  id: id(),
  projectId: integer("project_id"),
  professionalId: integer("professional_id"),
  score: integer("score").notNull(),
  reasons: jsonb("reasons").$type<string[]>().notNull(),
});

export const proposals = pgTable("proposals", {
  id: id(),
  projectId: integer("project_id"),
  professionalId: integer("professional_id"),
  fee: numeric("fee").notNull(),
  currency: text("currency").notNull(),
  timeline: text("timeline").notNull(),
  scope: text("scope").notNull(),
  deliverables: jsonb("deliverables").$type<string[]>().notNull(),
  message: text("message").notNull(),
  status: text("status").notNull(),
  createdAt: createdAt(),
});

export const shortlists = pgTable("shortlists", {
  id: id(),
  projectId: integer("project_id"),
  professionalId: integer("professional_id"),
  createdAt: createdAt(),
});

export const contracts = pgTable("contracts", {
  id: id(),
  projectId: integer("project_id"),
  proposalId: integer("proposal_id"),
  clientId: integer("client_id"),
  professionalId: integer("professional_id"),
  fee: numeric("fee").notNull(),
  currency: text("currency").notNull(),
  scope: text("scope").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: text("status").notNull(),
});

export const milestones = pgTable("milestones", {
  id: id(),
  projectId: integer("project_id"),
  title: text("title").notNull(),
  dueDate: text("due_date").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(),
});

export const tasks = pgTable("tasks", {
  id: id(),
  projectId: integer("project_id"),
  title: text("title").notNull(),
  assignee: text("assignee").notNull(),
  dueDate: text("due_date").notNull(),
  status: text("status").notNull(),
});

export const conversations = pgTable("conversations", {
  id: id(),
  projectId: integer("project_id"),
  createdAt: createdAt(),
});

export const messages = pgTable("messages", {
  id: id(),
  conversationId: integer("conversation_id"),
  senderId: integer("sender_id"),
  text: text("text").notNull(),
  createdAt: createdAt(),
});

export const reviews = pgTable("reviews", {
  id: id(),
  projectId: integer("project_id"),
  reviewerId: integer("reviewer_id"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: createdAt(),
});

export const notifications = pgTable("notifications", {
  id: id(),
  userId: integer("user_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  kind: text("kind").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: createdAt(),
});

export const auditLogs = pgTable("audit_logs", {
  id: id(),
  actorId: integer("actor_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  createdAt: createdAt(),
});