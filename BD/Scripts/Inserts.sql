TRUNCATE TABLE posts, AspNetUsers RESTART IDENTITY;

-- Insert 10000 users
DO $$
DECLARE
    i INT;
BEGIN
    FOR i IN 1..10000 LOOP
        INSERT INTO AspNetUsers (name,created_at,updated_at,UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, AccessFailedCount)
        VALUES ('User' || i,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'user' || i || '@example.com',UPPER('user' || i || '@example.com'),'user' || i || '@example.com',UPPER('user' || i || '@example.com'), FALSE , 'AQAAAAIAAYagAAAAEF27Z1uPCCln3huiLOVn7055GuxPYbhhMknaIJC9jZK8v1A96fTcibqSEQ9ATWSVzA=='"2WRLPTNJW5DM2AVX52GOLZJSMI2T7JX2","da328850-a34d-4d0e-8d8a-17541a133b5c",null,FALSE,FALSE,TRUE,0);
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

