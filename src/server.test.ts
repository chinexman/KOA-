import { Server } from "http";
import supertest from "supertest";
import app from "./app";

let request: supertest.SuperTest<supertest.Test>;
let server: Server;

beforeAll(() => {
    server = app.listen();
    request = supertest(server)
});

afterAll(() => {
    server.close();

})

describe("App", () => {

    it("rejects non array json", async () => {
        const invalidData: object = { user: 'kayode', amount: 20 }
        await request.post('/parseData')
            .send(invalidData)
            .expect(400, "Must be array of objects")

    })

    it("rejects array, that contains invalid object", async () => {
        const arrWithInvalidObject = [{ user: 'jane', amount: 1 }, { user: 'doe', amount: 2 }, { faultyUser: 'fault', amount: 5 }]
        await request.post('/parseData')
            .send(arrWithInvalidObject)
            .expect(400, "user or amount is missing")

    })

    it("rejects array, that contains object with invalid value for user or amount", async () => {
        const arrWithInvalidObjectValue = [{ user: 'jane', amount: 5 }, { user: 'doe', amount: 2 }, { user: [], amount: 2 }]
        await request.post('/parseData')
            .send(arrWithInvalidObjectValue)
            .expect(400, "invalid type for user or amount")

    })

    it("validates valid data", async () => {
        const validData: object = [{ user: 'Chinex', amount: 20 }, { user: 'doe', amount: 2 }]
        await request.post('/parseData').send(validData).expect(200, "data is valid")
    })

})