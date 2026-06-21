import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/utils/helpers";
import { CoverEditorPanel } from "./CoverEditorPanel";
import { ContentEditorPanel } from "./ContentEditorPanel";
import { GuestsEditorPanel } from "./GuestsEditorPanel";
import { SeatingEditorPanel } from "./SeatingEditorPanel";
import { RsvpEditorPanel } from "./RsvpEditorPanel";
import { Lock } from "lucide-react";

export const EditorRightPanel = () => {
  const { activeTab, rightPanelCollapsed, toggleRightPanel, userRole } = useUiStore();

  const renderPanel = () => {
    if (userRole === "collaborator") {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blush/50 flex items-center justify-center mb-4">
            <Lock size={28} className="text-rose-gold" />
          </div>
          <h3 className="font-display text-lg text-wine mb-2">只读模式</h3>
          <p className="text-sm text-warmgray leading-relaxed">
            作为协作者，您可以查看请柬内容
            <br />
            但无法直接修改正式版本
          </p>
          <p className="text-xs text-warmgray/60 mt-4">
            如有建议，请在评论区留言
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "cover":
        return <CoverEditorPanel />;
      case "content":
        return <ContentEditorPanel />;
      case "guests":
        return <GuestsEditorPanel />;
      case "seating":
        return <SeatingEditorPanel />;
      case "rsvp":
        return <RsvpEditorPanel />;
      default:
        return null;
    }
  };

  if (rightPanelCollapsed) {
    return (
      <div className="w-12 h-full bg-white border-l border-blush/50 flex flex-col items-center py-4">
        <button
          onClick={toggleRightPanel}
          className="p-2 text-warmgray hover:text-wine hover:bg-blush/30 rounded-lg transition-colors"
        >
          &lt;
        </button>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "h-full bg-white border-l border-blush/50 flex flex-col transition-all duration-300",
        rightPanelCollapsed ? "w-12" : "w-80"
      )}
    >
      <div className="h-12 border-b border-blush/50 flex items-center justify-end px-3">
        <button
          onClick={toggleRightPanel}
          className="p-1.5 text-warmgray hover:text-wine hover:bg-blush/30 rounded-lg transition-colors"
        >
          &gt;
        </button>
      </div>
      <div className="flex-1 overflow-hidden">{renderPanel()}</div>
    </aside>
  );
};
