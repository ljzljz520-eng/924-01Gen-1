import { useInvitationStore } from "@/store/useInvitationStore";
import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/utils/helpers";

export const PrintPreview = ({ className }: { className?: string }) => {
  const { getInvitationForRole } = useInvitationStore();
  const { userRole } = useUiStore();
  const invitation = getInvitationForRole(userRole);
  const { cover, content, guests, tables } = invitation;

  return (
    <div className={cn("relative", className)}>
      <div className="bg-white shadow-elegant rounded-lg overflow-hidden mx-auto" style={{ width: "210mm", maxWidth: "100%", aspectRatio: "210/297" }}>
        <div
          className="w-full h-full p-12 flex flex-col"
          style={{ backgroundColor: cover.backgroundColor }}
        >
          <div className="text-center mb-10">
            <p
              className="text-sm tracking-[0.3em] mb-4 font-body"
              style={{ color: cover.subtitleColor }}
            >
              结婚请柬
            </p>
            <h1
              className="font-display text-4xl mb-2"
              style={{ color: cover.titleColor }}
            >
              {cover.groomName} & {cover.brideName}
            </h1>
            <div className="w-24 h-px bg-rose-gold/50 mx-auto my-4" />
            <p
              className="text-base font-body"
              style={{ color: cover.subtitleColor }}
            >
              {cover.weddingDate}
            </p>
            <p
              className="text-sm mt-1 font-body"
              style={{ color: cover.subtitleColor }}
            >
              {cover.weddingVenue}
            </p>
          </div>

          <div className="flex-1 space-y-8">
            <div className="text-center">
              <p
                className="text-sm leading-loose whitespace-pre-line font-body"
                style={{ color: cover.titleColor }}
              >
                {content.invitationText}
              </p>
            </div>

            {content.loveStory && (
              <div>
                <h3 className="font-display text-lg text-wine text-center mb-3">
                  我们的故事
                </h3>
                <p className="text-sm text-warmgray-dark leading-relaxed whitespace-pre-line font-body">
                  {content.loveStory}
                </p>
              </div>
            )}

            {content.timeline.length > 0 && (
              <div>
                <h3 className="font-display text-lg text-wine text-center mb-4">
                  婚礼流程
                </h3>
                <div className="flex justify-center gap-8">
                  {content.timeline.map((item) => (
                    <div key={item.id} className="text-center">
                      <p className="text-rose-gold font-medium text-sm">{item.time}</p>
                      <p className="text-wine text-sm mt-1">{item.title}</p>
                      <p className="text-warmgray text-xs mt-0.5">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-rose-gold/20">
            <h3 className="font-display text-lg text-wine text-center mb-4">
              席位安排
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {tables.slice(0, 6).map((table) => {
                const tableGuests = guests.filter((g) => g.tableNumber === table.tableNumber);
                return (
                  <div key={table.id} className="text-center">
                    <p className="text-xs text-wine font-medium">
                      {table.tableNumber}号桌 · {table.tableName}
                    </p>
                    <p className="text-xs text-warmgray mt-1">
                      {tableGuests.length}/{table.seatCount}人
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/20 to-wine/20 flex items-center justify-center">
              <span className="text-rose-gold text-lg">♥</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <p className="text-center text-xs text-warmgray">
          打印版预览 · A4 尺寸
        </p>
        {userRole === "editor" && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
            草稿版
          </span>
        )}
      </div>
    </div>
  );
};
