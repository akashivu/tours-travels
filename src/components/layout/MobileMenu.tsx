import { Menu } from "lucide-react";

const MobileMenu = () => {
  return (
    <button className="rounded-xl p-2 transition hover:bg-gray-100 lg:hidden">
      <Menu size={24} />
    </button>
  );
};

export default MobileMenu;