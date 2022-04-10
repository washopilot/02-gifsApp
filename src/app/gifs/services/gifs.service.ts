import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '0gL2YrFWGd1ZQHGRmz0Ndui9eHNQ4Ta8';
  private _historial: string[] = [];

  //TODO: Caambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http
      .get<SearchGifsResponse>(
        `http://api.giphy.com/v1/gifs/search?api_key=0gL2YrFWGd1ZQHGRmz0Ndui9eHNQ4Ta8&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
