ALTER TABLE "scan_results" ALTER COLUMN "source_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "scan_results" ADD COLUMN "multiple_sources" text[];