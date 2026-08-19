import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "./footer.constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="Elixway home"
              className="inline-flex items-center gap-2.5"
            >
              {/* Logo */}
              <img
                src="/image/elix.png"
                alt="Elixway logo"
                className="h-10 w-auto object-contain"
              />

              {/* Brand Name */}
              <span
                className="
                  text-[20px]
                  font-semibold
                  tracking-[-0.045em]
                  text-neutral-950
                "
              >
                Elixway
              </span>
            </Link>

            <p className="mt-5 max-w-[260px] text-[13px] leading-6 text-neutral-500">
              Travel more. Plan less.
              <br />
              Discover, plan and bring your journey together.
            </p>

            <p className="mt-4 text-[11px] leading-5 text-neutral-400">
              Intelligent travel, thoughtfully connected.
            </p>
          </div>

          {/* Explore */}
          <FooterColumn
            title="Explore"
            links={FOOTER_LINKS.explore}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={FOOTER_LINKS.company}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={FOOTER_LINKS.support}
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-neutral-200 pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Copyright */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium tracking-[-0.01em] text-neutral-500">
                © {currentYear} Elixway
              </span>

              <span className="h-1 w-1 rounded-full bg-neutral-300" />

              <span className="text-[11px] text-neutral-400">
                All rights reserved.
              </span>
            </div>

            {/* Legal Links */}
            <nav
              aria-label="Legal"
              className="flex items-center gap-6"
            >
              <Link
                to="/privacy-policy"
                className="
                  text-[11px]
                  font-medium
                  text-neutral-400
                  transition-colors
                  duration-200
                  hover:text-neutral-950
                "
              >
                Privacy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="
                  text-[11px]
                  font-medium
                  text-neutral-400
                  transition-colors
                  duration-200
                  hover:text-neutral-950
                "
              >
                Terms
              </Link>

              <Link
                to="/cookie-policy"
                className="
                  text-[11px]
                  font-medium
                  text-neutral-400
                  transition-colors
                  duration-200
                  hover:text-neutral-950
                "
              >
                Cookies
              </Link>
            </nav>

          </div>
        </div>

      </div>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const FooterColumn = ({
  title,
  links,
}: FooterColumnProps) => {
  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) {
      return;
    }

    const [, hash] = href.split("#");

    // Already on homepage — smooth scroll directly.
    if (window.location.pathname === "/" && hash) {
      const element = document.getElementById(hash);

      if (element) {
        event.preventDefault();

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.pushState(
          null,
          "",
          `/#${hash}`
        );
      }
    }
  };

  return (
    <div>
      <h3
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-neutral-950
        "
      >
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => {
          const isHashLink = link.href.includes("#");

          return (
            <li key={link.label}>
              {isHashLink ? (
                <a
                  href={link.href}
                  onClick={(event) =>
                    handleSectionClick(event, link.href)
                  }
                  className="
                    text-[13px]
                    leading-5
                    text-neutral-500
                    transition-colors
                    duration-200
                    hover:text-neutral-950
                  "
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="
                    text-[13px]
                    leading-5
                    text-neutral-500
                    transition-colors
                    duration-200
                    hover:text-neutral-950
                  "
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Footer;