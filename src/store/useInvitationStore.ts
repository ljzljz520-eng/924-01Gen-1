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

interface StoredData {
  draft: WeddingInvitation;
  published: WeddingInvitation;
}

interface InvitationState {
  draftInvitation: WeddingInvitation;
  publishedInvitation: WeddingInvitation;
  isPublished: boolean;

  getInvitationForRole: (role: "editor" | "collaborator") => WeddingInvitation;

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

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const createInitialData = (): StoredData => {
  const initial: WeddingInvitation = {
    ...mockInvitation,
    comments: mockComments,
  };
  return {
    draft: deepClone(initial),
    published: deepClone(initial),
  };
};

const loadInitialData = (): StoredData => {
  const stored = loadFromStorage<StoredData | null>(STORAGE_KEY, null);
  if (stored && stored.draft && stored.published) {
    return stored;
  }
  return createInitialData();
};

const persist = (data: StoredData) => {
  saveToStorage(STORAGE_KEY, data);
};

const updateDraft = (
  state: InvitationState,
  updater: (draft: WeddingInvitation) => WeddingInvitation
): Partial<InvitationState> => {
  const newDraft = updater(state.draftInvitation);
  newDraft.draftVersion = state.draftInvitation.draftVersion + 1;
  newDraft.lastUpdated = new Date().toISOString();
  persist({
    draft: newDraft,
    published: state.publishedInvitation,
  });
  return {
    draftInvitation: newDraft,
    isPublished: false,
  };
};

export const useInvitationStore = create<InvitationState>((set, get) => {
  const initial = loadInitialData();

  return {
    draftInvitation: initial.draft,
    publishedInvitation: initial.published,
    isPublished: initial.draft.draftVersion === initial.published.publishedVersion,

    getInvitationForRole: (role) => {
      return role === "collaborator"
        ? get().publishedInvitation
        : get().draftInvitation;
    },

    setCover: (cover) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          cover: { ...draft.cover, ...cover },
        }))
      ),

    setContent: (content) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          content: { ...draft.content, ...content },
        }))
      ),

    addTimelineItem: (item) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          content: {
            ...draft.content,
            timeline: [
              ...draft.content.timeline,
              { ...item, id: generateId("tl") },
            ],
          },
        }))
      ),

    updateTimelineItem: (id, item) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          content: {
            ...draft.content,
            timeline: draft.content.timeline.map((t) =>
              t.id === id ? { ...t, ...item } : t
            ),
          },
        }))
      ),

    removeTimelineItem: (id) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          content: {
            ...draft.content,
            timeline: draft.content.timeline.filter((t) => t.id !== id),
          },
        }))
      ),

    addGuest: (guest) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          guests: [...draft.guests, { ...guest, id: generateId("g") }],
        }))
      ),

    updateGuest: (id, guest) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          guests: draft.guests.map((g) => (g.id === id ? { ...g, ...guest } : g)),
        }))
      ),

    removeGuest: (id) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          guests: draft.guests.filter((g) => g.id !== id),
        }))
      ),

    addTable: (table) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          tables: [...draft.tables, { ...table, id: generateId("t") }],
        }))
      ),

    updateTable: (id, table) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          tables: draft.tables.map((t) => (t.id === id ? { ...t, ...table } : t)),
        }))
      ),

    removeTable: (id) =>
      set((state) =>
        updateDraft(state, (draft) => {
          const table = draft.tables.find((t) => t.id === id);
          const updatedGuests = draft.guests.map((g) =>
            g.tableNumber === table?.tableNumber
              ? { ...g, tableNumber: null, seatNumber: null }
              : g
          );
          return {
            ...draft,
            tables: draft.tables.filter((t) => t.id !== id),
            guests: updatedGuests,
          };
        })
      ),

    assignGuestToSeat: (guestId, tableNumber, seatNumber) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          guests: draft.guests.map((g) =>
            g.id === guestId
              ? { ...g, tableNumber, seatNumber }
              : g
          ),
        }))
      ),

    unassignGuest: (guestId) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          guests: draft.guests.map((g) =>
            g.id === guestId
              ? { ...g, tableNumber: null, seatNumber: null }
              : g
          ),
        }))
      ),

    addRsvpField: (field) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          rsvpFields: [...draft.rsvpFields, { ...field, id: generateId("rf") }],
        }))
      ),

    updateRsvpField: (id, field) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          rsvpFields: draft.rsvpFields.map((f) =>
            f.id === id ? { ...f, ...field } : f
          ),
        }))
      ),

    removeRsvpField: (id) =>
      set((state) =>
        updateDraft(state, (draft) => ({
          ...draft,
          rsvpFields: draft.rsvpFields.filter((f) => f.id !== id),
        }))
      ),

    addComment: (comment) =>
      set((state) => {
        const newComment: Comment = {
          ...comment,
          id: generateId("c"),
          createdAt: new Date().toISOString(),
        };
        const sharedComments = [...state.draftInvitation.comments, newComment];
        const newDraft = {
          ...state.draftInvitation,
          comments: sharedComments,
          lastUpdated: new Date().toISOString(),
        };
        const newPublished = {
          ...state.publishedInvitation,
          comments: sharedComments,
          lastUpdated: new Date().toISOString(),
        };
        persist({ draft: newDraft, published: newPublished });
        return {
          draftInvitation: newDraft,
          publishedInvitation: newPublished,
        };
      }),

    resolveComment: (id) =>
      set((state) => {
        const sharedComments = state.draftInvitation.comments.map((c) =>
          c.id === id ? { ...c, resolved: true } : c
        );
        const newDraft = {
          ...state.draftInvitation,
          comments: sharedComments,
          lastUpdated: new Date().toISOString(),
        };
        const newPublished = {
          ...state.publishedInvitation,
          comments: sharedComments,
          lastUpdated: new Date().toISOString(),
        };
        persist({ draft: newDraft, published: newPublished });
        return {
          draftInvitation: newDraft,
          publishedInvitation: newPublished,
        };
      }),

    publish: () =>
      set((state) => {
        const newPublished = {
          ...deepClone(state.draftInvitation),
          publishedVersion: state.draftInvitation.draftVersion,
          lastUpdated: new Date().toISOString(),
        };
        persist({
          draft: state.draftInvitation,
          published: newPublished,
        });
        return {
          publishedInvitation: newPublished,
          isPublished: true,
        };
      }),

    resetToPublished: () =>
      set((state) => {
        const newDraft = {
          ...deepClone(state.publishedInvitation),
          draftVersion: state.publishedInvitation.publishedVersion,
          lastUpdated: new Date().toISOString(),
        };
        persist({
          draft: newDraft,
          published: state.publishedInvitation,
        });
        return {
          draftInvitation: newDraft,
          isPublished: true,
        };
      }),
  };
});
