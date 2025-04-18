CREATE TABLE date (
    set_id VARCHAR(50) PRIMARY KEY,
    min_date INT NOT NULL,
    max_date INT NOT NULL,
    FOREIGN KEY (set_id) REFERENCES /*_*/nt_set(set_id)
);
