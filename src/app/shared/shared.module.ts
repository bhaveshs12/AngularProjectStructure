import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { EmbedVideo } from 'ngx-embed-video';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ClipboardModule } from 'ngx-clipboard';
import { ContactUsComponent } from '../layout/modules/admin/contact-us/contact-us.component';
import { HowtoComponent } from '../layout/modules/admin/howto/howto.component';
@NgModule({
  declarations: [ContactUsComponent, HowtoComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    OwlModule,
    EmbedVideo.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ClipboardModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    ToastrModule,
    FormsModule,
    OwlModule,
    NgxSpinnerModule,
    EmbedVideo,
    NgxPaginationModule,
    NgxYoutubePlayerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ClipboardModule,
    ContactUsComponent,
    HowtoComponent
  ],
  providers: [
    HttpClientModule,
    ClipboardModule
  ],
})
export class SharedModule { }
