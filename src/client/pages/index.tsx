import { User } from '../components/User';
import { useFireauth } from '../firebase/hooks';

const Index: React.FunctionComponent = () => {
	const { user, login, logout } = useFireauth();
	return <User user={user} login={login.withGoogle} logout={logout} />;
};

export default Index;
