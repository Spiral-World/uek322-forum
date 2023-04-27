const USER_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwdhash VARCHAR(255) NOT NULL,
    role VARCHAR(8) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);
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
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    likeit int(1) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES posts(id)
);
`;

const COMMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS comments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    text TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES posts(id)
);
`;

export {
  USER_TABLE, POSTS_TABLE, LIKES_TABLE, COMMENTS_TABLE,
};
