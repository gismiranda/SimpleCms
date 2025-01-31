TRUNCATE TABLE posts, users RESTART IDENTITY;

-- Insert 10000 users
DO $$
DECLARE
    i INT;
BEGIN
    FOR i IN 1..10000 LOOP
        INSERT INTO users (name, email, password_hash)
        VALUES ('User' || i, 'user' || i || '@example.com', 'AQAAAAIAAYagAAAAEF27Z1uPCCln3huiLOVn7055GuxPYbhhMknaIJC9jZK8v1A96fTcibqSEQ9ATWSVzA==');
    END LOOP;
END $$;

-- Insert 10 posts for each user
DO $$
DECLARE
    user_id INT;
    i INT;
BEGIN
    FOR user_id IN 1..10000 LOOP
        FOR i IN 1..10 LOOP
            INSERT INTO posts (user_id, title, content, tags, posted_date)
            VALUES (user_id, 'Title ' || i || ' for User ' || user_id, 'Content for post ' || i || ' by User ' || user_id, '["tag1", "tag2"]', CURRENT_TIMESTAMP);
        END LOOP;
    END LOOP;
END $$;

