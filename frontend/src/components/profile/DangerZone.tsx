// frontend/src/components/profile/DangerZone.tsx

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function DangerZone() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you absolutely sure? This will permanently delete your account and all your tasks. This action cannot be undone.",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await api.delete("/users/me");
      if (res.data.success) {
        logoutUser();
        navigate("/signup", { replace: true });
      }
    } catch (err) {
      console.error("Failed to delete account", err);
      alert("Something went wrong while deleting the account.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-[var(--input-bg)] border border-[var(--input-border)] rounded overflow-hidden shadow-sm flex items-center justify-between p-6">
      <div>
        <h2 className="text-lg font-medium text-[var(--text-main)]">
          Delete account
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Removes all data permanently
        </p>
      </div>
      <button
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="flex items-center gap-2 bg-[#1a0505] text-[#ff4d4d] border border-[#ff4d4d]/30 px-5 py-2.5 rounded hover:bg-[#ff4d4d] hover:text-white transition-colors cursor-pointer disabled:opacity-50 font-medium"
      >
        {isDeleting ? "Deleting..." : "Delete"} <Trash2 size={16} />
      </button>
    </div>
  );
}
