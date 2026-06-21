import { useState } from "react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { formatDateTime, cn } from "@/utils/helpers";
import { MobilePreview } from "@/components/Preview/MobilePreview";

export const CollaboratorPage = () => {
  const { invitation, addComment } = useInvitationStore();
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");

  const sections = [
    { id: "all", label: "全部" },
    { id: "cover", label: "封面" },
    { id: "content", label: "文案" },
    { id: "guests", label: "宾客" },
    { id: "seating", label: "座位" },
    { id: "rsvp", label: "RSVP" },
  ];

  const filteredComments =
    selectedSection === "all"
      ? invitation.comments
      : invitation.comments.filter((c) => c.section === selectedSection);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    addComment({
      author: authorName || "匿名用户",
      avatar: "💬",
      content: newComment,
      section: selectedSection === "all" ? "cover" : selectedSection,
      resolved: false,
    });
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blush/50 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-wine-light flex items-center justify-center text-white">
              ♥
            </div>
            <div>
              <h1 className="font-display text-xl text-wine">婚礼请柬</h1>
              <p className="text-xs text-warmgray">
                {invitation.cover.groomName} & {invitation.cover.brideName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-wine/10 px-4 py-2 rounded-full">
            <span className="text-sm text-wine">👀 协作者视图</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1 flex justify-center">
          <div className="sticky top-24">
            <MobilePreview />
          </div>
        </div>

        <div className="w-96">
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden sticky top-24">
            <div className="p-4 border-b border-blush/50">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={20} className="text-rose-gold" />
                <h2 className="font-display text-lg text-wine">评论建议</h2>
                <span className="text-xs bg-blush text-wine px-2 py-0.5 rounded-full">
                  {invitation.comments.length}
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full transition-all",
                      selectedSection === section.id
                        ? "bg-rose-gold text-white"
                        : "bg-blush/30 text-warmgray hover:bg-blush/50"
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {filteredComments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-warmgray text-sm">暂无评论</p>
                  <p className="text-warmgray/60 text-xs mt-1">
                    作为协作者，您可以在这里留下建议
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
                          <span className="text-xs text-rose-gold/70">
                            #{sections.find((s) => s.id === comment.section)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-blush/50 bg-blush/10">
              <div className="mb-3">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="您的昵称"
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all bg-white"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="写下您的建议..."
                  className="flex-1 px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all bg-white"
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

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800">
              💡 提示：作为协作者，您可以查看请柬并添加评论建议，但无法直接修改正式版本的内容。新人会查看您的建议并决定是否采纳。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
