import { useState } from "react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Users, Plus, Search, Edit2, Trash2, X, Check } from "lucide-react";
import { cn } from "@/utils/helpers";
import type { Guest, RsvpStatus } from "@/types";

const statusColors: Record<RsvpStatus, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  declined: "bg-red-100 text-red-700",
};

const statusLabels: Record<RsvpStatus, string> = {
  confirmed: "已确认",
  pending: "待回复",
  declined: "无法出席",
};

export const GuestsEditorPanel = () => {
  const { invitation, addGuest, updateGuest, removeGuest } = useInvitationStore();
  const { guests } = invitation;
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [newGuest, setNewGuest] = useState<Partial<Guest>>({
    name: "",
    phone: "",
    group: "",
    rsvpStatus: "pending",
    dietary: "",
    plusOnes: 0,
  });

  const filteredGuests = guests.filter(
    (g) =>
      g.name.includes(searchTerm) ||
      g.group.includes(searchTerm) ||
      g.phone.includes(searchTerm)
  );

  const handleSave = () => {
    if (editingGuest) {
      updateGuest(editingGuest.id, editingGuest);
      setEditingGuest(null);
    } else if (newGuest.name) {
      addGuest(newGuest as Omit<Guest, "id">);
      setNewGuest({
        name: "",
        phone: "",
        group: "",
        rsvpStatus: "pending",
        dietary: "",
        plusOnes: 0,
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-blush/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">宾客名单</span>
            <span className="text-xs bg-blush text-wine px-2 py-0.5 rounded-full">
              {guests.length} 人
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-rose-gold/10 text-rose-gold rounded-lg hover:bg-rose-gold/20 transition-colors"
          >
            <Plus size={14} />
            添加
          </button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索宾客..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50 focus:ring-2 focus:ring-rose-gold/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredGuests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-warmgray text-sm">暂无宾客</p>
            <p className="text-warmgray/60 text-xs mt-1">点击添加按钮添加宾客</p>
          </div>
        ) : (
          filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="p-3 bg-white rounded-xl border border-blush/50 hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-wine">{guest.name}</span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        statusColors[guest.rsvpStatus]
                      )}
                    >
                      {statusLabels[guest.rsvpStatus]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-warmgray">
                    <span>{guest.phone}</span>
                    <span>·</span>
                    <span>{guest.group}</span>
                    {guest.tableNumber && (
                      <>
                        <span>·</span>
                        <span>{guest.tableNumber}号桌</span>
                      </>
                    )}
                  </div>
                  {guest.dietary && (
                    <p className="text-xs text-warmgray/70 mt-1">
                      饮食要求：{guest.dietary}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingGuest(guest)}
                    className="p-1.5 text-warmgray/60 hover:text-rose-gold hover:bg-blush/50 rounded-lg transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => removeGuest(guest.id)}
                    className="p-1.5 text-warmgray/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(showAddModal || editingGuest) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-wine">
                {editingGuest ? "编辑宾客" : "添加宾客"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingGuest(null);
                }}
                className="p-1 text-warmgray hover:text-wine transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-warmgray mb-1 block">姓名 *</label>
                <input
                  type="text"
                  value={editingGuest?.name || newGuest.name || ""}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({ ...editingGuest, name: e.target.value })
                      : setNewGuest({ ...newGuest, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">电话</label>
                <input
                  type="text"
                  value={editingGuest?.phone || newGuest.phone || ""}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({ ...editingGuest, phone: e.target.value })
                      : setNewGuest({ ...newGuest, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">分组</label>
                <input
                  type="text"
                  value={editingGuest?.group || newGuest.group || ""}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({ ...editingGuest, group: e.target.value })
                      : setNewGuest({ ...newGuest, group: e.target.value })
                  }
                  placeholder="如：男方亲友、同事..."
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">RSVP 状态</label>
                <select
                  value={editingGuest?.rsvpStatus || newGuest.rsvpStatus || "pending"}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({
                          ...editingGuest,
                          rsvpStatus: e.target.value as RsvpStatus,
                        })
                      : setNewGuest({
                          ...newGuest,
                          rsvpStatus: e.target.value as RsvpStatus,
                        })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                >
                  <option value="pending">待回复</option>
                  <option value="confirmed">已确认</option>
                  <option value="declined">无法出席</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">+1 人数</label>
                <input
                  type="number"
                  min="0"
                  value={editingGuest?.plusOnes ?? newGuest.plusOnes ?? 0}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({
                          ...editingGuest,
                          plusOnes: parseInt(e.target.value) || 0,
                        })
                      : setNewGuest({
                          ...newGuest,
                          plusOnes: parseInt(e.target.value) || 0,
                        })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">饮食要求</label>
                <input
                  type="text"
                  value={editingGuest?.dietary || newGuest.dietary || ""}
                  onChange={(e) =>
                    editingGuest
                      ? setEditingGuest({ ...editingGuest, dietary: e.target.value })
                      : setNewGuest({ ...newGuest, dietary: e.target.value })
                  }
                  placeholder="如：素食、清真、海鲜过敏..."
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingGuest(null);
                }}
                className="px-4 py-2 text-sm text-warmgray hover:bg-blush/50 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-rose-gold to-rose-goldDark text-white rounded-lg hover:shadow-hover transition-all"
              >
                <Check size={16} />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
