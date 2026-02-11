





UPDATE turfs SET locat = 1 WHERE id IN (1,2);
UPDATE turfs SET owner_id = 2 WHERE id IN (3,4);

SELECT id, name, owner_id FROM turfs;

SELECT column_name
FROM information_schema.columns
WHERE table_name = 'users';

SELECT id, name, email, role FROM users;
SELECT * FROM payments;
select * from bookings;
select * from users;
select * from turfs;
UPDATE turfs
SET location = 'Mumbai'
WHERE city='Mumbai';

ALTER TABLE turfs ADD COLUMN city VARCHAR(255);

UPDATE turfs
SET city = 'Nashik'
WHERE city IS NULL AND id = 8;


DELETE FROM users
WHERE id=7;

ALTER TABLE turfs
ADD CONSTRAINT fk_turfs_owner
FOREIGN KEY (owner_id)
REFERENCES users(id);

ALTER TABLE turfs
ALTER COLUMN owner_id SET NOT NULL;

SELECT id, name FROM users WHERE role = 'OWNER';

UPDATE turfs SET owner_id = 8 WHERE owner_id IS NULL and id=10;

ALTER TABLE payments 
ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE payments 
ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE payments 
ALTER COLUMN transaction_id DROP NOT NULL;

