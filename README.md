# testing-ionic-v5

-   ## deploy on Netlify

    -   https://blog.rodrigograca.com/how-to-deploy-an-ionic-5-app-on-netlify/
    -   -- need to install ionic cli in the app directly, so netlify can use it
    -   npm i -D @ionic/cli

-   ## live

    -   https://testing-ionic-v5.netlify.app/

-   ## Tips

    -   to run a single test only, place 'f' before the test method
    -   'fdescribe'

-   ## TestBed
    -   Angular mock module for testing modules

## Errors

`Failed: R3InjectorError(DynamicTestModule)[FormBuilder -> FormBuilder]: NullInjectorError: No provider for FormBuilder!`

-   this comes up when a component is using reactive forms
-   to solve, inject `ReactiveFormsModule` into TestBed imports in the spec.ts page

`NullInjectorError: R3InjectorError(DynamicTestModule)[NavController -> UrlSerializer -> UrlSerializer]: NullInjectorError: No provider for UrlSerializer!`

-   this comes up when a component makes use of a routerLink
-                         `<ion-list *ngIf="todos.length > 0">
                              <ion-item-sliding *ngFor="let t of todos; let i = index;">
                                  <ion-item routerLink="/home">
                                      <ion-label>{{ t }}</ion-label>
                                  </ion-item>
                                  ...
                                  ...`

    -   to fix, inject `RouterTestingModule` from `@angular/router/testing` into TestBed imports in the spec.ts page

            beforeEach(waitForAsync(() => {
                // TestBed is a mock moodule for testing
                TestBed.configureTestingModule({
                    declarations: [ListPage],
                    imports: [IonicModule.forRoot(), ReactiveFormsModule, **RouterTestingModule**],
                }).compileComponents();
                // fixture is most important
                // fixture is basically a wrapper for a component and its template
                // and we can get everything we need from the fixture
                fixture = TestBed.createComponent(ListPage);
                component = fixture.componentInstance;
                fixture.detectChanges();

                // inject Data Service instance into Test Bed

                service = TestBed.inject(DataService);
            }));

-   ## ASYNC TESTING in JASMINE

        // File: list.page.spec.ts
        //
        //
        // ASYNC TESTING in Jasmine
        // 3 ways to test
        //
        //
        //
        // Jasmine - not recommended, use Cypress

        it("should load async todos", (done) => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
        Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // use spy.calls.mostRecent() to get the value from the promise
        spy.calls.mostRecent().returnValue.then(() => {
        expect(component.todos).toBe(arr);
        done();
        });
        });

        // using waitForAsync, wraps our test function in an async test zone

        it("should load async todos", waitForAsync(() => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
        Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // whenStable means when all Async operations are completed
        fixture.whenStable().then(() => {
        expect(component.todos).toBe(arr);
        });
        }));

        // using fakeAsync and tick

        it("should load async todos", fakeAsync(() => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
        Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // tick() simulates the asynchronous passage of time in for async calls in fakeAsync
        tick();
        expect(component.todos).toBe(arr);
        }));
