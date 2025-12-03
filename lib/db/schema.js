import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";


// =========================================
// BOOKS TABLE
// =========================================
export const books = sqliteTable("books", {
  // Using text for ID because your data uses 'b1', 'b2'
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  price: integer("price").notNull(),
  discount: integer("discount").default(0),
  cover: text("cover"),
  // SQLite doesn't support arrays natively, so we store tags as a JSON string
  tags: text("tags", { mode: "json" }),
  description: text("description"),
  isbn: text("isbn"),
  publisher: text("publisher"),
  pages: integer("pages"),
  weight: real("weight"), // Using real/float for 0.55
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
});

// =========================================
// REVIEWS TABLE
// =========================================
export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  // Foreign Key linking to books table
  bookId: text("book_id")
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  user: text("user").notNull(),
  rating: integer("rating").notNull(),
  text: text("text"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
});

// =========================================
// ARTICLES TABLE
// =========================================
export const articles = sqliteTable("articles", {
  // Using integer ID because your data uses 1, 2, 3
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  category: text("category"),
  // Storing date as string to match your "25 Sep 2024" format,
  // though Timestamp is usually preferred for DBs.
  date: text("date"),
  image: text("image"),
  content: text("content"), // Stores the HTML string
});

// =========================================
// RELATIONS
// =========================================
export const booksRelations = relations(books, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  book: one(books, {
    fields: [reviews.bookId],
    references: [books.id],
  }),
}));


export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  image: text("image"),
  // --- TAMBAHAN ---
  phoneNumber: text("phone_number"), // Kolom baru
  address: text("address"),          // Kolom baru
  // ----------------
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).$onUpdate(() => new Date()).notNull(),
});

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


// 1. TABEL ORDERS (Menyimpan Info Utama Pesanan)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(), // Relasi ke User
  total: integer("total").notNull(),
  status: text("status").default("Dikirim"), // Dikirim, Selesai, dll
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

// 2. TABEL ORDER ITEMS (Menyimpan Detail Buku per Pesanan)
export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  bookId: text("book_id").notNull().references(() => books.id),
  qty: integer("qty").notNull(),
  price: integer("price").notNull(), // Harga saat beli (takutnya harga buku berubah nanti)
});

// 3. RELASI (Agar mudah di-query)
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  book: one(books, {
    fields: [orderItems.bookId],
    references: [books.id],
  }),
}));

