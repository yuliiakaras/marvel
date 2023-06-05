import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => { 

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b481cc3f7e4b607f867263f7502d4a6e';
    const _baseOffset = 210;
    const _offset = 0;

    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getAllComics = async (offset = _offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name, 
            description: character.description ? character.description.substring(0, 200) + "..." : "There is no description for the charcter.", 
            thumbnail:`${character.thumbnail.path}.${character.thumbnail.extension}`, 
            homepage: character.urls[0].url, 
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title, 
            thumbnail:`${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            description: comic.description || 'There`s no description for the comics' ,
            pageCount: comic.pageCount ? `${ comic.pageCount } p.` : 'There`s no information about the number of pages',
            language: comic.textObjects.language || 'en-US',
            price: comic.prices[0].price
        }
    }

    return {loading, error, clearError, getCharacter, getComic, getAllCharacters, getAllComics};
}

export default useMarvelService;