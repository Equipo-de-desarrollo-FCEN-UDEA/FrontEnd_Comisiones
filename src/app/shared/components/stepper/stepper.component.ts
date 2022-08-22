import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
<<<<<<< HEAD
import { Component, Input} from '@angular/core';
=======
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Directionality } from '@angular/cdk/bidi';
>>>>>>> main

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
<<<<<<< HEAD
export class StepperComponent extends CdkStepper {
=======
export class StepperComponent extends CdkStepper implements OnInit {

  @ViewChild("header2")header2!: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver,
    _dir: Directionality, _changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>) {
    super(_dir, _changeDetectorRef, _elementRef);
  }
  
  public showContainer: boolean | undefined;
  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
        } else {
          this.showContainer = false;
        }
      });
  }
>>>>>>> main

  @Input()
  activeClass = 'active';

  override get selected(): CdkStep {
    return this.steps.toArray()[this.selectedIndex];
  }

  isNextButtonHidden() {
    return !(this.steps.length === this.selectedIndex + 1);
  }

<<<<<<< HEAD
=======
  openNav() {
    this.header2.nativeElement.style.height = "200px";
  }

>>>>>>> main
}
