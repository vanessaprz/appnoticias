import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article:Article;
  @Input() index:number;

  constructor(private iab:InAppBrowser,private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {}

  openArticle(){
   // window.open(this.article.url,'_blank');
   const browser = this.iab.create(this.article.url);
   browser.show();
  }

  async openMenu(){

    const actionSheet = await this.actionSheetCtrl.create(
      {
        header:'options',
        buttons: [
          {
          text:'Share',
          icon : 'share-outline',
          handler : ()=> this.onOpenArticle()
          },
          {
            text:'Favorites',
            icon : 'heart-outline',
            handler : ()=> this.onToggleFavorite()
          },
          {
              text:'Cancel',
              icon : 'close-outline',
              role: 'cancel'
          }
        ]
    });

    await actionSheet.present();

  }

  onOpenArticle(){
    console.log('share article');
  }

  onToggleFavorite(){
    console.log('share article');

  }
}
