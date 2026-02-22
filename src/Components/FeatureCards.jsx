const fakePosts = [
  {
    id: 1,
    title: "Design Sprint Notes",
    description: "Quick updates from this week's planning and UI review.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Product Roadmap",
    description: "Milestones, releases, and key improvements for the quarter.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Team Highlights",
    description: "A snapshot of contributions and wins from the last sprint.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

const FeatureCards = () => {
  return (
    <section className="card-grid">
      {fakePosts.map((post) => (
        <article className="content-card" key={post.id}>
          <img src={post.image} alt={post.title} />
          <div className="card-content">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default FeatureCards;
