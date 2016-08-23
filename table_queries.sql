CREATE TABLE IF NOT EXISTS "public"."songs" (
    "id" serial,
    "path" text,
    "name" text NOT NULL,
    "writer" text,
    "composer" text,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX songs_pkey ON songs USING btree (id);
CREATE UNIQUE INDEX songs_name_key ON songs USING btree (name);

CREATE TABLE IF NOT EXISTS "public"."words" (
    "id" serial,
    "value" text NOT NULL,
    "is_punctuation" boolean NOT NULL DEFAULT false,
    PRIMARY KEY ("id"),
    UNIQUE ("value")
);
CREATE UNIQUE INDEX words_pkey ON words USING btree (id);
CREATE UNIQUE INDEX words_value_key ON words USING btree (value);

CREATE TABLE IF NOT EXISTS "public"."groups" (
    "id" serial,
    "name" text NOT NULL,
    "is_expression" boolean NOT NULL DEFAULT 'false',
    PRIMARY KEY ("id"),
    UNIQUE ("name")
);
CREATE UNIQUE INDEX group_pkey ON groups USING btree (id);
CREATE UNIQUE INDEX group_name_key ON groups USING btree (name);

CREATE TABLE IF NOT EXISTS "public"."word_in_song" (
    "id" bigserial,
    "song_id" integer NOT NULL,
    "word_id" integer NOT NULL,
    "col" integer NOT NULL,
    "row" integer NOT NULL,
    "house" integer NOT NULL,
    "sentence" integer NOT NULL,
    "word_num" integer NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "songs_id" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "words_id" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX word_in_song_pkey ON word_in_song USING btree (id);
CREATE UNIQUE INDEX word_in_song_foreign ON word_in_song USING btree (song_id, word_id, col, "row");
CREATE UNIQUE INDEX word_in_song_foreign_house ON word_in_song USING btree (song_id, word_id, house, sentence, word_num);
CREATE UNIQUE INDEX word_in_song_foreign_all ON word_in_song USING btree (song_id, word_id, col, "row", house, sentence, word_num);

CREATE TABLE IF NOT EXISTS "public"."word_in_group" (
    "id" serial,
    "group_id" integer NOT NULL,
    "word_id" integer NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "group_id" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "word_id" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX word_in_group_pkey ON word_in_group USING btree (id)
CREATE UNIQUE INDEX word_in_group_foreign ON word_in_group USING btree (group_id, word_id);