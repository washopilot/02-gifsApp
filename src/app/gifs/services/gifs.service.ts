import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
    }

    this.http
      .get(
        'http://api.giphy.com/v1/gifs/search?api_key=0gL2YrFWGd1ZQHGRmz0Ndui9eHNQ4Ta8&q=dbz&limit=10'
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
      });
  }
}
