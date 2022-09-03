import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getTopHeadLines(){
   return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=112f3435b6aa4ecf8aa263ad68ded0e5')
  }
}