import { useState } from "react";
import { X, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { useUiStore } from "@/store/useUiStore";
import { formatDateTime, cn } from "@/utils/helpers";

export const CommentsPanel = () => {
  const { draftInvitation, addComment, resolveComment } = useInvitationStore();
  const { showComments, toggleComments, activeTab } = useUiStore();
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  const filteredComments = draftInvitation.comments.filter(
    (c) => c.section === activeTab || c.section === "all"
  );

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    addComment({
      author: authorName || "匿名用户",
      avatar: "💬",
      content: newComment,
      section: activeTab,
      resolved: false,
    });
    setNewComment("");
  };

  if (!showComments) return null;

  return (
    <div className="w-80 h-full bg-white border-l border-blush/50 flex flex-col animate-slide-up">
      <div className="p-4 border-b border-blush/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-rose-gold" />
          <h3 className="font-display text-lg text-wine">评论建议</h3>
          <span className="text-xs bg-blush text-wine px-2 py-0.5 rounded-full">
            {filteredComments.length}
          </span>
        </div>
        <button
          onClick={toggleComments}
          className="p-1.5 rounded-lg hover:bg-blush/30 text-warmgray hover:text-wine transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-warmgray text-sm">暂无评论</p>
            <p className="text-warmgray/60 text-xs mt-1">
              协作者可以在这里留下建议
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                "p-3 rounded-xl bg-blush/30 border border-blush/50 transition-all animate-slide-up",
                comment.resolved && "opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{comment.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-wine">
                      {comment.author}
                    </span>
                    {comment.resolved && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle size={12} />
                        已处理
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-warmgray-dark leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-warmgray/60">
                      {formatDateTime(comment.createdAt)}
                    </span>
                    {!comment.resolved && (
                      <button
                        onClick={() => resolveComment(comment.id)}
                        className="text-xs text-rose-gold hover:text-rose-goldDark transition-colors">
                        标记已处理
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-blush/50">
        <div className="mb-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="您的昵称"
            className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="写下您的建议..."
            className="flex-1 px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-rose-gold to-rose-goldDark text-white rounded-lg hover:shadow-hover transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
