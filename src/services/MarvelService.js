
class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2b9680cf80e031cca32b93884a0ee428';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (basePath) => {
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

}


export default MarvelService;
