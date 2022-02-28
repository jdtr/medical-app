export class User {
    constructor(
        public name: string,
        public email: string,
        public role: string,
        public pasword?: string,
        public google?: boolean,
        public uid?: string
        ) {}
}
