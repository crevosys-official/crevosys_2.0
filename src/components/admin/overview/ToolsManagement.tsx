"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Wrench,
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
  Layers,
  Sparkles,
  LayoutGrid,
  List,
} from "lucide-react";
import { toast } from "sonner";
import { ToolItem } from "@/types/tool";

const PRESET_LOCAL_ICONS = [
  { name: "React", path: "/icons/React-Dark.svg", category: "Frontend" },
  { name: "Next.js", path: "/icons/NextJS-Dark.svg", category: "Framework" },
  { name: "TypeScript", path: "/icons/TypeScript.svg", category: "Language" },
  { name: "Tailwind CSS", path: "/icons/TailwindCSS-Dark.svg", category: "Styling" },
  { name: "MongoDB", path: "/icons/MongoDB.svg", category: "Database" },
  { name: "Node.js", path: "/icons/NodeJS-Dark.svg", category: "Runtime" },
  { name: "Flutter", path: "/icons/Flutter-Dark.svg", category: "Mobile" },
  { name: "Firebase", path: "/icons/Firebase-Dark.svg", category: "Backend" },
  { name: "Supabase", path: "/icons/Supabase-Dark.svg", category: "Backend" },
  { name: "Figma", path: "/icons/Figma-Dark.svg", category: "Design" },
  { name: "GitHub", path: "/icons/Github-Dark.svg", category: "DevOps" },
  { name: "Express.js", path: "/icons/ExpressJS-Dark.svg", category: "API" },
  { name: "Redux", path: "/icons/Redux.svg", category: "State" },
  { name: "VS Code", path: "/icons/VSCode-Dark.svg", category: "Editor" },
  { name: "Android Studio", path: "/icons/AndroidStudio-Dark.svg", category: "Mobile IDE" },
  { name: "HTML5", path: "/icons/HTML.svg", category: "Web" },
  { name: "CSS3", path: "/icons/CSS.svg", category: "Styling" },
  { name: "Bootstrap", path: "/icons/Bootstrap.svg", category: "UI Kit" },
  { name: "Blender", path: "/icons/Blender-Dark.svg", category: "3D Graphics" },
  { name: "Photoshop", path: "/icons/Photoshop.svg", category: "Design" },
  { name: "Illustrator", path: "/icons/Illustrator.svg", category: "Vector" },
  { name: "Clerk", path: "/icons/clerk.png", category: "Auth" },
  { name: "Adobe XD", path: "/icons/XD.svg", category: "Design" },
  { name: "Ahrefs", path: "/icons/ahrefs.webp", category: "SEO" },
  { name: "Semrush", path: "/icons/smerush.jpeg", category: "SEO" },
  { name: "Moz", path: "/icons/moz.png", category: "SEO" },
];

const COMMON_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Framework",
  "Mobile",
  "Styling",
  "Language",
  "Runtime",
  "Design",
  "DevOps",
  "API",
  "Auth",
  "SEO",
];

