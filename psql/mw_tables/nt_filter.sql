CREATE TABLE filter (
    filter_id SERIAL PRIMARY KEY,  -- PostgreSQL uses SERIAL instead of AUTO_INCREMENT
    ms_id VARCHAR(50) NOT NULL,
    slug_value VARCHAR(255) NOT NULL,
    human_value VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    CONSTRAINT fk_ms  -- naming the constraint is a good practice
        FOREIGN KEY (ms_id)
        REFERENCES ms(ms_id)
        ON DELETE CASCADE  -- optional: automatically delete related filters when ms is deleted
);
