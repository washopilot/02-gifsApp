import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '0gL2YrFWGd1ZQHGRmz0Ndui9eHNQ4Ta8';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
    }

    fetch(
      'http://api.giphy.com/v1/gifs/search?api_key=0gL2YrFWGd1ZQHGRmz0Ndui9eHNQ4Ta8&q=dbz&limit=10'
    ).then((resp) => {
      resp.json().then((data) => console.log(data));
    });
  }
}
