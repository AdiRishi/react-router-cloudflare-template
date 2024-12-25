import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./global-styles/tailwind.css";
import { ReactNode } from "react";
import { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
