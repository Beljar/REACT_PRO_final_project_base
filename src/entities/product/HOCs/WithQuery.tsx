import { Alert, AlertTitle, Box, Container } from '@mui/material';
import { FC, ComponentType } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Spinner } from 'shared/ui';
import { getMessageFromError } from 'shared/utils';

interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	refetch?: () => void;
	error?: FetchBaseQueryError | SerializedError | undefined;
}

export const WithQuery = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	const ReturnedComponent: FC<WithQueryProps & T> = (props) => {
		const { isError, isLoading, refetch, error, ...propsForWrappedComponent } =
			props;

		if (isError) {
			return (
				<Container>
					<Alert
						action={<Button onClick={refetch}>Retry</Button>}
						severity='error'>
						<AlertTitle>
							{getMessageFromError(
								error,
								'Неизвестная ошибка при получение данных'
							)}
						</AlertTitle>
					</Alert>
				</Container>
			);
		}

		if (isLoading) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Spinner />
				</Box>
			);
		}

		return <WrappedComponent {...(propsForWrappedComponent as T)} />;
	};

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
