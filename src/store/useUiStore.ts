import { create } from "zustand";
import type { EditorTab, PreviewMode, UserRole } from "@/types";

interface UiState {
  activeTab: EditorTab;
  previewMode: PreviewMode;
  userRole: UserRole;
  showComments: boolean;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;

  setActiveTab: (tab: EditorTab) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setUserRole: (role: UserRole) => void;
  toggleComments: () => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: "cover",
  previewMode: "mobile",
  userRole: "editor",
  showComments: false,
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setUserRole: (role) => set({ userRole: role }),
  toggleComments: () => set((state) => ({ showComments: !state.showComments })),
  toggleLeftPanel: () =>
    set((state) => ({ leftPanelCollapsed: !state.leftPanelCollapsed })),
  toggleRightPanel: () =>
    set((state) => ({ rightPanelCollapsed: !state.rightPanelCollapsed })),
}));
