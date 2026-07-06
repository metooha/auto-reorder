import { ChevronDownIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { DepartmentsDropdown } from "@/components/DepartmentsDropdown";
import { ServicesDropdown } from "@/components/ServicesDropdown";
import { MoreLinksDropdown } from "@/components/MoreLinksDropdown";
import styles from "./SubNav.module.css";

export function SubNav() {
  const navigate = useNavigate();

  const secondaryLinks = [
    { label: "Get it Fast", path: "/get-it-fast" },
    { label: "Rollbacks & More", path: "/rollbacks" },
    { label: "Easter", path: "/easter" },
    { label: "Pharmacy", path: "/pharmacy" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Dinner Made Easy", path: "/dinner-made-easy" },
    { label: "Walmart+", path: "/walmart-plus" },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {/* Primary Navigation */}
        <nav aria-label="Primary" className={styles.primaryNav}>
          <ul className={styles.primaryList}>
            <li>
              <DepartmentsDropdown />
            </li>
            <li className={styles.servicesPadding}>
              <ServicesDropdown />
            </li>
          </ul>
        </nav>

        {/* Secondary Navigation */}
        <section className={styles.secondarySection}>
          <nav aria-label="Secondary">
            <ul className={styles.secondaryList}>
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className={styles.secondaryLink}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>

      {/* More Button */}
      <section className={styles.moreSection}>
        <MoreLinksDropdown />
      </section>
    </div>
  );
}
