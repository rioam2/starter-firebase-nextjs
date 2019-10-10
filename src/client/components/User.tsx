import { UserStyles } from './User.styles';

export const User: React.FunctionComponent<Props> = ({ user, login, logout }) => {
	return (
		<div>
			<UserStyles.wrapper>
				<UserStyles.profilePic src={(user && user.photoURL) || ''} />
				<div>
					<button onClick={(user && logout) || login}>{(user && 'Logout') || 'Login'}</button>
				</div>
			</UserStyles.wrapper>
		</div>
	);
};

export interface Props {
	user: firebase.User | null;
	login: () => Promise<firebase.auth.UserCredential | null>;
	logout: () => Promise<void>;
}
