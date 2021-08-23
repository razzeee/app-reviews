import axiod from "https://deno.land/x/axiod/mod.ts";
import * as log from "https://deno.land/std@0.104.0/log/mod.ts";
import { AppRating, Review } from "./types.ts";

export async function getApps(): Promise<{ [name: string]: AppRating }> {
  let result = {};
  try {
    const response = await axiod.get(
      "https://odrs.gnome.org/1.0/reviews/api/ratings"
    );
    result = response.data;
  } catch (error) {
    log.warning(error);
  }
  return result;
}

export async function getReviews(app: string): Promise<Review[]> {
  let result = [];
  try {
    const response = await axiod.get(
      `https://odrs.gnome.org/1.0/reviews/api/app/${app}`
    );
    result = response.data;
  } catch (error) {
    log.warning(error);
  }
  return result;
}

// deno-lint-ignore no-explicit-any
export async function getAll(): Promise<any> {
  let result = [];
  try {
    const response = await axiod.get(
      `https://odrs.gnome.org/1.0/reviews/api/all`
    );
    result = response.data;
  } catch (error) {
    log.warning(error);
  }
  return result;
}

log.info("Starting export.");
const apps = await getApps();
Deno.writeTextFileSync("./data/apps.json", JSON.stringify(apps));
log.info("Exported apps.");
const all = await getAll();
Deno.writeTextFileSync("./data/all.json", JSON.stringify(all));
log.info("Exported all.");

const reviews: Review[] = [];
for (const app in apps) {
  if (Object.prototype.hasOwnProperty.call(apps, app)) {
    log.info(`Exporting reviews for ${app}`);
    const appReviews = await getReviews(app);

    reviews.push(...appReviews);
  }
}
Deno.writeTextFileSync(`./data/reviews.json`, JSON.stringify(reviews));

log.info("Export finished.");

// https://dl.flathub.org/repo/appstream/x86_64/appstream.xml.gz
