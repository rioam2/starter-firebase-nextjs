import styled from 'styled-components';

export const UserStyles = {
	wrapper: styled.div`
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: grid;
		grid-gap: 25px;
		grid-template-rows: auto 30px;
	`,
	profilePic: styled.div<{ src: string }>`
		background-color: #eee;
		border-radius: 100%;
		width: 125px;
		height: 125px;
		margin: 0 auto;
		background-image: url(${(props) => props.src});
		background-size: cover;

		${(props) =>
			!props.src &&
			`
            &::before {
                position: absolute;
                margin: 0 auto;
                left: 0;
                right: 0;
                content: '?';
                width: 125px;
                height: 125px;
                color: white;
                font-size: 105px;
            }
        `}
	`
};
