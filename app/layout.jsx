import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadate = {
  title: "Propmtopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        <title>{metadate.title}</title>
        <meta name="description" content={metadate.description} />
      </header>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
