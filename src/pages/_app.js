import "../styles/globals.scss";
import ChatContextProvider from "../global/state";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChatContextProvider>
  );
}

export default MyApp;
