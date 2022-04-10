import { TestBed } from "@angular/core/testing";

import { ApiService } from "./api.service";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

// FOR REFERENCE - NOT FOR TESTING
// api.service.ts file
//
//
// export class ApiService {
//     constructor(private http: HttpClient) {}

//     getProducts() {
//         return this.http.get<Product[]>("https://fakestoreapi.com/products");
//     }
// }

describe("ApiService", () => {
    let service: ApiService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    //
    //
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ApiService);
        // http Client is injected because it is included in the api.service constructor
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    // after each

    afterEach(() => {
        // verify that no outstanding requests exist after each test
        httpTestingController.verify();
    });

    //
    //

    /// tests
    it("API Service should be created", () => {
        expect(service).toBeTruthy();
    });

    it("API Service should make an API call", () => {
        // array of objects
        const mockResponse = [
            {
                id: 1,
                title: "Simons Product",
                price: 42.99,
                description: "Epic product test",
                category: "ionic",
                image: "https:pixabay.com/cool-image-url",
            },
        ];

        //
        service.getProducts().subscribe((res) => {
            console.log("res", res);
            expect(res).toBeFalse();
            expect(res).toHaveSize(1);
            const product = res[0];
            expect(product).toBe(mockResponse[0]);
        });
        // test to check that we made one and only one (1) API call to the specified URL endpoint
        const mockRequest = httpTestingController.expectOne(
            "https://fakestoreapi.com/products"
        );

        expect(mockRequest.request.method).toEqual("GET");

        // execute the call
        // - resolve the request by returning a body plus HTTP info, response headers, etc.
        mockRequest.flush(mockResponse);
    });
});
