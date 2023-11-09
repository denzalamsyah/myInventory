import Sidebar from "@/components/sidebar/sidebar";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const excludedPaths = ["/login", "/auth/changepass", "/auth/verify", "/"];
  const shouldDisplaySidebar = !excludedPaths.includes(router.pathname);

  return (
    // <Component {...pageProps} />
    <div>
      {shouldDisplaySidebar ? (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
