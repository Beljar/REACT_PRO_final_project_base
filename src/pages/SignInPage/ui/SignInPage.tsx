import { WithProtection } from 'entities/product';
import { SignInForm } from 'widgets/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
