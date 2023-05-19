import "./globals.css";

export const metadata = {
  title: "Just Notes",
  description: "Create simple notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

