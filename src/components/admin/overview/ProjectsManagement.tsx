"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  MoveUp,
  MoveDown,
  UploadCloud,
  X,
  Tag,
  Calendar,
  Layers,
  Sparkles,
  Eye,
  Globe,
  Video,
  LayoutGrid,
  List,
} from "lucide-react";
import { toast } from "sonner";

export interface ProjectRecord {
  _id: string;
  order: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  modalImage?: string;
  year: number | string;
  description: string;
  tech: string[];
  videoUrl?: string;
  live?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const COMMON_TECH_SUGGESTIONS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Three.js",
  "MongoDB",
  "Node.js",
  "Vue.js",
  "Supabase",
  "Docker",
];

const COMMON_CATEGORIES = [
  "Web Design",
  "Full Stack Web App",
  "Modern & Secure Banking Solutions",
  "Hotel/Resort Management",
  "Modern Hospital Management SystemPlatform",
  "AI SaaS Landing",
  "E-Commerce Platform",
  "Mobile App Development",
];

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingModal, setIsUploadingModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectRecord | null>(null);
  const [techInput, setTechInput] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    image: "",
    modalImage: "",
    year: new Date().getFullYear().toString(),
    description: "",
    tech: [] as string[],
    videoUrl: "#",
    live: "",
    order: 0,
    isActive: true,
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
      } else {
        toast.error(json.error || "Failed to load projects");
      }
    } catch {
      toast.error("Failed to connect to MongoDB projects API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTechInput("");
    setFormData({
      title: "",
      slug: "",
      category: "",
      image: "",
      modalImage: "",
      year: new Date().getFullYear().toString(),
      description: "",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      videoUrl: "#",
      live: "",
      order: projects.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectRecord) => {
    setEditingProject(proj);
    setTechInput("");
    setFormData({
      title: proj.title,
      slug: proj.slug || "",
      category: proj.category,
      image: proj.image,
      modalImage: proj.modalImage || "",
      year: proj.year?.toString() || new Date().getFullYear().toString(),
      description: proj.description,
      tech: proj.tech || [],
      videoUrl: proj.videoUrl || "#",
      live: proj.live || "",
      order: proj.order ?? 0,
      isActive: proj.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      // Auto-generate slug if user is creating new project or hasn't manually customized slug
      const shouldAutoSlug = !editingProject || prev.slug === generateSlug(prev.title);
      return {
        ...prev,
        title: val,
        slug: shouldAutoSlug ? generateSlug(val) : prev.slug,
      };
    });
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleAddTechTag = (tagToAdd?: string) => {
    const raw = tagToAdd !== undefined ? tagToAdd : techInput;
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (!formData.tech.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, trimmed],
      }));
    }
    if (tagToAdd === undefined) setTechInput("");
  };

  const handleRemoveTechTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((t) => t !== tagToRemove),
    }));
  };

  // Image Upload Handler using existing /api/upload (Cloudinary)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: "image" | "modalImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP, SVG)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }

    if (targetField === "image") setIsUploadingMain(true);
    else setIsUploadingModal(true);

    const uploadToast = toast.loading(`Uploading ${targetField === "image" ? "main" : "modal"} image to Cloudinary...`);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "crevosys/projects");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        setFormData((prev) => ({ ...prev, [targetField]: json.data.url }));
        toast.success("Image uploaded successfully!", { id: uploadToast });
      } else {
        toast.error(json.error || "Failed to upload image", { id: uploadToast });
      }
    } catch {
      toast.error("Network error during image upload", { id: uploadToast });
    } finally {
      if (targetField === "image") setIsUploadingMain(false);
      else setIsUploadingModal(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Project title is required");
      return;
    }
    if (!formData.category.trim()) {
      toast.error("Project category is required");
      return;
    }
    if (!formData.image.trim()) {
      toast.error("Project main thumbnail image is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Project description is required");
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading(editingProject ? "Updating project in MongoDB..." : "Creating new project in MongoDB...");

    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
      };

      const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        toast.success(editingProject ? "Project updated successfully!" : "Project created successfully!", {
          id: saveToast,
        });
        setIsModalOpen(false);
        fetchProjects();
      } else {
        toast.error(json.error || "Failed to save project", { id: saveToast });
      }
    } catch {
      toast.error("Network error while saving project", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (proj: ProjectRecord) => {
    const updatedStatus = !proj.isActive;
    // Optimistic update
    setProjects((prev) =>
      prev.map((p) => (p._id === proj._id ? { ...p, isActive: updatedStatus } : p))
    );

    try {
      const res = await fetch(`/api/projects/${proj._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Project ${updatedStatus ? "activated" : "deactivated"}`);
      } else {
        toast.error(json.error || "Failed to update project status");
        fetchProjects();
      }
    } catch {
      toast.error("Failed to update status");
      fetchProjects();
    }
  };

  const handleReorder = async (proj: ProjectRecord, direction: "up" | "down") => {
    const currentIndex = projects.findIndex((p) => p._id === proj._id);
    if (currentIndex === -1) return;
    if (direction === "up" && currentIndex === 0) return;
    if (direction === "down" && currentIndex === projects.length - 1) return;

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const targetProj = projects[swapIndex];

    const currentOrder = proj.order ?? currentIndex + 1;
    const targetOrder = targetProj.order ?? swapIndex + 1;

    // Swap locally for instant responsiveness
    const newProjects = [...projects];
    newProjects[currentIndex] = { ...targetProj, order: currentOrder };
    newProjects[swapIndex] = { ...proj, order: targetOrder };
    newProjects.sort((a, b) => a.order - b.order);
    setProjects(newProjects);

    try {
      await Promise.all([
        fetch(`/api/projects/${proj._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: targetOrder }),
        }),
        fetch(`/api/projects/${targetProj._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: currentOrder }),
        }),
      ]);
      toast.success("Order updated in MongoDB");
    } catch {
      toast.error("Failed to update order");
      fetchProjects();
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmProject) return;

    const delToast = toast.loading("Deleting project from MongoDB...");
    try {
      const res = await fetch(`/api/projects/${deleteConfirmProject._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Project deleted successfully", { id: delToast });
        setDeleteConfirmProject(null);
        fetchProjects();
      } else {
        toast.error(json.error || "Failed to delete project", { id: delToast });
      }
    } catch {
      toast.error("Failed to delete project", { id: delToast });
    }
  };

  // Distinct categories for filter
  const distinctCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tech && p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && p.isActive) ||
        (statusFilter === "inactive" && !p.isActive);

      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchQuery, statusFilter, categoryFilter]);

  // Statistics
  const totalCount = projects.length;
  const activeCount = projects.filter((p) => p.isActive).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <div className="space-y-6">
      {/* Top Stats Overview Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Total Projects
            </span>
            <FolderKanban size={16} className="text-[#ff8804]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalCount}</div>
          <span className="text-[11px] text-zinc-500">MongoDB `projects` collection</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Live &amp; Active
            </span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{activeCount}</div>
          <span className="text-[11px] text-zinc-500">Visible on public portfolio</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Draft / Hidden
            </span>
            <XCircle size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{inactiveCount}</div>
          <span className="text-[11px] text-zinc-500">Hidden from visitors</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Categories
            </span>
            <Layers size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 font-mono">
            {distinctCategories.length}
          </div>
          <span className="text-[11px] text-zinc-500">Distinct project domains</span>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search by title, category, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]/50 focus:ring-1 focus:ring-[#ff8804]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#14161f] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-[#ff8804]/50"
          >
            <option value="all">All Categories</option>
            {distinctCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-[#ff8804] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "active"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "inactive"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Drafts ({inactiveCount})
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white/15 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-white/15 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Compact Table View"
            >
              <List size={15} />
            </button>
          </div>

          <button
            onClick={fetchProjects}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-all disabled:opacity-50"
            title="Refresh from MongoDB"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin text-[#ff8804]" : ""} />
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#ff6a00] to-[#ff8804] text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,106,0,0.3)] cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Content: Grid or Table View */}
      {isLoading ? (
        <div className="p-16 rounded-3xl bg-[#0c0d12]/90 border border-white/10 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <RefreshCw size={24} className="animate-spin text-[#ff8804]" />
          <span className="text-sm font-medium">Fetching dynamic projects from MongoDB...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#0c0d12]/90 border border-white/10 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
            <FolderKanban size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
            <p className="text-xs text-zinc-400 max-w-md">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "No projects match your active search or filters. Try resetting the filters."
                : "No projects in MongoDB yet. Click below to add your first project."}
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#ff8804] text-white hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={15} />
            <span>Create New Project</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj._id}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col ${
                proj.isActive
                  ? "bg-[#0d0f17] border-white/10 hover:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                  : "bg-[#090a0f] border-dashed border-white/10 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Card Image Area */}
              <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                <Image
                  src={proj.image || "/gradient.webp"}
                  alt={proj.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-md border border-white/15 text-zinc-200">
                      Order #{proj.order ?? idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md ${
                        proj.isActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          proj.isActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                        }`}
                      />
                      {proj.isActive ? "Active" : "Draft"}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md border border-white/15 text-zinc-300">
                    {proj.year || "2024"}
                  </span>
                </div>

                {/* Quick Reorder Floating Controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleReorder(proj, "up")}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-zinc-300 hover:text-white border border-white/20 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <MoveUp size={13} />
                  </button>
                  <button
                    onClick={() => handleReorder(proj, "down")}
                    disabled={idx === filteredProjects.length - 1}
                    title="Move Down"
                    className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-zinc-300 hover:text-white border border-white/20 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <MoveDown size={13} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#ff8804] px-2.5 py-0.5 rounded-md bg-[#ff8804]/10 border border-[#ff8804]/20">
                    <span>{proj.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Pills */}
                {proj.tech && proj.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-zinc-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.05] text-zinc-500 font-mono">
                        +{proj.tech.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(proj)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        proj.isActive ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    />
                    <span>{proj.isActive ? "Disable" : "Enable"}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {proj.live && proj.live !== "#" && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Live Website"
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#ff8804]/20 text-zinc-400 hover:text-[#ff8804] border border-white/10 hover:border-[#ff8804]/30 transition-all cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmProject(proj)}
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-3xl bg-[#0c0d12]/90 border border-white/10 overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-zinc-400 uppercase tracking-wider font-mono border-b border-white/10">
                <tr>
                  <th className="py-3 px-4 w-14">Order</th>
                  <th className="py-3 px-4 w-20">Preview</th>
                  <th className="py-3 px-4">Title &amp; Category</th>
                  <th className="py-3 px-4">Technologies</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                {filteredProjects.map((proj, idx) => (
                  <tr key={proj._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-zinc-400">
                      <div className="flex items-center gap-1">
                        <span>#{proj.order ?? idx + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleReorder(proj, "up")}
                            disabled={idx === 0}
                            className="text-zinc-500 hover:text-white disabled:opacity-20"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleReorder(proj, "down")}
                            disabled={idx === filteredProjects.length - 1}
                            className="text-zinc-500 hover:text-white disabled:opacity-20"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
                        <Image
                          src={proj.image || "/gradient.webp"}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{proj.title}</div>
                      <div className="text-[11px] text-[#ff8804]">{proj.category}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(proj.tech || []).slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                        {(proj.tech || []).length > 3 && (
                          <span className="text-[10px] text-zinc-500 font-mono">
                            +{(proj.tech || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-400">{proj.year}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(proj)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 ${
                          proj.isActive
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            proj.isActive ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {proj.isActive ? "Active" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {proj.live && proj.live !== "#" && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
                            title="Open Link"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-[#ff8804]/10"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmProject(proj)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#0b0d14] border border-white/15 flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Sticky Modal Header */}
            <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0e101a]/95 backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff6a00]/20 to-[#ff8804]/10 border border-[#ff8804]/30 text-[#ff8804] flex items-center justify-center shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                  {editingProject ? <Edit2 size={18} /> : <Plus size={20} />}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{editingProject ? "Edit Project Details" : "Add New Showcase Project"}</span>
                    {editingProject && (
                      <span className="text-[11px] font-mono font-normal text-zinc-400 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                        ID: {editingProject._id.slice(-6)}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {editingProject
                      ? "Update project attributes, visual media, live links, and tech stack in MongoDB."
                      : "Fill in the details below to publish a new project directly to your dynamic portfolio."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Modal Form Body */}
            <form id="project-form" onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 custom-scrollbar">
              {/* SECTION 1: CORE INFORMATION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#ff8804]" />
                  <span>General Information</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Title (8 cols) */}
                  <div className="md:col-span-7 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center justify-between">
                      <span>Project Title <span className="text-[#ff8804]">*</span></span>
                      <span className="text-[10px] text-zinc-500 font-mono">Displayed prominently</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Skylet Bank Ltd - Landing"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 transition-all"
                    />
                  </div>

                  {/* Slug (5 cols) */}
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center justify-between">
                      <span>URL Slug</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Auto-generated</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs">/</span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            slug: generateSlug(e.target.value),
                          }))
                        }
                        placeholder="skylet-bank-ltd-landing"
                        className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Category (6 cols) */}
                  <div className="md:col-span-6 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200">
                      Category Domain <span className="text-[#ff8804]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. Modern & Secure Banking Solutions"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 transition-all"
                    />
                  </div>

                  {/* Year (3 cols) */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#ff8804]" />
                      <span>Year</span>
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                      placeholder="2024"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 transition-all"
                    />
                  </div>

                  {/* Display Order (3 cols) */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center justify-between">
                      <span>Order #</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Sequence</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.order}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          order: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 transition-all"
                    />
                  </div>
                </div>

                {/* Quick Category Suggestions */}
                <div className="flex flex-wrap gap-1.5 items-center pt-1">
                  <span className="text-[11px] text-zinc-500">Quick select:</span>
                  {COMMON_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        formData.category === cat
                          ? "bg-[#ff8804]/20 border-[#ff8804] text-[#ff8804] font-medium"
                          : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 2: VISUAL MEDIA & ASSETS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Visual Assets &amp; Media</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card A: Main Thumbnail */}
                  <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <Sparkles size={14} className="text-[#ff8804]" />
                          <span>Main Thumbnail Image</span>
                          <span className="text-[#ff8804]">*</span>
                        </label>
                        <label className="text-[11px] font-semibold text-[#ff8804] hover:underline cursor-pointer flex items-center gap-1">
                          <UploadCloud size={13} />
                          <span>{isUploadingMain ? "Uploading..." : "Upload Device File"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingMain}
                            onChange={(e) => handleFileUpload(e, "image")}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <input
                        type="url"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="Paste image URL (e.g. https://...)"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                      />
                    </div>

                    {/* Preview Box */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center group/img">
                      {formData.image ? (
                        <>
                          <Image
                            src={formData.image}
                            alt="Main preview"
                            fill
                            unoptimized
                            className="object-cover object-top transition-transform group-hover/img:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5">
                            <span className="text-[10px] text-zinc-300 font-mono truncate">
                              Thumbnail active
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-3 text-zinc-500 space-y-1">
                          <UploadCloud size={24} className="mx-auto text-zinc-600" />
                          <span className="text-[11px] block">No thumbnail image yet</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card B: Modal Fullscreen Image */}
                  <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <Eye size={14} className="text-purple-400" />
                          <span>Modal Detail Image</span>
                          <span className="text-[10px] text-zinc-500 font-normal">(Optional)</span>
                        </label>
                        <label className="text-[11px] font-semibold text-purple-400 hover:underline cursor-pointer flex items-center gap-1">
                          <UploadCloud size={13} />
                          <span>{isUploadingModal ? "Uploading..." : "Upload Modal File"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingModal}
                            onChange={(e) => handleFileUpload(e, "modalImage")}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <input
                        type="url"
                        value={formData.modalImage}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, modalImage: e.target.value }))
                        }
                        placeholder="Falls back to thumbnail if empty"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    {/* Preview Box */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center group/img">
                      {formData.modalImage || formData.image ? (
                        <>
                          <Image
                            src={formData.modalImage || formData.image}
                            alt="Modal preview"
                            fill
                            unoptimized
                            className="object-cover object-top transition-transform group-hover/img:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5">
                            <span className="text-[10px] text-zinc-300 font-mono truncate">
                              {formData.modalImage ? "Custom modal image" : "Using main thumbnail"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-3 text-zinc-500 space-y-1">
                          <Eye size={24} className="mx-auto text-zinc-600" />
                          <span className="text-[11px] block">No modal image set</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: EXTERNAL LINKS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Links &amp; Demos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Live Website */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Globe size={13} className="text-emerald-400" />
                        <span>Live Preview Website URL</span>
                      </span>
                      {formData.live && formData.live !== "#" && (
                        <a
                          href={formData.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>Test URL</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData.live}
                      onChange={(e) => setFormData((prev) => ({ ...prev, live: e.target.value }))}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                    />
                  </div>

                  {/* Video URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                      <Video size={13} className="text-blue-400" />
                      <span>Video Demo / Walkthrough URL</span>
                    </label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                      }
                      placeholder="https://youtube.com/... or #"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: DESCRIPTION */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
                    Project Narrative &amp; Description <span className="text-[#ff8804]">*</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {formData.description.length} characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Summarize the client objective, core features, architecture, and user conversion impact..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804] focus:ring-1 focus:ring-[#ff8804]/40 leading-relaxed transition-all"
                />
              </div>

              {/* SECTION 5: TECH STACK */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Tag size={13} className="text-[#ff8804]" />
                    <span>Technologies &amp; Frameworks</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {formData.tech.length} tags added
                  </span>
                </div>

                {/* Tags Box */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
                    {formData.tech.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#ff8804]/15 border border-[#ff8804]/30 text-xs font-medium text-white shadow-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTechTag(tag)}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}

                    {/* Input */}
                    <div className="flex items-center gap-1.5 flex-1 min-w-[170px]">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTechTag();
                          }
                        }}
                        placeholder="Type tech name & press Enter..."
                        className="w-full px-2.5 py-1 rounded-lg bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddTechTag()}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/10 hover:bg-[#ff8804] hover:text-white text-zinc-200 transition-colors cursor-pointer shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Add Suggestions */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-zinc-500">Popular tech:</span>
                  {COMMON_TECH_SUGGESTIONS.map((t) => {
                    const isAdded = formData.tech.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleAddTechTag(t)}
                        disabled={isAdded}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                          isAdded
                            ? "bg-white/[0.01] border-white/5 text-zinc-600 cursor-not-allowed"
                            : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:border-[#ff8804]/50 cursor-pointer"
                        }`}
                      >
                        {isAdded ? `✓ ${t}` : `+ ${t}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 6: PUBLISHING STATUS */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Publishing Visibility Status</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        formData.isActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {formData.isActive ? "ACTIVE & LIVE" : "SAVED AS DRAFT"}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {formData.isActive
                      ? "This project will be immediately visible on the live public portfolio showcase."
                      : "This project will be saved to MongoDB but hidden from website visitors."}
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff8804]"></div>
                </label>
              </div>
            </form>

            {/* Sticky Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0 bg-[#0e101a]/95 backdrop-blur-md">
              <span className="text-[11px] text-zinc-500 hidden sm:inline">
                Fields marked with <span className="text-[#ff8804]">*</span> are required
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="project-form"
                  disabled={isSaving || isUploadingMain || isUploadingModal}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#ff6a00] to-[#ff8804] text-white hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,106,0,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSaving && <RefreshCw size={14} className="animate-spin" />}
                  <span>{editingProject ? "Update Project" : "Publish Project"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0d0f17] border border-red-500/20 p-6 space-y-4 shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Delete Project</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="text-white font-semibold">
                  &quot;{deleteConfirmProject.title}&quot;
                </span>{" "}
                from MongoDB? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
