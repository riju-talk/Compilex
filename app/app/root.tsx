import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Head from "./components/header";
import Sidebar from "./components/sidebar";

import { Layout } from "antd";

const { Header, Content, Sider } = Layout;

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-hidden">
        <Layout style={{ minHeight: "100vh" }}>
          {/* Header Section */}
          <Header className="p-0 bg-white shadow-md">
            <Head />
          </Header>

          <Layout>
            {/* Sidebar Section */}
            <Sider
              width={250}
              className="bg-gray-50 shadow-md"
              style={{
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Sidebar />
            </Sider>

            {/* Main Content Section */}
            <Layout style={{ padding: 0 }}>
              <Content
                className="bg-gray-100"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: "calc(100vh - 64px)", // Subtract Header height (64px)
                  overflow: "auto",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>

        {/* Remix-Specific Components */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
