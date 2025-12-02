import { eq, ne } from "drizzle-orm";
import db from "../../../../lib/db";
import { books, reviews } from "../../../../lib/db/schema";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const [rows, related] = await Promise.all([
      db
        .select({
          book: books,
          reviews: reviews,
        })
        .from(books)
        .where(eq(books.id, id))
        .leftJoin(reviews, eq(books.id, reviews.bookId)),
      db.select().from(books).where(ne(books.id, id)).limit(10),
    ]);

    if (rows.length === 0) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    const book = rows[0].book;

    const reviewList = rows
      .map((row) => row.reviews)
      .filter((review) => review !== null);

    const data = {
      book: book,
      reviews: reviewList,
      related: related,
    };

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
