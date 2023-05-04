const USER_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    passwdhash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    ban int(1) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name),
    CONSTRAINT FK_PostUserID FOREIGN KEY (role)
    REFERENCES roles(role) ON DELETE CASCADE
);
`

const ROLES_TABLE = `
CREATE TABLE IF NOT EXISTS roles (
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (role)
);

`

const ROLES_TABLE_CONTENT1 = `
INSERT INTO roles (role) VALUES ("Admin");
`

const ROLES_TABLE_CONTENT2 = `
INSERT INTO roles (role) VALUES ("Moderator");
`

const ROLES_TABLE_CONTENT3 = `
INSERT INTO roles (role) VALUES ("User");
`

const CHECK_IF_ROLE_EXISTS = async (
  sql: Function,
  name: string
): Promise<boolean> => {
  try {
    const arrayOfRoles = await sql(`SELECT * FROM roles WHERE role = '${name}'`)
    if (arrayOfRoles.length <= 0) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

const CREATE_DEFAULT_ADMIN = `
INSERT INTO users (id, name, passwdhash, role, ban) VALUES (NULL, "Admin", "$2b$10$gbTHdEs3BSqSP3sgDxGyAu5hI6ZccocGcRJOYMEv8PZGynxnffsIO", "Admin", 0);
`

const CREATE_DEFAULT_MODERATOR = `
INSERT INTO users (id, name, passwdhash, role, ban) VALUES (NULL, "Moderator", "$2b$10$czdVgOy1OaVXPO72XkVizOH5RY7btNesdmLwP1MMsSOSh/OfMFOXu", "Moderator", 0);
`

const CREATE_DEFAULT_USER = `
INSERT INTO users (id, name, passwdhash, role, ban) VALUES (NULL, "User", "$2b$10$DviVY0iPTfFBHvCwgbK/2u1uz4EwMgAnEjTAy9X//44w3uHrfxAkK", "User", 0);
`

const CHECK_IF_USER_EXISTS = async (
  sql: Function,
  name: string
): Promise<boolean> => {
  try {
    const arrayOfRoles = await sql(
      `SELECT * FROM users WHERE name = '${name}' OR role = '${name}'`
    )
    if (arrayOfRoles.length <= 0) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

const POSTS_TABLE = `
CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_LikesPostID FOREIGN KEY (userid)
    REFERENCES users(id) ON DELETE CASCADE
);
`

const LIKES_TABLE = `
CREATE TABLE IF NOT EXISTS likes (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    likeit int(1) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK__LikesUserID FOREIGN KEY (userid)
    REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK__LikesPostID FOREIGN KEY (postid)
    REFERENCES posts(id) ON DELETE CASCADE
);
`

const COMMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS comments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userid INT(11) NOT NULL,
    postid INT(11) NOT NULL,
    text TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_CommentsUserID FOREIGN KEY (userid)
    REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_CommentsPostID FOREIGN KEY (postid)
    REFERENCES posts(id) ON DELETE CASCADE
);
`

export {
  USER_TABLE,
  POSTS_TABLE,
  LIKES_TABLE,
  COMMENTS_TABLE,
  ROLES_TABLE,
  ROLES_TABLE_CONTENT1,
  ROLES_TABLE_CONTENT2,
  ROLES_TABLE_CONTENT3,
  CHECK_IF_ROLE_EXISTS,
  CREATE_DEFAULT_ADMIN,
  CREATE_DEFAULT_MODERATOR,
  CREATE_DEFAULT_USER,
  CHECK_IF_USER_EXISTS,
}
