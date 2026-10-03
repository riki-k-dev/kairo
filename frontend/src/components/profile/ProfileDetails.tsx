// frontend/src/components/profile/ProfileDetails.tsx

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function ProfileDetails() {
  const { user, loginUser, token } = useAuth();

  const [nameVal, setNameVal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user?.name) setNameVal(user.name);
  }, [user]);

  const handleNameUpdate = async () => {
    if (!nameVal.trim() || nameVal === user?.name) return;
    setIsSaving(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await api.patch("/users/me", { name: nameVal });
      if (res.data.success && token) {
        loginUser(token, { ...user!, name: res.data.data.name });
        setMsg({ text: "Name updated successfully!", type: "success" });
        setTimeout(() => setMsg({ text: "", type: "" }), 3000);
      }
    } catch (err: unknown) {
      setMsg({
        text: err instanceof Error ? err.message : "Failed to update name",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[var(--input-border)]">
        <h2 className="text-lg font-medium text-[var(--text-main)]">
          Profile Details
        </h2>
      </div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-[var(--bg-secondary)] border border-[var(--input-border)] flex items-center justify-center rounded">
          <span className="text-5xl md:text-6xl font-light text-[var(--text-main)] uppercase">
            {user?.name ? user.name.charAt(0) : "U"}
          </span>
        </div>

        <div className="flex-1 w-full space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm text-[var(--text-main)] block">
                Name
              </label>
              <input
                type="text"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                className="w-full px-4 py-2 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] text-[var(--text-main)] focus:outline-none focus:border-gray-400 transition-colors"
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-[var(--text-main)] block">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-2 rounded border border-[var(--input-border)] bg-[var(--bg-primary)] text-[var(--text-muted)] opacity-70 cursor-not-allowed transition-colors"
                disabled
              />
              <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[var(--text-muted)]" />
                Email is managed by JWT+Bcrypt
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            {msg.text && (
              <span
                className={`text-sm ${msg.type === "error" ? "text-red-500" : "text-green-500"}`}
              >
                {msg.text}
              </span>
            )}
            <button
              onClick={handleNameUpdate}
              disabled={isSaving || nameVal === user?.name}
              className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-6 py-2 rounded text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer border border-transparent dark:border-[var(--input-border)]"
            >
              ✓ {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
