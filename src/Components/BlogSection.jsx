const blogItems = [
  {
    id: 1,
    title: "How to Structure a Small React App",
    excerpt: "Practical folder patterns and naming choices for faster scaling.",
    author: "Ava Johnson",
    date: "Feb 15, 2026",
    tag: "Engineering",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Responsive CSS That Stays Simple",
    excerpt: "A short approach to mobile-first layouts without overengineering.",
    author: "Noah Carter",
    date: "Feb 18, 2026",
    tag: "CSS",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Designing White-Themed Dashboards",
    excerpt: "Spacing, contrast, and card hierarchy tips with real examples.",
    author: "Emma Brooks",
    date: "Feb 20, 2026",
    tag: "Design",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "From Brief to Build: Landing Page Checklist",
    excerpt: "The exact checklist we use to ship clean, fast marketing pages.",
    author: "Liam Patel",
    date: "Feb 21, 2026",
    tag: "Product",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Writing Clear Support Prompts",
    excerpt: "How to turn fuzzy requests into precise prompts your team can reuse.",
    author: "Sofia Nguyen",
    date: "Feb 21, 2026",
    tag: "Support",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Design Tokens Without the Bloat",
    excerpt: "Start small with tokens that map to real, shippable UI decisions.",
    author: "Mason Reed",
    date: "Feb 22, 2026",
    tag: "Design System",
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "Shipping Better Empty States",
    excerpt: "Patterns that reduce confusion and guide users to the next action.",
    author: "Isabella Cole",
    date: "Feb 22, 2026",
    tag: "UX",
    readTime: "4 min read",
  },
  {
    id: 8,
    title: "Weekly Release Notes Template",
    excerpt: "A simple template that helps stakeholders scan progress quickly.",
    author: "Ethan Walker",
    date: "Feb 22, 2026",
    tag: "Ops",
    readTime: "3 min read",
  },
];

const BlogSection = () => {
  return (
    <section className="blogs-section" id="blog">
      <p className="eyebrow">Blogs</p>
      <h2>Latest product, design, and support insights</h2>
      <p className="blog-intro">
        Fresh reads from the team on building clean UI, shipping faster, and
        supporting customers with confidence.
      </p>
      <div className="blog-grid">
        {blogItems.map((blog) => (
          <article className="blog-card" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <div className="blog-meta">
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </div>
            <div className="blog-card-footer">
              <span className="blog-tag">{blog.tag}</span>
              <span>{blog.readTime}</span>
            </div>
            <a href="/contact">Contact Team</a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
