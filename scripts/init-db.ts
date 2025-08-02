// init-db.ts
import { Client } from "pg";

const databaseUrl = process.env.DATABASE_URL as string;

if (!databaseUrl) {
  console.error(
    `Missing Supabase configuration. Please set the following environment variables: 
        ${!databaseUrl ? "DATABASE_URL, " : ""}`.replace(/, $/, "."),
  );
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const schemaSQL = `
DROP TABLE IF EXISTS leaf_references;
DROP TABLE IF EXISTS leaves;
DROP TABLE IF EXISTS growth_stages;
DROP TABLE IF EXISTS trees;

CREATE TABLE growth_stages (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  color VARCHAR,
  icon VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trees (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leaves (
  id SERIAL PRIMARY KEY,
  tree_id INT REFERENCES trees(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  content TEXT,
  growth_stage VARCHAR,
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leaf_references (
  id SERIAL PRIMARY KEY,
  leaf_id INT REFERENCES leaves(id) ON DELETE CASCADE,
  title VARCHAR,
  url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`;

async function initDb() {
  await client.connect();
  console.log("🚀 Connected to Supabase Postgres");
  await client.query(schemaSQL);
  console.log("✅ Database initialized successfully");
  await client.end();
}

initDb().catch((err) => {
  console.error("❌ Error initializing DB:", err);
  process.exit(1);
});
