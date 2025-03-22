
CREATE TABLE companies (
id bigint PRIMARY KEY generated always as identity,
doing_business_name TEXT,
legal_name TEXT,
description TEXT,
website TEXT,
--we generate this 
risk_score INT,
recommendation TEXT,
next_review_date TIMESTAMP,

--status
status TEXT,

created_at TIMESTAMP DEFAULT NOW(),
created_by TEXT,
organization_id TEXT
);

CREATE TABLE founders (
id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--investors provide this info
first_name TEXT,
last_name TEXT,
email TEXT,
phone VARCHAR(50),

--founders supply this info
linkedin_url TEXT,
github_url TEXT,
date_of_birth TEXT,
nationality TEXT,
address TEXT,
company_id BIGINT REFERENCES companies(id),
company_name TEXT,
is_pep BOOLEAN,
is_sanctioned BOOLEAN,

--we generate this 
risk_score INT,
recommendation TEXT,
next_review_date TIMESTAMP,
tavus_url TEXT,
portal_url TEXT,
tavus_conversation_id TEXT,

--status of case
status TEXT,

created_at TIMESTAMP DEFAULT NOW(),
created_by TEXT,
organization_id TEXT
);


CREATE TABLE attachments (
id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
foreign_id BIGINT,
foreign_table TEXT,
filename TEXT,
description TEXT,
filepath TEXT,
type TEXT,
created_at TIMESTAMP DEFAULT NOW(),
created_by TEXT,
organization_id TEXT
);


CREATE TABLE friends (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    email TEXT,
    status TEXT,
    founder_id BIGINT references founders(id),
    tavus_conversation_id TEXT,
    tavus_transcript TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    organization_id TEXT,
)
