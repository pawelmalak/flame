import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const globalConfig = sqliteTable('global_config', {
  id: integer('id').primaryKey({ autoIncrement: false }),
  configJson: text('config_json').notNull().default('{}'),
  updatedAt: integer('updated_at').notNull(),
});

export type GlobalConfigRow = typeof globalConfig.$inferSelect;
export type NewGlobalConfigRow = typeof globalConfig.$inferInsert;
