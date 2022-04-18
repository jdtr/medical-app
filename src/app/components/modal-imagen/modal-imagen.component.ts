import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { User } from '../../models/user.model';
import { UploadsService } from 'src/app/services/uploads.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {
  public user: User;
  public uploadedImage: File;
  public imgTemp: any = null;

  constructor( 
    public modalImageService: ModalImageService,
    public uploadService: UploadsService) { }

  ngOnInit() {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage( file: File ) {
    this.uploadedImage = file;

    if ( !file ) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.imgTemp = reader.result;

  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.uploadService.updatePhoto(this.uploadedImage, type, id)
      .then(img => {
        this.closeModal();
        Swal.fire('Saved', 'Changes were saved', 'success');
        this.modalImageService.newImage.emit(img);
      })
      .catch(err => {
        Swal.fire('Saved', "Image couldn't changed", 'error');
      });
  }
}
