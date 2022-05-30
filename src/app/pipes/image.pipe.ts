import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const baseUrl = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'|'doctors'|'hospitals'): string {
    const imgBaseUrl = `${baseUrl}/uploads`;
    return img ? `${imgBaseUrl}/${type}/${img}` : `${imgBaseUrl}/not-image.jpg`;
  }

}
