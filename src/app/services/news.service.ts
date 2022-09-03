import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getTopHeadLines(){
   return this.http.get<NewsResponse>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c7aeeae5388d43a9be919f3054397392')
  }
}