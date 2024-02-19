import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CsrfTokenInterceptor implements HttpInterceptor {
  /**
   * HTTP Methods allowed in Backend {@link CsrfFilter.DefaultRequiresCsrfMatcher#allowedMethods}
   */
  private readonly CSRF_ALLOWED_METHODS = ["GET", "HEAD", "TRACE", "OPTIONS"]

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const xsrfTokenFromCookie = this.getCookie('XSRF-TOKEN');

    // IF not a CSRF Allowed method (e.g. POST, PUT or DELETE), and XSRF-TOKEN is present
    if (!this.CSRF_ALLOWED_METHODS.includes(req.method) && xsrfTokenFromCookie) {
      // Clone the request and add X-XSRF-TOKEN header
      const modifiedReq = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', xsrfTokenFromCookie)
      });
      // Pass the modified request to the next handler
      return next.handle(modifiedReq);
    }
    // If it's a GET request, pass the original request
    return next.handle(req);
  }

  getCookie(name: string): string | undefined {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return undefined;
  }
}
