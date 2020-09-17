import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    BlockUIModule,
    ToastrModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
  ],
})
export class SharedModule { }
