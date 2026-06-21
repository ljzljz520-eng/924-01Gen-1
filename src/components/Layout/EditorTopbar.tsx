import { Share2, Eye, Printer, Send, RotateCcw, Check } from "lucide-react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/utils/helpers";
import { useState } from "react";

export const EditorTopbar = () => {
  const { isPublished, publish, resetToPublished, invitation } = useInvitationStore();
  const { userRole, setUserRole } = useUiStore();
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);

  const handlePublish = () => {
    publish();
    setShowPublishSuccess(true);
    setTimeout(() => setShowPublishSuccess(false), 2000);
  };

  return (
    <header className="h-16 bg-white border-b border-blush/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-warmgray">当前角色:</span>
          <div className="flex rounded-lg overflow-hidden border border-blush">
            <button
              onClick={() => setUserRole("editor")}
              className={cn(
                "px-3 py-1.5 text-sm transition-all",
                userRole === "editor"
                  ? "bg-rose-gold text-white"
                  : "bg-white text-warmgray hover:bg-blush/30"
              )}
            >
              新人编辑
            </button>
            <button
              onClick={() => setUserRole("collaborator")}
              className={cn(
                "px-3 py-1.5 text-sm transition-all",
                userRole === "collaborator"
                  ? "bg-rose-gold text-white"
                  : "bg-white text-warmgray hover:bg-blush/30"
              )}
            >
              协作者
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          {isPublished ? (
            <span className="flex items-center gap-1 text-emerald-600">
              <Check size={16} />
              已发布
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse-soft" />
              有未发布更改
            </span>
          )}
          <span className="text-warmgray/60">
            | 版本 v{invitation.draftVersion}
          </span>
        </div>

        <div className="h-6 w-px bg-blush mx-2" />

        {!isPublished && (
          <button
            onClick={resetToPublished}
            className="flex items-center gap-2 px-3 py-2 text-sm text-warmgray hover:text-wine transition-colors rounded-lg hover:bg-blush/30"
          >
            <RotateCcw size={16} />
            撤销更改
          </button>
        )}

        <button className="flex items-center gap-2 px-3 py-2 text-sm text-warmgray hover:text-wine transition-colors rounded-lg hover:bg-blush/30">
          <Eye size={16} />
          预览
        </button>

        <button className="flex items-center gap-2 px-3 py-2 text-sm text-warmgray hover:text-wine transition-colors rounded-lg hover:bg-blush/30">
          <Printer size={16} />
          打印
        </button>

        <button className="flex items-center gap-2 px-3 py-2 text-sm text-warmgray hover:text-wine transition-colors rounded-lg hover:bg-blush/30">
          <Share2 size={16} />
          分享
        </button>

        <button
          onClick={handlePublish}
          className={cn(
            "flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300",
            showPublishSuccess
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-rose-gold to-rose-goldDark text-white hover:shadow-hover hover:-translate-y-0.5"
          )}
        >
          <Send size={16} />
          {showPublishSuccess ? "已发布" : "发布正式版"}
        </button>
      </div>
    </header>
  );
};
