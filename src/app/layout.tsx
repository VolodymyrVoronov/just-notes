import "../styles/globals.css";

import "@fontsource/bungee-shade";
import "@fontsource/poppins";

import Providers from "./providers";

export const metadata = {
  title: "Just Notes",
  description: "Create simple notes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
