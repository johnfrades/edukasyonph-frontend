import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuarterStudentGrades} from './app.interface';

@Injectable()
export class AppService {
  private URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  public submitGradesByText(text: string) {
    return this.http.post(`${this.URL}/submitByText`, {text}).toPromise();
  }

  public getGrades() {
    return this.http.get<IQuarterStudentGrades[]>(`${this.URL}/grades`).toPromise();
  }

  public deleteQuarter(quarterText: string) {
    return this.http.delete(`${this.URL}/quarter/${quarterText}`).toPromise();
  }
}
