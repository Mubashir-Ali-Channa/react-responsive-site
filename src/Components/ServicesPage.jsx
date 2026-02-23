import "./Body.css";

const services = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Production-ready React interfaces with clean architecture and reusable components.",
  },
  {
    id: 2,
    title: "Responsive Web Design",
    description:
      "Mobile-first layouts that stay consistent across screen sizes and devices.",
  },
  {
    id: 3,
    title: "Website Optimization",
    description:
      "Performance, accessibility, and UX improvements for better engagement and speed.",
  },
  {
    id: 4,
    title: "UI Refactoring",
    description:
      "Modernize legacy pages with maintainable CSS, cleaner structure, and predictable styling.",
  },
];

const ServicesPage = () => {
  return (
    <main className="page-body">
      <section className="services-section">
        <p className="eyebrow">Services</p>
        <h2>How I can help</h2>
        <p className="section-intro">
          Services tailored for personal brands, startups, and small businesses
          that need reliable web execution.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
