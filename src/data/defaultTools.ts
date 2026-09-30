export interface DefaultTool {
  name: string;
  slug: string;
  icon: string;
  category: string;
  isWhite: boolean;
  order: number;
  isActive: boolean;
}

export const DEFAULT_TOOLS: DefaultTool[] = [
  { order: 1, name: "Flutter", slug: "flutter", icon: "/icons/Flutter-Dark.svg", category: "Mobile", isWhite: false, isActive: true },
  { order: 2, name: "Firebase", slug: "firebase", icon: "/icons/Firebase-Dark.svg", category: "Backend", isWhite: false, isActive: true },
  { order: 3, name: "MongoDB", slug: "mongodb", icon: "/icons/MongoDB.svg", category: "Database", isWhite: false, isActive: true },
  { order: 4, name: "Tailwind CSS", slug: "tailwind-css", icon: "/icons/TailwindCSS-Dark.svg", category: "Styling", isWhite: false, isActive: true },
  { order: 5, name: "TypeScript", slug: "typescript", icon: "/icons/TypeScript.svg", category: "Language", isWhite: false, isActive: true },
  { order: 6, name: "React", slug: "react", icon: "/icons/React-Dark.svg", category: "Frontend", isWhite: false, isActive: true },
  { order: 7, name: "Next.js", slug: "nextjs", icon: "/icons/NextJS-Dark.svg", category: "Framework", isWhite: false, isActive: true },
  { order: 8, name: "Node.js", slug: "nodejs", icon: "/icons/NodeJS-Dark.svg", category: "Runtime", isWhite: false, isActive: true },
  { order: 9, name: "Figma", slug: "figma", icon: "/icons/Figma-Dark.svg", category: "Design", isWhite: false, isActive: true },
  { order: 10, name: "Supabase", slug: "supabase", icon: "/icons/Supabase-Dark.svg", category: "Backend", isWhite: false, isActive: true },
  { order: 11, name: "GitHub", slug: "github", icon: "/icons/Github-Dark.svg", category: "DevOps", isWhite: false, isActive: true },
  { order: 12, name: "Express.js", slug: "expressjs", icon: "/icons/ExpressJS-Dark.svg", category: "API", isWhite: false, isActive: true },
  { order: 13, name: "Redux", slug: "redux", icon: "/icons/Redux.svg", category: "State", isWhite: false, isActive: true },
  { order: 14, name: "VS Code", slug: "vscode", icon: "/icons/VSCode-Dark.svg", category: "Editor", isWhite: false, isActive: true },
  { order: 15, name: "Android Studio", slug: "android-studio", icon: "/icons/AndroidStudio-Dark.svg", category: "Mobile IDE", isWhite: false, isActive: true },
  { order: 16, name: "HTML5", slug: "html5", icon: "/icons/HTML.svg", category: "Web", isWhite: false, isActive: true },
  { order: 17, name: "CSS3", slug: "css3", icon: "/icons/CSS.svg", category: "Styling", isWhite: false, isActive: true },
  { order: 18, name: "Bootstrap", slug: "bootstrap", icon: "/icons/Bootstrap.svg", category: "UI Kit", isWhite: false, isActive: true },
  { order: 19, name: "Blender", slug: "blender", icon: "/icons/Blender-Dark.svg", category: "3D Graphics", isWhite: false, isActive: true },
  { order: 20, name: "Photoshop", slug: "photoshop", icon: "/icons/Photoshop.svg", category: "Design", isWhite: false, isActive: true },
  { order: 21, name: "Illustrator", slug: "illustrator", icon: "/icons/Illustrator.svg", category: "Vector", isWhite: false, isActive: true },
  { order: 22, name: "Clerk", slug: "clerk", icon: "/icons/clerk.png", category: "Auth", isWhite: false, isActive: true },
];
