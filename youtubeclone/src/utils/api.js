import axios from "axios";

const api = axios.create({
  baseURL: "https://yt-api.p.rapidapi.com",
  headers: {
	'x-rapidapi-key': '16ef9a62bemsha13f703eb9f7c88p1654abjsnc1f477fc31a9',
	'x-rapidapi-host': 'yt-api.p.rapidapi.com'
}

});


export default api;


