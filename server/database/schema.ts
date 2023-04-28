const USER_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwdhash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email),
    FOREIGN KEY (role) REFERENCES roles(role)
);
`;

const ROLES_TABLE = `
CREATE TABLE IF NOT EXISTS roles (
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (role)
);

INSERT OR IGNORE INTO roles (role) VLAUES ("Admin");
INSERT OR IGNORE INTO roles (role) VLAUES ("Moderator");
INSERT OR IGNORE INTO roles (role) VLAUES ("User");

`;

const POSTS_TABLE = `
CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id)
);
`;

const LIKES_TABLE = `
CREATE TABLE IF NOT EXISTS likes (
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    likeit int(1) NOT NULL,
    PRIMARY KEY (userid),
    PRIMARY KEY (postid),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES posts(id)
);
`;

const COMMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS comments (
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    text TEXT NOT NULL,
    PRIMARY KEY (userid),
    PRIMARY KEY (postid),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES posts(id)
);
`;

export {
  USER_TABLE, POSTS_TABLE, LIKES_TABLE, COMMENTS_TABLE, ROLES_TABLE
};
