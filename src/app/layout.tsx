// src/app/layout.tsx
import './globals.css'; // You can create a CSS file for custom styles

export const metadata = {
  title: 'Simple Game',
  description: 'A simple click game built with Next.js',
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
