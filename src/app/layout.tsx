import "../styles/globals.css";

import "@fontsource/bungee-shade";
import "@fontsource/poppins";

export const metadata = {
  title: "Just Notes",
  description: "Create simple notes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
