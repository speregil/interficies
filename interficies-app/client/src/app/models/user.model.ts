export class User {
    
    username: string;
    shownName: string;
    currentRol: string;
    currentGender: string;
    level: string;
    achivements: [];
    
    constructor () {
        this.achivements = [];
        this.currentGender = 'chico';
    }
}