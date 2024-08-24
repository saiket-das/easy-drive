import { icons } from "lucide-react";

interface AppIconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}
const AppIcon = ({ name, color = "blue", size = 24 }: AppIconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default AppIcon;
