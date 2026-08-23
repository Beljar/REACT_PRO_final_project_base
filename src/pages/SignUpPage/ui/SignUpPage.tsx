import { WithProtection } from 'entities/product';
import { SignUpForm } from 'widgets/SignUpForm';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
