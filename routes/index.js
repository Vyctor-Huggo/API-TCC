const { authRouter } = require("./auth.routes");
const { equipmentsRouter } = require("./equipments.routes");
const { passwordRouter } = require("./password.routes");

module.exports = (app) => {
    authRouter(app);
    passwordRouter(app);
    equipmentsRouter(app);
};
