"use client";

import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../../TagsMenu/TagsMenu";
import AuthNavigation from "../../AuthNavigation/AuthNavigation";
import useAuthStore from "@/lib/store/authStore";

function Header() {
  const { isAuthenticated } = useAuthStore();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <div className={css.navigation}>
        {isAuthenticated && <TagsMenu />}
        <ul className={css.navigation}>
          <AuthNavigation />
        </ul>
      </div>
    </header>
  );
}
export default Header;
