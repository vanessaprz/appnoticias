import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles:Article[] =[];

  get getLocalArticles(){
    return [...this._localArticles];
  }

  constructor(private storage:Storage) { 
  this.init();

  }


  async init() {

    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();

  }

  async saveOrRemoveArticle(article:Article){

    const exist = this._localArticles.find(LocaLArticle=>localArticle.title===article.title);

    if(exist){
      this._localArticles = this._localArticles.filter(LocaLArticle=>localArticle.title!==article.title);
    }else{
      this._localArticles = [article,...this._localArticles];
    }

    this._storage.set('articles',this._localArticles);
  }

  async loadFavorites(){
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles;
    } catch (error) {
      console.log(error);
      
    }
  }

  articlesInFavorites(article:Article){
    return !!this._localArticles.find(LocaLArticle=>localArticle.title===article.title);
  }
}
