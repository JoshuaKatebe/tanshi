import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Tanshi Digital Solutions",
  description: "Admin dashboard for managing projects and orders",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
