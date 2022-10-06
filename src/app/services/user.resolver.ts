import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

  constructor (private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUser(route.paramMap.get('uuid')!);
  }
}
