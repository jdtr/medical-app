import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalsService } from '../../../services/hospitals.service';
import { HospitalModel } from '../../../models/hospital.model';
import { DoctorsService } from '../../../services/doctors.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: HospitalModel[] = [];
  public hospitalSelected: HospitalModel;
  public doctorSelected: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalsService,
    private doctorService: DoctorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe( hospitalId => {
      this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId);
      console.log(this.hospitalSelected);
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
      .subscribe((hospitals: HospitalModel[]) => this.hospitals = hospitals);
  }

  loadDoctor(id: string) {
    if (id == 'new') return;

    this.doctorService.loadDoctorById( id )
      .pipe(delay(100))
      .subscribe((doctor: any) => {

        if ( !doctor ) return this.router.navigateByUrl('/dashboard/doctors');

        const { name, hospital: { _id } } = doctor;
        this.doctorSelected = doctor;
        this.doctorForm.setValue({ name, hospital: _id });
      });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if ( this.doctorSelected ) {
      // Update
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      };

      this.doctorService.updateDoctor(data).subscribe(resp => {
        Swal.fire('Updated', `${ name } updated successful`, 'success');
      });
    } else {
      // Create
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Created', `${name} created successful`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
        });
    }
  }

}
