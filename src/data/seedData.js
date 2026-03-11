// Seed data for demo vendors, products, and blog posts

export const CATEGORIES = [
  'Handicrafts',
  'Food & Pickles',
  'Textiles & Shawls',
  'Herbs & Spices',
  'Wooden Crafts',
  'Jewelry',
  'Art & Paintings',
  'Other',
];

export const SEED_VENDORS = [
  {
    id: 'v1',
    name: 'Ramesh Thakur',
    shopName: 'Mandi Shawl House',
    phone: '+91 98160 45123',
    whatsapp: '919816045123',
    category: 'Textiles & Shawls',
    description:
      'Handwoven Kullu and Mandi shawls made with pure wool by local artisans. Our family has been weaving shawls for 4 generations. Each piece takes 3-5 days to make on traditional looms.',
    image: '',
    products: [
      { name: 'Kullu Patti Shawl', price: '₹1,200', description: 'Traditional geometric pattern' },
      { name: 'Pashmina Stole', price: '₹2,500', description: 'Pure pashmina, hand-embroidered' },
      { name: 'Mandi Topi (Cap)', price: '₹350', description: 'Iconic Himachali cap' },
    ],
    createdAt: '2026-02-15T10:00:00',
  },
  {
    id: 'v2',
    name: 'Sunita Devi',
    shopName: 'Pahadi Swad',
    phone: '+91 94180 78456',
    whatsapp: '919418078456',
    category: 'Food & Pickles',
    description:
      'Authentic Himachali pickles, chutneys, and preserves made from locally grown ingredients. Our mango-chilli pickle and wild apricot jam are bestsellers at the Mandi market.',
    image: '',
    products: [
      { name: 'Mango Chilli Pickle', price: '₹250/jar', description: 'Spicy and tangy, sun-dried' },
      { name: 'Wild Apricot Jam', price: '₹300/jar', description: 'Made from local chuli fruit' },
      { name: 'Red Rhododendron Squash', price: '₹180/bottle', description: 'Buransh flower squash' },
    ],
    createdAt: '2026-02-20T14:30:00',
  },
  {
    id: 'v3',
    name: 'Keshav Sharma',
    shopName: 'Himalayan Herb Garden',
    phone: '+91 78070 12890',
    whatsapp: '917807012890',
    category: 'Herbs & Spices',
    description:
      'Organic herbs and spices grown in the hills around Mandi. We dry and pack everything by hand. Our turmeric, oregano (ban tulsi), and Himalayan rock salt are sourced from 6,000+ ft.',
    image: '',
    products: [
      { name: 'Wild Oregano (Ban Tulsi)', price: '₹150/100g', description: 'Hand-picked from high altitudes' },
      { name: 'Himalayan Turmeric', price: '₹120/100g', description: 'Organic, stone-ground' },
      { name: 'Pink Rock Salt', price: '₹80/250g', description: 'From local salt mines' },
    ],
    createdAt: '2026-03-01T09:00:00',
  },
  {
    id: 'v4',
    name: 'Mohan Lal',
    shopName: 'Devbhoomi Woodcraft',
    phone: '+91 88940 34567',
    whatsapp: '918894034567',
    category: 'Wooden Crafts',
    description:
      'Traditional wooden crafts from Mandi — hand-carved temple replicas, kitchen utensils, and decorative items. We use locally sourced deodar and walnut wood.',
    image: '',
    products: [
      { name: 'Deodar Temple Replica', price: '₹3,500', description: 'Miniature Hidimba temple' },
      { name: 'Walnut Wood Bowl Set', price: '₹1,800', description: 'Set of 4, hand-carved' },
      { name: 'Wooden Spice Box', price: '₹900', description: 'Traditional masala dabba' },
    ],
    createdAt: '2026-03-05T11:15:00',
  },
  {
    id: 'v5',
    name: 'Priya Verma',
    shopName: 'Mandi Canvas',
    phone: '+91 94590 67890',
    whatsapp: '919459067890',
    category: 'Art & Paintings',
    description:
      'Paintings and sketches capturing Mandi\'s landscapes, temples, and daily life. I\'m a local artist working with watercolors and acrylics. Custom commissions available.',
    image: '',
    products: [
      { name: 'Beas River Watercolor', price: '₹4,000', description: 'Original 12x18 inch painting' },
      { name: 'Temple Series Print', price: '₹800', description: 'Set of 3 A4 prints' },
      { name: 'Custom Portrait', price: '₹2,500', description: 'Acrylic on canvas, any size' },
    ],
    createdAt: '2026-03-08T16:00:00',
  },
];

