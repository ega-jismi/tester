import db from "./db";
import * as schema from "./db/schema";
import { books, reviews, articles } from "./mock";

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Insert Books
  console.log("Inserting Books...");
  await db.insert(schema.books).values(books).onConflictDoNothing();

  // 2. Transform and Insert Reviews
  // We need to flatten the object { b1: [reviews], b2: [reviews] }
  console.log("Inserting Reviews...");
  const flatReviews = [];

  for (const [bookId, bookReviews] of Object.entries(reviews)) {
    // bookReviews is an array of review objects
    for (const review of bookReviews) {
      flatReviews.push({
        id: review.id,
        bookId: bookId, // Add the foreign key here
        user: review.user,
        rating: review.rating,
        text: review.text,
      });
    }
  }

  if (flatReviews.length > 0) {
    await db.insert(schema.reviews).values(flatReviews).onConflictDoNothing();
  }

  // 3. Insert Articles
  console.log("Inserting Articles...");
  await db.insert(schema.articles).values(articles).onConflictDoNothing();

  console.log("✅ Seeding complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
