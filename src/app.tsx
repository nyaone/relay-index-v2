import Header from "./components/header.tsx";
import Hero from "./components/hero.tsx";
import Join from "./components/join.tsx";
import Instances from "./components/instances.tsx";
import FAQ from "./components/faq.tsx";
import Footer from "./components/footer.tsx";
import { Toaster } from "react-hot-toast";

const App = () => (
  <div className="dark:bg-neutral-900">
    <Header />

    <Hero />
    <Join />
    <Instances />
    <FAQ />

    <Footer />
    <Toaster />
  </div>
);

export default App;
