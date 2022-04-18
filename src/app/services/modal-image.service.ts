import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal = true;
  public type: 'users'|'doctors'|'hospitals';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hiddenModal() {
    return this._hiddenModal;
  }

  openModal(
    type: 'users'|'doctors'|'hospitals',
    id: string,
    img = 'not-image'
  ) {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`;
    }
  }
  closeModal() {
    this._hiddenModal = true;
  }
}
