import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconSnackBarComponent } from './icon-snack-bar.component';

describe('IconSnackBarComponent', () => {
  let component: IconSnackBarComponent;
  let fixture: ComponentFixture<IconSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconSnackBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
