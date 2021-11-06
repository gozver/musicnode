// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading$ = this.loader.loading$;

  constructor(
    public readonly loader: LoaderService
  ) { }
}
