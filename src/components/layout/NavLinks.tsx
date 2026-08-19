import { useLocation, useNavigate } from "react-router-dom";

const links = [
  {
    label: "Destinations",
    target: "destinations",
  },
  {
    label: "Hotels",
    target: "hotels",
  },
  {
    label: "Flights",
    route: "/flights",
  },
  {
    label: "Cabs",
    target: "cabs",
  },
  {
    label: "AI Planner",
    target: "ai-planner",
  },
];

const NavLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (id: string) => {
    // Already on homepage
    if (location.pathname === "/") {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(
          null,
          "",
          `/#${id}`
        );
      }

      return;
    }

    // Navigate to homepage first
    navigate(`/#${id}`);

    // Wait for homepage to render
    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <nav className="hidden items-center gap-9 lg:flex">
      {links.map((link) => (
        <button
          key={link.label}
          type="button"
          onClick={() => {
            if (link.target) {
              handleSectionClick(link.target);
            } else if (link.route) {
              navigate(link.route);
            }
          }}
          className="
            relative
            text-[14px]
            font-medium
            tracking-[-0.01em]
            text-neutral-600
            transition-colors
            duration-200
            hover:text-neutral-950
          "
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};

export default NavLinks;