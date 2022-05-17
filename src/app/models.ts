import { NumberSymbol } from "@angular/common";

interface Cast {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

interface Credits {
    cast: Array<Cast>;
    crew: Array<Crew>;
}

interface Crew {
    adult: boolean; 
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: String;
    belongs_to_collection: any;
    budget: number;
    credits: Credits;
    genres: Array<Genre>;
    homepage: String;
    id: number;
    imdb_id: String;
    original_language: String;
    original_title: String;
    overview: String;
    popularity: number;
    poster_path: String;
    production_companies: Array<ProductionCompany>;
    production_countries: Array<ProductionCountry>;
    release_date: String;
    revenue: number;
    runtime: number;
    spoken_languages: Array<SpokenLanguage>;
    status: String;
    tagline: String;
    title: String;
    video: Boolean;
    videos: Videos;
    vote_average: number;
    vote_count: number;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ShowResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: Array<string>;
    genre_ids: Array<number>;
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

interface Videos {
    results: Array<Result>;
}

export interface APIResponse<T> {
    results: Array<T>;
}