export class User {
    
    username: string;
    shownName: string;
    currentRol: string;
    level: string;
    points: number;

    
    constructor ( u : string, n : string, r : string, l : string, p: number) {
        this.username = u;
        this.shownName = n;
        this.currentRol = r;
        this.level = l;
        this.points = p;
    }
}