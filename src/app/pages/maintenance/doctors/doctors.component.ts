import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorsService } from '../../../services/doctors.service';
import { Doctor } from '../../../models/doctor.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading = true;
  public doctors: Doctor[];
  public imgSubs: Subscription;

  constructor(
    private _doctorsService: DoctorsService,
    private _modalImageService: ModalImageService,
    private _searchService: SearchService
  ) { }

  ngOnInit() {
    this.loadDoctors();
    this.imgSubs = this._modalImageService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadDoctors());
  }

  search( term: string ) {
    if ( term.length === 0) {
      return this.loadDoctors();
    }

    this._searchService.search('doctors', term)
      .subscribe((resp: Doctor[]) => {
        this.doctors = resp;
      });
  }

  loadDoctors() {
    this.loading = true;
    this._doctorsService.loadDoctors().subscribe(doctors => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  showModal(doctor: Doctor) {
    this._modalImageService.openModal('doctors', doctor._id, doctor.img);
  }

  deleteDoctor( doctor: Doctor) {
    Swal.fire({
      title: 'Delete doctor?',
      text: `Do you want to delete to ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      this._doctorsService.deleteDoctor(doctor._id)
        .subscribe(resp => {
          this.loadDoctors();
          Swal.fire(
            'Deleted doctor',
            `${doctor.name} was deleted successfuly`,
            'success'
          );
        });
    });
  } 

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
