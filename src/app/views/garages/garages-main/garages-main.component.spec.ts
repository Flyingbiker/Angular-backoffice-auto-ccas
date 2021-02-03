import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragesMainComponent } from './garages-main.component';

describe('GaragesMainComponent', () => {
  let component: GaragesMainComponent;
  let fixture: ComponentFixture<GaragesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaragesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
