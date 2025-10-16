import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import db from '.';
import { events, news, resources, heroSlides, galleryImages, videos } from './schema';
import { desc, eq, not, asc } from 'drizzle-orm';

/**
 * Récupère les diapositives actives du carrousel hero.
 * @returns Une promesse qui se résout avec un tableau des diapositives actives.
 */
export const getActiveHeroSlides = async () => {
  noStore();
  return await db
    .select()
    .from(heroSlides)
    .where(eq(heroSlides.active, true))
    .orderBy(asc(heroSlides.order));
};

/**
 * Récupère les événements les plus récents de la base de données.
 * @param limit Le nombre d'événements à récupérer.
 * @returns Une promesse qui se résout avec un tableau d'événements.
 */
export const getRecentEvents = async (limit: number = 3) => {
  noStore();
  const recentEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(limit);
  return recentEvents;
};

/**
 * Récupère tous les événements de la base de données.
 * @returns Une promesse qui se résout avec un tableau de tous les événements.
 */
export const getEvents = async () => {
  noStore();
  const allEvents = await db.select().from(events).orderBy(desc(events.date));
  return allEvents;
};

/**
 * Récupère les événements mis en avant de la base de données.
 * @returns Une promesse qui se résout avec un tableau des événements mis en avant.
 */
export const getFeaturedEvents = async () => {
  noStore();
  const featuredEvents = await db
    .select()
    .from(events)
    .where(eq(events.featured, true))
    .orderBy(desc(events.date));
  return featuredEvents;
};

/**
 * Récupère un événement spécifique par son slug.
 * @param slug Le slug de l'événement à récupérer.
 * @returns Une promesse qui se résout avec l'événement correspondant ou undefined s'il n'est pas trouvé.
 */
export const getEventBySlug = async (slug: string) => {
  noStore();
  const event = await db.select().from(events).where(eq(events.slug, slug));
  return event[0];
};

/**
 * Récupère une actualité spécifique par son slug.
 * @param slug Le slug de l'actualité à récupérer.
 * @returns Une promesse qui se résout avec l'actualité correspondante ou undefined si elle n'est pas trouvée.
 */
export const getNewsBySlug = async (slug: string) => {
  noStore();
  const newsItem = await db.select().from(news).where(eq(news.slug, slug));
  return newsItem[0];
};

/**
 * Récupère les actualités récentes, en excluant éventuellement un slug spécifique.
 * @param limit Le nombre d'actualités à récupérer.
 * @param excludeSlug Le slug de l'actualité à exclure.
 * @returns Une promesse qui se résout avec un tableau d'actualités récentes.
 */
export const getRecentNews = async (limit: number = 3, excludeSlug?: string) => {
  noStore();
  const query = db
    .select()
    .from(news)
    .orderBy(desc(news.date))
    .limit(limit);

  if (excludeSlug) {
    return query.where(not(eq(news.slug, excludeSlug)));
  }

  return query;
};

/**
 * Récupère les actualités mises en avant de la base de données.
 * @returns Une promesse qui se résout avec un tableau des actualités mises en avant.
 */
export const getFeaturedNews = async () => {
  noStore();
  const featuredNews = await db
    .select()
    .from(news)
    .where(eq(news.featured, true))
    .orderBy(desc(news.date));
  return featuredNews;
};

/**
 * Récupère toutes les actualités de la base de données.
 * @returns Une promesse qui se résout avec un tableau de toutes les actualités.
 */
export const getAllNews = async () => {
  noStore();
  const allNews = await db.select().from(news).orderBy(desc(news.date));
  return allNews;
};

/**
 * Récupère les ressources récentes.
 * @param limit Le nombre de ressources à récupérer.
 * @returns Une promesse qui se résout avec un tableau de ressources récentes.
 */
export const getRecentResources = async (limit: number = 3) => {
  noStore();
  return await db.select().from(resources).orderBy(desc(resources.date)).limit(limit);
};

/**
 * Récupère les ressources mises en avant.
 * @returns Une promesse qui se résout avec un tableau des ressources mises en avant.
 */
export const getFeaturedResources = async () => {
  noStore();
  return await db.select().from(resources).where(eq(resources.featured, true)).orderBy(desc(resources.date));
};

/**
 * Récupère toutes les ressources.
 * @returns Une promesse qui se résout avec un tableau de toutes les ressources.
 */
export const getAllResources = async () => {
  noStore();
  return await db.select().from(resources).orderBy(desc(resources.date));
};

/**
 * Récupère une ressource par son slug.
 * @param slug Le slug de la ressource à récupérer.
 * @returns Une promesse qui se résout avec la ressource correspondante ou undefined.
 */
export const getResourceBySlug = async (slug: string) => {
  noStore();
  const resource = await db.select().from(resources).where(eq(resources.slug, slug));
  return resource[0];
};

/**
 * Récupère d'autres ressources en excluant un ID spécifique.
 * @param resourceId L'ID de la ressource à exclure.
 * @param limit Le nombre de ressources à récupérer.
 * @returns Une promesse qui se résout avec un tableau d'autres ressources.
 */
export const getOtherResources = async (resourceId: string, limit: number = 10) => {
  noStore();
  return await db
    .select()
    .from(resources)
    .where(not(eq(resources.id, resourceId)))
    .limit(limit);
};

/**
 * Récupère toutes les images de la galerie.
 * @returns Une promesse qui se résout avec un tableau de toutes les images de la galerie.
 */
export const getGalleryImages = async () => {
  noStore();
  return await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
};

/**
 * Récupère toutes les vidéos.
 * @returns Une promesse qui se résout avec un tableau de toutes les vidéos.
 */
export const getAllVideos = async () => {
  noStore();
  return await db.select().from(videos).orderBy(desc(videos.createdAt));
};

/**
 * Récupère toutes les catégories de vidéos uniques.
 * @returns Une promesse qui se résout avec un tableau de chaînes de caractères représentant les catégories.
 */
export const getVideoCategories = async () => {
  noStore();
  const categories = await db.selectDistinct({ category: videos.category }).from(videos);
  return ['Tous', ...categories.map(c => c.category)];
};