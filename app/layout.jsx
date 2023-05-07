import "@styles/globals.css";

export const metadate = {
  title: "Propmtopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="graddient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
}
