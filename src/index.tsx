import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter } from "react-router-dom";
import { FacebookProvider } from "react-facebook";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="1005478595617-818g2rj9k80m77vq46f83h606jeimb97.apps.googleusercontent.com">
    <FacebookProvider appId="304740048631172">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FacebookProvider>
  </GoogleOAuthProvider>
);
