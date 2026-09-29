export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { connectDB } = await import("@/lib/mongodb");
    try {
      await connectDB();
    } catch (err) {
      console.error("Failed to connect to MongoDB on startup:", err);
    }
  }
}
