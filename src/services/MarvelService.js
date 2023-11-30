import {useHttp} from "../hooks/http.hooks.js";

const useMarvelService = () => {
    const {loading,request,error,clearError} = useHttp();

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

    const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

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

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {
        loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComic,
    }
}


export default useMarvelService;
