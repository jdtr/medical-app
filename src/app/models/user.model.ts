import { environment } from 'src/environments/environment';
const baseUrl = environment.base_url;

export class User {
    constructor(
        public name: string,
        public email: string,
        public role?: string,
        public img?: string,
        public password?: string,
        public google?: boolean,
        public uid?: string
        ) {}

    get imageUrl(): string {
        // tslint:disable-next-line:curly
        if ( this.google ) return this.img;

        const imgBaseUrl = `${baseUrl}/uploads`;
        return this.img ? `${imgBaseUrl}/users/${this.img}` : `${imgBaseUrl}/not-image.jpg`;
    }
}
