import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Usuario {
  id?: number;
  name: string;
  username: string;
  email: string;
}

const USUARIOS: Usuario[] = [
  { id: 1, name: 'Juan', username: 'juan', email: 'asdf@asdasd.com' },
  { id: 2, name: 'Pedro', username: 'pedro', email: 'svxcv@sdfsdf.com' },
  { id: 3, name: 'Maria', username: 'maria', email: 'xcxzv@sasadf.com' },
  { id: 4, name: 'Daniel', username: 'daniel', email: 'fsdfvdsgv@sfsdf.com' },
  { id: 5, name: 'Manuel', username: 'manuel', email: 'asdf@asdasd.com' },
  { id: 6, name: 'Steven', username: 'steven', email: 'svxcv@sdfsdf.com' },
  { id: 7, name: 'Alejandro', username: 'alejandro', email: 'xcxzv@sasadf.com' },
  { id: 8, name: 'Vivian', username: 'vivi', email: 'fsdfvdsgv@sfsdf.com' },
  { id: 9, name: 'Anlly', username: 'anlly', email: 'asdf@asdasd.com' },
  { id: 10, name: 'Simon', username: 'simon', email: 'svxcv@sdfsdf.com' },
  { id: 11, name: 'Leonardo', username: 'leo', email: 'xcxzv@sasadf.com' },
  { id: 12, name: 'Felipe', username: 'felipe', email: 'fsdfvdsgv@sfsdf.com' },
  { id: 13, name: 'Jhon', username: 'jhon', email: 'asdf@asdasd.com' },
  { id: 14, name: 'James', username: 'james', email: 'svxcv@sdfsdf.com' },
  { id: 15, name: 'Manuela', username: 'manuela', email: 'xcxzv@sasadf.com' },
  { id: 16, name: 'Danover', username: 'danover', email: 'fsdfvdsgv@sfsdf.com' },
  { id: 17, name: 'Jose', username: 'jose', email: 'asdf@asdasd.com' },
  { id: 18, name: 'Pablo', username: 'pablo', email: 'svxcv@sdfsdf.com' },
  { id: 19, name: 'Mariana', username: 'mariana', email: 'xcxzv@sasadf.com' },
  { id: 20, name: 'Laura', username: 'laura', email: 'fsdfvdsgv@sfsdf.com' },
];

@Component({
  selector: 'app-control-administrativo',
  templateUrl: './control-administrativo.component.html',
  styleUrls: ['./control-administrativo.component.scss'],
  providers: [DecimalPipe]
})

export class ControlAdministrativoComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize = USUARIOS.length;
  usuarios: Usuario[] = [];

  constructor(pipe: DecimalPipe) {
    this.refreshUsuarios();
  }

  refreshUsuarios() {
    this.usuarios = USUARIOS
      .map((usuario, i) => ({ id: i + 1, ...usuario }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
  }
}
