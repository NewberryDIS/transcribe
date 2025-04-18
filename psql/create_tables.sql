CREATE TABLE page (
    filename VARCHAR(255) PRIMARY KEY,
    image VARCHAR(255),
    ms_id VARCHAR(255),
    sysid VARCHAR(255),
    title VARCHAR(255),
    num_pages INTEGER,
    page_number INTEGER,
    status VARCHAR(50),
    transcription TEXT,
    transcription_user VARCHAR(255),
    transcription_timestamp TIMESTAMP,
    translation TEXT,
    translation_user VARCHAR(255),
    translation_timestamp TIMESTAMP
);

CREATE TABLE ms (
    ms_id VARCHAR(50) PRIMARY KEY NOT NULL,
    sysid VARCHAR(255),
    mei VARCHAR(255),
    title VARCHAR(255),
    short_title VARCHAR(255),
    creator VARCHAR(255),
    moreinformation TEXT,
    projectnote TEXT,
    repImage VARCHAR(255),
    featured VARCHAR(5),
    archivalcollectiontitle TEXT,
    viewatndc TEXT,
    date VARCHAR(50), 
    date_start INTEGER,
    date_end INTEGER,

    inprogress INTEGER,
    transcribed INTEGER,
    reviewed INTEGER,

    type VARCHAR(50)
);

CREATE TABLE creator (
    slug VARCHAR(255) PRIMARY KEY,
    bioblurb TEXT,
    biographicalnote TEXT,
    caption TEXT,
    collectionguide TEXT,
    collectionscopenote TEXT,
    dates VARCHAR(255),
    displayname VARCHAR(255),
    featured VARCHAR(10),
    indexname VARCHAR(255),
    mei VARCHAR(255),
    repImage VARCHAR(255),
    rr1text VARCHAR(100),
    rr1url VARCHAR(100),
    rr2text VARCHAR(100),
    rr2url VARCHAR(100),
    rr3text VARCHAR(100),
    rr3url VARCHAR(100),
    sysid VARCHAR(50)
);

CREATE TABLE filter (
    filter_id SERIAL PRIMARY KEY,  -- PostgreSQL uses SERIAL instead of AUTO_INCREMENT
    ms_id VARCHAR(50) NOT NULL,
    slug_value VARCHAR(255) NOT NULL,
    human_value VARCHAR(255) NOT NULL,
    filter_group VARCHAR(50) NOT NULL,
    CONSTRAINT fk_ms  -- naming the constraint is a good practice
        FOREIGN KEY (ms_id)
        REFERENCES ms(ms_id)
        ON DELETE CASCADE  -- optional: automatically delete related filters when ms is deleted
);
