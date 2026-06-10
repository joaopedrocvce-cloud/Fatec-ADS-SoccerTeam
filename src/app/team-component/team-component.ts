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

  feedbackMessage: string | null = null;
  feedbackType: 'success' | 'danger' | 'warning' = 'success';

  save() {
    this.service.save(this.formGroupTeam.value).subscribe({
      next: json => {
        this.teams.update(teams => [...teams, json]);
        this.formGroupTeam.reset();
        this.isEditing = false;
        this.feedbackMessage = 'Seleção cadastrada com sucesso!';
        this.feedbackType = 'success';
      },
      error: () => {
        this.feedbackMessage = 'Erro ao cadastrar seleção.';
        this.feedbackType = 'danger';
      }
    });
  }

  delete(team: Team) {
    this.service.delete(team).subscribe({
      next: () => {
        this.teams.update(teams => teams.filter(t => t.id !== team.id));
        this.feedbackMessage = 'Seleção removida com sucesso!';
        this.feedbackType = 'warning';
      },
      error: () => {
        this.feedbackMessage = 'Erro ao remover seleção.';
        this.feedbackType = 'danger';
      }
    });
  }

  update() {
    this.service.update(this.formGroupTeam.value).subscribe({
      next: json => {
        this.teams.update(teams => teams.map(t => t.id === json.id ? json : t));
        this.formGroupTeam.reset();
        this.isEditing = false;
        this.feedbackMessage = 'Seleção atualizada com sucesso!';
        this.feedbackType = 'success';
      },
      error: () => {
        this.feedbackMessage = 'Erro ao atualizar seleção.';
        this.feedbackType = 'danger';
      }
    });
  }

  onClickUpdate(team: Team) {
    this.formGroupTeam.patchValue(team);
    this.isEditing = true;
  }
}