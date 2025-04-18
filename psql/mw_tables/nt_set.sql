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

    inprogress INTEGER,
    transcribed INTEGER,
    reviewed INTEGER,

    type VARCHAR(50)
);
