export interface AUser {
    id: number
    name: string
    passwdhash: string
    role: string
    ban: number
}

export interface APost {
    id: number
    titel: string
    content: string
    userid: number
}

export interface AComment {
    id?: number
    userid?: number
    postid?: number
    text?: number
    author?: string
}

export interface ALike {
    id?: number
    userid?: number
    postid?: number
    likeit?: boolean
    author?: string
}
