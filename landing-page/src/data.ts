import { Palette, Layers3, Monitor, PenTool } from "lucide-react";

type DesignType = "Web" | "Mobile" | "UI Kit" | "Coded";
export type Tool = "Figma" | "Sketch" | "XD" | "Photoshop";

export type Design = {
  id: number;
  title: string;
  author: string;
  type: DesignType;
  tool: Tool;
  popular: boolean;
  background: string;
  preview: "download" | "settings" | "report";
};

export const designs: Design[] = [
  {
    id: 1,
    title: "Desktop & Server Download",
    author: "Jenny Molla",
    type: "Web",
    tool: "Sketch",
    popular: true,
    background: "bg-[#edf3ff]",
    preview: "download",
  },
  {
    id: 2,
    title: "Dashboard Settings",
    author: "Jenny Molla",
    type: "Web",
    tool: "Sketch",
    popular: true,
    background: "bg-[#292a4e]",
    preview: "settings",
  },
  {
    id: 3,
    title: "Download Report Modal",
    author: "Jenny Molla",
    type: "Web",
    tool: "Sketch",
    popular: false,
    background: "bg-[#f7e6ec]",
    preview: "report",
  },
  {
    id: 4,
    title: "Mobile Banking UI",
    author: "Sarah Kim",
    type: "Mobile",
    tool: "Figma",
    popular: true,
    background: "bg-[#eef4ff]",
    preview: "settings",
  },
  {
    id: 5,
    title: "Modern Analytics Kit",
    author: "Daniel Lee",
    type: "UI Kit",
    tool: "Figma",
    popular: true,
    background: "bg-[#f3efff]",
    preview: "download",
  },
  {
    id: 6,
    title: "Developer Dashboard",
    author: "Mark Wilson",
    type: "Coded",
    tool: "XD",
    popular: false,
    background: "bg-[#edf7f5]",
    preview: "settings",
  },
];

export const tools: {
  name: Tool;
  icon: typeof PenTool;
}[] = [
  { name: "Figma", icon: PenTool },
  { name: "Sketch", icon: Palette },
  { name: "XD", icon: Layers3 },
  { name: "Photoshop", icon: Monitor },
];

export const designTypes = ["All", "Web", "Mobile", "UI Kit", "Coded"] as const;
