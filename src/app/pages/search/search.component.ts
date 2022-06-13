import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public users: User[];
  public doctors: Doctor[];
  public hospitals: HospitalModel[];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService   
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({term}) => {
      this.globalSearch(term);
    });
  }

  globalSearch( term: string ) {
    this.searchService.globalSearch(term)
      .subscribe((resp: any) => {
        console.log(resp);
        this.users = resp.users;
        this.doctors = resp.doctors;
        this.hospitals = resp.hospitals;
      });
  }

}
