import { useState } from "react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { LayoutGrid, Users, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/utils/helpers";

export const SeatingEditorPanel = () => {
  const { invitation, addTable, removeTable, assignGuestToSeat, unassignGuest } =
    useInvitationStore();
  const { tables, guests } = invitation;
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState({ tableNumber: 0, tableName: "", seatCount: 10 });

  const unassignedGuests = guests.filter((g) => g.tableNumber === null);

  const getTableGuests = (tableNumber: number) => {
    return guests.filter((g) => g.tableNumber === tableNumber);
  };

  const handleAddTable = () => {
    if (newTable.tableName && newTable.tableNumber > 0) {
      addTable(newTable);
      setNewTable({ tableNumber: 0, tableName: "", seatCount: 10 });
      setShowAddTable(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, guestId: string) => {
    e.dataTransfer.setData("guestId", guestId);
  };

  const handleDrop = (e: React.DragEvent, tableNumber: number, seatNumber: number) => {
    e.preventDefault();
    const guestId = e.dataTransfer.getData("guestId");
    if (guestId) {
      assignGuestToSeat(guestId, tableNumber, seatNumber);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-blush/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">座位安排</span>
            <span className="text-xs bg-blush text-wine px-2 py-0.5 rounded-full">
              {tables.length} 桌
            </span>
          </div>
          <button
            onClick={() => setShowAddTable(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-rose-gold/10 text-rose-gold rounded-lg hover:bg-rose-gold/20 transition-colors"
          >
            <Plus size={14} />
            添加桌位
          </button>
        </div>
        <p className="text-xs text-warmgray mt-2">
          拖拽宾客到座位上进行分配
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-wine mb-3 flex items-center gap-2">
            <Users size={14} />
            未分配宾客 ({unassignedGuests.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {unassignedGuests.map((guest) => (
              <div
                key={guest.id}
                draggable
                onDragStart={(e) => handleDragStart(e, guest.id)}
                className="px-3 py-1.5 bg-white border border-blush rounded-full text-xs text-wine cursor-grab hover:shadow-card hover:border-rose-gold/30 transition-all"
              >
                {guest.name}
              </div>
            ))}
            {unassignedGuests.length === 0 && (
              <p className="text-xs text-warmgray/60">所有宾客都已安排座位</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {tables.map((table) => {
            const tableGuests = getTableGuests(table.tableNumber);
            const seats = Array.from({ length: table.seatCount }, (_, i) => i + 1);

            return (
              <div
                key={table.id}
                className="p-4 bg-white rounded-xl border border-blush/50 transition-all hover:shadow-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-gold/20 to-wine/20 flex items-center justify-center text-rose-gold text-sm font-medium">
                      {table.tableNumber}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-wine">{table.tableName}</p>
                      <p className="text-xs text-warmgray">
                        {tableGuests.length}/{table.seatCount} 人
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTable(table.id)}
                    className="p-1.5 text-warmgray/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {seats.map((seat) => {
                    const seatedGuest = tableGuests.find((g) => g.seatNumber === seat);
                    return (
                      <div
                        key={seat}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, table.tableNumber, seat)}
                        className={cn(
                          "aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-xs transition-all",
                          seatedGuest
                            ? "bg-blush/30 border-rose-gold/30"
                            : "bg-blush/10 border-blush/50 hover:border-rose-gold/50"
                        )}
                      >
                        {seatedGuest ? (
                          <button
                            onClick={() => unassignGuest(seatedGuest.id)}
                            className="text-wine hover:text-wine-dark truncate max-w-full px-1"
                            title={`点击取消 ${seatedGuest.name} 的座位`}
                          >
                            {seatedGuest.name.slice(0, 2)}
                          </button>
                        ) : (
                          <span className="text-warmgray/40">{seat}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddTable && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-wine">添加桌位</h3>
              <button
                onClick={() => setShowAddTable(false)}
                className="p-1 text-warmgray hover:text-wine transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-warmgray mb-1 block">桌号</label>
                <input
                  type="number"
                  min="1"
                  value={newTable.tableNumber || ""}
                  onChange={(e) =>
                    setNewTable({ ...newTable, tableNumber: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">桌名</label>
                <input
                  type="text"
                  value={newTable.tableName}
                  onChange={(e) => setNewTable({ ...newTable, tableName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                  placeholder="如：主桌、亲友桌"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">座位数</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newTable.seatCount}
                  onChange={(e) =>
                    setNewTable({ ...newTable, seatCount: parseInt(e.target.value) || 10 })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddTable(false)}
                className="px-4 py-2 text-sm text-warmgray hover:bg-blush/50 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddTable}
                className="px-4 py-2 text-sm bg-gradient-to-r from-rose-gold to-rose-goldDark text-white rounded-lg hover:shadow-hover transition-all"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
