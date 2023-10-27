import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Header from "./components/header.tsx";
import Hero from "./components/hero.tsx";
import Join from "./components/join.tsx";
import Instances from "./components/instances.tsx";
import FAQ from "./components/faq.tsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <Hero />
    <Join />
    <Instances />
    <FAQ />
    <Footer />
    <Toaster />
  </React.StrictMode>,
);
