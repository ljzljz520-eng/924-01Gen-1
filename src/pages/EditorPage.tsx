import { EditorSidebar } from "@/components/Layout/EditorSidebar";
import { EditorTopbar } from "@/components/Layout/EditorTopbar";
import { EditorRightPanel } from "@/components/Editor/EditorRightPanel";
import { CommentsPanel } from "@/components/Editor/CommentsPanel";
import { MobilePreview } from "@/components/Preview/MobilePreview";
import { PrintPreview } from "@/components/Preview/PrintPreview";
import { useUiStore } from "@/store/useUiStore";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Smartphone, Printer } from "lucide-react";
import { cn } from "@/utils/helpers";

export const EditorPage = () => {
  const { previewMode, setPreviewMode, showComments, userRole } = useUiStore();
  const { isPublished } = useInvitationStore();

  return (
    <div className="h-screen flex flex-col bg-ivory">
      <EditorTopbar />
      
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="h-12 flex items-center justify-center gap-4 border-b border-blush/50 bg-white/50 backdrop-blur-sm">
            <button
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all",
                previewMode === "mobile"
                  ? "bg-rose-gold text-white shadow-elegant"
                  : "text-warmgray hover:text-wine hover:bg-blush/30"
              )}
            >
              <Smartphone size={16} />
              手机预览
            </button>
            <button
              onClick={() => setPreviewMode("print")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all",
                previewMode === "print"
                  ? "bg-rose-gold text-white shadow-elegant"
                  : "text-warmgray hover:text-wine hover:bg-blush/30"
              )}
            >
              <Printer size={16} />
              打印版
            </button>
            
            {!isPublished && (
              <span className="text-xs text-amber-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse-soft" />
                草稿模式 - 编辑内容不会影响正式版本
              </span>
            )}
          </div>
          
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
            {previewMode === "mobile" ? (
              <MobilePreview className="animate-fade-in" />
            ) : (
              <div className="scale-75 origin-top animate-fade-in">
                <PrintPreview />
              </div>
            )}
          </div>
        </main>

        <EditorRightPanel />
        
        {showComments && <CommentsPanel />}
      </div>

      {userRole === "collaborator" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-wine text-white px-6 py-3 rounded-full shadow-elegant text-sm animate-slide-up">
          👀 协作者模式 - 您可以查看请柬并添加评论建议，但无法直接修改内容
        </div>
      )}
    </div>
  );
};
