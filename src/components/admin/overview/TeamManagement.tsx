"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Search,
  MoveUp,
  MoveDown,
  UploadCloud,
  X,
  Crown,
  GraduationCap,
  Briefcase,
  Linkedin,
  Github,
  Twitter,
  Mail,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { TeamMemberItem } from "@/types/team";

const PRESET_TEAM_PICTURES = [
  { name: "Sahid (CEO)", path: "/Team/sahid_withoutGlow.png", role: "CEO" },
  { name: "Joyant (CTO)", path: "/Team/joyant_withoutGlow.png", role: "CTO" },
  { name: "Mumu (CBO)", path: "/Team/mumu_withoutGlow.png", role: "CBO" },
  { name: "Abid (COO)", path: "/Team/abid_withoutGlow.png", role: "COO" },
  { name: "Sumon (CMO)", path: "/Team/sumon_withoutGlow.png", role: "CMO" },
  { name: "Jenifa (Frontend)", path: "/Team/jenifa_withoutGlow.png", role: "Developer" },
];

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMemberItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "leadership" | "active" | "inactive">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [deleteConfirmMember, setDeleteConfirmMember] = useState<TeamMemberItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    designation: "",
    position: "",
    role: "",
    picture: PRESET_TEAM_PICTURES[0].path,
    education: "Metropolitan University, Sylhet",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      email: "",
    },
    order: 0,
    isActive: true,
    isLeadership: true,
  });

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/teams");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMembers(json.data);
      } else {
        toast.error(json.error || "Failed to load team members");
      }
    } catch {
      toast.error("Failed to connect to MongoDB teams API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      slug: "",
      designation: "",
      position: "",
      role: "",
      picture: PRESET_TEAM_PICTURES[0].path,
      education: "Metropolitan University, Sylhet",
      bio: "",
      socialLinks: {
        linkedin: "",
        github: "",
        twitter: "",
        email: "",
      },
      order: members.length > 0 ? Math.max(...members.map((m) => m.order || 0)) + 1 : 1,
      isActive: true,
      isLeadership: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMemberItem) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      slug: member.slug || "",
      designation: member.designation || "",
      position: member.position || "",
      role: member.role || "",
      picture: member.picture || PRESET_TEAM_PICTURES[0].path,
      education: member.education || "Metropolitan University, Sylhet",
      bio: member.bio || "",
      socialLinks: {
        linkedin: member.socialLinks?.linkedin || "",
        github: member.socialLinks?.github || "",
        twitter: member.socialLinks?.twitter || "",
        email: member.socialLinks?.email || "",
      },
      order: member.order || 0,
      isActive: member.isActive !== false,
      isLeadership: member.isLeadership === true,
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingMember ? prev.slug : slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadToast = toast.loading("Uploading team portrait to Cloudinary...");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "crevosys/team");

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const json = await res.json();

      if (json.success && json.data?.url) {
        setFormData((prev) => ({ ...prev, picture: json.data.url }));
        toast.success("Portrait uploaded successfully", { id: uploadToast });
      } else {
        toast.error(json.error || "Upload failed", { id: uploadToast });
      }
    } catch {
      toast.error("Network error during photo upload", { id: uploadToast });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter team member name");
      return;
    }
    if (!formData.designation.trim()) {
      toast.error("Please enter designation (e.g. CEO, Senior Developer)");
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading(
      editingMember ? "Updating member profile..." : "Adding team member..."
    );

    try {
      const url = editingMember
        ? `/api/teams/${editingMember._id || editingMember.id}`
        : "/api/teams";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.success) {
        toast.success(
          editingMember ? "Member profile updated!" : "Team member added!",
          { id: saveToast }
        );
        setIsModalOpen(false);
        fetchMembers();
      } else {
        toast.error(json.error || "Failed to save team member", { id: saveToast });
      }
    } catch {
      toast.error("An error occurred while saving", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (member: TeamMemberItem) => {
    const updatedStatus = !(member.isActive !== false);
    try {
      const res = await fetch(`/api/teams/${member._id || member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setMembers((prev) =>
          prev.map((item) =>
            (item._id || item.id) === (member._id || member.id)
              ? { ...item, isActive: updatedStatus }
              : item
          )
        );
        toast.success(`Member ${updatedStatus ? "activated" : "hidden"}!`);
      } else {
        toast.error(json.error || "Failed to toggle status");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleToggleLeadership = async (member: TeamMemberItem) => {
    const updatedLeadership = !(member.isLeadership === true);
    try {
      const res = await fetch(`/api/teams/${member._id || member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLeadership: updatedLeadership }),
      });
      const json = await res.json();
      if (json.success) {
        setMembers((prev) =>
          prev.map((item) =>
            (item._id || item.id) === (member._id || member.id)
              ? { ...item, isLeadership: updatedLeadership }
              : item
          )
        );
        toast.success(
          `Member ${updatedLeadership ? "promoted to leadership squad" : "removed from leadership squad"}!`
        );
      } else {
        toast.error(json.error || "Failed to toggle leadership");
      }
    } catch {
      toast.error("Failed to update leadership");
    }
  };

  const handleReorder = async (member: TeamMemberItem, direction: "up" | "down") => {
    const currentIndex = members.findIndex(
      (item) => (item._id || item.id) === (member._id || member.id)
    );
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const currentOrder = member.order ?? currentIndex;
    const targetOrder = members[targetIndex].order ?? targetIndex;

    const swapOrder = currentOrder === targetOrder ? (direction === "up" ? currentOrder - 1 : currentOrder + 1) : targetOrder;

    try {
      await fetch(`/api/teams/${member._id || member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: swapOrder }),
      });
      fetchMembers();
    } catch {
      toast.error("Failed to reorder member");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmMember) return;
    const deleteToast = toast.loading("Deleting team member from MongoDB...");
    try {
      const res = await fetch(
        `/api/teams/${deleteConfirmMember._id || deleteConfirmMember.id}`,
        {
          method: "DELETE",
        }
      );
      const json = await res.json();
      if (json.success) {
        toast.success("Team member deleted successfully", { id: deleteToast });
        setDeleteConfirmMember(null);
        fetchMembers();
      } else {
        toast.error(json.error || "Failed to delete member", { id: deleteToast });
      }
    } catch {
      toast.error("Error deleting member", { id: deleteToast });
    }
  };

  // Filtered Members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        member.name?.toLowerCase().includes(query) ||
        member.designation?.toLowerCase().includes(query) ||
        member.position?.toLowerCase().includes(query) ||
        member.role?.toLowerCase().includes(query) ||
        member.bio?.toLowerCase().includes(query) ||
        member.education?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "leadership" && member.isLeadership === true) ||
        (statusFilter === "active" && member.isActive !== false) ||
        (statusFilter === "inactive" && member.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [members, searchQuery, statusFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.isActive !== false).length;
    const leadership = members.filter((m) => m.isLeadership === true).length;
    return { total, active, leadership };
  }, [members]);

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md space-y-6 transition-all">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Team &amp; Leadership Directory
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/15 text-[#ff8804] border border-orange-500/30 font-semibold font-mono">
                {members.length} Members
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Manage core engineers, executives, and specialists stored in MongoDB collection `teams` rendered on the public `/team` page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchMembers}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>

          <div className="flex items-center bg-zinc-950/80 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-[#ff8804] text-black font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "table"
                  ? "bg-[#ff8804] text-black font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List size={15} />
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff8804] hover:bg-[#ff9924] text-black font-bold text-xs shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Total Roster</p>
          <p className="text-xl font-bold text-white mt-1">{metrics.total}</p>
        </div>
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1">
            <Crown size={12} /> Executive Squad
          </p>
          <p className="text-xl font-bold text-white mt-1">{metrics.leadership}</p>
        </div>
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-emerald-400 uppercase tracking-wider font-mono">Active on Web</p>
          <p className="text-xl font-bold text-white mt-1">{metrics.active}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search member, role, title, education..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center bg-zinc-950/80 rounded-xl p-1 border border-white/10 w-full sm:w-auto overflow-x-auto scrollbar-none">
          {(["all", "leadership", "active", "inactive"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === tab
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab === "leadership" ? "Leadership Squad" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rendering: Loading / Empty / Grid / Table */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-500 gap-3">
          <RefreshCw size={24} className="animate-spin text-[#ff8804]" />
          <p className="text-xs font-mono">Connecting to MongoDB & loading team members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/30">
          <Users size={32} className="mx-auto text-zinc-600 mb-2" />
          <p className="text-sm font-semibold text-zinc-300">No team members found</p>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No members match "${searchQuery}". Try clearing filters.`
              : "No team members found in MongoDB. Click 'Add Member' to create a profile."}
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/10 transition-colors"
          >
            Add Member
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member, idx) => {
            const id = member._id || member.id;
            return (
              <div
                key={id || idx}
                className={`group relative bg-zinc-950/70 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-0.5 ${
                  member.isActive === false
                    ? "border-red-500/20 opacity-60 bg-red-950/5"
                    : member.isLeadership
                    ? "border-amber-500/30 hover:border-amber-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  {/* Top: Avatar & Name */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 bg-zinc-800 shrink-0">
                      {member.picture ? (
                        <Image
                          src={member.picture}
                          alt={member.name}
                          fill
                          sizes="64px"
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-lg">
                          {member.name?.charAt(0) || "T"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-bold text-white leading-tight truncate">
                          {member.name}
                        </h4>
                        {member.isLeadership && (
                          <span className="p-0.5 text-amber-400" title="Leadership Squad">
                            <Crown size={13} />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#ff8804] font-medium mt-0.5 truncate">
                        {member.designation}
                      </p>
                      {member.position && (
                        <p className="text-[11px] text-zinc-400 truncate">
                          {member.position}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Education & Bio */}
                  {member.education && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mb-2">
                      <GraduationCap size={12} className="text-zinc-500 shrink-0" />
                      <span className="truncate">{member.education}</span>
                    </div>
                  )}

                  {member.bio && (
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed bg-zinc-900/50 p-2.5 rounded-xl border border-white/5">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Links Icons */}
                  <div className="flex items-center gap-2 mt-3 pt-2 text-zinc-400">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md hover:text-[#0077b5] hover:bg-white/5 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={13} />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md hover:text-white hover:bg-white/5 transition-colors"
                        title="GitHub"
                      >
                        <Github size={13} />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md hover:text-[#1da1f2] hover:bg-white/5 transition-colors"
                        title="Twitter / X"
                      >
                        <Twitter size={13} />
                      </a>
                    )}
                    {member.socialLinks?.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="p-1 rounded-md hover:text-[#ff8804] hover:bg-white/5 transition-colors"
                        title="Email"
                      >
                        <Mail size={13} />
                      </a>
                    )}
                    <span className="text-[10px] text-zinc-600 font-mono ml-auto">
                      Order: #{member.order ?? idx}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {/* Toggle Active */}
                    <button
                      onClick={() => handleToggleActive(member)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                        member.isActive !== false
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                      }`}
                      title={member.isActive !== false ? "Hide from website" : "Make visible on website"}
                    >
                      {member.isActive !== false ? (
                        <>
                          <CheckCircle2 size={11} /> Active
                        </>
                      ) : (
                        <>
                          <XCircle size={11} /> Hidden
                        </>
                      )}
                    </button>

                    {/* Toggle Leadership */}
                    <button
                      onClick={() => handleToggleLeadership(member)}
                      className={`text-xs p-1.5 rounded-lg transition-colors border ${
                        member.isLeadership
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-white/[0.04] text-zinc-500 hover:text-zinc-300 border-white/5"
                      }`}
                      title="Toggle Executive Leadership Squad"
                    >
                      <Crown size={13} />
                    </button>
                  </div>

                  {/* Reorder and Edit/Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleReorder(member, "up")}
                      className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      title="Move Up"
                    >
                      <MoveUp size={13} />
                    </button>
                    <button
                      onClick={() => handleReorder(member, "down")}
                      className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      title="Move Down"
                    >
                      <MoveDown size={13} />
                    </button>
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-white/10 transition-colors"
                      title="Edit Profile"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmMember(member)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/80 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-white/10 font-mono">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Leadership</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredMembers.map((member, idx) => {
                const id = member._id || member.id;
                return (
                  <tr key={id || idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-zinc-800 shrink-0">
                          {member.picture ? (
                            <Image
                              src={member.picture}
                              alt={member.name}
                              fill
                              sizes="32px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">
                              {member.name?.charAt(0) || "T"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{member.name}</p>
                          {member.slug && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              /{member.slug}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-zinc-200 font-medium">{member.designation}</div>
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      {member.position || "—"}
                    </td>
                    <td className="py-3 px-4">
                      {member.isLeadership ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <Crown size={10} /> Leadership Squad
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-500 font-mono">Core Team</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          member.isActive !== false
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-800 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {member.isActive !== false ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-zinc-400">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleReorder(member, "up")}
                          className="p-1 hover:text-white text-zinc-500"
                        >
                          <MoveUp size={11} />
                        </button>
                        <span>{member.order ?? idx}</span>
                        <button
                          onClick={() => handleReorder(member, "down")}
                          className="p-1 hover:text-white text-zinc-500"
                        >
                          <MoveDown size={11} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-white/10 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmMember(member)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-zinc-900/60 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-[#ff8804] flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {editingMember ? "Edit Team Member" : "Add Team Member"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Configure profile information, role designation, and public portrait.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              {/* Row 1: Name and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MD Abu Sahid"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Profile Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. md-abu-sahid"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 2: Designation & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Designation / Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Executive Officer (CEO)"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Position / Tech Stack</label>
                  <input
                    type="text"
                    placeholder="e.g. MERN-DEVELOPER & UI/UX"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 3: Role subtitle & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Role Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. CEO • MERN Stack Developer & UI/UX Designer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Education / University</label>
                  <input
                    type="text"
                    placeholder="e.g. Metropolitan University, Sylhet"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 4: Member Picture / Portrait */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">
                  Member Portrait Picture
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 bg-zinc-800 shrink-0">
                    {formData.picture ? (
                      <Image
                        src={formData.picture}
                        alt="Preview"
                        fill
                        sizes="64px"
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                        No Pic
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="Image URL or local path (e.g. /Team/sahid_withoutGlow.png)"
                      value={formData.picture}
                      onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                    />

                    {/* Direct Cloudinary upload */}
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-zinc-200 transition-colors">
                        <UploadCloud size={13} />
                        <span>Upload photo to Cloudinary</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                      {isUploading && (
                        <span className="text-[11px] text-[#ff8804] animate-pulse">
                          Uploading to Cloudinary...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preset Team Pictures */}
                <div className="pt-2">
                  <p className="text-[11px] text-zinc-400 mb-1.5">Or choose from team assets:</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_TEAM_PICTURES.map((preset, pIdx) => (
                      <button
                        type="button"
                        key={pIdx}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            picture: preset.path,
                          }))
                        }
                        className={`relative w-9 h-9 rounded-xl overflow-hidden border transition-all ${
                          formData.picture === preset.path
                            ? "border-[#ff8804] scale-110 shadow-md shadow-orange-500/30"
                            : "border-white/10 opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                        title={preset.name}
                      >
                        <Image
                          src={preset.path}
                          alt={preset.name}
                          fill
                          sizes="36px"
                          unoptimized
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Member Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Biography & Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Professional background, core skills, leadership role..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] leading-relaxed"
                />
              </div>

              {/* Row 6: Social Links */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#ff8804]" /> Social &amp; Contact Links
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                      <Linkedin size={11} /> LinkedIn URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff8804]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                      <Github size={11} /> GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.socialLinks.github}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, github: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff8804]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                      <Twitter size={11} /> Twitter / X URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://twitter.com/username"
                      value={formData.socialLinks.twitter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff8804]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                      <Mail size={11} /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="member@crevosys.com"
                      value={formData.socialLinks.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, email: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff8804]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 7: Toggles & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff8804] focus:ring-[#ff8804] bg-zinc-800 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active on Web</span>
                    <span className="text-[11px] text-zinc-400 block">
                      Visible in team directory.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isLeadership}
                    onChange={(e) => setFormData({ ...formData, isLeadership: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff8804] focus:ring-[#ff8804] bg-zinc-800 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-400 block flex items-center gap-1">
                      <Crown size={11} /> Leadership Squad
                    </span>
                    <span className="text-[11px] text-zinc-400 block">
                      Render in top executive carousel.
                    </span>
                  </div>
                </label>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-mono">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Modal Sticky Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-zinc-950 py-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff8804] hover:bg-[#ff9924] text-black font-bold text-xs shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                >
                  {isSaving && <RefreshCw size={14} className="animate-spin" />}
                  <span>{editingMember ? "Save Changes" : "Create Member"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-zinc-950 border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Delete Team Member?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Are you sure you want to remove{" "}
                <span className="text-white font-semibold">
                  {deleteConfirmMember.name}
                </span>{" "}
                ({deleteConfirmMember.designation}) from the team directory? This action permanently removes them from MongoDB.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmMember(null)}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
