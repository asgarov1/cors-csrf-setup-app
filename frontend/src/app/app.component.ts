import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  template: `
    <div style="margin: 2rem;">
      <div class="box">
        <div>Output: {{ output }}</div>
        <br>
        <button (click)=" fetchResource()">Fetch with CORS</button>
        <br><br>
        <em>Fetches the resource via dynamic (CORS) request</em>
        <br>
      </div>
      <br>
      <div class="box">
        <form action="http://localhost:8080/resource"
              method="POST"
              (submit)="submitForm($event)"
        >
          <label>Fetch with CSRF</label>
          <br><br>
          <input name="email" value="bad_actor@example.com">
          <br><br>
          <button type="submit">Submit with CSRF</button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .box {
      padding: 1rem;
      border: lightgray 1px solid;
    }
  `
})
export class AppComponent {

  output = '[empty]';

  constructor(private httpClient: HttpClient) {
  }

  submitForm(event: any): void {
    event.preventDefault()

    this.httpClient.post("http://localhost:8080/resource", {},{
      responseType: "text",
      withCredentials: true
    }).subscribe(response => this.output = response)
  }

  fetchResource(): void {
    this.httpClient.get("http://localhost:8080/resource", {
      responseType: "text",
    }).subscribe(response => this.output = response)
  }
}
