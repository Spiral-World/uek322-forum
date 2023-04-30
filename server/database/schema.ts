const USER_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwdhash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    ban int(1) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email),
    CONSTRAINT FK_PostUserID FOREIGN KEY (role)
    REFERENCES roles(role)
);
`;

const ROLES_TABLE = `
CREATE TABLE IF NOT EXISTS roles (
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (role)
);

`;

const ROLES_TABLE_CONTENT1 = `
INSERT INTO roles (role) VALUES ("Admin");
`;

const ROLES_TABLE_CONTENT2 = `
INSERT INTO roles (role) VALUES ("Moderator");
`;

const ROLES_TABLE_CONTENT3 = `
INSERT INTO roles (role) VALUES ("User");
`;

/*

IF EXISTS (SELECT * FROM roles WHERE role = 'User')
BEGIN
    ;
END
ELSE
BEGIN
    INSERT INTO roles (role) VALUES ("User");
END

*/

/**
 * ToDo: Add a Date to the Posts
 */
const POSTS_TABLE = `
CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_LikesPostID FOREIGN KEY (userid)
    REFERENCES users(id)
);
`;

const LIKES_TABLE = `
CREATE TABLE IF NOT EXISTS likes (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    likeit int(1) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK__LikesUserID FOREIGN KEY (userid)
    REFERENCES users(id),
    CONSTRAINT FK__LikesPostID FOREIGN KEY (postid)
    REFERENCES posts(id)
);
`;

const COMMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS comments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    text TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_CommentsUserID FOREIGN KEY (userid)
    REFERENCES users(id),
    CONSTRAINT FK_CommentsPostID FOREIGN KEY (postid)
    REFERENCES posts(id)
);
`;

export {
  USER_TABLE, POSTS_TABLE, LIKES_TABLE, COMMENTS_TABLE, ROLES_TABLE, ROLES_TABLE_CONTENT1, ROLES_TABLE_CONTENT2, ROLES_TABLE_CONTENT3
};
