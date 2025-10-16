/*
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

import { typewriterTexts, aboutStats, missionContent, actionButtons, mediaContent } from "../../components/data/aboutData";
import { features, comparisonImages, diagnosticSteps } from "../../components/data/comparisonData";
import { eventsData } from "../../components/data/eventData";
import { galleryImages } from "../../components/data/galleryData";
import { heroCarouselData } from "../../components/data/heroCarouselData";
import { keyStats } from "../../components/data/keyStats";
import { latestNewsData as latestNews } from "../../components/data/latestNewsData";
import { partners, partnerCategories } from "../../components/data/partnersData";
import { resourcesData as resources } from "../../components/data/resourceData";
import { videoResources as videos } from "../../components/data/videoData";
import { projects as whatWeDoProjects, categories as whatWeDoCategories } from "../../components/data/whatwedoData";

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schema.aboutData);
  await db.delete(schema.aboutStats);
  await db.delete(schema.comparisonData);
  await db.delete(schema.events);
  await db.delete(schema.galleryImages);
  await db.delete(schema.heroSlides);
  await db.delete(schema.keyStats);
  await db.delete(schema.news);
  await db.delete(schema.partners);
  await db.delete(schema.partnerCategories);
  await db.delete(schema.resources);
  await db.delete(schema.videos);
  await db.delete(schema.whatWeDoProjects);
  await db.delete(schema.whatWeDoCategories);

  // Insert new data
  const aboutData = {
    typewriterTexts,
    missionContent,
    actionButtons,
    mediaContent,
  };

  await db.insert(schema.aboutData).values(aboutData);
  await db.insert(schema.aboutStats).values(aboutStats);
  const comparisonData = {
    features,
    comparisonImages,
    diagnosticSteps,
  };

  // await db.insert(schema.comparisonData).values(comparisonData);
  await db.insert(schema.events).values(eventsData);
  await db.insert(schema.galleryImages).values(galleryImages);
  await db.insert(schema.heroSlides).values(heroCarouselData);
  // await db.insert(schema.keyStats).values(keyStats);
  await db.insert(schema.news).values(latestNews);
  await db.insert(schema.partners).values(partners);
  await db.insert(schema.partnerCategories).values(partnerCategories);
  await db.insert(schema.resources).values(resources);
  await db.insert(schema.videos).values(videos);
  await db.insert(schema.whatWeDoProjects).values(whatWeDoProjects);
  await db.insert(schema.whatWeDoCategories).values(whatWeDoCategories);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seeding complete.");
    process.exit(0);
  });
*/