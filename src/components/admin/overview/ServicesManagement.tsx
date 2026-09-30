"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Database,
  ExternalLink,
  Layers,
  Cloud,
  Search,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { toast } from "sonner";

export interface ServiceRecord {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const PRESET_ICONS = [
  {
    label: "Development",
    path: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743371/crevosys/services/ghuumarstp3ikzie6trp.png",
  },
  {
    label: "Marketing",
    path: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743402/crevosys/services/cgvfd5lhmxkkdimbtif5.png",
  },
  {
    label: "Design",
    path: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743410/crevosys/services/npr1r4njujfxbnuuowsc.png",
  },
  {
    label: "Automation",
    path: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743412/crevosys/services/khipa8xxpoinjrozutcr.png",
  },
  {
    label: "Default Card Icon",
    path: "/card_icons/Icon.png",
  },
];

export default function ServicesManagement() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "/card_icons/Icon.png",
    order: 0,
    isActive: true,
  });

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/services");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setServices(json.data);
      } else {
        toast.error(json.error || "Failed to load services");
      }
    } catch {
      toast.error("Failed to connect to MongoDB services API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      icon: "/card_icons/Icon.png",
      order: services.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (svc: ServiceRecord) => {
    setEditingService(svc);
    setFormData({
      title: svc.title,
      slug: svc.slug,
      description: svc.description,
      icon: svc.icon || "/card_icons/Icon.png",
      order: svc.order ?? 0,
      isActive: svc.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in both title and description");
      return;
    }

    setIsSaving(true);
    try {
      if (editingService) {
        // Update existing service
        const res = await fetch(`/api/services/${editingService._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success(`"${formData.title}" updated in MongoDB`);
          setIsModalOpen(false);
          fetchServices();
        } else {
          toast.error(data.error || "Failed to update service");
        }
      } else {
        // Create new service
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success(`"${formData.title}" uploaded to MongoDB!`);
          setIsModalOpen(false);
          fetchServices();
        } else {
          toast.error(data.error || "Failed to create service");
        }
      }
    } catch {
      toast.error("Server error while saving service to MongoDB");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading icon to Cloudinary...");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "crevosys/services");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.data?.secure_url) {
        setFormData((prev) => ({ ...prev, icon: json.data.secure_url }));
        toast.success("Icon uploaded to Cloudinary!", { id: toastId });
      } else {
        toast.error(json.error || "Upload failed", { id: toastId });
      }
    } catch {
      toast.error("Network error during Cloudinary upload", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(`"${title}" deleted from database`);
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(data.error || "Failed to delete service");
      }
    } catch {
      toast.error("Network error while deleting service");
    }
  };

  const handleToggleActive = async (svc: ServiceRecord) => {
    const updatedStatus = !svc.isActive;
    try {
      const res = await fetch(`/api/services/${svc._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === svc._id ? { ...s, isActive: updatedStatus } : s))
        );
        toast.success(`Service marked as ${updatedStatus ? "Active" : "Inactive"}`);
      }
    } catch {
      toast.error("Failed to toggle status");
    }
  };

  const handleMoveOrder = async (svc: ServiceRecord, direction: "up" | "down") => {
    const newOrder = direction === "up" ? Math.max(1, svc.order - 1) : svc.order + 1;
    try {
      const res = await fetch(`/api/services/${svc._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order updated for ${svc.title}`);
        fetchServices();
      }
    } catch {
      toast.error("Failed to update order");
    }
  };

  const handleSeedDefaults = async (forceReset = false) => {
    if (forceReset) {
      if (
        !confirm(
          "⚠️ WARNING: This will completely RESET all services to factory defaults. Any custom services you created will be permanently removed! Continue?"
        )
      ) {
        return;
      }
    } else {
      if (
        !confirm(
          "Seed initial default services into MongoDB? Any custom services you uploaded will be preserved."
        )
      ) {
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/services/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: forceReset }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Services synced with MongoDB");
        fetchServices();
      } else {
        toast.error(data.error || "Failed to seed defaults");
      }
    } catch {
      toast.error("Network error while seeding");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered Services List
  const filteredServices = services.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "active") return svc.isActive;
    if (statusFilter === "inactive") return !svc.isActive;
    return true;
  });

  const activeCount = services.filter((s) => s.isActive).length;
  const inactiveCount = services.length - activeCount;

  return (
    <div
      id="services"
      className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md space-y-6 transition-colors scroll-mt-24"
    >
      {/* 1. Header Bar with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Services Management
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  MongoDB Live
                </span>
              </h3>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Dynamic service catalog stored in MongoDB. Upload new services or edit live descriptions and icons.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={fetchServices}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50"
            title="Refresh from MongoDB"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => handleSeedDefaults(false)}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Seed default services into MongoDB without deleting custom services"
          >
            <Database size={13} className="text-[#ff8804]" />
            <span className="hidden sm:inline">Seed Defaults</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
          >
            <Plus size={16} />
            <span>Upload New Service</span>
          </button>
        </div>
      </div>

      {/* 2. Search, Stats & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950/60 p-3 rounded-2xl border border-white/5">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services or slugs..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10 text-xs self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({services.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === "active"
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === "inactive"
                ? "bg-zinc-800 text-zinc-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Inactive ({inactiveCount})
          </button>
        </div>
      </div>

      {/* 3. Grid of Service Cards */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-500 text-xs">
          <RefreshCw size={26} className="animate-spin text-[#ff8804]" />
          <span>Synchronizing with MongoDB...</span>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="py-14 text-center space-y-3 bg-zinc-950/40 rounded-2xl border border-white/5 p-6">
          <Layers size={36} className="mx-auto text-zinc-600" />
          <p className="text-sm font-semibold text-zinc-300">
            {services.length === 0 ? "No services stored in MongoDB" : "No matching services found"}
          </p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {services.length === 0
              ? "Click 'Upload New Service' to add your first service, or reset with default services."
              : "Try adjusting your search query or status filter."}
          </p>
          {services.length === 0 && (
            <button
              onClick={() => handleSeedDefaults(false)}
              className="mt-2 px-4 py-2 text-xs font-bold rounded-xl bg-orange-500/10 border border-orange-500/30 text-[#ff8804] hover:bg-orange-500/20 transition-all cursor-pointer"
            >
              Seed Initial Services
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((svc) => (
            <div
              key={svc._id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                svc.isActive
                  ? "bg-zinc-950/80 border-white/10 hover:border-white/20 shadow-lg"
                  : "bg-zinc-950/30 border-white/5 opacity-60"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 p-2 relative group">
                      <Image
                        src={svc.icon || "/card_icons/Icon.png"}
                        alt={svc.title}
                        width={40}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/card_icons/Icon.png";
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-base">{svc.title}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          Order: {svc.order}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1 mt-0.5">
                        /services/{svc.slug}
                      </span>
                    </div>
                  </div>

                  {/* Active/Inactive Toggle Button */}
                  <button
                    onClick={() => handleToggleActive(svc)}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors cursor-pointer ${
                      svc.isActive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                        : "bg-zinc-800 text-zinc-400 border-white/10 hover:bg-zinc-700"
                    }`}
                  >
                    {svc.isActive ? (
                      <>
                        <CheckCircle2 size={11} /> Active
                      </>
                    ) : (
                      <>
                        <XCircle size={11} /> Inactive
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href={`/services/${svc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                >
                  <ExternalLink size={12} className="text-[#ff8804]" />
                  <span>Preview Page</span>
                </a>

                <div className="flex items-center gap-1">
                  {/* Order adjustments */}
                  <button
                    onClick={() => handleMoveOrder(svc, "up")}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                    title="Move order up"
                  >
                    <MoveUp size={13} />
                  </button>
                  <button
                    onClick={() => handleMoveOrder(svc, "down")}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                    title="Move order down"
                  >
                    <MoveDown size={13} />
                  </button>

                  <div className="w-[1px] h-3.5 bg-white/10 mx-1" />

                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(svc)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 size={13} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(svc._id, svc.title)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Modal for Upload New Service / Edit Service */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d0d12] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-[#ff8804]" />
                  {editingService ? "Update Service" : "Upload New Service"}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {editingService
                    ? "Modify title, description, or icon."
                    : "Fill in service details to store in MongoDB."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white text-xs px-2.5 py-1.5 rounded-lg bg-white/5 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const autoSlug = title
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        title,
                        slug: editingService ? prev.slug : autoSlug,
                      }));
                    }}
                    placeholder="e.g. Cloud Infrastructure"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Slug / URL Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    placeholder="e.g. cloud-infrastructure"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Order */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff8804]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Service Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what this service delivers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff8804] leading-relaxed"
                />
              </div>

              {/* Icon Upload & Presets */}
              <div className="space-y-2 bg-zinc-950/70 p-3.5 rounded-2xl border border-white/10">
                <label className="block text-xs font-semibold text-zinc-200">
                  Service Icon / Image (Cloudinary Hosted)
                </label>

                {/* Upload & Live Preview Row */}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white flex items-center gap-2 transition-all">
                    <Cloud size={14} className="text-[#ff8804]" />
                    <span>{isUploading ? "Uploading to Cloudinary..." : "Choose Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCloudinaryUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  {formData.icon && (
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center p-1 shrink-0">
                        <Image
                          src={formData.icon}
                          alt="preview"
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono truncate max-w-[180px]">
                        {formData.icon.includes("cloudinary") ? "✓ Cloudinary Hosted" : "Selected"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct URL input */}
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff8804]"
                />

                {/* Preset Icons */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[10px] text-zinc-500">Presets:</span>
                  {PRESET_ICONS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: p.path })}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                        formData.icon === p.path
                          ? "bg-orange-500/20 text-[#ff8804] border-orange-500/40 font-semibold"
                          : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded accent-[#ff8804] w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs text-zinc-300 cursor-pointer select-none"
                >
                  Active & publicly visible on website
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-xl bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-5 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ee0979] hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  {isSaving && <RefreshCw size={13} className="animate-spin" />}
                  {editingService ? "Update in MongoDB" : "Upload to MongoDB"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
