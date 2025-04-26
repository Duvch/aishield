ALTER TABLE "takedown_requests" ADD COLUMN "user_email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD COLUMN "platform" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD COLUMN "violation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD COLUMN "evidence" text;--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD COLUMN "approved_by" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD COLUMN "dmca_reference" varchar(100);--> statement-breakpoint
ALTER TABLE "takedown_requests" ADD CONSTRAINT "takedown_requests_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;