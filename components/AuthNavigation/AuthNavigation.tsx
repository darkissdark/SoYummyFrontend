"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import useAuthStore from "@/lib/store/authStore";
import { logout } from "@/lib/api/api";

function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/welcome");
  };

  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          {user?.email && <p className={css.userEmail}>{user.email}</p>}
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/signin" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/register" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

export default AuthNavigation;
