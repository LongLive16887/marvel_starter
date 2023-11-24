import {useHttp} from "../hooks/http.hooks.js";

const useMarvelService = () => {
    const {loading,request,error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2b9680cf80e031cca32b93884a0ee428';
    const _baseOffset = 210;

    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (basePath) => {
        return {
            id: basePath.id,
            name: basePath.name,
            description: basePath.description,
            thumbnail: basePath.thumbnail.path + '.' + basePath.thumbnail.extension,
            homepage: basePath.urls[0].url,
            wiki: basePath.urls[1].url,
            comics: basePath.comics.items
        }
    }

    return {loading,error,getAllCharacters,getCharacter}
}


export default useMarvelService;
