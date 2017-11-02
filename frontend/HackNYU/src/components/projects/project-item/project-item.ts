import { Project } from '../../../client-lib';
import { Observable } from 'rxjs/Rx';
import { getProjectById } from '../../../store/selectors/project.selectors';
import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'project-item',
  templateUrl: 'project-item.html'
})
export class ProjectItemComponent implements OnInit {
  
  @Input() projectId: string;
  @Output() onClick: EventEmitter<Project> = new EventEmitter<Project>();
  project$: Observable<Project>;

  constructor(
    public redux: NgRedux<any>
  ) {
    
  }

  ngOnInit(){
    this.project$ = getProjectById(this.redux, this.projectId);
  }

  onClickHandler(item: Project){
    this.onClick.emit(item);
  }
}
