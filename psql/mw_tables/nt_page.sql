CREATE TABLE page (
    filename VARCHAR(255) PRIMARY KEY,
    image VARCHAR(255),
    ms_id VARCHAR(255),
    sysid VARCHAR(255),
    title VARCHAR(255),
    transcription TEXT,
    translation TEXT,
    num_pages INTEGER,
    page_number INTEGER,
    status VARCHAR(50)
);
