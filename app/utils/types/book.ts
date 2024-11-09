export type BookAttributes = {
    slug: string,
    author: string,
    cover: string,
    dedication: string
    pages: number,
    release_date: string,
    summary: string,
    title: string,
    wiki: string
}

export type Book = {
    id: number
    attributes: BookAttributes
}