export const SEED_BLOGS = [
  {
    id: 'b1',
    title: 'Mandi Shivaratri Fair: A Week of Divine Celebration',
    author: 'Rajesh Kumari',
    date: '2026-03-01',
    category: 'Culture',
    excerpt:
      'The International Mandi Shivaratri Fair is one of the biggest cultural events in Himachal Pradesh, drawing over 200 deities from across the region.',
    content: `The International Mandi Shivaratri Fair is more than just a religious gathering — it is the cultural heartbeat of Mandi. Held every year in the historic town, the fair transforms the Paddal Ground along the banks of the Beas River into a vibrant carnival of devotion, art, and commerce.

What makes this fair unique is the grand procession of over 200 local deities (devtas), carried in beautifully decorated palanquins (raths) by devotees from villages across the Mandi district. The rhythmic beats of traditional drums, the chanting of hymns, and the colorful processions create an atmosphere unlike any other.

## The Market Scene

During the week-long fair, local vendors set up stalls selling everything from Kullu shawls and Mandi caps to traditional jewelry and street food. The aroma of sidu (a local steamed bread) and local dal fills the air.

## A Living Tradition

The Shivaratri fair is believed to have started over 500 years ago during the reign of Raja Ajber Sen. It has survived centuries of change and remains a testament to Mandi's deep spiritual roots.

If you haven't experienced the Mandi Shivaratri Fair, you're missing one of India's most authentic cultural experiences.`,
    comments: [
      { id: 'c1', author: 'Vikram', text: 'I visit every year! The devta procession gives me goosebumps.', date: '2026-03-02' },
      { id: 'c2', author: 'Anita', text: 'Best time to buy authentic shawls. Prices are great during the fair.', date: '2026-03-03' },
    ],
  },
  {
    id: 'b2',
    title: 'The Hidden Gems of Mandi\'s Local Cuisine',
    author: 'Sunita Kashyap',
    date: '2026-02-20',
    category: 'Food',
    excerpt:
      'From sidu and patande to chha gosht and babru, Mandi\'s cuisine is a treasure trove of flavors waiting to be discovered.',
    content: `Mandi's culinary heritage is as rich as its history. While Himachali food often gets overshadowed by the popular North Indian dishes, the local cuisine of Mandi has its own distinct identity.

## Sidu — The Pride of Mandi

Sidu is a traditional steamed bread made from wheat flour, stuffed with a filling of poppy seeds (khas khas) or walnuts. It's typically served with ghee and dal, and is the quintessential comfort food of the region.

## Chha Gosht

This is a slow-cooked lamb curry made with gram flour (besan) and local spices. The tangy, creamy gravy is unlike anything you'll find elsewhere. It's a staple at weddings and festivals.

## Babru

Think of it as Mandi's answer to kachori — deep-fried bread stuffed with soaked black gram (urad dal). Served with tamarind chutney, it makes for an irresistible snack.

## Patande

Himachali pancakes! Made from wheat flour batter on a traditional iron griddle, patande are thin, crispy, and usually enjoyed with ghee and sugar for breakfast.

## Where to Find Authentic Food

The best way to experience Mandi's food is through the local dhabas near Indira Market and the street vendors around Bhootnath Temple. During the Shivaratri fair, the Paddal Ground becomes a food lover's paradise.`,
    comments: [
      { id: 'c3', author: 'FoodieHiker', text: 'Sidu with ghee is absolutely divine 🤤', date: '2026-02-21' },
    ],
  },
  {
    id: 'b3',
    title: 'Preserving Mandi\'s Temple Architecture',
    author: 'Dr. Anil Sharma',
    date: '2026-02-10',
    category: 'Heritage',
    excerpt:
      'Known as the "Varanasi of Hills", Mandi has over 81 ancient temples. But how many will survive the next century?',
    content: `Mandi is often called the "Varanasi of Hills" — and for good reason. The town is home to over 81 ancient temples, many dating back to the medieval period. These architectural marvels, built in the Nagara and Shikhara styles, reflect centuries of devotion and craftsmanship.

## The Iconic Temples

**Bhootnath Temple** — Dedicated to Lord Shiva, this is the most prominent temple in Mandi, situated in the heart of town. Its stone carvings are remarkably well-preserved.

**Panchvaktra Temple** — Located at the confluence of the Beas and Suketi rivers, this five-faced Shiva temple is an architectural gem.

**Trilokinath Temple** — One of the oldest temples in the region, showcasing intricate stone sculptures and traditional Himachali architecture.

## The Conservation Challenge

Unfortunately, many of Mandi's smaller temples are in a state of disrepair. Urban expansion, neglect, and the effects of weather are taking their toll. Some temples have lost their original stone carvings to erosion.

## What Can Be Done

Local heritage groups and the Archaeological Survey of India have begun restoration work on some temples. However, what's truly needed is community awareness and tourism models that directly fund conservation.

If you're visiting Mandi, consider joining a heritage walk — several local guides offer tours of the temple circuit, and the revenue supports preservation efforts.`,
    comments: [],
  },
  {
    id: 'b4',
    title: 'Meet the Weavers: Mandi\'s Handloom Story',
    author: 'Meera Devi',
    date: '2026-01-25',
    category: 'Artisans',
    excerpt:
      'The handloom weavers of Mandi are keeping alive a centuries-old craft. We visited their workshops to learn their story.',
    content: `In the narrow lanes of old Mandi town, the rhythmic clatter of handlooms still echoes — a sound that has defined the economy and culture of this region for centuries.

## A Generational Craft

Most handloom weavers in Mandi are second or third-generation artisans. The craft is typically passed from parent to child. Families set up looms in their homes and work through the year, with production peaking before winter.

## The Kullu-Mandi Shawl Tradition

While Kullu shawls have gained international recognition, Mandi has its own distinct weaving patterns and techniques. The Mandi patti (a bordered shawl) features geometric patterns in vibrant colors — often red, green, and gold on a natural wool base.

## Challenges Faced

The weavers face stiff competition from machine-made replicas that flood the market at a fraction of the price. Many young people are moving away from the craft, seeking employment in cities.

## Supporting the Artisans

The best way to support these artisans is to buy directly from them. Several weavers now sell through local cooperatives and the Mandi Haat (weekly market). By choosing handmade, you're not just buying a shawl — you're preserving a heritage.

Our platform aims to connect these artisans directly with buyers who value authentic, handmade products.`,
    comments: [
      { id: 'c4', author: 'ShawlLover', text: 'Bought my first Mandi patti from the haat. The quality is incredible.', date: '2026-01-26' },
      { id: 'c5', author: 'Traveler_HP', text: 'Is there any way to visit these weavers\' workshops?', date: '2026-01-27' },
    ],
  },
];
