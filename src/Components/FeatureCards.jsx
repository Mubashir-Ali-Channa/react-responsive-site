const fakePosts = [
  {
    id: 1,
    title: "Business Landing Page",
    description: "A high-conversion landing page with responsive layout and SEO basics.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Dashboard UI Build",
    description: "A reusable component-based dashboard with charts and action flows.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "E-commerce Frontend",
    description: "A storefront interface with product filters, detail pages, and cart UX.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

const FeatureCards = () => {
  return (
    <section className="featured-work">
      <p className="eyebrow">Featured Work</p>
      <h2>Recent projects</h2>
      <div className="card-grid">
      {fakePosts.map((post) => (
        <article className="content-card" key={post.id}>
          <img src={post.image} alt={post.title} />
          <div className="card-content">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        </article>
      ))}
      </div>
    </section>
  );
};

export default FeatureCards;
