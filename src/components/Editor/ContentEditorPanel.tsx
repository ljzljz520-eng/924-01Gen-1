import { useInvitationStore } from "@/store/useInvitationStore";
import { FileText, Clock, Plus, Trash2, GripVertical } from "lucide-react";
import type { TimelineItem } from "@/types";

export const ContentEditorPanel = () => {
  const { draftInvitation, setContent, addTimelineItem, updateTimelineItem, removeTimelineItem } =
    useInvitationStore();
  const { content } = draftInvitation;

  const handleAddTimeline = () => {
    const newItem: Omit<TimelineItem, "id"> = {
      time: "",
      title: "",
      description: "",
      order: content.timeline.length + 1,
    };
    addTimelineItem(newItem);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-blush/50">
        <h3 className="font-display text-lg text-wine">文案编辑</h3>
        <p className="text-xs text-warmgray mt-1">编辑邀请语和婚礼流程（草稿）</p>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">邀请语</span>
          </div>
          <textarea
            value={content.invitationText}
            onChange={(e) => setContent({ invitationText: e.target.value })}
            rows={5}
            className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all resize-none"
            placeholder="请输入邀请语..."
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">爱情故事</span>
          </div>
          <textarea
            value={content.loveStory}
            onChange={(e) => setContent({ loveStory: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all resize-none"
            placeholder="分享你们的爱情故事..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-rose-gold" />
              <span className="text-sm font-medium text-wine">婚礼流程</span>
            </div>
            <button
              onClick={handleAddTimeline}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-rose-gold/10 text-rose-gold rounded-lg hover:bg-rose-gold/20 transition-colors"
            >
              <Plus size={14} />
              添加
            </button>
          </div>

          <div className="space-y-3">
            {content.timeline.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-blush/20 rounded-xl border border-blush/50"
              >
                <div className="flex items-start gap-2">
                  <div className="mt-2 cursor-grab text-warmgray/40">
                    <GripVertical size={16} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) =>
                          updateTimelineItem(item.id, { time: e.target.value })
                        }
                        placeholder="时间"
                        className="w-20 px-2 py-1.5 text-xs border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateTimelineItem(item.id, { title: e.target.value })
                        }
                        placeholder="事件标题"
                        className="flex-1 px-2 py-1.5 text-xs border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateTimelineItem(item.id, { description: e.target.value })
                      }
                      placeholder="简短描述"
                      className="w-full px-2 py-1.5 text-xs border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                    />
                  </div>
                  <button
                    onClick={() => removeTimelineItem(item.id)}
                    className="p-1.5 text-warmgray/60 hover:text-wine hover:bg-blush rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
