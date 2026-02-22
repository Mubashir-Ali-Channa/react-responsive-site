import "./Body.css";
import FeatureCards from "./FeatureCards";

const Body = () => {
  return (
    <main className="page-body" id="home">
      <section className="body-intro" id="features">
        <p className="eyebrow">Welcome</p>
        <h2>Clean, white-themed content section</h2>
        <p>
          This is sample content with fake data, built to be responsive across
          desktop and mobile.
        </p>
      </section>

      <FeatureCards />

    </main>
  );
};

export default Body;
