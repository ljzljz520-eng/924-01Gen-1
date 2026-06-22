import { useInvitationStore } from "@/store/useInvitationStore";
import { Palette, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { cn } from "@/utils/helpers";

const presetColors = [
  { bg: "#FAF7F2", name: "象牙白" },
  { bg: "#F5E6E8", name: "浅粉色" },
  { bg: "#FFF5EE", name: "暖米色" },
  { bg: "#F0E6D3", name: "香槟金" },
  { bg: "#E8E0D5", name: "燕麦色" },
  { bg: "#FDF5F2", name: "玫瑰白" },
];

const titleColors = [
  "#722F37",
  "#C9A96E",
  "#2C2C2C",
  "#5A242B",
  "#8B7E74",
  "#B8985D",
];

export const CoverEditorPanel = () => {
  const { draftInvitation, setCover } = useInvitationStore();
  const { cover } = draftInvitation;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-blush/50">
        <h3 className="font-display text-lg text-wine">封面设置</h3>
        <p className="text-xs text-warmgray mt-1">自定义您的请柬封面（草稿）</p>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">背景颜色</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {presetColors.map((color) => (
              <button
                key={color.bg}
                onClick={() => setCover({ backgroundColor: color.bg })}
                className={cn(
                  "aspect-square rounded-lg border-2 transition-all hover:scale-105",
                  cover.backgroundColor === color.bg
                    ? "border-rose-gold shadow-elegant"
                    : "border-transparent hover:border-blush"
                )}
                style={{ backgroundColor: color.bg }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Type size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">文字内容</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-warmgray mb-1 block">新郎姓名</label>
              <input
                type="text"
                value={cover.groomName}
                onChange={(e) => setCover({ groomName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-warmgray mb-1 block">新娘姓名</label>
              <input
                type="text"
                value={cover.brideName}
                onChange={(e) => setCover({ brideName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-warmgray mb-1 block">婚礼日期</label>
              <input
                type="text"
                value={cover.weddingDate}
                onChange={(e) => setCover({ weddingDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-warmgray mb-1 block">婚礼地点</label>
              <input
                type="text"
                value={cover.weddingVenue}
                onChange={(e) => setCover({ weddingVenue: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">标题颜色</span>
          </div>
          <div className="flex gap-2">
            {titleColors.map((color) => (
              <button
                key={color}
                onClick={() => setCover({ titleColor: color })}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                  cover.titleColor === color
                    ? "border-rose-gold ring-2 ring-rose-gold/30"
                    : "border-white shadow-sm"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlignCenter size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">对齐方式</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: "left", icon: AlignLeft, label: "左对齐" },
              { value: "center", icon: AlignCenter, label: "居中" },
              { value: "right", icon: AlignRight, label: "右对齐" },
            ].map((align) => {
              const Icon = align.icon;
              return (
                <button
                  key={align.value}
                  onClick={() =>
                    setCover({
                      textAlign: align.value as "left" | "center" | "right",
                    })
                  }
                  className={cn(
                    "flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-all",
                    cover.textAlign === align.value
                      ? "bg-rose-gold/10 text-rose-gold border border-rose-gold/30"
                      : "bg-blush/30 text-warmgray hover:bg-blush/50"
                  )}
                >
                  <Icon size={14} />
                  {align.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
