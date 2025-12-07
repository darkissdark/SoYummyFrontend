import css from "./EditProfilePage.module.css";
import { SITE_NAME } from "@/config/metadata";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
import EditProfileForm from "./EditProfilePage.client";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title = user?.username
    ? `${SITE_NAME} - Edit profile of ${user.username}`
    : `${SITE_NAME} - Edit my Profile`;
  const description =
    "Manage your profile and account settings on " + SITE_NAME;
  return {
    title,
    description,
  };
}

const ProfilePage = async () => {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <EditProfileForm user={user} />
      </div>
    </main>
  );
};

export default ProfilePage;
