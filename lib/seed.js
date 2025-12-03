import db from "./db";
import * as schema from "./db/schema";
import { books, reviews, articles } from "./mock";

async function main() {
  console.log("🌱 Starting seed...");

  // ==================================================
  // 0. RESET DATA LAMA (CLEAN UP)
  // ==================================================
  console.log("🧹 Cleaning old data...");
  
  // Hapus data di tabel anak dulu (yang punya Foreign Key)
  // Kita gunakan pengecekan (if) jaga-jaga kalau tabelnya belum kamu buat
  if (schema.reviews) await db.delete(schema.reviews);
  if (schema.orderItems) await db.delete(schema.orderItems);
  if (schema.orders) await db.delete(schema.orders);
  
  // Hapus data di tabel induk
  await db.delete(schema.books);
  await db.delete(schema.articles);

  // ==================================================
  // 1. INSERT BOOKS
  // ==================================================
  console.log("📚 Inserting Books...");
  // Gunakan onConflictDoNothing() atau biarkan default insert karena data sudah bersih
  await db.insert(schema.books).values(books).onConflictDoNothing();

  // ==================================================
  // 2. TRANSFORM & INSERT REVIEWS
  // ==================================================
  console.log("💬 Inserting Reviews...");
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

  // ==================================================
  // 3. INSERT ARTICLES
  // ==================================================
  console.log("📰 Inserting Articles...");
  await db.insert(schema.articles).values(articles).onConflictDoNothing();

  console.log("✅ Seeding complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});