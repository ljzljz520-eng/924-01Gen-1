import { useState } from "react";
import { useInvitationStore } from "@/store/useInvitationStore";
import { ClipboardList, Plus, Trash2, GripVertical, X } from "lucide-react";
import type { RsvpField, RsvpFieldType } from "@/types";

const fieldTypes: { value: RsvpFieldType; label: string }[] = [
  { value: "text", label: "单行文本" },
  { value: "textarea", label: "多行文本" },
  { value: "select", label: "下拉选择" },
  { value: "checkbox", label: "多选框" },
];

export const RsvpEditorPanel = () => {
  const { draftInvitation, addRsvpField, removeRsvpField } = useInvitationStore();
  const { rsvpFields } = draftInvitation;
  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState<Partial<RsvpField>>({
    label: "",
    type: "text",
    required: false,
    options: [],
  });
  const [newOption, setNewOption] = useState("");

  const handleAddField = () => {
    if (newField.label) {
      addRsvpField(newField as Omit<RsvpField, "id">);
      setNewField({
        label: "",
        type: "text",
        required: false,
        options: [],
      });
      setShowAddField(false);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setNewField({
        ...newField,
        options: [...(newField.options || []), newOption.trim()],
      });
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setNewField({
      ...newField,
      options: (newField.options || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-blush/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-rose-gold" />
            <span className="text-sm font-medium text-wine">RSVP 表单</span>
            <span className="text-xs bg-blush text-wine px-2 py-0.5 rounded-full">
              {rsvpFields.length} 个字段（草稿）
            </span>
          </div>
          <button
            onClick={() => setShowAddField(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-rose-gold/10 text-rose-gold rounded-lg hover:bg-rose-gold/20 transition-colors"
          >
            <Plus size={14} />
            添加字段
          </button>
        </div>
        <p className="text-xs text-warmgray mt-2">
          自定义宾客回复时需要填写的内容
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {rsvpFields.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-warmgray text-sm">暂无表单字段</p>
            <p className="text-warmgray/60 text-xs mt-1">点击添加按钮创建字段</p>
          </div>
        ) : (
          rsvpFields.map((field) => (
            <div
              key={field.id}
              className="p-3 bg-white rounded-xl border border-blush/50 hover:shadow-card transition-all"
            >
              <div className="flex items-start gap-2">
                <div className="mt-1 cursor-grab text-warmgray/40">
                  <GripVertical size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-wine">{field.label}</span>
                    {field.required && (
                      <span className="text-xs text-red-500">*必填</span>
                    )}
                  </div>
                  <p className="text-xs text-warmgray mt-1">
                    {fieldTypes.find((t) => t.value === field.type)?.label}
                  </p>
                  {field.options && field.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {field.options.map((opt, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-blush/50 text-warmgray rounded-full"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeRsvpField(field.id)}
                  className="p-1.5 text-warmgray/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddField && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-wine">添加表单字段</h3>
              <button
                onClick={() => setShowAddField(false)}
                className="p-1 text-warmgray hover:text-wine transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-warmgray mb-1 block">字段标签 *</label>
                <input
                  type="text"
                  value={newField.label || ""}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                  placeholder="如：您的姓名"
                />
              </div>
              <div>
                <label className="text-xs text-warmgray mb-1 block">字段类型</label>
                <select
                  value={newField.type || "text"}
                  onChange={(e) =>
                    setNewField({
                      ...newField,
                      type: e.target.value as RsvpFieldType,
                      options: e.target.value === "select" || e.target.value === "checkbox"
                        ? newField.options || []
                        : [],
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required || false}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="w-4 h-4 text-rose-gold rounded focus:ring-rose-gold/30"
                />
                <label htmlFor="required" className="text-sm text-wine">
                  必填字段
                </label>
              </div>

              {(newField.type === "select" || newField.type === "checkbox") && (
                <div>
                  <label className="text-xs text-warmgray mb-2 block">选项列表</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                        className="flex-1 px-3 py-2 text-sm border border-blush rounded-lg focus:outline-none focus:border-rose-gold/50"
                        placeholder="输入选项"
                      />
                      <button
                        onClick={handleAddOption}
                        className="px-3 py-2 bg-rose-gold/10 text-rose-gold rounded-lg hover:bg-rose-gold/20 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {(newField.options || []).map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 bg-blush/30 rounded-lg"
                        >
                          <span className="text-sm text-wine">{opt}</span>
                          <button
                            onClick={() => handleRemoveOption(i)}
                            className="text-warmgray hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddField(false)}
                className="px-4 py-2 text-sm text-warmgray hover:bg-blush/50 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddField}
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
