export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'versatility-zinc-alloy-buckles',
        title: 'Exploring the Versatility of Zinc Alloy Buckles',
        excerpt: 'Zinc alloy buckles have become a staple in modern fashion for their durability and aesthetic appeal...',
        content: `
            <p>Zinc alloy buckles have become a staple in modern fashion for their durability and aesthetic appeal. Unlike traditional metals, zinc alloy offers a unique combination of strength and lightweight properties, making it ideal for high-end garment accessories.</p>
            <p>In this article, we explore how zinc alloy is processed and why it has become the preferred choice for designers worldwide. From military uniforms to luxury handbags, the applications are endless.</p>
            <h2>Durability and Corrosion Resistance</h2>
            <p>One of the primary reasons for the popularity of zinc alloy is its resistance to corrosion. When plated correctly, these buckles can withstand harsh environmental conditions without losing their shine or structural integrity.</p>
            <h2>Design Flexibility</h2>
            <p>Zinc alloy can be cast into intricate shapes that would be impossible or too expensive with other metals. This allows designers to create unique brand-specific hardware that stands out in a crowded market.</p>
        `,
        date: 'Feb 02, 2026',
        author: 'Editorial Team',
        category: 'Industry News'
    },
    {
        slug: 'quality-brass-snap-buttons',
        title: 'Quality Brass Snap Buttons for Jeans Wear',
        excerpt: 'Discover why brass remains the superior choice for high-end denim hardware and how it ages over time...',
        content: `
            <p>Discover why brass remains the superior choice for high-end denim hardware and how it ages over time. Brass snap buttons are not just functional; they are a mark of quality in the denim industry.</p>
            <p>We delve into the manufacturing process of brass snaps and why they are essential for heavy-duty denim applications.</p>
        `,
        date: 'Jan 26, 2026',
        author: 'Production Team',
        category: 'Product Spotlight'
    },
    {
        slug: 'future-trouser-design-rivets',
        title: 'The Future of Trouser Design: Integrating Rivets',
        excerpt: 'How military uniform-inspired durability is making a comeback in street fashion through heavy-duty rivets...',
        content: `
            <p>How military uniform-inspired durability is making a comeback in street fashion through heavy-duty rivets. Rivets are no longer just for reinforcement; they are now a key design element.</p>
            <p>Learn about the latest trends in rivet placement and the materials that are defining the next generation of streetwear.</p>
        `,
        date: 'Jan 19, 2026',
        author: 'Design Lab',
        category: 'Trends'
    }
];
