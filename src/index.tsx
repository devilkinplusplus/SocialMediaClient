import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GoogleOAuthProvider clientId="1005478595617-818g2rj9k80m77vq46f83h606jeimb97.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </GoogleOAuthProvider>
  </RecoilRoot>
);
