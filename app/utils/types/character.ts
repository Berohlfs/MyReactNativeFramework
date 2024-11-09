export type CharacterAttributes = {
    slug: string | null,
    alias_names: string | null | string[],
    animagus: string | null,
    blood_status: string | null,
    boggart: string | null,
    born: string | null,
    died: string | null,
    eye_color: string | null,
    family_members: string | null | string[],
    gender: string | null,
    hair_color: string | null,
    height: string | null,
    house: string | null,
    image: string | null,
    jobs: string | null | string[],
    marital_status: string | null,
    name: string | null,
    nationality: string | null,
    patronus: string | null,
    romances: string | null | string[],
    skin_color: string | null,
    species: string | null,
    titles: string | null | string[],
    wands: string | null | string[],
    weight: string | null,
    wiki: string | null
}

export type Character = {
    id: number
    attributes: CharacterAttributes
}