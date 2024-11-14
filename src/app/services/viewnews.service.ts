import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewnewsService {

  constructor(private http : HttpClient) { }

  getNewsData() : Observable<any>{
    const url = 'https://newsdata.io/api/1/news?apikey=pub_57221d96dd57b18784105af363505e01c9709&q=Peru&country=pe&language=es'
    return this.http.get<any>(url)
  }
}
