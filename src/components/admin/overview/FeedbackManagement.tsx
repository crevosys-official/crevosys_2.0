"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
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
  Star,
  Sparkles,
  LayoutGrid,
  List,
  Quote,
  Building,
  MapPin,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { FeedbackItem } from "@/types/feedback";

const PRESET_AVATARS = [
  {
    name: "John Doe",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    role: "Founder & CEO",
  },
  {
    name: "Robert Johnson",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    role: "VP of Product",
  },
  {
    name: "Jane Smith",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    role: "Managing Director",
  },
  {
    name: "Emily Davis",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    role: "Design Lead",
  },
  {
    name: "Marcus Chen",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    role: "CTO",
  },
  {
    name: "Sophia Martinez",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    role: "VP Operations",
  },
];

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "featured">("all");
  const [countryFilter, setCountryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<FeedbackItem | null>(null);
  const [deleteConfirmFeedback, setDeleteConfirmFeedback] = useState<FeedbackItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    sender_name: "",
    role: "",
    company: "",
    sender_country: "USA",
    sender_profile: PRESET_AVATARS[0].url,
    feedback: "",
    rating: 5,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    order: 0,
    isActive: true,
    isFeatured: true,
  });

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feedbacks");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setFeedbacks(json.data);
      } else {
        toast.error(json.error || "Failed to load feedbacks");
      }
    } catch {
      toast.error("Failed to connect to MongoDB feedbacks API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const openCreateModal = () => {
    setEditingFeedback(null);
    setFormData({
      sender_name: "",
      role: "",
      company: "",
      sender_country: "USA",
      sender_profile: PRESET_AVATARS[0].url,
      feedback: "",
      rating: 5,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      order: feedbacks.length > 0 ? Math.max(...feedbacks.map((f) => f.order || 0)) + 1 : 1,
      isActive: true,
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (fb: FeedbackItem) => {
    setEditingFeedback(fb);
    setFormData({
      sender_name: fb.sender_name || "",
      role: fb.role || "",
      company: fb.company || "",
      sender_country: fb.sender_country || "USA",
      sender_profile: fb.sender_profile || PRESET_AVATARS[0].url,
      feedback: fb.feedback || "",
      rating: fb.rating || 5,
      date: fb.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      order: fb.order || 0,
      isActive: fb.isActive !== false,
      isFeatured: fb.isFeatured !== false,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadToast = toast.loading("Uploading client avatar to Cloudinary...");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "crevosys/feedbacks");

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const json = await res.json();

      if (json.success && json.data?.url) {
        setFormData((prev) => ({ ...prev, sender_profile: json.data.url }));
        toast.success("Avatar uploaded successfully", { id: uploadToast });
      } else {
        toast.error(json.error || "Upload failed", { id: uploadToast });
      }
    } catch {
      toast.error("Network error during image upload", { id: uploadToast });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender_name.trim()) {
      toast.error("Please enter client full name");
      return;
    }
    if (!formData.feedback.trim()) {
      toast.error("Please enter testimonial quote");
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading(
      editingFeedback ? "Updating testimonial..." : "Adding testimonial..."
    );

    try {
      const url = editingFeedback
        ? `/api/feedbacks/${editingFeedback._id || editingFeedback.id}`
        : "/api/feedbacks";
      const method = editingFeedback ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.success) {
        toast.success(
          editingFeedback ? "Testimonial updated!" : "Testimonial created!",
          { id: saveToast }
        );
        setIsModalOpen(false);
        fetchFeedbacks();
      } else {
        toast.error(json.error || "Failed to save feedback", { id: saveToast });
      }
    } catch {
      toast.error("An error occurred while saving", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (fb: FeedbackItem) => {
    const updatedStatus = !(fb.isActive !== false);
    try {
      const res = await fetch(`/api/feedbacks/${fb._id || fb.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedbacks((prev) =>
          prev.map((item) =>
            (item._id || item.id) === (fb._id || fb.id)
              ? { ...item, isActive: updatedStatus }
              : item
          )
        );
        toast.success(`Feedback ${updatedStatus ? "activated" : "hidden"}!`);
      } else {
        toast.error(json.error || "Failed to toggle status");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleToggleFeatured = async (fb: FeedbackItem) => {
    const updatedFeatured = !(fb.isFeatured !== false);
    try {
      const res = await fetch(`/api/feedbacks/${fb._id || fb.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: updatedFeatured }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedbacks((prev) =>
          prev.map((item) =>
            (item._id || item.id) === (fb._id || fb.id)
              ? { ...item, isFeatured: updatedFeatured }
              : item
          )
        );
        toast.success(`Feedback ${updatedFeatured ? "marked featured" : "unmarked featured"}!`);
      } else {
        toast.error(json.error || "Failed to toggle featured status");
      }
    } catch {
      toast.error("Failed to update featured status");
    }
  };

  const handleReorder = async (fb: FeedbackItem, direction: "up" | "down") => {
    const currentIndex = feedbacks.findIndex(
      (item) => (item._id || item.id) === (fb._id || fb.id)
    );
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= feedbacks.length) return;

    const currentOrder = fb.order ?? currentIndex;
    const targetOrder = feedbacks[targetIndex].order ?? targetIndex;

    const swapOrder = currentOrder === targetOrder ? (direction === "up" ? currentOrder - 1 : currentOrder + 1) : targetOrder;

    try {
      await fetch(`/api/feedbacks/${fb._id || fb.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: swapOrder }),
      });
      fetchFeedbacks();
    } catch {
      toast.error("Failed to reorder feedback");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmFeedback) return;
    const deleteToast = toast.loading("Deleting feedback from MongoDB...");
    try {
      const res = await fetch(
        `/api/feedbacks/${deleteConfirmFeedback._id || deleteConfirmFeedback.id}`,
        {
          method: "DELETE",
        }
      );
      const json = await res.json();
      if (json.success) {
        toast.success("Feedback deleted successfully", { id: deleteToast });
        setDeleteConfirmFeedback(null);
        fetchFeedbacks();
      } else {
        toast.error(json.error || "Failed to delete feedback", { id: deleteToast });
      }
    } catch {
      toast.error("Error deleting feedback", { id: deleteToast });
    }
  };

  // Extract unique countries
  const countries = useMemo(() => {
    const set = new Set<string>();
    feedbacks.forEach((fb) => {
      if (fb.sender_country) set.add(fb.sender_country);
    });
    return Array.from(set);
  }, [feedbacks]);

  // Filtered List
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        fb.sender_name?.toLowerCase().includes(query) ||
        fb.company?.toLowerCase().includes(query) ||
        fb.role?.toLowerCase().includes(query) ||
        fb.sender_country?.toLowerCase().includes(query) ||
        fb.feedback?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && fb.isActive !== false) ||
        (statusFilter === "inactive" && fb.isActive === false) ||
        (statusFilter === "featured" && fb.isFeatured === true);

      const matchesCountry =
        countryFilter === "all" || fb.sender_country === countryFilter;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }, [feedbacks, searchQuery, statusFilter, countryFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = feedbacks.length;
    const active = feedbacks.filter((f) => f.isActive !== false).length;
    const featured = feedbacks.filter((f) => f.isFeatured === true).length;
    const avgRating = total > 0
      ? (feedbacks.reduce((acc, curr) => acc + (curr.rating || 5), 0) / total).toFixed(1)
      : "5.0";
    return { total, active, featured, avgRating };
  }, [feedbacks]);

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md space-y-6 transition-all">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
            <MessageSquareQuote size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Client Feedback & Testimonials
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/15 text-[#ff8804] border border-orange-500/30 font-semibold font-mono">
                {feedbacks.length} Live
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live reviews dynamically fetched from MongoDB collection `feedbacks` for testimonial sliders and social proof.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchFeedbacks}
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
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Total Reviews</p>
          <p className="text-xl font-bold text-white mt-1">{metrics.total}</p>
        </div>
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-emerald-400 uppercase tracking-wider font-mono">Active on Site</p>
          <p className="text-xl font-bold text-white mt-1">{metrics.active}</p>
        </div>
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl">
          <p className="text-[11px] text-amber-400 uppercase tracking-wider font-mono">Featured</p>
          <p className="text-xl font-bold text-white mt-1">{metrics.featured}</p>
        </div>
        <div className="bg-zinc-950/60 border border-white/5 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#ff8804] uppercase tracking-wider font-mono">Avg Rating</p>
            <p className="text-xl font-bold text-white mt-1">{metrics.avgRating} <span className="text-xs text-zinc-500 font-normal">/ 5.0</span></p>
          </div>
          <div className="flex text-amber-400">
            <Star size={18} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search client, company, country, quote..."
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

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* Status Tabs */}
          <div className="flex items-center bg-zinc-950/80 rounded-xl p-1 border border-white/10">
            {(["all", "active", "inactive", "featured"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  statusFilter === tab
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Country Selector */}
          {countries.length > 0 && (
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-zinc-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#ff8804]"
            >
              <option value="all">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Content Rendering: Loading / Empty / Grid / Table */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-500 gap-3">
          <RefreshCw size={24} className="animate-spin text-[#ff8804]" />
          <p className="text-xs font-mono">Connecting to MongoDB & loading testimonials...</p>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/30">
          <Quote size={32} className="mx-auto text-zinc-600 mb-2" />
          <p className="text-sm font-semibold text-zinc-300">No feedbacks found</p>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No testimonials match "${searchQuery}". Try clearing filters.`
              : "No feedback items in MongoDB yet. Click 'Add Testimonial' to add your first client review."}
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/10 transition-colors"
          >
            Create Feedback
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeedbacks.map((fb, idx) => {
            const id = fb._id || fb.id;
            return (
              <div
                key={id || idx}
                className={`group relative bg-zinc-950/70 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-0.5 ${
                  fb.isActive === false
                    ? "border-red-500/20 opacity-60 bg-red-950/5"
                    : fb.isFeatured
                    ? "border-amber-500/30 hover:border-amber-500/50"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Top Row: User Avatar & Quick Info */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/15 bg-zinc-800 shrink-0">
                        {fb.sender_profile ? (
                          <Image
                            src={fb.sender_profile}
                            alt={fb.sender_name || "Client"}
                            fill
                            sizes="48px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-bold">
                            {fb.sender_name?.charAt(0) || "C"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {fb.sender_name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                          {fb.role && <span>{fb.role}</span>}
                          {fb.role && fb.company && <span>•</span>}
                          {fb.company && <span className="text-zinc-300 font-medium">{fb.company}</span>}
                        </div>
                        {fb.sender_country && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500 mt-0.5 font-mono">
                            <MapPin size={10} /> {fb.sender_country}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg text-amber-400">
                      <Star size={11} fill="currentColor" />
                      <span className="text-xs font-bold font-mono ml-0.5">
                        {fb.rating || 5}
                      </span>
                    </div>
                  </div>

                  {/* Feedback Quote */}
                  <div className="relative my-3 pl-3 border-l-2 border-[#ff8804]/40">
                    <p className="text-xs text-zinc-300 italic line-clamp-3 leading-relaxed">
                      &ldquo;{fb.feedback}&rdquo;
                    </p>
                  </div>

                  {/* Badges / Metadata */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-zinc-500 mt-2">
                    {fb.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {fb.date}
                      </span>
                    )}
                    {fb.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-semibold flex items-center gap-1">
                        <Sparkles size={9} /> Featured
                      </span>
                    )}
                    <span className="text-zinc-600 font-mono">Order: #{fb.order ?? idx}</span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {/* Toggle Active */}
                    <button
                      onClick={() => handleToggleActive(fb)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                        fb.isActive !== false
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                      }`}
                      title={fb.isActive !== false ? "Hide from website" : "Make visible on website"}
                    >
                      {fb.isActive !== false ? (
                        <>
                          <CheckCircle2 size={11} /> Active
                        </>
                      ) : (
                        <>
                          <XCircle size={11} /> Hidden
                        </>
                      )}
                    </button>

                    {/* Toggle Featured */}
                    <button
                      onClick={() => handleToggleFeatured(fb)}
                      className={`text-xs p-1.5 rounded-lg transition-colors border ${
                        fb.isFeatured
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-white/[0.04] text-zinc-500 hover:text-zinc-300 border-white/5"
                      }`}
                      title="Toggle Featured in Hero/Showcase"
                    >
                      <Sparkles size={13} />
                    </button>
                  </div>

                  {/* Reorder and Edit/Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleReorder(fb, "up")}
                      className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      title="Move Up"
                    >
                      <MoveUp size={13} />
                    </button>
                    <button
                      onClick={() => handleReorder(fb, "down")}
                      className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      title="Move Down"
                    >
                      <MoveDown size={13} />
                    </button>
                    <button
                      onClick={() => openEditModal(fb)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-white/10 transition-colors"
                      title="Edit Testimonial"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmFeedback(fb)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Testimonial"
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
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Role & Company</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Feedback Quote</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredFeedbacks.map((fb, idx) => {
                const id = fb._id || fb.id;
                return (
                  <tr key={id || idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-zinc-800 shrink-0">
                          {fb.sender_profile ? (
                            <Image
                              src={fb.sender_profile}
                              alt={fb.sender_name}
                              fill
                              sizes="32px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">
                              {fb.sender_name?.charAt(0) || "C"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{fb.sender_name}</p>
                          {fb.sender_country && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {fb.sender_country}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-zinc-300 font-medium">{fb.company || "—"}</div>
                      <div className="text-[11px] text-zinc-500">{fb.role || "—"}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-mono text-[11px]">
                        <Star size={11} fill="currentColor" /> {fb.rating || 5}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="truncate text-zinc-300 italic" title={fb.feedback}>
                        &ldquo;{fb.feedback}&rdquo;
                      </p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(fb)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          fb.isActive !== false
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-zinc-800 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {fb.isActive !== false ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-zinc-400">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleReorder(fb, "up")}
                          className="p-1 hover:text-white text-zinc-500"
                        >
                          <MoveUp size={11} />
                        </button>
                        <span>{fb.order ?? idx}</span>
                        <button
                          onClick={() => handleReorder(fb, "down")}
                          className="p-1 hover:text-white text-zinc-500"
                        >
                          <MoveDown size={11} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(fb)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-white/10 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmFeedback(fb)}
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
                  <Quote size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {editingFeedback ? "Edit Client Testimonial" : "Add New Testimonial"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Provide verified client feedback and review metadata.
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
              {/* Row 1: Client Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Client Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Digital Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 2: Role & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Client Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & CEO, VP Product"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Country / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. USA, Canada, UK, Germany"
                    value={formData.sender_country}
                    onChange={(e) => setFormData({ ...formData, sender_country: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 3: Rating, Date, Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Star Rating (1-5)</label>
                  <div className="flex items-center gap-1.5 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={18}
                          fill={star <= formData.rating ? "currentColor" : "none"}
                          className={star <= formData.rating ? "text-amber-400" : "text-zinc-600"}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-white ml-auto font-mono">
                      {formData.rating}.0
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Date Displayed</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 24, 2024"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Row 4: Client Avatar / Photo */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">
                  Client Avatar Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 bg-zinc-800 shrink-0">
                    {formData.sender_profile ? (
                      <Image
                        src={formData.sender_profile}
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
                      type="url"
                      placeholder="Paste Image URL or select from presets below"
                      value={formData.sender_profile}
                      onChange={(e) => setFormData({ ...formData, sender_profile: e.target.value })}
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

                {/* Preset Avatars Quick Selector */}
                <div className="pt-2">
                  <p className="text-[11px] text-zinc-400 mb-1.5">Or choose from sample client avatars:</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_AVATARS.map((preset, pIdx) => (
                      <button
                        type="button"
                        key={pIdx}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            sender_profile: preset.url,
                            sender_name: prev.sender_name || preset.name,
                            role: prev.role || preset.role,
                          }))
                        }
                        className={`relative w-8 h-8 rounded-full overflow-hidden border transition-all ${
                          formData.sender_profile === preset.url
                            ? "border-[#ff8804] scale-110 shadow-md shadow-orange-500/30"
                            : "border-white/10 opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                        title={preset.name}
                      >
                        <Image
                          src={preset.url}
                          alt={preset.name}
                          fill
                          sizes="32px"
                          unoptimized
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Testimonial Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Client Testimonial Quote <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the client's experience working with Crevosys, highlights of delivery, or impact..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] leading-relaxed"
                />
              </div>

              {/* Row 6: Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff8804] focus:ring-[#ff8804] bg-zinc-800 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active on Website</span>
                    <span className="text-[11px] text-zinc-400 block">
                      Display this review in public testimonials carousel.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff8804] focus:ring-[#ff8804] bg-zinc-800 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-400 block flex items-center gap-1">
                      <Sparkles size={11} /> Featured Testimonial
                    </span>
                    <span className="text-[11px] text-zinc-400 block">
                      Prioritize in hero slider and marquee highlights.
                    </span>
                  </div>
                </label>
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
                  <span>{editingFeedback ? "Save Changes" : "Create Testimonial"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-zinc-950 border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Delete Testimonial?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Are you sure you want to delete the testimonial from{" "}
                <span className="text-white font-semibold">
                  {deleteConfirmFeedback.sender_name}
                </span>{" "}
                ({deleteConfirmFeedback.company || "Client"})? This action will permanently remove it from MongoDB.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmFeedback(null)}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Delete Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