export default function ToolsManagement() {
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);
  const [deleteConfirmTool, setDeleteConfirmTool] = useState<ToolItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "/icons/React-Dark.svg",
    category: "Frontend",
    isWhite: false,
    order: 0,
    isActive: true,
  });

  const fetchTools = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTools(json.data);
      } else {
        toast.error(json.error || "Failed to load tools");
      }
    } catch {
      toast.error("Failed to connect to MongoDB tools API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const openCreateModal = () => {
    setEditingTool(null);
    setFormData({
      name: "",
      slug: "",
      icon: "/icons/React-Dark.svg",
      category: "Frontend",
      isWhite: false,
      order: tools.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (tool: ToolItem) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      slug: tool.slug || "",
      icon: tool.icon,
      category: tool.category || "General",
      isWhite: !!tool.isWhite,
      order: tool.order ?? 0,
      isActive: tool.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (val: string) => {
    setFormData((prev) => {
      const shouldAutoSlug = !editingTool || prev.slug === generateSlug(prev.name);
      return {
        ...prev,
        name: val,
        slug: shouldAutoSlug ? generateSlug(val) : prev.slug,
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.includes("svg")) {
      toast.error("Please upload an image or SVG file");
      return;
    }

    setIsUploading(true);
    const uploadToast = toast.loading("Uploading icon to Cloudinary...");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "crevosys/tools");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        setFormData((prev) => ({ ...prev, icon: json.data.url }));
        toast.success("Icon uploaded successfully!", { id: uploadToast });
      } else {
        toast.error(json.error || "Failed to upload icon", { id: uploadToast });
      }
    } catch {
      toast.error("Network error during icon upload", { id: uploadToast });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Tool name is required");
      return;
    }
    if (!formData.icon.trim()) {
      toast.error("Tool icon is required");
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading(
      editingTool ? "Updating tool in MongoDB..." : "Creating new tool in MongoDB..."
    );

    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
      };

      const url = editingTool ? `/api/tools/${editingTool._id}` : "/api/tools";
      const method = editingTool ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        toast.success(
          editingTool ? "Tool updated successfully!" : "Tool created successfully!",
          { id: saveToast }
        );
        setIsModalOpen(false);
        fetchTools();
      } else {
        toast.error(json.error || "Failed to save tool", { id: saveToast });
      }
    } catch {
      toast.error("Network error while saving tool", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (tool: ToolItem) => {
    const updatedStatus = !tool.isActive;
    // Optimistic update
    setTools((prev) =>
      prev.map((t) => (t._id === tool._id ? { ...t, isActive: updatedStatus } : t))
    );

    try {
      const res = await fetch(`/api/tools/${tool._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Tool ${updatedStatus ? "activated in orbit" : "hidden from orbit"}`);
      } else {
        toast.error(json.error || "Failed to update tool status");
        fetchTools();
      }
    } catch {
      toast.error("Failed to update status");
      fetchTools();
    }
  };

  const handleReorder = async (tool: ToolItem, direction: "up" | "down") => {
    const currentIndex = tools.findIndex((t) => t._id === tool._id);
    if (currentIndex === -1) return;
    if (direction === "up" && currentIndex === 0) return;
    if (direction === "down" && currentIndex === tools.length - 1) return;

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const targetTool = tools[swapIndex];

    const currentOrder = tool.order ?? currentIndex + 1;
    const targetOrder = targetTool.order ?? swapIndex + 1;

    const newTools = [...tools];
    newTools[currentIndex] = { ...targetTool, order: currentOrder };
    newTools[swapIndex] = { ...tool, order: targetOrder };
    newTools.sort((a, b) => (a.order || 0) - (b.order || 0));
    setTools(newTools);

    try {
      await Promise.all([
        fetch(`/api/tools/${tool._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: targetOrder }),
        }),
        fetch(`/api/tools/${targetTool._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: currentOrder }),
        }),
      ]);
      toast.success("Order updated in MongoDB");
    } catch {
      toast.error("Failed to update order");
      fetchTools();
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmTool) return;

    const delToast = toast.loading("Deleting tool from MongoDB...");
    try {
      const res = await fetch(`/api/tools/${deleteConfirmTool._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Tool deleted successfully", { id: delToast });
        setDeleteConfirmTool(null);
        fetchTools();
      } else {
        toast.error(json.error || "Failed to delete tool", { id: delToast });
      }
    } catch {
      toast.error("Failed to delete tool", { id: delToast });
    }
  };

  // Distinct categories
  const distinctCategories = useMemo(() => {
    const set = new Set<string>();
    tools.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [tools]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      const matchesSearch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && t.isActive) ||
        (statusFilter === "inactive" && !t.isActive);

      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tools, searchQuery, statusFilter, categoryFilter]);

  const totalCount = tools.length;
  const activeCount = tools.filter((t) => t.isActive).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <div className="space-y-6">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Total Tools
            </span>
            <Wrench size={16} className="text-[#ff8804]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalCount}</div>
          <span className="text-[11px] text-zinc-500">MongoDB `tools` collection</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Live in Orbit
            </span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{activeCount}</div>
          <span className="text-[11px] text-zinc-500">Orbiting on radar wheel</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">
              Hidden / Drafts
            </span>
            <XCircle size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{inactiveCount}</div>
          <span className="text-[11px] text-zinc-500">Temporarily hidden</span>
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
          <span className="text-[11px] text-zinc-500">Distinct domains</span>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search tools or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]/50"
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

          {/* Category Dropdown */}
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
          {/* View Toggle */}
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
              title="Table View"
            >
              <List size={15} />
            </button>
          </div>

          <button
            onClick={fetchTools}
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
            <span>Add New Tool</span>
          </button>
        </div>
      </div>

      {/* Content: Grid or Table View */}
      {isLoading ? (
        <div className="p-16 rounded-3xl bg-[#0c0d12]/90 border border-white/10 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <RefreshCw size={24} className="animate-spin text-[#ff8804]" />
          <span className="text-sm font-medium">Fetching tools &amp; skills from MongoDB...</span>
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#0c0d12]/90 border border-white/10 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
            <Wrench size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">No Tools Found</h3>
            <p className="text-xs text-zinc-400 max-w-md">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "No tools match your active search or filters. Try resetting the filters."
                : "No tools in MongoDB yet. Click below to add your first tool."}
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#ff8804] text-white hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={15} />
            <span>Create New Tool</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredTools.map((tool, idx) => (
            <div
              key={tool._id}
              className={`group relative rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center text-center justify-between gap-3 ${
                tool.isActive
                  ? "bg-[#0d0f17] border-white/10 hover:border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                  : "bg-[#090a0f] border-dashed border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              {/* Order & Status Badges */}
              <div className="w-full flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>#{tool.order ?? idx + 1}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    tool.isActive ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                  title={tool.isActive ? "Active in Orbit" : "Draft / Hidden"}
                />
              </div>

              {/* Icon Circle */}
              <div
                className={`relative w-14 h-14 rounded-full flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 ${
                  tool.isWhite
                    ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-[#18142a] border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                }`}
              >
                <Image
                  src={tool.icon || "/icons/React-Dark.svg"}
                  alt={tool.name}
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Tool Info */}
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">
                  {tool.name}
                </h4>
                <span className="text-[10px] text-[#ff8804] px-2 py-0.5 rounded-full bg-[#ff8804]/10 border border-[#ff8804]/20 inline-block font-mono">
                  {tool.category || "General"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-2 border-t border-white/[0.07] flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleReorder(tool, "up")}
                  disabled={idx === 0}
                  className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                  title="Move Up"
                >
                  <MoveUp size={12} />
                </button>
                <button
                  onClick={() => handleReorder(tool, "down")}
                  disabled={idx === filteredTools.length - 1}
                  className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                  title="Move Down"
                >
                  <MoveDown size={12} />
                </button>
                <button
                  onClick={() => handleToggleActive(tool)}
                  className={`p-1 rounded text-xs transition-colors ${
                    tool.isActive
                      ? "text-emerald-400 hover:text-amber-400"
                      : "text-zinc-500 hover:text-emerald-400"
                  }`}
                  title={tool.isActive ? "Hide from Orbit" : "Show in Orbit"}
                >
                  <CheckCircle2 size={13} />
                </button>
                <button
                  onClick={() => openEditModal(tool)}
                  className="p-1 rounded text-zinc-400 hover:text-[#ff8804]"
                  title="Edit Tool"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => setDeleteConfirmTool(tool)}
                  className="p-1 rounded text-zinc-400 hover:text-red-400"
                  title="Delete Tool"
                >
                  <Trash2 size={13} />
                </button>
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
                  <th className="py-3 px-4 w-16">Order</th>
                  <th className="py-3 px-4 w-16">Icon</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Style</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                {filteredTools.map((tool, idx) => (
                  <tr key={tool._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-zinc-400">
                      <div className="flex items-center gap-1">
                        <span>#{tool.order ?? idx + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleReorder(tool, "up")}
                            disabled={idx === 0}
                            className="text-zinc-500 hover:text-white disabled:opacity-20"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleReorder(tool, "down")}
                            disabled={idx === filteredTools.length - 1}
                            className="text-zinc-500 hover:text-white disabled:opacity-20"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center p-1.5 ${
                          tool.isWhite ? "bg-white" : "bg-[#18142a] border border-white/10"
                        }`}
                      >
                        <Image
                          src={tool.icon || "/icons/React-Dark.svg"}
                          alt={tool.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">{tool.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-[#ff8804] px-2.5 py-0.5 rounded-full bg-[#ff8804]/10 border border-[#ff8804]/20 font-mono">
                        {tool.category || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">
                      {tool.isWhite ? "White Bg" : "Dark Radial"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(tool)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 ${
                          tool.isActive
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tool.isActive ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {tool.isActive ? "Active" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(tool)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff8804] hover:bg-[#ff8804]/10"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmTool(tool)}
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

      {/* CREATE / EDIT TOOL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0d0f17] border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-[#ff8804] flex items-center justify-center">
                  {editingTool ? <Edit2 size={18} /> : <Plus size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {editingTool ? "Edit Tool / Skill" : "Add New Tool / Skill"}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {editingTool
                      ? "Update attributes and icon in MongoDB."
                      : "Add a technology or framework to the radar."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-5 pt-5">
              {/* Tool Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Tool / Skill Name <span className="text-[#ff8804]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Next.js, Flutter, Docker"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: generateSlug(e.target.value),
                      }))
                    }
                    placeholder="nextjs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Category <span className="text-[#ff8804]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Frontend, Backend, Database..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                </div>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-zinc-500">Quick categories:</span>
                {COMMON_CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                      formData.category === cat
                        ? "bg-[#ff8804]/20 border-[#ff8804] text-[#ff8804]"
                        : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Icon Area: Cloudinary Upload OR Preset Picker OR Direct URL */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#ff8804]" />
                    <span>Tool Icon</span> <span className="text-[#ff8804]">*</span>
                  </label>
                  <label className="text-[11px] font-semibold text-[#ff8804] hover:underline cursor-pointer flex items-center gap-1">
                    <UploadCloud size={14} />
                    <span>{isUploading ? "Uploading..." : "Upload from Device"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Input + Preview */}
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                    placeholder="/icons/React-Dark.svg or https://..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff8804]"
                  />
                  {formData.icon && (
                    <div
                      className={`relative w-11 h-11 rounded-full p-2 shrink-0 flex items-center justify-center ${
                        formData.isWhite
                          ? "bg-white"
                          : "bg-[#18142a] border border-white/20"
                      }`}
                    >
                      <Image
                        src={formData.icon}
                        alt="Preview"
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Preset Built-in Icons Grid */}
                <div>
                  <span className="text-[11px] text-zinc-500 block mb-2">
                    Or select from built-in tech library:
                  </span>
                  <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto no-scrollbar p-1">
                    {PRESET_LOCAL_ICONS.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            icon: preset.path,
                            name: prev.name ? prev.name : preset.name,
                            category: prev.category ? prev.category : preset.category,
                          }))
                        }
                        className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs ${
                          formData.icon === preset.path
                            ? "bg-[#ff8804]/20 border-[#ff8804] text-white"
                            : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                        title={preset.name}
                      >
                        <div className="w-4 h-4 relative">
                          <Image
                            src={preset.path}
                            alt={preset.name}
                            width={16}
                            height={16}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[10px]">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toggles: White Badge & Active */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">White Badge</div>
                    <div className="text-[10px] text-zinc-400">
                      Use solid white circular backing
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isWhite}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isWhite: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff8804]"></div>
                  </label>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Orbit Status</div>
                    <div className="text-[10px] text-zinc-400">
                      Show in radar wheel
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#ff6a00] to-[#ff8804] text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,106,0,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSaving && <RefreshCw size={14} className="animate-spin" />}
                  <span>{editingTool ? "Save Changes" : "Create Tool"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0d0f17] border border-red-500/20 p-6 space-y-4 shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Delete Tool</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <span className="text-white font-semibold">
                  &quot;{deleteConfirmTool.name}&quot;
                </span>{" "}
                from MongoDB? It will be removed from the public website radar.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmTool(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                Yes, Delete Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
