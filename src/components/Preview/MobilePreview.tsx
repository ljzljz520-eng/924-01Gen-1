import { useInvitationStore } from "@/store/useInvitationStore";
import { cn } from "@/utils/helpers";

interface MobilePreviewProps {
  className?: string;
  fullPage?: boolean;
}

export const MobilePreview = ({ className, fullPage = false }: MobilePreviewProps) => {
  const { invitation } = useInvitationStore();
  const { cover, content } = invitation;

  const textAlignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[cover.textAlign];

  const contentElement = (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{ backgroundColor: cover.backgroundColor }}
    >
      {cover.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${cover.backgroundImage})` }}
        />
      )}

      <div className="absolute top-0 left-0 w-24 h-24 opacity-30">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0,0 C30,10 40,30 50,50 C60,70 40,90 0,100 L0,0 Z"
            fill="#C9A96E"
            opacity="0.4"
          />
          <path
            d="M0,0 C20,5 25,20 35,35"
            stroke="#722F37"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30 rotate-180">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0,0 C30,10 40,30 50,50 C60,70 40,90 0,100 L0,0 Z"
            fill="#C9A96E"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col p-6 overflow-y-auto">
        <div className={cn("flex-1 flex flex-col justify-center", textAlignClass)}>
          <p
            className="text-sm tracking-widest mb-4 font-body"
            style={{ color: cover.subtitleColor }}
          >
            我们要结婚啦
          </p>

          <h1
            className="font-display text-3xl leading-tight mb-2"
            style={{ color: cover.titleColor }}
          >
            {cover.groomName}
          </h1>
          <p
            className="text-lg mb-2 font-display"
            style={{ color: cover.subtitleColor }}
          >
            &
          </p>
          <h1
            className="font-display text-3xl leading-tight mb-8"
            style={{ color: cover.titleColor }}
          >
            {cover.brideName}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-gold/50" />
            <div className="w-2 h-2 rounded-full bg-rose-gold" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-gold/50" />
          </div>

          <p
            className="text-sm mb-2 font-body"
            style={{ color: cover.subtitleColor }}
          >
            {cover.weddingDate}
          </p>
          <p
            className="text-xs font-body"
            style={{ color: cover.subtitleColor }}
          >
            {cover.weddingVenue}
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-wine/80 text-xs leading-relaxed whitespace-pre-line font-body text-center">
              {content.invitationText}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/20 to-wine/20 flex items-center justify-center">
              <span className="text-rose-gold text-sm animate-pulse-soft">♥</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-gold/30 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );

  if (fullPage) {
    return <div className={className}>{contentElement}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative mx-auto w-[320px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10" />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-black/80 rounded-full z-20" />
        
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
          {contentElement}
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
      </div>

      <p className="text-center text-xs text-warmgray mt-4">
        手机邀请页预览
      </p>
    </div>
  );
};
