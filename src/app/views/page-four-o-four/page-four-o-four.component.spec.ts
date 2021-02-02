import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFourOFourComponent } from './page-four-o-four.component';

describe('PageFourOFourComponent', () => {
  let component: PageFourOFourComponent;
  let fixture: ComponentFixture<PageFourOFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFourOFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFourOFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
