import { Component } from '@angular/core';
import { GroupService } from '../services/groups.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})

export class GroupComponent {

    groupName = "";
    groupList = [];
    selectedGroup = "";
    msn = "";
    msn2 = "";

    constructor(private service: GroupService, private user: UserService){
        this.getGroups();
    }

    createGroup(){
        var master = this.user.getUserLoggedIn();
        this.msn = "";
        if(this.groupName != ""){
            this.service.addGroup(this.groupName, master.username).subscribe(response => {
                if(response["mensaje"])
                    this.msn = response["mensaje"];
                else
                this.msn = "Registro Exitoso";
                this.getGroups();
            });
        }
    }

    getGroups(){
        var master = this.user.getUserLoggedIn();
        this.service.listGroups(master.username).subscribe(response => this.groupList = response["list"]);
    }
} 