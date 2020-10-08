// This would be externalised into a separate, importable plugin
const pact = require("@pact-foundation/pact");
const rimraf = require("rimraf");

module.exports = (on) => {
    console.log('registering Pact!')
    let server;

    on("task", {
        createMockServer(options) {
            server = new pact.Pact(options);
            return server.setup();
        },
        addMockRoute(options) {
            return server.addInteraction(options);
        }
    });
};