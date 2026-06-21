import { create } from "zustand";
import type {
  WeddingInvitation,
  CoverConfig,
  ContentConfig,
  Guest,
  Table,
  RsvpField,
  TimelineItem,
  Comment,
} from "@/types";
import { mockInvitation, mockComments } from "@/data/mockData";
import { generateId, saveToStorage, loadFromStorage } from "@/utils/helpers";

interface InvitationState {
  invitation: WeddingInvitation;
  isPublished: boolean;

  setCover: (cover: Partial<CoverConfig>) => void;
  setContent: (content: Partial<ContentConfig>) => void;
  addTimelineItem: (item: Omit<TimelineItem, "id">) => void;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => void;
  removeTimelineItem: (id: string) => void;

  addGuest: (guest: Omit<Guest, "id">) => void;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  removeGuest: (id: string) => void;

  addTable: (table: Omit<Table, "id">) => void;
  updateTable: (id: string, table: Partial<Table>) => void;
  removeTable: (id: string) => void;
  assignGuestToSeat: (
    guestId: string,
    tableNumber: number,
    seatNumber: number
  ) => void;
  unassignGuest: (guestId: string) => void;

  addRsvpField: (field: Omit<RsvpField, "id">) => void;
  updateRsvpField: (id: string, field: Partial<RsvpField>) => void;
  removeRsvpField: (id: string) => void;

  addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
  resolveComment: (id: string) => void;

  publish: () => void;
  resetToPublished: () => void;
}

const STORAGE_KEY = "wedding-invitation-data";

const loadInitialData = (): WeddingInvitation => {
  const stored = loadFromStorage<WeddingInvitation | null>(STORAGE_KEY, null);
  if (stored) {
    return stored;
  }
  return {
    ...mockInvitation,
    comments: mockComments,
  };
};

export const useInvitationStore = create<InvitationState>((set, get) => ({
  invitation: loadInitialData(),
  isPublished: true,

  setCover: (cover) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        cover: { ...state.invitation.cover, ...cover },
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  setContent: (content) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        content: { ...state.invitation.content, ...content },
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  addTimelineItem: (item) =>
    set((state) => {
      const newItem: TimelineItem = {
        ...item,
        id: generateId("tl"),
      };
      const updated = {
        ...state.invitation,
        content: {
          ...state.invitation.content,
          timeline: [...state.invitation.content.timeline, newItem],
        },
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  updateTimelineItem: (id, item) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        content: {
          ...state.invitation.content,
          timeline: state.invitation.content.timeline.map((t) =>
            t.id === id ? { ...t, ...item } : t
          ),
        },
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  removeTimelineItem: (id) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        content: {
          ...state.invitation.content,
          timeline: state.invitation.content.timeline.filter(
            (t) => t.id !== id
          ),
        },
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  addGuest: (guest) =>
    set((state) => {
      const newGuest: Guest = {
        ...guest,
        id: generateId("g"),
      };
      const updated = {
        ...state.invitation,
        guests: [...state.invitation.guests, newGuest],
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  updateGuest: (id, guest) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        guests: state.invitation.guests.map((g) =>
          g.id === id ? { ...g, ...guest } : g
        ),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  removeGuest: (id) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        guests: state.invitation.guests.filter((g) => g.id !== id),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  addTable: (table) =>
    set((state) => {
      const newTable: Table = {
        ...table,
        id: generateId("t"),
      };
      const updated = {
        ...state.invitation,
        tables: [...state.invitation.tables, newTable],
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  updateTable: (id, table) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        tables: state.invitation.tables.map((t) =>
          t.id === id ? { ...t, ...table } : t
        ),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  removeTable: (id) =>
    set((state) => {
      const table = state.invitation.tables.find((t) => t.id === id);
      const updatedGuests = state.invitation.guests.map((g) =>
        g.tableNumber === table?.tableNumber
          ? { ...g, tableNumber: null, seatNumber: null }
          : g
      );
      const updated = {
        ...state.invitation,
        tables: state.invitation.tables.filter((t) => t.id !== id),
        guests: updatedGuests,
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  assignGuestToSeat: (guestId, tableNumber, seatNumber) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        guests: state.invitation.guests.map((g) =>
          g.id === guestId
            ? { ...g, tableNumber, seatNumber }
            : g
        ),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  unassignGuest: (guestId) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        guests: state.invitation.guests.map((g) =>
          g.id === guestId
            ? { ...g, tableNumber: null, seatNumber: null }
            : g
        ),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  addRsvpField: (field) =>
    set((state) => {
      const newField: RsvpField = {
        ...field,
        id: generateId("rf"),
      };
      const updated = {
        ...state.invitation,
        rsvpFields: [...state.invitation.rsvpFields, newField],
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  updateRsvpField: (id, field) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        rsvpFields: state.invitation.rsvpFields.map((f) =>
          f.id === id ? { ...f, ...field } : f
        ),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  removeRsvpField: (id) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        rsvpFields: state.invitation.rsvpFields.filter((f) => f.id !== id),
        draftVersion: state.invitation.draftVersion + 1,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: false };
    }),

  addComment: (comment) =>
    set((state) => {
      const newComment: Comment = {
        ...comment,
        id: generateId("c"),
        createdAt: new Date().toISOString(),
      };
      const updated = {
        ...state.invitation,
        comments: [...state.invitation.comments, newComment],
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated };
    }),

  resolveComment: (id) =>
    set((state) => {
      const updated = {
        ...state.invitation,
        comments: state.invitation.comments.map((c) =>
          c.id === id ? { ...c, resolved: true } : c
        ),
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated };
    }),

  publish: () =>
    set((state) => {
      const updated = {
        ...state.invitation,
        publishedVersion: state.invitation.draftVersion,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(updated);
      return { invitation: updated, isPublished: true };
    }),

  resetToPublished: () => {
    const current = get().invitation;
    if (current.publishedVersion < current.draftVersion) {
      set((state) => ({
        invitation: {
          ...state.invitation,
          draftVersion: state.invitation.publishedVersion,
        },
        isPublished: true,
      }));
    }
  },
}));
