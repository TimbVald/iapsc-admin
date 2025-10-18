import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, varchar, date, time } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Table des utilisateurs
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name'),
  imageURL: text('image_url'),
  phone: text('phone'),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des événements
export const events = pgTable('events', {
  id: varchar('id').primaryKey(),
  slug: varchar('slug').unique().notNull(),
  title: text('title').notNull(),
  date: date('date').notNull(),
  endDate: date('end_date'),
  time: time('time'),
  endTime: time('end_time'),
  location: text('location').notNull(),
  description: text('description'),
  post: text('post'),
  image: text('image').notNull(),
  images: jsonb('images').$type<string[]>(),
  category: varchar('category').notNull(),
  attendees: integer('attendees').default(0),
  featured: boolean('featured').default(false),
  agenda: jsonb('agenda').$type<Array<{
    title: string;
    description: string;
    time: string;
    activity: string;
  }>>(),
  speakers: jsonb('speakers').$type<Array<{
    name: string;
    title: string;
    image: string;
    organization?: string;
  }>>(),
  objectives: jsonb('objectives').$type<string[]>(),
  requirements: jsonb('requirements').$type<string[]>(),
  benefits: jsonb('benefits').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des images de galerie
export const galleryImages = pgTable('gallery_images', {
  id: varchar('id').primaryKey(),
  url: text('url').notNull(),
  alt: text('alt').notNull(),
  photographer: text('photographer').notNull(),
  username: varchar('username').notNull(),
  likes: integer('likes').default(0),
  downloads: integer('downloads').default(0),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});



// Table des statistiques clés
export const keyStats = pgTable('key_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  number: varchar('number').notNull(),
  label: text('label').notNull(),
  icon: varchar('icon').notNull(),
  trend: varchar('trend'),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Table des diapositives du carousel hero
export const heroSlides = pgTable('hero_slides', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title'),
  subtitle: text('subtitle'),
  description: text('description'),
  icon: varchar('icon').notNull(),
  gradient: varchar('gradient').notNull(),
  video: text('video'),
  image: text('image'),
  cta: text('cta').notNull(),
  link: text('link').notNull(),
  link2: text('link2'),
  secondaryCta: text('secondary_cta'),
  order: integer('order').default(0),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Table des données "À propos"
export const aboutData = pgTable('about_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  typewriterTexts: jsonb('typewriter_texts').$type<string[]>(),
  missionTitle: text('mission_title'),
  missionDescription: jsonb('mission_description').$type<string[]>(),
  missionHighlight: text('mission_highlight'),
  actionButtons: jsonb('action_buttons').$type<Array<{
    href: string;
    text: string;
    type: string;
    icon: string;
    className: string;
  }>>(),
  mediaContent: jsonb('media_content').$type<{
    mainImage: string;
    thumbnailImage: string;
    videoUrl: string;
    videoTitle: string;
    altTexts: {
      main: string;
      thumbnail: string;
    };
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des statistiques "À propos"
export const aboutStats = pgTable('about_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  value: varchar('value').notNull(),
  label: text('label').notNull(),
  color: varchar('color').notNull(),
  bgGradient: varchar('bg_gradient').notNull(),
  borderColor: varchar('border_color').notNull(),
  textColor: varchar('text_color').notNull(),
  hoverColor: varchar('hover_color').notNull(),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Table des données de comparaison
export const comparisonData = pgTable('comparison_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  features: jsonb('features').$type<Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }>>(),
  comparisonImages: jsonb('comparison_images').$type<{
    healthy: string;
    diseased: string;
  }>(),
  diagnosticSteps: jsonb('diagnostic_steps').$type<Array<{
    step: number;
    title: string;
    description: string;
    icon: string;
  }>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des actualités
export const news = pgTable('news', {
  id: integer('id').primaryKey(),
  slug: varchar('slug').unique().notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  description: text('description').notNull(),
  post: text('post'),
  date: date('date').notNull(),
  image: text('image').notNull(),
  category: varchar('category').notNull(),
  readTime: varchar('read_time').notNull(),
  author: text('author'),
  featured: boolean('featured').default(false),
  introduction: text('introduction'),
  sections: jsonb('sections').$type<Array<{
    title: string;
    content: string;
  }>>(),
  conclusion: text('conclusion'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type News = typeof news.$inferSelect;

// Table des ressources
export const resources = pgTable('resources', {
  id: varchar('id').primaryKey(),
  slug: varchar('slug').unique().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: varchar('type').notNull(),
  category: varchar('category').notNull(),
  language: varchar('language').notNull(),
  date: date('date').notNull(),
  author: text('author').notNull(),
  views: integer('views').default(0),
  downloads: integer('downloads').default(0),
  tags: jsonb('tags').$type<string[]>(),
  featured: boolean('featured').default(false),
  fileSize: varchar('file_size'),
  downloadUrl: text('download_url').notNull(),
  previewUrl: text('preview_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;

// Table des vidéos
export const videos = pgTable('videos', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: varchar('category').notNull(),
  date: date('date').notNull(),
  duration: varchar('duration').notNull(),
  youtubeId: varchar('youtube_id').notNull(),
  author: text('author').notNull(),
  views: integer('views').default(0),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des projets "Ce que nous faisons"
export const whatWeDoProjects = pgTable('what_we_do_projects', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  category: varchar('category').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  date: varchar('date').notNull(),
  participants: text('participants').notNull(),
  impact: text('impact').notNull(),
  link: text('link').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Table des catégories "Ce que nous faisons"
export const whatWeDoCategories = pgTable('what_we_do_categories', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Table des partenaires
export const partners = pgTable('partners', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  logo: text('logo').notNull(),
  description: text('description').notNull(),
  website: text('website'),
  category: varchar('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Table des catégories de partenaires
export const partnerCategories = pgTable('partner_categories', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  color: varchar('color').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations entre les tables
export const eventsRelations = relations(events, ({ many }) => ({
  galleryImages: many(galleryImages),
}));

export type Event = typeof events.$inferSelect;