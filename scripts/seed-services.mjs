import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true, default: "/card_icons/Icon.png" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const DEFAULT_SERVICES = [
  {
    order: 1,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743371/crevosys/services/ghuumarstp3ikzie6trp.png",
    title: "Development",
    slug: "development",
    description:
      "Development and building amazing digital products with best user experiences strategy.",
    isActive: true,
  },
  {
    order: 2,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743402/crevosys/services/cgvfd5lhmxkkdimbtif5.png",
    title: "Marketing",
    slug: "marketing",
    description:
      "Marketing services starts and ends within a strategy builds wireframe & solid prototyping posts design.",
    isActive: true,
  },
  {
    order: 3,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743410/crevosys/services/npr1r4njujfxbnuuowsc.png",
    title: "Design",
    slug: "design",
    description:
      "We design professional looking yet simple Logo are search engine and user friendly.",
    isActive: true,
  },
  {
    order: 4,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743412/crevosys/services/khipa8xxpoinjrozutcr.png",
    title: "Automation",
    slug: "automation",
    description:
      "Streamline and optimize your business processes with our cutting-edge AI automation solutions.",
    isActive: true,
  },
];

async function seed() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "crevosys" });
    console.log("✅ Connected to MongoDB:", mongoose.connection.name);

    const isForce = process.argv.includes("--force") || process.argv.includes("--reset");

    if (isForce) {
      console.log("⚠️  --force flag detected: Resetting all services to default...");
      await Service.deleteMany({});
      await Service.insertMany(DEFAULT_SERVICES);
      console.log(`✨ Re-seeded ${DEFAULT_SERVICES.length} default services.`);
    } else {
      let insertedCount = 0;
      for (const item of DEFAULT_SERVICES) {
        const existing = await Service.findOne({
          $or: [{ title: item.title }, { slug: item.slug }],
        });
        if (existing) {
          console.log(`ℹ️  Service already exists: "${item.title}"`);
        } else {
          await Service.create(item);
          insertedCount++;
          console.log(`✨ Created default service: "${item.title}"`);
        }
      }
      console.log(`🌱 Seeding complete: ${insertedCount} new service(s) added. Custom services preserved.`);
    }

    const count = await Service.countDocuments();
    console.log(`🎉 Done! Total services in MongoDB: ${count}`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

seed();
