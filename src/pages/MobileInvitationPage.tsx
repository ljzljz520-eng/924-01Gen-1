import { useInvitationStore } from "@/store/useInvitationStore";
import { MapPin, Heart, Calendar, ChevronDown } from "lucide-react";

export const MobileInvitationPage = () => {
  const { invitation } = useInvitationStore();
  const { cover, content } = invitation;

  const textAlignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[cover.textAlign];

  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative">
      <div
        className="min-h-screen w-full relative overflow-hidden"
        style={{ backgroundColor: cover.backgroundColor }}
      >
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d="M0,0 C40,10 50,40 60,70 C70,100 40,110 0,120 L0,0 Z"
              fill="#C9A96E"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 pointer-events-none rotate-180">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d="M0,0 C40,10 50,40 60,70 C70,100 40,110 0,120 L0,0 Z"
              fill="#C9A96E"
            />
          </svg>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <section
            className={`flex-1 flex flex-col justify-center px-8 py-16 ${textAlignClass} transition-all duration-500`}
          >
            <div className="animate-fade-in">
              <p
                className="text-sm tracking-[0.3em] mb-6 font-body"
                style={{ color: cover.subtitleColor }}
              >
                WEDDING INVITATION
              </p>

              <h1
                className="font-display text-5xl leading-tight mb-2 animate-slide-up"
                style={{ color: cover.titleColor, animationDelay: "0.1s" }}
              >
                {cover.groomName}
              </h1>
              <p
                className="text-2xl mb-2 font-display animate-slide-up"
                style={{ color: cover.subtitleColor, animationDelay: "0.2s" }}
              >
                &
              </p>
              <h1
                className="font-display text-5xl leading-tight mb-10 animate-slide-up"
                style={{ color: cover.titleColor, animationDelay: "0.3s" }}
              >
                {cover.brideName}
              </h1>

              <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-gold/50" />
                <div className="relative">
                  <Heart size={18} className="text-rose-gold fill-rose-gold/30" />
                  <div className="absolute inset-0 animate-ping">
                    <Heart size={18} className="text-rose-gold/30" />
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-gold/50" />
              </div>

              <div className={`space-y-3 animate-slide-up ${textAlignClass}`} style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center justify-center gap-3">
                  <Calendar size={18} className="text-rose-gold flex-shrink-0" />
                  <span className="text-base font-body" style={{ color: cover.titleColor }}>
                    {cover.weddingDate}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={18} className="text-rose-gold flex-shrink-0" />
                  <span className="text-sm font-body" style={{ color: cover.subtitleColor }}>
                    {cover.weddingVenue}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center animate-bounce">
              <ChevronDown size={24} className="text-rose-gold/50" />
            </div>
          </section>

          <section className="px-6 pb-12">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-elegant border border-white/50">
              <div className="w-12 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-transparent via-rose-gold to-transparent" />
              <h2 className="font-display text-2xl text-wine text-center mb-6">
                诚挚邀请
              </h2>
              <p
                className="text-wine/70 leading-loose whitespace-pre-line text-center font-body text-sm"
                style={{ color: cover.titleColor }}
              >
                {content.invitationText}
              </p>
            </div>
          </section>

          {content.loveStory && (
            <section className="px-6 pb-12">
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-elegant border border-white/50">
                <h2 className="font-display text-2xl text-wine text-center mb-6">
                  我们的故事
                </h2>
                <div className="relative">
                  <div className="absolute left-0 top-0 text-4xl text-rose-gold/20 font-display -mt-2">
                    "
                  </div>
                  <p className="text-warmgray-dark leading-loose whitespace-pre-line font-body text-sm px-4">
                    {content.loveStory}
                  </p>
                  <div className="absolute right-0 bottom-0 text-4xl text-rose-gold/20 font-display -mb-4 rotate-180">
                    "
                  </div>
                </div>
              </div>
            </section>
          )}

          {content.timeline.length > 0 && (
            <section className="px-6 pb-12">
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-elegant border border-white/50">
                <h2 className="font-display text-2xl text-wine text-center mb-8">
                  婚礼流程
                </h2>
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-gold/50 via-rose-gold/30 to-transparent -translate-x-1/2" />
                  <div className="space-y-8">
                    {content.timeline.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative flex items-start gap-4 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex-1 text-right">
                          {index % 2 === 0 && (
                            <>
                              <p className="text-rose-gold font-medium text-sm">
                                {item.time}
                              </p>
                              <p className="text-wine font-medium mt-1">{item.title}</p>
                              <p className="text-warmgray text-xs mt-1">
                                {item.description}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="w-4 h-4 rounded-full bg-rose-gold border-4 border-white shadow-elegant flex-shrink-0 z-10 mt-1" />
                        <div className="flex-1">
                          {index % 2 === 1 && (
                            <>
                              <p className="text-rose-gold font-medium text-sm">
                                {item.time}
                              </p>
                              <p className="text-wine font-medium mt-1">{item.title}</p>
                              <p className="text-warmgray text-xs mt-1">
                                {item.description}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="px-6 pb-16">
            <button className="w-full py-4 bg-gradient-to-r from-rose-gold to-rose-goldDark text-white rounded-2xl font-medium shadow-hover hover:-translate-y-0.5 transition-all text-sm">
              我要出席 RSVP
            </button>
            <p className="text-center text-xs text-warmgray/60 mt-3">
              期待您的到来，与我们共同见证这美好时刻
            </p>
          </section>

          <footer className="pb-8 text-center">
            <div className="flex justify-center gap-2 text-rose-gold/30 text-sm mb-2">
              ♥ ♥ ♥
            </div>
            <p className="text-warmgray/50 text-xs">
              {cover.groomName} & {cover.brideName}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
