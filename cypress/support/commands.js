const pact = require("@pact-foundation/pact-web");
const axios = require("axios");
const R = require("rambda");

let server = false;

const pactDefaults = {
    cors: true,
    dir: "./pacts",
    pactfileWriteMode: "merge",
};

export const mockServer = ({ consumer, provider }) => {
    server = true;
    cy.server({});

    return cy.task("createMockServer", {
        ...getServerConfig(),
        consumer,
        provider,
    });
};

export const addMockRoute = ({
    server,
    withRequest,
    willRespondWith,
}) => {
    const options = { server, withRequest, willRespondWith };
    console.log(server)
    cy.route(() => {
        // Store the actual request details that came in
        // and replay that to Pact later on
        let actualRequest = {
            headers: {},
            body: {},
        };
        return {
            method: options.withRequest.method,
            url: `${basePathForProvider(server)}${options.withRequest.path}`,
            response: pact.Matchers.extractPayload(options.willRespondWith.body),
            onResponse: () => {
                const config = {
                    method: options.withRequest.method,
                    url: `http://${server.host}:${server.port}${options.withRequest.path}`,
                    ...actualRequest,
                };

                return axios.request(config);
            },

            onRequest: (xhr) => {
                // Re-send the request as seen by XHR to the pact mock service
                // important that it sends exactly what the XHR proxy does, otherwise we
                // may invalidate the contract
                actualRequest.headers = xhr.request.headers;
                actualRequest.body = xhr.request.body;
            },
        };
    });

    return cy.task("addMockRoute", options);
};

export const getPactConfig = () => {
    return R.pathOr({}, ["pact"], Cypress.config());
};

export const getServerConfig = () => {
    return {
        ...pactDefaults,
        ...getPactConfig(),
    };
};

const findProviderInConfig = (provider) => {
    return R.find(
        R.propEq("provider", provider),
        R.propOr([], "providers", getPactConfig())
    );
};

const basePathForProvider = (server) => {
    console.log(server);
    // e.g. in this example project it will be /pacts/provider/pactflow-example-provider/consumer/example-cypress-consumer/latest/stub as we are using Pactflow stubs
    return R.propOr("", 'baseUrl', findProviderInConfig(server.provider))
};

Cypress.Commands.add("mockServer", mockServer);
Cypress.Commands.add("addMockRoute", addMockRoute);
Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
    // cy.server()
    // cy.route('GET', '/tasks', seedData)
    // cy.visit('/')

    cy.mockServer({
        consumer: "example-cypress-consumer",
        provider: "pactflow-example-provider",
    }).then(opts => {
        console.log(opts);
        server = opts
        cy.addMockRoute({
            server,
            withRequest: {
                method: "GET",
                path: "/tasks",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: seedData
            },
        });
    })


})
