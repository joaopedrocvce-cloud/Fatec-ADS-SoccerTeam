import { Component, signal, OnInit } from '@angular/core';
import { Team } from '../team';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamService } from '../team-service';

@Component({
  selector: 'app-team-component',
  standalone: false,
  templateUrl: './team-component.html',
  styleUrl: './team-component.css'
})
export class TeamComponent implements OnInit{


  teams = signal<Team[]>([]);

  formGroupTeam: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: TeamService) {

    this.formGroupTeam = formBuilder.group({
      id: [''],
      team: [''],
      trainer: [''],
      captain: [''],
      goalkeeper: [''],
      bracket: ['']
    });

  }

  ngOnInit(): void {
      this.service.getAllTeams().subscribe(
          {
              next: json => this.teams.set(json)
          }
      );
  }

   save(){
    this.service.save(this.formGroupTeam.value).subscribe(
      {
        next: json => {
          this.teams.update(teams => [...teams, json]);
          this.formGroupTeam.reset();
        }
      }
    );
  }

  delete(team: Team) {
    this.service.delete(team).subscribe(
      {
        next: () => {
          this.teams.update(teams => teams.filter(t => t.id !== team.id));
        }
      }
    )
  }

     update() {
     this.service.update(this.formGroupTeam.value).subscribe(
        {
          next: json => {
            this.teams.update(teams => teams.map(t => t.id === json.id ? json : t));
            this.isEditing = false;
            this.formGroupTeam.reset();
          }
        }
      )
  }
  
     onClickUpdate(team: Team) {
      this.formGroupTeam.setValue(team);
      this.isEditing = true;
  }
}
