const { authRouter } = require("./auth.routes");
const { passwordRouter } = require("./password.routes");

module.exports = (app) => {
    authRouter(app);
    passwordRouter(app);
    equipmentsRouter(app);
};
