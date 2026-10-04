import "./globals.css";

export const metadata = {
  title: "Financial Horoscope™ 360 | A Roadmap for Your Wealth Journey",
  description: "Discover where you stand financially, what your life goals may require, the gaps in your current journey, and a personalized roadmap forward.",
  metadataBase: new URL("https://financialhoroscope360.com"),
  openGraph: {
    title: "Financial Horoscope™ 360",
    description: "Your dreams have destinations. Your money needs a roadmap.",
    url: "https://financialhoroscope360.com",
    siteName: "Financial Horoscope™ 360",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
