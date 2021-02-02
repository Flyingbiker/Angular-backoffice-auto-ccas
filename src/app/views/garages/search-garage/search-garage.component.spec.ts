import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGarageComponent } from './search-garage.component';

describe('SearchGarageComponent', () => {
  let component: SearchGarageComponent;
  let fixture: ComponentFixture<SearchGarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGarageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
