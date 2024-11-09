export type MovieAttributes = {
    slug: string | null
    box_office: string | null
    budget: string | null
    cinematographers: string[] | null
    directors: string[] | null
    distributors: string[] | null
    editors: string[] | null
    music_composers: string[] | null
    poster: string | null
    producers: string[] | null
    rating: string | null
    release_date: string | null
    running_time: string | null
    screenwriters: string[] | null
    summary: string | null
    title: string | null
    trailer: string | null
    wiki: string | null
}
  

export type Movie = {
    id: number,
    attributes: MovieAttributes
}