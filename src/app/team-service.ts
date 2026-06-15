import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl = "http://localhost:8080/teams";
  
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.apiUrl);
  }
  
  save(team: Team): Observable<Team>{
    return this.http.post<Team>(this.apiUrl, team);
  }

  // HTTP DELETE: http://localhost:8080/teams/34
  delete(team: Team): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${team.id}`);
 }

  // HTTP PUT: http://localhost:8080/teams/34
  // HTTP Request body: team
  update(team: Team): Observable<Team>{
    return this.http.put<Team>(`${this.apiUrl}/${team.id}`, team);
 }
}
