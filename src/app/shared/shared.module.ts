import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { EmbedVideo } from 'ngx-embed-video';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    OwlModule,
    EmbedVideo.forRoot()
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    BlockUIModule,
    ToastrModule,
    FormsModule,
    OwlModule,
    EmbedVideo
  ],
  providers: [
    HttpClientModule,
  ],
})
export class SharedModule { }
