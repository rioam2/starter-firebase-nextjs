import styled from 'styled-components';

export const AppViewStyles = {
	wrapper: styled.div`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90vw;
		max-width: 500px;
		height: 90vh;
		max-height: 700px;
		padding: 20px;
		text-align: center;
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.1);
	`,
	spacer: styled.hr`
		margin: 10px 0;
		border: 0.5px solid rgba(0, 0, 0, 0.1);
	`,
	navbar: styled.div`
		margin: 20px auto;
		& > ul > a {
			margin: 0 10px;
		}
	`
};
