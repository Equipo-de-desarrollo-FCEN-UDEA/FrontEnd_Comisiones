import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { LoaderService } from '@services/interceptors/loader.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('intercepted');
    this.loaderService.show();

    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
      )
    ;
    
  }
}
