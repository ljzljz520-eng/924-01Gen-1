import {
  Image,
  FileText,
  Users,
  LayoutGrid,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import type { EditorTab } from "@/types";
import { cn } from "@/utils/helpers";

const tabs: { id: EditorTab; label: string; icon: typeof Image }[] = [
  { id: "cover", label: "封面", icon: Image },
  { id: "content", label: "文案", icon: FileText },
  { id: "guests", label: "宾客", icon: Users },
  { id: "seating", label: "座位", icon: LayoutGrid },
  { id: "rsvp", label: "RSVP", icon: ClipboardList },
];

export const EditorSidebar = () => {
  const { activeTab, setActiveTab, leftPanelCollapsed, toggleLeftPanel, toggleComments } =
    useUiStore();

  return (
    <aside
      className={cn(
        "h-full bg-white border-r border-blush/50 flex flex-col transition-all duration-300",
        leftPanelCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-4 border-b border-blush/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-wine-light flex items-center justify-center text-white font-display text-lg">
            ♥
          </div>
          {!leftPanelCollapsed && (
            <div className="animate-fade-in">
              <h1 className="font-display text-xl text-wine font-semibold">
                婚礼请柬
              </h1>
              <p className="text-xs text-warmgray">在线编辑器</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-rose-gold/10 to-rose-gold/5 text-wine font-medium shadow-elegant"
                      : "text-warmgray hover:bg-blush/30 hover:text-wine"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      activeTab === tab.id ? "text-rose-gold" : "text-warmgray-light"
                    )}
                  />
                  {!leftPanelCollapsed && (
                    <span className="text-sm animate-fade-in">{tab.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 px-2">
          <div className="h-px bg-blush/50 my-2" />
          <button
            onClick={toggleComments}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-warmgray hover:bg-blush/30 hover:text-wine"
          >
            <MessageSquare size={20} className="flex-shrink-0" />
            {!leftPanelCollapsed && (
              <span className="text-sm animate-fade-in">评论建议</span>
            )}
          </button>
        </div>
      </nav>

      <div className="p-3 border-t border-blush/50">
        <button
          onClick={toggleLeftPanel}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs text-warmgray hover:text-wine transition-colors"
        >
          {leftPanelCollapsed ? "展开" : "收起"}
        </button>
      </div>
    </aside>
  );
};
