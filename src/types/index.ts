export interface CoverConfig {
  backgroundImage: string;
  backgroundColor: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingVenue: string;
  titleFont: string;
  titleColor: string;
  subtitleColor: string;
  textAlign: "left" | "center" | "right";
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  order: number;
}

export interface ContentConfig {
  invitationText: string;
  loveStory: string;
  timeline: TimelineItem[];
}

export type RsvpStatus = "pending" | "confirmed" | "declined";

export interface Guest {
  id: string;
  name: string;
  phone: string;
  group: string;
  tableNumber: number | null;
  seatNumber: number | null;
  rsvpStatus: RsvpStatus;
  dietary: string;
  plusOnes: number;
}

export interface Table {
  id: string;
  tableNumber: number;
  tableName: string;
  seatCount: number;
}

export type RsvpFieldType = "text" | "select" | "checkbox" | "textarea";

export interface RsvpField {
  id: string;
  label: string;
  type: RsvpFieldType;
  required: boolean;
  options: string[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  section: string;
  resolved: boolean;
}

export interface WeddingInvitation {
  id: string;
  cover: CoverConfig;
  content: ContentConfig;
  guests: Guest[];
  tables: Table[];
  rsvpFields: RsvpField[];
  comments: Comment[];
  publishedVersion: number;
  draftVersion: number;
  lastUpdated: string;
}

export type EditorTab =
  | "cover"
  | "content"
  | "guests"
  | "seating"
  | "rsvp";

export type PreviewMode = "mobile" | "print";

export type UserRole = "editor" | "collaborator";
