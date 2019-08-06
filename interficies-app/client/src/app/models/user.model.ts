export class User {
    
    username: string;
    shownName: string;
    currentRol: string;
    currentGender: string;
    level: string;
    achivements: [];

    
    constructor ( u : string, n : string, r : string, l : string) {
        this.username = u;
        this.shownName = n;
        this.currentRol = r;
        this.level = l;
        this.achivements = [];
        this.currentGender = 'chico';
    }
}