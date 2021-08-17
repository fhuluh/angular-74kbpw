import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name2: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css']
})
export class AutocompleteDisplayExample implements OnInit {
  myControl = new FormControl();
  options: User[] = [{ name2: 'fhulu' }, { name2: 'fhelo' }, { name2: 'GPHM' }];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name2)),
      map(name2 => (name2 ? this._filter(name2) : this.options.slice()))
    );
  }

  displayFn(user: User): string {
    return user && user.name2 ? user.name2 : '';
  }

  private _filter(name2: string): User[] {
    const filterValue = name2.toLowerCase();

    return this.options.filter(option =>
      option.name2.toLowerCase().includes(filterValue)
    );
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
