import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals.service';
import { HospitalModel } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  hospitals: HospitalModel[];
  loading = false;
  private imgSubs: Subscription;

  constructor(
    private searchService: SearchService,
    private _hospitalsService: HospitalsService,
    private _modalImageService: ModalImageService) { }

  ngOnInit() {
    this.loadHospitals();

    this.imgSubs = this._modalImageService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadHospitals());
  }

  search(term: string) {
    if ( term.length === 0 ) {
      this.loadHospitals();
      return;
    }
    this.searchService.search('hospitals', term)
      .subscribe(resp => this.hospitals = resp);
  }

  loadHospitals() {
    this.loading = true;
    this._hospitalsService.loadHospitals().subscribe(hospitals => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  updateHospital(hospital: HospitalModel) {
    this._hospitalsService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        Swal.fire('Update', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: HospitalModel) {
    this._hospitalsService.deleteHospital( hospital._id )
      .subscribe(resp => {
        this.loadHospitals();
        Swal.fire('Delete', hospital.name, 'success');
      });
  }

  async showModalCreate() {
    const { value } = await Swal.fire({
      title: 'Create hospital',
      text: 'Enter new hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    });

    if ( value.trim().length > 0 ) {
      this._hospitalsService.createHospital(value)
        .subscribe((resp: any) => this.hospitals.push(resp.hospital));
    }

    console.log(value);
  }

  showModalImage( hospital: HospitalModel) {
    this._modalImageService.openModal('users', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
