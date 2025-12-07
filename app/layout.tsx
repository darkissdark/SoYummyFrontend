import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { SITE_NAME, OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import css from "@/app/(public routes)/page.module.css";

const roboto = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const title = `${SITE_NAME} - Your Personal Note Organizer`;
const description =
  "Create, tag, search, filter, and manage your notes effortlessly with NoteHub. Stay organized and in control of your ideas.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_DOMAIN,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website",
  },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <main className={css.main}>{children}</main>
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
