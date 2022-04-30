import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

/**
 * Next.js uses the App component to initialize pages.
 * @params component (which page will be shown)
 * @params pageProps (which properies will the page have)
 */
function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    //Create a context to get username and user globally
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
