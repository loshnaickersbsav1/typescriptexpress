import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import BusinessCapabilityRoute from '@routes/businesscapability.route';
import ExtractsRoute from '@routes/extracts.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new BusinessCapabilityRoute(), new UsersRoute(), new AuthRoute(), new ExtractsRoute()]);

app.listen();
