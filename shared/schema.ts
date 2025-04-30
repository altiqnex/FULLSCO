import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

// Scholarship Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description")
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});

// Scholarship Level Table
export const levels = pgTable("levels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique()
});

export const insertLevelSchema = createInsertSchema(levels).omit({
  id: true
});

// Countries Table
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique()
});

export const insertCountrySchema = createInsertSchema(countries).omit({
  id: true
});

// Scholarships Table
export const scholarships = pgTable("scholarships", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  deadline: text("deadline"),
  amount: text("amount"),
  isFeatured: boolean("is_featured").default(false),
  isFullyFunded: boolean("is_fully_funded").default(false),
  countryId: integer("country_id").references(() => countries.id),
  levelId: integer("level_id").references(() => levels.id),
  categoryId: integer("category_id").references(() => categories.id),
  requirements: text("requirements"),
  applicationLink: text("application_link"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Blog Posts Table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  authorId: integer("author_id").references(() => users.id),
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false),
  views: integer("views").default(0),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  views: true,
  createdAt: true,
  updatedAt: true
});

// Tags Table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique()
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true
});

// Post Tags Junction Table
export const postTags = pgTable("post_tags", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  tagId: integer("tag_id").references(() => tags.id).notNull()
});

export const insertPostTagSchema = createInsertSchema(postTags).omit({
  id: true
});

// Success Stories Table
export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  scholarshipName: text("scholarship_name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSuccessStorySchema = createInsertSchema(successStories).omit({
  id: true,
  createdAt: true
});

// Newsletter Subscribers Table
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true
});

// SEO Settings Table
export const seoSettings = pgTable("seo_settings", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull().unique(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  keywords: text("keywords")
});

export const insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
  id: true
});

// Site Settings Table
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").notNull(),
  siteTagline: text("site_tagline"),
  siteDescription: text("site_description"),
  favicon: text("favicon"),
  logo: text("logo"),
  logoDark: text("logo_dark"),
  email: text("email"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  address: text("address"),
  facebook: text("facebook"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  youtube: text("youtube"),
  linkedin: text("linkedin"),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  accentColor: text("accent_color"),
  enableDarkMode: boolean("enable_dark_mode").default(true),
  rtlDirection: boolean("rtl_direction").default(true),
  defaultLanguage: text("default_language").default("ar"),
  enableNewsletter: boolean("enable_newsletter").default(true),
  enableScholarshipSearch: boolean("enable_scholarship_search").default(true),
  footerText: text("footer_text"),
  
  // إعدادات عرض الأقسام في الصفحة الرئيسية
  showHeroSection: boolean("show_hero_section").default(true),
  showFeaturedScholarships: boolean("show_featured_scholarships").default(true),
  showSearchSection: boolean("show_search_section").default(true),
  showCategoriesSection: boolean("show_categories_section").default(true),
  showCountriesSection: boolean("show_countries_section").default(true),
  showLatestArticles: boolean("show_latest_articles").default(true),
  showSuccessStories: boolean("show_success_stories").default(true),
  showNewsletterSection: boolean("show_newsletter_section").default(true),
  showStatisticsSection: boolean("show_statistics_section").default(true),
  showPartnersSection: boolean("show_partners_section").default(true),
  
  // خيارات تخصيص العناوين والأوصاف
  heroTitle: text("hero_title"),
  heroDescription: text("hero_description"),
  featuredScholarshipsTitle: text("featured_scholarships_title"),
  featuredScholarshipsDescription: text("featured_scholarships_description"),
  categoriesSectionTitle: text("categories_section_title"),
  categoriesSectionDescription: text("categories_section_description"),
  countriesSectionTitle: text("countries_section_title"),
  countriesSectionDescription: text("countries_section_description"),
  latestArticlesTitle: text("latest_articles_title"),
  latestArticlesDescription: text("latest_articles_description"),
  successStoriesTitle: text("success_stories_title"),
  successStoriesDescription: text("success_stories_description"),
  newsletterSectionTitle: text("newsletter_section_title"),
  newsletterSectionDescription: text("newsletter_section_description"),
  statisticsSectionTitle: text("statistics_section_title"),
  statisticsSectionDescription: text("statistics_section_description"),
  partnersSectionTitle: text("partners_section_title"),
  partnersSectionDescription: text("partners_section_description"),
  
  // خيارات تخصيص الهيدر
  headerStyle: text("header_style").default("default"), // نمط الهيدر (default, transparent, compact, etc)
  headerBackgroundColor: text("header_background_color"), // لون خلفية الهيدر
  headerTextColor: text("header_text_color"), // لون نص الهيدر
  headerLogoPosition: text("header_logo_position").default("left"), // موضع الشعار (left, center, right)
  headerHeight: text("header_height"), // ارتفاع الهيدر
  customHeaderHtml: text("custom_header_html"), // HTML مخصص للهيدر
  showHeaderSearch: boolean("show_header_search").default(true), // إظهار حقل البحث في الهيدر
  showHeaderLanguageSwitcher: boolean("show_header_language_switcher").default(true), // إظهار مبدل اللغة في الهيدر
  showHeaderLoginButton: boolean("show_header_login_button").default(true), // إظهار زر تسجيل الدخول في الهيدر
  
  // خيارات تخصيص الفوتر
  footerStyle: text("footer_style").default("default"), // نمط الفوتر (default, simple, multi-column, etc)
  footerBackgroundColor: text("footer_background_color"), // لون خلفية الفوتر
  footerTextColor: text("footer_text_color"), // لون نص الفوتر
  footerLogoPosition: text("footer_logo_position").default("left"), // موضع الشعار في الفوتر (left, center, right)
  footerColumns: integer("footer_columns").default(3), // عدد الأعمدة في الفوتر
  customFooterHtml: text("custom_footer_html"), // HTML مخصص للفوتر
  showFooterSocialIcons: boolean("show_footer_social_icons").default(true), // إظهار أيقونات التواصل الاجتماعي في الفوتر
  showFooterNewsletter: boolean("show_footer_newsletter").default(true), // إظهار النشرة الإخبارية في الفوتر
  showFooterCopyrightInfo: boolean("show_footer_copyright_info").default(true), // إظهار معلومات حقوق النشر في الفوتر
  footerCopyrightText: text("footer_copyright_text"), // نص حقوق النشر في الفوتر

  // خيارات إضافية
  homePageLayout: text("home_page_layout").default("default"), // لتوفير تخطيطات متعددة للصفحة الرئيسية
  scholarshipPageLayout: text("scholarship_page_layout").default("default"),
  articlePageLayout: text("article_page_layout").default("default"),
  customCss: text("custom_css"), // لإضافة CSS مخصص للموقع
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({
  id: true
});

// Static Pages Table
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(true),
  showInFooter: boolean("show_in_footer").default(false),
  showInHeader: boolean("show_in_header").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Export Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Level = typeof levels.$inferSelect;
export type InsertLevel = z.infer<typeof insertLevelSchema>;

export type Country = typeof countries.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;

export type Scholarship = typeof scholarships.$inferSelect;
export type InsertScholarship = z.infer<typeof insertScholarshipSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;

export type PostTag = typeof postTags.$inferSelect;
export type InsertPostTag = z.infer<typeof insertPostTagSchema>;

export type SuccessStory = typeof successStories.$inferSelect;
export type InsertSuccessStory = z.infer<typeof insertSuccessStorySchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export type SeoSetting = typeof seoSettings.$inferSelect;
export type InsertSeoSetting = z.infer<typeof insertSeoSettingsSchema>;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingsSchema>;

export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
