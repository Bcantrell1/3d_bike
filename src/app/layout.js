import "./globals.css";

export const metadata = {
  title: "Bike",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative m-0">
        {children}
      </body>
    </html>
  );
}
