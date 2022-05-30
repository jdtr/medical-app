interface _HospitalUser {
    _is: string;
    name: string;
    img: string;
}

export class HospitalModel {
    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser
    ) {}
}