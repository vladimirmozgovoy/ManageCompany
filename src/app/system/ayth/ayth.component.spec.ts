import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AythComponent } from './ayth.component';

describe('AythComponent', () => {
  let component: AythComponent;
  let fixture: ComponentFixture<AythComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AythComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AythComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
