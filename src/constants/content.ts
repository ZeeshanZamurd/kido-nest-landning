export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#features" },
  { label: "For Parents", href: "#features" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroBullets = [
  "Approve & Manage Videos",
  "Set Child Interests",
  "Safe & Ad-Free Content",
  "Screen Time Control",
] as const;

export const features = [
  {
    title: "Parental Control",
    description: "Approve exactly what your child can watch.",
    icon: "shield",
  },
  {
    title: "Interest Management",
    description: "Select education, science, animals, cartoons, and more.",
    icon: "heart",
  },
  {
    title: "Safe Environment",
    description: "No harmful content or unwanted recommendations.",
    icon: "lock",
  },
  {
    title: "Screen Time Management",
    description: "Daily limits, weekly limits, and usage reports.",
    icon: "clock",
  },
] as const;
