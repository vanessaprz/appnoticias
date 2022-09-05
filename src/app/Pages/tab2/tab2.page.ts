import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories:string[] = ['business','entertainment','general','health','science','sports','technology'];
  selectedCategory:string = this.categories[0];
  constructor(private newService:NewsService) {}
  page:number = 1;
  articles:Article[] = [];
  @ViewChild(IonInfiniteScroll , {static :true}) infiniteScroll:IonInfiniteScroll


  ngOnInit(){
    this.newService.getTopHeadLines(this.page,this.selectedCategory).subscribe(resp=>{
    console.log(resp);
    this.articles = resp.articles;
    })
  }

  segmentChanged(event:any){
    //console.log(event.detail.value);
    this.infiniteScroll.disabled = false;
    this.selectedCategory = event.detail.value;
    this.newService.getTopHeadLines(this.page,this.selectedCategory).subscribe(resp=>{
      console.log(resp);
      this.articles = resp.articles;
      })
  }

  loadData(event:any){
    console.log(event);
    this.page +=1;
    this.newService.getTopHeadLines(this.page,this.selectedCategory).subscribe(resp=>{

      if(resp.articles.length===0){
        this.infiniteScroll.disabled = true;
        return;
      }
      this.articles = [...this.articles,...resp.articles];
      this.infiniteScroll.complete();
    })
  }
}
