import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); //check si le variable n'est pas vide
  });

  it(`should have as title 'back-auto-ccas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('back-auto-ccas');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('back-auto-ccas app is running!');
  });

  //faire commencer le nom de nos tests par should
  it(`test créé par Aymeric pour le logo non vide`, ()=>{
    //testBed est notre environneemnt de test (simule le navigateur)
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement; //document.querySelector('your component)
    
    const $img = compiled.querySelector('img');
    expect($img).toBeTruthy();
    });
});
